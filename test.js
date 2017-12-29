const api = require('./index.js');

/*api.droplist((droplist, error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(droplist);
  }
})*/

api.find('sled', 'all', (item, error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(item);
  }
});
