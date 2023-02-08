import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const SearchScreen = () => {
	return (
		<ImageBackground
			source={require("../assets/background.png")}
			style={styles.background}
		></ImageBackground>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
});
