import './Home.css'
import Header from '../Header'
import Footer from '../Footer'

export default function Home() {
    return (
        <div className='home-page-wrapper'>
            <div className='home-page-background-overlay'>
                <Header
                    headerClass='home-header'
                    navClass='home-nav'
                />
                <main className='home-body-wrapper'>

                    <div className='home-body-grid'>
                        <div className='home-content-wrapper-left'></div>

                        <div className='home-content-wrapper-right'>
                            <h2>There's always time for a bottle of wine.</h2>

                            <div className='home-content-main'>
                                <div className='home-site-description'>
                                    <p>Gobble is a modern wine cellar management tool.</p>
                                    <p>Catalog and track your collection with simple, easy-to-use tools.</p>
                                </div>
                            </div>
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