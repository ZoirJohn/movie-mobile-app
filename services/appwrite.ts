import { Client, Databases, ID, Query, TablesDB } from "react-native-appwrite";

const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);
const database = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
	try {
		const result = await database.listRows(process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!, process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!, [Query.equal("search_term", query)]);
		if (result.rows.length > 0) {
			const movie = result.rows[0];
			await database.updateRow(process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!, process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!, movie.$id, { count: movie.count + 1 });
		} else {
			await database.createRow(process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!, process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!, ID.unique(), { search_term: query, movie_id: movie.id, count: 1, poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `https://placehold.co/600x400/000000/000.png`, title: movie.title });
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getTrendingMovies = async () => {
	try {
		const result = await database.listRows(process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!, process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!, [Query.limit(5), Query.orderDesc("count")]);
		return result.rows.map((row) => ({ search_term: row.search_term, movie_id: row.movie_id, title: row.title, count: row.count, poster_url: row.poster_url }));
	} catch (error) {
		console.error(error);
		throw error;
	}
};
