import { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import NewsList from './components/NewsList';
import './styles/global.css';

const API_KEY = '6972e3ea40f9417891a5d7626a94a682'; // Replace with your NewsAPI key
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');
  const [readArticles, setReadArticles] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  // Fetch articles when category changes
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      setExpandedId(null);

      try {
        const response = await fetch(
          `${BASE_URL}?country=us&category=${category}&pageSize=20&apiKey=${API_KEY}&_t=${Date.now()}`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== 'ok') {
          throw new Error(data.message || 'Failed to fetch news');
        }

        // Filter out articles with "[Removed]" titles (NewsAPI sometimes returns these)
        const validArticles = (data.articles || []).filter(
          (a) => a.title && a.title !== '[Removed]'
        );

        setArticles(validArticles);
      } catch (err) {
        setError(err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, refreshKey]);

  // Handlers
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setReadArticles([]);
  };

  const handleCategoryChange = (newCategory) => {
    if (newCategory !== category) {
      setCategory(newCategory);
      setReadArticles([]);
    }
  };

  const handleExpand = (index) => {
    setExpandedId((prev) => (prev === index ? null : index));
  };

  const handleMarkRead = (index) => {
    setReadArticles((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Render helpers
  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Fetching latest headlines…</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="retry-btn" onClick={() => setCategory((c) => c)}>
            🔄 Try Again
          </button>
        </div>
      );
    }

    if (articles.length === 0) {
      return (
        <div className="empty-container">
          <div className="empty-icon">📭</div>
          <h2>No articles found</h2>
          <p>Try selecting a different category.</p>
        </div>
      );
    }

    return (
      <NewsList
        articles={articles}
        expandedId={expandedId}
        readArticles={readArticles}
        onExpand={handleExpand}
        onMarkRead={handleMarkRead}
      />
    );
  };

  return (
    <div className="app">
      <Header
        darkMode={darkMode}
        onToggleDark={toggleDarkMode}
        readCount={readArticles.length}
        onRefresh={handleRefresh}
      />

      <main>
        <CategoryFilter
          activeCategory={category}
          onSelectCategory={handleCategoryChange}
        />
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
