import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; 


class HomeScreen extends React.Component {

  constructor(props){
    super(props);

    this.state ={
      email: '',
      password: ''
    }
  }
  static navigationOptions = {
      title: 'Login',
  };
  render() {
    return (
      <View style={ styles.container }>
        <Text style={{fontSize:20}}>Login</Text>

        <TextInput placeholder='Username' style={ styles.input } onChangeText={username => this.setState({username})}/>
        <TextInput placeholder='Password' style={ styles.input} onChangeText={userPassword => this.setState({userPassword})}/>

        <TouchableOpacity
          style={{width:'80%',padding:10,backgroundColor:'blue',alignItems:'center', marginBottom:10, borderRadius:20}}
          onPress={() => this.props.navigation.navigate('Details')}
        >
        <Text style={{color:'white'}}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{width:'80%',padding:10,backgroundColor:'blue',alignItems:'center', borderRadius:20}}
          onPress={() => this.props.navigation.navigate('Register')}
        >
        <Text style={{color:'white'}}>Register</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

class RegisterScreen extends React.Component {

  static navigationOptions ={
    title: 'Register'
  }

  render(){

    return(
      <View style={ styles.container }>
        <Text style={{fontSize:20}}>Register</Text>

        <TextInput placeholder='Username' style={ styles.input }/>
        <TextInput placeholder='Email' style={ styles.input }/>
        <TextInput placeholder='Password' style={ styles.input}/>

        

        <TouchableOpacity
          style={{width:'80%',padding:10,backgroundColor:'blue',alignItems:'center', borderRadius:20}}
          onPress={() => this.props.navigation.navigate('Details')}
        >
        <Text style={{color:'white'}}>Register</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

class DetailsScreen extends React.Component {

  static navigationOptions ={
    title: 'Dashboard'
  }
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.textStyle }>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Register: {
      screen: RegisterScreen
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  inputContainer: {
    padding: 12
  },

  textStyle: {
    color: 'red'
  },

  input: {
    width: '80%',
    padding: 12,
    borderColor: 'red',
    marginBottom: 10
  }
});