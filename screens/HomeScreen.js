import React ,{Component} from 'react';
import {ActivityIndicator ,StyleSheet, View , FlatList,Platform, StatusBar, } from 'react-native';
import {Body, Container, Header, Content, Title, Item, Input, Icon } from 'native-base';
import ProductItem from '../components/ProductItem';
import Bubble from '../api/Bubble';
import Expo from 'expo';

export default class HomeScreen extends Component {   

state = {products:[], isLoading: true, dealer:{}}

static navigationOptions = {
    header: null,
};

/******************************logic***************************/

_fetchProduct = async ()=>{
  let responseJson = await Bubble._getProducts();
  // state als funktion weil es asyn ist
  this.setState({products: responseJson.response.products, isLoading:false});
}

_refresh = ()=> {
    this.setState({isLoading:true});
    this._fetchProduct();
}

componentDidMount(){ 
    //lade daten bei tabwechsel
    this.props.navigation.addListener('willFocus', (playload)=>{ 
        this._fetchProduct();
      });
      this._fetchProduct();
}

/******************************UI***************************/
    render() {
        if(this.state.isLoading){
           return(
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color='#50A1AA'/>
                </View>  
           )
        };
      return (
        <Container style={styles.container}> 
          <Header searchBar rounded style={styles.header}>
            <Item style={styles.headerItem}>
              <Icon name="ios-search" />
            <Input placeholder="Shoppongau durchsuchen" placeholderTextColor='gray' style={{fontSize:16}} /> 
          </Item>
          </Header> 
          
          <Content> 
            <FlatList contentContainerStyle={styles.content}
                data={this.state.products}
                // Key für die list. Momentan name 
                keyExtractor = {item => item._id}  
                horizontal={false}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
              <ProductItem style={{marginRight:10}}
                onPress={()=> this.props.navigation.navigate('Detail', {product: item})} product={item}>
              </ProductItem>
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
      ...Platform.select({ 
          android: {
              marginTop: StatusBar.currentHeight
          }
      }),
    },
    content: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 10
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
      height:40,
      top: Platform.OS === 'ios' ? 30 : 10,
      width: '95%', 
      backgroundColor:'#F0EFEF'
    },
    header:{
      height:Platform.OS === 'ios' ? 80 : 60,
      flexDirection: 'column', 
      backgroundColor:'white', 
      alignItems:'center'}
    
  });