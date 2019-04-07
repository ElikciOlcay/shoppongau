import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Body, Text } from 'native-base';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import { MapView } from 'expo';

export default class AnatomyExample extends Component {


  
  static navigationOptions = {
    header: null,
};

render() {
    return (
      <Text></Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
          flex: 1,
          ...Platform.select({
              android: {
                  marginTop: StatusBar.currentHeight
              }
          })

      }
})