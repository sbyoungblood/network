<template>
  <div class="container-fluid">
    <div class="row p-3">
      <div class="col-md-3">
        login/profile
      </div>
      <div class="col-md-6 p-1">
        <div class="row posts justify-content-center">
          <div class="col-md-10">
            
          </div>
        </div> 
      </div>
      <div class="col-md-3">
        ads
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js" 
import { onMounted, computed } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    async function getPosts(){
      try {
        await postsService.getPosts()
      } catch (error) {
        logger.log(error)
        Pop.error(("[ERROR]"), error.message)
      }
    }

    onMounted(() => {
      getPosts();
    })

    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
