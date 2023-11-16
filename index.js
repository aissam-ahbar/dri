const https = require("https");
const URI = process.env.URI;

console.log(`The value of MY_VARIABLE is: ${URI}`);

let items = [];
https.get(URI, resp => {
    var data = "";

    // A chunk of data has been recieved.
    resp.on("data", chunk => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on("end", () => {
      try {
        var items = JSON.parse(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }   
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });

        console.log(JSON.stringify(items));

