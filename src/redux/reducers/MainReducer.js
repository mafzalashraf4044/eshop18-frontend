const defaultState = {
  isBlur: false,
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isLoggedIn: false,
  news: [],
  eCurrencies: [],
  paymentMethods: [],
  user: null,
  isLoading: false,
  config: {},
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SAVE_NEWS':
    case 'SAVE_USER':
    case 'SAVE_CONFIG':
    case 'SAVE_IS_BLUR':
    case 'SAVE_IS_LOGGED_IN':
    case 'SAVE_IS_LOADING_IN':
    case 'SAVE_E_CURRENCIES':
    case 'SAVE_PAYMENNT_METHODS':
    case 'SAVE_IS_LOGIN_MODAL_OPEN':
    case 'SAVE_IS_REGISTER_MODAL_OPEN':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}