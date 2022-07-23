export const getFirestoreFormat = (object: any) => {
  return normalizeObject(object)
}

const normalizeObject = (object: any) => {
  if (typeof object === 'string') {
    return object
  } else if (Array.isArray(object)) {
    return object.map((o): any => {
      return normalizeObject(o)
    })
  } else if (Object.keys(object).length) {
    const result: {
      [key: string]: any
    } = {}

    Object.keys(object).forEach((key): any => {
      result[key] = normalizeObject(object[key])
    })
    return result
  }

  return object
}
