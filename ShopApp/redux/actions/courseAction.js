import NetInfo from "@react-native-community/netinfo";
export const GETALL_COURSES = 'GETALL_COURSES';
export const CREATE_COURSE = 'CREATE_COURSE';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const SEARCH_NAME = 'SEARCH_NAME';
// const address = require('address');
//const NetworkInfo = require('react-native-network-info');
//var address = require('network-address')
 
  

//const ipAddress = address.ipv4();
// const IPHOST = "http://10.104.23.189:5555";

// const IPHOST = "http://192.168.1.9:5555";
const IPHOST = "http://localhost:5555";

// const serverFolder = '/storage/emulated/0/FileServerUpload';
// const fileToUpload = {
//     // if want to upload and rename, it can be `name: 'foo.bar'`, but can not be 'foo'
//     // only if your server upload code support file name without type, on our server
//     // https://github.com/flyskywhy/react-native-file-server/blob/1034a33dd6d8b0999705927ad78368ca1a639add/android/src/main/java/webserver/WebServer.java#L372
//     // will cause java.lang.StringIndexOutOfBoundsException in substring()
//     name: file.name,

//     // type is necessary in Android, it can be 'image/jpeg' or 'foo/bar', but can not be
//     // 'foo', 'foo/', '/foo' or undefined, otherwise will cause `[AxiosError: Network Error]`
//     type: 'a/b',

//     uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
//   };
// const form = new FormData();
// form.append('path', serverFolder);
// form.append('uploadfile', fileToUpload);

export const getAllCourses = (courses) => {
    return{
        type: GETALL_COURSES,
        payload: courses, 
    }
}

export const updateCourses = (course) => {
    return{
        type: CREATE_COURSE,
        payload: course, 
    }
}

export const createCourses = (course) => {
    return{
        type: CREATE_COURSE,
        payload: course, 
    }
}

export const deleteCourses = (id)=>{
    return{
        type:DELETE_COURSE,
        payload:id,

    }
}

export const SearchBook = (name) => {
    return {
      type: SEARCH_NAME,
      payload:name,
    };
  };

export const fetchAllCourses = () =>{
    return(dispatch) => {
        
        const getData = async()=>{
            try{
                const response = await XMLHttpRequest(IPHOST+'/api/courses',form);
                const data = await response.json();
                dispatch(getAllCourses(data));
                console.log(data);
               
                
            }catch(error){
                console.log(error);
            }
        };
        getData();
    }
}

export const postCourse = (course) =>{
    return(dispatch) => {
        const postData = async()=>{
            try{
                await fetch(IPHOST+'/api/post',{
                    method: "POST",
                    headers:{
                        Accept:"application/json","Content-Type":"application/json",
                    },
                    body: JSON.stringify(course),
                })
                console.log(course);
            }catch(error){
                console.log(error);
            }
        };
        postData();
        dispatch(createCourses(course));
    }
}

export const updateCourse = (course,id) =>{
    return(dispatch) => {
        const updateData = async()=>{
            try{
                await fetch(IPHOST+'/api/update/'+id,{
                    method: "PUT",
                    headers:{
                        Accept:"application/json","Content-Type":"application/json",
                    },
                    body: JSON.stringify(course),
                })
                console.log(course);
            }catch(error){
                console.log(error);
            }
        };
        updateData();
        dispatch(updateCourses(course));
    }
}

export const deleteCourse = (id) => {
    return(dispatch) => {
        const deleteData = async () => {
        try{
            await fetch(IPHOST+'/api/delete/'+id,{
                    method: "DELETE",
                })
            
        }
        catch(error){
            console.log(error)
        }
    };
    deleteData();
    dispatch(deleteCourses(id))
}
}

// export const searchItem=(key)=>{
//     return (dispatch)=>{
//       const getData = async () => {
//         try {
//             const response=await fetch("http://localhost:5555/api/courses/"+key);
//             const name=await response.json();
//             // console.log(books)
//             dispatch(SearchBook(name))
//         } catch (err) {
//             console.error(err);
//         }
//     };
//     getData();
//     }
//   }

