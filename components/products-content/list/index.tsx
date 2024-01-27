import useSwr from 'swr';
import ProductItem from '../../product-item';
import ProductsLoading from './loading';
import { Product } from 'types';

const ProductsContent = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data, error } = useSwr('/api/products', fetcher);

  const { data, error } = useSwr(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/product/get-list-product-web`, fetcher)

  if (error) return <div>Failed to load users</div>;
  return (
    <>
      {!data &&
        <ProductsLoading />
      }

      {data &&
        <section className="products-list">
          {data.data?.rows.map((item: Product) => {
            return (
              <ProductItem
                record={item}
              />
            )
          })}
        </section>
      }
    </>
  );
};

export default ProductsContent