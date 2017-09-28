export const get = {
  path: '/debug/echo',
  handler (req, res, next) {
    // I can't just pass through req here because of circular structure
    // So I've selected out some of the main properties that aren't
    res.send({
      readable: req.readable,
      domain: req.domain,
      // socket: req.socket,
      // connection: req.connection,
      httpVersionMajor: req.httpVersionMajor,
      httpVersionMinor: req.httpVersionMinor,
      httpVersion: req.httpVersion,
      complete: req.complete,
      headers: req.headers,
      rawHeaders: req.rawHeaders,
      trailers: req.trailers,
      rawTrailers: req.rawTrailers,
      upgrade: req.upgrade,
      url: req.url,
      method: req.method,
      statusCode: req.statusCode,
      statusMessage: req.statusMessage,
      // client: req.client,
      // log: req.log,
      serverName: req.serverName,
      // timers: req.timers,
      params: req.params,
      context: req.context,
      route: req.route,
      query: req.query
    })
    return next()
  }
}
