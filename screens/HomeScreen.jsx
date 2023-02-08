import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons, Feather, EvilIcons, Fontisto } from "@expo/vector-icons";
import dayjs from "dayjs";

const HomeScreen = () => {
	const code = "02d";
	const whetherIcon = `http://openweathermap.org/img/wn/${code}@2x.png`;
	return (
		<ImageBackground
			source={require("../assets/background.png")}
			style={styles.background}
		>
			<Image source={require("../assets/logo.png")} />
			<View style={styles.location}>
				<Ionicons name="ios-location-sharp" size={30} color="#FFB200" />
				<Text style={styles.locationText}>Dar Es Salaam</Text>
			</View>
			<View style={styles.whetherContainer}>
				<Image
					source={{ uri: whetherIcon }}
					style={styles.whetherIcon}
				/>
			</View>
			<View style={styles.temperature}>
				<View style={styles.temperatureContainer}>
					<Text style={styles.temperatureText}>25</Text>
					<Text style={styles.temperatureUnits}>°C</Text>
				</View>
				<View style={styles.temperatureContainer}>
					<Text style={styles.subText}>Feels like</Text>
					<Text style={styles.subTemperature}>25 °C</Text>
				</View>
				<View style={styles.temperatureContainer}>
					<Text style={styles.conditionText}>Humidity</Text>
				</View>
			</View>
			<View style={styles.otherDetails}>
				<View style={styles.otherDetailsContainer}>
					<View style={styles.otherDetailsItem}>
						<Feather name="wind" size={30} color="#FFFFFF" />
						<Text style={styles.otherDetailsText}>Windspeed</Text>
					</View>
					<Text style={styles.otherDetailsText}>10 km/h</Text>
				</View>
				<View style={styles.otherDetailsContainer}>
					<View style={styles.otherDetailsItem}>
						<EvilIcons name="calendar" size={30} color="#FFFFFF" />
						<Text style={styles.otherDetailsText}>
							{dayjs().format("dddd, DD MMM YYYY")}
						</Text>
					</View>
					<Text style={styles.otherDetailsText}>
						{dayjs().format("HH:mm")}
					</Text>
				</View>
				<View style={styles.otherDetailsContainer}>
					<View style={styles.otherDetailsItem}>
						<Fontisto name="rain" size={30} color="#FFFFFF" />
						<Text style={styles.otherDetailsText}>Humidity</Text>
					</View>
					<Text style={styles.otherDetailsText}>10 %</Text>
				</View>
			</View>
		</ImageBackground>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: "center",
		paddingTop: "20%",
	},
	location: {
		marginTop: 50,
		flexDirection: "row",
		alignItems: "center",
	},
	locationText: {
		color: "#FFFFFF",
		fontSize: 30,
		paddingLeft: 10,
		fontWeight: "bold",
	},
	whetherContainer: {
		marginTop: 20,
	},
	whetherIcon: { width: 100, height: 100, marginLeft: 100 },
	temperature: {},
	temperatureContainer: {
		flexDirection: "row",
		alignItems: "baseline",
		justifyContent: "center",
		marginBottom: 20,
	},
	temperatureText: {
		fontSize: 130,
		color: "#FFFFFF",
		fontWeight: "bold",
		lineHeight: 130,
	},
	temperatureUnits: {
		fontSize: 40,
		color: "#FFFFFF",
		fontWeight: "bold",
		marginLeft: 20,
	},
	subText: {
		color: "#FFFFFF",
		fontSize: 20,
	},
	subTemperature: {
		color: "#FFB200",
		fontSize: 20,
		marginLeft: 10,
	},
	conditionText: {
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "bold",
	},
	otherDetails: {
		width: "100%",
		padding: 24,
        marginTop: "10%",
	},
	otherDetailsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	otherDetailsItem: {
		flexDirection: "row",
		alignItems: "center",
	},
	otherDetailsText: {
		color: "#FFFFFF",
		fontSize: 16,
		marginLeft: 20,
		fontWeight: "bold",
	},
});
