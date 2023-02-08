import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, Feather, EvilIcons, Fontisto } from "@expo/vector-icons";
import dayjs from "dayjs";
import { getCityWeather } from "../api";

const HomeScreen = () => {
	const [whetherIcon, setWeatherIcon] = useState("");

	const [weather, setWeather] = useState(null);

	const [city, setCity] = useState("Dar Es Salaam"); //Future proofing, maybe use location to get user's city

	const fetchWeather = () => {
		getCityWeather({ city }, (data) => {
			if (data.cod === 200) {
				setWeather(data);
			}
		});
	};

	useEffect(() => {
		fetchWeather();
	}, []);

	useEffect(() => {
		if (weather) {
			const code = weather.weather[0].icon;
			setWeatherIcon(`http://openweathermap.org/img/wn/${code}@2x.png`);
		}
	}, [weather]);

	return (
		<ImageBackground
			source={require("../assets/background.png")}
			style={styles.background}
		>
			{weather && (
				<>
					<Image source={require("../assets/logo.png")} />
					<View style={styles.location}>
						<Ionicons
							name="ios-location-sharp"
							size={30}
							color="#FFB200"
						/>
						<Text style={styles.locationText}>{city}</Text>
					</View>
					<View style={styles.whetherContainer}>
						<Image
							source={{ uri: whetherIcon }}
							style={styles.whetherIcon}
						/>
					</View>
					<View style={styles.temperature}>
						<View style={styles.temperatureContainer}>
							<Text style={styles.temperatureText}>
								{Math.floor(weather.main.temp)}
							</Text>
							<Text style={styles.temperatureUnits}>°C</Text>
						</View>
						<View style={styles.temperatureContainer}>
							<Text style={styles.subText}>Feels like</Text>
							<Text style={styles.subTemperature}>
								{Math.floor(weather.main.feels_like)} °C
							</Text>
						</View>
						<View style={styles.temperatureContainer}>
							<Text style={styles.conditionText}>
								{weather.weather[0].description}
							</Text>
						</View>
					</View>
					<View style={styles.otherDetails}>
						<View style={styles.otherDetailsContainer}>
							<View style={styles.otherDetailsItem}>
								<Feather
									name="wind"
									size={30}
									color="#FFFFFF"
								/>
								<Text style={styles.otherDetailsText}>
									Windspeed
								</Text>
							</View>
							<Text style={styles.otherDetailsText}>
								{weather.wind.speed} km/h
							</Text>
						</View>
						<View style={styles.otherDetailsContainer}>
							<View style={styles.otherDetailsItem}>
								<EvilIcons
									name="calendar"
									size={30}
									color="#FFFFFF"
								/>
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
								<Fontisto
									name="rain"
									size={30}
									color="#FFFFFF"
								/>
								<Text style={styles.otherDetailsText}>
									Humidity
								</Text>
							</View>
							<Text style={styles.otherDetailsText}>
								{weather.main.humidity} %
							</Text>
						</View>
					</View>
				</>
			)}
			{!weather && <View style={styles.container}>
                <ActivityIndicator size="large" color="#FFB200" />
            </View>}
		</ImageBackground>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
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
        fontFamily: "CabinBold",
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
        fontFamily: "CabinBold",
		fontWeight: "bold",
		lineHeight: 130,
	},
	temperatureUnits: {
		fontSize: 40,
		color: "#FFFFFF",
        fontFamily: "CabinBold",
		fontWeight: "bold",
		marginLeft: 20,
	},
	subText: {
		color: "#FFFFFF",
        fontFamily: "CabinRegular",
		fontSize: 20,
	},
	subTemperature: {
		color: "#FFB200",
		fontSize: 20,
        fontFamily: "CabinRegular",
		marginLeft: 10,
	},
	conditionText: {
		color: "#FFFFFF",
		fontSize: 20,
        fontFamily: "CabinBold",
		fontWeight: "bold",
		textTransform: "capitalize",
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
        fontFamily: "CabinBold",
		fontWeight: "bold",
	},
});
