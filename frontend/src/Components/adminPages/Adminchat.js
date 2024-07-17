import React, { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../Header';

const bu = process.env.REACT_APP_BASEURL;

const Adminchat = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [data, setUserData, ref] = useState([]);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    
    const token = cookies.get('jwtoken');

    const login = async () => {
        try {
            const res = await fetch(`${bu}/afterlogin`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 401) {
                const error = new Error(res.error);
                throw error;
            }
            const userData = await res.json();
            setUserData(userData);
          //  console.log(userData);
        } catch (err) {
            navigate('/login');
        }
    };

    useEffect(() => {
        login();
    }, []);

    const socket = useRef(null);

    useEffect(() => {
        socket.current = io('${bu}');

        socket.current.on('connect', () => {
           // console.log('Socket.IO connected');
        });

        socket.current.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, { content: message.content, sender: message.sender }]);
        });

        socket.current.on('disconnect', () => {
            //console.log('Socket.IO disconnected');
        });

        return () => {
            socket.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            const message = {
                content: input,
                sender: "Admin" // Include the user's name here
            };
            
            socket.current.emit('message', { message });
            setInput('');
        }
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px',
        },
        messages: {
            border: '1px solid black',
            height: '300px',
            width: '100%',
            maxWidth: '600px',
            overflowY: 'scroll',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#f9f9f9',
        },
        messageContainer: {
            marginBottom: '5px',
            padding: '5px',
            borderRadius: '5px',
        },
        message: {
          marginBottom: '5px',
          background: '#36d6ad', // Light green background color
          padding: '5px',
          borderRadius: '5px',// Light green background color
        },
        adminMessage: {
          marginBottom: '5px',
          padding: '5px',
          borderRadius: '5px',
          textAlign: 'right',
        },
        inputContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '600px',
        },
        input: {
            width: '80%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginRight: '10px',
        },
        button: {
            padding: '10px 20px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <>
            {ref.current.usertype=== '2' && navigate('/login')}
            <Header />
            <div style={styles.container}>
                <h2>You are logged in as admin </h2>
                <div style={styles.messages}>
                    {messages.map((message, index) => (
                        <div key={index} style={styles.messageContainer}>
                            <div style={message.sender === 'Admin' ? styles.adminMessage : styles.message}>
                                <strong>{message.sender}: </strong> {message.content}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={styles.inputContainer}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        style={styles.input}
                    />
                    <button
                        onClick={sendMessage}
                        style={styles.button}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    );
};

export default Adminchat;
