import {
    GETALL_CMT,
    WRITE_CMT,
    GETALL_ANSWER,
    WRITE_ANSWER,
    COUNT_ANSWER,
    ADD_USER,
    CHOOSE_USER,
    GET_USER,
} from '../actions/tagAction';

// const initialState = {
//     tag: [
//         {id:1,name:'C#'},
//         {id:2,name:'PHP'},
//         {id:3,name:'HTML'},
//     ],
//     currentTag:{}
// }

const initialState = {
    tag: [],
    tag2: [],
    user: [],
}

export const tagReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETALL_CMT:
            return {
                ...state,
                tag: [...action.payload],
            };
        case GETALL_ANSWER:
            return {
                ...state,
                tag2: [...action.payload],
            };
        case COUNT_ANSWER:
            return {
                ...state,
                tag2: [action.payload],
            };
        case WRITE_CMT:
            return {
                ...state,
                tag: [...state.tag, action.payload]
            };
        case WRITE_ANSWER:
            return {
                ...state,
                tag2: [...state.tag2, action.payload]
            };
        case GET_USER:
            return {
                ...state,
                user: [...action.payload],
            };
        case CHOOSE_USER:
            return {
                ...state,
                user: [...action.payload],
            };
        case ADD_USER:
            return {
                ...state,
                user: [...state.cart, action.payload]
            };
        default:
            return { ...state };
    }
}