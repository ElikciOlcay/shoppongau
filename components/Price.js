import React ,{Component} from 'react';
import {Image, StyleSheet,View,Text} from 'react-native';

export default class Price extends Component{

    state = {price:null, reducedPrice:null, isReduced:false};

    _setPrice(){
        let isReduced = this.props.product.reduziert;
        let price = this.props.product.price;
        let reducedPrice = this.props.product.reduzierter_preis;
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
            <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'flex-end', width: '80%', marginRight: this.props.marginRight}}>
                <Text style={{color:'#F14B4B',fontSize:this.props.size, textDecorationLine: 'line-through'}}>€{price}</Text>
                <Text style={ {fontWeight:'500', fontSize:this.props.size, color:'#00D084'}}>€{reducedPrice}</Text>
            </View>
        )
    }else if(!isReduced){
        return(
            <View style={{alignSelf:'flex-end'}}>
             <Text style={{color:'#00D084', fontWeight:'500',fontSize:this.props.size}}>€{price}</Text>
            </View>
            
        )
    }
        
    }
    
}
