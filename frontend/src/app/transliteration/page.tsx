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

// Improved bhaSha transliteration library with systematic rules
class BhaSha {
  private currentLanguage: string = 'english';
  private supportedLanguages: string[] = ['english', 'hindi', 'gujarati'];

  // Base vowel mappings
  private baseVowels: {
    [key: string]: { [key: string]: { standalone: string; matra: string } };
  } = {
    hindi: {
      a: { standalone: 'अ', matra: '' }, // inherent, no matra needed
      aa: { standalone: 'आ', matra: 'ा' },
      A: { standalone: 'आ', matra: 'ा' },
      AA: { standalone: 'आ', matra: 'ा' },
      i: { standalone: 'इ', matra: 'ि' },
      ii: { standalone: 'ई', matra: 'ी' },
      I: { standalone: 'ई', matra: 'ी' },
      II: { standalone: 'ई', matra: 'ी' },
      u: { standalone: 'उ', matra: 'ु' },
      uu: { standalone: 'ऊ', matra: 'ू' },
      U: { standalone: 'ऊ', matra: 'ू' },
      UU: { standalone: 'ऊ', matra: 'ू' },
      e: { standalone: 'ए', matra: 'े' },
      E: { standalone: 'ए', matra: 'े' },
      ai: { standalone: 'ऐ', matra: 'ै' },
      o: { standalone: 'ओ', matra: 'ो' },
      O: { standalone: 'ओ', matra: 'ो' },
      au: { standalone: 'औ', matra: 'ौ' },
      ri: { standalone: 'ऋ', matra: 'ृ' },
      lri: { standalone: 'ऌ', matra: 'ॢ' },
      ay: { standalone: 'अय', matra: 'य' },
    },
    gujarati: {
      a: { standalone: 'અ', matra: '' },
      A: { standalone: 'આ', matra: 'ા' },
      aa: { standalone: 'આ', matra: 'ા' },
      AA: { standalone: 'આ', matra: 'ા' },
      i: { standalone: 'ઇ', matra: 'િ' },
      I: { standalone: 'ઈ', matra: 'ી' },
      ii: { standalone: 'ઈ', matra: 'ી' },
      II: { standalone: 'ઈ', matra: 'ી' },
      u: { standalone: 'ઉ', matra: 'ુ' },
      U: { standalone: 'ઊ', matra: 'ૂ' },
      uu: { standalone: 'ઊ', matra: 'ૂ' },
      UU: { standalone: 'ઊ', matra: 'ૂ' },
      e: { standalone: 'એ', matra: 'ે' },
      E: { standalone: 'એ', matra: 'ે' },
      ai: { standalone: 'ઐ', matra: 'ૈ' },
      o: { standalone: 'ઓ', matra: 'ો' },
      O: { standalone: 'ઓ', matra: 'ો' },
      au: { standalone: 'ઔ', matra: 'ૌ' },
      ri: { standalone: 'ઋ', matra: 'ૃ' },
      lri: { standalone: 'ઌ', matra: 'ૢ' },
      ay: { standalone: 'અય', matra: 'ય' },
    },
  };

  // Base consonant mappings with systematic rules
  private baseConsonants: { [key: string]: { [key: string]: string } } = {
    hindi: {
      // Gutturals (k-varga)
      k: 'क',
      K: 'क',
      kh: 'ख',
      Kh: 'ख',
      KH: 'ख',
      g: 'ग',
      G: 'ग',
      gh: 'घ',
      Gh: 'घ',
      GH: 'घ',
      ng: 'ङ',
      NG: 'ङ',

      // Palatals (ch-varga)
      ch: 'च',
      Ch: 'छ',
      CH: 'छ',
      chh: 'छ',
      CHH: 'छ',
      j: 'ज',
      J: 'ज',
      jh: 'झ',
      Jh: 'झ',
      JH: 'झ',
      ny: 'ञ',
      NY: 'ञ',

      // Retroflexes (T-varga)
      T: 'ट',
      t: 'त',
      Th: 'ठ',
      th: 'थ',
      D: 'ड',
      d: 'द',
      Dh: 'ढ',
      dh: 'ध',
      N: 'ण',
      n: 'न',

      // Labials (p-varga)
      p: 'प',
      P: 'प',
      ph: 'फ',
      Ph: 'फ',
      PH: 'फ',
      b: 'ब',
      B: 'ब',
      bh: 'भ',
      Bh: 'भ',
      BH: 'भ',
      m: 'म',
      M: 'म',

      // Semivowels and fricatives
      y: 'य',
      Y: 'य',
      r: 'र',
      R: 'र',
      l: 'ल',
      L: 'ल',
      v: 'व',
      V: 'व',
      w: 'व',
      W: 'व',
      sh: 'श',
      Sh: 'श',
      SH: 'श',
      shh: 'ष',
      Shh: 'ष',
      SHH: 'ष',
      s: 'स',
      S: 'स',
      h: 'ह',
      H: 'ह',

      // Urdu/Persian additions
      q: 'क़',
      Q: 'क़',
      khh: 'ख़',
      KHH: 'ख़',
      ghh: 'ग़',
      GHH: 'ग़',
      z: 'ज़',
      Z: 'ज़',
      f: 'फ़',
      F: 'फ़',

      // Special combinations
      x: 'क्ष',
      X: 'क्ष',
      ksh: 'क्ष',
      KSH: 'क्ष',
    },
    gujarati: {
      // Gutturals (k-varga)
      k: 'ક',
      K: 'ક',
      kh: 'ખ',
      Kh: 'ખ',
      KH: 'ખ',
      g: 'ગ',
      G: 'ગ',
      gh: 'ઘ',
      Gh: 'ઘ',
      GH: 'ઘ',
      ng: 'ઙ',
      NG: 'ઙ',

      // Palatals (ch-varga)
      ch: 'ચ',
      Ch: 'છ',
      CH: 'છ',
      chh: 'છ',
      CHH: 'છ',
      j: 'જ',
      J: 'જ',
      jh: 'ઝ',
      Jh: 'ઝ',
      JH: 'ઝ',
      ny: 'ઞ',
      NY: 'ઞ',

      // Retroflexes (T-varga)
      T: 'ટ',
      t: 'ત',
      Th: 'ઠ',
      th: 'થ',
      D: 'ડ',
      d: 'દ',
      Dh: 'ઢ',
      dh: 'ધ',
      N: 'ણ',
      n: 'ન',

      // Labials (p-varga)
      p: 'પ',
      P: 'પ',
      ph: 'ફ',
      Ph: 'ફ',
      PH: 'ફ',
      b: 'બ',
      B: 'બ',
      bh: 'ભ',
      Bh: 'ભ',
      BH: 'ભ',
      m: 'મ',
      M: 'મ',

      // Semivowels and fricatives
      y: 'ય',
      Y: 'ય',
      r: 'ર',
      R: 'ર',
      l: 'લ',
      L: 'ળ',
      v: 'વ',
      V: 'વ',
      w: 'વ',
      W: 'વ',
      sh: 'શ',
      Sh: 'શ',
      SH: 'શ',
      shh: 'ષ',
      Shh: 'ષ',
      SHH: 'ષ',
      s: 'સ',
      S: 'સ',
      h: 'હ',
      H: 'હ',

      // Special combinations
      x: 'ક્ષ',
      X: 'ક્ષ',
      ksh: 'ક્ષ',
      KSH: 'ક્ષ',
      z: 'ઝ',
      Z: 'ઝ',
      f: 'ફ',
      F: 'ફ',
    },
  };

  // Numbers
  private numbers: { [key: string]: { [key: string]: string } } = {
    hindi: {
      '0': '०',
      '1': '१',
      '2': '२',
      '3': '३',
      '4': '४',
      '5': '५',
      '6': '६',
      '7': '७',
      '8': '८',
      '9': '९',
    },
    gujarati: {
      '0': '૦',
      '1': '૧',
      '2': '૨',
      '3': '૩',
      '4': '૪',
      '5': '૫',
      '6': '૬',
      '7': '૭',
      '8': '૮',
      '9': '૯',
    },
  };

  // Special characters and modifiers
  private specialChars: { [key: string]: { [key: string]: string } } = {
    hindi: {
      M: 'ं',
      '.n': 'ं',
      H: 'ः',
      '.h': 'ః',
      '.': '।',
      '..': '॥',
      OM: 'ॐ',
      AUM: 'ॐ',
    },
    gujarati: {
      M: 'ં',
      '.n': 'ં',
      H: 'ઃ',
      '.h': 'ઃ',
      '.': '।',
      '..': '॥',
      OM: 'ૐ',
      AUM: 'ૐ',
    },
  };

  // Virama (halant)
  private virama: { [key: string]: string } = {
    hindi: '्',
    gujarati: '્',
  };

  // Vowel patterns for recognition (ordered by length, longest first)
  private vowelPatterns = [
    'lri',
    'uu',
    'UU',
    'aa',
    'AA',
    'ii',
    'II',
    'ai',
    'au',
    'ay',
    'ri',
    'u',
    'U',
    'a',
    'A',
    'i',
    'I',
    'e',
    'E',
    'o',
    'O',
  ];

  // Pattern arrays (longest first for proper matching)
  private consonantPatterns = [
    'chh',
    'CHH',
    'shh',
    'Shh',
    'SHH',
    'ksh',
    'KSH',
    'khh',
    'KHH',
    'ghh',
    'GHH',
    'ch',
    'Ch',
    'CH',
    'kh',
    'Kh',
    'KH',
    'gh',
    'Gh',
    'GH',
    'th',
    'Th',
    'dh',
    'Dh',
    'ph',
    'Ph',
    'PH',
    'bh',
    'Bh',
    'BH',
    'jh',
    'Jh',
    'JH',
    'sh',
    'Sh',
    'SH',
    'ng',
    'NG',
    'ny',
    'NY',
    'k',
    'K',
    'g',
    'G',
    'j',
    'J',
    't',
    'T',
    'd',
    'D',
    'n',
    'N',
    'p',
    'P',
    'b',
    'B',
    'm',
    'M',
    'y',
    'Y',
    'r',
    'R',
    'l',
    'L',
    'v',
    'V',
    'w',
    'W',
    's',
    'S',
    'h',
    'H',
    'x',
    'X',
    'z',
    'Z',
    'q',
    'Q',
    'f',
    'F',
  ];

  supports(lang: string): boolean {
    return this.supportedLanguages.includes(lang.toLowerCase());
  }

  setLanguage(lang: string): void {
    if (this.supports(lang)) {
      this.currentLanguage = lang.toLowerCase();
    } else {
      throw new Error(`Language '${lang}' is not supported.`);
    }
  }

  getLanguage(): string {
    return this.currentLanguage;
  }

  private isVowel(pattern: string): boolean {
    if (this.currentLanguage === 'english') return false;
    return (
      this.baseVowels[this.currentLanguage] &&
      this.baseVowels[this.currentLanguage][pattern] !== undefined
    );
  }

  private isConsonant(pattern: string): boolean {
    if (this.currentLanguage === 'english') return false;
    return (
      this.baseConsonants[this.currentLanguage] &&
      this.baseConsonants[this.currentLanguage][pattern] !== undefined
    );
  }

  private getConsonant(pattern: string): string | null {
    if (this.currentLanguage === 'english') return null;
    return this.baseConsonants[this.currentLanguage]?.[pattern] || null;
  }

  private getVowel(
    pattern: string,
    isStandalone: boolean = false,
  ): string | null {
    if (this.currentLanguage === 'english') return null;
    const vowelData = this.baseVowels[this.currentLanguage]?.[pattern];
    if (!vowelData) return null;
    return isStandalone ? vowelData.standalone : vowelData.matra;
  }

  private getNumber(pattern: string): string | null {
    if (this.currentLanguage === 'english') return null;
    return this.numbers[this.currentLanguage]?.[pattern] || null;
  }

  private getSpecialChar(pattern: string): string | null {
    if (this.currentLanguage === 'english') return null;
    return this.specialChars[this.currentLanguage]?.[pattern] || null;
  }

  // Main transliteration function with simplified rules
  transliterateText(text: string): string {
    if (this.currentLanguage === 'english') return text;

    let result = '';
    let i = 0;

    while (i < text.length) {
      let found = false;

      // Handle 'M' after vowels (anusvara)
      if (text[i] === 'M') {
        const prevChar = result[result.length - 1];
        const anusvaraMark = this.currentLanguage === 'hindi' ? 'ं' : 'ં';

        if (
          prevChar &&
          // Gujarati vowel matras
          (['ા', 'િ', 'ી', 'ુ', 'ૂ', 'ે', 'ૈ', 'ો', 'ૌ', 'ૃ'].includes(
            prevChar,
          ) ||
            // Hindi vowel matras
            ['ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ', 'ृ'].includes(
              prevChar,
            ) ||
            // Standalone vowels
            ['અ', 'આ', 'ઇ', 'ઈ', 'ઉ', 'ઊ', 'એ', 'ઐ', 'ઓ', 'ઔ'].includes(
              prevChar,
            ) ||
            ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ'].includes(
              prevChar,
            ) ||
            // End of word
            i === text.length - 1 ||
            /[\s.,!?;:]/.test(text[i + 1]))
        ) {
          result += anusvaraMark;
          i++;
          found = true;
        }
      }

      if (!found) {
        // First, try consonant patterns (longest first)
        for (const pattern of this.consonantPatterns) {
          if (i + pattern.length <= text.length) {
            const substr = text.substring(i, i + pattern.length);

            if (substr === pattern) {
              // Check for special characters first
              const specialChar = this.getSpecialChar(pattern);
              if (specialChar) {
                result += specialChar;
                i += pattern.length;
                found = true;
                break;
              }

              // Check for numbers
              const number = this.getNumber(pattern);
              if (number) {
                result += number;
                i += pattern.length;
                found = true;
                break;
              }

              // Check for consonants
              const consonant = this.getConsonant(pattern);
              if (consonant) {
                result += consonant;
                i += pattern.length;

                // Look for following vowel (longest first)
                let vowelProcessed = false;

                for (const vowelPattern of this.vowelPatterns) {
                  if (i + vowelPattern.length <= text.length) {
                    const vowelSubstr = text.substring(
                      i,
                      i + vowelPattern.length,
                    );

                    if (vowelSubstr === vowelPattern) {
                      if (vowelPattern === 'a') {
                        // Inherent 'a', skip it
                        i += vowelPattern.length;
                        vowelProcessed = true;
                        break;
                      } else {
                        // Add vowel matra
                        const vowelMatra = this.getVowel(vowelPattern, false);
                        if (vowelMatra) {
                          result += vowelMatra;
                          i += vowelPattern.length;
                          vowelProcessed = true;
                          break;
                        }
                      }
                    }
                  }
                }

                // If no vowel found, check for conjunct consonant (even for pre-formed conjuncts)
                if (!vowelProcessed) {
                  // Check if next character(s) form a consonant
                  let nextIsConsonant = false;

                  for (const nextPattern of this.consonantPatterns) {
                    if (i + nextPattern.length <= text.length) {
                      const nextSubstr = text.substring(
                        i,
                        i + nextPattern.length,
                      );
                      if (
                        nextSubstr === nextPattern &&
                        this.isConsonant(nextPattern)
                      ) {
                        nextIsConsonant = true;
                        break;
                      }
                    }
                  }

                  // Add virama for conjunct consonant
                  if (
                    nextIsConsonant &&
                    i < text.length &&
                    !/[\s.,!?;:]/.test(text[i])
                  ) {
                    result += this.virama[this.currentLanguage];
                  }
                }

                found = true;
                break;
              }
            }
          }
        }

        // If no consonant found, try vowel patterns for standalone vowels (only at word boundaries)
        if (!found) {
          const isWordStart = i === 0 || /[\s.,!?;:()]/.test(text[i - 1]);
          const isWordEnd =
            i === text.length - 1 || /[\s.,!?;:()]/.test(text[i + 1]);

          // Skip word-ending 'a' as it represents inherent vowel
          if (text[i] === 'a' && isWordEnd) {
            i++;
            found = true;
          } else {
            // Check if previous character is a vowel matra or standalone vowel
            const prevChar = result[result.length - 1];
            const afterVowel =
              prevChar &&
              // Gujarati vowel matras and standalone vowels
              ([
                'ા',
                'િ',
                'ી',
                'ુ',
                'ૂ',
                'ે',
                'ૈ',
                'ો',
                'ૌ',
                'ૃ',
                'અ',
                'આ',
                'ઇ',
                'ઈ',
                'ઉ',
                'ઊ',
                'એ',
                'ઐ',
                'ઓ',
                'ઔ',
              ].includes(prevChar) ||
                // Hindi vowel matras and standalone vowels
                [
                  'ा',
                  'ि',
                  'ी',
                  'ु',
                  'ू',
                  'े',
                  'ै',
                  'ो',
                  'ौ',
                  'ृ',
                  'अ',
                  'आ',
                  'इ',
                  'ई',
                  'उ',
                  'ऊ',
                  'ए',
                  'ऐ',
                  'ओ',
                  'औ',
                ].includes(prevChar));

            if (isWordStart || afterVowel) {
              for (const pattern of this.vowelPatterns) {
                if (i + pattern.length <= text.length) {
                  const substr = text.substring(i, i + pattern.length);

                  if (substr === pattern) {
                    const standaloneVowel = this.getVowel(pattern, true);
                    if (standaloneVowel) {
                      result += standaloneVowel;
                      i += pattern.length;
                      found = true;
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      }

      if (!found) {
        // Handle unknown characters
        if (text[i] === ' ') {
          result += ' ';
        } else if (/[.,!?;:()]/.test(text[i])) {
          result += text[i];
        } else {
          // Unknown character, keep as is
          result += text[i];
        }
        i++;
      }
    }

    return result;
  }

  processInput(char: string): { valid: boolean; output: string } {
    if (char.length === 0) return { valid: false, output: '' };
    const output = this.transliterateText(char);
    return { valid: true, output: output };
  }
}

export default function TransliterationPage() {
  const [bhaShaInstance] = useState(() => new BhaSha());
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
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
    setSelectedLanguage(language);
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
    hindi: 'eTale, x for ksha, z for za. namaste!',
    gujarati: 'eTale, x for ksha, z for jha. namaste!',
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
              placeholder="Type in English (phonetic)... e.g., 'namaste' for Hindi, 'kem cho' for Gujarati"
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
            How to Use
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Hindi - Systematic Rules:
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  <strong>Capitalization Effects:</strong>
                </div>
                <div>
                  <code>ch</code> → च, <code>Ch</code> → छ, <code>CHH</code> → छ
                </div>
                <div>
                  <code>th</code> → थ, <code>Th</code> → ठ
                </div>
                <div>
                  <strong>Special Characters:</strong>
                </div>
                <div>
                  <code>x</code> → क्ष, <code>z</code> → ज़, <code>M</code> → ं
                  (word end)
                </div>
                <div>
                  <strong>Conjunct Consonants:</strong>
                </div>
                <div>
                  <code>namaste</code> → नमस्ते (automatic स्त)
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Gujarati - Systematic Rules:
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  <strong>Capitalization Effects:</strong>
                </div>
                <div>
                  <code>ch</code> → ચ, <code>Ch</code> → છ, <code>CHH</code> → છ
                </div>
                <div>
                  <code>th</code> → થ, <code>Th</code> → ઠ
                </div>
                <div>
                  <strong>Special Characters:</strong>
                </div>
                <div>
                  <code>e</code> → એ, <code>x</code> → ક્ષ, <code>z</code> → ઝ
                </div>
                <div>
                  <strong>Vowel Examples:</strong>
                </div>
                <div>
                  <code>eTale</code> → એટલે, <code>kem chho</code> → કેમ છો
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
