import {AsyncStorage} from 'react-native';

export default class Bubble{

static token;

static _login = async (email, pw)=>{
    await fetch('https://reactnative.bubbleapps.io/version-test/api/1.1/wf/login/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({user: email, pw: pw}), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => this._storeData(response.response.token))
      .catch(error => console.error('Error:', error));
      console.log("Email:" + email + "PW:" + pw + "Token:" + this.token);  
    }

static _postData = async (title, image)=>{
    await this._retrieveData();
    await fetch('https://reactnative.bubbleapps.io/version-test/api/1.1/wf/addProduct/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({title: title, date: this._getDate(), image: image}), // data can be `string` or {object}!
        headers:{ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token 
        }
       
      }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
}

static _getProducts = async ()=>{
  let responseJson
    await fetch('https://shoppongau.bubbleapps.io/version-test/api/1.1/wf/getproducts/',{
    method: 'POST',
    body: JSON.stringify({sort: false}),
    headers:{ 
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  .then(response => responseJson = response)
  .catch(error => console.log('Error', error));
  return responseJson;
}

static _getShopByDealerId = async (dealerId)=>{
    let responseJson
    await fetch('https://shoppongau.bubbleapps.io/version-test/api/1.1/wf/getshop/',{
    method: 'POST',
    body: JSON.stringify({dealerId: dealerId}),
    headers:{ 
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  .then(response => responseJson = response)
  .catch(error => console.log('Error', error));
  return responseJson;
}

static _getDealer = async (dealerId) => {
    try{
      const response = await fetch('https://shoppongau.bubbleapps.io/version-test/api/1.1/obj/user/' + dealerId, {
        method: 'get',
        dataType: 'json'
      });
      responseJson = await response.json();
    }catch(error){
      alert('Sie haben keine Internetverbindung');  
    }
    return responseJson;
}

static _getShop = async (shopId) => {
  try{
    const response = await fetch('https://shoppongau.bubbleapps.io/version-test/api/1.1/obj/shop/' + shopId, {
      method: 'get',
      dataType: 'json'
    });
    responseJson = await response.json();
  }catch(error){
    alert('Sie haben keine Internetverbindung');  ss
  }
  return responseJson;
}

static _fetchProducts = async ()=>{  
  let responseJson;
  try{
      const response = await fetch('https://reactnative.bubbleapps.io/version-test/api/1.1/obj/test/',{
          method: 'get',
          dataType: 'json'
      });
      responseJson = await response.json();
  }catch(error){
      alert('Sie haben keine Internetverbindung');  
  }
  return responseJson;
}


static _getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

static _storeData = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      // Error saving data
    }
  };

static _retrieveData = async () => {
    try {
    this.token = await AsyncStorage.getItem('token') || 'none';
    console.log(this.token);
    if (token !== null) {
    // We have data!!
    
    
}
    } catch (error) {
        // Error retrieving data
    }
};


}