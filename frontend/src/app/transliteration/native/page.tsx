'use client';

import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, RotateCcw, Type } from 'lucide-react';
import Link from 'next/link';
import {
  NativeTransliterationInput,
  NativeTransliterationTextarea,
  NativeTransliterationRef,
} from '@/components/NativeTransliterationInput';

export default function NativeTransliterationPage() {
  const inputRef = useRef<NativeTransliterationRef>(null);
  const textareaRef = useRef<NativeTransliterationRef>(null);

  // Handle clear
  const handleClear = () => {
    inputRef.current?.clear();
    textareaRef.current?.clear();
  };

  // Load example text
  const loadExample = () => {
    const example =
      'namaste, kem chho? x for ksha, Gn for gya. prash--n, vid---yaa';
    inputRef.current?.setValue(example);
    textareaRef.current?.setValue(example);
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
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Type className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Flexible Native Gujarati Typing
                  </h1>
                  <p className="text-sm text-gray-600">
                    Multiple ways to implement native transliteration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Flexible Transliteration Components
            </h2>
            <div className="flex space-x-2">
              <Button onClick={loadExample} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Load Example
              </Button>
              <Button onClick={handleClear} variant="outline" size="sm">
                Clear All
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>
              Below are different ways to implement native transliteration with
              varying levels of flexibility and control.
            </p>
          </div>
        </Card>

        {/* Method 1: Pre-built Components */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Method 1: Pre-built Components (Easiest)
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NativeTransliterationInput
              </label>
              <NativeTransliterationInput
                ref={inputRef}
                language="gujarati"
                placeholder="Type in Gujarati..."
                showDebugInfo
                className="w-full p-2 border border-gray-300 rounded-md text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NativeTransliterationTextarea
              </label>
              <NativeTransliterationTextarea
                ref={textareaRef}
                language="gujarati"
                rows={3}
                placeholder="Type in Gujarati..."
                showDebugInfo
                className="w-full p-2 border border-gray-300 rounded-md text-lg"
              />
            </div>
          </div>
        </Card>

        {/* Method 2: Custom Implementation Example */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Method 2: Custom Implementation (Most Flexible)
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Implementation Example
              </label>
              <CustomTransliterationExample />
            </div>
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How to Choose the Right Method
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Method 1: Pre-built Components
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Quickest to implement</li>
                <li>• Standard input/textarea behavior</li>
                <li>• Good for most use cases</li>
                <li>• Limited customization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Method 2: Custom Implementation
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Maximum flexibility</li>
                <li>• Use with any input/textarea</li>
                <li>• Full control over styling</li>
                <li>• Can integrate with existing forms</li>
              </ul>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

// Example component showing custom implementation
function CustomTransliterationExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [rawInput, setRawInput] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      if (rawInput.length > 0) {
        const newRawInput = rawInput.slice(0, -1);
        setRawInput(newRawInput);
        // In a real implementation, you would use the BhaSha library here
        setDisplayText(newRawInput); // Simplified for demo
        event.preventDefault();
      }
    } else if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      const newRawInput = rawInput + event.key;
      setRawInput(newRawInput);
      // In a real implementation, you would use the BhaSha library here
      setDisplayText(newRawInput); // Simplified for demo
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    const newRawInput = rawInput + pastedText;
    setRawInput(newRawInput);
    setDisplayText(newRawInput); // Simplified for demo
  };

  const clear = () => {
    setRawInput('');
    setDisplayText('');
  };

  const setValue = (value: string) => {
    setRawInput(value);
    setDisplayText(value); // Simplified for demo
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Input Implementation
        </label>
        <input
          ref={inputRef}
          value={displayText}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="Type in Gujarati..."
          className="w-full p-2 border border-gray-300 rounded-md text-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Raw Input (English)
          </label>
          <div className="p-2 bg-gray-100 rounded border text-sm font-mono">
            {rawInput || '(empty)'}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Display Text (Gujarati)
          </label>
          <div className="p-2 bg-gray-100 rounded border text-sm">
            {displayText || '(empty)'}
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={() => setValue('namaste kem chho')}
          variant="outline"
          size="sm"
        >
          Set Example
        </Button>
        <Button onClick={clear} variant="outline" size="sm">
          Clear
        </Button>
        <Button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(displayText);
            } catch (err) {
              console.error('Failed to copy text: ', err);
            }
          }}
          variant="outline"
          size="sm"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
      </div>
    </div>
  );
}
