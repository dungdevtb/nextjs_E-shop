import ProductItem from "./../../product-item";
import { ProductTypeList } from "types";

// import Swiper core and required components
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

type ProductsCarouselType = {
  products: ProductTypeList[];
};

const ProductsCarousel = ({ products }: any) => {
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [centeredSlides, setCenteredSlides] = useState(false);
  const [spaceBetween, setSpaceBetween] = useState(30);

  useEffect(() => {
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  function updateWindowSize() {
    setSlidesPerView(1);
    setSpaceBetween(30);
    setCenteredSlides(true);

    if (window.innerWidth > 768) {
      setSlidesPerView(2);
      setSpaceBetween(40);
      setCenteredSlides(false);
    }
    if (window.innerWidth > 1024) {
      setSlidesPerView(3);
      setSpaceBetween(65);
      setCenteredSlides(false);
    }
  }

  if (!products) return <div>Loading</div>;

  return (
    <div className="products-carousel">
      <Swiper
        spaceBetween={spaceBetween}
        loop={true}
        centeredSlides={centeredSlides}
        watchOverflow={true}
        slidesPerView={slidesPerView}
        className="swiper-wrapper"
      >
        {products.map((item: any) => (
          <SwiperSlide key={item.id}>
            <ProductItem record={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;
