'use client';

import { useState } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { ChatHistory } from '@/components/ChatHistory';
import { PromptInput } from '@/components/PromptInput';
import axios from '@/utils/axios';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: string[];
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (
    prompt: string,
    data: string,
    files?: File[],
  ) => {
    setIsLoading(true);

    // Add user message to chat
    const userMessage: ChatMessage = {
      role: 'user',
      content: prompt,
      timestamp: new Date(),
      attachments: files ? files.map((f) => URL.createObjectURL(f)) : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Add an empty assistant message that will be updated with streaming content
    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      // Make streaming request to your API
      const response = await axios.post(
        '/chat',
        {
          prompt,
          data: data || '',
        },
        {
          responseType: 'stream',
          headers: {
            Accept: 'text/event-stream',
            'Content-Type': 'application/json',
          },
          onDownloadProgress: (progressEvent) => {
            const chunk = progressEvent.event.target.response;
            // Update messages using a functional update to ensure we have the latest state
            setMessages((prevMessages) => {
              const newMessages = [...prevMessages];
              console.log(chunk);
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage?.role === 'assistant') {
                // Instead of trying to slice based on previous content,
                // directly set the entire chunk as the new content
                lastMessage.content = chunk;
              }
              return newMessages;
            });
          },
        },
      );
    } catch (error) {
      console.error('Error:', error);
      // Handle error by updating the last message
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === 'assistant') {
          lastMessage.content =
            'Sorry, an error occurred while processing your request.';
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#191B1F] text-white">
      {/* Sidebar */}
      <div className="w-72 bg-[#212429] border-r border-[#2C2F36]">
        <div className="p-6">
          <button className="w-full bg-[#2172E5] hover:bg-[#1966D6] transition-colors text-white rounded-2xl py-3 px-6 font-semibold">
            New Chat
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-96px)]">
          {/* Previous chats list */}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <ChatHistory messages={messages} />
        </div>

        {/* Input Area */}
        <div className="border-t border-[#2C2F36] p-6 bg-[#212429]">
          <div className="max-w-5xl mx-auto">
            <FileUploader />
            <PromptInput onSubmit={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
