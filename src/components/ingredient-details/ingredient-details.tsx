import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  // Получаем список ингредиентов из Redux-стора
  const ingredients = useSelector(selectIngredients);

  // Получаем ID ингредиента из URL-параметров
  const { id } = useParams();

  // Находим ингредиент по ID или возвращаем null если не найден
  const ingredientData =
    ingredients.find((ingredient) => ingredient._id === id) || null;

  // Если ингредиент не загружен, показываем прелоадер
  if (!ingredientData) {
    return <Preloader />;
  }

  // Рендерим UI компонент с данными ингредиента
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
