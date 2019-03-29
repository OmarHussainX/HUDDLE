const fs = require('fs')

// const pathToImageFolder = '/home/omar/Documents/evolveu/huddle/public/images/spaces/'
const pathToImageFolder = '../public/images/spaces/'
const folderNames = fs.readdirSync(pathToImageFolder)
let count = 0

folderNames.forEach(function (folder) {
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