import { TUser } from '@utils-types';
import {
  initialState,
  TUserState,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  userLogout,
  authCheck,
  authSlice
} from './userSlice';
import { TLoginData } from '@api';

describe('userSlice', () => {
  const userRegistrationData = {
    email: 'ooo@gmail.com',
    name: 'ooo',
    password: 'o1o2o3o4o5'
  };

  const userLoginDatata: TLoginData = {
    email: 'ooo@gmail.com',
    password: 'o1o2o3o4o5'
  };

  const userTestData: TUser = { email: 'ooo@gmail.com', name: 'ooo' };

  describe('test reducers', () => {
    test('выход из профиля', () => {
      const actualState = authSlice.reducer(
        { ...initialState, data: userTestData },
        userLogout()
      );

      expect(actualState).toEqual(initialState);
    });

    test('аутентификация пользователя', () => {
      const expectedState = {
        ...initialState,
        isAuthChecked: true
      };
      const actualState = authSlice.reducer(initialState, authCheck());

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('test extra reducers ', () => {
    test('состояние: registerUser.pending', () => {
      const expectedState = {
        ...initialState,
        status: 'loading'
      };
      const actualState = authSlice.reducer(
        initialState,
        registerUser.pending('', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    test('состояние: registerUser.rejected', () => {
      const expectedState = {
        ...initialState,
        status: 'error'
      };
      const actualState = authSlice.reducer(
        initialState,
        registerUser.rejected(new Error(), '', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    test('состояние: registerUser.fulfilled', () => {
      const expectedState = {
        ...initialState,
        data: userTestData,
        status: 'success'
      };
      const mockAuthResponceData = {
        success: true,
        refreshToken: 'test-refreshToken',
        accessToken: 'test-accessToken',
        user: userTestData
      };
      const actualState = authSlice.reducer(
        initialState,
        registerUser.fulfilled(mockAuthResponceData, '', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    test('состояние: loginUser.pending', () => {
      const expectedState = {
        ...initialState,
        status: 'loading'
      };
      const actualState = authSlice.reducer(
        initialState,
        loginUser.pending('', userLoginDatata)
      );
      expect(actualState).toEqual(expectedState);
    });

    test('состояние: loginUser.rejected', () => {
      const expectedState = {
        ...initialState,
        status: 'error'
      };
      const actualState = authSlice.reducer(
        initialState,
        loginUser.rejected(new Error(), '', userLoginDatata)
      );
      expect(actualState).toEqual(expectedState);
    });

    test('состояние: loginUser.fulfilled', () => {
      const expectedState: TUserState = {
        ...initialState,
        data: userTestData,
        status: 'success'
      };
      const mockAuthResponceData = {
        success: true,
        refreshToken: 'test-refreshToken',
        accessToken: 'test-accessToken',
        user: userTestData
      };
      const actualState = authSlice.reducer(
        initialState,
        loginUser.fulfilled(mockAuthResponceData, '', userLoginDatata)
      );
      expect(actualState).toEqual(expectedState);
    });

    test('состояние: getUser.pending ', () => {
      const expectedState: TUserState = {
        isAuthChecked: false,
        data: null,
        status: 'loading'
      };
      const actualState = authSlice.reducer(
        initialState,
        getUser.pending('checkUserAuth')
      );
      expect(actualState).toEqual(expectedState);
    });

    test('состояние: getUser.rejected', () => {
      const expectedState = { ...initialState, status: 'error' };
      const actualState = authSlice.reducer(
        initialState,
        getUser.rejected(new Error(), '')
      );
      expect(actualState).toEqual(expectedState);
    });

    test('состояние: getUser.fulfilled', () => {
      const expectedState = {
        ...initialState,
        data: userTestData,
        status: 'success'
      };
      const actualState = authSlice.reducer(
        initialState,
        getUser.fulfilled({ user: userTestData, success: true }, '')
      );
      expect(actualState).toEqual(expectedState);
    });

    test('состояние: updateUser.pending', () => {
      const expectedState = {
        ...initialState,
        status: 'loading'
      };
      const actualState = authSlice.reducer(
        initialState,
        updateUser.pending('', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    test('состояние: updateUser.rejected', () => {
      const expectedState = { ...initialState, status: 'error' };
      const actualState = authSlice.reducer(
        initialState,
        updateUser.rejected(new Error(), '', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    test('состояние: updateUser.fulfilled', () => {
      const expectedState = {
        ...initialState,
        data: userTestData,
        status: 'success'
      };
      const actualState = authSlice.reducer(
        initialState,
        updateUser.fulfilled(
          { success: true, user: userTestData },
          '',
          userRegistrationData
        )
      );
      expect(actualState).toEqual(expectedState);
    });
  });
});
