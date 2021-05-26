import { actionType } from "../constant/index";
const initialState = {
  showLoading: false,
  error:false
};
const ui = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SHOW_LOADING: {
      return {
        ...state,
        showLoading: true,
      };
    }
    case actionType.HIDE_LOADING: {
        return {
          ...state,
          showLoading: false,
        };
      }
    case actionType.ERROR:{
      return {
        ...state,
        error:true,
        showLoading:false,
      }
    }
    default:{
        return {
            ...state
        }
    }
  }
};
export default ui;
