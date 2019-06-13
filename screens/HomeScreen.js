import React ,{Component} from 'react';
import {ActivityIndicator ,StyleSheet, View , FlatList,Platform, StatusBar, Picker } from 'react-native';
import {Container, Header, Content, Item, Input, Icon, Text, Grid, Col } from 'native-base';
import ProductItem from '../components/ProductItem';
import Bubble from '../api/Bubble';
import { Font } from 'expo';
import {MaterialIcons } from '@expo/vector-icons';
import Dialog, { FadeAnimation, DialogContent,DialogTitle , DialogButton, DialogFooter} from 'react-native-popup-dialog';
import RadioGroup from 'react-native-radio-buttons-group';
import { Dropdown } from 'react-native-material-dropdown';

let radio_props = [
  {label: 'Standard', value: 1 },
  {label: 'Preis (höchster zuerst)', value: 2 },
  {label: 'Preis (niedrigster zuerst)', value: 3 },
];



export default class HomeScreen extends Component {   

state = {
  products:[], 
  isLoading: true, 
  dealer:{},
  modalVisible: false,
  filter: radio_props,
  selectedValue:1,
  searchValue:null,
  category:[],
}

static navigationOptions = {
    header: null,
};

//holder for search
arrayholder = [];

/******************************logic***************************/

setModalVisible(visible) {
  this.setState({modalVisible: visible});
}

searchFilter = text => {    
  const newData = this.arrayholder.filter(item => {      
    const itemData = `${item.title.toUpperCase()}`;
    const textData = text.toUpperCase();
      
     return itemData.indexOf(textData) > -1;    
  });    
  this.setState({ products: newData });  
};

_fetchProduct = async ()=>{
 let category = this.state.category;
 console.log(category);
 let responseJson = await Bubble._getProducts(this.state.selectedValue, category);
  // state als funktion weil es asyn ist
  this.arrayholder = responseJson.response.products;
  this.setState({products: responseJson.response.products, isLoading:false});
}

_fetchCategory = async()=>{
  let responseJson = await Bubble._getCategory();
  let category = [];
  for(let i=0; i<responseJson.length; i++ ){
    category.push(category[i].value);
 }
  this.setState({category});
  this._fetchProduct();
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
      this._fetchCategory();
      Font.loadAsync({
        'Caviar': require('../assets/fonts/Pacifico.ttf' ),
      });
}

_setFilter = (filter) => {
  this.setState({ filter });
  let selectedValue = this.state.filter.find(e => e.selected == true);
  let value = selectedValue.value;
  this.setState({selectedValue: value});
}

_fetchFilteredData = () => {
  this.setState({modalVisible:false});
  //wait until modal is closed
  setTimeout(() => {
    this.setState({isLoading:true});
    this._fetchProduct()}, 100) 
}

_setCategory = (text)=> {
  let selectedCategory = [];
  selectedCategory.push(text);
  this.setState({category: selectedCategory});
  this._fetchProduct();
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
        <Dialog
          width={250}
          visible={this.state.modalVisible}
          dialogTitle={<DialogTitle title="Sortieren nach" />}
          footer={
            <DialogFooter>
              <DialogButton
              textStyle={{color:'#0693E3'}}
              text="Anwenden"
              onPress={this._fetchFilteredData}
              />
              <DialogButton
              textStyle={{color:'red'}}
              text="Abbrechen"
              onPress={() => this.setState({modalVisible:false}) }
              />
            </DialogFooter>
          }
          onTouchOutside={() => {
            this.setState({ modalVisible: false });
          }}
          dialogAnimation={new FadeAnimation({
            slideFrom: 'top',
          })}
        >
          <DialogContent style={{marginTop:5}}>
          <View style={{marginBottom:5}}> 
            <Dropdown
              label='Kategorie'
              data={this.state.category}
              animationDuration={100}
              labelFontSize={16}
              onChangeText={this._setCategory}
            />
           </View>
          <RadioGroup style={{justifyContent:'space-around'}}
           radioButtons={this.state.filter}
           onPress={this._setFilter}
           />
          </DialogContent>
          
            
          
        </Dialog>
        <Header style={styles.header} searchBar rounded>
        <StatusBar
            barStyle="light-content"
            backgroundColor="#0693E3"
          />
        <Text style={styles.logo}>Shoppongau</Text> 
          <Item style={styles.headerItem}>
            <Icon name="ios-search" />
              <Input
              onChangeText={text => this.searchFilter(text)}
              placeholder="Shoppongau durchsuchen..." 
              />
          </Item>
          <MaterialIcons 
          name="filter-list" 
          size={32} 
          style={styles.filter}
          onPress={() => {
            this.setModalVisible(true);
          }}/>
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