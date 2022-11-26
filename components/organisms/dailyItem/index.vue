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
      div {{ foodItem.nameWithProvider }}
      .o-daily-item-index__food-item-actions(v-if='isEditing')
        input-number-with-unit(
          :amount='foodItem.amount',
          :unit='foodItem.unit',
          :units='foodItem.units',
          @input='onInput(foodItem, $event)'
        )
        button(@click='onDelete(index)') Delete
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
      div(@click='isSearchModalOpen = false') 閉じる
      organisms-search(
        @search-start='isSearching = true',
        @search-succeed='onSearchSucceed',
        @search-failed='onSearchFailed'
      )
      ul.o-daily-item-index__list
        li(v-for='foodItem in foodItems')
          | {{ foodItem.name }}
          button(type='button', @click='addFoodItem(foodItem)') add
</template>

<script lang="ts">
import Vue from 'vue'
import { DailyItem } from '~/models/dailyItem'
import { FoodItem } from '~/models/foodItem'
export default Vue.extend({
  name: 'OrganismsDailyItemIndex',
  data() {
    return {
      isSearching: false,
      isSearchModalOpen: false,
      foodItems: [],
    }
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
    onDelete(index) {
      this.dailyItem.deleteFoodItem(index)
    },
    onInput(foodItem, value) {
      foodItem.setAmountAndUnit(value)
    },
    onSearchSucceed(foodItems: FoodItem[]) {
      this.foodItems = foodItems
    },
    onSearchFailed(e) {
      console.error(e)
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
    margin: 10px 0;
  }

  &__food-item-actions {
    display: flex;
  }
}
</style>
