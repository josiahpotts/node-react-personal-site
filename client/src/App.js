import React from 'react';
import { Link, Element, scrollSpy, animateScroll } from 'react-scroll';
import './styles/App.scss';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Resume from './components/Resume';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store/store';
import { updateToggleChatBox } from './actions/actions';



const App = () => {
    React.useEffect(() => {
        scrollSpy.update();
    }, []);
    const messageHistory = useSelector((state) => state.messageHistory);
    const showChatBox = useSelector((state) => state.showChatBox);
    const dispatch = useDispatch();

    const handleToggleChatBox = () => {
        scrollToTop();
        dispatch(updateToggleChatBox());
    };
    const scrollToTop = () => {
        animateScroll.scrollToTop(); // Scroll to the top of the page
    };

    return (
        <div className='appContainer'>
            <div className="nav-indicator">
                <Link activeClass="active" className="nav" to="home" spy={true} smooth={true} offset={0} duration={50}> Home </Link>
                <Link activeClass="active" className="nav" to="about" spy={true} smooth={true} offset={0} duration={50}> About </Link>
                <Link activeClass="active" className="nav" to="contact" spy={true} smooth={true} offset={0} duration={50}> Contact </Link>
                {messageHistory.length > 0 && !showChatBox ? (
                    <button id="resume-button" onClick={handleToggleChatBox} className="hidden">Resume Chat</button>
                ) : null}
            </div>
            <Element name="home">
                <Home />
            </Element>
            <Element name="about">
                <About />
            </Element>
            {/* <Element name="resume">
                    <Resume />
                </Element> */}
            <Element name="contact">
                <Contact />
            </Element>
            <div className="footer">
                <div className="footer-text">
                    <p>Made with Passion and Love❤️❤️ by Josiah Potts</p>
                </div>
            </div>
        </div>
    );
};

export default App;
