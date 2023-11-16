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
                      if (ville && !itemsByVille[ville]) {
                        itemsByVille[ville] = [];
                      }
                      itemsByVille[ville].push(item);
           });
        
            for (const ville in itemsByVille) {
              const fileName = ville + '.json';
              const fileContent = JSON.stringify(itemsByVille[ville], null, 2); // 2 is for indentation
              // Append the JSON data to the file
                console.log(fileName)
            }
    


      } catch (error) {
        console.error("Error parsing JSON:", error);
      }   
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });


