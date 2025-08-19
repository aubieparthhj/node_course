const fs = require("fs");
const chalk = require("chalk");

const getNotes = function(){
    return "Your notes...";
}   
const addNote = (title, body)=>{
    const notes = loadNotes();
    const note = {
        title: title,
        body: body
    }
    const duplicateNotes = notes.filter((note)=> note.title === title)
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        console.log("New note added", note);
    }else{
        console.log("Note title already exists");
    }
}

const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}

const listNotes = ()=>{
    const notes = loadNotes();
    console.log(chalk.inverse("Your notes"));
    notes.forEach((note)=>{
        console.log(note.title + ": " + note.body);
    })
}

const readNote = (title)=>{
    const notes = loadNotes();
    const note = notes.find((note)=> note.title === title)
    if(note){
        console.log(chalk.inverse(note.title) + ": " + note.body);
    }else{
        console.log(chalk.red.inverse("Note not found"));
    }
}
const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];  
    }
}

const removeNote = (title)=>{
    const notes = loadNotes();
    const filteredNotes = notes.filter((note)=> note.title !== title)
    if(filteredNotes.length === notes.length){
        console.log(chalk.red.inverse("Note not found"));
    }else{
        saveNotes(filteredNotes);
        console.log(chalk.green.inverse("Note removed", title));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,   
    readNote: readNote
}