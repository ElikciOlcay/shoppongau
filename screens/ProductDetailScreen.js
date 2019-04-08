import React ,{Component} from 'react';
import {Dimensions,Image, ScrollView, StyleSheet, Text, View,ActivityIndicator,AsyncStorage} from 'react-native';
import {Body, Thumbnail, Card, CardItem, Left, Right, Icon, Button } from 'native-base';
import Bubble from '../api/Bubble';
import Price from '../components/Price';
import { MapView } from 'expo';
import FavoriteButton from '../components/FavoriteButton';

export default class ProductDetailScreen extends Component {  
  
  constructor(props){
    super(props);
    this.state = {
      price: null,
      description: null,
      dealerId: this.props.navigation.getParam('product')["Created By"],
      shop:{},
      logo:null,
      product:null,
      isLoading: true,
      address:{},
      favorite:null
    };
  }

_isMounted = false;

static navigationOptions = ({ navigation }) => ({
  /*title: navigation.getParam('product').title,
  headerTitleStyle:{
    flex:1,
  },*/
});

_getProductInfo(){
 if(this._isMounted){
    setTimeout(()=>{
       const product = this.props.navigation.getParam('product');
       price = product.price;
       this._getShop();
       this.setState({price, product});
    },100)
  }
}

_getShop = async()=>{
    response = await Bubble._getShopByDealerId(this.state.dealerId);
    shop = response.response.shop;
    this.setState({shop, address: shop.Address});
    uri = 'https:' + shop.Logo;
    this.setState({logo: uri}); 
}

_addFavorite = async () => {
  if(!this.state.favorite){
    console.log('like');
    try {
      await AsyncStorage.setItem('favoriteItem', JSON.stringify(this.state.product._id));
      await this._getFavorite();
    } catch (error) {
      alert(error)
    } 
  }else if(this.state.favorite){
    console.log('unlike');
    try {
      console.log(this.state.product._id)
      await AsyncStorage.removeItem('favoriteItem', JSON.stringify(this.state.product._id));
      await this._getFavorite();
    } catch (error) {
      alert(error)
    } 
  }
}

_getFavorite = async () => {
  try {
  favorite = await AsyncStorage.getItem('favoriteItem') || 'none';
  console.log(favorite);
  console.log(JSON.stringify(this.state.product._id));
  if (favorite !== null && favorite === JSON.stringify(this.state.product._id)) {
    console.log(true);
    this.setState({favorite:true});
  }
  else{
    this.setState({favorite:false});
  }
  } catch (error) {
      // Error retrieving data
  }
  let isLoading = false;
  this.setState({isLoading});
};

componentDidMount(){
  this._isMounted = true;
  if(this._isMounted){
    this._getProductInfo();
    this._getFavorite();
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
                <Price size={19} marginRight={5} product={this.state.product}></Price>
              </Right>
            </CardItem> 
            <CardItem>
              <Left>
                <Text style={{fontSize:18, fontWeight:'300', color:'#3D3D3D'}}>{this.state.product.description}</Text>
              </Left>
            </CardItem>
            <CardItem>
                <Left>
                    <Thumbnail style={{height:35, width:35}} source={{uri: this.state.logo}} />
                    <Body>
                        <Text>{this.state.shop.Name}</Text>
                        <Text style={{fontSize: 12}}>{this.state.shop.City}</Text>
                    </Body>
                </Left> 
                <Right>
                  <FavoriteButton 
                  favorite={this.state.favorite} 
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
    }
  });