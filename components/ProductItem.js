import React ,{Component} from 'react';
import {Image, StyleSheet,View,TouchableOpacity,Dimensions} from 'react-native';
import { Card, CardItem, Text, Body, Left, Thumbnail} from 'native-base';
import Bubble from '../api/Bubble';
import Price from '../components/Price';

export default class ProductItem extends Component{

    state = {
        dealerId: this.props.product.shop,
        shop:{}, 
        logo:'',
        isLoading: true
    };

 
    _getDealer = async()=>{
        shop = await Bubble._getShop(this.state.dealerId);
        this.setState({shop: shop.response});
        this._createLogoUri();
        this.setState({logo: uri, isLoading:false});
    }

    _createLogoUri(){
        uri = 'https:' + this.state.shop.Logo;
    }  
      
    componentDidMount(){
        this._getDealer();
    }

    render(){
        const{product, onPress} = this.props;
        const{shop} = this.state;
        if(this.state.isLoading){
           return(
            <View></View>  
           )
        }
        return(  
            <TouchableOpacity onPress={this.props.onPress}> 
                 <Card transparent style={styles.card}>
                    <CardItem>
                        <Left>
                            <Image style={{height:30, width:50, resizeMode:'contain'}} source={{uri: this.state.logo}} />
                            <Body>
                                <Text>{shop.Name}</Text>
                                <Text style={{fontSize: 12}}>{shop.City}</Text>
                            </Body>
                        </Left> 
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{uri: product.imageurl}} resizeMode='center' style={{height: 150, width: null, flex: 1}}/>
                    </CardItem> 
                    <CardItem footer style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'space-between'}}>
                        <Text style={{color: 'black', marginBottom:5}}>{product.title}</Text>
                        <Price size={16} marginRight={0} product={product}></Price>
                    </CardItem>
                </Card>
            </TouchableOpacity> 
            );
        }  
    }
    
  

const {height, width} = Dimensions.get('window');
const cardWidth = (width -30) /2;

const styles = StyleSheet.create({
    card: {
        width: cardWidth,
        marginLeft: 5,
        marginRight:5,
        
},  
    
    
}); 



    
    
    
