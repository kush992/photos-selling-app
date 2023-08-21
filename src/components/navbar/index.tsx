import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { CartItemsObj } from 'shared/interface';
import Cart from '../../components/cart';
import { RootState } from '../../reduxStore/store';
import AppIcon from '../../assets/AppIcon.png';
import CartIcon from '../../assets/CartIcon.svg';
import useClickOutside from '../../utils/useClickOutside';
import { toggleCart } from '../../reduxStore/cartReducer';

import './styles.scss';

const Navbar = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector<RootState, CartItemsObj[]>((state) => state.cart.items);
	const isCartOpen = useSelector<RootState, boolean>((state) => state.cart.isCartOpen);

	const numOfItemsInCart = cartItems.length;
	const cartRef = useClickOutside(() => dispatch(toggleCart(false)), 'click');

	return (
		<div className='Navbar'>
			<img src={AppIcon} alt='site_logo' loading='lazy' width={'auto'} height={26} />
			<div
				onClick={() => dispatch(toggleCart(true))}
				className={cn('Navbar__cartIcon', {
					'Navbar--isCartEmpty': numOfItemsInCart === 0,
				})}
			>
				<img src={CartIcon} alt='cart' loading='lazy' width={30} height={30} />
				{numOfItemsInCart > 0 && <span className='Navbar__cartItemCount'>{numOfItemsInCart}</span>}
			</div>
			{isCartOpen && numOfItemsInCart > 0 && (
				<div className='Navbar__cart'>
					<Cart cartItems={cartItems} cartRef={cartRef} />
				</div>
			)}
		</div>
	);
};

export default Navbar;
