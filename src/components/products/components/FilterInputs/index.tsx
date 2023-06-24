import { FC } from 'react';
import './styles.scss';

interface Props {
	name: string;
	onClickFilters: (value: string) => void;
	checked?: boolean;
	value?: string;
}

const FilterInputs: FC<Props> = (props) => {
	const { name, checked, value, onClickFilters } = props;
	return (
		<div className='FilterInputs'>
			<label>
				<input
					type='checkbox'
					id={name}
					name={name}
					checked={checked}
					value={value}
					onChange={() => onClickFilters(name)}
					placeholder={name}
				/>
				{name}
			</label>
		</div>
	);
};

export default FilterInputs;
