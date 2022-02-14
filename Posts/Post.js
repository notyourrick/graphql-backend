import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import RenderHtml from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';

const Post = props => {
  const {width} = useWindowDimensions();

  if (!props.data.post) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
      <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, color: 'black'}}>
        {props.data.post.title}
      </Text>

      {/* <RenderHtml
        contentWidth={width}
        source={{html: props.data.post.content}}
        tagsStyles={{
          a: {color: 'green'},
        }}
      /> */}
      {/* <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          width: '100%',
          textAlign: 'left',
        }}>
        {props.data.post.content.replace(/<\/?[^>]+(>|$)/g, '')}
      </Text> */}

      {/* <HTMLView
        value={props.data.post.content}
        onLinkPress={url => console.log('clicked')}
      /> */}
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
