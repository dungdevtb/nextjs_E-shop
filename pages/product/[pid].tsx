import { useState } from 'react';
import Footer from '../../components/footer';
import Layout from '../../layouts/Main';
import Breadcrumb from '../../components/breadcrumb';
import ProductsFeatured from '../../components/products-featured';
import Gallery from '../../components/product-single/gallery';
import Content from '../../components/product-single/content';
import Description from '../../components/product-single/description';
import Reviews from '../../components/product-single/reviews';
import { server } from '../../utils/server';
import useSwr from 'swr';
import { useParams } from 'next/navigation';

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

const Product = () => {
  const [showBlock, setShowBlock] = useState('description');
  const params = useParams();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/product/get-detail-product?id=${params?.pid}`, fetcher)

  const uniqueProducts: { [key: string]: UniqueColor } = {};
  data?.data?.colors.forEach((color: Color) => {
    const { name, image } = color;
    if (!uniqueProducts[name]) {
      uniqueProducts[name] = { name, image };
    }
  });
  const uniColor: UniqueColor[] = Object.values(uniqueProducts);

  const lengthReview = data?.data?.comments?.length

  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={uniColor} />
            <Content product={data?.data} colors={uniColor} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button type="button" onClick={() => setShowBlock('description')} className={`btn btn--rounded ${showBlock === 'description' ? 'btn--active' : ''}`}>Description</button>
              <button type="button" onClick={() => setShowBlock('reviews')} className={`btn btn--rounded ${showBlock === 'reviews' ? 'btn--active' : ''}`}>Reviews ({lengthReview})</button>
            </div>

            <Description show={showBlock === 'description'} />
            <Reviews product={data?.data} show={showBlock === 'reviews'} />
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
}

export default Product
