import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useEffect, useMemo, useState } from "react";
import { View, Image, FlatList, ActivityIndicator, Text } from "react-native";

const Search = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const { data: movies, error: moviesError, loading: moviesLoading, refetch: loadMovies, reset } = useFetch(() => fetchMovies({ query: searchQuery }), false);
	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			if (searchQuery.trim()) {
				await loadMovies();
				if (movies?.length && movies?.[0]) {
					await updateSearchCount(searchQuery, movies[0]);
				}
			} else {
				reset();
			}
		}, 1000);
		return () => clearTimeout(timeoutId);
	}, [searchQuery]);

	return (
		<View className="flex-1 bg-primary">
			<Image
				source={images.bg}
				className="flex-1 absolute w-full z-0"
			/>
			<FlatList
				data={movies}
				renderItem={({ item }) => <MovieCard {...item} />}
				keyExtractor={(item) => item.id.toString()}
				numColumns={3}
				columnWrapperStyle={{
					justifyContent: "flex-start",
					gap: 20,
					marginBottom: 10,
				}}
				contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
				ListHeaderComponent={
					<>
						<View className="w-full flex-row justify-center items-center mt-20 mb-5">
							<Image
								source={icons.logo}
								className="w-12 h-10"
							></Image>
						</View>
						<View className="my-5">
							<SearchBar
								placeholder="Search movies..."
								value={searchQuery}
								onChangeText={(text) => setSearchQuery(text)}
							/>
						</View>
						{moviesLoading && (
							<ActivityIndicator
								size="large"
								color="#0000FF"
								className="my-3"
							/>
						)}
						{moviesError && <Text className="text-red-500 px-5 my-3">Error: {moviesError.message}</Text>}
						{!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
							<Text className="text-xl text-white font-bold mb-3 mt-5">
								Search Results for <Text className="text-accentText">{searchQuery}</Text>
							</Text>
						)}
					</>
				}
				ListEmptyComponent={
					!moviesLoading && !moviesLoading ? (
						<View className="mt-5 px-5">
							<Text className="text-center text-gray-500">{searchQuery.trim() ? "No movies found" : "Search for a movie"}</Text>
						</View>
					) : null
				}
			/>
		</View>
	);
};

export default Search;
