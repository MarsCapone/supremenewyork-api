const api = require('./index.js');


// Example of using two api functions together
api.find('decline', 'all', (item, error) => {
  if (error) {
    console.log(error);
  } else {
    api.styles(JSON.parse(item).id, (styles, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(styles);
      }
    })
  }
});

/*api.droplist((droplist, error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(droplist);
  }
})*/

/*api.find('sled', 'all', (item, error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(item);
  }
});*/
//        Product ID (Can be gotten from find function)
/*api.styles('171145', (styles, error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(styles);
  }
});*/
