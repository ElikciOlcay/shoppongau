import React ,{Component} from 'react';
import {Text} from 'react-native';
import {Icon, Button } from 'native-base';

export default class FavoriteButton extends Component{
    render(){
        if(this.props.favorite){
        return(
            <Button style={{width:80, justifyContent:'space-around', alignItems:'center'}} 
                iconLeft transparent onPress={this.props.onPress}>
                <Icon style={{color:'red'}} name='star' />
                <Text>Gemerkt</Text>
            </Button> 
        )}
        return(
            <Button style={{width:70, justifyContent:'space-around'}} 
                iconLeft transparent onPress={this.props.onPress}>
                <Icon style={{color:'lightgray'}} name='star' />
                <Text>Merken</Text>
            </Button> 
        )
    }
}




