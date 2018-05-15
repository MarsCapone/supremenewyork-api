const cheerio = require('cheerio');
const request = require('request-promise')
const moment = require('moment');
module.exports = function (callback) {
  try {
    season = 'spring-summer2018'
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
