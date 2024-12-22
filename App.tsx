import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { Image } from 'react-native';

import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import DetailsScreen from './DetailsScreen';

// Define the route parameters for type safety
type RouteParams = {
  Home: undefined; // No parameters expected for the Home screen
  Search: undefined; // No parameters expected for the Search screen
  Details: {
    movie: {
      name: string;
      image?: { original: string };
      language?: string;
      genres?: string[];
      premiered?: string;
      summary?: string;
    };
  };
};

// Use the typed navigator
const Stack = createNativeStackNavigator<RouteParams>();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'red' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' }}
                style={{ width: 100, height: 30, resizeMode: 'contain' }}
              />
            ),
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: 'Search Movies',
            headerStyle: { backgroundColor: 'red' },
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({
            title: route.params?.movie?.name || 'Movie Details',
            headerStyle: { backgroundColor: 'red' },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
