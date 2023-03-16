import React from 'react';
import classNames from 'classnames';

import styles from './likeButton.module.scss';

export default function LikeButton({ count, favourite, likeHandler, disable }) {
  return (
    <button
      type="button"
      className={classNames(styles.likeButton, { [styles.favourite]: favourite })}
      onClick={likeHandler}
      disabled={disable}
    >
      {count}
    </button>
  );
}
