import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"
import { Profile } from "../models/Account.js"
import { sandboxAPI } from "./AxiosService.js"
import { Post } from "../models/Post.js"

class ProfilesService {

async getProfileById(profileId){
  const res = await api.get('api/profiles/' + profileId)
  // logger.log('getting profile by id', res.data)
  AppState.profile = new Profile(res.data)
  AppState.nextPage = res.data.older
  AppState.previousPage = res.data.newer
  // logger.log('appstate.profile', AppState.profile)
}

// setActiveProfile(profile) {
//   AppState.profile = profile
//   logger.log('active profile', AppState.profile)
// }

async changePage(url){
  const res = await sandboxAPI.get(url)
  logger.log('[CHANGE PAGE]', res.data)
  AppState.posts = res.data.posts.map(p => new Post(p))
  AppState.nextPage = res.data.older
  AppState.previousPage = res.data.newer
}

}

export const profilesService = new ProfilesService