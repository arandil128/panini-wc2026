import StickerCard from '../sticker/StickerCard';

export default function SectionGrid({ stickers }) {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 p-4">
      {stickers.map(s => (
        <StickerCard key={s.id} sticker={s} />
      ))}
    </div>
  );
}
