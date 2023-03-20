import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Article'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      if (state.userSlice.user.token || localStorage.getItem('token')) {
        headers.set('Authorization', `Bearer ${state.userSlice.user.token || localStorage.getItem('token')}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit, offset }) => `articles?limit=${limit}&offset=${offset}`,
      providesTags: (result) => {
        return result
          ? [...result.articles.map(({ slug }) => ({ type: 'Article', id: slug })), 'Article']
          : ['Article'];
      },
    }),
    getArticle: builder.query({
      query: (slug) => `articles/${slug}`,
      providesTags: (result, error, arg) => [{ type: 'Article', id: arg }],
    }),
    registerUser: builder.mutation({
      query(body) {
        return {
          url: 'users',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Article'],
    }),
    loginUser: builder.mutation({
      query(body) {
        return {
          url: 'users/login',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Article'],
    }),
    updateUser: builder.mutation({
      query(body) {
        return {
          url: 'user',
          method: 'PUT',
          body,
        };
      },
    }),
    getProfile: builder.query({
      query: () => 'user',
    }),
    favouriteArticle: builder.mutation({
      query(slug) {
        return {
          url: `/articles/${slug}/favorite`,
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Article', id: arg }],
    }),
    unfavouriteArticle: builder.mutation({
      query(slug) {
        return {
          url: `/articles/${slug}/favorite`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Article', id: arg }],
    }),
    addArticle: builder.mutation({
      query(body) {
        return {
          url: 'articles',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Article'],
    }),
    deleteArticle: builder.mutation({
      query(slug) {
        return {
          url: `articles/${slug}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Article', id: arg }],
    }),
    updateArticle: builder.mutation({
      query({ article, slug }) {
        return {
          url: `articles/${slug}`,
          method: 'PUT',
          body: { article },
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Article', id: arg.slug }],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useFavouriteArticleMutation,
  useUnfavouriteArticleMutation,
  useAddArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
  useLazyGetProfileQuery,
} = blogApi;
