import React ,{Component} from 'react';
import {ActivityIndicator ,StyleSheet, View , FlatList,Platform, StatusBar, } from 'react-native';
import {Container, Header, Content, Item, Input, Icon, Text, Grid, Col } from 'native-base';
import ProductItem from '../components/ProductItem';
import Bubble from '../api/Bubble';
import { Font } from 'expo';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';

export default class HomeScreen extends Component {   

state = {products:[], isLoading: true, dealer:{}}

static navigationOptions = {
    header: null
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
      Font.loadAsync({
        'Caviar': require('../assets/fonts/Pacifico.ttf' ),
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
        //<!--Text style={styles.logo}>Shoppongau</Text-->
      return (
        <Container style={styles.container}> 
        <Header style={styles.header} searchBar rounded>
        <StatusBar
            barStyle="light-content"
            backgroundColor="#0693E3"
          />
        <Text style={styles.logo}>Shoppongau</Text> 
          <Item style={styles.headerItem} >
            <Icon name="ios-search" />
            <Input placeholder="Shoppongau durchsuchen..." />
          </Item>
          <MaterialIcons name="filter-list" size={32} style={styles.filter} />
         </Header>
          <Content>
            <Grid>
          <Col style={{width:'100%', justifyContent:'space-around'}}>
            <FlatList contentContainerStyle={styles.content}
                data={this.state.products}
                // Key für die list. Momentan name 
                keyExtractor = {item => item._id}  
                horizontal={false}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
              <ProductItem 
                onPress={()=> this.props.navigation.navigate('Detail', {product: item})} product={item}>
              </ProductItem>
                )}
                onRefresh={this._refresh} 
                refreshing={this.state.isLoading}
              />
              </Col>
              </Grid>
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
    }) 
    },
    content: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 10,
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
      height:120,
      flexDirection: 'row', 
      backgroundColor:'#0693E3', 
      alignItems:'flex-end',
      justifyContent: 'space-around',
      paddingBottom: 70 
    },
    filter:{
      color:'white', 
      position:'absolute', 
      right: 15,
      bottom: Platform.OS === 'ios' ? 12 : 15
    },
    logo:{
      fontSize: 28,
      alignSelf:'center', 
      paddingBottom: Platform.OS === 'ios' ? 60 : 0,
      marginTop:15,
      marginBottom:Platform.OS === 'ios' ? 10 : 0,
      fontFamily: 'Caviar',
      color: 'white'
    },
    statusBarBackground: {
      height: (Platform.OS === 'ios') ? 22 : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
      backgroundColor: "transparent",
    }
    
  });