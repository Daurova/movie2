import { createContext, useEffect, useState } from 'react';
import './App.css'
// import CardList from './components/CardList/CardList'
import Tabs  from './components/MyTabs/MyTabs ';

export const Context = createContext([])

const apiKey = '7e14147cbafc9f8e4f095ea26ebf8692';


function App() {
  const [genresList, setGenresList]=useState([])
  const getGanres = async ()=>{
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`);
        if (response.ok) {
          const data = await response.json();
          const genre = data.genres
          setGenresList(genre)
        } else {
          console.error('Failed to create guest session');
        }
      } catch (error) {
        console.error('Error creating guest session:', error);
      }
      
  }
    useEffect(()=>{
getGanres()
    },[])
  return (
    <Context.Provider value={genresList}>
    <div className="App">
      <Tabs/>
    </div>
    </Context.Provider>
  );
}



export default App;
