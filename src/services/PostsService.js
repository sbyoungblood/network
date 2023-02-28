import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { sandboxAPI } from "../services/AxiosService.js"

class PostsService {
async getPosts(){
  const res = await sandboxAPI.get('')
  logger.log('GET POSTS', res.data)
  AppState.posts = res.data.posts.map(p => new Post(p))
  logger.log('APPSTATE POSTS', AppState.posts)
  AppState.nextPage = res.data.older
  AppState.previousPage = res.data.newer
}

async getPostsByQuery(query) {
  // const res = await api.get(`api/projects?creatorId=${profileId}`)
  // const res = await api.get('api/projects', { params: {creatorId : profileID} })
  const res = await api.get('api/posts', { params: query })
  logger.log('getting posts by profile', res.data)
  AppState.nextPage = res.data.older
  AppState.previousPage = res.data.newer
  AppState.posts = res.data.posts.map(p => new Post(p))
}

async createPost(postData){
  const res = await api.post('api/posts', postData)
  let newPost = new Post(res.data)
  AppState.posts = [newPost, ...AppState.posts]
}

async changePage(url){
  const res = await sandboxAPI.get(url)
  logger.log('[CHANGE PAGE]', res.data)
  AppState.posts = res.data.posts.map(p => new Post(p))
  AppState.nextPage = res.data.older
  AppState.previousPage = res.data.newer
}

async likePost(postId){
const res = await api.post('api/posts/' + postId +'/like')
AppState.posts = res.data
}

async deletePost(postId){
  const res = await api.delete('api/posts/' + postId)
  let i = AppState.posts.findIndex(p => p.postId == postId)
  if (i != -1) {
    AppState.posts.splice(i, 1)
  }
}



}

export const postsService = new PostsService()