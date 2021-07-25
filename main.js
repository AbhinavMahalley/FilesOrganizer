let helpObj = require("./command/help");
let treeObj = require("./command/tree");
let organizeObj = require("./command/organize");

//main input
// input -> node main.js tree "path"
// Print -> tree command exicuted with path ""
// input -> node main.js organize "path"
// Print -> organize command exicuted with path ""
// input -> node main.js help 
// Print -> list of all commands
            //1. node main.js tree "path"
            //2.node main.js organize "path"
            // 3.node main.js help   

let inputArr=process.argv.slice(2);
let command=inputArr[0];

switch(command){
    case "help":  helpObj.helpfxn();
    break;

    case "tree":    treeObj.treefxn(inputArr[1]);
    break;

    case "organize":organizeObj.organizefxn(inputArr[1]);
    break;

    default:console.log("please enter the correct command");
    break;
};