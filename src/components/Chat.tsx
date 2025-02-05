import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { socket } from '../lib/socket';
import { useAuthStore } from '../store/useAuthStore';

const TENOR_API_KEY = 'zaSyANA6vLvUqZE3VV85BFuZTsnE3XaePlg0w';

export function Chat() {
  const [message, setMessage] = useState('');
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifs, setGifs] = useState([]);
  const { activeChat, messages, addMessage } = useChatStore();
  const { user } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const searchGifs = async (searchTerm = '') => {
    const response = await fetch(
      `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${TENOR_API_KEY}&limit=20`
    );
    const data = await response.json();
    setGifs(data.results);
  };

  useEffect(() => {
    if (showGifPicker) {
      searchGifs();
    }
  }, [showGifPicker]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages[activeChat]]);

  const sendMessage = (content: string, type: 'text' | 'gif' = 'text') => {
    if (!content.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: user?.email,
      timestamp: new Date().toISOString(),
      type,
    };

    socket.emit('message', {
      chatId: activeChat,
      message: newMessage,
    });

    addMessage(activeChat, newMessage);
    setMessage('');
    setShowGifPicker(false);
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        <p className="text-gray-400">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${activeChat}`}
            alt="Contact"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="font-medium text-white">{activeChat}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages[activeChat]?.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === user?.email ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === user?.email
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-white border border-gray-700'
              }`}
            >
              {msg.type === 'gif' ? (
                <img src={msg.content} alt="GIF" className="rounded" />
              ) : (
                <p>{msg.content}</p>
              )}
              <div
                className={`text-xs mt-1 ${
                  msg.sender === user?.email ? 'text-purple-200' : 'text-gray-400'
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showGifPicker && (
        <div className="h-64 overflow-y-auto border-t border-gray-700 p-2 bg-gray-800">
          <div className="grid grid-cols-4 gap-2">
            {gifs.map((gif: any) => (
              <img
                key={gif.id}
                src={gif.media_formats.tinygif.url}
                alt="GIF"
                className="w-full h-24 object-cover rounded cursor-pointer"
                onClick={() => sendMessage(gif.media_formats.gif.url, 'gif')}
              />
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-gray-700 bg-gray-800">
        <div className="flex items-center space-x-2">
          <button
            className="p-2 hover:bg-gray-700 rounded-full text-gray-400"
            onClick={() => setShowGifPicker(!showGifPicker)}
          >
            <Smile size={24} />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full text-gray-400">
            <Paperclip size={24} />
          </button>
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage(message);
              }
            }}
          />
          <button
            className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
            onClick={() => sendMessage(message)}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}