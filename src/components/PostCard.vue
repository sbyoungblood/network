<template>
  <div class="post-card">
    <div class="row profile-row">
      <div class="col-md-2 pt-3 ps-3 pb-3 d-flex justify-content-center">
        <img :src="post.creator.picture" alt="profile-img" class="profile-img rounded-circle elevation-5">
      </div>
      <div class="col-md-10 p-0 d-flex flex-column justify-content-center">
        <div class="profile-name">{{ post.creator.name }}</div>
        <div>other</div>
      </div>
    </div>
    <div class="row body-row my-4">
      <div class="col-md-12 px-4">
        {{post.body}}
      </div>                
    </div>
    <div class="row img-row justify-content-center mb-4">
      <div class="col-md-11 p-0">
        <img :src="post.imgUrl" alt="" class="post-img elevation-5">
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

.profile-name{
  font-family: 'Roboto', sans-serif;
  text-transform: capitalize;
  font-size: 16pt;
  font-weight: bold;
}

</style>