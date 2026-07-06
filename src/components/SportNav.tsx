const SPORTS = [
  'Football',
  'American Football',
  'Basketball',
  'Motorsport',
  'Baseball',
];

export function SportNav() {
  return (
    <nav className="bg-white border-b border-gray-200 h-11">
      <div className="max-w-6xl mx-auto h-full flex items-center gap-6">
        <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase mr-2">
          Most Popular
        </span>
        {SPORTS.map((sport, index) => (
          <button
            key={sport}
            className={`text-sm cursor-pointer ${
              index === 0
                ? 'font-bold text-gray-900'
                : 'font-medium text-gray-700'
            }`}
          >
            {sport}
          </button>
        ))}
      </div>
    </nav>
  );
}
