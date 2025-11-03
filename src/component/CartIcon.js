
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './CartIcon.css';
import { useSelector } from 'react-redux';

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.cartitems);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <NavLink
      to="/Cart"
      className={({ isActive }) =>
        'cart-icon-link' + (isActive ? ' active-cart-icon' : '')
      }
    >
      <FaShoppingCart size={24} />
      {totalItems > 0 && <span className="cart-count-badge">{totalItems}</span>}
    </NavLink>
  );
};

export default CartIcon;
