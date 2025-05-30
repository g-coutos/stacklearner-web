export interface Post {
	_id: string;
	title: string;
	body: string;
	slug: string;
	publish: string;
	created: string;
	updated: string;
}

export interface Posts {
	posts: Post[];
	posts_total: number;
	pages_total: number;
	page: number;
	has_previus_page: boolean;
	has_next_page: boolean;
}