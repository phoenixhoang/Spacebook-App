import React, { Component } from "react";
import { Button, Text } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyles from "../styles/globalStyles";

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  login = async () => {
    //Validation here...

    return fetch("http://localhost:3333/api/1.0.0/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw "Invalid email or password";
        } else {
          throw "Something went wrong";
        }
      })
      .then(async (responseJson) => {
        await AsyncStorage.setItem("@session_token", responseJson.token);
        await AsyncStorage.setItem("user_id", responseJson.id);
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView>
        <Text style={GlobalStyles.headerText}>Login</Text>
        <TextInput
          placeholder="Enter your email..."
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          style={GlobalStyles.userDataTextBox}
        />
        <TextInput
          placeholder="Enter your password..."
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
          style={GlobalStyles.userDataTextBox}
        />
        <Button title="Login" onPress={() => this.login()} />
        <Button
          title="Don't have an account?"
          color="darkblue"
          onPress={() => this.props.navigation.navigate("Signup")}
        />
      </ScrollView>
    );
  }
}

export default LoginScreen;