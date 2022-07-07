const net = require("net");
const fs = require("fs");
const asciify = require("asciify-image");

const server = net.createServer();

server.on("connection", (client) => {
	console.log("client connected");
	client.setEncoding("utf8");
	client.on("data", (data) => {
		if (data.substring(data.length - 3) === "txt") {
			fs.readFile(`./files/${data}`, "utf-8", (err, fileData) => {
				if (err) {
					client.write("ERROR: Incorrect file location!");
				} else {
					client.write(`Contents of ${data}: ${fileData}`);
				}
			});
		}
		if (data.substring(data.length - 3) === "jpg") {
			const options = {
				fit: "box",
				width: 50,
				height: 50,
			};
			fs.readFile(`./files/${data}`, "base64", (err, fileData) => {
				if (err) {
					client.write("ERROR: Incorrect file location!");
				} else {
					asciify("./files/motorcycle.jpg", options, (err, ascii) => {
						if (err) throw err;
						client.write(ascii);
					});
					// client.write(Buffer.from(fileData).toString("base64"));
				}
			});
		}
	});
});

server.listen(3000, () => {
	console.log("listening on port 3000");
});
