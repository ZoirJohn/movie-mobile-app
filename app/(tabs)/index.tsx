import { View, Image, ScrollView, ActivityIndicator, Text, FlatList } from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import SearchBar from "@/components/searchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/movieCard";

const Index = () => {
	const router = useRouter();
	const { data: movies, error: moviesError, loading: moviesLoading } = useFetch(() => fetchMovies({ query: "" }));
	return (
		<View className="flex-1 bg-primary">
			<Image source={images.bg} className="w-full absolute z-0" />
			{moviesLoading ? (
				<ActivityIndicator />
			) : moviesError ? (
				<Text>Error {moviesError.message}</Text>
			) : (
				<FlatList
					data={movies}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <MovieCard {...item} />}
					numColumns={3}
					style={{
						marginBottom: 80,
					}}
					columnWrapperStyle={{
						justifyContent: "flex-start",
						gap: 20,
						paddingRight: 5,
						marginBottom: 10,
					}}
					ListHeaderComponent={
						<>
							<Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
							<>
								<View className="mt-5">
									<SearchBar placeholder="Search for a movie" onPress={() => router.push("/search")} />
								</View>
								<Text className="text-lg text-white font-bold mt-5 mb-3">Latest movies</Text>
							</>
						</>
					}
					contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</View>
	);
};

export default Index;
