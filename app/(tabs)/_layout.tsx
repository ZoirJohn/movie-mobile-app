import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, ImageSourcePropType, Text, View } from "react-native";

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: ImageSourcePropType; title: string }) => {
	if (focused) {
		return (
			<ImageBackground source={images.highlight} className="flex flex-row w-full flex-1 min-w-[110px] min-h-[53px] justify-center items-center overflow-hidden rounded-full border">
				<Image source={icon} className="size-5" tintColor="#151312" />
				<Text className="ml-2 text-secondary text-base font-semibold">{title}</Text>
			</ImageBackground>
		);
	}
	return (
		<View className="rounded-full overflow-hidden">
			<Image source={icon} tintColor="#A8B5DB" className="size-5" />
		</View>
	);
};

const _Layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarStyle: {
					backgroundColor: "#0F0D23",
					marginHorizontal: 20,
					marginBottom: 36,
					height: 50,
					position: "absolute",
					overflow: "hidden",
					borderRadius: 50,
					borderWidth: 1,
					borderColor: "0F0D23",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.home} title="Home" />,
					tabBarIconStyle: {
						marginTop: 10,
					},
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.search} title="Search" />,
					tabBarIconStyle: {
						marginTop: 10,
					},
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.person} title="Profile" />,
					tabBarIconStyle: {
						marginTop: 10,
					},
				}}
			/>
			<Tabs.Screen
				name="saved"
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.save} title="Saved" />,
					tabBarIconStyle: {
						marginTop: 10,
					},
				}}
			/>
		</Tabs>
	);
};

export default _Layout;
