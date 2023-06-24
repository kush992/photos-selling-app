import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Image, CartItemsObj, ProductDetails } from 'shared/interface';
import { addItem, toggleCart } from '../../../../reduxStore/cartReducer';
import { isMobile } from '../../../../utils/utility';

import './styles.scss';

interface Props {
	image: Image;
	category: string;
	name: string;
	details: ProductDetails;
	price: number;
}

const FeaturedProduct: FC<Props> = (props) => {
	const { image, category, name, details, price } = props;
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
		<div className='FeaturedProduct'>
			<div className='FeaturedProduct__titleCtaWrap'>
				<h3>{name}</h3>
				{!isMobile() && (
					<button className='FeaturedProduct__btn' onClick={addToCart}>
						ADD TO CART
					</button>
				)}
			</div>
			<div className='FeaturedProduct__imgTagWrap'>
				<p className='FeaturedProduct__tag'>Photo of the day</p>
				<img className='FeaturedProduct__img' src={image.src} alt={image.alt} />
			</div>
			{isMobile() && (
				<button className='FeaturedProduct__btn FeaturedProduct__btn--isMobile' onClick={addToCart}>
					ADD TO CART
				</button>
			)}
			<div className='FeaturedProduct__infoSection'>
				<div className='FeaturedProduct__info FeaturedProduct__text'>
					<p className='FeaturedProduct__title'>{name}</p>
					<p className='FeaturedProduct__category'>{category}</p>
					<p className='FeaturedProduct__desc'>{details.description}</p>
				</div>
				<div className='FeaturedProduct__recommendation'>
					<h3 className='FeaturedProduct__title'>People also buy</h3>
					<div className='FeaturedProduct__specImgWrap'>
						{details.recommendations.map((item, index) => (
							<img key={`recommendation-${index}`} className='FeaturedProduct__specImg' src={item.src} alt={item.alt} loading='lazy' />
						))}
					</div>
					<div>
						<h3 className='FeaturedProduct__title'>Details</h3>
						<p className='FeaturedProduct__imgDetails'>
							Dimensions: {details.dimensions.height} x {details.dimensions.width} pixel
						</p>
						<p className='FeaturedProduct__imgDetails'>Size: {details.size / 1000} mb</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProduct;
