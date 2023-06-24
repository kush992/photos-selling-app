export interface ProductData {
	name: string;
	category: string;
	price: number;
	currency: string;
	image: Image;
	bestseller: boolean;
	featured: boolean;
	details: ProductDetails;
}

export interface Image {
	src: string;
	alt: string;
}

export interface ProductDetails {
	dimensions: Dimensions;
	size: number;
	description: string;
	recommendations: Image[];
}

interface Dimensions {
	width: number;
	height: number;
}

export interface CartItemsObj {
	name: string;
	price: number;
	image: Image;
}

export type SortOrder = 'asce' | 'desc';
export type SortBy = 'none' | 'price' | 'name';
