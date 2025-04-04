import reducer, {
    addIngredient,
    movingIngredient,
    deleteIngredient,
    removeBurger,
    initialState
} from './burgerConstructorSlice';
  
describe('burgerConstructorSlice', () => {
    const bun = {
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
      // id: 'RfqNKoGsLThNiTNVtrfit'
    };
  
    const main = {
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
      // id: 'L98GgDubBdi49lQPW4Ak2'
    };
  
    const sauce = {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png'
      // id: 'HXPSWT2jMEilyuyeha-lm'
    };
  
    test('добавление булки в конструктор', () => {
        const state = reducer(initialState, addIngredient(bun));
  
        expect(state).toEqual({
            bun: {
            ...bun,
            id: expect.any(String)
            },
            ingredients: []
        });
    });
  
    test('добавление ингредиентов в бургер', () => {
        const state = reducer(initialState, addIngredient(sauce));
        expect(state.bun).toBeNull();
        expect(state.ingredients).toHaveLength(1);
        expect(state.ingredients[0]).toMatchObject({
            ...sauce,
            id: expect.any(String)
        });
    });
  
    test('замена булки при повторном добавлении', () => {
        const firstState = reducer(initialState, addIngredient(bun));
        const newBun = { ...bun, _id: '4', name: 'Новая булка' };
        const nextState = reducer(firstState, addIngredient(newBun));
        expect(nextState.bun).toMatchObject({
            ...newBun,
            id: expect.any(String)
        });
    });
  
    test('удаление ингредиентов по индексу', () => {
        const startState = {
            ...initialState,
            ingredients: [
            { ...main, id: '1' },
            { ...sauce, id: '2' }
            ]
        };
        const state = reducer(startState, deleteIngredient(0));
        expect(state.ingredients).toHaveLength(1);
        expect(state.ingredients[0].name).toBe(sauce.name);
    });
  
    test('перемещение ингредиентов', () => {
        const startState = {
            ...initialState,
            ingredients: [
            { ...main, id: '1' },
            { ...sauce, id: '2' }
            ]
        };
        const state = reducer(
            startState,
            movingIngredient({ from: 0, to: 1 })
        );
        expect(state.ingredients[0].name).toBe(sauce.name);
        expect(state.ingredients[1].name).toBe(main.name);
    });
  
    test('удаление бургера', () => {
        const startState = {
            bun: { ...bun, id: 'bun-id' },
            ingredients: [
            { ...main, id: 'main-id' },
            { ...sauce, id: 'sauce-id' }
            ]
        };
        const state = reducer(startState, removeBurger());
        expect(state).toEqual(initialState);
    });
});