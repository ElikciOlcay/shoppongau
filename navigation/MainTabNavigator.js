import React ,{Component} from 'react';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import FavororiteScreen from '../screens/FavororiteScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ShopDetailScreen from '../screens/ShopDetailScreen';
import ProductItem from '../components/ProductItem';
import TabShop from '../components/Tabs/TabShop';
import {Icon} from 'expo';
//React Navigation npm install react-navigation


const HomeStack = createStackNavigator({ 
        Home: HomeScreen,
        Detail:ProductDetailScreen,
        Shop:ShopDetailScreen   
        
    },
    {
        defaultNavigationOptions:{
            headerStyle: {
                backgroundColor: 'white',
            },
        }
    }
)

const ShopStack = createStackNavigator({
    Shops: ShopScreen,
    ShopDetail: ShopDetailScreen,
    ProductDetail: ProductDetailScreen
},
{
    initialRouteName: "Shops"
},
{ 
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: 'white',
        },
}
})




const tabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack, 
        navigationOptions: { 
            title: 'Entdecken',
            tabBarIcon:({tintColor}) => (
                <Icon.Entypo name="home" size={28} color={tintColor}/>
            )
        }},
    Shops: {
        screen:ShopStack,
        navigationOptions:{ 
            title: 'Shops',
            tabBarIcon:({tintColor}) => (
                <Icon.Entypo name="shop" size={28} color={tintColor}/>
            ),
        }},
    Favorites: {
        screen: createStackNavigator({Favorites: FavororiteScreen}),  
        navigationOptions:{ 
            title: 'Merkzettel', 
            tabBarIcon:({tintColor}) => ( 
                <Icon.MaterialIcons name="star" size={28} color={tintColor}/>
            ),
        }}, 
    }, 
    {
        tabBarOptions: {
            activeTintColor: '#0693E3',
            style:{ 
                backgroundColor: 'white',
                borderTopColor: '#E0E0E0',
                paddingTop:5
                //height:55,
            },
            animationEnabled: true
        }
    } 
);



export default createAppContainer(tabNavigator)


