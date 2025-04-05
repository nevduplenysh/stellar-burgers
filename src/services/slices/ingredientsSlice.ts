import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TAsyncStatus, TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export interface TIngredientList {
  ingredients: TIngredient[];
  status: TAsyncStatus;
}

export const initialState: TIngredientList = {
  ingredients: [],
  status: 'start'
};

export const getIngredients = createAsyncThunk(
  'burger/getIngredients',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectStatus: (state) => state.status,
    selectIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(getIngredients.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = 'success';
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectStatus } = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
