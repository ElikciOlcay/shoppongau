import React ,{Component} from 'react';
import {Image, StyleSheet,View,TouchableOpacity} from 'react-native';
import { Card, CardItem, Text, Body, Left, Right, Thumbnail} from 'native-base';
import Bubble from '../api/Bubble';
import Price from '../components/Price';

export default class ProductItem extends Component{

    state = {
        dealerId: this.props.product["Created By"],
        shop:{}, 
        logo:null,
    };

 
    _getDealer = async()=>{
        dealer = await Bubble._getDealer(this.state.dealerId);
        shopId = dealer.response.Shop;
        shop = await Bubble._getShop(shopId);
        this.setState({shop: shop.response});
        this._createLogoUri();
    }

    _createLogoUri(){
        uri = 'https:' + this.state.shop.Logo;
        this.setState({logo: uri});
    }  
      
    componentDidMount(){
        this._getDealer();
    }

    render(){

        const{product, onPress} = this.props;
        const{shop} = this.state;
        
        

        return(
            <TouchableOpacity onPress={onPress}> 
                <Card transparent style={styles.card}>
                    <CardItem>
                        <Left>
                            <Thumbnail style={{height:35, width:35}} source={{uri: this.state.logo}} />
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
                        <Text style={{color: '#686868'}}>{product.title}</Text>
                        <Price size={16} product={product}></Price>
                    </CardItem>
                </Card>
            </TouchableOpacity>
             
        );  
    }
    }
  



const styles = StyleSheet.create({
    card: {
        width: 180,
        marginLeft:5,
        marginRight:5 
}, 
    
    
}); 



    
    
    
