import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";
import { Ad } from "../models/Ad.js";


class AdsService {
  async getAds(){
    const res = await api.get('api/ads')
    logger.log('GET ADS', res.data)
    AppState.ads = res.data.map(a => new Ad(a))
    logger.log('APPSTATE ADS', AppState.ads)
  }
}

export const adsService = new AdsService()