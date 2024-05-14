import { createContext, useEffect, useState } from 'react';

import './App.css';
// import CardList from './components/CardList/CardList'
import Tabs from './components/MyTabs/MyTabs ';
import Service from './components/Api';

export const Context = createContext([]);

function App() {
  const [genresList, setGenresList] = useState([]);
  const service = new Service();
  const getGanres = async () => {
    const genres = await service.getGanres();
    setGenresList(genres);
  };
  useEffect(() => {
    getGanres();
  }, []);
  return (
    <Context.Provider value={genresList}>
      <div className="App">
        <Tabs />
      </div>
    </Context.Provider>
  );
}

export default App;
