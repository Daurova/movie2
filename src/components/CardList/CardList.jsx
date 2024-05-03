
import React, { useState, useEffect } from 'react'
import { Input, Space, List, Avatar, Button, Spin, Alert, Pagination } from 'antd'
import {debounce} from 'lodash'


import '../CardList/CardList.css'
import Search from 'antd/es/transfer/search';

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
const apiKey = '7e14147cbafc9f8e4f095ea26ebf8692';

    useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=return`);
        if (response.ok) {
          const data = await response.json();
             setMovies(data.results);
             console.log(data.results)
        } else {
          console.error('Failed to fetch movies');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    searchMovies();
    }, []);


const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy"];

const handleSearch = debounce((value) => {
    // Ваш код для выполнения поиска по значению value
  }, 500);


  return (
    <div className='wrapper'>
      <h1>Movie Search Results</h1>
      <Search
        placeholder="Search movies..."
        onSearch={value => console.log(value)}
        style={{ width: 200 }}
      /> 
       <Space direction="vertical">
       <Input placeholder="Введите поисковый запрос" onChange={handleSearch} />
       </Space>
      {/* Индикатор загрузки */}
      {loading && <Spin />}
      {/* Обработка ошибок */}
      {error && <Alert message={error} type="error" />}
      <List
        grid={{ gutter: 36, column: 2 }}
        itemLayout="horizontal"
        dataSource={movies}
        renderItem={movie => (
          <List.Item style={{ width: 421, height: 279 }}>
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
              description={truncateText(movie.overview, 300)}

            />
          </List.Item>
        )}
      />
    </div>
  );
};



export default MovieSearch;