export interface Account {
	$createdAt: string;
	$id: string;
	email: string;
	emailVerification: boolean;
	name: string;
	phone: string;
	phoneVerification: boolean;
	status: boolean;
}

export interface User {
	$id: string;
	email: string;
	name: string;
	avatar: string;
	$createdAt: string;
	languages: string[];
	genres: string[];
	bookmarks: string[];
}

export type MediaType = "movie" | "tv";

export interface Media {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: string;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date?: string;
	first_air_date?: string;
	title: string;
	name?: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	media_type?: MediaType;
	// details
	homepage?: string;
	runtime?: number;
	budget?: number;
	revenue?: number;
	status?: string;
	genres?: Genre[];
	production_companies?: any[];
	videos?: {
		results: Video[];
	};
	credits?: {
		cast: Person[];
		crew: Person[];
	};
	images?: {
		backdrops: Image[];
		posters: Image[];
	};
	// cast
	character?: string;
}

export interface Person {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	profile_path: string;
	popularity: number;
	cast_id?: number;
	job?: string;
	character?: string;
	credit_id: string;
	order: number;
	// details
	also_known_as?: string[];
	birthday?: string;
	place_of_birth?: string;
	homepage?: string;
	biography?: string;
	combined_credits?: {
		cast?: Media[];
		crew?: Media[];
	};
	images?: {
		profiles: Image[];
	};
}

export interface Video {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
}

export interface Image {
	aspect_ratio: number;
	height: number;
	iso_639_1: string;
	file_path: string;
	vote_average: number;
	vote_count: number;
	width: number;
}


export interface PageResult<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

export interface Genre {
	id: number;
	name: string;
}

export interface QueryItem {
	type: MediaType;
	title: string;
	query: string;
}

export interface Credits {
	cast: Media[];
}