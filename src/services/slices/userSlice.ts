import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { buffer } from 'stream/consumers';
import { stat } from 'fs';

// registerUserApi() - регистрация нового пользователя

// loginUserApi() - вход пользователя

// getUserApi() - получение информации о текущем пользователе

// updateUserApi() - обновление данных пользователя

// logoutApi() - выход пользователя

type AsyncStatus = 'start' | 'loading' | 'error' | 'success';

interface TUserState {
  data: TUser | null;
  isAuthChecked: boolean;
  status: AsyncStatus;
}

const initialState: TUserState = {
  data: null,
  isAuthChecked: false,
  status: 'start'
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi(userData);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi(userData);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear(); // очищаем refreshToken
        deleteCookie('accessToken'); // очищаем accessToken
        dispatch(userLogout()); // удаляем пользователя из хранилища // 52 крч надо дописать потом как экшен в слайсе
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await getUserApi();
  return response;
});

export const updateUser = createAsyncThunk(
  'updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.data = null;
    },
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    selectUser: (state) => state.data,
    selectAuthChecked: (state) => state.isAuthChecked
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = 'success';
      })

      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = 'success';
      })

      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = 'success';
      })

      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = 'success';
      });
  }
});

export const { selectUser, selectAuthChecked } = authSlice.selectors;

export const { userLogout, authCheck } = authSlice.actions;

export default authSlice.reducer;
