
let fs=require("fs");
let path=require("path");

function treeFn(src){
    // console.log("tree command exicuted with path "+src );
    if (src == undefined) {
        destPath = process.cwd();
        return;
    }else{
        let doesExist = fs.existsSync(src);
        if (doesExist) {
            // console.log("source path is exist");
            treeHelper(src,"");

        }else{
            console.log("Kindly enter the correct path");
             return;
        }

    }

    return;
}

function treeHelper(dirPath ,indent){
    // is file or folder 
    
   let isFile= fs.lstatSync(dirPath).isFile();
   if (isFile == true) {
    let fileName = path.basename(dirPath);
    console.log(indent + "├──" + fileName);
} else {
    let dirName = path.basename(dirPath)
    console.log(indent + "└──" + dirName);
    let childrens = fs.readdirSync(dirPath);
    for (let i = 0; i < childrens.length; i++) {
        let childPath = path.join(dirPath, childrens[i]);
        treeHelper(childPath, indent + "\t");
    }
}
}


module.exports={
    treefxn:treeFn
};