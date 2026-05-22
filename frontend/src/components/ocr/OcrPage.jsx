import { useState, useRef } from 'react';
import { uploadOcr } from '../../api/client';
import useCollectionStore from '../../store/collectionStore';
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';

export default function OcrPage() {
  const fileRef = useRef();
  const [preview, setPreview] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [codes, setCodes] = useState(null);
  const [dragging, setDragging] = useState(false);
  const { paste } = useCollectionStore();

  function handleFile(file) {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setCodes(null);
    processFile(file);
  }

  async function processFile(file) {
    setProcessing(true);
    try {
      const res = await uploadOcr(file);
      setCodes(res.data.data.codes);
      if (res.data.data.codes.length === 0) toast('No se detectaron códigos', { icon: '🔍' });
    } catch {
      toast.error('Error al procesar la imagen');
    } finally {
      setProcessing(false);
    }
  }

  function removeCode(code) {
    setCodes(c => c.filter(x => x !== code));
  }

  async function confirm() {
    if (!codes?.length) return;
    try {
      await paste(codes);
      toast.success(`${codes.length} figurita${codes.length > 1 ? 's' : ''} pegada${codes.length > 1 ? 's' : ''}`);
      setCodes(null);
      setPreview(null);
    } catch {
      toast.error('Error al pegar');
    }
  }

  const dropZone = {
    onDragOver: e => { e.preventDefault(); setDragging(true); },
    onDragLeave: () => setDragging(false),
    onDrop: e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); },
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">OCR – Subir foto</h1>

      <div
        {...dropZone}
        onClick={() => fileRef.current.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-10 transition-colors ${
          dragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 bg-white dark:bg-gray-900'
        }`}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files[0])} />
        {processing ? (
          <div className="flex flex-col items-center gap-3">
            <Spinner className="w-10 h-10" />
            <p className="text-sm text-gray-500">Procesando con OCR...</p>
          </div>
        ) : preview ? (
          <img src={preview} alt="preview" className="max-h-48 rounded-lg object-contain" />
        ) : (
          <>
            <svg className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4-4 4 4 4-8 4 4M3 20h18" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
              Arrastrá una foto o hacé click para seleccionarla
            </p>
          </>
        )}
      </div>

      {codes !== null && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            Códigos detectados ({codes.length})
          </h2>
          {codes.length === 0 ? (
            <p className="text-sm text-gray-500">No se detectó ningún código. Intentá con mejor iluminación o contraste.</p>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {codes.map(c => (
                  <span key={c} className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-sm font-mono font-semibold">
                    {c}
                    <button onClick={() => removeCode(c)} className="text-blue-400 hover:text-red-500 ml-1 text-xs">✕</button>
                  </span>
                ))}
              </div>
              <button
                onClick={confirm}
                className="self-start px-6 py-2.5 rounded-xl bg-panini-blue text-white font-semibold hover:bg-blue-800 transition-colors"
              >
                Confirmar y pegar
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
