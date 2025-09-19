import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { Image } from "react-native";
import { icons } from "@/constants/icons";

const Info = ({ label, value }: { label: string; value: string }) => (
	<View className="flex-col items-start justify-center mt-5">
		<Text className="text-darkAccent font-normal text-sm">{label}</Text>
		<Text className="text-accentText font-bold text-sm mt-2">{value}</Text>
	</View>
);

const Details = () => {
	const { id } = useLocalSearchParams();
	const { data: movieDetails } = useFetch(() => fetchMovieDetails(id as string));

	return (
		<View className="bg-primary flex-1">
			<ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
				<View>
					<Image
						source={{ uri: movieDetails?.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : "https://placehold.co/600x400/000000/000.png" }}
						className="w-full h-[31em]"
						resizeMode="cover"
					/>
				</View>
				<View className="items-start justify-center mt-5 px-5">
					<Text className="text-white font-bold text-xl">{movieDetails?.title}</Text>
					<View className="flex-row items-center gap-x-2 mt-2">
						<Text className="text-accentText text-sm">{movieDetails?.release_date.split("-")[0]}</Text>
						<Text className="text-accentText text-sm">{movieDetails?.runtime}m</Text>
					</View>
					<View className="flex-row items-center bg-ratingBox px-2 py-1 rounded-md gap-x-1 mt-2">
						<Image
							source={icons.star}
							className="size-4"
						/>
						<Text className="text-white font-bold text-sm">{Math.round(movieDetails?.vote_average as number)}/10</Text>
						<Text className="text-accentText">({movieDetails?.vote_count}) votes</Text>
					</View>
					<Info
						label="Overview"
						value={movieDetails?.overview ? movieDetails?.overview : "N/A"}
					/>
					<Info
						label="Genres"
						value={movieDetails?.genres ? movieDetails?.genres.map((genre) => genre.name).join(" - ") : "N/A"}
					/>
					<View className="flex flex-row justify-between w-1/2">
						<Info
							label="Budget"
							value={`$${(movieDetails?.budget ?? 0) / 1_000_000} million`}
						/>
						<Info
							label="Revenue"
							value={`$${Math.round((movieDetails?.revenue ?? 0) / 1_000_000)} million`}
						/>
					</View>

					<Info
						label="Production Companies"
						value={movieDetails?.production_companies?.map((c) => c.name).join(" • ") || "N/A"}
					/>
				</View>
			</ScrollView>
			<TouchableOpacity
				className="absolute bottom-14 left-0 right-0 mx-5 bg-darkAccent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
				onPress={router.back}
			>
				<Image
					source={icons.arrow}
					className="size-5 mr-1 mt-0.5 rotate-180"
					tintColor="#fff"
				/>
				<Text className="text-white font-semibold text-base">Go Back</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Details;
