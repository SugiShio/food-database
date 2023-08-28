<template lang="pug">
.o-input-nutrients-item
  textarea.o-input-nutrients-item__input(
    :value='value',
    :rows=1,
    ref='input',
    @focus='onFocus',
    @input='onInput',
    @keydown.enter.prevent
  )
  span.o-input-nutrients-item__unit {{ unit }}
  transition(name='fade')
    fd-calculator(
      v-show='showCalculator',
      :title='title',
      :unit='unit',
      :value='value',
      @value-entered='onValueEntered',
      @close-calculator='showCalculator = false'
    )
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'OrganismsInputNutrientsItem',
  props: {
    title: { type: String, default: '' },
    unit: { type: String, default: '' },
    value: { type: [String, Number], default: 0 },
  },
  data() {
    return { showCalculator: false }
  },
  computed: {
    isDesktop() {
      return this.$store.getters.isDesktop
    },
  },
  methods: {
    onFocus($event) {
      if (this.isDesktop) {
        $event.target.select()
      } else {
        this.$refs.input.blur()
        this.showCalculator = true
      }
    },
    onInput($event) {
      const value = $event.target.value
      this.$emit('input', value)
    },
    onValueEntered($event) {
      this.$emit('input', $event.toString())
      this.showCalculator = false
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';

.o-input-nutrients-item {
  @extend %input;
  display: flex;
  align-items: center;
  padding: 0;

  &__input {
    display: block;
    flex-grow: 1;
    padding: 5px 10px;
    border: none;
    resize: none;
  }

  &__unit {
    margin: 0 5px;
    color: $color-text-weak;
    font-size: 11px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
