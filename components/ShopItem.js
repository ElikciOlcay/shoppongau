import React ,{Component} from 'react';
import {StyleSheet,View,TouchableOpacity, Dimensions, Image} from 'react-native';
import {Card, CardItem,Right, Icon, Text, Content} from 'native-base';
import Bubble from '../api/Bubble';


export default class ShopItem extends Component{

    state = {
        shop: this.props.shop,
        logo:'',
        isLoading: true
    };
    
    _createLogoUri(){
        uri = 'https:' + this.state.shop.Logo;
        this.setState({logo: uri});
        this.setState({isLoading:false})
    }  
      
    componentDidMount(){
        this._createLogoUri();
        
    }

    render(){
        const{onPress, shop} = this.props;
        if(this.state.isLoading){
           return(
            <View></View>  
           )
        }
        return(  
            <TouchableOpacity onPress={onPress}> 
                
                <Card style={styles.container} transparent>
                    <CardItem style={{justifyContent:'space-around'}}>
                    <Image style={{width:60, height: 40, resizeMode:'contain'}} source={{uri: this.state.logo}}></Image>
                    <View>
                        <Text style={{fontSize:20}}>{shop.Name}</Text>
                        <Text style={{fontWeight:'100'}}>{shop.City}</Text>
                    </View>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                    </CardItem> 
                </Card>
               
            </TouchableOpacity> 
            );
        }  
    }
    
  
const {height, width} = Dimensions.get('window');
const cardWidth =  width -20;
    
const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        shadowColor: "#000",
        

    },
}); 



    
    
    
