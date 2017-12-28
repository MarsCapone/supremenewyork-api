const request = require('request-promise');

module.exports.find = function (keywords, category, callback) {
  try {
    const opts = {
      method: 'GET',
      json: true,
      uri: `http://www.supremenewyork.com/mobile_stock.json`,
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
        if (category === 'all') {
          for (cat in json.products_and_categories) {
            if (cat === 'new') {

            } else {
              json.products_and_categories[cat].forEach(function(product) {
                if (product.name.replace(/[^a-zA-Z0-9]/g,'_').replace(/__/g, ' ').replace(/_/g, ' ').toLowerCase().indexOf(keywords.toLowerCase()) !== -1) {
                  callback(product.name, null)
                }
              });
            }
          }
        } else {
          json.products_and_categories[category.toLowerCase().charAt(0).toUpperCase() + category.toLowerCase().substr(1)].forEach(function(product) {
            if (product.name.replace(/[^a-zA-Z0-9]/g,'_').replace(/__/g, ' ').replace(/_/g, ' ').toLowerCase().indexOf(keywords.toLowerCase()) !== -1) {
              callback(product.name, null)
            }
          });
        }
      })
  } catch (e) {
    callback('', e);
  }
};
