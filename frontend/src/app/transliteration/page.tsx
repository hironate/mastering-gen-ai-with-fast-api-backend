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
      a: { standalone: 'अ', matra: '' },
      A: { standalone: 'आ', matra: 'ा' },
      aa: { standalone: 'आ', matra: 'ा' },
      AA: { standalone: 'आ', matra: 'ा' },
      i: { standalone: 'इ', matra: 'ि' },
      I: { standalone: 'ई', matra: 'ी' },
      ii: { standalone: 'ई', matra: 'ी' },
      II: { standalone: 'ई', matra: 'ी' },
      u: { standalone: 'उ', matra: 'ु' },
      U: { standalone: 'ऊ', matra: 'ू' },
      uu: { standalone: 'ऊ', matra: 'ू' },
      UU: { standalone: 'ऊ', matra: 'ू' },
      e: { standalone: 'ए', matra: 'े' },
      E: { standalone: 'ए', matra: 'े' },
      ai: { standalone: 'ऐ', matra: 'ै' },
      o: { standalone: 'ओ', matra: 'ो' },
      O: { standalone: 'ओ', matra: 'ो' },
      au: { standalone: 'औ', matra: 'ौ' },
      ri: { standalone: 'ऋ', matra: 'ृ' },
      Ri: { standalone: 'ऋ', matra: 'ृ' },
      Ru: { standalone: 'ऋ', matra: 'ृ' },
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
      ee: { standalone: 'ઈ', matra: 'ી' },
      u: { standalone: 'ઉ', matra: 'ુ' },
      U: { standalone: 'ઊ', matra: 'ૂ' },
      uu: { standalone: 'ઊ', matra: 'ૂ' },
      UU: { standalone: 'ઊ', matra: 'ૂ' },
      oo: { standalone: 'ઊ', matra: 'ૂ' },
      e: { standalone: 'એ', matra: 'ે' },
      E: { standalone: 'ઍ', matra: 'ૅ' }, // Chandra E
      ai: { standalone: 'ઐ', matra: 'ૈ' },
      o: { standalone: 'ઓ', matra: 'ો' },
      O: { standalone: 'ઑ', matra: 'ૉ' }, // Chandra O
      au: { standalone: 'ઔ', matra: 'ૌ' },
      ou: { standalone: 'ઔ', matra: 'ૌ' },
      ri: { standalone: 'ઋ', matra: 'ૃ' },
      Ri: { standalone: 'ઋ', matra: 'ૃ' },
      Ru: { standalone: 'ઋ', matra: 'ૃ' },
      RI: { standalone: 'ૠ', matra: 'ૄ' },
      RU: { standalone: 'ૠ', matra: 'ૄ' },
      'Lu-': { standalone: 'ઌ', matra: 'ૢ' },
      'Li-': { standalone: 'ઌ', matra: 'ૢ' },
      'LU-': { standalone: 'ૡ', matra: 'ૣ' },
      'LI-': { standalone: 'ૡ', matra: 'ૣ' },
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
      C: 'ચ',
      Ch: 'છ',
      CH: 'છ',
      chh: 'છ',
      CHH: 'છ',
      j: 'જ',
      J: 'જ',
      jh: 'ઝ',
      Jh: 'ઝ',
      JH: 'ઝ',
      z: 'ઝ',
      Z: 'ઝ',
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
      f: 'ફ',
      F: 'ફ',
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
      S: 'શ',
      shh: 'ષ',
      Shh: 'ષ',
      SHH: 'ષ',
      s: 'સ',
      h: 'હ',
      H: 'હ',

      // Special combinations
      x: 'ક્ષ',
      X: 'ક્ષ',
      ksh: 'ક્ષ',
      KSH: 'ક્ષ',
      kSh: 'ક્ષ',
      Gn: 'જ્ઞ',
      Gy: 'જ્ઞ',
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
      '.m': 'ं',
      aM: 'ं',
      'M-': 'ँ',
      'aM-': 'ँ',
      H: 'ः',
      '.h': 'ः',
      ':': 'ः',
      aH: 'ः',
      'a:': 'ः',
      '.': '।',
      '|': '।',
      '|-': '|',
      '..': '॥',
      '||': '॥',
      OM: 'ॐ',
      AUM: 'ॐ',
      '*': '्',
      '*-': '*',
      ':-': ':',
      Rs: '₹',
      'Rs-': '૱',
    },
    gujarati: {
      M: 'ં',
      '.n': 'ં',
      '.m': 'ં',
      aM: 'ં',
      'M-': 'ઁ',
      'aM-': 'ઁ',
      H: 'ઃ',
      '.h': 'ઃ',
      ':': 'ઃ',
      aH: 'ઃ',
      'a:': 'ઃ',
      '.': '।',
      '|': '।',
      '|-': '|',
      '..': '॥',
      '||': '॥',
      OM: 'ૐ',
      AUM: 'ૐ',
      '*': '઼',
      '*-': '*', // nukta
      '.a': 'ઽ', // avagrah
      ':-': ':',
      Rs: '₹',
      'Rs-': '૱',
      '+-': '卐', // swastika
      '--': '‍', // ZWJ (Zero Width Joiner)
      '---': '‌', // ZWNJ (Zero Width Non Joiner)
    },
  };

  // Virama (halant)
  private virama: { [key: string]: string } = {
    hindi: '्',
    gujarati: '્',
  };

  // Vowel patterns for recognition (ordered by length, longest first)
  private vowelPatterns = [
    'LU-',
    'LI-',
    'Lu-',
    'Li-',
    'aM-',
    'aH',
    'a:',
    'lri',
    'uu',
    'UU',
    'oo',
    'aa',
    'AA',
    'ii',
    'II',
    'ee',
    'ai',
    'au',
    'ou',
    'ay',
    'ri',
    'Ri',
    'Ru',
    'RI',
    'RU',
    'aM',
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
    'kSh',
    'khh',
    'KHH',
    'ghh',
    'GHH',
    'Gn',
    'Gy',
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
    'C',
  ];

  // Special character patterns (longest first)
  private specialPatterns = [
    'aM-',
    'aH',
    'a:',
    '---',
    '--',
    '+-',
    'Rs-',
    'Rs',
    'OM',
    'AUM',
    '*-',
    ':-',
    '|-',
    '||',
    '..',
    '.a',
    '.n',
    '.m',
    '.h',
    'M-',
    'M',
    'H',
    '.',
    '|',
    ':',
    '*',
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

  // Main transliteration function with comprehensive rules
  transliterateText(text: string): string {
    if (this.currentLanguage === 'english') return text;

    let result = '';
    let i = 0;
    let hyphenBreak = false; // Track if we just processed a hyphen break

    while (i < text.length) {
      let found = false;

      // Handle hyphen-based rules first
      if (text[i] === '-') {
        // Count consecutive hyphens
        let hyphenCount = 0;
        let j = i;
        while (j < text.length && text[j] === '-') {
          hyphenCount++;
          j++;
        }

        if (hyphenCount === 3) {
          // Triple hyphen --- for ZWJ (Zero Width Joiner)
          result += this.specialChars[this.currentLanguage]['---'] || '\u200D';
          i += 3;
          found = true;
        } else if (hyphenCount === 2) {
          // Double hyphen -- for dead consonant or ZWNJ
          if (i > 0) {
            const prevPattern = this.findConsonantPattern(text, i - 1, -1);
            if (prevPattern) {
              // Add virama (dead consonant)
              result += this.virama[this.currentLanguage];
              i += 2;
              found = true;
            } else {
              // ZWNJ (Zero Width Non-Joiner)
              result +=
                this.specialChars[this.currentLanguage]['--'] || '\u200C';
              i += 2;
              found = true;
            }
          } else {
            // ZWNJ at start
            result += this.specialChars[this.currentLanguage]['--'] || '\u200C';
            i += 2;
            found = true;
          }
        } else if (hyphenCount === 1) {
          // Single hyphen for vowel separation or dead consonant at word end
          if (i === text.length - 1) {
            // Hyphen at end - add virama
            result += this.virama[this.currentLanguage];
            i++;
            found = true;
          } else {
            // Hyphen in middle - this breaks vowel combinations
            // Set flag to prevent compound vowel formation
            hyphenBreak = true;
            i++;
            found = true;
          }
        }
      }

      if (!found) {
        // Try special patterns first (longest first)
        for (const pattern of this.specialPatterns) {
          if (i + pattern.length <= text.length) {
            const substr = text.substring(i, i + pattern.length);

            if (substr === pattern) {
              const specialChar = this.getSpecialChar(pattern);
              if (specialChar) {
                result += specialChar;
                i += pattern.length;
                found = true;
                break;
              }
            }
          }
        }
      }

      if (!found) {
        // Context-sensitive n/m to anusvara conversion
        if ((text[i] === 'n' || text[i] === 'm') && i + 1 < text.length) {
          const nextChar = text[i + 1];
          const shouldConvertToAnusvara = this.shouldConvertToAnusvara(
            text[i],
            nextChar,
          );

          if (shouldConvertToAnusvara) {
            result += this.currentLanguage === 'hindi' ? 'ं' : 'ં';
            i++;
            found = true;
          }
        }
      }

      if (!found) {
        // Try consonant patterns first (longest first)
        for (const pattern of this.consonantPatterns) {
          if (i + pattern.length <= text.length) {
            const substr = text.substring(i, i + pattern.length);

            if (substr === pattern) {
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

                // If hyphen break, treat next vowel as standalone
                if (hyphenBreak) {
                  hyphenBreak = false; // Reset flag
                  // Don't process vowel as matra, let it be processed as standalone
                } else {
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
                }

                // If no vowel found, check for conjunct consonant
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

        // If no consonant found, try vowel patterns for standalone vowels
        if (!found) {
          const isWordStart = i === 0 || /[\s.,!?;:()]/.test(text[i - 1]);
          const isWordEnd =
            i === text.length - 1 || /[\s.,!?;:()]/.test(text[i + 1]);
          const prevChar = result[result.length - 1];

          // Check if previous character is a vowel matra or standalone vowel
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
              'ૄ',
              'ૢ',
              'ૣ',
              'ૅ',
              'ૉ',
              'અ',
              'આ',
              'ઇ',
              'ઈ',
              'ઉ',
              'ઊ',
              'એ',
              'ઍ',
              'ઐ',
              'ઓ',
              'ઑ',
              'ઔ',
              'ઋ',
              'ૠ',
              'ઌ',
              'ૡ',
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
                'ऋ',
                'ऌ',
              ].includes(prevChar));

          // Skip word-ending 'a' as it represents inherent vowel
          if (text[i] === 'a' && isWordEnd) {
            i++;
            found = true;
          } else if (isWordStart || afterVowel || hyphenBreak) {
            for (const pattern of this.vowelPatterns) {
              if (i + pattern.length <= text.length) {
                const substr = text.substring(i, i + pattern.length);

                if (substr === pattern) {
                  const standaloneVowel = this.getVowel(pattern, true);
                  if (standaloneVowel) {
                    result += standaloneVowel;
                    i += pattern.length;
                    hyphenBreak = false; // Reset flag after processing
                    found = true;
                    break;
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
          hyphenBreak = false; // Reset on word boundary
        } else if (/[.,!?;:()]/.test(text[i])) {
          result += text[i];
          hyphenBreak = false; // Reset on punctuation
        } else {
          // Unknown character, keep as is
          result += text[i];
        }
        i++;
      }
    }

    return result;
  }

  // Helper function to determine if n/m should convert to anusvara
  private shouldConvertToAnusvara(char: string, nextChar: string): boolean {
    if (char === 'n') {
      // n converts to anusvara before k, kh, g, gh, ch, chh, j, jh, T, Th, D, Dh, t, th, d, dh, l, sh, Sh, s
      return /^(k|kh|g|gh|ch|chh|j|jh|T|Th|D|Dh|t|th|d|dh|l|sh|Sh|s|C|S)/.test(
        nextChar,
      );
    } else if (char === 'm') {
      // m converts to anusvara before p, ph, b, bh, v
      return /^(p|ph|b|bh|v)/.test(nextChar);
    }
    return false;
  }

  // Helper function to find consonant pattern backwards
  private findConsonantPattern(
    text: string,
    endIndex: number,
    direction: number,
  ): string | null {
    for (const pattern of this.consonantPatterns) {
      const startIndex =
        direction > 0 ? endIndex : endIndex - pattern.length + 1;
      if (startIndex >= 0 && startIndex + pattern.length <= text.length) {
        const substr = text.substring(startIndex, startIndex + pattern.length);
        if (substr === pattern && this.isConsonant(pattern)) {
          return pattern;
        }
      }
    }
    return null;
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
    hindi: 'namaste, kem chho? x for ksha, z for za. prash--n, vid---yaa',
    gujarati:
      'namaste, kem chho? x for ksha, z for jha. da-u, tha-i, daMDavat-',
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
                <div>
                  <strong>Hyphen Rules:</strong>
                </div>
                <div>
                  <code>prash--n</code> → प्रश्‍न (dead consonant)
                </div>
                <div>
                  <code>vid---yaa</code> → विद्‌या (ZWJ)
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
                <div>
                  <strong>Hyphen Rules:</strong>
                </div>
                <div>
                  <code>da-u</code> → દઉ (prevents દૌ)
                </div>
                <div>
                  <code>tha-i</code> → થઇ (prevents થૈ)
                </div>
                <div>
                  <code>daMDavat-</code> → દંડવત્ (virama at end)
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
