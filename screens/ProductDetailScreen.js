import React ,{Component} from 'react';
import {Dimensions,Image, ScrollView, StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import {Body, Thumbnail, Card, CardItem, Left, Right, Icon, Button } from 'native-base';
import Bubble from '../api/Bubble';
import Price from '../components/Price';
import { MapView } from 'expo';


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
    console.log(shop);
    this.setState({shop, address: shop.Address});
    uri = 'https:' + shop.Logo;
    this.setState({logo: uri}); 
    let isLoading = false;
    this.setState({isLoading});
}

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
                <Price size={19} product={this.state.product}></Price>
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
                  <Button style={{width:65, justifyContent:'space-between'}} iconLeft transparent>
                    <Icon style={{color:'grey'}} name='heart' />
                    <Text>Merken</Text>
                  </Button>
                </Right>
           </CardItem>
           <View style={{marginTop:20}}>
           <MapView
        style={{
          height:300,
          width:'90%',
          alignSelf: 'center'
        }}
        initialRegion={{
          latitude: this.state.address.lat,
          longitude: this.state.address.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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