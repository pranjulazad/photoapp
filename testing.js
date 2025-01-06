const {Readable, Writable, finished} = require("stream");
const util = require("util")

const streamFinished = util.promisify(finished)

// const prom = new Promise((resolve, reject, onCancel) => {
//     const timeoutid = setTimeout(()=>{
//         resolve("done dana done!")
//     }, 5000);

//     // onCancel(()=>{
//     //     clearTimeout(timeoutid)
//     //     reject("failed!")
//     // });
// });

// await prom.then((result) => console.log(result))



function * hello () {
    yield 'helo';
    console.log("don1")
    yield 'pall';
    console.log("don2")
}

// readable = Readable.from(hello())

// readable.on('data', (chunk) => {
//     delay(5000)
//     console.log(chunk);
// });

const readableStream = Readable()
const writableStream = Writable()

readableStream.on("error", (err) => {
    console.log(err.stack)
})

writableStream._write = (chunk, encoding, next) => {
    console.log(chunk.toString())
    next()
}

readableStream.pipe(writableStream)

readableStream.push('ping!')
readableStream.push('pong!')

//writableStream.end()

//const hell = streamFinished(writableStream)


