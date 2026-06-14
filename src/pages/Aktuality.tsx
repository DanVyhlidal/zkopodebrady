import { useState, useEffect } from 'react';
import fm from 'front-matter';
import ReactMarkdown from 'react-markdown';
import './Aktuality.css';

interface NewsFrontmatter {
  title: string;
  date: string;
  external_link?: string;
}

interface NewsItem {
  attributes: NewsFrontmatter;
  body: string;
  id: string;
}

export default function Aktuality() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function loadNews() {
      const modules = import.meta.glob('/src/data/news/*.md', { query: '?raw', import: 'default' });
      const loadedNews: NewsItem[] = [];

      for (const path in modules) {
        const markdown = await modules[path]() as string;
        const parsed = fm<NewsFrontmatter>(markdown);
        loadedNews.push({
          attributes: parsed.attributes,
          body: parsed.body,
          id: path,
        });
      }

      loadedNews.sort((a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime());
      setNews(loadedNews);
    }

    loadNews();
  }, []);

  return (
    <div className="aktuality-page">
      <h2 className="page-header">Aktuality</h2>
      <div className="news-list">
        {news.map(item => {
          const dateStr = new Date(item.attributes.date).toLocaleDateString('cs-CZ');
          return (
            <article key={item.id} className="news-card">
              <div className="news-icon-column">
                <div className="info-icon">i</div>
              </div>
              <div className="news-content-column">
                <div className="news-date">{dateStr}</div>
                <h3 className="news-title">{item.attributes.title}</h3>
                <div className="news-content">
                  <ReactMarkdown>{item.body}</ReactMarkdown>
                </div>
                {item.attributes.external_link && (
                  <a href={item.attributes.external_link} target="_blank" rel="noopener noreferrer" className="external-link">
                    zde
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
