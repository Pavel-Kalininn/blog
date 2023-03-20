import { format } from 'date-fns';
import PropTypes from 'prop-types';

import styles from './user.module.scss';

function User({ username, image, createDate }) {
  const date = new Date(createDate);
  return (
    <div className={styles.user}>
      <div className={styles.user__info}>
        <span className={styles.user__username}>{username}</span>
        {createDate ? <span className={styles.user__date}>{format(date, 'MMMM d, yyyy')}</span> : null}
      </div>
      <img className={styles.user__img} alt="User Avatar" src={image} />
    </div>
  );
}

User.defaultProps = {
  image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
  createDate: null,
};

User.propTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string,
  createDate: PropTypes.string,
};

export default User;
