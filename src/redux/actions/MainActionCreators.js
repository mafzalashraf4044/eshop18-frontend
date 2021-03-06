import axios from 'axios';
import { API_URL } from 'general/constants';

const getHeaders = () => ({Authorization: "Bearer " + localStorage.getItem("token"), "x-requested-with": "XMLHttpRequest"});

export function saveUser(user) {
  return {
    type: 'SAVE_USER',
    payload: {
      user,
    },
  };
}

export function saveConfig(config) {
  return {
    type: 'SAVE_CONFIG',
    payload: {
      config,
    },
  };
}

export function saveIsLoading(isLoading) {
  return {
    type: 'SAVE_IS_LOADING_IN',
    payload: {
      isLoading,
    },
  };
}

export function saveIsBlur(isBlur) {
  return {
    type: 'SAVE_IS_BLUR',
    payload: {
      isBlur,
    },
  };
}

export function saveIsLoginModalOpen(isLoginModalOpen) {
  return {
    type: 'SAVE_IS_LOGIN_MODAL_OPEN',
    payload: {
      isLoginModalOpen,
    },
  };
}

export function saveIsForgotPwdModalOpen(isForgotPwdModalOpen) {
  return {
    type: 'SAVE_IS_FORGOT_PWD_MODAL_OPEN',
    payload: {
      isForgotPwdModalOpen,
    },
  };
}

export function saveIsResetPwdModalOpen(isResetPwdModalOpen) {
  return {
    type: 'SAVE_IS_RESET_PWD_MODAL_OPEN',
    payload: {
      isResetPwdModalOpen,
    },
  };
}

export function saveIsRegisterModalOpen(isRegisterModalOpen) {
  return {
    type: 'SAVE_IS_REGISTER_MODAL_OPEN',
    payload: {
      isRegisterModalOpen,
    },
  };
}

export const saveIsLoggedIn = (isLoggedIn) => {
  return {
      type: 'SAVE_IS_LOGGED_IN',
      payload: {isLoggedIn},
  };
}

export const saveNews = (news) => {
  return {
      type: 'SAVE_NEWS',
      payload: {news},
  };
}

export const saveReviews = (reviews) => {
  return {
      type: 'SAVE_REVIEWS',
      payload: {reviews},
  };
}

export const saveECurrencies = (eCurrencies) => {
  return {
      type: 'SAVE_E_CURRENCIES',
      payload: {eCurrencies},
  };
}

export const savePaymentMethods = (paymentMethods) => {
  return {
      type: 'SAVE_PAYMENNT_METHODS',
      payload: {paymentMethods},
  };
}

export const checkIsLoggedIn = () => {
  return (dispatch) => {
      return axios.get(`${API_URL}/is-logged-in`, {headers: getHeaders()});
  }
}

export const login = (credentials) => {
  return (dispatch) => {
      return axios.post(`${API_URL}/login`, credentials, {headers: getHeaders()});
  }
}

export const forgotPwd = (email) => {
  return (dispatch) => {
      return axios.post(`${API_URL}/forgot-password`, {email}, {headers: getHeaders()});
  }
}

export const resetPwd = (id, forgotPwdHash, newPwd) => {
  return (dispatch) => {
      return axios.post(`${API_URL}/reset-password/${id}`, {forgotPwdHash, newPwd}, {headers: getHeaders()});
  }
}

export const verifyEmail = (id, emailVerifyHash) => {
  return (dispatch) => {
      return axios.post(`${API_URL}/verify-email/${id}`, {emailVerifyHash}, {headers: getHeaders()});
  }
}

export const logout = () => {
  return (dispatch) => {
      return axios.get(`${API_URL}/logout`, {headers: getHeaders()});
  }
}

export const register = (user) => {
  return (dispatch) => {
      return axios.post(`${API_URL}/register-user`, user, {headers: getHeaders()});
  }
}

export const getNews = () => {
  return (dispatch) => {
      return axios.get(`${API_URL}/news?sortType=DESC&sortBy=createdAt&pageNum=1&pageSize=10&latest=true`, {headers: getHeaders()});
  }
}

export const getReviews = () => {
  return (dispatch) => {
      return axios.get(`${API_URL}/review?sortType=DESC&sortBy=createdAt&pageNum=1&pageSize=10&latest=true`, {headers: getHeaders()});
  }
}

export const editProfile = (id, user) => {
  return (dispatch) => {
      return axios.patch(`${API_URL}/edit-profile/${id}`, user, {headers: getHeaders()});
  }
}

export const changePassword = (id, oldPwd, newPwd) => {
  return (dispatch) => {
      return axios.post(`${API_URL}/change-password/${id}`, {oldPwd, newPwd}, {headers: getHeaders()});
  }
}

export const getECurrencies = () => {
  return (dispatch) => {
      return axios.get(`${API_URL}/ecurrency`, {headers: getHeaders()});
  }
}

export const getPaymentMethods = () => {
  return (dispatch) => {
      return axios.get(`${API_URL}/paymentmethod`, {headers: getHeaders()});
  }
}

export const getAccounts = () => {
  return (dispatch) => {
      return axios.get(`${API_URL}/user-account?sortType=DESC&sortBy=createdAt`, {headers: getHeaders()});
  }
}

export const addAccount = (account) => {
  return (dispatch) => {
      return axios.post(`${API_URL}/user-account`, account, {headers: getHeaders()});
  }
}

export const editAccount = (id, account) => {
  return (dispatch) => {
      return axios.patch(`${API_URL}/user-account/${id}`, account, {headers: getHeaders()});
  }
}

export const dltAccount = (id) => {
  return (dispatch) => {
      return axios.delete(`${API_URL}/user-account/${id}`, {headers: getHeaders()});
  }
}

export const currencyCalculator = (params) => {
  return (dispatch) => {
      return axios.post(`${API_URL}/currency-calculator`, params, {headers: getHeaders()});
  }
}

export const placeOrder = (order) => {
  return (dispatch) => {
      return axios.post(`${API_URL}/place-order`, order, {headers: getHeaders()});
  }
}

export const getUserOrders = () => {
  return (dispatch) => {
      return axios.get(`${API_URL}/user-orders?sortType=DESC&sortBy=createdAt`, {headers: getHeaders()});
  }
}

export const getConfig = () => {
  return (dispatch) => {
      return axios.get(`${API_URL}/config-user`, {headers: getHeaders()});
  }
}