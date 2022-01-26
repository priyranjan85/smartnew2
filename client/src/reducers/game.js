import {
  SET_TOP_WINNERS,
  SET_TOTAL_PAYOUT,
} from '../actions/types';

const initialState = {
  top_winners:null,
  total_payout: 0,
};

function gameReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TOP_WINNERS:
      return {
        ...state,
        top_winners: payload
      };
    case SET_TOTAL_PAYOUT:
      return {
        ...state,
        total_payout: payload
      };
    default:
      return state;
  }
}

export default gameReducer;
