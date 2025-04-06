import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import {
  getOrderByNumber,
  selectOrderNumber
} from '../../services/slices/orderNumberSlice';
import { useParams } from 'react-router-dom';
import { selectOrder } from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const { orderByNumber } = useSelector(selectOrderNumber);
  const order = useSelector(selectOrder);

  const dispatch = useDispatch();

  const { number } = useParams();
  const orderNumber = Number(number);

  useEffect(() => {
    dispatch(getOrderByNumber(orderNumber));
  }, [dispatch]);

  const orderData = orderByNumber.find((order) => order.number === orderNumber);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
