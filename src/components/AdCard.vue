<template>
  <img :src="ad.tall" alt="" class="ad">
</template>


<script>

import { Ad } from "../models/Ad.js"

export default {
  props: {
    ad: {
      type: Ad,
      required: true
    }
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>
.ad{
  width: 100%;
  height: auto;
}
</style>