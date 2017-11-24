import axios from 'axios';

// Actions
const prefix = 'CURRENCIES/';
export const GET = `${prefix}GET`;
export const SUCCESS = `${prefix}SUCCESS`;
export const FAIL = `${prefix}FAIL`;
export const RESET = `${prefix}RESET`;

// Reducer
const initialState = {
  loading: true,
  error: '',
  list: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET:
      return {
        ...state,
        loading: true,
        error: '',
      };

    case SUCCESS: {
      // The API is returning some empty strings in the country list, but these are not ignored.
      // The expectation would be for API to be corrected
      const sortedList = Object.values(action.payload.list).sort(
        (a, b) => b.countries.length - a.countries.length
      );
      return {
        ...state,
        loading: false,
        error: '',
        list: sortedList,
      };
    }

    case FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.toString(),
      };

    case RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

// Action Creators
export function fetchCurrencies() {
  const storage = localStorage.getItem('currencies');
  let cache = null;
  let isExpired = true;

  try {
    cache = JSON.parse(storage);
    isExpired = cache.expires - new Date() < 0;
  } catch (err) {
    console.log(err);
  }

  const promise = !isExpired
    ? Promise.resolve(cache)
    : axios.get('//api.gengi.is/currencies').then(res => {
        if (res.status !== 200) {
          return res.statusText;
        }
        localStorage.setItem('currencies', JSON.stringify(res.data));
        return res.data;
      });

  return {
    types: [GET, SUCCESS, FAIL],
    promise,
  };
}

export function resetMovieReducer() {
  return {
    type: RESET,
  };
}
