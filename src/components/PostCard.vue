<template>
  <div class="post-card">
    <div class="row profile-row">
      <div class="col-md-2 pt-3 ps-3 pb-3">
        <img :src="post.creator.picture" alt="profile-img" class="profile-img rounded-circle">
      </div>
      <div class="col-md-10 d-flex flex-column justify-content-center">
        <div>{{ post.creator.name }}</div>
        <div>other</div>
      </div>
    </div>
    <div class="row body-row my-4">
      <div class="col-md-12">
        {{post.body}}
      </div>                
    </div>
    <div class="row img-row">
      <div class="col-md-12 p-0">
        <img :src="post.imgUrl" alt="" class="post-img">
      </div>
    </div>
  </div>
</template>


<script>

import { Post } from "../models/Post.js";

export default {
  props: {
    post: {
      type: Post,
      required: true
    }
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

.profile-img{
  height: 10vh;
  width: 10vh;
}

.post-img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
}

</style>