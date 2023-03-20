import { Link, useNavigate, useParams } from 'react-router-dom';
import { message, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

import { useAuth } from '../../hooks/useAuth.js';
import {
  useFavouriteArticleMutation,
  useUnfavouriteArticleMutation,
  useDeleteArticleMutation,
} from '../../redux/blogApi.js';
import TagList from '../tagList/tagList.jsx';
import LikeButton from '../likeButton/likeButton.jsx';
import User from '../user/user.jsx';

import styles from './articleHeader.module.scss';

export default function ArticleHeader({ article }) {
  const { slug: currentSlug } = useParams();
  const [like] = useFavouriteArticleMutation();
  const [dislike] = useUnfavouriteArticleMutation();
  const [deleteArticle] = useDeleteArticleMutation();
  const { username } = useAuth();
  const navigate = useNavigate();

  const likeHandler = async (slug) => {
    if (article.favorited) {
      await dislike(slug);
    } else {
      await like(slug);
    }
  };

  const confirm = async () => {
    try {
      await deleteArticle(article.slug);
      message.success('Article has been deleted');
      navigate('/', { replace: true });
    } catch (err) {
      message.error(`Error ${err.status}`);
    }
  };

  return (
    <div className={styles.articleHeader}>
      <div className={styles.articleHeader__left}>
        <div className={styles.articleHeader__header}>
          <Link to={`/articles/${article.slug}`} className={styles.articleHeader__title}>
            {article.title}
          </Link>
          <LikeButton
            count={article.favoritesCount}
            favourite={article.favorited}
            likeHandler={() => likeHandler(article.slug)}
            disable={!username}
          />
        </div>
        <TagList tagsArr={article.tagList} />
        <span>{article.description}</span>
      </div>
      <div className={styles.acticleHeader__right}>
        <User username={article.author.username} createDate={article.createdAt} image={article.author.image} />
        {username === article.author.username && currentSlug ? (
          <div className={styles.articleHeader__buttons}>
            <Popconfirm
              placement="right"
              title="Are you sure you want to delete this article?"
              description="Delete article"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <button className="deleteBtn" type="button">
                Delete
              </button>
            </Popconfirm>
            <Link to="edit" className="editBtn">
              Edit
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

ArticleHeader.propTypes = {
  article: PropTypes.object.isRequired,
};
