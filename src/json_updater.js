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

- prompt user to enter the path to the JSON file to update
- import the JSON data
- loop through all subfolders, and for each subfolder:
    - find the Object whose id matches the subfolder name
    - update the Object's 'img' array with all the files in the subfolder
- output the JSON data
======================================================*/




// ---------------------------------------------------
// Setup data sources & I/O module

// Path to folder containing all the subfolders
const pathToFolder = '../public/images/spaces/'

// Default path to JSON file to be updated - user will be prompted for
// input to override this
let jsonFile = './test.json'

// Handle I/O
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
// ---------------------------------------------------




// Prompt user to input name (with path) of JSON file to update
// (NOTE: .question()'s callback only gets executed on user input,
// so code dependent on user input must be inside the callback - which
// is all code in this case.)
readline.question(`Name of JSON file to update *INCLUDING PATH* (e.g. './spaces.json')\n--> Hit 'Enter' for '${jsonFile}'\n> `, file => {
    readline.close()

    if (file !== '') {
        jsonFile = file
    }

    // Import JSON data - 'spaces' will be an array of Objects
    let spaces = null
    try {
        spaces = require(jsonFile)
    } catch (err) {
        console.error(`\n[ -- ERROR -- ] '${jsonFile}' is not a valid file.`)
        return
    }

    // Load file-system module
    const fs = require('fs')

    // Make sure the parent folder exists
    try {
        fs.lstatSync(pathToFolder).isDirectory()
    } catch (err) {
        console.error(`\n[ -- ERROR -- ] '${pathToFolder}' is not a valid directory.`)
        return
    }

    // Obtain an array containing names of all subfolders
    const subfolders = fs.readdirSync(pathToFolder)

    // Loop through all subfolders
    subfolders.forEach(subfolder => {
        // Ignore current & parent directories
        if (subfolder === "." || subfolder === "..") {
            return
        }
        // Sanity check: make sure the subfolder *is* in fact a directory, not a file
        if (fs.lstatSync(pathToFolder + subfolder).isDirectory()) {

            // Obtain an array containing names of all files in the subfolder
            let files = fs.readdirSync(pathToFolder + subfolder)

            // Find the Object whose id matches the subfolder's name, and update it
            spaces.forEach(space => {
                if (space.id === subfolder) {
                    space.img = files
                }
            })

        }
    })

    // Convert object data to string (with 2-space indents)
    let data = JSON.stringify(spaces, null, 2)

    // Output JSON data
    try {
        fs.writeFileSync(jsonFile, data)
        console.log(`\n[ -- SUCCESS -- ] Wrote JSON data to '${jsonFile}'`)
    } catch (err) {
        console.error(`\n[ -- ERROR -- ] Cannot write JSON data to '${jsonFile}'`)
    }

})
