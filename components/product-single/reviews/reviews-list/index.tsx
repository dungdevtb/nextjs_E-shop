import Rater from 'react-rater';
import createMarkup from 'utils/markup';
import { ReviewType } from 'types';

type ReviewsListType = {
  reviews: ReviewType[];
}

const ReviewsList = ({ reviews }: any) => {

  return (
    <section className="reviews-list">
      {reviews?.length > 0 && reviews.map((comment: any, index: number) => (
        <div key={index} className="review-item">
          <div className="review__avatar">
            <img src={comment?.customer?.avatar} alt="A" />
          </div>

          <div className="review__content">
            <h3>{comment?.customer?.name}</h3>
            <Rater total={5} interactive={false} rating={comment?.rating} />
            <div className="review__comment" dangerouslySetInnerHTML={createMarkup(comment?.comment_text)}>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ReviewsList;
