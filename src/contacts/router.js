const {
  urlQuery,
  respondWith200OkJson,
  respondWith400BadRequest,
  respondWith404NotFound,
  respondWith204NoContent
} = require('../httpHelpers');
const { routerHandleResult } = require('../routerHandleResult');
const Contact = require('./contactController');

const isNormalInteger = (str) => {
  return /^\+?(0|[1-9]\d*)$/.test(str);
}

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

const handle = (request, response) => {
  var onlyPath = new RegExp(/\/contacts/)
  var pathWithId = new RegExp(/\/contacts\/([0-9]+)/)
  var pathWithQueryString = new RegExp(/\/contacts\?/)
  if (!onlyPath.test(request.url)) {
    return routerHandleResult.NO_URL_PATH_MATCH;
  }
  // console.log('onlyPath', request.url, onlyPath.test(request.url) && !pathWithQueryString.test(request.url) && !pathWithId.test(request.url))
  // console.log('pathWithId', request.url, pathWithId.test(request.url))
  // console.log('pathWithQueryString', request.url, pathWithQueryString.test(request.url))
  if (onlyPath.test(request.url) && !pathWithQueryString.test(request.url) && !pathWithId.test(request.url) && request.method === 'GET') {
    
    var query = urlQuery(request);
    if (query.limit){
      if (!isNormalInteger(query.limit)) {
        respondWith400BadRequest(response)
      }
      else{
        const contacts = Contact.findAll(query);
        if (contacts  !== undefined) {
          respondWith200OkJson(response, contacts)
        }
        else{
          respondWith404NotFound(response)
        }
      }
    }
    else if (query.phrase){
      if (query.phrase.length <= 0) {
        respondWith400BadRequest(response)
      }
      else{
        const contacts = Contact.findAll(query);
        if (contacts  !== undefined) {
          respondWith200OkJson(contacts)
        }
        else{
          respondWith404NotFound(response)
        }
      }
    }
    else {
      if (!isEmptyObject(query) && query.phrase.length <= 0) {
        respondWith400BadRequest(response)
      }
      else{
        const contacts = Contact.findAll();
        if (contacts  !== undefined && contacts.length > 0) {
          respondWith200OkJson(response, contacts)
        }
        else{
          respondWith404NotFound(response)
        }
      }
    }
  }
  else if (pathWithId.test(request.url) && request.method === 'GET') {
    const path = request.url.split("/")
    const contacts = Contact.findById(path[2]);
    if (contacts  !== undefined && contacts.length > 0) {
      respondWith200OkJson(response, contacts)
    }
    else{
      respondWith404NotFound(response)
    }
    
  }
  else if (pathWithId.test(request.url) && request.method === 'DELETE') {
    const path = request.url.split("/")
    const status = Contact.deleteById(path[2]);
    if (status) {
      respondWith204NoContent(response)
    }
    else{
      respondWith404NotFound(response)
    }

  }
  else {
    respondWith400BadRequest(response)
	}
  
  return routerHandleResult.HANDLED;
}

module.exports = {
  handle,
};
