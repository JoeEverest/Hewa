import {
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, Feather, EvilIcons, Fontisto } from "@expo/vector-icons";

import { getCityWeather } from "../api";
import dayjs from "dayjs";

const SearchScreen = () => {
	const [city, setCity] = useState("");
	const [weather, setWeather] = useState(null);
	const [whetherIcon, setWeatherIcon] = useState("");
	const [loading, setLoading] = useState(false);
	const [searching, setSearching] = useState(false);

	function search() {
		if (city !== "") {
			setLoading(true);
			setSearching(true);
			getCityWeather({ city }, (data) => {
				if (data.cod === 200) {
					setWeather(data);
					setLoading(false);
				}
			});
		}
	}

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
			{!searching ? (
				<View style={styles.searchContainer}>
					<TextInput
						placeholder="Enter city name to search"
						value={city}
						onChangeText={setCity}
						style={styles.input}
						placeholderTextColor="white"
					/>
					<Pressable onPress={search} style={styles.searchButton}>
						<Feather name="search" size={18} color="#FFFFFF" />
						<Text style={styles.searchButtonText}>Search</Text>
					</Pressable>
				</View>
			) : (
				<>
					{loading && (
						<View style={styles.container}>
							<ActivityIndicator size="large" color="#FFB200" />
						</View>
					)}
					{!loading && (
						<>
							<Image source={require("../assets/logo.png")} />

							<View style={styles.location}>
								<Ionicons
									name="ios-location-sharp"
									size={30}
									color="#FFB200"
								/>
								<Text style={styles.locationText}>{city}</Text>
                                <Pressable
									onPress={() => {
										setWeather(null);
										setCity("");
                                        setSearching(false);
									}}
                                    style={styles.closeButton}
								>
									<EvilIcons
										name="close"
										size={30}
										color="#FFB200"
									/>
								</Pressable>
							</View>
							<View style={styles.whetherContainer}>
								<Image
									source={{ uri: `${whetherIcon}` }}
									style={styles.whetherIcon}
								/>
							</View>
							<View style={styles.temperature}>
								<View style={styles.temperatureContainer}>
									<Text style={styles.temperatureText}>
										{Math.floor(weather.main.temp)}
									</Text>
									<Text style={styles.temperatureUnits}>
										°C
									</Text>
								</View>
								<View style={styles.temperatureContainer}>
									<Text style={styles.subText}>
										Feels like
									</Text>
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
											{dayjs().format(
												"dddd, DD MMM YYYY"
											)}
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
				</>
			)}
		</ImageBackground>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	background: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
    closeButton: {
        marginLeft: 120,
    },
	input: {
		borderWidth: 2,
		borderColor: "#FFFFFF",
		width: 300,
		height: 50,
		textAlign: "center",
		padding: 10,
		borderRadius: 10,
		color: "#FFFFFF",
		fontSize: 18,
        fontFamily: "CabinBold",
		fontWeight: "bold",
	},
	searchButton: {
		marginTop: 20,
		backgroundColor: "#FFB200",
		width: 110,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		borderRadius: 10,
	},
	searchButtonText: {
		fontSize: 18,
        fontFamily: "CabinBold",
		fontWeight: "bold",
		color: "#FFFFFF",
		marginLeft: 10,
	},
	searchContainer: {
		justifyContent: "center",
		alignItems: "center",
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
        fontFamily: "CabinBold",
		fontWeight: "bold",
	},
	whetherContainer: {
		marginTop: 20,
	},
	whetherIcon: { width: 100, height: 100, marginLeft: 100 },
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
        fontFamily: "CabinRegular",
		color: "#FFFFFF",
		fontSize: 20,
	},
	subTemperature: {
		color: "#FFB200",
        fontFamily: "CabinRegular",
		fontSize: 20,
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
