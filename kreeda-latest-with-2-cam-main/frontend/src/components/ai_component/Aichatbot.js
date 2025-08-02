// src/Aichatbot.js
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import chatData from './chatdata.js';
import { motion, AnimatePresence } from 'framer-motion';

export default function Aichatbot() {
  const chatEndRef = useRef(null);

  // Chat state
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem('chatHistory');
    return stored
      ? JSON.parse(stored)
      : [{ from: 'bot', text: 'Hi! I’m your Gym & Diet Assistant—ask me anything!' }];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // User metrics (will be fetched from backend)
  const [height, setHeight] = useState(''); // in cm
  const [weight, setWeight] = useState(''); // in kg

  // Compute BMI whenever height or weight changes
  const bmi = height && weight
    ? Number(weight) / Math.pow(Number(height) / 100, 2)
    : null;

  // On mount: fetch the user's profile (height & weight)
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/userProfile`, {
      withCredentials: true
    })
    .then(res => {
      if (res.data.height) setHeight(res.data.height.toString());
      if (res.data.weight) setWeight(res.data.weight.toString());
    })
    .catch(err => {
      console.warn('Could not fetch user profile:', err);
    });
  }, []);

  // Persist chat + auto-scroll
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    const lower = input.toLowerCase();

    // find matching entry
    const entry = chatData.find(e =>
      e.keywords.some(kw => lower.includes(kw))
    );

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setInput('');

    setTimeout(() => {
      let botReply;
      if (entry) {
        // dynamic if it's a function, else static string
        botReply =
          typeof entry.response === 'function'
            ? entry.response(bmi)
            : entry.response;
      } else {
        botReply = "Sorry, I don't have info on that. Try another exercise or diet question!";
      }

      setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 600);
  };

  const handleClear = () => {
    localStorage.removeItem('chatHistory');
    setMessages([{ from: 'bot', text: 'Hi! I’m your Gym & Diet Assistant—ask me anything!' }]);
  };

  return (
    <div style={styles.outerDiv}>
      {/* User metrics form (now auto-populated) */}
      <div style={styles.metricsForm}>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={e => setHeight(e.target.value)}
            style={styles.metricInput}
            placeholder="e.g. 170"
          />
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            style={styles.metricInput}
            placeholder="e.g. 65"
          />
        </label>
        {bmi && (
          <div style={styles.bmiDisplay}>
            BMI: {bmi.toFixed(1)}
          </div>
        )}
      </div>

      {/* Chat window */}
      <div style={styles.chatBox}>
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                ...styles.message,
                alignSelf: msg.from === 'bot' ? 'flex-start' : 'flex-end',
                backgroundColor: msg.from === 'bot' ? '#e3f2fd' : '#c8e6c9',
              }}
            >
              {msg.text}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                ...styles.message,
                alignSelf: 'flex-start',
                backgroundColor: '#e0e0e0',
                fontStyle: 'italic',
              }}
            >
              Typing...
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask something like 'weight loss tips'"
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          disabled={isTyping}
        />
        <button style={styles.button} onClick={handleSend} disabled={isTyping}>
          Send
        </button>
      </div>

      <button style={styles.clearButton} onClick={handleClear} disabled={isTyping}>
        Clear Chat
      </button>
    </div>
  );
}

const styles = {
  outerDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fafafa',
    fontFamily: 'Arial, sans-serif',
    padding: 20,
  },
  metricsForm: {
    display: 'flex',
    gap: '15px',
    marginBottom: '10px',
    alignItems: 'center',
  },
  metricInput: {
    width: '80px',
    marginLeft: '5px',
    padding: '4px 6px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  bmiDisplay: {
    fontWeight: 'bold',
  },
  chatBox: {
    width: '100%',
    maxWidth: '1000px',
    height: '65vh',
    overflowY: 'auto',
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginBottom: '10px',
  },
  message: {
    padding: '10px 15px',
    borderRadius: '15px',
    maxWidth: '80%',
    lineHeight: 1.4,
    whiteSpace: 'pre-line',
  },
  inputArea: {
    display: 'flex',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '10px',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: '8px 0 0 8px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    fontSize: 16,
    backgroundColor: '#00796b',
    color: 'white',
    border: 'none',
    borderRadius: '0 8px 8px 0',
    cursor: 'pointer',
  },
  clearButton: {
    marginTop: 5,
    backgroundColor: '#d32f2f',
    color: 'white',
    padding: '5px 15px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};
