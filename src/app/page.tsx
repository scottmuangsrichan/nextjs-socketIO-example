"use client"
//comment
import { io } from 'socket.io-client'
import React, { useState, useEffect } from 'react';

const ws = io("ws://localhost:8080");

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    ws.on('chat-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })
  },[]);

  const sendMessage = (e) => {
    e.preventDefault()
    ws.emit('chat-message', message);
    setMessage('')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Web Socket Example</h1>
        <div>
          {messages.map((message ,index) => {
            return (
              <div key={index}>
                <p>{message}</p>
              </div>
            )
          })}
          <form>
            <input id='send-message-input' className='text-black' value={message} onChange={e => setMessage(e.target.value)} type='text'></input>
            <button type='submit' className='bg-green-900 p-4' onClick={sendMessage}>Send</button>
          </form>
        </div>
      </div>
    </main>
  )
}
