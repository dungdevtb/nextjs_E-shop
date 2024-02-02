import CheckoutStatus from '../../components/checkout-status';
import Item from './item';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  actionGetDetailCart,
  actionUpdateAddress,
  actionGetDetailUser,
  actionCreateNewOrder
} from 'pages/common';
import { formatMoney } from 'pages/common';

const ShoppingCart = () => {
  const [dataCart, setDataCart] = useState<any>([]);
  const router = useRouter();
  const [orderProducts, setOrderProducts] = useState<any>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [infoUser, setInfoUser] = useState<any>(null)
  const [activeIndex, setActiveIndex] = useState<number>();
  const [activeDeli, setActiveDeli] = useState<any>(null);

  const paymentMethod = [
    {
      value: 0,
      name: 'Payment on delivery'
    },
    {
      value: 1,
      name: 'Payment online'
    }
  ]

  const deliveryMethod = [
    {
      value: 0,
      name: 'Regular shipping',
      price: 20000
    },
    {
      value: 1,
      name: 'Express shipping',
      price: 50000
    }
  ]

  useEffect(() => {
    (async () => {
      await actionGetDetailCart({}).then((res) => {
        setDataCart(res)
      })

      const idUser = JSON.parse(localStorage.getItem('user') || '{}').id
      await actionGetDetailUser({ id: idUser }).then((user) => {
        setInfoUser(user)
      })
    })()
  }, [])

  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(event.target.checked);
    if (event.target.checked) {
      let arrALl = dataCart?.cart_product?.map((item: any) => {
        return {
          // product_id: item?.product_id,
          // size_id: item?.size_id,
          // color_id: item?.color_id,
          // quantity: item?.quantity,
          ...item,
          selected: true
        }
      })

      setOrderProducts(arrALl)
    } else {
      setOrderProducts([])
    }
  }

  const handleItemSelectChange = (e: any, itemId: number) => {
    if (dataCart?.cart_product.length > 0) {
      const row = dataCart?.cart_product.find((item: any) => item.id === itemId);
      if (e.target.checked) {
        // setOrderProducts([
        //   ...orderProducts,
        //   {
        //     id: itemId,
        //     product_id: row?.product_id,
        //     size_id: row?.size_id,
        //     color_id: row?.color_id,
        //     quantity: row?.quantity
        //   }])
        setOrderProducts([
          ...orderProducts, { ...row }
        ])
      } else {
        setOrderProducts(orderProducts.filter((item: any) => item.id !== itemId))
      }
    }
  }

  const handleChangeInfo = (event: any) => {
    const { name, value, } = event.target;

    if (infoUser && infoUser?.id) {
      setInfoUser((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const priceTotal = () => {
    let totalPrice = 0;

    if (orderProducts.length > 0) {
      orderProducts.map((item: any) => {
        if (item?.product.discount > 0) {
          return totalPrice += item?.product.discount_price * item.quantity
        } else {
          return totalPrice += item?.product.sell_price * item.quantity
        }
      });
    }

    if (activeDeli?.price > 0 && totalPrice > 0) {
      totalPrice += activeDeli?.price
    }

    return totalPrice;
  }

  const handleUpdateAddress = async () => {
    await actionUpdateAddress({
      id: infoUser?.id,
      address: infoUser?.address,
      mobile: infoUser?.mobile
    })
  }

  const handleOrderNow = async () => {
    let newOrderProducts = orderProducts.map((item: any) => {
      return {
        product_id: item?.product_id,
        size_id: item?.size_id,
        color_id: item?.color_id,
        quantity: item?.quantity
      }
    })

    let dataPayload = {
      payment_type: activeIndex,
      delivery_type: activeDeli?.value,
      note: '',
      fee_delivery: activeDeli?.price,
      total: priceTotal(),
      customer_id: infoUser?.id,
      order_product: newOrderProducts
    }

    if (infoUser?.address !== null && infoUser?.address.trim() !== '') {
      console.log(dataPayload);
      // await actionCreateNewOrder(dataPayload)
    }
  }

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {dataCart?.cart_product?.length > 0 &&
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: 'left' }}>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                      style={{ appearance: 'auto' }}
                    />
                    &nbsp; Select All
                  </th>
                  <th style={{ textAlign: 'left' }}>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th></th>
                </tr>

                {dataCart?.cart_product.map((item: any) => (
                  <Item
                    key={item.id}
                    cart_product={item}
                    setDataCart={setDataCart}
                    orderProducts={orderProducts}
                    handleItemSelectChange={handleItemSelectChange}
                  />
                ))}
              </tbody>
            </table>
          }

          {dataCart?.cart_product?.length === 0 &&
            <p style={{ textAlign: 'center' }}>Nothing in the cart</p>
          }
        </div>

        <div className="checkout-content">
          <div className="checkout__col-6">
            <div className="block">
              <h3 className="block__title">Customer information</h3>
              {(infoUser && infoUser?.id) &&
                <form className="form">
                  <div className="form__input-row form__input-row--two">
                    {/* <div className="form__col">
                      <img src={infoUser?.avatar} alt="" style={{ width: '100px', }} />
                    </div> */}
                  </div>
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="First name"
                        value={infoUser?.username}
                      />
                    </div>
                  </div>
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="email"
                        placeholder="Email"
                        value={infoUser?.email}
                      />
                    </div>
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="number"
                        placeholder="Phone number"
                        name='mobile'
                        onChange={handleChangeInfo}
                        value={infoUser?.mobile}
                      />
                    </div>
                  </div>
                  <div className="form__input-row">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Address"
                        name='address'
                        onChange={handleChangeInfo}
                        value={infoUser?.address}
                      />
                      {infoUser?.address == null || infoUser?.address.trim() == "" && (
                        <p className="message message--error">
                          Please enter your shipping address
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form__input-row">
                    <div className="form__col">
                      <button className="btn btn--rounded btn--yellow" onClick={handleUpdateAddress}>Update</button>
                    </div>
                  </div>
                </form>
              }
            </div>
          </div>

          <div className="checkout__col-6" >
            <div className="block">
              <h3 className="block__title">Payment method</h3>
              <ul className="round-options round-options--three">
                {paymentMethod.map((item: any, index: number) => (
                  <li
                    className={`round-item ${activeIndex === index ? 'active' : ''}`}
                    key={item.value}
                    value={item.value}
                    onClick={() => setActiveIndex(index)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="block">
              <h3 className="block__title">Delivery method</h3>
              <ul className="round-options round-options--two">
                {deliveryMethod.map((item: any, index: number) => (
                  <li
                    className={`round-item round-item--bg ${activeDeli?.value === index ? 'active' : ''}`}
                    value={item.value}
                    key={item.value}
                    onClick={() => setActiveDeli(item)}
                  >
                    <span>{item.name}</span>
                    <p>{formatMoney(item.price) + ' đ'}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="block">
              <h3 className="block__title">Add voucher code</h3>
              <input type="text" placeholder="Voucher Code" className="cart__promo-code" />
            </div>
          </div>
        </div>

        <div className="cart-actions">
          <a onClick={() => router.push('/products')} className="cart__btn-back"><i className="icon-left"></i> Continue Shopping</a>
          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">Total cost <strong>{formatMoney(priceTotal().toFixed(2)) + ' VND'} </strong></p>
            <a onClick={handleOrderNow} className="btn btn--rounded btn--yellow">Buy now</a>
            {/* <a onClick={() => router.push('/cart/checkout')} className="btn btn--rounded btn--yellow">Buy now</a> */}
          </div>
        </div>
      </div>
    </section>
  )
};
export default ShoppingCart