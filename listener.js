const http = require('http')
    fs = require('fs');

const server = http.createServer(function(req,res) {
    if(req.url==='/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("connected");
            res.end();
    }
});
server.on('connection',(socket)=>{
    console.log('connected to 8888');
});








server.listen(3000);
console.log("listening on 3000");