var delay = (seconds) => new Promise((resolves, rejects) => {

	if (seconds > 3) {
		rejects(new Error(`${seconds}s is too long`));
	}
	else {
		setTimeout(() => {
			resolves('the long delay has ended');
		}, seconds*1000)	
	}
});

delay(4)
	.then(console.log)
	.then(() => 42)
	.then((number) => console.log(`hello world: ${number}`))
	.catch((error) => console.log(`error: ${error.message}`));

console.log('end first tick');
