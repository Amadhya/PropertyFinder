import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from 'react-native';

class PropertyScreen extends Component{
  constructor(props){
    super(props);
  }
  static navigationOptions = {
    title: 'Results',
    headerTitleStyle: {
      fontWeight: 'bold',
      width: Dimensions.get('window').width,
    },
  };

  _onPress = (info) => {
    this.props.navigation.navigate('Details',{info: info});
  };

  render(){
    const { params: { res }} = this.props.navigation.state;
    return(
        <ScrollView>
          {res.map(obj => (
              <TouchableOpacity onPress={() => this._onPress(obj)} key={obj.img_url}>
                <View>
                  <View style={styles.rowContainer}>
                    <Image style={styles.thumb} source={{ uri: obj.img_url }} />
                    <View style={styles.textContainer}>
                      <Text style={styles.price}>{obj.price}</Text>
                      <Text style={styles.title}
                            numberOfLines={1}>{obj.title}</Text>
                    </View>
                  </View>
                  <View style={styles.separator}/>
                </View>
              </TouchableOpacity>
          ))}
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    margin: 10,
    fontSize: 18,
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});

export default PropertyScreen;