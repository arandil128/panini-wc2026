import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shell from './components/layout/Shell';
import Dashboard from './components/dashboard/Dashboard';
import EntryPage from './components/entry/EntryPage';
import OcrPage from './components/ocr/OcrPage';
import DuplicatesPage from './components/duplicates/DuplicatesPage';
import ExportPage from './components/export/ExportPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Dashboard />} />
          <Route path="entry" element={<EntryPage />} />
          <Route path="ocr" element={<OcrPage />} />
          <Route path="duplicates" element={<DuplicatesPage />} />
          <Route path="export" element={<ExportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
