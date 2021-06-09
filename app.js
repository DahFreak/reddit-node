const http = require('http');
const fetch = require('node-fetch')
const db = require('./Database')


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
    getJson();
})

server.listen(port, hostname, () => {
    console.log("Server is running at http://" + hostname + ":" + port);
    // setInterval(print, 3000)
    //db.GetPosts();

    let post = {
        sub: "script",
        title: "scriptTitle",
        selfText: "scriptSelf",
        username: "scriptUsername",
        created: "2019-10-10"
    }

    db.InsertPost(post);
})

function print()
{
    console.log("WAP");
}

async function getJson(){
    let resp = await fetch("https://www.reddit.com/r/hiphopheads/top.json")
        .then(res => res.json())
        .catch(err => console.log(err));

    let posts = resp.data.children;

    for (let i = 0; i < posts.length; i++)
    {
        let title = posts[i].data.title;
        if (title.toLowerCase().includes("fresh"))
        {
            console.log("Includes : " + title)
        }
        else
        {
            console.log("X : " + title)
        }
    }
}