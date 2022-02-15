import React, {useEffect} from 'react';
import {Text, View, StyleSheet, BackHandler, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Post from './Posts/Post';
import Posts from './Posts/Posts';

const Stack = createNativeStackNavigator();

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
  uri: 'https://english.factcrescendo.com/graphql',
});

function App() {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Posts} />
          <Stack.Screen name="Post" component={Post} />
        </Stack.Navigator>
      </ApolloProvider>
    </NavigationContainer>
  );
}

export default App;
