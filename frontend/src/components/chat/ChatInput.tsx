import { useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Paperclip, Send } from 'lucide-react';

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleMessageSubmit: (e: React.FormEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isLoading?: boolean;
}

export function ChatInput({
  newMessage,
  setNewMessage,
  handleMessageSubmit,
  isLoading,
}: ChatInputProps) {
  return (
    <form onSubmit={handleMessageSubmit} className="flex items-end space-x-2">
      <div className="flex-grow relative">
        <Textarea
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="resize-none pr-10 py-3 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          rows={5}
          disabled={isLoading}
          autoComplete="off"
          data-form-type="other"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleMessageSubmit(e);
            }
          }}
        />
      </div>
      <Button
        type="submit"
        size="icon"
        disabled={isLoading}
        className="bg-gray-700 hover:bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}
