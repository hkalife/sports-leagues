import { useState } from 'react';
import { Header } from './components/Header';
import { SportNav } from './components/SportNav';
import { PageTitle } from './components/PageTitle';
import { LeagueList } from './components/LeagueList';
import type { League } from './types/league';

function App() {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <SportNav />
      <div className="max-w-6xl mx-auto py-6">
        <PageTitle />
        <LeagueList onViewBadge={setSelectedLeague} />
      </div>
      {selectedLeague && (
        <pre className="fixed bottom-4 right-4 bg-black text-white text-xs p-3 rounded">
          {selectedLeague.strLeague}
        </pre>
      )}
    </div>
  );
}

export default App;
