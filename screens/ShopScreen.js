import React ,{Component} from 'react';
import {ActivityIndicator ,StyleSheet, View , FlatList,Platform, StatusBar } from 'react-native';
import {Container, Header, Content, Item, Input, Icon} from 'native-base';
import Bubble from '../api/Bubble';
import { Font } from 'expo';
import ShopItem from '../components/ShopItem';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';


export default class ShopScreen extends Component {   

state = {shops:[], isLoading: true}

static navigationOptions = {
    header: null,
};

/******************************logic***************************/

_fetchShops = async ()=>{
  let responseJson = await Bubble._getShops();
  // state als funktion weil es asyn ist
  this.setState({shops: responseJson.response.shops, isLoading:false});
}

_refresh = ()=> {
    this.setState({isLoading:true});
    this._fetchShops();
}

componentDidMount(){ 
    //lade daten bei tabwechsel
    this.props.navigation.addListener('willFocus', (playload)=>{ 
        this._fetchShops();
      });
      this._fetchShops();
      Font.loadAsync({
        'Caviar': require('../assets/fonts/CaviarDreams.ttf'),
      });
}

/******************************UI***************************/
    render() {
        if(this.state.isLoading){
           return(
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color='#0693E3'/>
                </View>  
           )
        };
      return (
       <Container style={styles.container}> 
        <Header style={styles.header} searchBar rounded>
        <StatusBar
            barStyle="light-content"
            backgroundColor="#0693E3"
          />
          <Item style={styles.headerItem} >
            <Icon name="ios-search" />
            <Input placeholder="Shops durchsuchen" />
          </Item>
          <MaterialIcons name="filter-list" size={32} style={styles.filter} />
         </Header>
        
          <Content> 
            <FlatList contentContainerStyle={styles.content}
                data={this.state.shops}
                // Key für die list. Momentan name 
                keyExtractor = {item => item._id}  
                horizontal={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                <ShopItem
                  onPress={()=> this.props.navigation.navigate('ShopDetail', {shop: item})} shop={item}>
                </ShopItem>
                )}
                onRefresh={this._refresh} 
                refreshing={this.state.isLoading}
              />
          
          </Content>
        </Container>
      );
    }
  }

  /******************************Styles***************************/
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      backgroundColor: '#F5F5F5',
      ...Platform.select({
        android: {
            marginTop: StatusBar.currentHeight
        }
    }) 
    },
    content: {
      alignItems: 'center',
      justifyContent:'space-around',
      marginTop:10
      
    },
    listEmpty:{
        fontSize: 18,
        paddingTop: 100,
        textAlign: 'center'
    },
    card:{
      width: 180,
      height: 300,
      marginLeft:10,
      marginRight:10 
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerItem:{
      position:'absolute',
      bottom: 10,
      left: 10,
      width: '85%',
      height:40,
      backgroundColor:'white',
      marginRight: 10
    },
    header:{
      height:50,
      flexDirection: 'row', 
      backgroundColor:'white', 
      alignItems:'flex-end',
      justifyContent: 'space-around',
      paddingBottom: 60,
      backgroundColor:'#0693E3',
    },
    filter:{
      color:'white', 
      position:'absolute', 
      right: 15, 
      bottom: Platform.OS === 'ios' ? 12 : 15
    },
    
    
  });