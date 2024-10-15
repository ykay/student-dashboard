"use client";

import { useEffect, useState, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import { useDispatch } from "react-redux";
import { setVideo } from "@/lib/features/videoSlice";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const dispatch = useDispatch();
  const chatEndRef = useRef(null);

  const addMessage = (message) => {
    const newMessage = {
      ...message,
      timestamp: new Date().toLocaleString(),
    };
    setConversation((previousConversation) => [
      ...previousConversation,
      message,
    ]);
  };

  function CustomLink({ href, children }) {
    const handleClick = (event) => {
      event.preventDefault(); // Prevent the default link behavior 
      // href e.g., "https://youtu.be/CvhcvM444Mw?si=gFaoEYSjpKBCdy0W"
      // children e.g., "Week 5, Timestamp 1:00:00"
      const videoId = extractVideoId(href);
      const timestamp = getTimestampInSeconds(children)

      dispatch(setVideo({ videoId: videoId, startTime: timestamp }));
    };
  
    return (
      <a href={href} onClick={handleClick} style={{ color: '#C8F748', cursor: 'pointer' }}>
        {children}
      </a>
    );
  }  

  function extractVideoId(url) {
    const regex = /youtu\.be\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  function getTimestampInSeconds(childrenString) {
    // Regular expression to match the timestamp format HH:MM:SS or MM:SS
    const timestampRegex = /(?:(\d{1,2}):)?(\d{1,2}):(\d{2})/;
    const match = childrenString.match(timestampRegex);

    if (match) {
      const hours = match[1] ? parseInt(match[1], 10) : 0; // Default to 0 if hours are not present
      const minutes = parseInt(match[2], 10);
      const seconds = parseInt(match[3], 10);

      const totalSeconds = hours * 3600 + minutes * 60 + seconds;

      return totalSeconds;
    }
    
    return 0; // Default to beginning of video, 0, if no valid timestamp is found
  }

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to the bottom whenever conversation is updated
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    if (question === "") {
      return;
    }

    addMessage({ message: question, sender: "user" });

    setSubmitted(true);
    setQuestion("");

    // Handle the submitted question
    const url =
      "http://127.0.0.1:8000/query?q=" +
      encodeURIComponent(question);
    const response = await fetch(url);
    const json = await response.json();

    setSubmitted(false);
    setQuestion("");

    typeMessage(json.answer);
  };

  const typeMessage = (message) => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setCurrentMessage(message.substring(0, i));
      i++;

      if (i > message.length) {
        clearInterval(typingInterval);
        setConversation((previousConversation) => [
          ...previousConversation,
          {
            message: message,
            sender: "bot",
            timestamp: new Date().toLocaleString(),
          },
        ]);
        setCurrentMessage("");
      }
    }, 15); // Adjust speed here
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <p className="mt-3 text-2xl text-primary mb-3">
        Max Academy AI
      </p>

      <div className="flex-grow w-full px-3 overflow-y-auto">
        <div
          className="scrollbar-none text-lg"
          style={{
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          <div className="flex flex-col space-y-5">
            {[...conversation].map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : ""}`}
              >
                <div
                  className={`${msg.sender === "user" ? "rounded-bl-2xl rounded-br-2xl rounded-tl-2xl text-slate-300" : "rounded-br-2xl rounded-tl-2xl rounded-tr-2xl text-emerald-100"} max-w-[90%] bg-white/5 p-3 backdrop-blur-3xl sm:p-5`}
                >
                  <ReactMarkdown
                  components={{
                    a: CustomLink, // Use the custom link component
                  }}
                  >{msg.message}</ReactMarkdown>
                </div>
              </div>
            ))}

            {/* Render the receiving message animation */}
            {submitted && (
              <div className="typing flex items-center justify-center bg-white/5">
                <div className="typing__dot"></div>
                <div className="typing__dot"></div>
                <div className="typing__dot"></div>
              </div>
            )}

            {/* Render the typing message */}
            {currentMessage && (
              <div className="flex">
                <div className="max-w-[90%] rounded-br-2xl rounded-tl-2xl rounded-tr-2xl bg-white/5 p-3 text-emerald-50 backdrop-blur-3xl sm:p-5">
                  {currentMessage}
                </div>
              </div>
            )}

            {/* An invisible div reference used to auto-scroll to the "bottom". It's up here because the flexDirection is reversed. */}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>

      <form className="flex w-full items-center gap-5 pb-9 pt-4 px-9">
        <input
          id="question"
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Ask a question..."
          className="mg:text-lg w-3/4 rounded-full border border-green-600 bg-transparent px-4 py-2 text-sm text-indigo-200 placeholder-slate-500 shadow-[0_0_30px_#C3D973] ring-4 ring-lime-400 transition-shadow duration-1000 focus:border-sky-500 focus:outline-none sm:mx-0 sm:w-full lg:text-lg"
        />

        <button onClick={handleQuestionSubmit} className='mt-3 sm:mt-0 px-8 py-2 bg-gradient-to-r from-lime-700 to-teal-600 hover:from-lime-600 hover:to-teal-500 text-indigo-200 font-semibold rounded-full text-md lg:text-lg'>
          Send
        </button>
      </form>
    </div>
  )
};