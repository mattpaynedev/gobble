import './Home.css'
import Header from '../Header'
import Footer from '../Footer'
import { Link } from 'react-router-dom'

export default function Home() {

    return (
        <div className='body-wrapper'>
            <div className='body-overlay'>
                <div className='header-title-nav-wrapper'>
                    <Header
                        headerClass='home-header'
                        navClass='home-nav'
                    />
                </div>
                <main className='home-body-wrapper'>

                    <div className='home-body-grid'>
                        <div className='front-page-content-wrapper'>
                            <div className='home-content-quote-wrapper'>
                                <h3>I like on the table,</h3>
                                <h3>when we're speaking,</h3>
                                <h3>the light of a bottle</h3>
                                <h3>of intelligent wine.</h3>
                                <h4>-Pablo Neruda</h4>
                            </div>

                            <div className='home-content-down-arrow-link'>
                                <a href='#site-description'>
                                    <div className='home-content-down-arrow'>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div id='site-description' className='home-content-wrapper'>
                            <p>Gobble is a modern wine cellar management app.</p>
                            <p>Use it to catalog and track your collection with simple, easy-to-use tools.</p>
                            <Link to='/collections'><button
                                className='home-content-btn'
                            >Get Started</button></Link>
                        </div>
                    </div>
                </main>
                <Footer
                    footerClass='home-footer'
                />
            </div>
        </div >
    );
}