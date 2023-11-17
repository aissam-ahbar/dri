console.log("start program...", new Date());

const https = require("https");
const fs = require('fs');

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
              if(item && item.ville) {
                const ville = item.ville.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                  if (!itemsByVille[ville]) {
                    itemsByVille[ville] = [];
                  }
                  itemsByVille[ville].push(item);
              }    
           });
        
            // Loop through the grouped items and append them to files
            var id = 0;
            for (const ville in itemsByVille) {
              const fileName = ville + '.json';
              const fileContent = JSON.stringify(itemsByVille[ville], null, 2); // 2 is for indentation
              // Append the JSON data to the file
                if(id ==0) {
                  fs.writeFile('output/' + fileName.toLowerCase(), fileContent, (err) => {
                    if (err) {
                      console.error(`Error appending to ${fileName}: ${err}`);
                    } else {
                      console.log(`Data appended to ${fileName}.`);
                    }
                      id++;
                  });
                }
            }   


      } catch (error) {
        console.error("Error parsing JSON:", error);
      }   
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });


