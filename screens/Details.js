import React, {Component} from 'react';
import {View, Text, Image, ScrollView, StyleSheet, Dimensions} from 'react-native';

class Details extends Component{
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    const { state: {params: {info: { title }}}} = navigation;
    return {
      title: title,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  render(){
    const { params: { info }} = this.props.navigation.state;

    return (
        <ScrollView>
          <Image style={styles.thumb(info.img_height)} source={{ uri: info.img_url }} />
          <Text style={styles.text}>Summary</Text>
          <Text style={styles.subText}>{info.summary}</Text>
          <View style={styles.separator}/>
          <Text style={styles.text}>Address</Text>
          <Text style={styles.subText}>{info.title}</Text>
          <View style={styles.separator}/>
          <Text style={styles.text}>Property type</Text>
          <Text style={styles.subText}>{info.property_type}</Text>
          <View style={styles.separator}/>
          <Text style={styles.text}>Accessories</Text>
          <Text style={styles.subText}>{info.keywords}</Text>
          <View style={styles.separator}/>
          <Text style={styles.text}>No. of bedrooms</Text>
          <Text style={styles.subText}>{info.bedroom_number}</Text>
          <View style={styles.separator}/>
          <Text style={styles.text}>Price</Text>
          <Text style={styles.subText}>{info.price_formatted}&nbsp;{info.price_type}</Text>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  thumb: function(height){
    return {
      width: Dimensions.get('window').width,
      height: height,
      marginRight: 10
    }
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  text: {
    color: '#656565',
    fontSize: 14,
    padding: 10,
  },
  subText: {
    fontSize: 16,
    padding: 10,
    paddingTop: 0,
  }
});

export default Details;