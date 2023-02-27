import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";

class PostsService {
async getPosts(){
  const res = await api.get('api/posts')
  // logger.log('GET POSTS', res.data)
  AppState.posts = res.data.posts.map(p => new Post(p))
  // logger.log('APPSTATE POSTS', AppState.posts)
}

async getPostsByQuery(query) {
  // const res = await api.get(`api/projects?creatorId=${profileId}`)
  // const res = await api.get('api/projects', { params: {creatorId : profileID} })
  const res = await api.get('api/posts', { params: query })
  logger.log('getting posts by profile', res.data)
  AppState.posts = res.data.posts.map(p => new Post(p))
}

async createPost(postData){
  const res = await api.post('api/posts', postData)
  let newPost = new Post(res.data)
  AppState.posts = [newPost, ...AppState.posts]
}
}

export const postsService = new PostsService