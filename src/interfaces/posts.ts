import { ITag } from "./tags";

export interface IPost {
	_id: string;
	title: string;
	body: string;
	slug: string;
	publish: string;
	created: string;
	updated: string;
	tags: ITag[];
}

export interface IPosts {
	posts: IPost[];
	posts_total: number;
	pages_total: number;
	page: number;
	has_previus_page: boolean;
	has_next_page: boolean;
}
