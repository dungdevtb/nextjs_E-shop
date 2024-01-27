import Link from 'next/link';
import { some } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavProduct } from 'store/reducers/user';
import { RootState } from 'store';
import { ProductTypeList, Product } from 'types';
import { formatMoney } from 'pages/common';

interface Color {
  id: number;
  name: string;
  image: string;
  quantity: number;
  product_id: number;
}
interface UniqueColor {
  name: string;
  image: string;
}
const ProductItem = ({ record }: any) => {
  const dispatch = useDispatch();
  const { favProducts } = useSelector((state: RootState) => state.user);

  // const isFavourite = some(favProducts, productId => productId === id);

  // const toggleFav = () => {
  //   dispatch(toggleFavProduct(
  //     {
  //       id,
  //     }
  //   ))
  // }

  const uniqueProducts: { [key: string]: UniqueColor } = {};
  record?.colors.forEach((color: Color) => {
    const { name, image } = color;
    if (!uniqueProducts[name]) {
      uniqueProducts[name] = { name, image };
    }
  });
  const uniColor: UniqueColor[] = Object.values(uniqueProducts);

  return (
    <>
      <div className="product-item">
        <div className="product__image">
          <Link href={`/product/${record?.id}`}>
            {uniColor.length > 0 && <img src={uniColor[0].image} alt="product" />}
            {record?.discount != 0 && <span className="product__discount">{record?.discount}%</span>}
          </Link>
        </div>
        <div className="product__description">
          <h3>{record?.name}</h3>
          <div className={"product__price " + (record?.discount != 0 ? 'product__price--discount' : '')}>
            {record?.discount != 0 ?
              <>
                <span>{formatMoney(record?.discount_price) + ' đ'}</span>
                <h4 className='number-with-line'>{formatMoney(record?.sell_price) + ' đ'}</h4>
              </> :
              <h4>{formatMoney(record?.sell_price) + ' đ'}</h4>
            }
          </div>
        </div>
      </div>
    </>

    // <div className="product-item">
    //   <div className="product__image">
    //     <button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>

    //     <Link href={`/product/${record?.id}`}>

    //       <img src={images ? images[0] : ''} alt="product" />
    //       {discount &&
    //         <span className="product__discount">{discount}%</span>
    //       }

    //     </Link>
    //   </div>


    //   <div className="product__description">
    //     <h3>{name}</h3>
    //     <div className={"product__price " + (discount ? 'product__price--discount' : '')} >
    //       <h4>${currentPrice}</h4>

    //       {discount &&
    //         <span>${price}</span>
    //       }
    //     </div>
    //   </div>
    // </div>
  );
};


export default ProductItem