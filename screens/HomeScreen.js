import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      locality: '',
      isLoading: false,
      errorMessage: '',
    }
  }
  static navigationOptions = {
    title: 'Property Finder',
    headerTitleStyle: {
      fontWeight: 'bold',
      width: Dimensions.get('window').width,
    },
  };

  onChange = (event) => {
    this.setState({
      locality: event.nativeEvent.text,
    });
  };

  onSubmit = () => {
    const { locality } = this.state;
    const query = `country=uk&pretty=1&encoding=json&listing_type=buy&action=search_listings&place_name=${locality}`;
    const url = `https://api.nestoria.co.uk/api?${query}`;

    this.setState({
      isLoading: true,
    });

    fetch(url).then(response => response.json()).then(json => {
      this.setState({
        isLoading: false,
        errorMessage: '',
      });
      if(json.response.application_response_code.substr(0,1)==='1'){
        this.props.navigation.navigate('Results',{res:json.response.listings});
      }else{
        this.setState({errorMessage: 'Location not recognized; please try again.'});
      }
    }).catch(error => {
      this.setState({
        isLoading: false,
        errorMessage: 'Something bad happened ' + error,
      })
    });
  };

 render() {
   const { locality, isLoading, errorMessage} = this.state;

   return (
       <View style={styles.container}>
         <Text style={styles.description}>
           Search for houses to buy!
         </Text>
         <Text style={styles.description}>
           Search by place-name or postcode.
         </Text>
         <View style={styles.flowRight}>
           <TextInput
               underlineColorAndroid={'transparent'}
               style={styles.searchInput}
               placeholder='Search via name or postcode'
               value={locality}
               onChange={this.onChange}
           />
           <Button
               onPress={() => {this.onSubmit()}}
               color='#48BBEC'
               title='Go'
           />
         </View>
         <Image source={require('../Resources/house.png')} style={styles.image}/>
         {isLoading && <ActivityIndicator size="large" />}
         {errorMessage !== '' && <Text style={styles.description}>{errorMessage}</Text>}
       </View>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginBottom: 10,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    margin: 10,
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  image: {
    width: 217,
    height: 138,
  },
});

export default HomeScreen;
