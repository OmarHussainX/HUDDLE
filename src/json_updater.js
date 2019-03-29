const fs = require('fs')

// const path = '/home/omar/Documents/evolveu/huddle/public/images/spaces/'
const path = '../public/images/spaces/'
const filenames = fs.readdirSync(path)
let count = 0

filenames.forEach(function (name) {
    if (name === "." || name === "..") {
        return
    }
    if (fs.lstatSync(path + name).isDirectory()) {
        console.log(`found a folder: ${name}`)
        
        let files = fs.readdirSync(path + name)
        console.log(files)
        files.forEach(file => console.log(`${name}->${file}`))

        count++
    }

})
console.log(`found ${count} folders!`)