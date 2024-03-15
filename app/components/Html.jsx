import ARROW from '../assets/letsgo-arrow.svg';

import SMALLBEAR from '../assets/small-bear.svg';
import MEDIUMBEAR from '../assets/medium-bear.svg';
import LARGEBEAR from '../assets/large-bear.svg';

export const Html = () => {
    return (
        <>
          <h1
            style={{
              position: 'absolute',
              top: '25vh',
              left: '60vw',
              // transform: 'translateX(-50%)',
              color: '#fff',
              fontSize: '1.2em'
            }}>
            Welcome to the astroverse
            <div className='dot-container'><span className='inner-dot'></span></div>
            <img src={SMALLBEAR} />
          </h1>
          <h1
            style={{
              position: 'absolute',
              top: '100vh',
              left: '60vw',
              transform: 'translateX(-65%)',
              color: '#fff',
              fontSize: '1.2em'
            }}>
              <div className='dot-container'><span className='inner-dot'></span></div>
            We're on a mission...
            <img src={MEDIUMBEAR} />
          </h1>
          <h1
            style={{
              position: 'absolute',
              top: '200vh',
              left: '50vw',
              transform: 'translateX(-50%)',
              color: '#fff',
              fontSize: '1.2em'
            }}>
            To help you find your perfect high<div className='dot-container'><span className='inner-dot'></span></div>
            <img src={LARGEBEAR} />
          </h1>
          <img
            style={{
              position: 'absolute',
              top: '270vh',
              left: '50vw',
              transform: 'translateX(-50%)',
              color: '#fff',
              fontSize: '1.2em'
            }} src={ARROW} />
        </>
    )  
}