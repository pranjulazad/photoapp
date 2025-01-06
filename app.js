const express = require('express');
const path = require('path');
const app = express();
const cluster = require('cluster');
const os = require('os');

// routes
const postRoutes = require("./routes/post_routes.js")
const commentRoutes = require("./routes/comment_routes.js")

// db model user
const User = require('./models').user;

// CPU cores
const cpus_count = os.cpus().length


if(process.env.CLUSTERED == "true" && cluster.isMaster){
    console.log("Master is initializing");
    console.log(`Starting ${cpus_count} workers`);

    for(let w = 0; w < cpus_count; w+=1){
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker process ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });

}else{
    // start application
    // EJS view engine setup
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));

    // parse body
    app.use(express.urlencoded({
        extended: false
    }));
    app.use(express.json());

    // add user to request
    app.use((req, res, next) => {
        User.findOne().then((r) => {
            req.user = r
            next()
        }).catch((err) => {
            res.send(err.message)
        })
    })

    app.use("/web", [postRoutes, commentRoutes])

    post = process.env.PORT || 3000

    app.listen(post);
}


// start app
//clustered =  CLUSTERED=true NODE_ENV=production node app.js 
// non clustered = node app.js
