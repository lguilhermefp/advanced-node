var fs = require('fs');
var { promisify } = require('util');

var delay = (seconds, callback) => {
	if (seconds > 3) {
		callback(new Error(`${seconds}s is too long`));
	} else {
		setTimeout(() => callback(null, `the ${seconds}s delay is over`), seconds*1000);
	}
}

delay(3, (error, message) => {
	if(error) {
		console.log(error.message);
	} else {
		console.log(message);
	}
});

var promiseDelay = promisify(delay)

promiseDelay(4)
	.then(console.log)
	.catch((error) => console.log(`error: ${error.message}`));


var writeFile = promisify(fs.writeFile);

writeFile('sample.txt', 'this is a sample')
	.then(() => console.log('file successfully created'))
	.catch((error) => console.log(`error creating file: ${error.message}`));
