import { FC, RefObject } from 'react';
import { useDispatch } from 'react-redux';
import { emptyCart, toggleCart } from '../../reduxStore/cartReducer';
import { CartItemsObj } from '../../shared/interface';
import CloseIcon from '../../assets/CloseIcon.svg';

import './styles.scss';

interface Props {
	cartItems: CartItemsObj[];
	cartRef: RefObject<HTMLDivElement>;
}

const Cart: FC<Props> = (props) => {
	const dispatch = useDispatch();

	const closeCart = () => {
		dispatch(toggleCart(false));
	};

	const clearCart = () => {
		dispatch(emptyCart());
		closeCart();
	};

	return (
		<div className='Cart' ref={props.cartRef}>
			<button className='Cart__closeBtn' onClick={closeCart}>
				<img src={CloseIcon} alt='closeIcon' height={22} width={22} />
			</button>
			<div className='Cart__itemList'>
				{props.cartItems.map((item, index) => (
					<div key={`cartItem-${index}`} className='Cart__item'>
						<div>
							<p className='Cart__itemTxt Cart__itemName'>{item.name}</p>
							<p className='Cart__itemTxt Cart__itemPrice'>${item.price}</p>
						</div>
						<div>
							<img className='Cart__itemImg' src={item.image.src} alt={item.image.alt} loading='lazy' />
						</div>
					</div>
				))}
			</div>
			<button className='Cart__emptyCartBtn' onClick={clearCart}>
				CLEAR
			</button>
		</div>
	);
};

export default Cart;
