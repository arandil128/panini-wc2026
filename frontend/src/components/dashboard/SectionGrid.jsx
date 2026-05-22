import StickerCard from '../sticker/StickerCard';

export default function SectionGrid({ stickers }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-1.5 p-3">
      {stickers.map(s => (
        <StickerCard key={s.id} sticker={s} />
      ))}
    </div>
  );
}
