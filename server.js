const express = require('express');
const app = express();
const args = require('minimist')(process.argv.slice(2));
args['port_arg'];
const port_arg = args.port_arg;

if (port_arg == null) {
    var port = 5000;
} else {
    var port = port_arg;
}

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port));
})

app.get('/app', (req, res) => {
    res.status(200).end('200 OK');
    // res.type("text/plain");
})

app.get('/app/flips/:number', (req, res) => {
    // const flips = manyflips(req.params.number)
    // res.status(200).json({ 'message': req.params.number })
    res.status(200).json({ 'message': coinFlips(req.params.number) })
})

app.use(function(req, res) {
    res.status(404).send("404 Not found");
    // res.type("text/plain");
})

function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
}

function coinFlips(flips) {
    let flip_array = [];
    while (flips > 0) {
        flip_array.push(coinFlip());
        flips--;
    }
    return flip_array;
}


function countFlips(array) {
    let head = 0, tail = 0;
    for (let item of array) {
        if (item === "heads".valueOf()) {
        head++;
        }
        else if (item === "tails".valueOf()) {
        tail++;
        }
    }
    return {heads: head, tails: tail};
}

function flipACoin(call) {
    let flip_result = coinFlip(), win_result = 'lose';
    if (flip_result == call) {
        win_result = 'win'
    }
    return {
        call: call,
        flip: flip_result,
        result: win_result 
    };
}