import {useState, useEffect} from 'react';
import { NavLink } from "@remix-run/react"

export const Slider = ({ images, _index }) => {
    const [index, setIndex] = useState(_index);
    const [imageSet, setImageSet] = useState([]);

    useEffect(() => {
        setIndex(_index);
    }, [_index]);

    const nextSlide = () => {
        setIndex((prevIndex) =>
            prevIndex === images.edges.length - 1 ? 0 : prevIndex + 1
        );
    };
    
    const prevSlide = () => {
        setIndex((prevIndex) =>
            prevIndex === 0 ? images.edges.length - 1 : prevIndex - 1
        );
    };    

    useEffect(() => {
        if (images && images.edges) {
            setImageSet(images.edges);
        }
    }, [images])

    return (
        <div className="slider">
            {imageSet.length > 0 && index >= 0 && index < imageSet.length && (
                <img src={imageSet[index].node.url} alt="Slide" />
            )}
            <div className='button-container'>
                <button className="prev" onClick={prevSlide}>Previous</button>
                <button className="next" onClick={nextSlide}>Next</button>
            </div>
        </div>
    );
};

export const BundleAndSave = ({data}) => {
    const [zeroGravityImages, setZeroGravityImages] = useState([]);
    const [skyRocketImages, setSkyRocketImages] = useState([]);
    const [holidayImages, setHolidayImages] = useState([]);
    const [byobImages, setByobImages] = useState([]);

    const [ZGindex, setZGIndex] = useState(0);
    const [SRindex, setSRIndex] = useState(0);
    const [Hindex, setHIndex] = useState(0);
    const [BYOBIndex, setBYOBIndex] = useState(0);

    useEffect(() => {
        if (data.node) {
            data.node.products.edges.forEach((edge) => {
                if (edge.node.title === 'ZEROGRAVITY') {
                    setZeroGravityImages(edge.node.images)
                } else if (edge.node.title === 'SKYROCKET') {
                    setSkyRocketImages(edge.node.images);
                } else if (edge.node.title === 'HOLIDAY') {
                    setHolidayImages(edge.node.images);
                } else if (edge.node.title === 'BUILD YOUR OWN BUNDLE') {
                    setByobImages(edge.node.images);
                }   
            })
        }
    }, [data])

    const handleZGClick = (e) => {
        setZGIndex(parseInt(e.target.dataset.index));
    }
    
    const handleSRClick = (e) => {
        setSRIndex(parseInt(e.target.dataset.index));
    }

    const handleHClick = (e) => {
        setHIndex(parseInt(e.target.dataset.index));
    }
    return (
        <>
            <div className='bundles-container'>
                <div id='zerogravity-container' className='bundle-container'>
                    <Slider 
                        images={zeroGravityImages}
                        _index={ZGindex}
                    />
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
                            <ul className='products-li'>
                                <li data-index='1' onClick={(e) => handleZGClick(e)}>7g Project 4516</li>
                                <li data-index='2' onClick={(e) => handleZGClick(e)}>7g Pink Zombie</li>
                                <li data-index='3' onClick={(e) => handleZGClick(e)}>7g White Marshmallow</li>
                                <li data-index='4' onClick={(e) => handleZGClick(e)}>7g Cereal Milk</li>
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
                    <Slider 
                        images={skyRocketImages}
                        _index={SRindex}
                    />
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
                            <ul className='products-li'>
                                <li data-index='1' onClick={(e) => handleSRClick(e)}>7g Pink Zombie</li>
                                <li data-index='2' onClick={(e) => handleSRClick(e)}>7g Ice Cream Cake</li>
                                <li data-index='3' onClick={(e) => handleSRClick(e)}>7g Space Cookies</li>
                                <li data-index='4' onClick={(e) => handleSRClick(e)}>7g Pink Lizard</li>
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
                    <Slider 
                        images={holidayImages}
                        _index={Hindex}
                    />
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
                            <ul className='products-li'>
                                <li data-index='1' onClick={(e) => handleHClick(e)}>7g Pink Zombie</li>
                                <li data-index='2' onClick={(e) => handleHClick(e)}>7g Ice Cream Cake</li>
                                <li data-index='3' onClick={(e) => handleHClick(e)}>7g Space Cookies</li>
                                <li data-index='4' onClick={(e) => handleHClick(e)}>7g Cereal Milk</li>
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
                <div id='build-your-own-container' className='bundle-container'>
                    <Slider 
                        images={byobImages}
                        _index={BYOBIndex}
                    />
                    <h1>Build Your Own Bundle</h1>
                    <h3>Mix of 4</h3>
                    <p>
                        Choose from Astrobear's selection of buds and craft a bundle unique to you and your crew. 
                        <br />
                    </p>
                    <div className='includes-container'>
                        <div className='whats-inside'>
                            <h4>What's Inside</h4>
                            <ul>
                                <li>Mix of 4 strains max</li>
                            </ul>
                            <br />
                            {/* <ul className='products-li'>
                                <li data-index='1' onClick={(e) => handleHClick(e)}>7g Pink Zombie</li>
                                <li data-index='2' onClick={(e) => handleHClick(e)}>7g Ice Cream Cake</li>
                                <li data-index='3' onClick={(e) => handleHClick(e)}>7g Space Cookies</li>
                                <li data-index='4' onClick={(e) => handleHClick(e)}>7g Cereal Milk</li>
                            </ul> */}
                        </div>
                        {/* <div className='effects'>
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
                        </div> */}
                    </div>
                    <div className='cta-container'>
                        <NavLink end prefetch="intent" to="/products/build-your-own-bundle">
                            <button id='holiday-bundle-cta' className='cta-button'>Select Options</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}