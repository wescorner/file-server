const net = require("net");
const fs = require("fs");

const server = net.createServer();

server.on("connection", (client) => {
	console.log("client connected");
	client.setEncoding("utf8");
	client.on("data", (data) => {
		fs.readFile(`./files/${data}`, "utf-8", (err, fileData) => {
			if (err) {
				client.write("ERROR: Incorrect file location!");
			} else {
				client.write(`Contents of ${data}: ${fileData}`);
			}
		});
	});
});

server.listen(3000, () => {
	console.log("listening on port 3000");
});

//server will look for file with directory specified by the client
