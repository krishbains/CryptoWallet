import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Marquee from 'react-marquee-slider';
import "./App.css"

function NewsTicker({axiosInstance}) {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axiosInstance.get(`https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=db266ac658ba4a5c8648b433644a943c`)
      .then(response => {
        setNews(response.data.articles);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch news');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Marquee velocity={0.5}>
      {news.map((article, index) => (
        <a key={`marquee-example-news-${index}`} href={article.url} target="_blank" rel="noopener noreferrer" className="news-ticker">
          <h1>{article.description}</h1>
          <p>{new Date(article.publishedAt).toLocaleString()}</p>
        </a>
      ))}
    </Marquee>
  );
}

export default NewsTicker;