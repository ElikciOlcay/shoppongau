import React ,{Component} from 'react';
import {StyleSheet,View,TouchableOpacity, Dimensions, Image} from 'react-native';
import {Card, CardItem,Right, Icon, Text, Left, CheckBox} from 'native-base';


export default class FavoriteItem extends Component{

    render(){
        const{onPress, product} = this.props;
        return(  
            <TouchableOpacity onPress={onPress}> 
                <Card style={styles.container} transparent>
                    <CardItem style={{justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <CheckBox style={{marginRight:20}} checked={false} />
                            <Image style={{width:60, height: 40, resizeMode:'contain'}} source={{uri: product.imageurl}}></Image>
                        </View>
                        <View style={{alignSelf:'center', width:'90%', marginLeft:10}}> 
                            <Text style={{fontSize:18}}>{product.title}</Text>
                        </View>
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



    
    
    
