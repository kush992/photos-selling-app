import { FC } from 'react';
import { CartItemsObj, Image } from 'shared/interface';
import { addItem, toggleCart } from '../../../../reduxStore/cartReducer';
import { useDispatch } from 'react-redux';

import './styles.scss';

interface Props {
	image: Image;
	category: string;
	name: string;
	price: number;
	bestseller: boolean;
}

const ProductCard: FC<Props> = (props) => {
	const { image, category, name, price, bestseller } = props;
	const dispatch = useDispatch();

	const openCart = () => {
		dispatch(toggleCart(true));
	};

	const addToCart = () => {
		const productObj: CartItemsObj = {
			name,
			image,
			price,
		};

		dispatch(addItem(productObj));
		openCart();
	};

	return (
		<div className='ProductCard'>
			<div className='ProductCard__imgBtnWrap'>
				<div className='ProductCard__imgWrap'>
					{bestseller && <p className='ProductCard__bestseller'>Bestseller</p>}
					<img src={image.src} alt={image.alt} className='ProductCard__img' loading='lazy' width={300} height={300} />
				</div>
				<button className='ProductCard__btn' onClick={addToCart}>
					ADD TO CART
				</button>
			</div>
			<p className='ProductCard__text ProductCard__category'>{category}</p>
			<p className='ProductCard__text ProductCard__title'>{name}</p>
			<p className='ProductCard__text ProductCard__price'>${price}</p>
		</div>
	);
};

export default ProductCard;
