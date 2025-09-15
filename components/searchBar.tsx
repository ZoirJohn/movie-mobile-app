import { View, Text, Image, TextInput } from "react-native";
import { icons } from "@/constants/icons";

interface IProps {
	placeholder: string;
	onPress?: () => void;
	value: string;
	onChangeText: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: IProps) => {
	return (
		<View className="flex-row items-center bg-searchBar rounded-full px-5 py-1">
			<Image
				source={icons.search}
				className="size-5"
				resizeMode="contain"
				tintColor="#AB8BFF"
			/>
			<TextInput
				onPress={onPress}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				placeholderTextColor="#A8B5DB"
				className="flex-1 ml-2 text-white"
			/>
		</View>
	);
};

export default SearchBar;
