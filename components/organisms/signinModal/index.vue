<template lang="pug">
transition(name='fade')
  .o-signin-modal(v-if='isSigninModalOpen')
    .o-signin-modal__container
      .o-signin-modal__item
        label.o-signin-modal__label(for='email') メールアドレス
        input-text#email(v-model='email')

      .o-signin-modal__item
        label.o-signin-modal__label(for='password') パスワード
        input-password#password(v-model='password')

      .o-signin-modal__button-item
        fd-button.o-signin-modal__button(
          @button-clicked='signin',
          label='Signin'
        )

        .o-signin-modal__cancel
          button(@click='$emit("close-modal")') Close
</template>

<script>
export default {
  name: 'OrganismsSigninModal',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  props: {
    isSigninModalOpen: { type: Boolean, default: false },
  },
  methods: {
    signin() {
      if (!this.email || !this.password) return
      const auth = this.$fire.auth
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          if (!data.user) return

          this.$store.commit('setUser', {
            uid: data.user.uid,
            displayName: data.user.uid,
          })
          this.$store.commit('setIsSignin')
          this.$emit('close-modal')
        })
        .catch((_) => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.o-signin-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: rgba(#fff, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  &.fade-enter-active,
  &.fade-leave-active {
    transition: opacity 0.2s;
  }
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
  }

  &__container {
    padding: 10px 30px;
    border-radius: 3px;
    background-color: #fff;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 0 10px rgba(#000, 0.08);
  }

  &__button {
    width: 100%;
  }

  &__item {
    margin: 10px 0;
  }

  &__button-item {
    margin-top: 30px;
  }

  &__label {
    display: block;
    margin-bottom: 5px;
    font-size: 12px;
  }

  &__cancel {
    margin: 10px 0;
    text-align: center;

    button {
      color: $color-main;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>
