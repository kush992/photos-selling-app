import React, { FC } from 'react';
import cn from 'classnames';

import CloseIcon from '../../../../assets/CloseIcon.svg';

import './styles.scss';

interface Props {
	handleSave: () => void;
	handleClear: () => void;
	handleClose: () => void;
	renderFilters: React.ReactElement;
	isOpen: boolean;
	mobileFilterRef: React.RefObject<HTMLDivElement>;
}

const MobileFilter: FC<Props> = (props) => {
	const { renderFilters, isOpen, handleClear, handleSave, handleClose, mobileFilterRef } = props;

	return (
		<div className={cn('MobileFilters', { 'MobileFilters--isOpen': isOpen })} ref={mobileFilterRef}>
			<div className='MobileFilters__titleBtnWrap'>
				<h3>Filters</h3>
				<button onClick={handleClose}>
					<img src={CloseIcon} alt='closeIcon' height={22} width={22} />
				</button>
			</div>
			<div className='MobileFilters__content'>{renderFilters}</div>
			<div className='MobileFilters__btns'>
				<button onClick={handleClear}>Clear</button>
				<button className='MobileFilters__saveBtn' onClick={handleSave}>
					Save
				</button>
			</div>
		</div>
	);
};

export default MobileFilter;
