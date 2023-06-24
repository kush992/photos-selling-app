import { FC } from 'react';
import FilterInputs from '../FilterInputs';

import './styles.scss';

interface Props {
	productCategories: string[];
	priceRange: string | null;
	selectedCategory: string[];
	onClickCategoryFilters: (value: string) => void;
	onClickPriceFilters: (value: string) => void;
}

const ProductFilter: FC<Props> = (props) => {
	const { productCategories, priceRange, selectedCategory, onClickCategoryFilters, onClickPriceFilters } = props;

	const priceRanges = [
		['0-20', 'Lower than $20'],
		['20-100', '$20 - $100'],
		['100-200', '$100 - $200'],
		['200+', 'More than $200'],
	];

	return (
		<div className='ProductFilter'>
			<div>
				<div className='ProductFilter__title'>Category</div>
				<div className='ProductFilter__categoryList'>
					{productCategories.map((category, index) => (
						<FilterInputs
							key={`categoryNum_${index}`}
							name={category}
							value={category}
							onClickFilters={onClickCategoryFilters}
							checked={selectedCategory.includes(category)}
						/>
					))}
				</div>
				<hr className='ProductFilter__separator' />
				<div className='ProductFilter__title'>Price Range</div>
				<div className='ProductFilter__categoryList'>
					{priceRanges.map((category, index) => (
						<FilterInputs
							key={`categoryNum_${index}`}
							name={category[1]}
							value={category[0]}
							onClickFilters={() => onClickPriceFilters(category[0])}
							checked={priceRange === category[0]}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductFilter;
