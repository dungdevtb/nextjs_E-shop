import { useEffect, useState } from 'react';
import { formatMoney } from 'pages/common';
import CardColor from './../../products-filter/form-builder/checkbox-color/card-color';
import { actionAddToCart } from 'pages/common';


const Content = ({ product, colors }: any) => {
  const [count, setCount] = useState<number>(1);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [colorArr, setColorArr] = useState<any>([]);

  const [color, setColor] = useState<any>('');
  const [itemSize, setItemSize] = useState<any>(0);

  useEffect(() => {
    if (colors.length > 0)
      setColorArr(colors);
  }, [colors])

  const onSelectChange = (e: any) => {
    const size = product?.sizes.find((item: any) => item.id === Number(e.target.value))
    setItemSize(size)
    setColorArr(size?.size_color)
  }

  const handleClickColor = (item: any, index: number) => {
    setColor(item);
    setActiveIndex(index);
  }

  const decrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  }

  const addToCart = async () => {
    const user = await JSON.parse(localStorage.getItem('user') || '{}')
    const dataPayload = {
      customer_id: user.id,
      cart_product: {
        product_id: product?.id,
        quantity: count,
        size_id: itemSize?.id,
        color_id: color?.id
      }
    }
    await actionAddToCart(dataPayload)
  }


  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">Product ID:<br></br>{product?.id}</h5>
        <span className="product-on-sale">Sale - {product?.discount}%</span>
        <h2 className="product__name">{product?.name}</h2>

        <div className="product__prices">
          <h4>{formatMoney(product?.discount_price) + ' đ'}</h4>
          {product?.discount != 0 &&
            <span className='number-with-line'>{formatMoney(product?.sell_price) + ' đ'}</span>
          }
        </div>

        <div className="product__des">
          <p>{product?.description}</p>
        </div>
      </div>

      <div className="product-content__filters">
        <div className="product-filter-item">
          <h5>Size: <strong>See size table</strong></h5>
          <div className="checkbox-color-wrapper">
            <div className="select-wrapper">
              <select onChange={onSelectChange}>
                <option>Choose size</option>
                {product?.sizes.map((item: any) => (
                  <option value={item.id}>{item.size}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="product-filter-item">
          <h5>Color:</h5>
          <div className="checkbox-color-wrapper">
            {colorArr.length > 0 && colorArr?.map((item: any, index: number) => (
              <CardColor
                key={index}
                color={item?.image || item?.color?.image}
                name={item?.name || item?.color?.name}
                onClick={() => handleClickColor(item, index)}
                isActive={activeIndex === index}
              />
            ))}
          </div>
        </div>

        <div className="product-filter-item">
          <h5>Quantity: {product?.quantity}</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button type="button" onClick={decrement} className="quantity-button__btn">
                -
              </button>
              <span>{count}</span>
              <button type="button" onClick={increment} className="quantity-button__btn">
                +
              </button>
            </div>

            <button type="submit" onClick={() => addToCart()} className="btn btn--rounded btn--yellow">Add to cart</button>
            {/* <button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button> */}
          </div>
        </div>
      </div>
    </section >
  );
};

export default Content;
