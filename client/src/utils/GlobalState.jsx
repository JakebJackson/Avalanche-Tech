import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const OrderContext = createContext();
const { Provider } = OrderContext;

const OrderProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    parts: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useOrderContext = () => {
  return useContext(OrderContext);
};

export { OrderProvider, useOrderContext };
