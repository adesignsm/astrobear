import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState, useEffect, useMemo} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {Hero} from '~/components/Hero';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Astrobear | Home'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const categories = await storefront.query(CATEGORIES_QUERY);
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);
  const featuredCollection = collections.nodes[0];
  const featuredCategories = categories.collections.nodes;

  return defer({
    featuredCollection,
    recommendedProducts,
    featuredCategories,
    categories,
  });
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  return (
    <div className="home">
      <section className="hero-section" onScroll={(e) => handleScroll(e)}>
        <Hero />
      </section>
      <section className="featured-category-section">
        <h1> Shop by Category </h1>
        <FeaturedCategories data={data.featuredCategories} />
      </section>
      <div className="ticker-title">
        <div class="marquee">
          <ul class="marquee__content">
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
          </ul>
          <ul class="marquee__content" aria-hidden="true">
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
          </ul>
        </div>
      </div>
      <section className="recommended-products-section">
        <RecommendedProducts products={data.recommendedProducts} />
        <div className="shop-all-button">
          <a href="/collections">Shop Everything</a>
        </div>
      </section>
      <div className="ticker-title">
        <div class="marquee">
          <ul class="marquee__content">
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
          </ul>
          <ul class="marquee__content" aria-hidden="true">
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
            <li>
              <h1>NEW</h1>
            </li>
            <li></li>
            <li>
              <h1>DROPS</h1>
            </li>
          </ul>
        </div>
      </div>
      <section className="astrorewards-section">
        <div className="column-one">
          <h2>ASTROREWARDS</h2>
          <h3>Join the AstroCrew and get rewards on your purchases!</h3>
          <h5>Sign up now to recieve a bonus of 500 points</h5>
          <a href="/pages/astroreward">learn how it works</a>
        </div>
        <div className="column-two">
          <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/astorrewards-bear.png?v=1675461371" />
        </div>
      </section>
      <section className="about-section">
        <div className="row-one">
          <div className="column-one">
            <h3>About Astrobear</h3>
            <p>
              We provide an unparalleled experience. Our deep understanding and
              commitment to the cannabis industry makes us one of the largest
              weed delivery platforms in Canada. We use a strict grading system
              on our cannabis strains to ensure you get the highest quality and
              the safest medical marijuana.
            </p>
          </div>
          <div className="column-two">
            <div className="about-image-holster">
              <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/about-bg_435d9834-49b2-49a7-9704-3ee268b87128.png?v=1694718048" />
              <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/About_54b2f5f7-01c5-49e5-8442-e427b33e7e33.png?v=1694717776" />
            </div>
          </div>
        </div>
        <article className="list">
          <ul>
            <li>
              <div class="list-row">
                <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/samedaydelivery-icon.png?v=1675461658" />
                <h1>Same-day delivery</h1>
                <p>The fastest delivery to your door (Within the GTA only)</p>
              </div>
            </li>
            <li>
              <div class="list-row">
                <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/expeditedshipping-icon.png?v=1675461658" />
                <h1>Expedited Shipping</h1>
                <p>2-4 days Canada-wide shipping</p>
              </div>
            </li>
            <li>
              <div class="list-row">
                <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/ecofriendly-icon.png?v=1675461658" />
                <h1>Eco-friendly Shipping</h1>
                <p>We are committed to using biodegradable packaging options</p>
              </div>
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}

const FeaturedCategories = ({data}) => {
  const filterData = (array) => {
    return array
      .filter(
        (cat) =>
          (cat.title === 'EDIBLES' ||
            cat.title === 'FLOWERS' ||
            cat.title === 'MAGIC MUSHROOMS' ||
            cat.title === 'PRE-ROLLS' ||
            cat.title === 'Backwoods' ||
            cat.title === 'Accessories') &&
          cat,
      )
      .reverse();
  };

  const [position, setPosition] = useState({x: 0, y: 0});
  const filteredData = useMemo(() => filterData(data), [data]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({x: e.clientX, y: e.clientY});
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMouseEnter = (e) => {
    const descriptionCard = e.target.nextSibling.nextSibling;
    descriptionCard.classList.add('show');
  };

  const handleMouseLeave = (e) => {
    const descriptionCard = e.target.nextSibling.nextSibling;
    descriptionCard.classList.remove('show');
  };

  const handleClick = (e) => {
    window.location.href = `/collections/${e.target.dataset.handle}`;
  };

  return (
    <div className="category-section">
      {filteredData.map((cat) => {
        return (
          <div className="category-item">
            <img
              src={cat.image.url}
              onMouseOver={(e) => handleMouseEnter(e)}
              onMouseLeave={(e) => handleMouseLeave(e)}
              onClick={(e) => handleClick(e)}
              data-handle={cat.handle}
            />
            <h4>{cat.title} →</h4>
            <div
              className="description-card"
              style={{top: position.y + 20, left: position.x + 10}}
            >
              <div className="title-container">
                <h1>{cat.title}</h1>
              </div>
              {cat.description && (
                <div className="description-container">
                  <p>{cat.description}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery>;
 * }}
 */
export function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >
                  <img
                    src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/genericgradient_1.jpg?v=1675460933"
                    className="gradient-bg"
                  />
                  <Image
                    data={product.images.nodes[0]}
                    style={{transform: 'scale(0.8', pointerEvents: 'none'}}
                  />
                  <div className="product-details">
                    <h4>{product.title}</h4>
                    <div className="tags-container">
                      {product.collections.nodes.map((collection) => {
                        return (
                          <div className="tag">
                            <p>{collection.title}</p>
                          </div>
                        );
                      })}
                    </div>
                    <Link
                      key={product.id}
                      className="button-link"
                      to={`/products/${product.handle}`}
                    >
                      <button>
                        {Object.keys(product.variants).length > 1
                          ? 'Select options'
                          : 'Add To Cart'}
                      </button>
                    </Link>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const CATEGORIES_QUERY = `#graphql
  fragment ShopCategory on Collection {
    id
    title
    description
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }

  query ShopCategories($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    collections(first: 250, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...ShopCategory
      }
    }
  }
`;

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 250, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    tags
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    collections(first: 250) { # You can adjust the number of collections you want to retrieve
      nodes {
        id
        title
        handle
      }
    }
    variants(first: 10) { # Adjust the number of variants you want to retrieve
      nodes {
        id
        title
        sku
        selectedOptions {
          name
          value
        }
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
