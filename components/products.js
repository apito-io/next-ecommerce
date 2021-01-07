import { useQuery } from '@apollo/client';
import ProductItem from './productItem';
import EmptySection from './emptySection';
import { PRODUCTS, SORT_PRODUCT_SECTION } from '../apollo/client/queries';
import ProductsGrid from './productsGrid';
import offlineProducts from '../db/offlineData/products';

export default function Products({ category }) {
  const sortQueryResult = useQuery(SORT_PRODUCT_SECTION);

  if (category) {
    var { data, loading, error } = useQuery(PRODUCTS, {
      variables: {
        category: category,
      },
    });
  } else if (!category) {
    var { data, loading, error } = useQuery(PRODUCTS);
  }

  if (loading)
    return (
      <>
        <p className="loading">Loading...</p>
        <style jsx>{`
          .loading {
            width: 100%;
            text-align: center;
            align-self: center;
            font-size: 18px;
          }
        `}</style>
      </>
    );

  // Offline data
  if (!data?.products || error)
    return (
      <ProductsGrid>
        {offlineProducts.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            rating={product.rating}
            img_url={product.img_url}
            price={product.price}
          />
        ))}
      </ProductsGrid>
    );

  // if (error) return <EmptySection />;

  // if (!data.products) return <EmptySection />;

  return (
    <ProductsGrid>
      {data.products.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          name={product?.data?.name}
          rating={product?.data?.rating}
          img_url={product?.data?.image?.url}
          price={product?.data?.price}
        />
      ))}
    </ProductsGrid>
  );
}
