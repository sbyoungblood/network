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
            <form>
              <div class="row justify-content-evenly mb-4">
                <div class="col-md-2 d-flex justify-content-center pt-3">
                  <img :src="account.picture" alt="" class="form-profile-img rounded-circle">
                </div>
                <div class="col-md-8 d-flex justify-content-end">
                  <textarea name="" id="post-body" cols="60" rows="4" class="p-3"></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col-md-8 offset-1 mt-3 d-flex align-items-center">
                  <div class="mdi mdi-camera camera ps-3"></div>
                  <input type="url" class="ms-4 ps-3" id="img-url">
                </div>
                <div class="col-md-3 mt-3 d-flex align-items-center">
                  <button class="btn btn-outline-primary mdi mdi-share share">
                    POST
                  </button>
                </div>
              </div>
            </form>
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
    components: { AdCard, PostCard }
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

.post-form{
  height: 280px;
}

#post-body{
  border-color: rgb(183, 183, 183);
  border-width: 3px;
  background-color: rgba(234, 234, 234, 0.281);
}

.form-profile-img{
  height: 80%;
}

.camera, .share-icon {
  color: #0062ff;
  font-size: 30pt;
}

#img-url{
  height: 40px;
  width: 350px;
  border-color: rgb(183, 183, 183);
  border-width: 3px;
  background-color: rgba(234, 234, 234, 0.281);
}

.share{
  color: #0062ff;
  font-size: 15pt;
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
