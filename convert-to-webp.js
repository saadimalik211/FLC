const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const convertToWebP = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      convertToWebP(fullPath);
    } else if (/\.(jpg|jpeg)$/i.test(file)) {
      const outputFile = fullPath.replace(/\.(jpg|jpeg)$/i, ".webp");
      sharp(fullPath)
        .webp({ quality: 20 })
        .toFile(outputFile)
        .then(() => console.log(`Converted: ${outputFile}`))
        .catch((err) => console.error(`Error converting ${fullPath}:`, err));
    }
  });
};

convertToWebP(path.resolve(__dirname, "images/projects"));
convertToWebP(path.resolve(__dirname, "images/services"));
