import { useRouter } from "next/router";

const Breadcrumb = ({ product }: any) => {
  const router = useRouter();

  return (
    <section className="breadcrumb">
      <div className="container">
        <ul className="breadcrumb-list">
          <li onClick={() => router.push('/')}><i className="icon-home"></i></li>
          <li onClick={() => router.push('/products')}>All Products</li>
          {product && <li>{product?.name}</li>}
        </ul>
      </div>
    </section >
  )
}



export default Breadcrumb