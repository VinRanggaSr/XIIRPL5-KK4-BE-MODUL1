const http = require('node:http');

const todos = [
    {id: 1, text: 'Todo one'},
    {id: 2, text: 'Todo two'},
    {id: 3, text: 'Todo three'}
];

const port = 7000;

const server = http.createServer((req, res) => {
//  res.statusCode = 404;
//  res.setHeader('Content-Type', 'Application/json');
//  res.setHeader('X-Powered-By', 'Node.js')
 const {method, url} = req;
 
//  ---404 not found juga bisa ditulis---
// res.writeHead(404, {
//     'Content-Type': 'application/json',
//     'X-Powered-By': 'Node.JS',
// })
 let body = [];

 req.on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        let status = 404;
        const response = {
            success: false,
            results: [],
            error: '' 
        }
        // console.log(body);
        if (method === 'GET' && url === '/todos'){
            status = 200;
            response.success = true;
            response.results = todos
        } else if(method === 'POST' && url === '/todos'){
            const {id, text} = JSON.parse(body);

            if (!id || !text) {
                status = 400;
                response.error = 'Please add id and text';
            }else {
                todos.push({id, text});
                status = 201;
                response.success = true;
                response.results = todos;
            }
        }
        res.writeHead(status, {
            'content-Type': 'application/JSON',
            'X-Powered-By': 'Node.js'
        })
        res.end(JSON.stringify(response));
    });
    
//  const data = JSON.stringify({
//     success: false,
//     error: 'Not Found',
//     data: null,
//  })

//  res.end(data);
});

server.listen(port, () => 
  console.log(`Udah bisa di running di port ${port}`));
