import React, { useState, useEffect, useRef } from 'react';
import '../styles/Home.scss';
import avatarImage from '../assets/avatar.png';
import homeImage from '../assets/home.png';
import { useSelector, useDispatch } from 'react-redux';
import { updateMessageHistory, clearMessageHistory, updateToggleChatBox } from '../actions/actions';
import { Button, Container, Row, Col, Form, Card, InputGroup, FormControl } from 'react-bootstrap';


const Home = () => {
    const showChatBox = useSelector((state) => state.showChatBox);
    const messageHistory = useSelector((state) => state.messageHistory);
    const [placeholderText, setPlaceholderText] = useState('');
    const [textAreaWidth, setTextAreaWidth] = useState('auto');
    const textAreaRef = useRef(null);
    const dispatch = useDispatch();
    const [showCursor, setShowCursor] = useState(true);
    const [stopCursor, setStopCursor] = useState(false);
    const [sizeSet, setSize] = useState(false);


    const toggleChatBox = () => {
        dispatch(updateToggleChatBox());
    };

    const closeChatButton = () => {
        toggleChatBox();
        dispatch(clearMessageHistory());
    };

    const handleChatInput = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            const message = e.target.value;
            handleChat(message);
            e.target.value = '';
        }
    };

    const handleChatInit = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            toggleChatBox();
            handleChatInput(e);
        }
    };

    const getMessages = async (e) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                message: e
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await fetch('http://localhost:5001/submitChat', options)
            const data = await response.json()
            dispatch(updateMessageHistory(data.choices[0].message.content));
            console.log(data.choices[0].message.content);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChat = (e) => {
        dispatch(updateMessageHistory(e)); // Dispatch the action to update messageHistory
        getMessages(e);
    }

    const submitChat = () => {
        const e = textAreaRef.current.value;
        if (e !== '') {
            toggleChatBox();
            handleChat(e);
        }
        else {
            submitFail();
        }
    };

    const submitChatModal = () => {
        const e = textAreaRef.current.value;
        if (e !== '') {
            handleChat(e);
            textAreaRef.current.value = '';
        }
    };

    // maybe varible input size is stupid and I should change this...
    const handleInputChange = () => {
        //const { scrollWidth } = textAreaRef.current;
        let width = "42%";
        if (placeholderText.length > 37)
            width = placeholderText.length * 1.1 + '%';
        setTextAreaWidth(width);
    };

    useEffect(() => {
        if (!sizeSet)
            handleInputChange();
    }, [placeholderText]);



    useEffect(() => {
        if (!stopCursor) {
            const interval = setInterval(() => {
                setShowCursor(prev => !prev);
            }, 500);

            return () => clearInterval(interval);
        }
        else {
            setShowCursor(false);
        }
    }, [stopCursor]);


    useEffect(() => {
        const placeholderMessages = [
            "Need a full-stack developer with a security focus? That's me!",
            "Looking for robust security solutions and great code? You're in the right place!",
            "Curious about how development and security intersect? Let's talk!",
            "Want to see coding skills mixed with security expertise? Ask away!",
            "Ready for a journey into DevSecOps? Let's dive in!",
            "Seeking an expert in pen-testing and code? You've found one!",
            "Want to know how I balance coding and cybersecurity? Fire away!",
            "Facing software development challenges with a security twist? I've got solutions!",
            "DevSecOps questions? I'm ready for them!",
            "Ready to explore the fusion of coding and cybersecurity? Let's chat!",
            "Looking for a unique blend of developer and security researcher? Here I am!",
            "Ready to discuss code and security threats? I'm your expert!",
            "Need a partner for your secure development project? Count me in!",
            "Ready to level up your knowledge in secure software development? Ask me!",
            "In search of a coding guru with a security hat on? You've come to the right place!",
            "Got a bug to squash or a vulnerability to address? Let's tackle them together!",
            "Need tips for secure code development? I'm here to advise!",
            "Want to discuss the latest trends in secure development? I'm all ears!",
            "Looking for an out-of-the-box thinker in security and development? Look no further!",
            "Seeking a reliable partner in secure software development? I'm here to assist!",
            "Got a burning question about secure coding or cybersecurity? Don't hold back!"
        ];


        const randomIndex = Math.floor(Math.random() * placeholderMessages.length);
        const newMessage = placeholderMessages[randomIndex];
        let prevMessage = '';
        let i = 0;
        const interval = setInterval(() => {
            prevMessage = prevMessage + newMessage[i];
            setPlaceholderText(prevMessage);
            i++;
            if (i >= newMessage.length) {
                clearInterval(interval);
                setStopCursor(true);
                setSize(true);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const submitFail = () => {
        setStopCursor(false);
        const warnings = [
            "Empty fields are no fun! Type something in.",
            "Hold up! Don't leave this blank.",
            "Wait a minute! We need some text here.",
            "Hold on! You missed a spot.",
            "Oops! Looks like you forgot to type something.",
            "Hey, don't leave me hanging! Fill this in.",
            "Whoops! Looks like you skipped this. Type something in.",
            "Don't forget about me! Add some text.",
            "Looks like an empty field. Mind filling this in?",
            "Oh no, this can't be blank! Please type something.",
            "Empty fields make me sad. Could you type something in?",
            "This field is feeling lonely. Mind typing something in?",
            "Hey there! Looks like you missed this. Please add some text.",
            "Don't leave me empty! I need your input.",
            "Wait! You can't leave this blank. Please enter something.",
            "This field can't be empty! Please add some information.",
            "Empty? Not on my watch! Please type something in.",
            "Hold on, this spot can't be blank! Let's fill it in.",
            "Don't forget me! I need some content here.",
            "Oh dear, an empty field! Let's change that. Please type something."
        ];
        const randomIndex = Math.floor(Math.random() * warnings.length);
        const newMessage = warnings[randomIndex];
        let prevMessage = '';
        let i = 0;
        const interval = setInterval(() => {
            prevMessage = prevMessage + newMessage[i];
            setPlaceholderText(prevMessage);
            i++;
            if (i >= newMessage.length) {
                clearInterval(interval);
                setStopCursor(true);
            }
        }, 100);
        return () => clearInterval(interval);
    };



    return (
        <div className="d-flex flex-column vh-100" id='Home'>
            <div className="imgContainer">
                <img src={homeImage} width="auto" height="auto" />
            </div>
            <div className="textContainer">
                <h2>Breaking Codes, Building Trust:</h2>
                <h1>Meet Josiah.</h1>
                <p>Go ahead and ask me a question now!</p>
                <div className="chat-box">
                    {!showChatBox && (
                        <Form.Group controlId="formBasicText" className='d-flex align-items-center'>
                            <Form.Control as="textarea" placeholder={placeholderText + (showCursor ? "\u258c" : "")} onKeyDown={handleChatInit} ref={textAreaRef}
                                style={{ width: textAreaWidth, height: "60px", resize: "none" }} />
                            {stopCursor && <Button variant="primary" onClick={submitChat} className="chat-button">Chat Now</Button>}
                        </Form.Group>
                    )}
                    {/* {messageHistory.length > 0 && !showChatBox ? (
                    <button id="resume-button" onClick={toggleChatBox} className="hidden">Resume Chat</button>
                ) : null} */}
                </div>
            </div>
            {showChatBox && (
                <div id="chat-box" className="hidden">
                    <div id="messages">
                        {messageHistory.map((message, index) => (
                            <div key={index} className={index % 2 === 0 ? 'message left' : 'message right'}>
                                {index % 2 === 0 && (
                                    <span className="message-avatar">
                                        <img src={avatarImage} alt="Avatar" className="avatar-image" />
                                    </span>
                                )}
                                {message}
                            </div>
                        ))}
                    </div>
                    <button id="close-button" onClick={closeChatButton}>  </button>
                    <button id="minimize-button" onClick={toggleChatBox}>  </button>
                    <Form.Group controlId="formBasicText" className='d-flex align-items-center' id='modal-input'>
                        <Form.Control as="textarea" id="chat-input" placeholder="Send a message" onKeyDown={handleChatInput} ref={textAreaRef} />
                        <Button variant="primary" onClick={submitChatModal} className="chat-button">Chat Now</Button>
                    </Form.Group>

                </div>
            )}

        </div>
    );
};

export default Home;
