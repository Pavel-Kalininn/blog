import React from 'react';

import Tag from '../tag/tag';

export default function TagList({ tagsArr }) {
  return (
    <ul>
      {tagsArr &&
        tagsArr.map((tag, index) => {
          if (tag) {
            const tagTrim = tag.trim();
            if (tagTrim.length > 0 && tagTrim.length < 30) {
              return <Tag key={index} label={tagTrim} />;
            }
          }
          return false;
        })}
    </ul>
  );
}
