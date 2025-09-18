import { View, Image, ScrollView, ActivityIndicator, Text, FlatList } from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import SearchBar from "@/components/searchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/movieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingMoviesCard from "@/components/trendingMoviesCard";

const Index = () => {
	const router = useRouter();
	const { data: movies, error: moviesError, loading: moviesLoading } = useFetch(() => fetchMovies({ query: "" }));
	const { data: trendingMovies, error: trendingMoviesError, loading: trendingMoviesLoading } = useFetch(() => getTrendingMovies());
	return (
		<View className="flex-1 bg-primary">
			<Image
				source={images.bg}
				className="w-full absolute z-0"
			/>
			{moviesLoading ? (
				<ActivityIndicator />
			) : moviesError ? (
				<Text>Error {moviesError.message}</Text>
			) : (
				<ScrollView
					contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
					showsVerticalScrollIndicator={false}
				>
					<Image
						source={icons.logo}
						className="w-12 h-10 mt-20 mb-5 mx-auto"
					/>

					<View className="my-5">
						<SearchBar
							placeholder="Search for a movie"
							onPress={() => router.push("/search")}
							value=""
							onChangeText={() => {}}
						/>
					</View>
					{trendingMovies && (
						<>
							<Text className="text-lg text-white font-bold mt-5 mb-3">Trending Movies</Text>
							<FlatList
								data={trendingMovies}
								keyExtractor={(item) => item.title}
								renderItem={({ item, index }) => (
									<TrendingMoviesCard
										movie={{ ...item }}
										index={index}
									/>
								)}
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={{
									gap: 30,
								}}
							/>
						</>
					)}

					<Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
					<FlatList
						data={movies}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => <MovieCard {...item} />}
						numColumns={3}
						columnWrapperStyle={{
							justifyContent: "flex-start",
							gap: 20,
							marginBottom: 10,
						}}
						scrollEnabled={false}
						showsVerticalScrollIndicator={false}
					/>
				</ScrollView>
			)}
		</View>
	);
};

export default Index;
