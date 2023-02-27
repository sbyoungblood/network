<template>
<div class="container-fluid">
    <div class="row pt-3 main-hp-row justify-content-end">
      <div class="col-md-2 left-hp-col">       
        <div class="d-flex justify-content-center">
          <img :src="profile?.picture" alt="" class="rounded-circle profile-img-sidebar">
        </div>
        <div class="d-flex my-3 justify-content-center sidebar-name">
          {{ profile?.name }}
        </div>
        <div class="d-flex justify-content-center">
          {{ profile?.class }}
        </div>
        <div class="text-center mt-3 socials">
          <span>
            <a :href="profile.github" class="mdi mdi-github"></a>
            <a :href="profile.linkedin" class="mdi mdi-linkedin"></a>
          </span>
        </div>
        <div class="text-center mt-3">
          {{ profile.bio }}
        </div>
      </div>
      <div class="col-md-7 middle-hp-col">
        <div class="row posts justify-content-center align-content-between">
          <!-- <div class="col-md-12 mb-5 elevation-5 post-form p-4">
            <PostForm :account="account"/>
          </div> -->
          <div v-for="p in posts" class="col-md-12 mb-5 elevation-5 post-cards">
            <PostCard :post="p"/>
          </div>
        </div> 
      </div>
      <div class="col-md-3 right-hp-col">
        <div class="row justify-content-center">
          <div v-for="a in ads" class="col-md-12 mb-3 px-4">
            <AdCard :ad="a"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { onMounted, computed } from "vue";
import { profilesService } from "../services/ProfilesService.js"
import { postsService } from "../services/PostsService.js";
import { AppState } from "../AppState.js";
import { adsService } from "../services/AdsService.js";



export default {
  setup(){
    const route = useRoute();
    async function getProfileById(){
      try {
        const profileId = route.params.profileId;
        // logger.log('here is the profile id', profileId)
        await profilesService.getProfileById(profileId);
      } catch (error) {
        logger.log(error)
        Pop.error("[ERROR]", error.message)
      }
    }

    async function getPostsByCreatorId() {
      try {
        const profileId = route.params.profileId;
        await postsService.getPostsByQuery({ creatorId: profileId });
      }
      catch (error) {
        logger.error(error);
        Pop.error('[ERROR]', error.message);
      }
    }

    async function getAds() {
            try {
                await adsService.getAds();
            }
            catch (error) {
                // logger.log(error);
                Pop.error(("[ERROR]"), error.message);
            }
        }
    onMounted(() => {
      getProfileById();
      getPostsByCreatorId();
      getAds();
    });
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
      ads: computed(() => AppState.ads)
    }
  }
}
</script>


<style lang="scss" scoped>

.post-cards{
  box-shadow: 4px, 4px, 10px black;
  background-color: white;
}

.profile-img-sidebar{
  width: 12vw;
  height: 12vw;
 
}

.sidebar-name{
  font-family: 'Roboto', sans-serif;
  font-size: 25pt;
  text-transform: capitalize;
  font-weight: 500;
}


.left-hp-col {
  position: fixed;
  left: 0;
}

.socials{
  font-family: 'Roboto', sans-serif;
  font-size: xx-large;
}
</style>