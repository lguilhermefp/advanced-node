var fs = require('fs');
var { promisify } = require('util');

var writeFile = promisify(fs.writeFile);
var unlink = promisify(fs.unlink);
var readdir = promisify(fs.readdir);

var beep = () => process.stdout.write("\x07");

var delay = (seconds) => new Promise((resolves) => {
	setTimeout(resolves, seconds*1000);
});

Promise.all([
	writeFile('readme.md', 'hello world'),
	writeFile('readme.txt', 'hello world'),
	writeFile('readme.json', '{ "hello": "world" }')
]).then(() => readdir(__dirname))
	.then(console.log);

Promise.race([
	delay(5),
	delay(3),
	delay(1)
]).then(() => readdir(__dirname))
	.then(console.log);
