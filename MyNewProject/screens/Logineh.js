import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { UserContext } from "../screens/usercontext"; // Import the UserContext

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { setUser } = useContext(UserContext); // Use the context to set the user

  const handleLogin = async () => {
    try { //change ip below
      const response = await axios.post("http://192.168.1.126:8000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        setMessage("Login Successful");
        setUser({ username }); // Store the username in context
        navigation.navigate("Home");
      } else {
        setMessage("Invalid credentials");
      }
    } catch (error) {
      setMessage("Error Logging In");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {message ? <Text style={styles.message}>{message}</Text> : null}

        <TouchableOpacity
          style={styles.signupContainer}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signupText}>Don't have an account?</Text>
          <Text style={styles.signupLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#444",
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#ff4500",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    marginTop: 20,
    color: "red",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 32,
  },
  signupText: {
    color: "#888",
    fontSize: 16,
  },
  signupLink: {
    color: "#ff4500",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
