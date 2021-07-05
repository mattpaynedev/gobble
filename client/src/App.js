
import './App2.css';
import Footer from './components/pages/Footer';
import Header from './components/pages/Header';
import Main from './components/pages/Main'


function App() {
  return (
    <div>
      <Header />
      <main>
        <div className='page-content'>
          <Main />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
