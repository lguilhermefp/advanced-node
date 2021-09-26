function hideString(str, done) {
	process.nextTick(() => {
		done(str.replace(/[a-zA-z]/g, 'X'));
	})
}

var hidden = hideString('Hello world', (hidden) => {
	console.log(hidden);
});

console.log('end');
