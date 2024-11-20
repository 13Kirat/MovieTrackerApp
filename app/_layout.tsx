import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MyListScreen from '../screens/MyListScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Movie List" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{ title: 'Details' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function MyListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyList" component={MyListScreen} options={{ title: 'My List', headerShown:false }}  />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}

export default function RootLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
             iconName = focused ? 'home' : 'home-outline'; 
            } else if (route.name === 'My List') {
               iconName = focused ? 'list' : 'list-outline'; 
              } else if (route.name === 'Profile') {
                 iconName = focused ? 'person' : 'person-outline'; 
                }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown:false,
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="My List" component={MyListStack} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} /> */}
    </Tab.Navigator>
  );
}
