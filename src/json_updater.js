/* ===================================================
 This utility expects:
 
 1. The following file/folder structure:

 parentFolder
    .
    |
    |---> 24
    |
    |---> 25
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
    - update the Object's 'img' array with all the files in the subfolder
- output the JSON data
======================================================*/





// Import JSON data - 'spaces' is an array of Objects
const spaces = require('./test.json')

// Path to folder containing all the subfolders
const pathToFolder = '../public/images/spaces/'

// Load the fs (filesystem) module
const fs = require('fs')

// Obtain an array containing names of all subfolders
const folderNames = fs.readdirSync(pathToFolder)

// Loop through all subfolders
folderNames.forEach(subFolder => {
    // Ignore current & parent folders
    if (subFolder === "." || subFolder === "..") {
        return
    }
    // Sanity check: make sure the subfolder *is* in fact a directory, not a file
    if (fs.lstatSync(pathToFolder + subFolder).isDirectory()) {

        // Obtain an array containing names of all files in the subfolder
        let files = fs.readdirSync(pathToFolder + subFolder)

        // Find the Object whose id matches the subfolder's name, and update it
        spaces.forEach(space => {
            if (space.id === subFolder) {
                space.img = files
            }
        })
        
    }
})

// Convert object data to string (with 2-space indents)
let data = JSON.stringify(spaces, null, 2)

// Output JSON data
fs.writeFileSync('test.json', data)  