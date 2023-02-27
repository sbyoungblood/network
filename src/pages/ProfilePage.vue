<template>
<img :src="profile.picture" alt="">
</template>


<script>
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { onMounted, computed } from "vue";
import { profilesService } from "../services/ProfilesService.js"
import { postsService } from "../services/PostsService.js";
import { AppState } from "../AppState.js";



export default {
  setup(){
    const route = useRoute();
    async function getProfileById(){
      try {
        const profileId = route.params.profileId;
        logger.log('here is the profile id', profileId)
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
    onMounted(() => {
      getProfileById();
      getPostsByCreatorId();

    });
    return {
      profile: computed(() => AppState.profile)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>