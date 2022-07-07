const net = require("net");

const server = net.createServer();

server.on("connection", (client) => {
	console.log("client connected");
	client.setEncoding("utf-8");
	client.on("data", (data) => {
		console.log("Message from client: ", data);
	});
});

server.listen(3000, () => {
	console.log("listening on port 3000");
});

//server will look for file with directory specified by the client
