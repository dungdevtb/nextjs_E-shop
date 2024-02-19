import { ProductTypeList } from 'types';
import ProductsCarousel from './carousel';
import useSwr from 'swr';

const ProductsFeatured = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/product/get-list-product-web`, fetcher)

  let dataFetched: ProductTypeList[] = data?.data?.rows?.filter((item: any) => item.discount > 0)
  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
          <a href="/products" className="btn btn--rounded btn--border">Show All</a>
        </header>

        {dataFetched?.length > 0 &&
          <ProductsCarousel products={dataFetched} />
        }
      </div>
    </section>
  )
};

export default ProductsFeatured