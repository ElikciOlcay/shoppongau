import React ,{Component} from 'react';
import {Image, StyleSheet,View,Text} from 'react-native';

export default class Price extends Component{

    state = {price:null, reducedPrice:null, isReduced:false};

    _setPrice(){
        let isReduced = this.props.product.reduziert;
        let price = this.props.product.preis;
        let reducedPrice = this.props.product.reduced_price;
        this.setState({price});
        if(isReduced){
            this.setState({reducedPrice, isReduced});
        }
    }

    componentDidMount(){
        this._setPrice();
    }

render(){
    const{price, reducedPrice, isReduced} = this.state;
    if(isReduced){
        return(
            <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'flex-end', marginRight: this.props.marginRight}}>
                <Text style={{color:'#F14B4B',fontSize:this.props.size, textDecorationLine: 'line-through', marginRight:5}}>{price}€</Text>
                <Text style={ {fontWeight:'500', fontSize:this.props.size, color:'#4caf50', marginLeft:2}}>{reducedPrice}€</Text>
            </View>
        )
    }else if(!isReduced){
        return(
            <View style={{alignSelf:'flex-end'}}>
             <Text style={{color:'#4caf50', fontWeight:'500',fontSize:this.props.size}}>{price}€</Text>
            </View>
            
        )
    }
        
    }
    
}
