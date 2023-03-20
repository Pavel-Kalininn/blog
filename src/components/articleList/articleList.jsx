import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';

import { useGetArticlesQuery } from '../../redux/blogApi.js';
import ArticleCard from '../articleCard/articleCard.jsx';
import LoadingIndicator from '../loadingIndicator/loadingIndicator';
import ErrorIndicator from '../errorIndicator/errorIndicator';

import styles from './articleList.module.scss';

export default function ArticleList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get('limit') || 5;
  const offset = searchParams.get('offset') || 0;
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useGetArticlesQuery({
    limit,
    offset,
  });

  const pagePaginationHandler = (currentPage, pageSizeSelect) => {
    setSearchParams({ limit: pageSizeSelect, offset: currentPage * pageSizeSelect - pageSizeSelect });
  };

  if (isError) {
    return <ErrorIndicator error={error.status} />;
  }

  if (isLoading) {
    return <LoadingIndicator tip="Loading article list" />;
  }

  const { articles: articlesArr, articlesCount: total } = data;
  return (
    <div className={`${styles.articleList} wrapper`}>
      <ul className={styles.articleList__list}>
        {articlesArr.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </ul>
      <Pagination
        className={`${styles.articleList__pagination} wrapper`}
        defaultCurrent={offset / limit + 1}
        pageSize={limit}
        total={total}
        onChange={pagePaginationHandler}
      />
    </div>
  );
}
