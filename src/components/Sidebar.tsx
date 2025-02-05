import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Menu, LogOut } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabase';

export function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [addError, setAddError] = useState('');
  const { chats, setActiveChat, addChat } = useChatStore();
  const { user, signOut } = useAuthStore();

  useEffect(() => {
    if (user) {
      loadChats();
    }
  }, [user]);

  const loadChats = async () => {
    try {
      // First get all chat IDs where the user is a participant
      const { data: userChats, error: chatsError } = await supabase
        .from('chat_participants')
        .select('chat_id')
        .eq('user_id', user?.id);

      if (chatsError) throw chatsError;

      // For each chat, get the other participant's information
      for (const { chat_id } of userChats || []) {
        const { data: otherParticipant, error: participantError } = await supabase
          .from('chat_participants')
          .select(`
            user:profiles!inner(email)
          `)
          .eq('chat_id', chat_id)
          .neq('user_id', user?.id)
          .single();

        if (participantError) {
          console.error('Error loading participant:', participantError);
          continue;
        }

        if (otherParticipant) {
          addChat({
            id: chat_id,
            email: otherParticipant.user.email,
            unreadCount: 0
          });
        }
      }
    } catch (error: any) {
      console.error('Error loading chats:', error.message);
    }
  };

  const handleAddUser = async () => {
    try {
      setAddError('');
      
      if (newUserEmail === user?.email) {
        setAddError("You can't start a chat with yourself");
        return;
      }

      // Find the user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', newUserEmail)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          setAddError('User not found. Please check the email address.');
        } else {
          throw profileError;
        }
        return;
      }

      // Check if chat already exists
      const { data: existingChat, error: existingChatError } = await supabase
        .from('chat_participants')
        .select('chat_id')
        .eq('user_id', user?.id);

      if (existingChatError) throw existingChatError;

      const chatExists = existingChat?.some(async (chat) => {
        const { data: otherParticipant } = await supabase
          .from('chat_participants')
          .select('user_id')
          .eq('chat_id', chat.chat_id)
          .eq('user_id', profile.id)
          .single();
        
        return !!otherParticipant;
      });

      if (chatExists) {
        setAddError('Chat already exists with this user');
        return;
      }

      // Create new chat
      const { data: chat, error: chatError } = await supabase
        .from('chats')
        .insert([{}])
        .select()
        .single();

      if (chatError) throw chatError;

      // Add participants
      const { error: participantsError } = await supabase
        .from('chat_participants')
        .insert([
          { chat_id: chat.id, user_id: user?.id },
          { chat_id: chat.id, user_id: profile.id }
        ]);

      if (participantsError) throw participantsError;

      // Add to local state
      addChat({
        id: chat.id,
        email: newUserEmail,
        unreadCount: 0
      });

      setNewUserEmail('');
      setShowAddUser(false);
    } catch (error: any) {
      setAddError(error.message);
    }
  };

  return (
    <div className="w-[350px] border-r border-gray-700 h-screen flex flex-col bg-gray-800">
      <div className="p-4 bg-gray-900 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium text-white">{user?.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 hover:bg-gray-700 rounded-full text-gray-300"
            onClick={() => setShowAddUser(true)}
          >
            <UserPlus size={20} />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full text-gray-300">
            <Menu size={20} />
          </button>
          <button 
            className="p-2 hover:bg-gray-700 rounded-full text-gray-300"
            onClick={() => signOut()}
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full p-2 pl-10 bg-gray-700 rounded-lg focus:outline-none text-white placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {showAddUser && (
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-medium text-white mb-2">Add New Chat</h3>
          {addError && (
            <div className="text-red-400 text-sm mb-2">{addError}</div>
          )}
          <input
            type="email"
            placeholder="Enter user email"
            className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none text-white placeholder-gray-400 mb-2"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
          />
          <div className="flex space-x-2">
            <button
              className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              onClick={handleAddUser}
            >
              Add
            </button>
            <button
              className="flex-1 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              onClick={() => setShowAddUser(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat.id)}
            className="p-3 hover:bg-gray-700 cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${chat.email}`}
                alt="Contact"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">{chat.email}</h3>
                  {chat.lastMessage && (
                    <span className="text-sm text-gray-400">
                      {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  )}
                </div>
                {chat.lastMessage && (
                  <p className="text-sm text-gray-400 truncate">
                    {chat.lastMessage.content}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}