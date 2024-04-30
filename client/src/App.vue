<template>
  <button class="icon logout" @click="logout" v-if="cookieIsSet">
    <img src="@/assets/logout.svg" alt="logout" />
  </button>
  <Hint v-if="hintData" :data="hintData" :status="hintStatus"/>
  <router-view />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Hint from '@/components/Hint';
import Cookies from 'js-cookie'

export default {
  components: {
    Hint
  },

  methods: {
    ...mapActions({
      logout: 'logout'
    }),
  },

  computed: {
    ...mapGetters({
      hintData: 'getHint',
      hintStatus: 'getHintStatus'
    }),
    cookieIsSet() {
      return Cookies.get('userName')
    }
  }
}
</script>

<style lang="sass">
#app
  min-height: 100vh
  display: flex
  flex-direction: column

.logout
  margin-right: 0
  margin-left: auto
  position: absolute
  top: 20px
  right: 50px
</style>
