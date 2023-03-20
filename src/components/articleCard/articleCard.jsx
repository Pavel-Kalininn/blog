import React from 'react';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';

import ArticleHeader from '../articleHeader/articleHeader.jsx';

import styles from './articleCard.module.scss';

export default function ArticleCard({ article, markDown }) {
  return (
    <li className={`${styles.article} wrapper`}>
      <ArticleHeader article={article} />
      {markDown && (
        <div className={styles.article__markdown}>
          <Markdown>{markDown}</Markdown>
        </div>
      )}
    </li>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
  markDown: PropTypes.string,
};
