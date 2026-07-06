export function Header() {
  return (
    <header className="bg-red-600 h-14">
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between">
        <span className="text-white font-bold text-xl tracking-tight italic">
          Sports Leagues
        </span>
        <button className="border border-white/60 text-white text-sm font-medium px-4 py-1.5 rounded flex items-center gap-3 cursor-pointer">
          English
          <span className="text-xs">▼</span>
        </button>
      </div>
    </header>
  );
}
