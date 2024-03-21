export const GETALL_CMT = 'GETALL_CMT';
export const GETALL_ANSWER = 'GETALL_ANSWER';
export const WRITE_CMT = 'WRITE_CMT';
export const WRITE_ANSWER = 'WRITE_ANSWER';

export const GET_USER = 'GET_USER';
export const ADD_USER = 'ADD_USER';
export const CHOOSE_USER = 'CHOOSE_USER';
export const COUNT_ANSWER = 'COUNT_ANSWER';
export const DELETE_CMT = 'DELETE_CMT';
export const DELETE_ANSWER = 'DELETE_ANSWER';
// const IPHOSt='http://192.168.1.9:5555'
// const IPHOSt='http://10.104.23.189:5555'
const IPHOSt = "http://localhost:5555";

export const getAllCmts = (tags) => {
    return{
        type: GETALL_CMT,
        payload: tags, 
    }
}

export const getAllAnswers = (tags) => {
    return{
        type: GETALL_ANSWER,
        payload: tags, 
    }
}

export const countAllAnswers = (tags) => {
    return{
        type: COUNT_ANSWER,
        payload: tags, 
    }
}

export const postCmt = (tag) => {
    return{
        type: WRITE_CMT,
        payload: tag, 
    }
}

export const postAnswer = (tag) => {
    return{
        type: WRITE_ANSWER,
        payload: tag, 
    }
}

export const getUser = (user) => {
    return{
        type: GET_USER,
        payload: user, 
    }
}

export const chooseUser = (user) => {
    return{
        type: CHOOSE_USER,
        payload: user, 
    }
}

export const postUser = (user) => {
    return{
        type: ADD_USER,
        payload: user, 
    }
}

export const deleteCmt = (tag) => {
    return{
        type: DELETE_CMT,
        payload: tag, 
    }
}

export const deleteAnswer = (tag) => {
    return{
        type: DELETE_ANSWER,
        payload: tag, 
    }
}
export const fetchAllCmts = (id) =>{
    return(dispatch) => {
        const getData = async()=>{
            try{
                const response = await fetch(IPHOSt+'/api/comments/'+id);
                const tags = await response.json();
                dispatch(getAllCmts(tags));
                console.log(tags);
            }catch(error){
                console.log(error);
            }
        };
        getData();
    }
}

export const fetchAllAnswers = (id,id2) =>{
    return(dispatch) => {
        const getData = async()=>{
            try{
                const response = await fetch(IPHOSt+'/api/answers/'+id+'/'+id2);
                const tags = await response.json();
                dispatch(getAllAnswers(tags));
                console.log(tags);
            }catch(error){
                console.log(error);
            }
        };
        getData();
    }
}

export const updateCmt = (tag,id,id2) =>{
    return(dispatch) => {
        const updateData = async()=>{
            try{
                await fetch(IPHOSt+'/api/answer/'+id+'/'+id2,{
                    method: "PUT",
                    headers:{
                        Accept:"application/json","Content-Type":"application/json",
                    },
                    body: JSON.stringify(tag),
                })
                console.log(tag+id+id2);
            }catch(error){
                console.log(error);
            }
        };
        updateData();
        dispatch(countAllAnswers(tag));
    }
}

export const writeCmt = (tag,id) =>{
    return(dispatch) => {
        const postData = async()=>{
            try{
                await fetch(IPHOSt+'/api/comment/'+id,{
                    method: "POST",
                    headers:{
                        Accept:"application/json","Content-Type":"application/json",
                    },
                    body: JSON.stringify(tag),
                })
                console.log(tag+id);
            }catch(error){
                console.log(error);
            }
        };
        postData();
        dispatch(postCmt(tag));
    }
}

export const writeAnswer = (tag,id,id2) =>{
    return(dispatch) => {
        const postData = async()=>{
            try{
                await fetch(IPHOSt+'/api/writeranswer/'+id+'/'+id2,{
                    method: "POST",
                    headers:{
                        Accept:"application/json","Content-Type":"application/json",
                    },
                    body: JSON.stringify(tag),
                })
                console.log(tag);
            }catch(error){
                console.log(error);
            }
        };
        postData();
        dispatch(postAnswer(tag));
    }
}

export const removeCmt = (id, id2) => {
    return (dispatch) => {
        const deleteData = async () => {
            try {
                await fetch(IPHOSt + '/api/delete/' + id + '/' + id2, {
                    method: "DELETE",
                })

            }
            catch (error) {
                console.log(error)
            }
        };
        deleteData();
        dispatch(deleteCmt(id2))
    }
}

export const removeAnswer = (id,id2,id3) => {
    return (dispatch) => {
        const deleteData = async () => {
            try {
                await fetch(IPHOSt + '/api/delete/'+id+'/'+id2+'/'+id3, {
                    method: "DELETE",
                })

            }
            catch (error) {
                console.log(error)
            }
        };
        deleteData();
        dispatch(deleteAnswer(id3))
    }
}

export const addUser = (user) =>{
    return(dispatch) => {
        const postData = async()=>{
            try{
                await fetch(IPHOSt+'/api/register',{
                    method: "POST",
                    headers:{
                        Accept:"application/json","Content-Type":"application/json",
                    },
                    body: JSON.stringify(user),
                })
                console.log(user);
            }catch(error){
                console.log(error);
            }
        };
        postData();
        dispatch(postUser(user));
    }
}

export const checkUser = () =>{
    return(dispatch) => {
        const getData = async()=>{
            try{
                const response = await fetch(IPHOSt+'/api/accounts');
                const user = await response.json();
                dispatch(chooseUser(user));
                // console.log(user);
            }catch(error){
                console.log(error);
            }
        };
        getData();
    }
}

export const viewUser = (info,id) =>{
    return(dispatch) => {
        const updateData = async()=>{
            try{
                await fetch(IPHOSt+'/api/account/'+id,{
                    method: "PUT",
                    headers:{
                        Accept:"application/json","Content-Type":"application/json",
                    },
                    body: JSON.stringify(info),
                })
                console.log(info);
            }catch(error){
                console.log(error);
            }
        };
        updateData();
        dispatch(getuser(user));
    }
}