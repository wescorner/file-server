const net = require("net");
const readline = require("readline");

const conn = net.createConnection({
	host: "localhost",
	port: 3000,
});

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const promptInput = function () {
	rl.question("Enter file name to be retreived: ", (answer) => {
		conn.write(answer);
	});
};
promptInput();

conn.on("data", (data) => {
	console.log(data);
	setTimeout(promptInput, 1000);
});

conn.setEncoding("utf8");
