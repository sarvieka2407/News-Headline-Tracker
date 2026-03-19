import '../styles/NewsItem.css';

function NewsItem({ article, index, isExpanded, isRead, onExpand, onMarkRead }) {
  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <article className={`news-item ${isExpanded ? 'expanded' : ''} ${isRead ? 'read' : ''}`}>
      {/* Clickable header */}
      <div className="news-item-header" onClick={() => onExpand(index)}>
        <div className="news-item-info">
          {article.source?.name && (
            <span className="news-item-source">
              <span className="news-item-source-dot"></span>
              {article.source.name}
            </span>
          )}
          <h2 className="news-item-title">
            {article.title || 'Untitled Article'}
          </h2>
        </div>
        <span className="news-item-expand-icon">▼</span>
      </div>

      {/* Expandable body */}
      <div className="news-item-body">
        <p className="news-item-description">
          {article.description || 'No description available for this article.'}
        </p>

        <div className="news-item-meta">
          {publishedDate && (
            <span className="news-item-date">📅 {publishedDate}</span>
          )}

          <div className="news-item-actions">
            <button
              className={`mark-read-btn ${isRead ? 'is-read' : 'unread'}`}
              onClick={(e) => {
                e.stopPropagation();
                if (!isRead) onMarkRead(index);
              }}
            >
              {isRead ? '✓ Read' : '☐ Mark as Read'}
            </button>

            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-link-btn"
                onClick={(e) => e.stopPropagation()}
              >
                Open ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default NewsItem;
