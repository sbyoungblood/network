<template>
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
</template>


<script>
import { Account } from "../models/Account.js";
import { ref } from "vue";
import { Post } from "../models/Post.js";


export default {
    props: {
      account: {
        type: Account,
        required: true
      },
      post: {
        type: Post,
        required: true
      }
    },

  setup(){

    const editable = ref({})

    return {}
  }
}
</script>


<style lang="scss" scoped>

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

</style>