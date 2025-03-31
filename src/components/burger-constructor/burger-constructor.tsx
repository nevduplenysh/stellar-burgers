import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  removeBurger,
  selectBurgerConstructor
} from '../../services/slices/burgerConstructorSlice';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrder,
  orderBurger,
  selectOrder
} from '../../services/slices/orderSlice';
import { selectAuthChecked, selectUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const items = useSelector(selectBurgerConstructor);
  const order = useSelector(selectOrder);
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectAuthChecked);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = items;

  const orderRequest = order.status === 'loading';

  const orderModalData = order.orderData;

  const onOrderClick = () => {
    if (!user) return navigate('/login');

    if (!isAuthChecked) return; // Если аутентификация еще не проверена, выходим из функции

    if (!constructorItems.bun || orderRequest) {
      return;
    }

    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(
          (ing: TConstructorIngredient) => ing._id
        ),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(removeBurger());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
