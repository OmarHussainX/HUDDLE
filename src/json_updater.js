/* ===================================================
 This utility expects:
 
 1. The following folder structure:

 parentFolder
    .
    .
    |
    |---> 24
    |
    |---> 25
    .
    .

- 'parentFolder' contains subfolders
- each subfolder's name is an integer
- each subfolder contains a few image files

2. A JSON file with object data of the format:

[{
    "id": "23",
    "img": ["sdf.jpg", "mwq.jpg", "ftrty.jpg"],
    "moreproperties": "mmmmmmm"
},
{
    "id": "24",
    "img": ["poi.jpg", "rew.jpg", "nbvc.jpg"],
    "moreproperties": "ttttttt"
}]

Given the above, this utility will:
- import the JSON data
- loop through all subfolders, and for each subfolder:
    - find the Object whose id matches the subfolder name
    - update the Object's 'img' array with all the files in the sufolder
- output the JSON data
======================================================*/



const fs = require('fs')

// const pathToImageFolder = '/home/omar/Documents/evolveu/huddle/public/images/spaces/'
const pathToImageFolder = '../public/images/spaces/'
const folderNames = fs.readdirSync(pathToImageFolder)
let count = 0

folderNames.forEach(folder => {
    if (folder === "." || folder === "..") {
        return
    }
    if (fs.lstatSync(pathToImageFolder + folder).isDirectory()) {
        console.log(`found a folder: ${folder}`)
        
        let files = fs.readdirSync(pathToImageFolder + folder)
        console.log(files)
        files.forEach(file => console.log(`${folder}->${file}`))

        count++
    }

})
console.log(`found ${count} folders!`)