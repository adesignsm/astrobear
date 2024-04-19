import {Suspense, useState, useEffect} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData} from '@remix-run/react';
import { useLocation } from '@remix-run/react';
// import Client from 'shopify-buy';
import {RecommendedProducts} from './_index';

import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
} from '@shopify/hydrogen';
import {getVariantUrl} from '~/utils';

const totalQuantity = [];

/**
 * @type {MetaFunction<typeof loader>}
 */
// export const meta = ({data}) => {
//   return [{title: `Astrobear | ${data?.product.title ?? ''}`}];
// };

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;

  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v') &&

      !option.name.startsWith('fbclid'),
  );

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  let metaValues, parsedMetaValues;

  if (product.title === 'BUILD YOUR OWN BUNDLE') {
    metaValues = product.metafield !== null ? product.metafield.value : null;
    parsedMetaValues = JSON.parse(metaValues);
  }

  const bundleProducts = [];

  if (parsedMetaValues && Array.isArray(parsedMetaValues)) {
    for (const id of parsedMetaValues) {
      try {
        const { product: bundleProduct } = await storefront.query(BUNDLE_PRODUCTS_QUERY, {
          variables: { id, selectedOptions }
        });
        bundleProducts.push(bundleProduct);
      } catch (error) {
        console.error(`Error fetching bundle product for id ${id}:`, error);
      }
    }
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  const variants = storefront.query(VARIANTS_QUERY, {
    variables: {handle},
  });

  return defer({product, variants, bundleProducts});
}

/**
 * @param {{
 *   product: ProductFragment;
 *   request: Request;
 * }}
 */
function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

/**
 * @param {LoaderFunctionArgs}
 */
export default function Product() {
  /** @type {LoaderReturnData} */
  const {product, variants, bundleProducts} = useLoaderData();
  const {selectedVariant} = product;

  return (
    <div className={`product ${bundleProducts.length > 0 && "product-byob"} `}>
      <ProductImage image={selectedVariant?.image} bundleProducts={bundleProducts} />{/*</div*/}
      {bundleProducts ? (
        <div className='byob-styled-container'>
          <ProductMain
            selectedVariant={selectedVariant}
            product={product}
            variants={variants}
          />
          <div className='product-selection'>
            <ul className='products'>
              {bundleProducts && bundleProducts.length > 0 && ( bundleProducts.map((product) => {
                return (
                  <li>
                    <img src={product.images.edges[0].node.src} />
                    <h4>{product.title}</h4>
                    <ProductForm
                      product={product}
                      selectedVariant={selectedVariant}
                      variants={[]}
                    />
                  </li>
                )
              }))}
            </ul>
          </div>
        </div>
      ) : (
        <ProductMain
          selectedVariant={selectedVariant}
          product={product}
          variants={variants}
        />
      )}
    </div>
  );
}

/**
 * @param {{image: ProductVariantFragment['image']}}
 */
function ProductImage({image}) {


  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className="product-image">
      <Image
        alt={image.altText || 'Product Image'}
        data={image}
        key={image.id}
      />
    </div>
  );
}

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Promise<ProductVariantsQuery>;
 * }}
 */
function ProductMain({selectedVariant, product, variants}) {
  const {title, descriptionHtml} = product;
  return (
    <div className="product-main">
      <h1>{title}</h1>
      <ProductPrice selectedVariant={selectedVariant} />
      <br />
      <Suspense
        fallback={
          <ProductForm
            product={product}
            selectedVariant={selectedVariant}
            variants={[]}
          />
        }
      >
        <Await
          errorElement="There was a problem loading product variants"
          resolve={variants}
        >
          {(data) => (
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={data.product?.variants.nodes || []}
            />
          )}
        </Await>
      </Suspense>
      <br />
      <br />
      <p>
        <strong>Description</strong>
      </p>
      <br />
      <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
      <br />
    </div>
  );
}

/**
 * @param {{
 *   selectedVariant: ProductFragment['selectedVariant'];
 * }}
 */
function ProductPrice({selectedVariant}) {
  return (
    <div className="product-price">
      {selectedVariant.product.title !== 'BUILD YOUR OWN BUNDLE' ? (
        selectedVariant?.compareAtPrice ? (
          <>
            <p>Sale</p>
            <br />
            <div className="product-price-on-sale">
              {selectedVariant ? <Money data={selectedVariant.price} /> : null}
                <s><Money data={selectedVariant.compareAtPrice} /></s>
            </div>
          </>
        ) : (
          selectedVariant?.price && <Money data={selectedVariant?.price} />
        )
      ) : (
        <h4>From $190.00</h4>
      )}
    </div>
  );
}

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Array<ProductVariantFragment>;
 * }}
 */
function ProductForm({product, selectedVariant, variants}) {
  const location = useLocation();
  const [quantity, setQuantity] = useState(location.pathname.includes('build-your-own-bundle') ? 0 : 1);

  const handleInputChange = (e) => {
    setQuantity(e.target.value)
  }

  const handleDecrease = () => {
    if (location.pathname.includes('build-your-own-bundle')) {
      if (totalQuantity.length != 0) {
        setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
        totalQuantity.pop();
      } else {
        return;
      }
    } else {
      setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
    }
  }

  const handleIncrease = () => {
    if (location.pathname.includes('build-your-own-bundle')) {
      if (totalQuantity.length <= 3) {
        setQuantity((prev) => prev + 1);
        totalQuantity.push(product)
      } else {
        return;
      }
    } else {
      setQuantity((prev) => prev + 1);
    }
  }

  // console.log(totalQuantity)
  
  return (
    <div className="product-form">
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      <br />
      {product.title !== 'BUILD YOUR OWN BUNDLE' && (
        <div className='quantity-container'>
          <button className='decrease' onClick={handleDecrease}> - </button>
          <input minLength={0} maxLength={1} type='number' value={quantity} onChange={(e) => {location.pathname.includes('build-your-own-bundle') ? null : handleInputChange(e)}}/>
          <button className='increase' onClick={handleIncrease}> + </button>
        </div>
      )}
      {!location.pathname.includes('build-your-own-bundle') ? (
        <AddToCartButton
          disabled={!selectedVariant || !selectedVariant.availableForSale}
          onClick={() => {
            window.location.href = window.location.href + '#cart-aside';
            // console.log(selectedVariant)
          }}
          lines={selectedVariant
            ? [{
                merchandiseId: selectedVariant.id,
                quantity: parseInt(quantity),
              }] : []}
        >
          {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
        </AddToCartButton>
      ) : (
        <AddToCartButton
          disabled={!selectedVariant || !selectedVariant.availableForSale}
          onClick={() => {
            if (totalQuantity.length < 4) {
              alert('you need to select 4 products to save on a bundle!');
            } else {
              window.location.href = window.location.href + '#cart-aside';
            }
          }}
          lines={selectedVariant && totalQuantity.length > 3
            ? totalQuantity.map(item => ({
                merchandiseId: item.variants.nodes[0].id,
              })) : []}
        >
          {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
        </AddToCartButton>
      )}
    </div>
  );
}

/**
 * @param {{option: VariantOption}}
 */
function ProductOptions({option}) {
  return (
    <div className="product-options" key={option.name}>
      <h5>{option.name}</h5>
      <div className="product-options-grid">
        {option.values.map(({value, isAvailable, isActive, to}) => {
          return (
            <Link
              className="product-options-item"
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
              style={{
                border: isActive ? '1px solid black' : '1px solid transparent',
                opacity: isAvailable ? 1 : 0.3,
                backgroundColor: isActive ? '#e2f1c3' : 'transparent',
                color: isActive ? '#000' : '#fff',
              }}
            >
              {value}
            </Link>
          );
        })}
      </div>
      <br />
    </div>
  );
}

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: CartLineInput[];
 *   onClick?: () => void;
 * }}
 */
function AddToCartButton({analytics, children, disabled, lines, onClick}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    images(first: 10) {
      edges {
        node {
          id
          src
          altText
          width
          height
        }
      }
    }
    metafield(namespace: "custom" key: "bundleProducts") {
      key
      value
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const BUNDLE_PRODUCTS_QUERY = `#graphql
  query BundleProduct(
    $country: CountryCode
    $id: ID!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(id: $id) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@remix-run/react').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantsQuery} ProductVariantsQuery */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
/** @typedef {import('@shopify/hydrogen').VariantOption} VariantOption */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineInput} CartLineInput */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').SelectedOption} SelectedOption */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
