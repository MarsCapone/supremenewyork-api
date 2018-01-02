const request = require('request-promise')
const cheerio = require('cheerio');
module.exports = function (func, callback) {
  const opts = {
    method: 'GET',
    uri: `http://www.supremenewyork.com/shop/all`,
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
    .then(function(response) {
      $ = cheerio.load(response)
      $('.inner-article').each(function (i, elm) {
        if (elm.children[0].children[1] != undefined) {
          console.log(elm.children[0].attribs['href']);
        }
      });
    })
}
