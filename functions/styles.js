const request = require('request-promise');
module.exports = function (id, callback) {
  try {
    const opts = {
      method: 'GET',
      json: true,
      uri: `http://www.supremenewyork.com/shop/${id}.json`,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.9',
        'Host': 'www.supremenewyork.com',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25'
      },
      gzip: true
    }
    request(opts)
      .then(function(json) {
        final = []
        json.styles.forEach(function(style) {
          styleinfo = {
            title: style.name.toString(),
            id: style.id.toString(),
            imageurl: `images.supremenewyork.com/${style.image_url_hi.toString().split('t/')[1]}`
          }
          final.push(styleinfo)
        })
        callback(JSON.stringify(final), null)
      })
  } catch (e) {
    callback('', e)
  }
}
