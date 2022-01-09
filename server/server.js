//  Server script
//  Run "node server.js" to host how-react.works locally.

console.log("\x1b[32m >\x1b[0m Starting the how-react.works server, at \x1b[36mlocalhost:8080\x1b[0m !");

//  Importing libraries
var http = require('http');
var path = require('path');
var fs   = require('fs');

//  This function will fire upon every request to our server.
function server_request(req, res) {
	var url = req.url;
	console.log(`\x1b[36m >\x1b[0m New ${req.method} request: \x1b[34m${url}\x1b[0m`);
	var extname = String(path.extname(url)).toLowerCase();
	
	/*  Routes with no extension get index.html, the SPA frame.   */
  if (extname.length == 0) {
	
			res.writeHead(200, {'Content-Type': 'text/html'});
			var main_page = fs.readFileSync(__dirname + '/../index.html');
			res.write(main_page);
			res.end();

			// if (url == "/") {  } else if (url == "/admin") { }
	}

	/*  Getting a page for inside the SPA frame.                   */
	else if (extname == ".html") {
    let page_content = '';
		try {
			page_content = fs.readFileSync(__dirname + `/../pages/${url}`)
		} catch(err) {
			page_content = fs.readFileSync(__dirname + '/../pages/404.html');
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page_content);
		res.end();
	}

	/*  We also might be pinged for a .png, or something. Handle that here.  */
	else {
		fs.readFile( __dirname + '/..' + url, function(error, content) {
			if (error) {
					if(error.code == 'ENOENT') {
						fs.readFile('./404.html', function(error, content) {
							res.writeHead(404, { 'Content-Type': 'text/html' });
							res.end(content, 'utf-8');
						});
					}
					else {
				res.writeHead(500);
				res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
					}
			} else {
					var contentType = mimeTypes[extname] || 'application/octet-stream';
					res.writeHead(200, { 'Content-Type': contentType });
					res.end(content, 'utf-8');
			}
		});
	}

}


//  Creating the server!
var server = http.createServer(
	server_request
);
server.on('close', () => {
	console.log("\x1b[31m >\x1b[0m Shutting down server. Bye!")
})
process.on('SIGINT', function() {
  server.close();
});
server.listen(8080);


//  This dictionary is used in the setup function above. 
var mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};
