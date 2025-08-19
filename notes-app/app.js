
const fs = require("fs");
const validator = require("validator");

const add = require("./utils");
const notes = require("./notes");
const yargs = require("yargs");



/* const fs = require("fs");
const validator = require("validator"); */

//fs.writeFileSync("notes.txt", "My name is Parth");


//fs.appendFileSync("notes.txt", " I am a student");

/* 

console.log(getNotes());

console.log(validator.isEmail("parth@gmail.com"));
console.log(validator.isURL("https://www.google.com"));


const chalk = require('chalk');
console.log(chalk.inverse.red('Error  !')); 

console.log(process.argv); */

//console.log(process.argv);
//console.log(yargs.argv);

yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true, 
            type: "string"
        },
        body: {
            describe: "Note body",
            demandOption: true, 
            type: "string"
        }
    },
    handler: function(argv){
        console.log("Adding a new note with title", argv.title);
        console.log("Adding a new note with body", argv.body);
        notes.addNote(argv.title, argv.body);
    }   
});

yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true, 
            type: "string"
        }
    },
    handler: function(argv){
        console.log("Removing a note");
        notes.removeNote(argv.title);
    }   
});

yargs.command({
    command: "list",
    describe: "List all notes",
    handler: function(argv){
        console.log("Listing all notes");
    }   
});

yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true, 
            type: "string"
        }
    },
    handler: function(argv){
        console.log("Reading a note");
        notes.readNote(argv.title);
    }   
});

yargs.command({
    command: "list",
    describe: "List all notes",
    handler: function(argv){
        console.log("Listing all notes");
        notes.listNotes();
    }   
});

yargs.command({
    command:"read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true, 
            type: "string"
        }
    },
    handler: function(argv){
        console.log("Reading a note");
        notes.readNote(argv.title);
    }   
});
yargs.parse();
/* 
if(process.argv[2] === "add"){
    console.log("Adding new note");
}else if(process.argv[2] === "remove"){
    console.log("Removing note");
}else if(process.argv[2] === "list"){
    console.log("Listing note");
} */

//console.log(add(1,2));