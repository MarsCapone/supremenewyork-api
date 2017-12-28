const request = require('request-promise');
const cheerio = require('cheerio');
const moment = require('moment');

exports.find = function (keywords, category, callback) {
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
                  var productinfo = {
                    'title': product.name,
                    'price': (product.price / 100).toFixed(2).toString(),
                    'id': product.id.toString(),
                    'imageurl': 'http://images.supremenewyork.com' + product.image_url.substring(2).replace('/ca', '/ma').split('.net')[1],
                    'new': product.new_item.toString(),
                    'category': product.category_name
                  };
                  callback(JSON.stringify(productinfo), null)
                }
              });
            }
          }
        } else {
          json.products_and_categories[category.toLowerCase().charAt(0).toUpperCase() + category.toLowerCase().substr(1)].forEach(function(product) {
            if (product.name.replace(/[^a-zA-Z0-9]/g,'_').replace(/__/g, ' ').replace(/_/g, ' ').toLowerCase().indexOf(keywords.toLowerCase()) !== -1) {
              var productinfo = {
                'title': product.name,
                'price': (product.price / 100).toFixed(2).toString(),
                'id': product.id.toString(),
                'imageurl': 'http://images.supremenewyork.com' + product.image_url.substring(2).replace('/ca', '/ma').split('.net')[1],
                'new': product.new_item.toString(),
                'category': product.category_name
              };
              callback(JSON.stringify(productinfo), null)
            }
          });
        }
      })
  } catch (e) {
    callback('', e);
  }
};

exports.droplist = function (callback) {
  try {
    season = 'fall-winter2017'
    var d = new Date();
    d.setDate(d.getDate() + (4 + 7 - d.getDay()) % 7);
    var formatted = moment(d).format('YYYY-MM-DD');
    const opts = {
      method: 'GET',
      uri: `https://supremecommunity.com/season/${season}/droplist/${formatted}/`,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'
      },
      gzip: true
    }
    request(opts)
      .then(function(response) {
        $ = cheerio.load(response, {
          normalizeWhitespace: true
        })
        dropinfo = {
          date: formatted,
          season: season,
          items: []
        }
        $('.card-details').each(function (item) {
          base = $(this).text().replace(/\s\s+/g, ' ').substring(1).replace(' /£','/£').replace(' $', '~$')
          try {
            iteminfo = {
              title: base.split('~')[0],
              price: base.split('~')[1].slice(0, -1)
            }
            dropinfo.items.push(iteminfo)
          } catch (e) {
            iteminfo = {
              title: base.split('~')[0].slice(0, -1),
              price: 'unknown'
            }
            dropinfo.items.push(iteminfo)
          }
        });
        callback(JSON.stringify(dropinfo), null)
      })
  } catch (e) {
    callback('', e);
  }
};
