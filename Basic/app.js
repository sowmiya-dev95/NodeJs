const http = require("http");
const fs = require('fs');

const server = http.createServer((req,res)=>{

    const url = req.url;
    const method = req.method; 
    if(url==='/') {
        res.setHeader('Content-type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Enter Form</title></head>')
        res.write('<body><form  action="/message" method="POST"><input type="text" name="sowmiya"><input type="submit" value="send"></form></body>')
        res.write('</html>')
        return res.end();
  //form enctype="multipart/form-data" and <input type="file" name="file">
    }

    if(url==='/message' && method == 'POST'){

        const body = [];
        req.on('data', (chunk)=>{
            // console.log('chunk:');
            // console.log(chunk);
            body.push(chunk)
            console.log(chunk);
        })

        req.on('end',()=>{ 
            console.log('End event received');
            const parsedBody =  Buffer.concat(body).toString();
            //console.log(parsedBody);
            const message = parsedBody.split('=');
            fs.writeFileSync('hello.txt', message[1]); 
        })

        fs.writeFileSync('hello.txt', 'Dummy');
        console.log('Filewrite completed!');
        res.setHeader('Location','/')
        res.statusCode = 302;
        return res.end();

    }


   res.setHeader('Content-type', 'text/html');
   res.write('<html>')
   res.write('<head><title>Sowmiya</title></head>')
   res.write('<body><h1>Hello From Node.Js Server<h1></body>')
   res.write('</html>')
   res.end();
});
server.listen(4000); 
 