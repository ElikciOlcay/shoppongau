import React ,{Component} from 'react';
import {ActivityIndicator ,StyleSheet, View , FlatList,Platform, StatusBar, AsyncStorage, Dimensions, TouchableOpacity, Image } from 'react-native';
import {Container,Content, Header, Body, Title, Card, CardItem, Text, Right, Button, Icon} from 'native-base';
import {NavigationEvents} from 'react-navigation';
import Bubble from '../api/Bubble';
import { CheckBox } from 'react-native-elements'




export default class FavoritenScreen extends Component {

  static navigationOptions = {
    header: null,
};

  state = {
    isLoading:true, 
    favoritesFromDb:[],
    favoritesFromAsync: [],
    checked:[],
    isChecked:false
  };

  _getFavorite = async () => {
    let favoritesRaw;
    try{
      let favoritesRaw = await AsyncStorage.getItem('favorites')
      let favoritesFromAsync = JSON.parse(favoritesRaw);
      let favoritesFromDb = await Bubble._getFavorites(favoritesFromAsync);
      this.setState({favoritesFromDb: favoritesFromDb.response.product, favoritesFromAsync, isLoading:false});
    }catch(error){
      if(favoritesRaw === null){
        this.setState({favoritesFromDb: []})
      }
      console.log('error!')
    }
    this._showDeleteButton();
  };

  _deleteFavorite = async () => {
    this.setState({isLoading:true});
    const { favoritesFromAsync, checked } = this.state;
    for(let i = 0; i < checked.length; i++){
      let index = favoritesFromAsync.indexOf(checked[i])
      favoritesFromAsync.splice(index,1);
    }
    AsyncStorage.setItem('favorites', JSON.stringify(favoritesFromAsync))
      .then(json => console.log('success!'))
      .catch(error => console.log('error!'));
      checked.pop();
     this._getFavorite();
  }


  componentDidMount(){
    this._getFavorite();
  }

  _checkItem = item => {
    const { checked } = this.state;
    
    if (!checked.includes(item)) {
      checked.push(item);
      this.setState({checked})
    } else {
      let index = checked.indexOf(item)
      checked.splice(index,1);
      this.setState({checked});
    }
    this._showDeleteButton();
  };

  _showDeleteButton(){
    //console.log(this.state.checked)
    if(this.state.checked.length > 0){
      this.setState({isChecked:true})
    }else{
      this.setState({isChecked:false})
    }
  }

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
  <NavigationEvents onDidFocus={() => this._getFavorite()} />
  <Header style={styles.header}>
  <StatusBar
            barStyle="light-content"
            backgroundColor="#0693E3"
          />
    <Body>
      <Title style={{color:'white', alignSelf:'center'}}>Meine Merkliste</Title>
    </Body>
    <Right>
    {this.state.isChecked &&  
    <Button onPress={()=> this._deleteFavorite()} transparent><Icon style={{color:'white'}} name='trash'/></Button>
    }
    </Right>
  </Header>
    <Content>
      <FlatList contentContainerStyle={styles.content}
                data={this.state.favoritesFromDb}
                // Key für die list. Momentan name 
                extraData={this.state}
                keyExtractor = {item => item._id}  
                horizontal={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('ProductDetail', {product: item})}> 
                    <Card style={styles.card} transparent>
                            <CardItem style={{justifyContent:'space-between'}}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                <CheckBox
                                  center
                                  checkedIcon='dot-circle-o' 
                                  uncheckedIcon='circle-o'
                                  checked={this.state.checked.includes(item._id)}
                                  onPress={() => this._checkItem(item._id)}
                                  size={30}
                                />
                                </View>
                                <Image style={{width:60, height: 40, resizeMode:'contain'}} source={{uri: item.imageurl}}/>
                                <View style={{alignSelf:'center', width:'90%', marginLeft:10}}> 
                                    <Text style={{fontSize:16}}>{item.title}</Text>
                                </View>
                            </CardItem> 
                        </Card>
                </TouchableOpacity> 
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

  const {height, width} = Dimensions.get('window');
  const cardWidth =  width -20;

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
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    content: {
      alignItems: 'center',
      justifyContent:'space-around',
    },
    header:{
      height:60,
      backgroundColor:'#0693E3',
      marginBottom: 10,
    },
    card: {
      width: cardWidth,
      shadowColor: "#000",
   },
  });