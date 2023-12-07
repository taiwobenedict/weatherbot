import React, { useContext, useEffect, useState } from 'react'
import OpenAI from 'openai';
import { RiRobot2Line } from "react-icons/ri"
import SlowText from './TextAnimation';
import { weatherContext } from '../context/WeatherContext';
import {SyncLoader} from 'react-spinners'
import { FaUser } from 'react-icons/fa6';



function Bot() {
  const OPENAI_API_KEY = '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'
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });
  
  
  const { name, setUI } = useContext(weatherContext)
  const chatHistory = [{ role: 'system', content: `You are a helpful assistance to give all the information about ${name}` }]
  const [chats, setChats] = useState(chatHistory)
  const [userInput, setUserInput] = useState("")
  const [run, setRun] = useState(false)
  const [loading, setLoading] = useState(false)




  useEffect(() => {
      // Call the API when 'chats' state changes
    if (userInput.length > 0) {
      fetchCompletion();
    }

    // This effect runs whenever 'chats' state is updated
     async function fetchCompletion() {
      try {
        setUserInput("")
        setLoading(true)
        const completion = await openai.chat.completions.create({
          messages: chats,
          model: "gpt-3.5-turbo",
        });
        setLoading(false)

        const completionText = completion.choices[0].message.content;

        setChats(prev => [...prev, { role: 'assistant', content: completionText }]);
      } catch (error) {
        console.error(error);
      }
    };

    
    // eslint-disable-next-line
  }, [run])
  const handleSubmit = () => {
    setRun(prev => !prev)
    if ( userInput.length > 0) {
      setChats(prev => [...prev, { role: 'user', content: userInput }]);
    }
  };


  return (
    <div className="--dark-theme" id='chat'>

      <button className="btn bnt-sm btn-light position-absolute exit" onClick={()=> setUI("weather")}>Exit</button>

      <div className="chat__conversation-board">
        {
          chats.map((chat, i) => (
            chat.role === "assistant" ? <BotMessage content={chat.content} key={i} /> : chat.role === "user" ? <UserMessage content={chat.content} key={i} /> : <BotMessage key={i} content={`Hello, my name is AI sosa. What will you like to know about ${name}?`} />
          ))
        }
        {
          loading && <BotMessage content={ <SyncLoader color='#a3a3a3' style={{color: "#a3a3a3"}} />} loading={loading} />
        }

      </div>

      <div className="chat__conversation-panel">
        <div className="chat__conversation-panel__container">

          <input
            className="chat__conversation-panel__input panel-item"
            placeholder="Type a message..."
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
          <button
            className="chat__conversation-panel__button panel-item btn-icon send-message-button"
            onClick={handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>

    </div>
  )
}

export default Bot


function BotMessage({ content, loading }) {
  return (
    <div className="chat__conversation-board__message-container">
      <div className="chat__conversation-board__message__person">
        <div className="chat__conversation-board__message__person__avatar">
          <RiRobot2Line className='bot-icon' />
        </div>
      </div>
      <div className="chat__conversation-board__message__context">
        <div className="chat__conversation-board__message__bubble">
          {
            loading === true ? content : <SlowText text={content} speed={20} />
          }
        </div>
      </div>
    </div>
  )
}


function UserMessage({ content }) {
  return (
    <div className="chat__conversation-board__message-container reversed">
      <div className="chat__conversation-board__message__person">
        <div className="chat__conversation-board__message__person__avatar">
          <FaUser className='bot-icon'/>
        </div>
      </div>
      <div className="chat__conversation-board__message__context">
        <div className="chat__conversation-board__message__bubble">
          <span>{content}</span>
        </div>
      </div>
    </div>
  )
}