const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const fs = require("fs")
const client = require("../index.js")
module.exports = client => {
    fs.readdir("./events/", (err, folders) => {

        if (err) return console.log(err);

        folders.forEach(folder => {
            if (folder.includes('.')) return;
            fs.readdir(`./events/${folder}`, (err, files) => {
                if (err) return console.log(err);

                files.forEach(file => {
                    if (!file.endsWith('.js')) return;
                    let name = file.split('.')[0];
                    let event = require(`../events/${folder}/${file}`);
                    client.on(name, event.bind(null, client));
                 //  console.log(`✅ ${name} ready`.bgBlack);
                })
            })
        })
    })
    }