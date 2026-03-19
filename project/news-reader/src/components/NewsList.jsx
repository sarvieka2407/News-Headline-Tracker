import '../styles/NewsList.css';
import NewsItem from './NewsItem';

function NewsList({ articles, expandedId, readArticles, onExpand, onMarkRead }) {
  return (
    <div className="news-list">
      {articles.map((article, index) => (
        <NewsItem
          key={index}
          article={article}
          index={index}
          isExpanded={expandedId === index}
          isRead={readArticles.includes(index)}
          onExpand={onExpand}
          onMarkRead={onMarkRead}
        />
      ))}
    </div>
  );
}

export default NewsList;
