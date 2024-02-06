import { NavLink } from "@remix-run/react"

export const BundleAndSave = () => {
    return (
        <>
            <div className='bundles-container'>
                <div id='zerogravity-container' className='bundle-container'>
                    <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/zerogravity.png?v=1703378344" />
                    <h1>Zero Gravity</h1>
                    <h3>Mix of 4</h3>
                    <p>
                        The perfect indica nightcap designed to unwind your mind so you can embark on an elevated escape and ~FLOAT~
                        in a state of profound relaxation.
                        <br />
                        <br />
                        Geared towards the cannabis curious and/or the discerning connoisseur.
                    </p>
                    <div className='includes-container'>
                        <div className='whats-inside'>
                            <h4>What's Inside</h4>
                            <ul>
                                <li>THC: 19~27%</li>
                                <li>CBD: 1~2%</li>
                            </ul>
                            <br />
                            <ul>
                                <li>7g Project 4516</li>
                                <li>7g White Marshmallow</li>
                                <li>7g Cereal Milk</li>
                                <li>7g Pink Zombie</li>
                            </ul>
                        </div>
                        <div className='effects'>
                            <h4>Effects</h4>
                            <ul>
                                <li>
                                    <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/chill.png?v=1703177639" />
                                    <p>Relaxed</p>
                                </li>
                                <li>
                                    <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/calm.png?v=1703265864" />
                                    <p>Calm</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='cta-container'>
                        <NavLink end prefetch="intent" to="/products/zerogravity">
                            <button id='zerogravity-cta' className='cta-button'>View</button>
                        </NavLink>
                    </div>
                </div>
                <div id='skyrocket-container' className='bundle-container'>
                    <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/skyrocket.png?v=1703378343" />
                    <h1>Skyrocket</h1>
                    <h3>Mix of 4</h3>
                    <p>
                        When there's a million things to knock out your to-do list, or you’re finally ready to start that creative project you’ve been planning to abort - Astrobear’s Sky Rocket bundle will get you ready for blast-off!
                        <br />
                        <br />
                        Geared towards the cannabis curious and/or the discerning connoisseur.
                    </p>
                    <div className='includes-container'>
                        <div className='whats-inside'>
                            <h4>What's Inside</h4>
                            <ul>
                                <li>THC: 20~25%</li>
                                <li>CBD: below 1%</li>
                            </ul>
                            <br />
                            <ul>
                                <li>7g Pink Zombie</li>
                                <li>7g Ice Cream Cake</li>
                                <li>7g Space Cookies</li>
                                <li>7g Pink Lizard</li>
                            </ul>
                        </div>
                        <div className='effects'>
                            <h4>Effects</h4>
                            <ul>
                                <li>
                                    <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/energetic.png?v=1703177638" />
                                    <p>Energizing</p>
                                </li>
                                <li>
                                    <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/focused.png?v=1703265864" />
                                    <p>Focused</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='cta-container'>
                        <NavLink end prefetch="intent" to="/products/skyrocket">
                            <button id='skyrocket-cta' className='cta-button'>View</button>
                        </NavLink>
                    </div>
                </div>
                <div id='holiday-bundle-container' className='bundle-container'>
                    <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/holiday.png?v=1703378343" />
                    <h1>Ho-Ho-Holiday Bundle</h1>
                    <h3>Mix of 4</h3>
                    <p>
                        This fun hybrid bundle is ready for any holiday adventure with your Astrocrew. Whether enjoying a day in the snow, a cozy movie, or a tranquil evening by the fireplace - try this bundle to make your holidays even more jolly. 
                        <br />
                        <br />
                        Geared towards the cannabis curious and/or the discerning connoisseur.
                    </p>
                    <div className='includes-container'>
                        <div className='whats-inside'>
                            <h4>What's Inside</h4>
                            <ul>
                                <li>THC: 15~20%</li>
                                <li>CBD: 1~3%</li>
                            </ul>
                            <br />
                            <ul>
                                <li>7g Space Cookies</li>
                                <li>7g Ice Cream Cake</li>
                                <li>7g Cereal Milk</li>
                                <li>7g Pink Zombie</li>
                            </ul>
                        </div>
                        <div className='effects'>
                            <h4>Effects</h4>
                            <ul>
                                <li>
                                    <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/balanced.png?v=1703265864" />
                                    <p>Balanced</p>
                                </li>
                                <li>
                                    <img src="https://cdn.shopify.com/s/files/1/0507/4780/1765/files/euphoria.png?v=1703265864" />
                                    <p>Euphoria</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='cta-container'>
                        <NavLink end prefetch="intent" to="/products/holiday">
                            <button id='holiday-bundle-cta' className='cta-button'>View</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}