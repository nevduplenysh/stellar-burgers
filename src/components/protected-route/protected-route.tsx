import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { selectAuthChecked, selectUser } from '../../services/slices/userSlice';
import { Navigate, useLocation } from 'react-router';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export function ProtectedRoute({ onlyUnAuth, children }: ProtectedRouteProps) {
  const location = useLocation();
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
}
