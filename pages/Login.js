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
		 .then((responseJson)=>{
			 if(responseJson == "ok"){
				 // redirect to profile page
				 Alert.alert("Successfully Login");
				 this.props.navigation.navigate("Details");
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