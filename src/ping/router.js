const { respondWith200OkText } = require('../httpHelpers');
const { routerHandleResult } = require('../routerHandleResult');

const handle = (request, response) => {
  var pingPath = new RegExp(/\/ping/)

  if (!pingPath.test(request.url)) {
    return routerHandleResult.NO_URL_PATH_MATCH;
  }
  
  if (request.method !== 'GET') {
    return routerHandleResult.NO_HTTP_METHOD_MATCH;
  }

  respondWith200OkText(response, 'pong');
  return routerHandleResult.HANDLED;
}

module.exports = {
  handle,
};
