exports.find = function (keywords, category, callback) {
  require('./functions/find')(keywords, category, callback)
};

exports.droplist = function (callback) {
  require('./functions/droplist')(callback)
};

exports.styles = function (id, callback) {
  require('./functions/styles')(id, callback)
};
