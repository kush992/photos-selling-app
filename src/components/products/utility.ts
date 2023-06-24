import { ProductData } from '../../shared/interface';

export const getProductsByCategory = (selectedCategory: string[], products: ProductData[]) => {
	if (selectedCategory.length === 0) {
		return products;
	}

	return products.filter((product) => selectedCategory.includes(product.category));
};

export const getProductsByPriceRange = (selectedPrice: string | null, selectedCategory: string[], products: ProductData[]) => {
	const productsByCategory = getProductsByCategory(selectedCategory, products);

	if (!selectedPrice) {
		return productsByCategory;
	}

	return productsByCategory.filter((product) => checkPriceRange(product.price, selectedPrice));
};

const checkPriceRange = (price: number, range: string) => {
	if (range.includes('+')) {
		const [minPrice] = range.split('+');

		return price >= Number(minPrice);
	}

	const [minPrice, maxPrice] = range.split('-');

	return price >= Number(minPrice) && price <= Number(maxPrice);
};

export const sortByPrice = (products: ProductData[], sortOrder: string) => {
	return products.sort((a, b) => (sortOrder === 'asce' ? a.price - b.price : b.price - a.price));
};

export const sortByName = (products: ProductData[], sortOrder: string) => {
	return products.sort((a, b) => (sortOrder === 'asce' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
};

export const getsortedProducts = (
	sortBy: string,
	sortOrder: string,
	priceRange: string | null,
	selectedCategory: string[],
	products: ProductData[],
) => {
	const filteredProducts = getProductsByPriceRange(priceRange, selectedCategory, products);
	if (sortBy === 'none') {
		return filteredProducts;
	}
	if (sortBy === 'name') {
		return sortByName(filteredProducts, sortOrder);
	}

	return sortByPrice(filteredProducts, sortOrder);
};

export const getPaginationDetails = (currentPage: number, products: ProductData[]) => {
	const itemsPerPage = 6;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const productsWithPagination = products.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(products.length / 6);

	return { productsWithPagination, totalPages };
};

export const scrollToTopOfProductList = (productListRef: React.RefObject<HTMLDivElement>) => {
	const positionOfProductList = productListRef.current?.offsetTop;
	window.scrollTo({ top: positionOfProductList, behavior: 'smooth' });
};
