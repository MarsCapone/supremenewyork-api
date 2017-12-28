const api = require('./index.js');

api.find('hanes tagless', 'accessories', (item, error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(item);
  }
});
