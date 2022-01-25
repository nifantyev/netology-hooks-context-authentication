import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';

const Landing = () => (
  <div className="container landing">
    <div className="row">
      <div className="row">
        <h1>Neto Social</h1>
        <p>Facebook and VK killer.</p>
      </div>
    </div>
  </div>
);

const NewsItem = ({ src, title, content }) => {
  return (
    <div className="card">
      <img src={src} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
};

const News = () => {
  const { token, handleLogout } = useContext(AuthContext);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchNews = async () => {
        try {
          setError(null);
          setLoading(true);
          const response = await fetch('http://localhost:7070/private/news', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const json = await response.json();
            setNews(json);
          } else {
            throw new Error(`${response.status} ${response.statusText}`);
          }
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };
      fetchNews();
    }
  }, [token]);

  useEffect(() => {
    if (error) {
      if (error.startsWith('401 ')) {
        handleLogout();
        setError(null);
        return;
      }
      window.alert(error);
      setError(null);
    }
  }, [error, handleLogout]);

  return (
    <>
      {!token && <Landing />}
      {loading && (
        <div className="container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {token && news && (
        <div className="container">
          <div className="row">
            {news.map((o) => (
              <div key={o.id} className="col-4">
                <NewsItem src={o.image} title={o.title} content={o.content} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default News;
