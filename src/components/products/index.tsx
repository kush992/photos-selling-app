import { ref, onValue } from 'firebase/database';
import { FC, useEffect, useRef, useState } from 'react';

import { db } from '../../utils/firebase';
import ProductCard from './components/ProductCard';
import ProductFilter from './components/ProductFilter';
import FeaturedProduct from './components/FeaturedProduct';
import Pagination from './components/Pagination';
import { getPaginationDetails, getsortedProducts, scrollToTopOfProductList } from './utility';
import { ProductData, SortBy, SortOrder } from 'shared/interface';
import SortSelection from './components/SortSelection';
import { isMobile } from '../../utils/utility';
import FilterIcon from '../../assets/FilterIcon.svg';
import MobileFilter from './components/MobileFilters';
import useClickOutside from '../../utils/useClickOutside';

import './styles.scss';

const Products: FC = () => {
	const [products, setProducts] = useState({} as ProductData[]);
	const [loading, setIsLoading] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortOrder, setSortOrder] = useState<SortOrder>('asce');
	const [sortBy, setSortBy] = useState<SortBy>('none');
	const [openFilters, setOpenFilters] = useState(false);

	const productListRef = useRef<HTMLDivElement>(null);
	const mobileFilterRef = useClickOutside(() => setOpenFilters(false), 'click');

	useEffect(() => {
		setIsLoading(true);
		const query = ref(db, 'products');

		return onValue(query, (snapshot) => {
			const data: ProductData[] = snapshot.val();

			if (snapshot.exists()) {
				setProducts(data);
				setIsLoading(false);
			}
		});
	}, []);

	// filtering products by featured flag to render separately
	const productData = Object.values(products);
	const featuredProducts = productData.filter((product) => product.featured);
	const normalProducts = productData.filter((product) => !product.featured);

	// filtering
	const getProductCategories = normalProducts.map((product) => product.category);
	const productCategories = [...new Set(getProductCategories)];

	const handleCategorySelection = (selectedItem: string) => {
		const isItemSelected = selectedCategory.includes(selectedItem);

		// unchecking the filter if already selected
		if (isItemSelected) {
			const filteredCategory = selectedCategory.filter((category) => category !== selectedItem);
			setSelectedCategory(filteredCategory);
			return;
		}

		// selecting filter if not already selected
		setSelectedCategory([...selectedCategory, selectedItem]);
		setCurrentPage(1);
	};

	const handlePriceRangeChange = (priceRange: string) => {
		setPriceRange((prevSelectedPriceRange) => (prevSelectedPriceRange === priceRange ? null : priceRange));
		setCurrentPage(1);
	};

	// sort by name or price
	const handleSelectSortBy = (value: SortBy) => {
		setSortBy(value);
		setCurrentPage(1);
	};

	// sorting order
	const handleSortOrder = () => {
		setSortOrder((prevOrder) => (prevOrder === 'desc' ? 'asce' : 'desc'));
		setCurrentPage(1);
	};

	// get products with pagination after filtering/sorting
	const { productsWithPagination, totalPages } = getPaginationDetails(
		currentPage,
		getsortedProducts(sortBy, sortOrder, priceRange, selectedCategory, normalProducts),
	);

	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
		scrollToTopOfProductList(productListRef);
	};

	const previousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
		scrollToTopOfProductList(productListRef);
	};

	const handleClear = () => {
		setSelectedCategory([]);
		setPriceRange(null);
		setOpenFilters(false);
	};

	const handleSave = () => {
		// closing popup here as the filter inputs are on change;
		setOpenFilters(false);
	};

	const renderSorters = () => <SortSelection selectedSortBy={sortBy} onOptionSelect={handleSelectSortBy} onSortOrderChange={handleSortOrder} />;

	const renderFilters = () => (
		<ProductFilter
			productCategories={productCategories}
			priceRange={priceRange}
			selectedCategory={selectedCategory}
			onClickCategoryFilters={handleCategorySelection}
			onClickPriceFilters={handlePriceRangeChange}
		/>
	);

	return (
		<div className='Products'>
			{loading && <p className='Products--isLoading'>Loading...</p>}
			{!loading && (
				<>
					{featuredProducts.map((product, index) => (
						<FeaturedProduct
							key={`featuredProduct-${index}`}
							image={product.image}
							category={product.category}
							name={product.name}
							details={product.details}
							price={product.price}
						/>
					))}
					<div className='Products__title' ref={productListRef}>
						<div>
							<span className='Products__title--bold'>Photography /</span> Premium Photos
						</div>
						{isMobile() ? (
							<div className='Products--isMobileFilter' onClick={() => setOpenFilters(true)}>
								<img src={FilterIcon} alt='filterIcon' height={29} width={29} />
							</div>
						) : (
							renderSorters()
						)}
					</div>
					<div className='Products__container'>
						{!isMobile() && <div className='Products__filter'>{renderFilters()}</div>}
						<div>
							<div className='Products__list'>
								{productsWithPagination.length !== 0 ? (
									productsWithPagination.map((product: ProductData, index: number) => (
										<ProductCard
											key={`productNum_${index}`}
											image={product.image}
											category={product.category}
											name={product.name}
											price={product.price}
											bestseller={product.bestseller}
										/>
									))
								) : (
									<p>No products available with these filter options selected</p>
								)}
							</div>
							<Pagination currentPage={currentPage} totalPages={totalPages} previousPage={previousPage} nextPage={nextPage} />
						</div>
					</div>
				</>
			)}
			{openFilters && (
				<MobileFilter
					handleSave={handleSave}
					handleClose={() => setOpenFilters(false)}
					handleClear={handleClear}
					mobileFilterRef={mobileFilterRef}
					isOpen={openFilters}
					renderFilters={renderFilters()}
				/>
			)}
		</div>
	);
};

export default Products;
