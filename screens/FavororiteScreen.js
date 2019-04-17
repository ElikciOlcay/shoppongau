import React ,{Component} from 'react';
import {ActivityIndicator ,StyleSheet, View , FlatList,Platform, StatusBar, Text } from 'react-native';
import {Container,Content, List, ListItem, Left, Thumbnail, Body, Right} from 'native-base';



export default class FavoritenScreen extends Component {

  static navigationOptions = {
    title: 'Mein Merkzettel',
    headerStyle: {
      backgroundColor: '#0693E3',
    },
    headerTitleStyle:{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20
    }
  }; 

  state = {isLoading:false};

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
    <StatusBar
      barStyle="light-content"
      backgroundColor="transparent"
    />

    <Content>
        <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'Image URL' }} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>Its time to build a difference . .</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>

    <Content> 
        
      
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
              marginTop: StatusBar.currentHeight + 12
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
    
  });