const https = require("https");
const URI = process.env.URI;

console.log(`The value of MY_VARIABLE is: ${URI}`);

https.get(URI, resp => {
    let data = "";

    // A chunk of data has been recieved.
    resp.on("data", chunk => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on("end", () => {
      let data = JSON.parse(data);
      console.log(JSON.stringify(data));      
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });
