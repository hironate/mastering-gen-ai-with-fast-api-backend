'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Languages, Copy, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { BhaSha, SupportedLanguage } from '@bhashaime/core';

// The BhaSha engine is now imported from the npm package

export default function TransliterationPage() {
  const [bhaShaInstance] = useState(() => new BhaSha());
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>('gujarati');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  useEffect(() => {
    bhaShaInstance.setLanguage(selectedLanguage);
  }, [selectedLanguage, bhaShaInstance]);

  useEffect(() => {
    const transliterated = bhaShaInstance.transliterateText(inputText);
    setOutputText(transliterated);
  }, [inputText, selectedLanguage, bhaShaInstance]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language as SupportedLanguage);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const exampleTexts = {
    hindi: 'namaste, kem chho? x for ksha, Gy for gya. prakriti, vidyaa',
    gujarati:
      'namaste, kem chho? x for ksha, Gn for gya. prash--n, vid---yaa, thai, tha-i, dau, da-u, daMDavat-',
  };

  const loadExample = () => {
    const example = exampleTexts[selectedLanguage as keyof typeof exampleTexts];
    if (example) {
      setInputText(example);
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
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Hub</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Languages className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Indian Language Transliteration
                  </h1>
                  <p className="text-sm text-gray-600">
                    Type in English, get Indian language output
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
              <Link href="/transliteration/demo">
                <Button variant="outline" size="sm">
                  Plugin Demo
                </Button>
              </Link>
              <Link href="/transliteration/native">
                <Button variant="outline" size="sm">
                  Native Typing
                </Button>
              </Link>

              <Button onClick={loadExample} variant="outline" size="sm">
                Load Example
              </Button>
              <Button onClick={handleClear} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              Select Target Language:
            </label>
            <Select
              value={selectedLanguage}
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Transliteration Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Input (English)
              </h3>
              <span className="text-sm text-gray-500">
                {inputText.length} characters
              </span>
            </div>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type in English (phonetic)... e.g., 'namaste' for both languages, 'kem cho' for Gujarati"
              className="min-h-[300px] text-lg"
            />
          </Card>

          {/* Output Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Output ({selectedLanguage === 'hindi' ? 'हिंदी' : 'ગુજરાતી'})
              </h3>
              <Button onClick={handleCopy} variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            </div>
            <div className="min-h-[300px] p-4 bg-gray-50 rounded-md border text-lg font-medium leading-relaxed">
              {outputText || (
                <span className="text-gray-400 italic">
                  Transliterated text will appear here...
                </span>
              )}
            </div>
          </Card>
        </div>

        {/* Help Section */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How to Use - Comprehensive Rules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Gujarati - Complete Rules:
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  <strong>Basic Vowels:</strong>
                </div>
                <div>
                  <code>a aa i ee u oo e o</code> → અ આ ઇ ઈ ઉ ઊ એ ઓ
                </div>
                <div>
                  <code>ai au E O</code> → ઐ ઔ ઍ ઑ
                </div>

                <div>
                  <strong>Consonants:</strong>
                </div>
                <div>
                  <code>k kh g gh</code> → ક ખ ગ ઘ
                </div>
                <div>
                  <code>ch chh j jh</code> → ચ છ જ ઝ
                </div>
                <div>
                  <code>T Th D Dh N</code> → ટ ઠ ડ ઢ ણ
                </div>

                <div>
                  <strong>Special Characters:</strong>
                </div>
                <div>
                  <code>x</code> → ક્ષ, <code>Gn/Gy</code> → જ્ઞ
                </div>
                <div>
                  <code>M/.n/.m</code> → ં (anusvara)
                </div>
                <div>
                  <code>H/:</code> → ઃ (visarga)
                </div>

                <div>
                  <strong>Automatic Anusvara:</strong>
                </div>
                <div>
                  <code>ang, anj, ant, amp</code> → અંગ, અંજ, અંત, અંપ
                </div>

                <div>
                  <strong>ZWJ/ZWNJ:</strong>
                </div>
                <div>
                  <code>--</code> → ZWJ, <code>---</code> → ZWNJ
                </div>
                <div>
                  <code>prash--n</code> → પ્રશ્‍ન
                </div>
                <div>
                  <code>vid---yaa</code> → વિદ્‌યા
                </div>

                <div>
                  <strong>Vowel Separation:</strong>
                </div>
                <div>
                  <code>thai</code> → થૈ, <code>tha-i</code> → થઇ
                </div>
                <div>
                  <code>dau</code> → દૌ, <code>da-u</code> → દઉ
                </div>

                <div>
                  <strong>Dead Consonant:</strong>
                </div>
                <div>
                  <code>daMDavat-</code> → દંડવત્
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Hindi - Basic Rules:
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  <strong>Basic Vowels:</strong>
                </div>
                <div>
                  <code>a aa i ee u oo e o</code> → अ आ इ ई उ ऊ ए ओ
                </div>
                <div>
                  <code>ai au</code> → ऐ औ
                </div>

                <div>
                  <strong>Consonants:</strong>
                </div>
                <div>
                  <code>k kh g gh</code> → क ख ग घ
                </div>
                <div>
                  <code>ch chh j jh</code> → च छ ज झ
                </div>
                <div>
                  <code>T Th D Dh N</code> → ट ठ ड ढ ण
                </div>

                <div>
                  <strong>Special Characters:</strong>
                </div>
                <div>
                  <code>x</code> → क्ष, <code>Gy</code> → ज्ञ
                </div>
                <div>
                  <code>M</code> → ं (anusvara)
                </div>
                <div>
                  <code>H</code> → ः (visarga)
                </div>

                <div>
                  <strong>Conjunct Consonants:</strong>
                </div>
                <div>
                  <code>namaste</code> → नमस्ते
                </div>
                <div>
                  <code>vidyaa</code> → विद्या
                </div>

                <div>
                  <strong>Numbers:</strong>
                </div>
                <div>
                  <code>0-9</code> → ०-९
                </div>

                <div>
                  <strong>Punctuation:</strong>
                </div>
                <div>
                  <code>|</code> → । <code>||</code> → ॥
                </div>
                <div>
                  <code>Rs</code> → ₹ <code>OM</code> → ॐ
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              Tips for Better Results:
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Use hyphen (-) to separate vowels: <code>tha-i</code> instead
                of <code>thai</code>
              </li>
              <li>
                • Use double dash (--) for ZWJ, triple dash (---) for ZWNJ
              </li>
              <li>
                • Automatic anusvara works: <code>ang</code> becomes અંગ
                automatically
              </li>
              <li>
                • End with hyphen (-) for dead consonants:{' '}
                <code>daMDavat-</code>
              </li>
              <li>
                • Capital letters for aspirated/retroflex: <code>Th</code> for
                ઠ, <code>th</code> for થ
              </li>
            </ul>
          </div>
        </Card>
      </main>
    </div>
  );
}
