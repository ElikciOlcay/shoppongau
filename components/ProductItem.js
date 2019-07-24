import React ,{Component} from 'react';
import {Image, StyleSheet,View,TouchableOpacity,Dimensions, Text} from 'react-native';
import { Card, CardItem, Body, Left} from 'native-base';
import Bubble from '../api/Bubble';
import Price from '../components/Price';
import { LinearGradient } from 'expo'

export default class ProductItem extends Component{

    state = {
        dealerId: this.props.product.shop,
        shop:'',
        shopName:'', 
        product:'',
        image:'',
        uri: '',
        isLoading: true,
        isAngebot: false,
        colors: [],
    };
    

    componentDidMount(){
        this.setState({product: this.props.product});
        this._getDealer();
        this._getIsAngebot();
    }

    _getIsAngebot(){
        let angebot = this.props.product.angebot;
        if(angebot){
            this.setState({isAngebot:true});
            this._getGradientColor();
        }
    }
 
    _getDealer = async()=>{
        try{
            shop = await Bubble._getShop(this.state.dealerId);
            this.setState({shopName: shop.response.name});
            this.setState({image: this.state.product.images[0]});
        }
        catch(e){
            console.log(e);
        }
        this._createImageUri();
    } 

    _createImageUri(){
        uri = 'https:' + this.state.image;
        this.setState({uri});
        this.setState({isLoading:false});
    }  
      
   _getGradientColor = async ()=> {
       let responseJson = await Bubble._getGradientColor(this.props.product.Angebot_Color);
       let colors = [];
       colors = responseJson.response.color.code;
       this.setState({colors});
    }

    render(){
        const{product, onPress} = this.props;
        const{shopName} = this.state;
        const{uri} = this.state;
        if(this.state.isLoading){
           return(
            <View></View>  
           )
        }
        if(!this.state.isAngebot){
            return(  
                <TouchableOpacity onPress={this.props.onPress}> 
                     <Card transparent style={styles.card}>
                        <CardItem cardBody>
                            <Image source={{uri: uri}} resizeMode='cover' style={{height: 250, width: null, flex: 1}}/>
                        </CardItem> 
                        <CardItem footer style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'space-between'}}>
                            <Text style={{color: 'black', marginBottom:5}}>{product.title}</Text>
                            <Price size={18} marginRight={0} product={product}></Price>
                        </CardItem>
                    </Card>
                </TouchableOpacity> 
                );
        }else{
            return(
                <View>
                    <LinearGradient colors={this.state.colors} style={styles.gardientCard}>
                        <Text style={styles.angebotText}>{product.Angebot_Text}</Text>
                    </LinearGradient>
                </View>
               )
        }
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
    gardientCard: {
        width: cardWidth,
        height:300,
        marginLeft: 5,
        marginRight:5,
    },
    angebotText:{
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    }
    
    
}); 



    
    
    
