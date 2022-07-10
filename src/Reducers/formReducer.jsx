const initial_state = {
  fields: {
    name: "",
    price: "",
    content: "",
  },
  loading: false,
  error: null,
  success: null,
};

export default function formReducer(state = initial_state, action) {
  switch (action.type) {
    case 'ADD_SERVICE_REQUEST':
      return { ...state, loading: true, error: null };
    case 'ADD_SERVICE_FAILURE':
      const { error } = action.payload;
      return { ...state, loading: false, error };
    case 'ADD_SERVICE_SUCCESS':
      return { ...initial_state, success: true };
    case 'GET_SERVICE_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GET_SERVICE_FAILURE': {
      const { error } = action.payload;
      return { ...state, loading: false, error };
    }
    case 'GET_SERVICE_SUCCESS':
      const { item } = action.payload;
      return {
        ...state,
        fields: { name: item.name, price: item.price, content: item.content },
        loading: false,
        error: null,
      };
    case 'CHANGE_SERVICE_FIELD':
      const { name, value } = action.payload;
      return { ...state, fields: { ...state.fields, [name]: value } };
    case 'RESET_SERVICE_FIELDS':
      return { ...initial_state };
    default:
      return state;
  }
}