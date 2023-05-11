import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LayoutMain } from '../components/layout-main';
import { useAppSelector } from '../hooks/hooks';
import { selectIsAuth } from '../store/features/auth/selectors';

import { AuthForm } from './auth/auth-form/auth-form';
import { ForgotPasswordForm } from './auth/forgot-password-form';
import { RegistrationForm } from './auth/registration-form';
import { AuthPage } from './auth';
import { BookPage } from './book';
import { MainPage } from './main';
import { Profile } from './profile';
import { Terms } from './terms';

export type ShowSideBarType = {
  show: boolean;
  open: boolean;
};

export const App: React.FC = () => {
  const [showSideBar, setShowSideBar] = useState<ShowSideBarType>({ show: false, open: true });
  const [openMenu, setOpenMenu] = useState(false);
  const isAuth = useAppSelector(selectIsAuth);

  // BEFORE_AUTH
  if (!isAuth) {
    return (
      <>
        <Routes>
          <Route path='/' element={<AuthPage />}>
            <Route path='/' element={<Navigate to='/auth' />} />
            <Route path='/*' element={<Navigate to='/auth' />} />
            <Route path='/auth' element={<AuthForm />} />
            <Route path='/registration' element={<RegistrationForm />} />
            <Route path='/forgot-pass' element={<ForgotPasswordForm />} />
          </Route>
        </Routes>
      </>
    );
  }

  // AFTER_AUTH
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <LayoutMain
              showSideBar={showSideBar}
              setShowSideBar={setShowSideBar}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          }
        >
          <Route path='/' element={<Navigate to='/books/all' />} />
          <Route
            path='/books/:category'
            element={<MainPage showSideBar={showSideBar} setShowSideBar={setShowSideBar} />}
          />

          <Route path='/terms' element={<Terms showSideBar={showSideBar} setShowSideBar={setShowSideBar} />} />
          <Route path='/offer' element={<Terms showSideBar={showSideBar} setShowSideBar={setShowSideBar} />} />
          <Route path='/profile' element={<Profile showSideBar={showSideBar} setShowSideBar={setShowSideBar} />} />
          <Route
            path='/books/:category/:id'
            element={<BookPage showSideBar={showSideBar} setShowSideBar={setShowSideBar} />}
          />
          <Route path='/*' element={<Navigate to='/books/all' />} />
        </Route>
      </Routes>
    </>
  );
};
