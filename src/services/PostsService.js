import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";

class PostsService {
async getPosts(){
  const res = await api.get('api/posts')
  logger.log('GET POSTS', res.data)
  AppState.posts = res.data.posts.map(p => new Post(p))
  // logger.log('APPSTATE POSTS', AppState.posts)
}


}

export const postsService = new PostsService