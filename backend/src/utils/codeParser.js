// Normaliza entradas como "ARG 17", "arg17", "Arg 17" → "ARG17"
function parseCode(raw) {
  const clean = raw.trim().toUpperCase().replace(/\s+/g, '');
  const match = clean.match(/^([A-Z]{2,4})(\d{1,2})$/);
  if (!match) return null;
  return `${match[1]}${match[2]}`;
}

// Parsea múltiples códigos desde texto libre (separados por coma, espacio o salto de línea)
function parseCodes(text) {
  const tokens = text.split(/[\s,;\n]+/).filter(Boolean);
  const codes = tokens.map(parseCode).filter(Boolean);
  return [...new Set(codes)]; // deduplicar
}

// Extrae códigos de texto OCR crudo (regex más permisivo)
function extractCodesFromOcr(rawText) {
  const matches = [];
  const regex = /\b([A-Z]{2,4})\s*(\d{1,2})\b/g;
  let m;
  while ((m = regex.exec(rawText)) !== null) {
    matches.push(`${m[1]}${m[2]}`);
  }
  return [...new Set(matches)];
}

module.exports = { parseCode, parseCodes, extractCodesFromOcr };