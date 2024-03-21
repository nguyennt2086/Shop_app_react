import { GET_CART,ADD_CART,} from '../actions/cartAction';

const initialState = {
    cart: [],
}

export const cartReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_CART:
            return {
                ...state,
                cart: [...action.payload],
            };
        case ADD_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };   
        default:
            return {...state};
    }
}