var fs = require('fs');
var { promisify } = require('util');

var writeFile = promisify(fs.writeFile);
var unlink = promisify(fs.unlink);

var beep = () => process.stdout.write("\x07");

var delay = (seconds) => new Promise((resolves) => {
	setTimeout(resolves, seconds*1000);
});

const doStuffSequentially = () => Promise.resolve()
	.then(() => console.log('starting'))
	.then(() => delay(3))
	.then(() => 'waiting')
	.then(console.log)
	.then(() => delay(3))
	.then(() => writeFile('file.txt', 'sample file'))
	.then('beep')
	.then(() => 'file.txt created')
	.then(console.log)
	.then(() => delay(3))
	.then(() => unlink('file.txt'))
	.then(beep)
	.then(() => 'file.txt removed')
	.then(console.log)
	.catch(console.error)

// const doStuffSequentially = () => {
// 	console.log('starting');
// 	setTimeout(() => {
// 		console.log('waiting');
// 		setTimeout(() => {
// 			console.log('waiting some more');
// 			fs.writeFile('file.txt', 'sample file', error => {
// 				if (error) {
// 					console.log(error);
// 				} else {
// 					beep();
// 					console.log('file.txt created');
// 					setTimeout(() => {
// 						beep();
// 						fs.unlink('file.txt', error => {
// 							if (error) {
// 								console.log(error);
// 							} else {
// 								console.log('file.txt removed');
// 								console.log('sequantial execution completed')
// 							}
// 						});
// 					}, 3000);
// 				}
// 			});
// 		}, 2000);
// 	}, 1000);
// }

doStuffSequentially();
