import fetchJsonp from 'fetch-jsonp'
import Url from '../utils/url'

function mergeRequest(url, defaultArgs={}, args={}) {
  const targetArgs = {...defaultArgs, ...args}
  return Url.addRequest(Url.getUrl(url), targetArgs)  //转换接口环境,添加请求参数
}

export default function Api(apiList) {
  let api = {}  //返回对象
  
  for(var apiKey in apiList) {
    (function(apiKey){
      const key = apiKey
      api[key] = (args) => {
        const item = apiList[key]
        return fetchJsonp(mergeRequest(item.url, item.args, args))
          .then(response => {
            return response.json()
          })
          .then(res => {
            return new Promise(resolve => {
              if(res) {
                resolve(res)
              }
            })
          })
          .catch(ex => {
            console.error(ex)
          })
      }
    })(apiKey)
  }
  
  return api
}