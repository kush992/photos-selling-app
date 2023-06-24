import { FC } from 'react';
import cn from 'classnames';
import NextIcon from '../../../../assets/NextIcon.svg';
import PrevIcon from '../../../../assets/PrevIcon.svg';
import './styles.scss';

interface Props {
	currentPage: number;
	totalPages: number;
	previousPage: () => void;
	nextPage: () => void;
}

const Pagination: FC<Props> = (props) => {
	const { currentPage, totalPages, previousPage, nextPage } = props;

	return (
		<div className='Pagination'>
			{currentPage > 1 && (
				<button className='Pagination__btn' onClick={previousPage}>
					<img src={PrevIcon} alt='previous' height={20} width={13} />
				</button>
			)}
			{[...Array(totalPages)].map((_, index) => (
				<span
					key={`pageNum-${index}`}
					className={cn('Pagination__pageNum', {
						'Pagination__pageNum--isBold': currentPage === index + 1,
					})}
				>
					{index + 1}
				</span>
			))}
			{currentPage < totalPages && (
				<button onClick={nextPage}>
					<img src={NextIcon} alt='next' height={20} width={13} />
				</button>
			)}
		</div>
	);
};

export default Pagination;
