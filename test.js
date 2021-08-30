const api = require("./index.js")
const hypixel = new api("YOUR_KEY")
hypixel.getData("Googlefan").then(a=>console.log(a))