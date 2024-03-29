<template lang="pug">
main.foodItems-id(v-if='foodItem')
  nuxt-link.foodItems-id__link(:to='{ name: "foodItems" }') Index

  .foodItems-id__title-container
    input-text(
      v-if='isEditing',
      v-model='foodItem.name',
      size='large',
      @input='onInput($event, "name")'
    )
    template(v-else)
      fd-title {{ foodItem.name }}
    fd-button.foodItems-id__button-header(
      v-if='isEditable',
      label='Edit',
      type='button',
      @button-clicked='isEditing = true'
    )
  template(v-if='!isEditing')
    div {{ foodItem.alias.join(', ') }}
    div {{ foodItem.tags.map((tag) => `#${tag}`).join(' ') }}

  section.foodItems-id__section
    h2.foodItems-id__title 基本情報
    .foodItems-id__item(v-if='isEditing')
      .foodItems-id__item-label.isEditing
        label よみがな、別名
      .foodItems-id__item-body
        input-text-array(
          v-model='foodItem.alias',
          @text-array-input='onTextArrayInput($event, "alias")'
        )

    .foodItems-id__item(v-if='isEditing')
      .foodItems-id__item-label.isEditing
        | タグ
      .foodItems-id__item-body
        input-text-array(
          v-if='isEditing',
          v-model='foodItem.tags',
          @text-array-input='onTextArrayInput($event, "tags")'
        )
        ul(v-else)
          li(v-for='tag in foodItem.tags')
            | {{ tag }}

    .foodItems-id__item
      .foodItems-id__item-label.isEditing(v-if='isEditing')
        label(for='description') 説明
      .foodItems-id__item-body
        input-textarea(
          v-if='isEditing',
          :value='foodItem.description',
          @input='onInput($event, "description")'
        )
        div(v-else, v-html='descriptionSanitized')

    .foodItems-id__item
      .foodItems-id__item-label(:class='{ isEditing }')
        label(for='type') タイプ
      .foodItems-id__item-body
        input-radio(
          v-if='isEditing',
          :options='foodItemTypes',
          :value='foodItem.type',
          @input='onInput($event, "type")'
        )
        template(v-else)
          | {{ foodItem.typeLabel }}

    .foodItems-id__item(v-if='foodItem.provider.length || isEditing')
      .foodItems-id__item-label(:class='{ isEditing }')
        label(for='provider') メーカー、店名等
      .foodItems-id__item-body
        input-text(v-if='isEditing', v-model='foodItem.provider')
        template(v-else)
          | {{ foodItem.provider }}

    .foodItems-id__item
      .foodItems-id__item-label(:class='{ isEditing }')
        label(for='url') URL
      .foodItems-id__item-body
        template(v-if='isEditing')
          input-text(v-model='foodItem.url', :disabled='isFetching')
          .foodItems-id__item-body-button
            fd-button(
              label='データを取得',
              @button-clicked='getData',
              :disabled='!isUrlDataGetable',
              size='large'
            )
        template(v-else)
          a(:href='foodItem.url') {{ foodItem.url }}

    .foodItems-id__item
      .foodItems-id__item-label(:class='{ isEditing }')
        label(for='units') 単位
      .foodItems-id__item-body
        input-units(
          v-if='isEditing',
          v-model='foodItem.units',
          @add-unit-clicked='onAddUnitClicked',
          @units-input='onUnitsInput'
        )
        ul.foodItems-id__unit-texts(v-else)
          li.foodItems-id__unit-text(
            v-for='unitText in unitTexts',
            :class='{ isDefault: unitText.isDefault }'
          )
            | {{ unitText.text }}

      .foodItems-id__item(v-if='isEditing')
        .foodItems-id__item-label.isEditing
          label(for='units') デフォルトの単位
        .foodItems-id__item-body
          fd-selector(
            v-if='isEditing',
            :options='unitOptions',
            v-model='foodItem.unitDefault'
          )
          template(v-else)
            | {{ foodItem.unitDefault }}
  section.foodItems-id__section
    h2.foodItems-id__title 栄養素

    .foodItems-id__amount(v-if='!isEditing')
      input.foodItems-id__amount-input(v-model='gram', type='number')
      | gあたり

    template(v-if='isEditing')
      organisms-input-nutrients(
        v-model='foodItem.nutrients',
        :overwrite='overwrite',
        @overwrite-completed='overwrite = false'
      )

    organisms-nutrient-graph(
      v-else,
      :nutrients='nutrients',
      :nutrient-basis='nutrientBasis'
    )

  ul.foodItems-id__buttons(v-if='isEditing')
    li.foodItems-id__button
      fd-button(label='Cancel', type='secondary', @button-clicked='onCancel')
    li.foodItems-id__button
      fd-button(label='Submit', @button-clicked='submit')
</template>

<script>
import Vue from 'vue'
import DOMPurify from 'dompurify'
import { FoodItem, TYPES } from '@/models/foodItem'
import { NUTRIENTS } from '@/constants/nutrients'
import { NUTRIENT_BASIS } from '@/models/nutrientBasis/constants'
import { FirebaseHelper } from '@/plugins/firebase'
import { REGEX_URL_SLISM } from '@/constants/slism'
import { Nutrients } from '@/models/nutrients'

export default Vue.extend({
  name: 'PagesFoodItemsId',
  data() {
    return {
      foodItem: null,
      isEditing: false,
      isFetching: false,
      gram: 100,
      overwrite: false,
    }
  },
  computed: {
    descriptionSanitized() {
      return DOMPurify.sanitize(this.foodItem.description)
    },

    foodItemTypes() {
      return TYPES
    },
    id() {
      return this.$route.params.id
    },
    isEditable() {
      return this.$store.state.isSignin && !this.isEditing
    },
    isNew() {
      return this.id === 'new'
    },
    isUrlDataGetable() {
      return !this.isFetching && REGEX_URL_SLISM.test(this.foodItem.url)
    },
    nutrients() {
      const result = {}
      Object.keys(NUTRIENTS).forEach((key) => {
        const nutrient = this.foodItem.nutrients[key]
        const value = nutrient ? nutrient || 0 : 0
        result[key] = [(value * this.gram) / 100]
      })
      return result
    },
    nutrientBasis() {
      return NUTRIENT_BASIS
    },
    unitOptions() {
      return this.foodItem.units.map((unit) => {
        return { value: unit.unit, disabled: false }
      })
    },
    unitTexts() {
      return this.foodItem.units
        .filter((unit) => unit.unit !== 'g')
        .map((unit) => {
          return {
            text: `${unit.unit}(${unit.rate}g)`,
            isDefault: this.foodItem.unitDefault === unit.unit,
          }
        })
    },
  },
  created() {
    this.fetchFoodItem()
  },
  methods: {
    async fetchFoodItem() {
      const db = this.$fire.firestore
      if (this.isNew) {
        this.isEditing = true
        this.foodItem = new FoodItem()
      } else {
        try {
          const doc = await FirebaseHelper.fetchItem('foodItems', this.id)
          const data = doc.data()
          this.foodItem = new FoodItem(this.id, data)
        } catch (_) {}
      }
    },
    async getData() {
      if (this.isFetching) return
      if (REGEX_URL_SLISM.test(this.foodItem.url)) {
        this.isFetching = true
        try {
          const result = await this.$axios.get('/api/getDataFromSlism', {
            params: { url: this.foodItem.url },
          })
          if (confirm('データを取得しました。上書きしますか？')) {
            this.overwrite = true
            this.foodItem.name = result.data.title
            this.foodItem.nutrients = new Nutrients(result.data.nutrients)
            this.foodItem.description = result.data.description
            this.foodItem.alias = result.data.alias
          }
        } catch (e) {
          console.error(e)
        } finally {
          this.isFetching = false
        }
      }
    },
    submit() {
      if (!this.foodItem) return
      if (this.isNew) {
        this.create()
      } else {
        this.update()
      }
    },
    async create() {
      if (!this.foodItem) return
      try {
        const doc = await FirebaseHelper.create('foodItems', this.foodItem)
        this.$router.push({
          name: 'foodItems-id',
          params: { id: doc.id },
        })
      } catch (_) {}
    },
    update() {
      if (!this.foodItem) return
      try {
        FirebaseHelper.update('foodItems', this.foodItem.id, this.foodItem)
        console.log('Item successfully updated! 🍅')
        this.fetchFoodItem()
        this.isEditing = false
      } catch (_) {}
    },
    onAddUnitClicked() {
      this.foodItem.addUnit()
    },
    onCancel() {
      this.isEditing = false
      this.fetchFoodItem()
    },
    onInput(value, key) {
      if (!this.foodItem) return
      this.foodItem[key] = value
    },
    onTextArrayInput({ value, index = -1 }, key) {
      if (!this.foodItem || !this.foodItem[key]) return
      if (index > -1) {
        if (value) {
          this.foodItem[key].splice(index, 1, value)
        } else {
          this.foodItem[key].splice(index, 1)
        }
      } else if (value) {
        this.foodItem[key].push(value)
      }
    },
    onUnitsInput(value) {
      this.foodItem.setUnit(value)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';

.foodItems-id {
  padding: 30px 20px 50px;

  &__link {
    position: relative;
    padding-left: 15px;
    color: $color-text-weak;
    transition: 0.3;

    &:hover {
      color: $color-main;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 3px;
      margin: auto;
      border-bottom: 1px solid;
      border-left: 1px solid;
      transform: rotate(45deg);
      width: 6px;
      height: 6px;
    }
  }

  &__title-container {
    @extend .title-container;
    margin-top: 30px;
  }
  &__button-header {
    margin-left: 10px;
  }

  &__section {
    margin: 30px 0;
  }

  &__title {
    font-weight: bold;
    margin: 10px 0;
  }

  &__item {
    @extend .list__item;
    margin: 15px 0;
  }

  &__item-label label {
    @extend .list__item-label;
  }

  &__item-body {
    @extend .list__item-body;
  }

  &__item-body-button {
    margin-left: 10px;
    flex-shrink: 0;
  }

  &__unit-texts {
    list-style: disc;
    list-style-position: inside;
  }

  &__unit-text {
    &.isDefault {
      font-weight: bold;
    }
  }

  &__amount {
    margin: 15px 0;
    display: flex;
    align-items: center;
  }

  &__amount-input {
    @extend %input;
    margin-right: 5px;
    width: 100px;
  }

  &__buttons {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    margin: auto;
    padding: 10px 0 calc(env(safe-area-inset-bottom) + 10px);
    background-color: #fff;
    border-top: 1px solid $color-grey;
  }

  &__button + &__button {
    margin-left: 30px;
  }
}
</style>
