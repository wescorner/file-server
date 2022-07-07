const net = require("net");

const conn = net.createConnection({
	host: "localhost",
	port: 3000,
});

conn.setEncoding("utf-8");

conn.on("connect", () => {
	conn.write("Client says hello!");
});

conn.on("data", (data) => {
	console.log("server says: ", data);
});
