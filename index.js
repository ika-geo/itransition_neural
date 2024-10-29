const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');

const directoryPath = path.join(__dirname, 'digits');
const array = [];
let counter = 0
let processedImages = 0

function getPercent(full, value){
    return (value/full) * 100
}

function isValid(value) {
    return /^[0-9]$/.test(value);
}

fs.readdir(directoryPath, async (err, files) => {
    if (err) {
        return console.error(err);
    }
    const images = files.filter(file => path.extname(file).toLowerCase() === '.jpg')
    for (const image of images) {
        const result = await Tesseract.recognize(
            path.join(directoryPath, image),
            'eng'
        );
        const parsedValue = parseInt(result.data.text);
        counter++
        console.clear();
        console.log(getPercent(images.length, counter).toFixed(2),'%')
        if (isValid(parsedValue)) {
            processedImages++
            array[parsedValue] = (array[parsedValue] || 0) + 1;
        }
    }
    console.log(array.map((item,index)=>`${index}_${item}`));
    console.log(`processed ${processedImages} images from ${counter}`)
});