
import { formatMoney } from 'pages/common';
import { actionRemoveFromCart, actionGetDetailCart, actionAddToCart } from 'pages/common';
import { useEffect, useState } from 'react';

const CartItem = ({ cart_product, setDataCart, orderProducts, handleItemSelectChange }: any) => {
  const [count, setCount] = useState<number>(cart_product?.quantity);

  useEffect(() => {
    (async () => {
      const user = await JSON.parse(localStorage.getItem('user') || '{}')
      const dataPayload = {
        customer_id: user.id,
        cart_product: {
          product_id: cart_product?.product_id,
          quantity: count,
          size_id: cart_product?.size_id,
          color_id: cart_product?.color_id
        }
      }

      await actionAddToCart(dataPayload)
    })()
  }, [count])

  const removeFromCart = async (cart_product: any) => {
    await actionRemoveFromCart({
      cart_id: cart_product?.cart_id,
      product_id: cart_product?.product?.id
    })

    await actionGetDetailCart({}).then((res) => {
      setDataCart(res)
    })
  }

  const decrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  return (
    <tr>
      <td style={{ float: 'left' }}>
        <input
          type="checkbox"
          style={{ appearance: 'auto' }}
          checked={orderProducts[0]?.selected}
          onChange={(e) => handleItemSelectChange(e, cart_product?.id)} />
      </td>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={cart_product?.color?.image} alt="" />
            {cart_product?.product?.discount > 0 && <span className="discount_cart_item">{cart_product?.product?.discount.toFixed(2)}%</span>}
          </div>

          <div className="cart-product__content">
            <h3>{cart_product?.product?.name}</h3>
            <p>#{cart_product?.product?.id}</p>
          </div>
        </div>
      </td>
      <td className="cart-item-before" data-label="Color">{cart_product?.color?.name}</td>
      <td className="cart-item-before" data-label="Size">{cart_product?.size?.size}</td>
      <td>
        <div className="quantity-button">
          <button type="button" onClick={decrement} className="quantity-button__btn">-</button>
          <span>{count}</span>
          <button type="button" onClick={() => setCount(count + 1)} className="quantity-button__btn">+</button>
        </div>
      </td>
      {cart_product?.product?.discount > 0 ?
        <td>{formatMoney(cart_product?.product?.discount_price) + '₫'}</td>
        : <td>{formatMoney(cart_product?.product?.sell_price) + '₫'}</td>
      }
      <td className="cart-item-cancel"><i className="icon-cancel" onClick={() => removeFromCart(cart_product)}></i></td>
    </tr>
  )
};


export default CartItem