import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const Posts = ({navigation}) => {
  return (
    <Query
      query={gql`
        {
          posts {
            edges {
              node {
                title
                slug
                id
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      `}>
      {({loading, error, data}) => {
        if (loading) {
          return (
            <View>
              <Text>Loading...</Text>
            </View>
          );
        }

        console.log(data);

        return (
          <ScrollView style={styles.container}>
            {data.posts.edges.map((post, key) => {
              return (
                <View style={{paddingBottom: 20}} key={key}>
                  <Image
                    source={{uri: post.node.featuredImage.node.sourceUrl}}
                    resizeMode="cover"
                    style={{
                      width: '100%',
                      height: 200,
                      borderRadius: 15,
                      marginBottom: 10,
                    }}
                  />
                  <Text style={{fontFamily: 'Poppins-Bold'}}>
                    {post.node.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Post', {id: post.node.id})
                    }>
                    <Text style={{fontFamily: 'Poppins-Regular'}}>
                      Read More...
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        );
      }}
    </Query>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
