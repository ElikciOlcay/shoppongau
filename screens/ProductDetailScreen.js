import React ,{Component} from 'react';
import {Dimensions,Image, ScrollView, StyleSheet, Text, View,ActivityIndicator,AsyncStorage, TouchableOpacity} from 'react-native';
import {Body, Thumbnail, Card, CardItem, Left, Right } from 'native-base';
import Bubble from '../api/Bubble';
import Price from '../components/Price';
import { MapView } from 'expo';
import FavoriteButton from '../components/FavoriteButton';

export default class ProductDetailScreen extends Component {  
  
  constructor(props){
    super(props);
    this._isMounted = false;
    this.state = {
      price: null,
      description: null,
      dealerId: this.props.navigation.getParam('product')["Created By"],
      shop:{},
      logo:null,
      product:null,
      isLoading: true,
      address:{},
      favorite:[],
      isFavorite:false
    };
  }



static navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('product').title,
  headerTitleStyle:{
    flex:1,
  },
}); 
 
_getProductInfo(){
 if(this._isMounted){ 
    setTimeout(()=>{
       const product = this.props.navigation.getParam('product');
       price = product.price;
       this._getShop();
       this._getFavorite();
       this.setState({price, product});
    },1000)
  }
}

_getShop = async()=>{
    response = await Bubble._getShopByDealerId(this.state.dealerId);
    //console.log(response);
    shop = response.response.shop;
    this.setState({shop, address: shop.Address});
    uri = 'https:' + shop.Logo;
    this.setState({logo: uri}); 
    let isLoading = false;
    this.setState({isLoading});
}

_addFavorite = async () => {
  const favorites = this.state.favorite;
  const currentProductId = this.state.product._id
  // wenn nicht vorhanden, dann hinzufuegen
  if(!this.state.isFavorite){
    favorites.push(currentProductId);
    AsyncStorage.setItem('favorites', JSON.stringify(favorites))
      .then(json => console.log('success!'))
      .catch(error => console.log('error!'));
    this.setState({isFavorite:true});
  // wenn vorhanden, dann löschen
  }else{
    let index = favorites.indexOf(currentProductId);
    if(index > -1){
      favorites.splice(index, 1);
    }
    AsyncStorage.setItem('favorites', JSON.stringify(favorites))
      .then(json => console.log('success!'))
      .catch(error => console.log('error!'));
      this.setState({isFavorite:false});
  }
}

_getFavorite = async () => {
  try{
    favoritesRaw = await AsyncStorage.getItem('favorites')
    favorites = JSON.parse(favoritesRaw);
    this.setState({favorite: favorites});
    if(this.state.favorite.includes(this.state.product._id)){
      this.setState({isFavorite:true})
      return true
    }
  }catch(error){
    if(favoritesRaw === null){
      this.setState({favorite: []})
    }
    console.log('error!')
  } 
};

componentDidMount(){
  this._isMounted = true;
  if(this._isMounted){
    this._getProductInfo();
  }
} 

componentWillUnmount(){   
  this._isMounted = false
} 
   
render() {
  if(this.state.isLoading){
    return(
      <View style={styles.loading}>
          <ActivityIndicator size='large' color='#50A1AA'/>
      </View>  
    )
  }
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Card transparent>
            <CardItem style={{justifyContent:'center'}}>
              <Image resizeMode='contain' source={{uri: this.state.product.imageurl}} style={styles.image}></Image>
            </CardItem>
            <CardItem style={{borderTopWidth:1, borderTopColor:'#EBEBEB', borderStyle:'solid'}}>
              <Left style={{flexDirection:'column'}}>
                <Text style={{fontSize:20, fontWeight:'500', color:'#3D3D3D'}}>{this.state.product.title}</Text>
              </Left>
              <Right style={{alignSelf:'flex-start'}}>
                <Price size={18} marginRight={5} product={this.state.product}></Price>
              </Right>
            </CardItem> 
            <CardItem>
              <Left>
                <Text style={{fontSize:18, fontWeight:'300', color:'#3D3D3D'}}>{this.state.product.description}</Text>
              </Left>
            </CardItem>
            <CardItem>
                <Left>
                  <TouchableOpacity onPress={()=> this.props.navigation.navigate('Shop', {shop: this.state.shop})} style={{flexDirection:'row'}}>
                    <Image style={{height:30, width:50, resizeMode:'contain'}}  source={{uri: this.state.logo}} />
                    <Body>
                        <Text>{this.state.shop.Name}</Text>
                        <Text style={{fontSize: 12}}>{this.state.shop.City}</Text>
                    </Body>
                  </TouchableOpacity>
                </Left> 
                <Right>
                  <FavoriteButton 
                  favorite={this.state.isFavorite} 
                  onPress={()=> this._addFavorite()}>
                  </FavoriteButton>
                </Right>
           </CardItem>
           <View style={{marginTop:20}}>
           <MapView
        style={{ 
          height:200,
          width:'90%',
          alignSelf: 'center'
        }}
        initialRegion={{
          latitude: this.state.address.lat,
          longitude: this.state.address.lng,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
          scrollEnabled: false  
        }}>
       
         <MapView.Marker
          coordinate={{
            "latitude":this.state.address.lat,
            "longitude":this.state.address.lng,
          }}
        />
      </MapView>
           </View>
          </Card>
        </ScrollView> 
      );
    } 
  }


//image width 
const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width; 

const styles = StyleSheet.create({ 
    container: {
      backgroundColor: '#fff',
    }, 
    image:{
      height: 300,
      width: imageWidth,
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
  });