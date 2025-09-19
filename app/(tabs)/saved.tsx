import { icons } from "@/constants/icons";
import { View, Text, Image } from "react-native";

const Saved = () => {
	return (
		<View className="flex-1 justify-center items-center bg-primary">
			<Image source={icons.save} />
		</View>
	);
};

export default Saved;
