import { useState, useCallback } from 'react';

const VALID = /^([A-Z]{2,4})(\d{1,2})$/;

function parseInput(text) {
  const tokens = text.toUpperCase().split(/[\s,;]+/).filter(Boolean);
  const valid = [];
  const invalid = [];
  const seen = new Set();
  for (const t of tokens) {
    const clean = t.replace(/\s/g, '');
    if (VALID.test(clean)) {
      if (!seen.has(clean)) { valid.push(clean); seen.add(clean); }
    } else if (clean.length > 0) {
      invalid.push(t);
    }
  }
  return { valid, invalid };
}

export default function CodeInput({ onConfirm }) {
  const [text, setText] = useState('');
  const { valid, invalid } = parseInput(text);

  const handleConfirm = useCallback(() => {
    if (valid.length) onConfirm(valid);
  }, [valid, onConfirm]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-display font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">
          Códigos de figuritas (separados por espacio, coma o línea)
        </label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={"ARG17 ARG18\nBRA5, FRA3\nFWC1"}
          rows={6}
          className="input-base font-mono resize-y"
        />
      </div>

      {(valid.length > 0 || invalid.length > 0) && (
        <div className="flex flex-wrap gap-1.5">
          {valid.map(c => (
            <span key={c} className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 text-xs font-mono font-bold">
              {c}
            </span>
          ))}
          {invalid.map((c, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 text-xs font-mono line-through">
              {c}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={handleConfirm}
          disabled={valid.length === 0}
          className="btn-primary"
        >
          Pegar {valid.length > 0 ? `(${valid.length})` : ''}
        </button>
        {invalid.length > 0 && (
          <span className="text-sm text-panini-red font-display">
            {invalid.length} código{invalid.length > 1 ? 's' : ''} inválido{invalid.length > 1 ? 's' : ''} ignorado{invalid.length > 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
}
