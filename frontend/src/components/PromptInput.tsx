import { useState } from 'react';

interface PromptInputProps {
  onSubmit: (
    prompt: string,
    onStream: (chunk: string) => void,
    files?: File[],
  ) => void;
  isLoading: boolean;
}

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [longText, setLongText] = useState('');
  const [storedLongText, setStoredLongText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPrompt = prompt.trim();
    const trimmedLongText = storedLongText.trim();

    if (trimmedPrompt || trimmedLongText) {
      onSubmit(trimmedPrompt, trimmedLongText, undefined);
      setPrompt('');
      setStoredLongText('');
      setLongText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt..."
          className="flex-1 rounded-2xl border border-[#2C2F36] bg-[#191B1F] p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2172E5] focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-[#191B1F] hover:bg-[#2C2F36] transition-colors text-white rounded-2xl px-4 py-4 font-semibold border border-[#2C2F36]"
          disabled={isLoading}
        >
          Paste Text
        </button>
        <button
          type="submit"
          className="bg-[#2172E5] hover:bg-[#1966D6] transition-colors text-white rounded-2xl px-8 py-4 font-semibold disabled:opacity-50 disabled:hover:bg-[#2172E5]"
          disabled={isLoading}
        >
          Send
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#191B1F] rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-white text-xl mb-4">Paste Long Text</h2>
            <textarea
              value={longText}
              onChange={(e) => setLongText(e.target.value)}
              className="w-full h-96 rounded-xl border border-[#2C2F36] bg-[#191B1F] p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2172E5] focus:border-transparent"
              placeholder="Paste your text here..."
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setLongText(storedLongText);
                }}
                className="bg-[#191B1F] hover:bg-[#2C2F36] transition-colors text-white rounded-xl px-6 py-2 font-semibold border border-[#2C2F36]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (longText.trim()) {
                    setStoredLongText(longText);
                  }
                  setIsModalOpen(false);
                }}
                className="bg-[#2172E5] hover:bg-[#1966D6] transition-colors text-white rounded-xl px-6 py-2 font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
