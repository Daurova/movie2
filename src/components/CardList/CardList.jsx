
import React, { useState, useEffect, useContext } from 'react'
import { Input, Space, List, Avatar, Button, Spin, Alert, Pagination, Rate } from 'antd'
import {debounce} from 'lodash'
import { format } from 'date-fns';


import '../CardList/CardList.css'
import { Context } from '../../App';



const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      const truncatedText = text.substr(0, maxLength);
      const lastSpaceIndex = truncatedText.lastIndexOf(' ');
      return truncatedText.substr(0, lastSpaceIndex) + '...';
    }
  };

const MovieSearch = () => {
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false); // Добавляем состояние для индикатора загрузки
const [error, setError] = useState(false);
const [total, setTotal] = useState(0)
const [inputValue, setInputValue]=useState('')
const [guestSessionId, setGuestSessionId] = useState('')
const ganresList = useContext(Context)

console.log(ganresList)
// const getColorBasedOnRating = (movie) => {
//     if (movie.vote_average >= 0 && movie.vote_average < 3) {
//         return '#E90000';
//     } else if (movie.vote_average >= 3 && movie.vote_average < 5) {
//         return '#E97E00';
//     } else if (movie.vote_average >= 5 && movie.vote_average < 7) {
//         return '#E9D100';
//     } else {
//         return '#66E900';
//     }
// };



const apiKey = '7e14147cbafc9f8e4f095ea26ebf8692';



    useEffect(() => {
    const searchMovies = async () => {
      try {
        setLoading(true)
        const response = await fetch (`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=1&per_page=6`)
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

    searchMovies();
    }, []);



const handleSearch = debounce(async (value) => {
    try {
        setLoading(true)

        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}&page=1&per_page=6`)
        setLoading(false)

        if (response.ok) {
            const data = await response.json();
            setMovies(data.results)
            setTotal(data.total_results)
            setInputValue(value)

        } else {
            setError('Failed to fetch movies');
        }
    } catch (error) {
        setError('Error fetching movies');
    }
  }, 2000);

const onChangePage = async (page, pageSize) =>{
    try {
        setLoading(true)

        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue}&page=${page}&per_page=6&${guestSessionId}`);
        setLoading(false)

        if (response.ok) {
            const data = await response.json();
            setMovies(data.results)
            setTotal(data.total_results)

        } else {
            setError('Failed to fetch movies');
        }
    } catch (error) {
        setError('Error fetching movies');
    }
}


const onChangeRate = async (movieId, valueRate) =>{
    try {
        setLoading(true)
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTE0MTQ3Y2JhZmM5ZjhlNGYwOTVlYTI2ZWJmODY5MiIsInN1YiI6IjY2MzIzNmQ3YWQ1OWI1MDEyODZjYTdjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.50trAargRmCN6qwVT2HJIVnC64YOxwQxmzyS9VREfPQ`
            },
            body:JSON.stringify({
                value: `${valueRate}`
                })
          }
          console.log(valueRate)
          localStorage.setItem('movieRatedId', movieId);
          localStorage.setItem('myRating', valueRate);


        const guestSessionId = localStorage.getItem('sessionId')
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`, options);
        setLoading(false)

        if (response.ok) {
            const data = await response.json();

        } else {
            setError('Failed to fetch movies');
        }
    } catch (error) {
        setError('Error fetching movies');
    }
}
  return (
    <div className='wrapper'>
  
       <Space direction="vertical" className="container--full-width" size={'large'}>
       <Input placeholder="Введите поисковый запрос"
              size='large'
              className="container__input--full-width"
              onChange={(e)=>handleSearch(e.target.value)} />
       </Space>
      {/* Индикатор загрузки */}
      {loading && <Spin />}
      {/* Обработка ошибок */}
      {error && <Alert message={error} type="error" />}
      <List
        grid={{ gutter: 50, column: 2 }}
        itemLayout="horizontal"
        dataSource={movies}
        locale = {{emptyText:'no results'}}
        loading = {loading}
        renderItem={movie => {
            return(
                <List.Item style={{ width: 485, height: 279, position: 'relative', paddingRight: 25 }}
                           className='list-item'>
                <div style={{ position: 'absolute', top: 10, right: 10, padding: '5px',
                              border: `2px solid ${movie.vote_average >= 7 ? '#66E900' : movie.vote_average >= 5 ? '#E9D100' : movie.vote_average >= 3 ? '#E97E00' : '#E90000'}`,
                            }}
                            className='rating--circle'
                >{movie.vote_average.toFixed(1)}
                            </div> 
            
                      <List.Item.Meta
              avatar={<Avatar shape="square" style={{ width: 183, height: 281 }} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />}
              title={<><p href="movie poster" className='movie-title'>{movie.title}</p>
                       <p className='date'>{format(movie.release_date, 'MMMM d, yyyy')} </p>

                      <div style={{ marginBottom: 10}}>
                          {movie.genre_ids.map(genre => (
                            <Button key={genre} size='small' style={{ marginRight: 5, fontSize:12 }} disabled>{ganresList.find((genreName)=>genreName.id===genre).name}</Button>
                           ))}
                       </div> 
                    </> 
                    }
              description={<><p className='description'>{truncateText(movie.overview, 200)}</p>
                             <p><Rate
                                count={10}
                                allowHalf={true}
                                onChange={(rate)=>onChangeRate(movie.id, rate)}  
                                className='rating-stars'
                      /></p>
              </>}
              
                      /> 
                     
                 
         </List.Item>
                        
          
        )}}
      />
      <Pagination
        total={total}
        pageSize={20}
        onChange={onChangePage}
        showSizeChanger={false}

      />
    </div>
  );
};



export default MovieSearch;