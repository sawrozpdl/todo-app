const express = require('express');
const server = express();
const cors = require('cors');
const route = require('./routes/api.route');
const handleError = require('./middlewares/handle.error');


config = require('./config.json');

const PORT = config.port;

server.use(cors());

server.use(express.urlencoded({
    extended:true
}));

server.use(express.json());

server.use('/api', route);

server.use(function(req, res, next) {
    next({
        msg : 'Not found',
        status : 404
    });
});

server.use(handleError);

server.listen(PORT, function(error, success) {
    if (!error)
        console.log(`Server listening at port ${PORT}`);
});
