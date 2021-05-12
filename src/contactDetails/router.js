const {
  urlPathOf,
  urlQuery,
  respondWith200OkJson,
} = require('../httpHelpers');
const { routerHandleResult } = require('../routerHandleResult');
// const Contact = require('./contactController');

const handle = (request, response) => {

  // if (urlPathOf(request) !== '/contactDetails') {
  //   return routerHandleResult.NO_URL_PATH_MATCH;
  // }
}

module.exports = {
  handle,
};
