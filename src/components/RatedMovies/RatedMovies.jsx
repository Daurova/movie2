import React, { useState, useEffect, useContext } from 'react';
import { List, Avatar, Button, Spin, Alert, Pagination, Rate } from 'antd';
import '../RatedMovies/RatedMovies.css';
import { useMediaQuery } from 'react-responsive';
import { format } from 'date-fns';

import { Context } from '../../App';
import Service from '../Api';

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
  const [total, setTotal] = useState(0);
  const ganresList = useContext(Context);
  const isMobile = useMediaQuery({ maxWidth: 420 });
  const service = new Service();
    // const [guestSessionId, setGuestSessionId] = useState('')

  const guestSessionId = localStorage.getItem('sessionId');
  //   const myRating = localStorage.getItem('myRating');

  useEffect(() => {

    const rated = async () => {
      try {
        setLoading(true);
       const data =  await service.getRatedMovies({guestSessionId});
        setLoading(false);

          setMovies(data.results);
          setTotal(data.total_results);
      
        
      } catch (error) {
        setError('error fetching movies');
        console.error('Error fetching movies:', error);
      }
    };
    rated();
  }, []);

  /////////////////////////////////////////////////

  return (
    <div className="wrapper">
      {isMobile ? (
        <>
          {/* MOBILE */}
          {/* Индикатор загрузки */}
          {loading && <Spin />}
          {/* Обработка ошибок */}
          {error && <Alert message={error} type="error" />}
          <List
            className="movies-list"
            grid={{ gutter: 10, column: 1 }}
            itemLayout="horizontal"
            dataSource={movies}
            locale={{ emptyText: 'нет данных no results' }}
            loading={loading}
            renderItem={(movie) => (
              <List.Item
                style={{ width: 380, height: 245, position: 'relative', paddingRight: 25 }}
                className="list-item"
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    padding: '5px',
                    border: `2px solid ${movie.vote_average >= 7 ? '#66E900' : movie.vote_average >= 5 ? '#E9D100' : movie.vote_average >= 3 ? '#E97E00' : '#E90000'}`,
                  }}
                  className="rating--circle"
                >
                  {movie.vote_average.toFixed(1)}
                </div>
                {/*///////////////////////////  */}
                <List.Item.Meta
                  avatar={
                    <Avatar
                      className="movie-poster"
                      shape="square"
                      style={{ width: 60, height: 91 }}
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    />
                  }
                  title={
                    <>
                      <p className="movie-title">{movie.title}</p>
                      <p>
                        {movie.release_date
                          ? format(movie.release_date, 'MMMM dd, yyyy')
                          : 'The release date is not specified.'}{' '}
                      </p>

                      <div style={{ marginBottom: 10, maxHeight: 25, overflow: 'hidden' }}>
                        {movie.genre_ids.map((genre) => (
                          <Button key={genre} size="small" style={{ marginRight: 5, fontSize: 12 }} disabled>
                            {ganresList.find((genreName) => genreName.id === genre).name}
                          </Button>
                        ))}
                      </div>
                    </>
                  }
                  description={
                    <>
                      <p className="description">{truncateText(movie.overview, 200)}</p>
                      <p>
                        <Rate count={10} allowHalf={true} value={movie.rating} className="rating-stars" />
                      </p>
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <Pagination
            total={total}
            pageSize={20}
            // onChange={onChangePage}
            showSizeChanger={false}
            className="pagination"
          />
        </>
      ) : (
        <>
          {/* DESKTOP layout */}
          {/* Индикатор загрузки */}
          {loading && <Spin />}
          {/* Обработка ошибок */}
          {error && <Alert message={error} type="error" />}
          <List
            className="movies-list"
            grid={{ gutter: 40, column: 2 }}
            itemLayout="horizontal"
            dataSource={movies}
            locale={{ emptyText: 'нет данных no results' }}
            loading={loading}
            renderItem={(movie) => (
              <List.Item
                style={{ width: 451, height: 279, position: 'relative', paddingRight: 25 }}
                className="list-item"
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    padding: '5px',
                    border: `2px solid ${movie.vote_average >= 7 ? '#66E900' : movie.vote_average >= 5 ? '#E9D100' : movie.vote_average >= 3 ? '#E97E00' : '#E90000'}`,
                  }}
                  className="rating--circle"
                >
                  {movie.vote_average.toFixed(1)}
                </div>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      style={{ width: 183, height: 281 }}
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    />
                  }
                  title={
                    <>
                      <p className="movie-title">{movie.title}</p>
                      <p>
                        {movie.release_date
                          ? format(movie.release_date, 'MMMM dd, yyyy')
                          : 'The release date is not specified.'}{' '}
                      </p>
                      <div style={{ marginBottom: 10, maxHeight: 25, overflow: 'hidden' }}>
                        {movie.genre_ids.map((genre) => (
                          <Button key={genre} size="small" style={{ marginRight: 5, fontSize: 12 }} disabled>
                            {ganresList.find((genreName) => genreName.id === genre).name}
                          </Button>
                        ))}
                      </div>
                    </>
                  }
                  description={
                    <>
                      <p className="description">{truncateText(movie.overview, 200)}</p>
                      <p>
                        <Rate
                          count={10}
                          character={<span style={{ fontSize: '20px' }}>★</span>}
                          allowHalf={true}
                          value={movie.rating}
                          className="rating-stars"
                        />
                      </p>
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <Pagination
            total={total}
            pageSize={20}
            // onChange={onChangePage}
            showSizeChanger={false}
            className="pagination"
          />
        </>
      )}
    </div>
  );
};

export default RatedMovies;
