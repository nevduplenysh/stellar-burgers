import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface TConstructorData {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: TConstructorData = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    movingIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const ingredients = [...state.ingredients];
      const [movedItem] = ingredients.splice(from, 1);
      ingredients.splice(to, 0, movedItem);
      state.ingredients = ingredients;
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    }
  },
  selectors: {
    selectBurgerConstructor: (state) => state
  }
});

export const { addIngredient, movingIngredient, deleteIngredient } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
export const { selectBurgerConstructor } = burgerConstructorSlice.selectors;
