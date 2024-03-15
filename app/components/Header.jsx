import {Await, NavLink} from '@remix-run/react';
import {Suspense, useState, useEffect} from 'react';
import {useRootLoaderData} from '~/root';

/*icons */
import ACCOUNT_ICON from '../assets/icon-account.png';
import SEARCH_ICON from '../assets/icon-search.png';
import CART_ICON from '../assets/icon-cart.png';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart}) {
  const {shop, menu} = header;
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    setPrevScrollPos(window.pageYOffset);
    
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolledDown(currentScrollPos > prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll); // Add touch event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll); // Remove touch event listener
    };
  }, [prevScrollPos]);

  return (
    <header className={`header ${isScrolledDown ? 'scrolled' : ''}`}>
      <NavLink className='header-logo' prefetch="intent" to="/" style={activeLinkStyle} end>
        <img src='https://cdn.shopify.com/s/files/1/0507/4780/1765/files/astrobear_wordmark_black_4x_1bc009de-3a24-4332-a956-aebe22803029.png?v=1666159004' />
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 * }}
 */
export function HeaderMenu({menu, primaryDomainUrl, viewport, cart}) {
  const {publicStoreDomain} = useRootLoaderData();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const className = `header-menu-${viewport}`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  const toggleShopDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          to="/"
          className='header-menu-item'
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
          if (!item.url) return null;

          // if the url is internal, we strip the domain
          const url =
            item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;

          if (item.title === 'SHOP') {
            return (
              <div
                key={item.id}
                className={`header-menu-item ${isDropdownOpen ? 'active' : ''}`}
                onClick={toggleShopDropdown}
              >
                <p className="header-menu-item" key={item.id}>
                  {item.title}
                </p>
                <div className={`dropdown-content ${isDropdownOpen ? 'active' : null}`}>
                    {item.items.map((subItem) => {
                      return (
                        <NavLink
                          className="header-menu-item"
                          end
                          onClick={closeAside}
                          prefetch="intent"
                          to={
                            subItem.title !== 'BUNDLE & SAVE' ? `/collections/${subItem.url.split('/collections/')[1]}` : subItem.url
                          }
                        >
                          {subItem.title}
                        </NavLink>
                      )
                    })}
                  </div>
              </div>
            );
          }
          if (item.type !== 'CATALOG') {
            // console.log(item)
            return (
              <NavLink
                className={`header-menu-item ${item.title === 'BUNDLE & SAVE' ? 'custom' : ''}`}
                end
                key={item.id}
                onClick={closeAside}
                prefetch="intent"
                to={url}
              >
                {item.title}
              </NavLink>
            );
          }
      })}
      {viewport === 'mobile' && (
        <div className='mobile-ctas'>
          <NavLink className='desktop-cta' prefetch="intent" to="/account" style={activeLinkStyle} onClick={() => window.location.href="/account/orders"}>
            {/* {isLoggedIn ? 'Account' : 'Sign in'} */}
            <img src={ACCOUNT_ICON} />
          </NavLink>
          <SearchToggle />
          <CartToggle cart={cart} />
        </div>
      )}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <SearchToggle />
      <NavLink className='desktop-cta' prefetch="intent" to="/account" style={activeLinkStyle}>
        {/* {isLoggedIn ? 'Account' : 'Sign in'} */}
        <img src={ACCOUNT_ICON} />
      </NavLink>
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return <a className='desktop-cta' href="#search-aside"><img src={SEARCH_ICON} /></a>;
}

/**
 * @param {{count: number}}
 */
function CartBadge({count}) {
  return <a className='desktop-cta' href="#cart-aside"><img src={CART_ICON} /><span className='cart-count'>{count}</span></a>;
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>} HeaderProps */
/** @typedef {'desktop' | 'mobile'} Viewport */

/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('./Layout').LayoutProps} LayoutProps */
