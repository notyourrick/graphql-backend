import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import HTML from 'react-native-renders-html';
import {IGNORED_TAGS} from 'react-native-renders-html/src/HTMLUtils';

const Post = props => {
  if (!props.data.post) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={{padding: 20}}>
      <Image
        source={{uri: props.data.post.featuredImage.node.sourceUrl}}
        resizeMode="cover"
        style={{
          width: '100%',
          height: 200,
          borderRadius: 15,
          marginBottom: 10,
        }}
      />
      <Text
        style={{
          fontFamily: 'Poppins-Bold',
          fontSize: 22,
          color: 'black',
          marginTop: 20,
        }}>
        {props.data.post.title}
      </Text>

      <HTML
        html={props.data.post.content}
        ignoredTags={[...IGNORED_TAGS, 'svg']}
        ignoredStyles={['display', 'width', 'height', 'font-family', 'padding']}
        tagsStyles={{
          a: {
            color: 'red',
          },
          p: {
            fontFamily: 'Poppins-Regular',
            lineHeight: 30,
            fontSize: 16,
          },
          img: {
            marginBottom: 30,
            marginTop: 20,
          },
          iframe: {
            marginTop: 20,
            marginBottom: 20,
          },
        }}
      />
    </ScrollView>
  );
};

const getPostById = gql`
  query getPostbyId($id: ID!) {
    post(id: $id) {
      title
      content
      featuredImage {
        node {
          sourceUrl(size: MEDIUM)
        }
      }
    }
  }
`;

export default graphql(getPostById, {
  options: props => {
    const id = props.route.params.id;

    return {
      variables: {
        id,
      },
    };
  },
})(Post);
