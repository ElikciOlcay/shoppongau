import React ,{Component} from 'react';
import {Text} from 'react-native';
import {Icon, Button } from 'native-base';

export default class FavoriteButton extends Component{
    render(){
        if(this.props.favorite){
        return(
            <Button style={{width:80, justifyContent:'space-between'}} 
                iconLeft transparent onPress={this.props.onPress}>
                <Icon style={{color:'red'}} name='heart' />
                <Text>Gemerkt</Text>
            </Button> 
        )}
        return(
            <Button style={{width:80, justifyContent:'space-between'}} 
                iconLeft transparent onPress={this.props.onPress}>
                <Icon style={{color:'lightgray'}} name='heart' />
                <Text>Merken</Text>
            </Button> 
        )
    }
}




