<template lang="pug">
.o-daily-item-edit
  .o-daily-item-edit__head
    i.o-daily-item-edit__mark
    input-text(v-model='dailyItem.time')

  ul.o-daily-item-edit__food-item-list
    li.o-daily-item-edit__food-item(
      v-for='(foodItem, index) in dailyItem.foodItems'
    )
      .o-daily-item-edit__food-item-name {{ foodItem.nameWithProvider }}
      input-number-with-unit(
        :amount='foodItem.amount',
        :unit='foodItem.unit',
        :units='foodItem.units',
        @input='onInput(foodItem, $event)'
      )
      button.o-daily-item-edit__button-trash(@click='onDelete(index)')
        i.icon-trash

  button.o-daily-item-edit__add-button(
    type='button',
    @click='$emit("add-button-clicked")'
  )
    i.icon-plus-circle.o-daily-item-edit__add-icon
    | 追加

  fd-button(label='Submit', @button-clicked='$emit("daily-item-submit")')
  fd-button(
    @button-clicked='$emit("cancel-clicked")',
    label='Cancel',
    type='secondary'
  )
</template>

<script lang="ts">
import Vue from 'vue'
import { DailyItem } from '~/models/dailyItem'
export default Vue.extend({
  name: 'OrganismsDailyItemEdit',
  props: {
    dailyItem: { type: DailyItem, default: new DailyItem() },
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
  },
})
</script>

<style lang="scss" scoped>
.o-daily-item-edit {
  &__head {
    color: $color-text-weak;
  }

  &__mark {
    font-size: 20px;
    margin-right: 5px;
  }

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
    width: 60%;
    flex-shrink: 0;
  }

  &__food-item-actions {
    display: flex;
    margin-left: 10px;
  }

  &__button-trash {
    margin-left: 5px;
    font-size: 24px;
    line-height: 1;
  }

  &__add-button {
    color: $color-text-weak;
  }

  &__add-icon {
    font-size: 1.3em;
    margin-right: 5px;
  }
}
</style>
