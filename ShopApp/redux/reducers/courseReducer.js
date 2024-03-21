import { GETALL_COURSES, CREATE_COURSE, UPDATE_COURSE, DELETE_COURSE, SEARCH_NAME } from '../actions/courseAction';

const initialState = {
    courses: [],
}

export const courseReducer = (state=initialState, action) => {
    switch(action.type){
        case GETALL_COURSES:
            
            return{
                ...state,
                courses:[...action.payload],
            };
        case CREATE_COURSE:
            return{
                ...state,
                courses: [...state.courses, action.payload]
            };
        case UPDATE_COURSE:
            return{
                ...state,
                courses: [...state.courses, action.payload]
            };
        case DELETE_COURSE:
            return{
                ...state,
                courses: [...state.courses, action.payload]
            };
        case SEARCH_NAME:
            return {
                ...state,
                courses:[...action.payload],
                isSuccess :false,
            };
        // case GETALL_CMT:
            
        //     return{
        //         ...state,
        //         courses: [...action.payload],
        //     };
        // case WRITE_CMT:
        //     return {
        //         ...state,
        //         courses: [...state.courses, action.payload]
        //     };
        default:
            return {...state};
    }
}