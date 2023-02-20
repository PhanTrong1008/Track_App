import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext.js";

const LoadingScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return null;
};

export default LoadingScreen;
