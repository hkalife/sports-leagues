import { Header } from './components/Header';
import { SportNav } from './components/SportNav';
import { PageTitle } from './components/PageTitle';
import { LeagueList } from './components/LeagueList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <SportNav />
      <div className="max-w-6xl mx-auto py-6">
        <PageTitle />
        <LeagueList />
      </div>
    </div>
  );
}

export default App;
