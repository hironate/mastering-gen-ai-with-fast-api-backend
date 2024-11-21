import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export function ChatHistory({ messages }) {
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll when messages change

  const copyToClipboard = (text: string, messageIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(messageIndex);
    setTimeout(() => setCopiedMessageId(null), 2000); // Reset after 2 seconds
  };

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[70%] rounded-2xl p-6 relative ${
              message.role === 'user'
                ? 'bg-[#2172E5] text-white'
                : 'bg-[#212429] border border-[#2C2F36]'
            }`}
          >
            {message.role === 'assistant' && (
              <button
                onClick={() => copyToClipboard(message.content, index)}
                className={`absolute right-2 top-2 p-1.5 rounded transition-colors ${
                  copiedMessageId === index
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
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
                    // Checkmark icon when copied
                    <path d="M20 6L9 17l-5-5" />
                  ) : (
                    // Copy icon when not copied
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
            {message.attachments?.map((url, i) => (
              <Image
                key={i}
                src={url}
                alt="Uploaded content"
                width={500}
                height={300}
                className="max-w-full mb-4 rounded-xl"
              />
            ))}
            {message.content ? (
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
                    <p className="mb-4 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc ml-6 mb-4 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal ml-6 mb-4 space-y-1">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-600 pl-4 italic my-4">
                      {children}
                    </blockquote>
                  ),
                  code: ({ inline, children, className }) => {
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
                          onClick={() => copyToClipboard(String(children))}
                          className="absolute right-2 top-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm"
                        >
                          Copy
                        </button>
                        <code className="block bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto text-sm">
                          {children}
                        </code>
                      </div>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="relative bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
                      {children}
                    </pre>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  strong: ({ children }) => (
                    <strong className="font-bold">{children}</strong>
                  ),
                  hr: () => <hr className="my-6 border-gray-600" />,
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-blue-400 hover:text-blue-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full border border-gray-600">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-gray-800">{children}</thead>
                  ),
                  tbody: ({ children }) => <tbody>{children}</tbody>,
                  tr: ({ children }) => (
                    <tr className="border-b border-gray-600">{children}</tr>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-2 text-left">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-2">{children}</td>
                  ),
                  img: ({ src, alt }) => (
                    <Image
                      src={src || ''}
                      alt={alt || ''}
                      width={800}
                      height={600}
                      className="max-w-full h-auto rounded-lg my-4"
                    />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              <span className="inline-block w-1 h-4 bg-white animate-pulse" />
            )}
            <div className="text-xs mt-3 opacity-60">
              {format(message.timestamp, 'HH:mm')}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
