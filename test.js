const api = require('./index.js');

api.find('hanes', 'all', (item, error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(item);
  }
});
