'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, RotateCcw, Type } from 'lucide-react';
import Link from 'next/link';
import { BhaSha } from '@bhashaime/core';
import {
  NativeTransliterationInput,
  NativeTransliterationTextarea,
} from '@/components/NativeTransliterationInput';

export default function NativeTransliterationPage() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [bhaShaInstance] = useState(() => new BhaSha());
  const [displayText, setDisplayText] = useState('');
  const [rawInput, setRawInput] = useState('');

  // Initialize BhaSha for Gujarati
  useEffect(() => {
    bhaShaInstance.setLanguage('gujarati');
  }, [bhaShaInstance]);

  // Set cursor position after display text changes
  useEffect(() => {
    if (textareaRef.current) {
      // For now, let's just set cursor to the end of the text
      // This is a temporary fix - we'll implement proper cursor mapping later
      const newCursorPos = displayText.length;
      textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
    }
  }, [displayText]);

  // Handle paste events
  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');

    const newRawInput = rawInput + pastedText;
    setRawInput(newRawInput);
    const transliterated = bhaShaInstance.transliterateText(newRawInput);
    setDisplayText(transliterated);
  };

  // Handle input events as fallback
  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;

    console.log('Input event:', {
      value,
      valueLength: value.length,
      rawInput,
      rawInputLength: rawInput.length,
    });

    // Only handle if this is not from our keydown handler
    if (value !== displayText) {
      console.log(
        'Input event detected - this should not happen with our keydown handler',
      );
    }
  };

  // Handle composition events (IME input)
  const handleCompositionStart = (
    event: React.CompositionEvent<HTMLTextAreaElement>,
  ) => {
    console.log('Composition start:', event.data);
  };

  const handleCompositionUpdate = (
    event: React.CompositionEvent<HTMLTextAreaElement>,
  ) => {
    console.log('Composition update:', event.data);
  };

  const handleCompositionEnd = (
    event: React.CompositionEvent<HTMLTextAreaElement>,
  ) => {
    console.log('Composition end:', event.data);
    // Handle IME input completion
    const compositionText = event.data;

    if (compositionText) {
      const newRawInput = rawInput + compositionText;
      setRawInput(newRawInput);
      const transliterated = bhaShaInstance.transliterateText(newRawInput);
      setDisplayText(transliterated);
    }
  };

  // Handle keydown to capture the actual English input
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Debug logging
    console.log('KeyDown:', {
      key: event.key,
      code: event.code,
      keyCode: event.keyCode,
      which: event.which,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
    });

    // Handle special keys
    if (event.key === 'Backspace') {
      if (rawInput.length > 0) {
        const newRawInput = rawInput.slice(0, -1);
        setRawInput(newRawInput);
        const transliterated = bhaShaInstance.transliterateText(newRawInput);
        setDisplayText(transliterated);
        event.preventDefault();
      }
    } else if (event.key === 'Delete') {
      // Delete from end for now
      if (rawInput.length > 0) {
        const newRawInput = rawInput.slice(0, -1);
        setRawInput(newRawInput);
        const transliterated = bhaShaInstance.transliterateText(newRawInput);
        setDisplayText(transliterated);
        event.preventDefault();
      }
    } else if (event.key === 'Enter') {
      // Handle Enter key
      const newRawInput = rawInput + '\n';
      setRawInput(newRawInput);
      const transliterated = bhaShaInstance.transliterateText(newRawInput);
      setDisplayText(transliterated);
      event.preventDefault();
    } else if (event.key === 'Tab') {
      // Handle Tab key
      const newRawInput = rawInput + '\t';
      setRawInput(newRawInput);
      const transliterated = bhaShaInstance.transliterateText(newRawInput);
      setDisplayText(transliterated);
      event.preventDefault();
    } else if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      // Handle printable characters (but not when modifier keys are pressed)
      const newRawInput = rawInput + event.key;
      setRawInput(newRawInput);
      const transliterated = bhaShaInstance.transliterateText(newRawInput);
      setDisplayText(transliterated);
      event.preventDefault();
    }
  };

  // Handle copy
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayText);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Handle clear
  const handleClear = () => {
    setDisplayText('');
    setRawInput('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Load example text
  const loadExample = () => {
    const example =
      'namaste, kem chho? x for ksha, Gn for gya. prash--n, vid---yaa';
    setRawInput(example);
    setDisplayText(bhaShaInstance.transliterateText(example));

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
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
                    Native Gujarati Typing
                  </h1>
                  <p className="text-sm text-gray-600">
                    Type in English, see Gujarati instantly - feel like native
                    typing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Native Gujarati Input (Reusable Components)
            </h2>
          </div>
          <div className="text-sm text-gray-600">
            <p>
              Below are reusable input and textarea components with native
              transliteration.
            </p>
          </div>
        </Card>

        {/* Input Example */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Input Example
          </h3>
          <NativeTransliterationInput
            language="gujarati"
            placeholder="Type in Gujarati..."
            showDebugInfo
            className="w-full p-2 border border-gray-300 rounded-md text-lg"
          />
        </Card>

        {/* Textarea Example */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Textarea Example
          </h3>
          <NativeTransliterationTextarea
            language="gujarati"
            rows={4}
            placeholder="Type in Gujarati..."
            showDebugInfo
            className="w-full p-2 border border-gray-300 rounded-md text-lg"
          />
        </Card>

        {/* Instructions */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time transliteration as you type</li>
                <li>• Only Gujarati text is displayed in the input/textarea</li>
                <li>• Native DOM event handling for instant response</li>
                <li>• No separate input/output areas</li>
                <li>• Reusable as input or textarea</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Example Typing:
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  <code>namaste</code> → નમસ્તે
                </div>
                <div>
                  <code>kem chho</code> → કેમ છો
                </div>
                <div>
                  <code>x</code> → ક્ષ
                </div>
                <div>
                  <code>Gn</code> → જ્ઞ
                </div>
                <div>
                  <code>prash--n</code> → પ્રશ્‍ન
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
