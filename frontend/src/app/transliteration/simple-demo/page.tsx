'use client';

import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { SupportedLanguage } from '@bhashaime/core';
import { useDirectInputTransliteration } from '@/hooks/useDirectInputTransliteration';

export default function SimpleDemoPage() {
  const [language, setLanguage] = useState<SupportedLanguage>('gujarati');
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const rawInputKey = 'data-raw-input';

  useDirectInputTransliteration({ ref: inputRef, language });
  useDirectInputTransliteration({ ref: textareaRef, language });

  const handleLanguageChange = (language: SupportedLanguage) => {
    setLanguage(language);
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.setAttribute(rawInputKey, '');
      // The hook will re-transliterate the empty string
    }
  };

  const clearTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.value = '';
      textareaRef.current.setAttribute(rawInputKey, '');
    }
  };

  const loadExample = () => {
    const example =
      'namaste, kem chho? x for ksha, Gn for gya. prash--n, vid---yaa';

    if (inputRef.current) {
      inputRef.current.setAttribute(rawInputKey, example);
    }

    if (textareaRef.current) {
      textareaRef.current.setAttribute(rawInputKey, example);
    }

    // A better approach is to change language to trigger re-transliteration
    const originalLanguage = language;
    setLanguage((l) => (l === 'hindi' ? 'gujarati' : 'hindi'));
    setTimeout(() => setLanguage(originalLanguage), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/transliteration"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Transliteration</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Simple BhaSha Demo
                </h1>
                <p className="text-sm text-gray-600">
                  Direct usage of BhaSha class with minimal React state
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language Selection */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Select Language</h3>
          <div className="flex gap-4">
            <button
              onClick={() => handleLanguageChange('gujarati')}
              className={`px-4 py-2 rounded ${
                language === 'gujarati'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Gujarati (ગુજરાતી)
            </button>
            <button
              onClick={() => handleLanguageChange('hindi')}
              className={`px-4 py-2 rounded ${
                language === 'hindi'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              Hindi (हिंदी)
            </button>
            <button
              onClick={loadExample}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Load Example
            </button>
          </div>
        </Card>

        {/* Input Box Demo */}
        <Card className="p-6 mb-6">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Input Box</h3>
            <button
              onClick={clearInput}
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              Clear
            </button>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type in English..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-raw-input=""
          />
          <div className="mt-2 text-sm text-gray-600">
            <p>✓ Real-time transliteration as you type</p>
            <p>✓ Full editing support (backspace, delete, cursor movement)</p>
            <p>✓ Copy/paste functionality</p>
          </div>
        </Card>

        {/* Textarea Demo */}
        <Card className="p-6 mb-6">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Textarea</h3>
            <button
              onClick={clearTextarea}
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              Clear
            </button>
          </div>
          <textarea
            ref={textareaRef}
            placeholder="Type a paragraph in English..."
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            data-raw-input=""
          />
          <div className="mt-2 text-sm text-gray-600">
            <p>✓ Multi-line text support</p>
            <p>✓ Works exactly like the input box</p>
            <p>✓ No React state used - data stored in DOM attributes</p>
          </div>
        </Card>
      </main>
    </div>
  );
}
