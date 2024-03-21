import { AsyncStorage } from 'react-native';


//Dữ liệu liên tục:
_storeData = async () => {
    try {
      await AsyncStorage.setItem(
        '@MySuperStore:key',
        'I like to save it.'
      );
    } catch (error) {
      // Error saving data
    }
};

//Tìm nạp dữ liệu
_retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TASKS');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
};

//get item
getItem('123', (error, result) => {console.log(result)});
//set item
setItem('123', '456', () => {});
//remove item
removeItem('123', () => {});
//merge item
mergeItem('123', '456', () => {});

//example
let UID123_object = {
  name: 'Chris',
  age: 30,
  traits: { hair: 'brown', eyes: 'brown' }
};
// You only need to define what will be added or updated
let UID123_delta = {
  age: 31,
  traits: { eyes: 'blue', shoe_size: 10 }
};

AsyncStorage.setItem(
  'UID123',
  JSON.stringify(UID123_object),
  () => {
    AsyncStorage.mergeItem(
      'UID123',
      JSON.stringify(UID123_delta),
      () => {
        AsyncStorage.getItem('UID123', (err, result) => {
          console.log(result);
        });
      }
    );
  }
);

// Console log result:
// => {'name':'Chris','age':31,'traits':
//    {'shoe_size':10,'hair':'brown','eyes':'blue'}}
  
  