const Gallery = ({ images }: any) => {
  const featImage = images[0];

  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {images.map((item: any) => (
          <div key={item} className="product-gallery__thumb">
            <img src={item?.image} alt="" />
          </div>
        ))}
      </div>

      <div className="product-gallery__image">
        <img src={featImage?.image} alt="" />
      </div>
    </section>
  );
};

export default Gallery;
