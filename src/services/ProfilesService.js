import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"
import { Profile } from "../models/Account.js"

class ProfilesService {

async getProfileById(profileId){
  const res = await api.get('api/profiles/' + profileId)
  logger.log('getting profile by id', res.data)
  AppState.profile = new Profile(res.data)
  
}

// setActiveProfile(profile) {
//   AppState.profile = profile
//   logger.log('active profile', AppState.profile)
// }

}

export const profilesService = new ProfilesService