let fs=require("fs");
let path=require("path");


let types = {
    media: ['mp3',"mp4", "mkv",'mov','m4a', 'm4v', 'mpg','mpeg', 'wmv', 'avi', 'flv', '3gp', '3gpp', '3g2', '3gp2'],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images:['jpeg','jpg','bmp','png','gif','raw','eps','cr2','nef','orf','sr2','tiff','tif']
}



function organizeFn(src){
    // console.log("organize command exicuted with path "+src );
     let destPath;
     if (src == undefined) {
         destPath = process.cwd();
         organizeFn(destPath);
         return;
     }else{
         let doesExist = fs.existsSync(src);
         if (doesExist) {
 
            //  create -> organized_files
             destPath = path.join(src, "organized_files");
             if (fs.existsSync(destPath) == false) {
                 fs.mkdirSync(destPath);
             }
 
         } else {
 
             console.log("Kindly enter the correct path");
             return;
         }
 
 
     }
     //function to help in organizing the file
     organizeHelper(src, destPath);
     return;
}


function organizeHelper(src, dest) {
    // identify categories of all the files present in that input directory  ->
    let childNames = fs.readdirSync(src);
 
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        // to check give path is file or not (return true or false)
        let isFileTrue = fs.lstatSync(childAddress).isFile();
        if (isFileTrue) {

            let category = getCategory(childNames[i]);
            console.log(childNames[i], " belongs to --> ", category);
            //To copy / cut  files to that organized directory inside of any of category folder 

            transferFiles(childAddress, dest, category);
        }
    }
    return;
}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}

function transferFiles(srcFilePath, dest, category) {
    // 
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to ", category);

}

module.exports={
    organizefxn:organizeFn
};