import { create } from 'zustand';
import { getStats, getSections, getSectionStickers, pasteCodes, unpaste } from '../api/client';

const useCollectionStore = create((set, get) => ({
  stats: null,
  sections: [],
  sectionStickers: {}, // { [sectionId]: Sticker[] }
  loading: false,

  fetchStats: async () => {
    const res = await getStats();
    set({ stats: res.data.data });
  },

  fetchSections: async () => {
    set({ loading: true });
    const [statsRes, sectionsRes] = await Promise.all([getStats(), getSections()]);
    set({ stats: statsRes.data.data, sections: sectionsRes.data.data, loading: false });
  },

  fetchSectionStickers: async (sectionId) => {
    const res = await getSectionStickers(sectionId);
    set(state => ({
      sectionStickers: { ...state.sectionStickers, [sectionId]: res.data.data.stickers },
    }));
    return res.data.data;
  },

  paste: async (codes) => {
    const res = await pasteCodes(codes);
    // Refresh stats and any open section caches
    const stats = await getStats();
    const openSections = Object.keys(get().sectionStickers);
    const updates = {};
    for (const sid of openSections) {
      const r = await getSectionStickers(sid);
      updates[sid] = r.data.data.stickers;
    }
    set(state => ({
      stats: stats.data.data,
      sectionStickers: { ...state.sectionStickers, ...updates },
    }));
    return res.data.data;
  },

  unpaste: async (stickerId) => {
    await unpaste(stickerId);
    const stats = await getStats();
    const openSections = Object.keys(get().sectionStickers);
    const updates = {};
    for (const sid of openSections) {
      const r = await getSectionStickers(sid);
      updates[sid] = r.data.data.stickers;
    }
    set(state => ({
      stats: stats.data.data,
      sectionStickers: { ...state.sectionStickers, ...updates },
    }));
  },
}));

export default useCollectionStore;