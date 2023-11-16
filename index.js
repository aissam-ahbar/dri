const https = require("https");
const URI = process.env.URI;

console.log(`The value of MY_VARIABLE is: ${URI}`);

let items = [];
let itemsByVille = {};

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

          items.forEach((item) => {
            const ville = item.ville.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            console.log(ville);
          })
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }   
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });


