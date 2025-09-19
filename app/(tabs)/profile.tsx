import { icons } from "@/constants/icons";
import { View, Text, Image } from "react-native";

const Profile = () => {
	return (
		<View className="flex-1 justify-center items-center bg-primary">
			<Image source={icons.person} />
		</View>
	);
};

export default Profile;
