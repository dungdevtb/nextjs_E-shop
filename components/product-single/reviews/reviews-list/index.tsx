import { useState, useRef } from 'react';
import Rater from 'react-rater';
import createMarkup from 'utils/markup';
import useOnClickOutside from "use-onclickoutside";
import { FaComment } from "react-icons/fa";

// import { ReviewType } from 'types';

// type ReviewsListType = {
//   reviews: ReviewType[];
// }

const ReviewsList = ({ reviews }: any) => {
  const [showAddCmt, setShowAddCmt] = useState<any>(false);

  const searchRef = useRef(null);

  const closeSearch = () => {
    setShowAddCmt(false);
  };

  useOnClickOutside(searchRef, closeSearch);


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

      <div className="review-item">
        <div className="review__avatar">
          <img src={'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'} alt="A" />
        </div>

        <button
          ref={searchRef}
          className={`comment-form-wrapper ${showAddCmt ? "comment-form--active" : ""
            }`}
        >
          <form className={`comment-form`}>
            <i
              className="icon-cancel"
              onClick={() => setShowAddCmt(!showAddCmt)}
            ></i>
            <input
              type="text"
              name="comment"
              placeholder="Enter the product you are looking for"
              style={{ border: '1px solid #ccc' }}
            />
          </form>
          <i onClick={() => setShowAddCmt(!showAddCmt)}>
            <FaComment />
          </i>
        </button>
      </div>


      {/* <div className="punctuation-btn-wrapper">
        <button type="button" className="btn btn--rounded btn--yellow">Add comment</button>
      </div> */}
    </section>
  );
};

export default ReviewsList;
