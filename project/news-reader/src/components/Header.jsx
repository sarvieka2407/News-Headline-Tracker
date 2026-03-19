import '../styles/Header.css';

function Header({ darkMode, onToggleDark, readCount, onRefresh }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <span className="header-logo"></span>
          <h1 className="header-title">NewsFlash</h1>
        </div>

        <div className="header-right">
          {onRefresh && (
            <button
              className="refresh-btn icon-btn"
              onClick={onRefresh}
              aria-label="Refresh news"
              title="Refresh news"
            >
              🔄
            </button>
          )}
          
          <div className="read-badge">
            <span>Read</span>
            <span className="read-badge-count">{readCount}</span>
          </div>

          <button
            className="theme-toggle icon-btn"
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
