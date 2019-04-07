import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import Tab1 from '../components/Tabs/tabOne';
import Tab2 from '../components/Tabs//tabTwo';

export default class TabsAdvancedExample extends Component {

  static navigationOptions = {
    title: 'Meine Favoriten',
  };

  render() {
    return (
      <Container>
        <Header hasTabs/>
        <Tabs>
          <Tab heading="Produkte">
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading><Text>No Icon</Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="apps" /></TabHeading>}>
            <Tab2 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}