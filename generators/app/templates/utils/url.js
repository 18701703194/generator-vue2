let Url = {}

//查询参数
Url.getRequest = (arg) => {
  var reg = new RegExp("(^|&)" + arg + "=([^&]*)(&|$)")
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]);
  return null
}

//为接口添加参数
Url.addRequest = (url, args) => {
  for(var key in args ) {
    url += url.indexOf('?') == -1 ? '?' : '&'
    url += encodeURIComponent(key) + '=' + encodeURIComponent(args[key])
  }
  return url
}

//如果url是mock.com表示请求mock数据,可通过页面链接参数mockServer设置mock服务器,默认为本地3000端口
Url.getUrl = (url) => {
  return url.indexOf('mock.com') > 0 ?
    url.replace(/^(http:|https:)?\/\/.+\.com/, Url.getRequest('mockServer') || 'http://127.0.0.1:3000')
    : Url(url)
}

export default Url