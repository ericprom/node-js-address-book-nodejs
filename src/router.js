const {
  respondWith404NotFound,
} = require('./httpHelpers');
const { routerHandleResult } = require('./routerHandleResult');

const routers = [
  require('./ping').pingRouter,
  require('./contacts').contactsRouter,
  // require('./contactDetails').contactDetailsRouter,
];

module.exports = (request, response) => {
  var pingPath = new RegExp(/\/ping/)
  var contactsPath = new RegExp(/\/contacts/)
  if (pingPath.test(request.url) || contactsPath.test(request.url)){
    routers.find((route) => {
      if (route.handle(request, response) !== routerHandleResult.HANDLED) {
        respondWith404NotFound(response);
      }
    })
  }
  else{
    respondWith404NotFound(response);
  }
};
