<template lang="pug">
.o-daily-item-index
  .o-daily-item-index__head
    i.o-daily-item-index__mark(:class='iconClass')
    time {{ dailyItem.timeText }}
    button(type='button', @click='$emit("edit-clicked")')
      i.icon-pen.o-daily-item-index__button-edit

  ul.o-daily-item-index__food-item-list
    li.o-daily-item-index__food-item(
      v-for='(foodItem, index) in dailyItem.foodItems'
    )
      .o-daily-item-index__food-item-name {{ foodItem.nameWithProvider }}
      span
        number-with-unit(:number='foodItem.amount', :unit='foodItem.unit')
        | /
        number-with-unit(
          :decimal-digit='1',
          :number='foodItem.getNutrientValue({ nutrientId: "calorie" })',
          unit='kcal'
        )
</template>

<script>
import Vue from 'vue'
import { DailyItem } from '~/models/dailyItem'
export default Vue.extend({
  name: 'OrganismsDailyDailyItem',
  computed: {
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
  },
})
</script>

<style lang="scss" scoped>
.o-daily-item-index {
  &__head {
    color: $color-text-weak;
  }

  &__mark {
    font-size: 20px;
    margin-right: 5px;
  }

  &__button-edit {
    font-size: 24px;
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
}
</style>
