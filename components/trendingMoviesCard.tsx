import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

const TrendingMoviesCard = ({ movie: { movie_id, title, poster_url }, index }: TrendingCardProps) => {
	return (
		<Link
			href={`/movies/${movie_id}`}
			asChild
		>
			<TouchableOpacity className="w-40 relative pl-4">
				<Image
					className="w-40 h-56 rounded-lg"
					resizeMode="cover"
					source={{ uri: poster_url || `https://placehold.co/600x400/000000/000.png` }}
				></Image>
				<View className="absolute bottom-9 -left-3 px-2 py-1 rounded-full">
					<MaskedView maskElement={<Text className="font-bold text-white text-6xl">{index + 1}</Text>}>
						<Image
							source={images.rankingGradient}
							className="size-14"
							resizeMode="cover"
						/>
					</MaskedView>
				</View>
				<Text
					className="text-sm font-bold mt-2 text-secondaryText"
					numberOfLines={2}
				>
					{title}
				</Text>
			</TouchableOpacity>
		</Link>
	);
};

export default TrendingMoviesCard;
