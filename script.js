const path = require('path')
const fs = require('fs')
const fsPromises = fs.promises
const checkDirectories = async (filePath) => {
    try {
        const files = await fsPromises.readdir(filePath)
        const jsRegex = /\.js/
        const directoryRegex = /\./
        files.forEach((file) => {
            switch (true) {
                case jsRegex.test(file):
                    const newName = file.replace('.js', '.tsx')
                    const currFilePath = path.join(filePath, file)
                    const newFilePath = path.join(filePath, newName)
                    fsPromises.rename(currFilePath, newFilePath)
                    break;
                case !directoryRegex.test(file):
                    const newDirPath = path.join(filePath, file)
                    checkDirectories(newDirPath)
                    break;
                default:
                    break;
            }            
        })
        
    } catch (e) {
        console.log(e)
        return e
    }
    
}
checkDirectories(path.join(__dirname, 'src'))