const fs = require("fs");

const data = fs.readFileSync("1.json",'utf-8');

console.log(data);

const dataJson = JSON.parse(data);


console.log(dataJson.name);

dataJson.age = 30;

fs.writeFileSync("1.json", JSON.stringify(dataJson));

console.log(dataJson);