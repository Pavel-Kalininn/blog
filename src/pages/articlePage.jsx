import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetArticleQuery } from '../redux/blogApi';
import ArticleCard from '../components/articleCard/articleCard';
import LoadingIndicator from '../components/loadingIndicator/loadingIndicator';
import ErrorIndicator from '../components/errorIndicator/errorIndicator';

export default function ArticlePage() {
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useGetArticleQuery(slug);
  if (isError) {
    return <ErrorIndicator error={error.status} />;
  }

  if (isLoading) {
    return <LoadingIndicator tip="Loading article" />;
  }

  return <ArticleCard article={data.article} markDown={data.article.body} />;
}
