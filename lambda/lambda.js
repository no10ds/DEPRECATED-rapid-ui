const regexSuffixless = /\/[^/.]+$/ // e.g. "/some/page" but not "/", "/some/" or "/some.jpg"
const regexTrailingSlash = /.+\/$/ // e.g. "/some/" or "/some/page/" but not root "/"

exports.handler = function (event, _, callback) {
  const { request } = event.Records[0].cf
  const uri = request.uri

  console.log('URI', uri)

  // Handle route without a suffix
  if (uri.match(regexSuffixless)) {
    request.uri = uri + '.html'
    console.log('MATCHED 1', request.uri)
    callback(null, request)
    return
  }

  // Handle dynamic routes
  const dynamicRoutes = {
    '/catalog/[search].html': /\/catalog\/[0-9a-zA-Z]/,
    '/data/download/[domain]/[dataset].html': /\/data\/download\/[^/]+\/[^/]+/,
    '/subject/modify/[subjectId].html': /\/subject\/modify\/[^/]+/,
    '/subject/modify/success/[subjectId].html': /\/subject\/modify\/success\/[^/]+/,
    '/tasks/[jobId].html': /\/tasks\/[^/]+/
  }
  if (uri && regexTrailingSlash.test(uri)) {
    Object.keys(dynamicRoutes).forEach((key) => {
      const value = dynamicRoutes[key]
      const isDynamicRouteMatch = value.test(uri)
      if (isDynamicRouteMatch) {
        request.uri = key
        console.log('MATCHED 2', request.uri)
        callback(null, request)
        return
      }
    })
  }

  // Handle all other routes that have a trailing slash
  if (uri.match(regexTrailingSlash)) {
    request.uri = uri + 'index.html'
    console.log('MATCHED 3', request.uri)
    callback(null, request)
    return
  }

  return callback(null, request)
}
