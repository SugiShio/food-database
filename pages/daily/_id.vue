<template lang="pug">
.daily-id
  organisms-daily(v-if='uid', :id='id', :uid='uid')
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'PagesDailyId',
  computed: {
    uid() {
      return this.$store.state.user.uid
    },
    id() {
      return this.$route.params.id
    },
  },
})
</script>

<style lang="scss" scoped>
.daily-id {
  padding: 20px 10px 40px;

  &__link {
    position: relative;
    padding-left: 15px;
    color: $color-text-weak;
    transition: 0.3;
  }

  &__item {
    padding: 10px 20px;
    margin: 20px 0;
    transition: box-shadow 0.3s;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 10px rgba(#000, 0.05);
    }
  }
}
</style>
