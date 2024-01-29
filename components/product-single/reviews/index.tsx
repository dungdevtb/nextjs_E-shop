import ReviewsList from './reviews-list';
import Punctuation from './punctuation';
import { ProductType } from 'types';

type ReviewsProductType = {
  show: boolean;
  product: ProductType
}

const Reviews = ({ show, product }: any) => {
  const style = {
    display: show ? 'flex' : 'none',
  }

  return (
    <section style={style} className="product-single__reviews">
      <Punctuation
        punctuation={product?.comments.length}
        countOpinions={2}
        votes={[{ count: 1, value: 1 }, { count: 2, value: 2 }]}
        reviews={product?.comments}
      />
      <ReviewsList reviews={product?.comments} />
    </section>
  );
};

export default Reviews;
