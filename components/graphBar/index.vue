<template lang="pug">
.graph-bar
  .graph-bar__item(v-for='style in barWidth', :style='style')
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'GraphBar',
  props: {
    values: { type: Array, default: () => [] },
    base: { type: Number, default: 100 },
    labels: { type: Array, default: () => [] },
  },
  data(): {
    barWidth: { width: string }[]
  } {
    return {
      barWidth: [],
    }
  },
  watch: {
    values() {
      this.setBarWidth()
    },
  },
  created() {
    this.setBarWidth()
  },
  methods: {
    setBarWidth() {
      this.barWidth = this.values.map((value) => {
        const width = ((value as number) / this.base) * 100
        return { width: `${width}%` }
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.graph-bar {
  display: flex;
  height: 20px;

  &__item {
    &:first-child {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &:last-child {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    &:nth-child(5n) {
      background-color: $color-blue;
    }
    &:nth-child(5n + 1) {
      background-color: $color-green;
    }
    &:nth-child(5n + 2) {
      background-color: $color-yellow;
    }
    &:nth-child(5n + 3) {
      background-color: $color-orange;
    }
    &:nth-child(5n + 4) {
      background-color: $color-red;
    }
  }
}
</style>
