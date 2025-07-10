'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import {
  useBhaShaIME,
  BhaShaInput,
  BhaShaTextarea,
  BhaShaInputRef,
  BhaShaTextareaRef,
  SupportedLanguage,
} from '@bhashaime/core';

export default function DemoPage() {
  const inputRef = useRef<BhaShaInputRef>(null);
  const textareaRef = useRef<BhaShaTextareaRef>(null);
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>('gujarati');

  // Hook example
  const {
    input: hookInput,
    output: hookOutput,
    setInput: setHookInput,
    clear: clearHook,
  } = useBhaShaIME({
    language: selectedLanguage,
    autoTransliterate: true,
    onTransliterationChange: (input, output) => {
      console.log('Hook transliteration:', { input, output });
    },
  });

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleClear = () => {
    clearHook();
    inputRef.current?.clear();
    textareaRef.current?.clear();
  };

  const loadExample = () => {
    const example =
      selectedLanguage === 'gujarati'
        ? 'namaste, kem chho? x for ksha, Gn for gya. prash--n, vid---yaa'
        : 'namaste, kem chho? x for ksha, Gy for gya. prakriti, vidyaa';

    setHookInput(example);
    inputRef.current?.setInput(example);
    textareaRef.current?.setInput(example);
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
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    BhaShaIME Plugin Demo
                  </h1>
                  <p className="text-sm text-gray-600">
                    Showcasing React components and hooks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language Selector */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Language Settings
            </h2>
            <div className="flex space-x-2">
              <Button onClick={loadExample} variant="outline" size="sm">
                Load Example
              </Button>
              <Button onClick={handleClear} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              Select Language:
            </label>
            <div className="flex space-x-2">
              <Button
                variant={
                  selectedLanguage === 'gujarati' ? 'default' : 'outline'
                }
                size="sm"
                onClick={() => setSelectedLanguage('gujarati')}
              >
                Gujarati
              </Button>
              <Button
                variant={selectedLanguage === 'hindi' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLanguage('hindi')}
              >
                Hindi
              </Button>
            </div>
          </div>
        </Card>

        {/* Demo Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hook Demo */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              1. useBhaShaIME Hook
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input (English):
                </label>
                <input
                  type="text"
                  value={hookInput}
                  onChange={(e) => setHookInput(e.target.value)}
                  placeholder="Type in English..."
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Output (
                  {selectedLanguage === 'gujarati' ? 'ગુજરાતી' : 'हिंदी'}):
                </label>
                <div className="p-2 bg-gray-50 border border-gray-300 rounded-md min-h-[40px]">
                  {hookOutput || (
                    <span className="text-gray-400">
                      Transliterated text will appear here...
                    </span>
                  )}
                </div>
                {hookOutput && (
                  <Button
                    onClick={() => handleCopy(hookOutput)}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* BhaShaInput Demo */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              2. BhaShaInput Component
            </h3>
            <BhaShaInput
              ref={inputRef}
              language={selectedLanguage}
              placeholder="Type in English..."
              showOutput={true}
              className="w-full p-2 border border-gray-300 rounded-md"
              outputClassName="mt-2 p-2 bg-gray-50 border border-gray-300 rounded-md"
              onInputChange={(input) => console.log('Input component:', input)}
              onOutputChange={(output) =>
                console.log('Output component:', output)
              }
            />
          </Card>

          {/* BhaShaTextarea Demo */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              3. BhaShaTextarea Component
            </h3>
            <BhaShaTextarea
              ref={textareaRef}
              language={selectedLanguage}
              placeholder="Type a paragraph in English..."
              rows={4}
              showOutput={true}
              className="w-full p-2 border border-gray-300 rounded-md"
              outputClassName="mt-2 p-2 bg-gray-50 border border-gray-300 rounded-md"
              onInputChange={(input) => console.log('Textarea input:', input)}
              onOutputChange={(output) =>
                console.log('Textarea output:', output)
              }
            />
          </Card>

          {/* Programmatic Control Demo */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              4. Programmatic Control
            </h3>
            <div className="space-y-3">
              <Button
                onClick={() => inputRef.current?.focus()}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Focus Input
              </Button>
              <Button
                onClick={() => textareaRef.current?.focus()}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Focus Textarea
              </Button>
              <Button
                onClick={() => {
                  inputRef.current?.setInput('namaste');
                  textareaRef.current?.setInput('namaste, kem chho?');
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Set Custom Text
              </Button>
              <Button
                onClick={() => {
                  inputRef.current?.clear();
                  textareaRef.current?.clear();
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Clear Components
              </Button>
            </div>
          </Card>
        </div>

        {/* Usage Instructions */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How to Use BhaShaIME Plugin
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Installation:</h4>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {`npm install bhashaime
# or
yarn add bhashaime`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Basic Usage:</h4>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {`import { useBhaShaIME, BhaShaInput } from 'bhashaime';

// Hook
const { input, output, setInput } = useBhaShaIME({
  language: 'gujarati'
});

// Component
<BhaShaInput language="gujarati" />`}
              </pre>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
