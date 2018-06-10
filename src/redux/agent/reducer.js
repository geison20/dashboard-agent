import actions from "./actions";

const initState = {
  data: null,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {

    case actions.SET_USER:
      return {
        ...state,
        data: action.agent
      };

    default:
      return state;
  }
};
