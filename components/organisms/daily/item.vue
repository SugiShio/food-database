<template lang="pug">
.o-daily-item-index
  i(:class='iconClass')
  time {{ dailyItem.timeText }}

  fd-button(
    v-if='!isEditing',
    label='Edit',
    @button-clicked='$emit("edit-clicked")'
  )

  ul.o-daily-item-index__food-item-list
    li.o-daily-item-index__food-item(
      v-for='(foodItem, index) in dailyItem.foodItems'
    )
      .o-daily-item-index__food-item-name {{ foodItem.nameWithProvider }}
      .o-daily-item-index__food-item-actions(v-if='isEditing')
        input-number-with-unit(
          :amount='foodItem.amount',
          :unit='foodItem.unit',
          :units='foodItem.units',
          @input='onInput(foodItem, $event)'
        )
        button.o-daily-item-index__food-item-trash(@click='onDelete(index)')
          i.icon-trash
      span(v-else)
        | {{ foodItem.amount }}{{ foodItem.unit }} / {{ foodItem.getNutrientValue({ nutrientId: "calorie" }) }} kcal
  template(v-if='isEditing')
    fd-button(
      v-if='!isSearchModalOpen',
      label='add Item',
      @button-clicked='isSearchModalOpen = true'
    )
    fd-button(label='Submit', @button-clicked='$emit("daily-item-submit")')

    template(v-if='isSearchModalOpen')
      div(@click='closeSearchModal') 閉じる
      organisms-search
      ul.o-daily-item-index__list
        li(v-for='foodItem in foodItems')
          | {{ foodItem.name }}
          button(type='button', @click='addFoodItem(foodItem)') add
</template>

<script lang="ts">
import Vue from 'vue'
import { DailyItem } from '~/models/dailyItem'
export default Vue.extend({
  name: 'OrganismsDailyDailyItem',
  data() {
    return {
      isSearchModalOpen: false,
    }
  },
  computed: {
    foodItems() {
      return this.$store.state.search.foodItems
    },
    hasError() {
      return this.$store.state.search.hasError
    },
    isSearching() {
      return this.$store.state.search.isSearching
    },
    limit() {
      return this.$store.state.search.limit
    },
    iconClass() {
      return `icon-${this.dailyItem.mark}`
    },
  },
  props: {
    dailyItem: {
      type: DailyItem,
      default: () => {
        new DailyItem()
      },
    },
    isEditing: { type: Boolean, default: false },
  },
  methods: {
    addFoodItem(foodItem) {
      this.dailyItem.addFoodItem(foodItem)
    },
    closeSearchModal() {
      this.$store.commit('search/resetFoodItems')
      this.isSearchModalOpen = false
    },
    onDelete(index) {
      this.dailyItem.deleteFoodItem(index)
    },
    onInput(foodItem, value) {
      foodItem.setAmountAndUnit(value)
    },
  },
})
</script>

<style lang="scss" scoped>
.o-daily-item-index {
  &__food-item {
    display: flex;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }

  &__food-item-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__food-item-actions {
    display: flex;
    max-width: 40%;
    margin-left: 10px;
  }

  &__food-item-trash {
    margin-left: 5px;
    font-size: 24px;
    line-height: 1;
  }
}
</style>
