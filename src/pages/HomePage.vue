<template>
  <div class="container-fluid">
    <div class="row pt-3 main-hp-row justify-content-end">
      <div class="col-md-2 left-hp-col">       
        <div class="d-flex justify-content-center">
          <img :src="account.picture" alt="" class="rounded-circle profile-img-sidebar">
        </div>
        <div class="d-flex my-3 justify-content-center sidebar-name">
          {{ account.name }}
        </div>
      </div>
      <div class="col-md-7 middle-hp-col">
        <div class="row posts justify-content-center align-content-between">
          <div class="col-md-12 mb-5 elevation-5 post-form p-4">
            <PostForm :account="account"/>
          </div>
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
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js" 
import { adsService } from "../services/AdsService.js"
import { onMounted, computed } from "vue";
import { AppState } from "../AppState.js";
import PostForm from "../components/PostForm.vue";
import AdCard from "../components/AdCard.vue";
import PostCard from "../components/PostCard.vue";

export default {
    setup() {
        async function getPosts() {
            try {
                await postsService.getPosts();
            }
            catch (error) {
                logger.log(error);
                Pop.error(("[ERROR]"), error.message);
            }
        }
        async function getAds() {
            try {
                await adsService.getAds();
            }
            catch (error) {
                logger.log(error);
                Pop.error(("[ERROR]"), error.message);
            }
        }
        onMounted(() => {
            getPosts();
            getAds();
        });
        return {
            posts: computed(() => AppState.posts),
            account: computed(() => AppState.account),
            ads: computed(() => AppState.ads)
        };
    },
    components: { AdCard, PostCard, PostForm }
}
</script>

<style scoped lang="scss">
// .home {
//   display: grid;
//   height: 80vh;
//   place-content: center;
//   text-align: center;
//   user-select: none;

//   .home-card {
//     width: 50vw;

//     >img {
//       height: 200px;
//       max-width: 200px;
//       width: 100%;
//       object-fit: contain;
//       object-position: center;
//     }
//   }
// }

.post-cards{
  box-shadow: 4px, 4px, 10px black;
  background-color: white;
}

.profile-img-sidebar{
  width: 80%;
  height: auto;
}

.sidebar-name{
  font-family: 'Roboto', sans-serif;
  font-size: 25pt;
  text-transform: capitalize;
  font-weight: 500;
}



// .main-hp-row {
//   display: flex;
//   flex-direction: row;
//   position: relative;
//   height: 100vh;
// }

// .col {
//   height: 100%;
//   overflow-y: scroll; /* enable vertical scrolling */
// }

.left-hp-col {
  position: fixed;
  left: 0;
}

// .middle-hp-col {
//   position: absolute;
//   left: auto; /* set the left position to the width of the left column */
//   top: 0;
// }

// .right-hp-col {
//   position: absolute;
//   left: 66.66%; /* set the left position to the width of the left and middle columns */
//   top: 0;
// }

</style>
