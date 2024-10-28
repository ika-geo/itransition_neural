const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');

const directoryPath = path.join(__dirname, 'digits');
const array = [];
const objectArray = []

function isValid(value) {
    return /^[0-9]$/.test(value);
}

fs.readdir(directoryPath, async (err, files) => {
    if (err) {
        return console.error(err);
    }
    const images = files.filter(file => path.extname(file).toLowerCase() === '.jpg')
    for (const image of images) {
        if (array.length === 10) break;
        const result = await Tesseract.recognize(
            path.join(directoryPath, image),
            'eng'
        );
        const parsedValue = parseInt(result.data.text);
        if (isValid(parsedValue)) {
            // objectArray.push({ [image]: parsedValue });
            array.push(`${array.length}_${parsedValue}`);
        }
    }
    // console.log(objectArray)
    console.log(array);
});