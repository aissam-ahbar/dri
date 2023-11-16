const https = require("https");
const URI = process.env.URI;

console.log(`The value of MY_VARIABLE is: ${URI}`);

let items = [];
await https.get(URI, resp => {
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

      console.log(JSON.stringify(items));

        let itemsByVille = {};
        
        // Group items by "ville"
        items.forEach((item) => {
        
          const ville = item.ville.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          if (!itemsByVille[ville]) {
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
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });


