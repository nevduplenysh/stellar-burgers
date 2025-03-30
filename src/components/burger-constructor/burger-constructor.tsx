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
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // constructorItems === данные о текущих выбранных ингредиентах и булочке
  // orderRequest === взять из стора статус выполнения заказа (идёт ли в данный момент запрос на сервер)
  // orderModalData === взять из стора данные о сделанном заказе для отображения в модальном окне
  const items = useSelector(selectBurgerConstructor);
  const constructorItems = items;
  const dispatch = useDispatch();
  const order = useSelector(selectOrder);

  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const orderRequest = order.status === 'loading';

  const orderModalData = order.orderData;

  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const isAuthChecked = useSelector(selectAuthChecked);

  // const onOrderClick = () => {
  //   if (!constructorItems.bun || orderRequest) return;
  // };

  const onOrderClick = () => {
    if (!user) return navigate('/login');

    // if (!isAuthChecked) return; // Если аутентификация еще не проверена, выходим из функции

    if (!constructorItems.bun || orderRequest) {
      console.log(52);
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
    console.log('9999');
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
