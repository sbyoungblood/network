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
        <span class="mdi mdi-heart-outline heart" @click="likePost()">{{ post.likes.length }}</span>
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
    <!-- TODO 'account' is the object/information of the user logged in -->
    <!-- REVIEW  does the person logged in have the rights to manipulate this?-->
    <div v-if="account?.id == post.creatorId" class="row justify-content-end">
      <div class="mdi mdi-trash-can-outline text-end display-6 selectable" @click="deletePost(post.postId)"></div>
    </div>
  </div>
</template>


<script>

import { Profile } from "../models/Account";
import { Post } from "../models/Post.js";
import { profilesService } from "../services/ProfilesService";
import { computed } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { useRoute } from "vue-router";

export default {
  props: {
    // REVIEW 'post' is the equivalent of template +=
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

    const route = useRoute()
    const postId = route.params.postId


    return {
      postId,
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
    // bring in the acct

    async deletePost(postId) {
        try {

          await postsService.deletePost(postId)
        } catch (error) {
          Pop.error(error, '[Deleting Post]')
        }
      },


      async likePost(){
        try {
          await postsService.likePost()
        } catch (error) {
          Pop.error("[ERROR]", error.message)
        }
      },

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