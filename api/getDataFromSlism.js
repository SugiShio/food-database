import axios from 'axios'
import { JSDOM } from 'jsdom'
import { NUTRIENTS } from '../constants/nutrients'
import { REGEX_URL_SLISM, NUTRIENT_DICTIONARY } from '../constants/slism'

export default async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const param = url.searchParams.get('url')

  if (!REGEX_URL_SLISM.test(param)) {
    res.writeHead(400).end()
  }

  try {
    const resData = await axios.get(param)
    const dom = new JSDOM(resData.data)

    const elementAmount =
      dom.window.document.querySelector('input[name=amount]')
    const amount = elementAmount.value

    const elementTitle = dom.window.document.querySelector('h1')
    const rawTitle =
      elementTitle && elementTitle.innerHTML.replace(/<.*?>/g, '').trim()
    const title = rawTitle.replace(/ *\(.*\)$/, '')
    const match = rawTitle.match(/\((.*)\)$/)
    const alias = match ? match[1].split('/') : []

    const elementDescription = dom.window.document.querySelector('.note')
    const description = elementDescription && elementDescription.innerHTML

    const items = []
    const elementMainData = dom.window.document.getElementById('mainData')
    const rowsMainData = elementMainData.getElementsByTagName('tr')
    const elementVitamin = dom.window.document.getElementById('vitamin')
    const rowsVitamin = elementVitamin.getElementsByTagName('tr')
    const elementMineral = dom.window.document.getElementById('mineral')
    const rowsMineral = elementMineral.getElementsByTagName('tr')
    const elementEtc = dom.window.document.getElementById('etc')
    const rowsEtc = elementEtc.getElementsByTagName('tr')

    Array.from([
      ...rowsMainData,
      ...rowsVitamin,
      ...rowsMineral,
      ...rowsEtc,
    ]).forEach((row) => {
      const elementTags = row.getElementsByTagName('td')
      const item = Array.from(elementTags)
        .map((tag) => {
          return tag && tag.innerHTML.replace(/<.*?>/g, '').trim()
        })
        .filter((v) => v)
      if (item.length) items.push(item)
    })

    const nutrients = {}
    items.forEach((item) => {
      Object.keys(NUTRIENT_DICTIONARY).forEach((key) => {
        if (item.includes(NUTRIENT_DICTIONARY[key])) {
          const unit = NUTRIENTS[key].unit
          const valueString = item.find((i) => {
            return new RegExp(`^[0-9|\.]*${unit}`).test(i)
          })
          const value = Number(valueString.replace(unit, ''))
          nutrients[key] = (value * 100) / amount
        }
      })
    })

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ title, nutrients, description, alias }), 'utf8')
  } catch (error) {
    const status = (error.response && error.response.status) || 500
    res.writeHead(status).end()
  }
}
