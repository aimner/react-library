import { Outlet } from 'react-router-dom';

import { Loader } from '../../components/loader';
import { useAppSelector } from '../../hooks/hooks';
import { selectLoading } from '../../store/features/books/selectors';

import classes from './auth-page.module.scss';

export const AuthPage = () => {
  
  const loading = useAppSelector(selectLoading);

  return (
    <div className={classes.auth}>
      {loading !== 'pending' || <Loader />}
      <div className={classes.auth_block}>
        <h2 className={classes.auth_block__title}>Cleverland</h2>
        <Outlet />
      </div>
    </div>
  );
};
