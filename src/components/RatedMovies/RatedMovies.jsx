
import React, { useState, useEffect } from 'react'
import { Input, Space, List, Avatar, Button, Spin, Alert, Pagination, Rate } from 'antd'
import {debounce} from 'lodash'

import '../CardList/CardList.css'



const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      const truncatedText = text.substr(0, maxLength);
      const lastSpaceIndex = truncatedText.lastIndexOf(' ');
      return truncatedText.substr(0, lastSpaceIndex) + '...';
    }
  };

const RatedMovies = () => {
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false); // Добавляем состояние для индикатора загрузки
const [error, setError] = useState(false);
const [total, setTotal] = useState(0)
// const [guestSessionId, setGuestSessionId] = useState('')




const apiKey = '7e14147cbafc9f8e4f095ea26ebf8692';
const guestSessionId = localStorage.getItem('sessionId'); 
const myRating = localStorage.getItem('myRating')



    useEffect(() => {

    const rated = async () => {
      try {
        setLoading(true)
        const response = await fetch (`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}`)
        console.log (response)
        setLoading(false)

        if (response.ok) {
          const data = await response.json();
             setMovies(data.results);
             console.log(data.results)
             setTotal(data.total_results)
             console.log(data.total_results)
        } else {
          console.error('Failed to fetch movies');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
   };
    rated();
    },

    [myRating]
);

/////////////////////////////////////////////////
const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy"];


 return (
    <div className='wrapper'>
      <h1>Rated Results</h1>
   
      {/* Индикатор загрузки */}
      {loading && <Spin />}
      {/* Обработка ошибок */}
      {error && <Alert message={error} type="error" />}
      <List
        grid={{ gutter: 36, column: 2 }}
        itemLayout="horizontal"
        dataSource={movies}
        locale = {{emptyText:'no results'}}
        loading = {loading}
        renderItem={movie => (
            <List.Item style={{ width: 421, height: 279, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '5px',
                              border: `2px solid `
                            //   ${getColorBasedOnRating(movie.vote_average)}`
            }}>{movie.vote_average.toFixed(1)}</div>                    
             <List.Item.Meta
              avatar={<Avatar shape="square" style={{ width: 183, height: 281 }} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />}
              title={<><a href="movie poster">{movie.title}</a>
                       <p> DATE{movie.release_date} </p>
                      <div style={{ marginBottom: 10 }}>
                          {genres.map(genre => (
                            <Button key={genre} style={{ marginRight: 5 }} disabled>{genre}</Button>
                           ))}
                       </div> 
                    </> 
                    }
              description={truncateText(movie.overview, 100)}

                      />
                     <Rate
                      count={10} 
                      value={movie.rating}  
                      />
          </List.Item>
        )}
      />
      <Pagination
        total={total}
        pageSize={20}
        // onChange={onChangePage}
        showSizeChanger={false}

      />
    </div>
  );
};



export default RatedMovies;