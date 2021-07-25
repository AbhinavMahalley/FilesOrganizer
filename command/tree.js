
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
            treeHelper(src);

        }else{
            console.log("Kindly enter the correct path");
             return;
        }

    }

    return;
}
function treeHelper(dirPath ){
    let dirName = path.basename(dirPath)
    console.log( "└──> " + dirName);
    let childrens = fs.readdirSync(dirPath);
    for (let i = 0; i < childrens.length; i++) {
        let childPath = path.join(dirPath, childrens[i]);
        let isFile= fs.lstatSync(childPath).isFile();
      if (isFile == true) {
        let fileName = path.basename(childPath);
        console.log( "   ├── " + fileName);
        } else{
            let folderName = path.basename(childPath);
            console.log("   └──> " + folderName);
        }
    }
}


module.exports={
    treefxn:treeFn
};