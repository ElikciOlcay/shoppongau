import {AsyncStorage} from 'react-native';

export default class Bubble{

static token;

/*****Login******/
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

/*****Add Product******/
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

//get all products for the Startpage
/* Sort value for API 
    sort 1 = random 
    sort 2 = price desc
    sort 3 = price asc
    sort 4 = category + desc
    sort 5 = category + asc
    sort 6 = category
 */
static _getProducts = async (sort, category, cursor)=>{
  let url;
  console.log(sort);
  console.log(category);
  let responseJson;
  switch(sort){
    case 1: url = `http://shoppongau.at/api/1.1/obj/product?constraints=[{"key": "active", "constraint_type":"equals", "value": "true"}]&limit=20&cursor=${cursor}`;
    break;
    case 2: url = `http://shoppongau.at/api/1.1/obj/product?sort_field=preis&descending=true&constraints=[{"key": "active", "constraint_type":"equals", "value": "true"}]&limit=20&cursor=${cursor}`;
    break;
    case 3: url = `http://shoppongau.at/api/1.1/obj/product?sort_field=preis&descending=false&constraints=[{"key": "active", "constraint_type":"equals", "value": "true"}]&limit=20&cursor=${cursor}`;
    break;
    case 4: url = `http://shoppongau.at/api/1.1/obj/product?sort_field=preis&descending=true&constraints=[{"key": "active", "constraint_type":"equals", "value": "true"},{"key": "category", "constraint_type":"equals", "value": "${category}"}]&limit=20&cursor=${cursor}`;
    break;
    case 5: url = `http://shoppongau.at/api/1.1/obj/product?sort_field=preis&descending=false&constraints=[{"key": "active", "constraint_type":"equals", "value": "true"},{"key": "category", "constraint_type":"equals", "value": "${category}"}]&limit=20&cursor=${cursor}`;
  }
  await fetch(url,{
    method: 'GET',
    headers:{  
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  .then(response => responseJson = response)
  .catch(error => console.log('Error', error));
  //console.log(responseJson);
  return responseJson;
}

static _getGradientColor = async (id) => {
  let responseJson;
    await fetch("https://shoppongau.at/api/1.1/wf/getgradientcolor/",{
      method: 'POST',
      body: JSON.stringify({id}),
      headers:{
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .then(response => responseJson = response)
    .catch(error => console.log('Error', error));
    return responseJson;
}

// get favorites 
static _getFavorites = async (favorites)=>{
  let responseJson
    await fetch("https://shoppongau.bubbleapps.io/version-test/api/1.1/wf/getfavorite/",{
    method: 'POST',
    body: JSON.stringify({product: favorites}),
    headers:{ 
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  .then(response => responseJson = response)
  .catch(error => console.log('Error', error));
  return responseJson;
}

//get all products from shop
static _getProductsFromShop = async (shopId)=>{
  let responseJson
    await fetch("https://shoppongau.bubbleapps.io/version-test/api/1.1/wf/getshopproducts/",{
    method: 'POST',
    body: JSON.stringify({sort: false, shopId:shopId}),
    headers:{ 
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  .then(response => responseJson = response)
  .catch(error => console.log('Error', error));
  return responseJson;
}

//Get all shops for the ShoppsScreen
static _getShops = async ()=>{
  let responseJson
    await fetch("https://shoppongau.bubbleapps.io/version-test/api/1.1/wf/getshops/",{
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

//get shop for productDetailsScreen
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

static _getCategory = async () => {
  try{
    const response = await fetch('https://www.shoppongau.at/api/1.1/obj/category/' , {
      method: 'get',
      dataType: 'json'
    });
    responseJson = await response.json();
  }catch(error){
    alert('Sie haben keine Internetverbindung');  
  }
  return responseJson;
}

static _getCategoryByName = async (name) => {
  let url = `https://www.shoppongau.at/api/1.1/obj/category/?constraints=[{
    "key": "value", 
    "constraint_type":"equals", 
    "value": "${name}"
  }
  ]`;
  try{
    const response = await fetch(url , {  
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
    const response = await fetch('https://shoppongau.at/api/1.1/obj/shop/' + shopId, {
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
      await AsyncStorage.setItem('token', JSON.stringify(token));
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