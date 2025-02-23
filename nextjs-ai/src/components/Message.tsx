'use client';

import { Message as MessageType } from '@/types/chat';
import { cn } from '@/lib/utils';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex w-full items-start gap-4 p-4',
        isUser ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full text-white',
          isUser ? 'bg-blue-500' : 'bg-gray-500',
        )}
      >
        {isUser ? '👤' : '🤖'}
      </div>
      <div
        className={cn(
          'rounded-lg px-4 py-2 max-w-[80%]',
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900',
        )}
      >
        <p className="text-sm font-medium">{message.content}</p>
      </div>
    </div>
  );
}
