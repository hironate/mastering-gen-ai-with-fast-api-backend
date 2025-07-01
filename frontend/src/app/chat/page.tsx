'use client';

import { useState, useRef } from 'react';

import { sendStreamMessage } from '@/services/chat';
import { ContextPanel } from '@/components/chat/ContextPanel';
import { ChatHistory } from '@/components/chat/ChatHistory';
import { ChatInput } from '@/components/chat/ChatInput';

// Add ChatMessage interface
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  attachments?: string[];
  isStreaming?: boolean;
}

export default function EnhancedChatInterface() {
  const [context, setContext] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: 'Hello! How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedModel, setSelectedModel] = useState('bedrock-claude');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);

    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: newMessage,
      timestamp: new Date(),
      attachments:
        files.length > 0 ? files.map((f) => URL.createObjectURL(f)) : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Add assistant message with streaming flag
    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      await sendStreamMessage(
        newMessage,
        context,
        selectedModel,
        (chunk: string) => {
          setIsLoading(false);
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage?.role === 'assistant') {
              lastMessage.content = chunk;
              lastMessage.isStreaming = false;
            }
            return newMessages;
          });
        },
        files,
      );

      // const response = await sendMessage(newMessage, context, files, selectedModel);
      // const assistantMessage = response.data.response;
      // setMessages((prev) => {
      //   const newMessages = [...prev];
      //   newMessages[newMessages.length - 1].content = assistantMessage;
      //   newMessages[newMessages.length - 1].isStreaming = false;
      //   return newMessages;
      // });
      // setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
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
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ContextPanel
        context={context}
        setContext={setContext}
        files={files}
        setFiles={setFiles}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-xl font-bold text-gray-800">
            Chat with Files POC
          </h1>
        </header>
        <main className="flex-1 overflow-hidden">
          <ChatHistory messages={messages} isLoading={isLoading} />
        </main>
        <footer className="bg-white border-t border-gray-200 p-4">
          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleMessageSubmit={handleMessageSubmit}
            fileInputRef={fileInputRef}
            isLoading={isLoading}
          />
        </footer>
      </div>
    </div>
  );
}
