<template>
  <div class="post-card">
    <div class="row profile-row">
      <div class="col-md-2 ps-5 pt-5 d-flex justify-content-start">
        <router-link :to="{name: 'Profile', params: {profileId: post.creatorId}}">
          <img :src="post.creator.picture" alt="profile-img" class="profile-img rounded-circle elevation-5">
        </router-link>
      </div>
      <div class="col-md-7 pt-5 ps-4 d-flex flex-column justify-content-center">
        <div class="profile-name">{{ post.creator.name }}</div>
        <div>{{post.createdAt}}</div>
      </div>
      <div class="col-md-3 pt-5 pe-5 d-flex justify-content-end align-items-center">
        <span class="mdi mdi-heart-outline heart">{{ post.likes.length }}</span>
      </div>
    </div>
    <div class="row body-row my-4">
      <div class="col-md-12 px-5">
        {{post.body}}
      </div>                
    </div>
    <div class="row img-row justify-content-center mb-4">
      <div v-if="post.imgUrl" class="col-md-12 px-5 pb-4">
        <img :src="post.imgUrl" alt="" class="post-img elevation-5">
      </div>
    </div>
    <div v-if="profile?.id == post.creatorId" class="row">
      <div>show this</div>
    </div>
  </div>
</template>


<script>

import { Profile } from "../models/Account";
import { Post } from "../models/Post.js";
import { profilesService } from "../services/ProfilesService";
import { computed } from "vue";
import { AppState } from "../AppState.js";

export default {
  props: {
    post: {
      type: Post,
      required: true
    },
    profile: {
      type: Profile,
      // required: true
    }
  },

  setup(props){
    return {

      profile: computed(() => AppState.profile),
    

      setActiveProfile(){
        profilesService.setActiveProfile(props.profile)
      }
    }
  }
}
</script>


<style lang="scss" scoped>

.profile-img{
  height: 10vh;
  width: 10vh;
  object-fit: cover;
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

.heart {
  color: #0062ff;
  font-size: 30pt;
}

.likes{
  color: #0062ff;
  font-size: 30pt;
}

</style>