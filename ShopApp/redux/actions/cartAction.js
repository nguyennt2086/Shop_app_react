export const GET_CART = 'GET_CART';
export const ADD_CART = 'ADD_CART';

export const getCart = (carts) => {
    return{
        type: GET_CART,
        payload: carts, 
    }
}

export const postCart = (cart) => {
    return{
        type: ADD_CART,
        payload: cart, 
    }
}

const IPHOSt = "http://localhost:5555";

export const fetchAllCarts = (id) =>{
    return(dispatch) => {
        const getData = async()=>{
            try{
                const response = await fetch(IPHOSt+'/api/carts/'+id);
                const carts = await response.json();
                dispatch(getCart(carts));
                console.log(carts);
            }catch(error){
                console.log(error);
            }
        };
        getData();
    }
}

export const addCart = (cart,id) =>{
    return(dispatch) => {
        const postData = async()=>{
            try{
                await fetch(IPHOSt+'/api/cart/'+id,{
                    method: "POST",
                    headers:{
                        Accept:"application/json","Content-Type":"application/json",
                    },
                    body: JSON.stringify(cart),
                })
                console.log(cart);
            }catch(error){
                console.log(error);
            }
        };
        postData();
        dispatch(postCart(cart));
    }
}