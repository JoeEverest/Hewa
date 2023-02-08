import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
	const Tab = createBottomTabNavigator();
	return (
		<NavigationContainer>
			<StatusBar style="light" />
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "Home") {
							iconName = "home";
						}
						if (route.name === "Search") {
							iconName = "search";
						}

						return (
							<Ionicons
								name={iconName}
								size={size}
								color={color}
							/>
						);
					},
					tabBarActiveTintColor: "#FFA500",
					tabBarInactiveTintColor: "#F8F8F8",
					tabBarShowLabel: false,
					headerShown: false,
					tabBarStyle: {
						backgroundColor: "#224496",
						borderWidth: 0,
					},
					tabBarIconStyle: {
						width: 36,
						height: 36,
					},
				})}
			>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Search" component={SearchScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
