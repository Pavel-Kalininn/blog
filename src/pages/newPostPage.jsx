import React from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

import { useAddArticleMutation } from '../redux/blogApi.js';
import ArticleForm from '../components/articleForm/articleForm.jsx';

export default function NewPostPage() {
  const navigate = useNavigate();
  const [addArticle] = useAddArticleMutation();

  const addArticleHandler = async (data) => {
    try {
      const newArticle = await addArticle({
        article: { ...data },
      }).unwrap();
      message.success('Article has been created');
      navigate(`/articles/${newArticle.article.slug}`);
    } catch (err) {
      message.error(err.status);
    }
  };

  return <ArticleForm title="Create new article" onSubmit={addArticleHandler} />;
}
