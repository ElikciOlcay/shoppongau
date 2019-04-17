import React ,{Component} from 'react';
import {Col, Content, Grid } from 'native-base';
import {StyleSheet , FlatList, ActivityIndicator, View} from 'react-native';
import ProductItem from '../../components/ProductItem';
import Bubble from '../../api/Bubble';

export default class TabShop extends Component{

  constructor(props){
    super(props);
    this.state = {
      products:[],
      shopId: props.shop._id,
      isLoading: true
    } 
  }

  
  static navigationOptions = {
    header: null
};


_fetchProduct = async ()=>{
  let responseJson = await Bubble._getProductsFromShop(this.state.shopId);
  // state als funktion weil es asyn ist
  this.setState({products: responseJson.response.products, isLoading:false});
}

componentDidMount(){
 this._fetchProduct();
 }

    render(){
      if(this.state.isLoading){
        return(
          <View style={styles.loading}>
              <ActivityIndicator size='large' color='#50A1AA'/>
          </View>  
        )
      }
      return(
          
          <Content style={{backgroundColor: '#F5F5F5'}}>
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
              onPress={()=> this.props.props.navigation.navigate('ProductDetail', {product: item})} product={item}>
            </ProductItem>
              )}
              onRefresh={this._refresh} 
              refreshing={this.state.isLoading}
            />
            </Col>
            </Grid>
        </Content>
      )
    }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
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
})