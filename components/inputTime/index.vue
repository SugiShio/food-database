<template lang="pug">
.input-time
  select.input-time__select(
    type='text',
    :value='hours',
    @change='onHoursChange'
  )
    option(v-for='i in hourOptions', :value='i')
      | {{ i }}
  span.input-time__delimiter :
  select.input-time__select(:value='minutes', @change='onMinutesChange')
    option(v-for='i in minuteOptions', :value='i')
      | {{ i }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'InputTime',
  props: {
    value: {
      type: Object,
      default: () => {
        return { seconds: 0 }
      },
    },
  },
  data() {
    const date = new Date(this.value.seconds * 1000)
    return {
      hours: `${date.getHours()}`,
      hourOptions: Array(24)
        .fill('')
        .map((_, index) => `${index}`),
      minutes: `0${date.getMinutes()}`.slice(-2),
      minuteOptions: Array(60)
        .fill('')
        .map((_, index) => `0${index}`.slice(-2)),
    }
  },
  methods: {
    onHoursChange($event) {
      const hours = Number.parseInt($event.target.value)
      const datetime = new Date(this.value.seconds * 1000)
      datetime.setHours(hours)
      const seconds = Math.floor(datetime.getTime() / 1000)
      this.$emit('input', { seconds })
    },
    onMinutesChange($event) {
      const minutes = Number.parseInt($event.target.value)
      const datetime = new Date(this.value.seconds * 1000)
      datetime.setMinutes(minutes)
      const seconds = Math.floor(datetime.getTime() / 1000)
      this.$emit('input', { seconds })
    },
  },
})
</script>

<style lang="scss" scoped>
.input-time {
  &__select {
    display: inline-block;
    padding: 5px 10px;
    width: 50px;
    border: 1px solid $color-grey-weak;
    background-color: transparent;
    border-radius: 3px;
  }

  &__delimiter {
    margin: 0 5px;
  }
}
</style>
