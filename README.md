# supremenewyork-api
[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=1.0.4&x2=0)](https://badge.fury.io/js/supremenewyork-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

An api for SupremeNewYork based in NodeJS.

This package has many features. You can read about all of the features on the [documentation](https://github.com/aarock1234/supremenewyork-api/wiki/Documentation).
Below you will find information on how to install the package + some basic features.

## Requirements
| Requirement | Version |
| ---|---|
| Node | ^8.8.0 |
| NPM | ^5.5.1 |


## Installation

``npm i supremenewyork-api``


## Usage

For all features of this package, please visit the [documentation](https://github.com/aarock1234/supremenewyork-api/wiki/Documentation).

### Find Function
Finds item based on keyword and category and returns a json string with information.

#### Sample JSON Response

```json
{  
  "title": "Sled",
  "price": "58.00",
  "id": "171145",
  "imageurl": "http://images.supremenewyork.com/142396/ma/Bennk6ztM1w.jpg",
  "new": "true",
  "category": "Accessories"
}
```

#### Example Code for Find

```js
const api = require('supremenewyork-api');

api.find('sled', 'all', (item, error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(item);
  }
});
```
