import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Contact} from '~/components/Contact';
import {BundleAndSave} from '~/components/BundleAndSave';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Astrobear | ${data?.page.title ?? ''}`}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, context}) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
    },
  });

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  return json({page});
}

export default function Page() {
  /** @type {LoaderReturnData} */
  const {page} = useLoaderData();

  console.log(page)

  return (
    <div className="page">
      {page.title !== 'CONTACT US' ? (
          page.title === 'Bundle & save' ? (
            <BundleAndSave />
          ) : (
            <>
              <header className='page-header'>
                <h1 className={`title-${page.title}`}>{page.title}</h1>
              </header>
              <main dangerouslySetInnerHTML={{__html: page.body}} />
            </>
          )
        ) : (
          <Contact />
        )}
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
