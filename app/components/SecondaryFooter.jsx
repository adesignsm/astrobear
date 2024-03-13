import { Link } from "@remix-run/react"

export const SecondaryFooter = () => {
    return (
        <>
            <footer className='footer'>
                <div className="navigation-container">
                    <nav className='shop-nav column'>
                        <h2>Shop</h2>
                        <ul>
                            <li><a href='/collections/flowers'>Flower</a></li>
                            <li><a href='/collections/edibles'>Edibles</a></li>
                            <li><a href='/collections/pre-rolls'>Pre-Rolls</a></li>
                            <li><a href='/collections/magic-mushrooms'>Mushrooms</a></li>
                            <li><a href='/pages/bundles'>Bundle & Save</a></li>
                            <li><a href='/collections/accessories'>Accessories</a></li>
                        </ul>
                    </nav>
                    <nav className='main-nav column'>
                        <h2><a href='/pages/about-us'>About</a></h2>
                        <h2><a href='/pages/faqs'>FAQ</a></h2>
                        <h2><a href='/pages/astroreward'>AstroRewards</a></h2>
                        <h2><a href='/pages/contact-us'>Contact</a></h2>
                    </nav>
                </div>
                <div className='newsletter column'>
                    <h2>Join the space club</h2>
                    <p>We promise to send you only cool things :)</p>
                    <div className='input-container'>
                        <input type='email' placeholder="email address"/>
                        <button type="submit"> → </button>
                    </div>
                </div>
            </footer>
        </>
    )
}