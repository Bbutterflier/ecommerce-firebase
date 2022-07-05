import { useState, useEffect } from 'react';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { useCartContext } from '../../context/Cart/CartContext';
import useLocalStorage from '../../hook/useLocalStorage';
import { IProducts } from '../../types/productsType';
import { Button } from '../';
import ShopCartItem from '../ShopCartItem/ShopCartItem';
import emptyCartImage from '../../assets/image/empty-cart.png';
import './ShopCart.css';

const ShopCart: React.FC = () => {
  const { state, dispath } = useCartContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addAnimation, setAddAnimation] = useState<boolean>(false);

  const { getStorage } = useLocalStorage();
  const totalPrice = state
    .reduce((prev, item) => (prev += (item.price - (item.price * item.discountPercent) / 100) * item.count), 0)
    .toFixed(2);

  useEffect(() => {
    const cartData = getStorage('SHOP_CART');
    dispath({ type: 'SET_CART', payload: cartData });
  }, []);
  useEffect(() => {
    setAddAnimation(true);
    setTimeout(() => {
      setAddAnimation(false);
    }, 1000);
  }, [state]);
  return (
    <div>
      <div onClick={() => setIsOpen(false)} className={`cart-overlay ${isOpen ? 'show' : ''}`}></div>
      <div onClick={() => setIsOpen(!isOpen)} className='cart'>
        <div className='cart-icons'>
          <span className={`cart-quantity ${addAnimation ? 'active' : ''}`}>
            {state.reduce((prev, pro) => (prev += pro.count), 0)}
          </span>
          <MdOutlineShoppingBag className='cart-icon' />
        </div>
        <span className='cart-price'>{totalPrice} $</span>
      </div>
      <div className={`cart-wrapper ${isOpen ? 'open' : ''}`}>
        <div className='cart-wrapper__header'>
          <h2 className='cart-title'>Shoping Cart</h2>
        </div>
        <div className='cart-wrapper__body'>
          {state.length <= 0 ? (
            <div className='empty-cart'>
              <img src={emptyCartImage} className='empty-cart__image' />
              <p className='empty-cart__text'>Oops! your cart is empty </p>
            </div>
          ) : (
            state.map((item: IProducts, i: number) => <ShopCartItem key={i} item={item} />)
          )}
        </div>
        <div className='cart-wrapper__footer'>
          <h2 className='cart-wrapper__footer__total-price'>Total price : {totalPrice} $</h2>
          <Button className='cart-wrapper__footer__button'>check out</Button>
        </div>
      </div>
    </div>
  );
};

export default ShopCart;
