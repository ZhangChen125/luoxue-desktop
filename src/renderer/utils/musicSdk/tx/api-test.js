import { httpFetch } from '../../request'
import { requestMsg } from '../../message'
import { headers, timeout } from '../options'
import { dnsLookup } from '../utils'

const api_messoer = {
  getMusicUrl(songInfo, type) {
    const requestObj = httpFetch(`http://ts.tempmusics.tk/url/tx/${songInfo.songmid}/${type}`, {
      method: 'get',
      timeout,
      headers,
      lookup: dnsLookup,
      family: 4,
    })
    requestObj.promise = requestObj.promise.then(({ body }) => {
      switch (body.code) {
        case 0: return Promise.resolve({ type, url: body.data })
        case 429: return Promise.reject(new Error(requestMsg.tooManyRequests))
        default: return Promise.reject(new Error(requestMsg.fail))
      }
    })
    return requestObj
  },
  getPic(songInfo) {
    return Promise.resolve(`https://y.gtimg.cn/music/photo_new/T002R500x500M000${songInfo.albumId}.jpg`)
  },
}

export default api_messoer
