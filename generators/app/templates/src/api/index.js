import Api from './api'

const apis = {
  getShopInfo: {
    url: '//mock.com/getShopInfo',
    args: { shopID: undefined }
  }
}

export default Api(apis)