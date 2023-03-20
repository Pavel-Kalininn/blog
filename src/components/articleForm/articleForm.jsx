import { useEffect } from 'react';
import classNames from 'classnames';
import { useForm, useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';

import styles from './articleForm.module.scss';

export default function ArticleForm({ title, article, onSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { tagList: article?.tagList } });

  const { fields, append, remove } = useFieldArray({ control, name: 'tagList' });
  useEffect(() => {
    if (article) {
      const { title: titleArticle, description, body } = article;
      setValue('title', titleArticle);
      setValue('description', description);
      setValue('body', body);
    }
  }, [article]);

  const onSubmitForm = (data) => {
    const { tagList, lastTag, ...fl } = data;
    const newFields = {
      ...fl,
      tagList: lastTag ? [...tagList, lastTag] : tagList,
    };
    onSubmit(newFields);
  };

  return (
    <div className={`${styles.articleForm} wrapper`}>
      <h1>{title}</h1>
      <form className={styles.articleForm__form} onSubmit={handleSubmit(onSubmitForm)}>
        <label className={styles.articleForm__label}>
          Title
          <input
            type="text"
            placeholder="Title"
            className={classNames(styles.articleForm__input, { [styles.error]: errors.title })}
            {...register('title', { required: { value: true, message: 'Title is required' } })}
          />
          <div className={styles.articleForm__error}>{errors?.title && <p>{errors?.title.message}</p>}</div>
        </label>
        <label className={styles.articleForm__label}>
          Short description
          <input
            type="text"
            placeholder="Short description"
            className={classNames(styles.articleForm__input, { [styles.error]: errors.description })}
            {...register('description', { required: { value: true, message: 'Description is required' } })}
          />
          <div className={styles.articleForm__error}>{errors?.description && <p>{errors?.description.message}</p>}</div>
        </label>
        <label className={styles.articleForm__label}>
          Text
          <textarea
            placeholder="Text"
            rows={6}
            className={classNames(styles.articleForm__input, styles.articleForm__textarea, {
              [styles.error]: errors.body,
            })}
            {...register('body', { required: { value: true, message: 'Text is required' } })}
          />
          <div className={styles.articleForm__error}>{errors?.body && <p>{errors?.body.message}</p>}</div>
        </label>
        <ul className={styles.articleForm__label}>
          Tags
          {fields.map((item, index) => (
            <li key={item.id} className={styles.itemTags}>
              <input
                placeholder="Tag"
                className={classNames(styles.articleForm__input, { [styles.error]: errors?.test?.[index]?.tag })}
                {...register(`tagList.${index}`, { required: { value: true, message: 'Enter or delete tag' } })}
              />
              <button className={styles.deleteBtn} type="button" onClick={() => remove(index)}>
                Delete
              </button>
              <div className={styles.articleForm__error}>
                {errors?.tagList?.[index] && <p>{errors?.tagList?.[index]?.message}</p>}
              </div>
            </li>
          ))}
          <li className={styles.itemTags}>
            <input placeholder="Tag" className={styles.articleForm__input} {...register('lastTag')} />
            <button
              className={styles.addBtn}
              type="button"
              onClick={async () => {
                await append(getValues('lastTag'));
                setValue('lastTag', '');
                setFocus('lastTag');
              }}
            >
              Add tag
            </button>
          </li>
        </ul>
        <input className={styles.articleForm__submit} value="Send" type="submit" />
      </form>
    </div>
  );
}

ArticleForm.propTypes = {
  title: PropTypes.string.isRequired,
  article: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};
