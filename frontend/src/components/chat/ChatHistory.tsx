import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  attachments?: string[];
  isStreaming?: boolean;
}

interface ChatHistoryProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

export function ChatHistory({ messages, isLoading }: ChatHistoryProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const copyToClipboard = (text: string, messageIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(messageIndex);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  return (
    <ScrollArea className="h-full p-4">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-start gap-2 mb-4"
        >
          <div
            className={`max-w-[70%] p-4 rounded-lg ${
              message.role === 'user'
                ? 'bg-gray-800 text-white ml-auto'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {(isLoading || message.isStreaming) &&
            message.role === 'assistant' &&
            index === messages.length - 1 ? (
              <>
                <ReactMarkdown>{message.content}</ReactMarkdown>
                <div className="flex space-x-2 mt-2">
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                </div>
              </>
            ) : (
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold mb-3">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-bold mb-2">{children}</h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-base font-bold mb-2">{children}</h4>
                  ),
                  h5: ({ children }) => (
                    <h5 className="text-sm font-bold mb-2">{children}</h5>
                  ),
                  h6: ({ children }) => (
                    <h6 className="text-xs font-bold mb-2">{children}</h6>
                  ),
                  p: ({ children }) => (
                    <p className="text-sm leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc text-sm ml-6 mb-2 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal text-sm ml-6 mb-2 space-y-1">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-sm mb-1">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-600 pl-4 italic my-4">
                      {children}
                    </blockquote>
                  ),
                  code: ({
                    inline,
                    children,
                  }: {
                    inline?: boolean;
                    children: React.ReactNode;
                  }) => {
                    if (inline) {
                      return (
                        <code className="bg-gray-800 px-1 py-0.5 rounded text-sm">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <div className="relative">
                        <button
                          onClick={() =>
                            copyToClipboard(String(children), index)
                          }
                          className="absolute right-2 top-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm"
                        >
                          Copy
                        </button>
                        <code className="block bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto text-sm text-white">
                          {children}
                        </code>
                      </div>
                    );
                  },
                  // Add other markdown components as needed
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
          {message.role === 'assistant' && (
            <button
              onClick={() => copyToClipboard(message.content, index)}
              className={`p-1.5 rounded transition-colors h-8 ${
                copiedMessageId === index
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
              title={copiedMessageId === index ? 'Copied!' : 'Copy response'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {copiedMessageId === index ? (
                  <path d="M20 6L9 17l-5-5" />
                ) : (
                  <>
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </>
                )}
              </svg>
            </button>
          )}
        </motion.div>
      ))}
      <div ref={messageEndRef} />
    </ScrollArea>
  );
}
