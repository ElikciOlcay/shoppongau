import React ,{Component} from 'react';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import FavororiteScreen from '../screens/FavororiteScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductItem from '../components/ProductItem'
import {Icon} from 'expo';
//React Navigation npm install react-navigation


const HomeStack = createStackNavigator({
        Home: HomeScreen,
        Detail:ProductDetailScreen,
        ProductItem: ProductItem
        
    },
    {
        defaultNavigationOptions:{
            headerStyle: {
                backgroundColor: 'white',
            },
        }
    }
)


const tabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack, 
        navigationOptions: { 
            title: 'Entdecken',
            tabBarIcon:({tintColor}) => (
                <Icon.Entypo name="price-tag" size={24} color={tintColor}/>
            )
        }},
    Shops: {
        screen:createStackNavigator({Shops: ShopScreen}),
        navigationOptions:{ 
            title: 'Shops',
            tabBarIcon:({tintColor}) => (
                <Icon.Entypo name="shop" size={24} color={tintColor}/>
            ),
        }},
    Favorites: {
        screen: createStackNavigator({Favorites: FavororiteScreen}),  
        navigationOptions:{ 
            title: 'Favoriten', 
            tabBarIcon:({tintColor}) => ( 
                <Icon.MaterialIcons name="favorite" size={24} color={tintColor}/>
            )
        }}, 
    }, 
    {
        tabBarOptions: {
            activeTintColor: '#50A1AA',
            style:{ 
                backgroundColor: 'white',
            },
            animationEnabled: true
        }
    } 
);



export default createAppContainer(tabNavigator)


