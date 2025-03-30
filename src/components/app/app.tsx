import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { ProtectedRoute } from '../protected-route/protected-route';
import { authCheck, getUser } from '../../services/slices/userSlice';

// const App = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const backgroundLocation = location.state?.background; // Теперь берём из state.background
//   console.log(location);
//   console.log('Location:', location);
//   console.log('Background location:', backgroundLocation);

//   useEffect(() => {
//     dispatch(getIngredients());
//   }, [dispatch]);

//   // хз почему но из-за кода ниже повылазили ошибки (возможно ошибки не только здесь)

//   // useEffect(() => {
//   //   dispatch(getUser()).finally(() => dispatch(authCheck()));
//   // }, [dispatch]);

//   // useEffect(() => {
//   //   dispatch(getUser())
//   //     .unwrap()
//   //     .catch((err) => {
//   //       console.log(err);
//   //     })
//   //     .finally(() => dispatch(authCheck()));
//   // }, [getUser]);

//   useEffect(() => {
//     dispatch(authCheck());
//   }, [dispatch]);

//   useEffect(() => {
//     console.log('Fetching ingredients and checking user authentication');

//     // Диспетчеризация загрузки ингредиентов
//     dispatch(getIngredients());

//     // Диспетчеризация проверки аутентификации
//     dispatch(getUser());
//   }, [dispatch]);

//   return (
//     <div className={styles.app}>
//       <AppHeader />
//       <Routes location={backgroundLocation || location}>
//         <Route path='/' element={<ConstructorPage />} />
//         <Route path='/feed' element={<Feed />} />

//         <Route
//           path='/login'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <Login />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/register'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <Register />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/forgot-password onlyUnAuth'
//           element={
//             <ProtectedRoute>
//               <ForgotPassword />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/reset-password onlyUnAuth'
//           element={
//             <ProtectedRoute>
//               <ResetPassword />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path='/profile'
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/profile/orders'
//           element={
//             <ProtectedRoute>
//               <ProfileOrders />
//             </ProtectedRoute>
//           }
//         />

//         <Route path='*' element={<NotFound404 />} />

//         <Route path='/feed/:number' element={<OrderInfo />} />
//         <Route path='/ingredients/:id' element={<IngredientDetails />} />
//       </Routes>

//       {backgroundLocation && (
//         <Routes>
//           <Route
//             path='/feed/:number'
//             element={
//               <Modal title={'OrderInfo'} onClose={() => navigate(-1)}>
//                 <OrderInfo />
//               </Modal>
//             }
//           />
//           <Route
//             path='/ingredients/:id'
//             element={
//               <Modal title={'IngredientDetails '} onClose={() => navigate(-1)}>
//                 <IngredientDetails />
//               </Modal>
//             }
//           />
//           <Route
//             path='/profile/orders/:number'
//             element={
//               <Modal title={'OrderInfoNumber '} onClose={() => navigate(-1)}>
//                 <OrderInfo />
//               </Modal>
//             }
//           />
//         </Routes>
//       )}
//       {/* <Route path='/profile/orders/:number' element={<ProtectedRoute><OrderInfo /></ProtectedRoute>} /> */}

//       {/* <ConstructorPage /> */}
//     </div>
//   );
// };

// export default App;

// // const App = () => (
// //   <div className={styles.app}>
// //     <AppHeader />
// //     <ConstructorPage />
// //   </div>
// // );

// // export default App;

const App = () => {
  const navigate = useNavigate();
  const handleModalClose = () => {
    navigate(-1);
  };
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUser())
      .unwrap()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(authCheck()));
  }, [getUser]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Детали Заказа'} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={'Детали Заказа'} onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
