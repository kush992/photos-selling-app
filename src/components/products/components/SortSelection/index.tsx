import { FC } from 'react';
import cn from 'classnames';

import { SortBy } from 'shared/interface';
import SortOption from '../../../../assets/SortOption.svg';

import './styles.scss';

interface Props {
	selectedSortBy: SortBy;
	onOptionSelect: (value: SortBy) => void;
	onSortOrderChange: () => void;
}

const SortSelection: FC<Props> = ({ selectedSortBy, onOptionSelect, onSortOrderChange }) => {
	const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const option = e.target.value as SortBy;
		onOptionSelect(option);
	};

	const handleSortOrder = () => {
		onSortOrderChange();
	};
	return (
		<div className='SortSelection'>
			<button
				className={cn('SortSelection__btn', {
					'SortSelection__btn--isDisabled': selectedSortBy === 'none',
				})}
				onClick={handleSortOrder}
				disabled={selectedSortBy === 'none'}
			>
				<img src={SortOption} alt='sortOption' height={15} width={15} />
				<span>Sort By</span>
			</button>
			<select className='SortSelection__select' value={selectedSortBy} onChange={handleOptionChange}>
				<option value='none'>Sort</option>
				<option value='price'>Price</option>
				<option value='name'>Name</option>
			</select>
		</div>
	);
};

export default SortSelection;
