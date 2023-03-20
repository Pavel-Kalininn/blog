import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth.js';
import { useLazyGetProfileQuery } from '../../redux/blogApi.js';
import { WithAuth } from '../../hoc/withAuth.js';
import ArticlePage from '../../pages/articlePage.jsx';
import '../../global.scss';
import ArticleList from '../articleList/articleList.jsx';
import Header from '../header/header.jsx';
import SignUpPage from '../../pages/signUpPage.jsx';
import SignInPage from '../../pages/signInPage.jsx';
import UserProfilePage from '../../pages/userProfilePage.jsx';
import EditArticlePage from '../../pages/editArticlePage.jsx';
import NewPostPage from '../../pages/newPostPage.jsx';
import NotFoundPage from '../../pages/notFoundPage.jsx';

function App() {
  const [trigger] = useLazyGetProfileQuery();
  const { isAuth } = useAuth();
  useEffect(() => {
    if (localStorage.getItem('token') && !isAuth) {
      trigger();
    }
  }, [isAuth]);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<ArticleList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route element={<WithAuth />}>
          <Route path="/new-article" element={<NewPostPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/articles/:slug/edit" element={<EditArticlePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
