import React ,{Component} from 'react';
import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { Container, Content, Card, CardItem, Text} from 'native-base';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Communications from 'react-native-communications';
import { MapView } from 'expo';

export default class TabShopInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
          logo:null,
          isLoading: true,
          shop: this.props.shop,
          street: null,
          city: null,
          phone:this.props.shop.Phone,
          address: this.props.shop.Address,
          oeffnung: this.props.shop.oeffnung
        } 
      }

componentDidMount(){
    uri = 'https:' + this.props.shop.Logo
    console.log(this.props.shop);
    this._setAddress();
    this.setState({logo:uri, isLoading:false})
}

_setAddress(){
    let addressArray = this.state.shop.Address.address.split(',');
    let street = addressArray[0].trim();
    let city = addressArray[1].trim();
    this.setState({street, city});
}
    
render(){
        if(this.state.isLoading){
            return(
                <Container></Container>
            )
        }
        return(
            <Content style={{backgroundColor: '#F5F5F5'}}>
            <MapView
              style={{ 
                height:200,
                width:'100%',
                alignSelf: 'center'
              }}
              initialRegion={{
                latitude: this.state.address.lat,
                longitude: this.state.address.lng,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
                scrollEnabled: false  
              }}>
            
              <MapView.Marker
                coordinate={{
                  "latitude":this.state.address.lat,
                  "longitude":this.state.address.lng,
                }}
              />
            </MapView>
                
              <Card transparent>
              <CardItem style={{flexDirection:'row'}}>
                    <View style={{paddingBottom:20}}>
                      <Entypo name="home" size={32} color="#A1A1A1" />
                    </View>
                    <View style={styles.view}>
                      <Text style={{fontWeight:'bold'}}>{this.state.shop.Name}</Text>
                    </View> 
                </CardItem>
                <CardItem style={{flexDirection:'row'}}>
                    <View style={{paddingBottom:20}}>
                      <Entypo name="location-pin" size={32} color="#A1A1A1" />
                    </View>
                    <View style={styles.view}>
                      <Text>{this.state.street}</Text>
                      <Text>{this.state.city}</Text>
                    </View> 
                </CardItem>
                <CardItem style={{flexDirection:'row'}}>
                    <View style={{paddingBottom:20}}>
                      <Entypo name="phone" size={32} color="#A1A1A1" />
                    </View>
                    <TouchableOpacity style={styles.view} onPress={() => Communications.phonecall( this.state.phone , false)}>
                      <View>
                        <Text>{this.state.phone}</Text>
                      </View>
                    </TouchableOpacity>
                </CardItem>
                <CardItem style={{flexDirection:'row'}}>
                    <View>
                      <Entypo name="clock" size={32} color="#A1A1A1" />
                    </View>
                    <View style={{alignSelf:'center', marginLeft:30}}>
                      <FlatList
                      data={this.state.oeffnung}
                      // Key für die list. Momentan name
                      keyExtractor = {item => item}  
                      renderItem={({item}) => (
                        <Text style={{fontWeight:'bold'}}>{item}</Text>
                        )}>
                      </FlatList>
                    </View>   
                </CardItem>
            </Card>
            </Content>
        
        )
    }
}

const styles = StyleSheet.create({
  view:{
    alignSelf:'center',
    marginLeft:30,
    paddingBottom:20,
    borderBottomColor:'#CECECE',
    borderBottomWidth:0.3,
    width:'90%'}
  })