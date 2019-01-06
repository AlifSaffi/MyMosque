import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; 


// Login Page

class HomeScreen extends React.Component {

  constructor(props){
    super(props);

    this.state ={
      userEmail: '',
      userPassword: ''
    }
  }

  login = ()=>{
    const {userEmail,userPassword} = this.state;
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
		if(userEmail==""){
			Alert.alert("Please enter Email address");
		  this.setState({email:'Please enter Email address'})
			
		}
		
		else if(reg.test(userEmail) === false)
		{
		Alert.alert("Email is Not Correct");
		this.setState({email:'Email is Not Correct'})
		return false;
		  }

		else if(userPassword==""){
    Alert.alert("Please enter password") 
		this.setState({email:'Please enter password'})
		}
		else{
		
		fetch('https://mymosque.000webhostapp.com/login.php',{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
				email: userEmail,
				password: userPassword
			})
			
		})
		.then((response) => response.json())
		 .then((res)=>{
			 if(res.message == "ok"){
				 // redirect to profile page
         // Alert.alert("Successfully Login");
         var id = res.id;
				 this.props.navigation.navigate("Details", { ID: id});
			 }else{
				 Alert.alert("Wrong Login Details");
			 }
		 })
		 .catch((error)=>{
		 console.error(error);
		 });
		}
		
		
		Keyboard.dismiss();
  }
  // static navigationOptions = ({ navigation })=>({
  //   title: 'Login'
  // })
  static navigationOptions = {
      title: 'Login',
  };
  render() {
    return (
      <View style={ styles.container }>
        <Text style={{fontSize:20}}>Login</Text>

        <TextInput placeholder='Username' style={ styles.input } onChangeText={userEmail => this.setState({userEmail})}/>
        <TextInput placeholder='Password' style={ styles.input} onChangeText={userPassword => this.setState({userPassword})} secureTextEntry={true}/>

        <TouchableOpacity
          style={{width:'80%',padding:10,backgroundColor:'blue',alignItems:'center', marginBottom:10, borderRadius:20}}
          onPress={this.login}
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



// Register

class RegisterScreen extends React.Component {

  constructor(props){
    
    super(props);

    this.state ={
      userName:"",
      userEmail:"",
      userPassword:""
    }
  }

  userRegister = () =>{
		//alert('ok'); // version 0.48
		
		const {userName} = this.state;
		const {userEmail} = this.state;
		const {userPassword} = this.state;
		
		
		fetch('https://mymosque.000webhostapp.com/register.php', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				name: userName,
				email: userEmail,
				password: userPassword,
			})
			
		})
		.then((response) => response.json())
			.then((responseJson) =>{
				alert(responseJson);
			})
			.catch((error)=>{
				console.error(error);
			});
		
	}

  static navigationOptions ={
    title: 'Register'
  }

  render(){

    return(
      <View style={ styles.container }>
        <Text style={{fontSize:20}}>Register</Text>

        <TextInput placeholder='Username' style={ styles.input } onChangeText={ userName => this.setState({userName}) }/>
        <TextInput placeholder='Email' style={ styles.input } onChangeText={ userEmail => this.setState({userEmail}) }/>
        <TextInput placeholder='Password' style={ styles.input} onChangeText={ userPassword => this.setState({userPassword}) } secureTextEntry={true}/>

        

        <TouchableOpacity
          style={{width:'80%',padding:10,backgroundColor:'blue',alignItems:'center', borderRadius:20}}
          onPress={ this.userRegister }
        >
        <Text style={{color:'white'}}>Register</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

class DetailsScreen extends React.Component {

  constructor(props){
    super(props);
    
    this.state ={

      id: this.props.navigation.state.params.ID,
    }
  }
  

  static navigationOptions ={
    title: 'Dashboard'
  }
  render() {
    return (
      <View style={ styles.container }>
        
        
        <TouchableOpacity
        style={{width:'90%', height:'20%',padding:30,backgroundColor:'blue',alignItems:'center', borderRadius:10, marginBottom:12, elevation:4, flexDirection:'row'}}
        onPress={()=>this.props.navigation.navigate('MakeComplaint', { ID: this.props.navigation.state.params.ID})}
        >
        <Text style={{color:'white', fontSize:30}}>Make Complaint</Text>
        </TouchableOpacity>
        
        {/* Profile button */}

        <TouchableOpacity
        style={{width:'90%', height:'20%',padding:30,backgroundColor:'blue',alignItems:'center', borderRadius:10, marginBottom:12, elevation:4, flexDirection:'row'}}
        onPress={()=>this.props.navigation.navigate('ComplaintStatus', { ID: this.props.navigation.state.params.ID})}
        >
        <Text style={{color:'white', fontSize:30}}>Complaint Status</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={{width:'90%', height:'20%',padding:30,backgroundColor:'blue',alignItems:'center', borderRadius:10, marginBottom:12, elevation:4, flexDirection:'row'}}
        onPress={()=>this.props.navigation.navigate('UserProfile', { ID: this.props.navigation.state.params.ID})}
        >
        <Text style={{color:'white', fontSize:30}}>{ this.props.navigation.state.params.ID }</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


class MakeComplaintScreen extends React.Component{

  constructor(props){
    super(props);

    this.state={
      location: "",
      description: "",
    }
  }

  submitComplaint = ()=>{

    const {location} = this.state;
		const {description} = this.state;
		
		
		fetch('https://mymosque.000webhostapp.com/complaint.php', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
        id: this.props.navigation.state.params.ID,
				location: location,
				description: description,
			})
			
		})
		.then((response) => response.json())
		.then((responseJson) =>{
				alert(responseJson);
			})
		.catch((error)=>{
				console.error(error);
			});
  }

  static navigationOptions = {
    title: 'Make Complaint'
  }

  render(){
    return(
      <View style={ styles.container }>
        

        
       
        <TextInput placeholder='Location here....' style={ styles.input} onChangeText={ location => this.setState({location}) } multiline={true} numberOfLines={4}
        />
        <TextInput placeholder='Put your description here....' style={ styles.input} onChangeText={ description => this.setState({description}) } multiline={true} numberOfLines={4}
        />

        

        <TouchableOpacity
          style={{width:'80%',padding:10,backgroundColor:'blue',alignItems:'center', borderRadius:20}}
          onPress={ this.submitComplaint }
        >
        <Text style={{color:'white'}}>Submit Complaint</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

class ComplaintStatusScreen extends React.Component{

  static navigationOptions={
    title: 'Complaint Status'
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={{fontSize:20}}>Complaint List</Text>
      </View>
      
    );
  }
}

class UserProfileScreen extends React.Component{


  constructor(props){
    super(props);

    this.state = {
      id: ""
    }
  }

  fetchProfile = ()=>{

    fetch('https://mymosque.000webhostapp.com/profile.php', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				id : this.props.navigation.state.params.ID
			})
			
		})
		.then((response) => response.json())
		.then((responseJson) =>{
				Alert.alert(responseJson.message);
		})
		.catch((error)=>{
        
				console.error(error);
		});
		

  }
  
  


  

  static navigationOptions={
    title: 'Profile'
  }

  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={{width:'80%',padding:10,backgroundColor:'blue',alignItems:'center', borderRadius:20}}
          onPress={ this.fetchProfile }
        >
        <Text style={{color:'white'}}>{this.props.navigation.state.params.ID}</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 20}}>Your Profile</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen },
    Register: { screen: RegisterScreen },
    MakeComplaint: { screen: MakeComplaintScreen },
    ComplaintStatus: { screen: ComplaintStatusScreen },
    UserProfile: { screen: UserProfileScreen }
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
    marginBottom: 10,
    backgroundColor: 'white',
  }
});