// type ProtectedRouteProps = {
//   children: React.ReactElement;
// };

// export const ProtectedRoute = ({ children }: ProtectedRouteProps) => children;

import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { selectAuthChecked, selectUser } from '../../services/slices/userSlice';
import { Navigate, useLocation } from 'react-router';

// type ProtectedRouteProps = {
//   onlyUnAuth?: boolean;
//   children: React.ReactElement;
// };

// export const ProtectedRoute = ({
//   onlyUnAuth,
//   children
// }: ProtectedRouteProps) => {
//   // const isAuthChecked = useSelector(selectAuthChecked); // selectAuthChecked — селектор получения состояния загрузки пользователя
//   const isAuthChecked = useSelector(selectAuthChecked);
//   const user = useSelector(selectUser); // selectUser — селектор получения пользователя из store
//   const location = useLocation();

//   if (!isAuthChecked) {
//     // пока идёт чекаут пользователя, показываем прелоадер
//     return <Preloader />;
//   }

//   if (!onlyUnAuth && !user) {
//     // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
//     return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
//   }

//   if (onlyUnAuth && user) {
//     // если пользователь на странице авторизации и данные есть в хранилище
//     // при обратном редиректе получаем данные о месте назначения редиректа из объекта location.state
//     // в случае если объекта location.state?.from нет — а такое может быть, если мы зашли на страницу логина по прямому URL
//     // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
//     const from = location.state?.from || { pathname: '/' };

//     return <Navigate replace to={from} />;
//   }

//   return children;
// };

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
