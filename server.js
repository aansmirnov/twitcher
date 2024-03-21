const nodeStatic = require('node-static');
const mainFile = new nodeStatic.Server(`${__dirname}/build`)

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        mainFile.serve(request, response)
    }).resume()
}).listen(3000)