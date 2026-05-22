const Tesseract = require('tesseract.js');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { extractCodesFromOcr } = require('../utils/codeParser');

let worker = null;

async function getWorker() {
  if (!worker) {
    worker = await Tesseract.createWorker('eng', 1, {
      logger: () => {},
    });
    await worker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ',
      tessedit_pageseg_mode: '6',
    });
  }
  return worker;
}

async function preprocessImage(inputPath) {
  const outputPath = inputPath.replace(/(\.\w+)$/, '-processed$1');
  await sharp(inputPath)
    .grayscale()
    .normalize()
    .sharpen()
    .toFile(outputPath);
  return outputPath;
}

async function processImage(imagePath, catalogSet) {
  let processedPath = null;
  try {
    processedPath = await preprocessImage(imagePath);
    const w = await getWorker();
    const { data } = await w.recognize(processedPath);
    const rawText = data.text || '';
    const allCodes = extractCodesFromOcr(rawText);
    // Filtrar solo códigos que existen en el catálogo
    const validCodes = catalogSet ? allCodes.filter(c => catalogSet.has(c)) : allCodes;
    return { codes: validCodes, rawText };
  } finally {
    if (processedPath && fs.existsSync(processedPath)) fs.unlinkSync(processedPath);
    if (imagePath && fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }
}

module.exports = { processImage };