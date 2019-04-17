import React ,{Component} from 'react';
import {Dimensions, StyleSheet, View,ActivityIndicator,StatusBar} from 'react-native';
import { Container, Tab, Tabs, StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import Bubble from '../api/Bubble';

import TabShop from '../components/Tabs/TabShop';
import TabInfo from '../components/Tabs/TabShopInfo';

export default class ShopDetailScreen extends Component {  
  
  constructor(props){
    super(props);
    this._isMounted = false;
    this.state = {
      shop: {},
      logo:null, 
      isLoading: true,
      address:{},
      isFavorite:null
    };
  }

static navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('shop').Name,
  headerTitleStyle:{
    flex:1,
  },
});


_createLogoUri(){
  logo = 'https:' + this.state.shop.Logo;
  this.setState({logo});
  this.setState({isLoading:false});
} 


componentDidMount(){
  this._isMounted = true;
  if(this._isMounted){
    const shop = this.props.navigation.getParam('shop');
    const uri = shop.Logo;
    logo = 'https:' + this.state.shop.Logo;
    this.setState({shop, logo});
    this._createLogoUri();
  }
} 

componentWillUnmount(){   
 this._isMounted = false
} 
   
render() {
  if(this.state.isLoading){
    return(
      <View style={styles.loading}>
          <ActivityIndicator size='large' color='#50A1AA'/>
      </View>  
    )
  }
      return (
        <StyleProvider style={getTheme(material)}>
          <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <Tabs>
            <Tab heading="Shop">
              <TabShop props={this.props} shop={this.state.shop} />
            </Tab>
            <Tab heading="Info">
              <TabInfo props={this.props} shop={this.state.shop} />
            </Tab>
          </Tabs>
        </Container>
        </StyleProvider>
          
  
          
        
     
      );
    } 
  }


//image width 
const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width; 

const styles = StyleSheet.create({ 
    image:{
      height: 300,
      width: imageWidth,
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });