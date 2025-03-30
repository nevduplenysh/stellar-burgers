import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { getOrders, selectOders } from '../../services/slices/ordersUserSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOders);
  const dispatch = useDispatch();

  const loadOrders = useCallback(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return <ProfileOrdersUI orders={orders} />;
};
