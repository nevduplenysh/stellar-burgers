import {
  getIngredients,
  ingredientsSlice,
  initialState,
  TIngredientList
} from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const mockData = [
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png'
    },

    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png'
    }
  ];

  test('состояние: pending', () => {
    const expectedState = { ...initialState, status: 'loading' };
    const actualState = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('')
    );
    expect(actualState).toEqual(expectedState);
  });

  test('состояние: rejected', () => {
    const expectedState = { ...initialState, status: 'error' };
    const actualState = ingredientsSlice.reducer(
      initialState,
      getIngredients.rejected(new Error(), '')
    );
    expect(actualState).toEqual(expectedState);
  });

  test('состояние: fulfilled', () => {
    const expectedState: TIngredientList = {
      ingredients: mockData,
      status: 'success'
    };
    const actualState = ingredientsSlice.reducer(
      initialState,
      getIngredients.fulfilled(mockData, '')
    );
    expect(actualState).toEqual(expectedState);
  });
});
