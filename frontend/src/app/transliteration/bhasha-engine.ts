// Types for test results
export interface TestCase {
  input: string;
  expected: string;
  description: string;
}

export interface TestResult extends TestCase {
  actual: string;
  success: boolean;
}

export interface TestResults {
  passed: number;
  failed: number;
  results: TestResult[];
}

// Comprehensive test cases including all the user examples
export const testCases = {
  gujarati: [
    // Basic vowels
    { input: 'a', expected: 'અ', description: 'Basic vowel a' },
    { input: 'aa', expected: 'આ', description: 'Long vowel aa' },
    { input: 'i', expected: 'ઇ', description: 'Short vowel i' },
    { input: 'ee', expected: 'ઈ', description: 'Long vowel ee' },

    // Basic consonants
    { input: 'k', expected: 'ક', description: 'Consonant k' },
    {
      input: 'ka',
      expected: 'ક',
      description: 'Consonant with inherent vowel',
    },
    { input: 'kaa', expected: 'કા', description: 'Consonant with aa matra' },
    { input: 'ki', expected: 'કિ', description: 'Consonant with i matra' },

    // Aspirated consonants
    { input: 'kh', expected: 'ખ', description: 'Aspirated kh' },
    { input: 'th', expected: 'થ', description: 'Dental th' },
    { input: 'Th', expected: 'ઠ', description: 'Retroflex Th' },
    { input: 'chh', expected: 'છ', description: 'Aspirated chh' },
    { input: 'Ch', expected: 'છ', description: 'Aspirated Ch' },

    // Special characters
    { input: 'x', expected: 'ક્ષ', description: 'Special x -> ksha' },
    { input: 'Gn', expected: 'જ્ઞ', description: 'Special Gn -> gya' },
    { input: 'Gy', expected: 'જ્ઞ', description: 'Special Gy -> gya' },

    // Automatic anusvara
    { input: 'ang', expected: 'અંગ', description: 'Auto anusvara: ang' },
    { input: 'anj', expected: 'અંજ', description: 'Auto anusvara: anj' },
    { input: 'ant', expected: 'અંત', description: 'Auto anusvara: ant' },
    { input: 'amp', expected: 'અંપ', description: 'Auto anusvara: amp' },
    { input: 'sangam', expected: 'સંગમ', description: 'Auto anusvara in word' },

    // ZWJ/ZWNJ Support
    {
      input: 'prash--n',
      expected: 'પ્રશ્‍ન',
      description: 'ZWJ with double dash',
    },
    {
      input: 'vid---yaa',
      expected: 'વિદ્‌યા',
      description: 'ZWNJ with triple dash',
    },
    { input: 'an--n', expected: 'અન્‍ન', description: 'ZWJ: an--n' },
    {
      input: 'ud---ghoSh',
      expected: 'ઉદ્‌ઘોષ',
      description: 'ZWNJ: ud---ghoSh',
    },

    // Vowel separation with hyphens
    { input: 'thai', expected: 'થૈ', description: 'Combined vowel ai' },
    {
      input: 'tha-i',
      expected: 'થઇ',
      description: 'Separated vowels with hyphen',
    },
    { input: 'dau', expected: 'દૌ', description: 'Combined vowel au' },
    {
      input: 'da-u',
      expected: 'દઉ',
      description: 'Separated vowels with hyphen',
    },

    // Dead consonants (virama)
    {
      input: 'daMDavat-',
      expected: 'દંડવત્',
      description: 'Dead consonant with trailing hyphen',
    },

    // USER PROVIDED EXAMPLES - Real Gujarati Words
    {
      input: 'namaste',
      expected: 'નમસ્તે',
      description: '🎯 User Example: namaste',
    },
    {
      input: 'suprabhaat',
      expected: 'સુપ્રભાત',
      description: '🎯 User Example: suprabhaat',
    },
    { input: 'karm', expected: 'કર્મ', description: '🎯 User Example: karm' },
    { input: 'shree', expected: 'શ્રી', description: '🎯 User Example: shree' },
    {
      input: 'vidyaa',
      expected: 'વિદ્યા',
      description: '🎯 User Example: vidyaa',
    },
    {
      input: 'vid---yaa',
      expected: 'વિદ્‌યા',
      description: '🎯 User Example: vid---yaa (ZWNJ)',
    },
    { input: 'padm', expected: 'પદ્મ', description: '🎯 User Example: padm' },
    {
      input: 'vidvaan',
      expected: 'વિદ્વાન',
      description: '🎯 User Example: vidvaan',
    },
    {
      input: 'prashn',
      expected: 'પ્રશ્ન',
      description: '🎯 User Example: prashn',
    },
    {
      input: 'prash--n',
      expected: 'પ્રશ્‍ન',
      description: '🎯 User Example: prash--n (ZWJ)',
    },
    { input: 'ann', expected: 'અન્ન', description: '🎯 User Example: ann' },
    {
      input: 'an--n',
      expected: 'અન્‍ન',
      description: '🎯 User Example: an--n (ZWJ)',
    },
    {
      input: 'ud---ghoSh',
      expected: 'ઉદ્‌ઘોષ',
      description: '🎯 User Example: ud---ghoSh (ZWNJ)',
    },
    {
      input: 'daMDavat-',
      expected: 'દંડવત્',
      description: '🎯 User Example: daMDavat-',
    },
    { input: 'thai', expected: 'થૈ', description: '🎯 User Example: thai' },
    { input: 'tha-i', expected: 'થઇ', description: '🎯 User Example: tha-i' },
    { input: 'dau', expected: 'દૌ', description: '🎯 User Example: dau' },
    { input: 'da-u', expected: 'દઉ', description: '🎯 User Example: da-u' },

    // Additional complex words
    {
      input: 'kem chho',
      expected: 'કેમ છો',
      description: 'Two words: kem chho',
    },
    {
      input: 'gujaraatI',
      expected: 'ગુજરાતી',
      description: 'gujaraatI -> ગુજરાતી (corrected)',
    },
    {
      input: 'gujarati',
      expected: 'ગુજરાતી',
      description: 'gujarati -> ગુજરાતી',
    },

    // Numbers
    { input: '0123456789', expected: '૦૧૨૩૪૫૬૭૮૯', description: 'Numbers 0-9' },

    // Punctuation
    { input: 'OM', expected: 'ૐ', description: 'Sacred OM' },
    { input: 'Rs', expected: '₹', description: 'Rupee symbol' },
    { input: '|', expected: '।', description: 'Danda' },
    { input: '||', expected: '॥', description: 'Double danda' },
  ],
};

// Comprehensive Indian Language Transliteration System
export class BhaSha {
  private currentLanguage: string = 'english';
  private supportedLanguages: string[] = ['english', 'hindi', 'gujarati'];

  // Language configurations
  private languageConfigs: {
    [key: string]: {
      vowels: { [key: string]: { standalone: string; matra: string } };
      consonants: { [key: string]: string };
      numbers: { [key: string]: string };
      specialChars: { [key: string]: string };
      virama: string;
      anusvara: string;
      chandrabindu: string;
      visarga: string;
      nukta: string;
      avagrah: string;
      zwj: string;
      zwnj: string;
      inherentVowel: string;
    };
  } = {};

  constructor() {
    this.initializeLanguageConfigs();
  }

  private initializeLanguageConfigs() {
    // Gujarati Configuration
    this.languageConfigs.gujarati = {
      vowels: {
        a: { standalone: 'અ', matra: '' }, // inherent vowel
        aa: { standalone: 'આ', matra: 'ા' },
        A: { standalone: 'આ', matra: 'ા' },
        i: { standalone: 'ઇ', matra: 'િ' },
        ee: { standalone: 'ઈ', matra: 'ી' },
        I: { standalone: 'ઈ', matra: 'ી' },
        u: { standalone: 'ઉ', matra: 'ુ' },
        oo: { standalone: 'ઊ', matra: 'ૂ' },
        U: { standalone: 'ઊ', matra: 'ૂ' },
        Ru: { standalone: 'ઋ', matra: 'ૃ' },
        Ri: { standalone: 'ઋ', matra: 'ૃ' },
        RU: { standalone: 'ૠ', matra: 'ૄ' },
        RI: { standalone: 'ૠ', matra: 'ૄ' },
        'Lu-': { standalone: 'ઌ', matra: 'ૢ' },
        'Li-': { standalone: 'ઌ', matra: 'ૢ' },
        'LU-': { standalone: 'ૡ', matra: 'ૣ' },
        'LI-': { standalone: 'ૡ', matra: 'ૣ' },
        // R should only be used as matra, not standalone
        R: { standalone: '', matra: 'ૃ' }, // For kR → કૃ (matra only)
        E: { standalone: 'ઍ', matra: 'ૅ' }, // Chandra E
        e: { standalone: 'એ', matra: 'ે' },
        ai: { standalone: 'ઐ', matra: 'ૈ' },
        O: { standalone: 'ઑ', matra: 'ૉ' }, // Chandra O
        o: { standalone: 'ઓ', matra: 'ો' },
        au: { standalone: 'ઔ', matra: 'ૌ' },
        ou: { standalone: 'ઔ', matra: 'ૌ' },
      },
      consonants: {
        // Special combinations MUST come first (longest first)
        chh: 'છ',
        Ch: 'છ',
        kh: 'ખ',
        gh: 'ઘ',
        jh: 'ઝ',
        Th: 'ઠ',
        Dh: 'ઢ',
        th: 'થ',
        dh: 'ધ',
        ph: 'ફ',
        bh: 'ભ',
        sh: 'શ',
        Sh: 'ષ',
        NG: 'ઙ',
        NY: 'ઞ',
        ch: 'ચ',
        // Single consonants (both cases)
        K: 'ક', // uppercase K
        k: 'ક',
        G: 'ગ', // uppercase G
        g: 'ગ',
        C: 'ચ',
        J: 'જ', // uppercase J
        j: 'જ',
        z: 'ઝ', // alternate for jh
        T: 'ટ',
        D: 'ડ',
        N: 'ણ',
        t: 'ત',
        d: 'દ',
        n: 'ન',
        P: 'પ', // uppercase P
        p: 'પ',
        F: 'ફ', // uppercase F
        f: 'ફ',
        B: 'બ', // uppercase B
        b: 'બ',
        m: 'મ', // lowercase m for consonant (not anusvara)
        Y: 'ય', // uppercase Y
        y: 'ય',
        R: 'ર',
        r: 'ર',
        L: 'ળ', // retroflex L
        l: 'લ',
        V: 'વ', // uppercase V
        v: 'વ',
        W: 'વ', // uppercase W
        w: 'વ',
        S: 'શ',
        s: 'સ',
        h: 'હ', // h for consonant (H is handled as visarga),
      },
      numbers: {
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
      specialChars: {
        // ZWJ/ZWNJ must come before single/double dashes
        '---': '\u200C', // ZWNJ (Zero Width Non-Joiner)
        '--': '\u200D', // ZWJ (Zero Width Joiner)
        // Special combinations
        kSh: 'ક્ષ',
        x: 'ક્ષ',
        Gn: 'જ્ઞ',
        Gy: 'જ્ઞ',
        Sr: 'શ્ર', // श्र combination
        // Compound vowel + anusvara/visarga patterns
        aM: 'અં', // a + anusvara
        'a.n': 'અં', // a + explicit anusvara
        'a.m': 'અં', // a + explicit anusvara
        aH: 'અઃ', // a + visarga
        'a:': 'અઃ', // a + visarga
        // Other special chars (explicit patterns only)
        'aM-': 'ઁ',
        'M-': 'ઁ',
        M: 'ં', // standalone anusvara
        '.M': 'ં', // explicit anusvara
        '.n': 'ં',
        '.m': 'ં',
        H: 'ઃ', // standalone visarga
        '.H': 'ઃ', // explicit visarga
        ':': 'ઃ',
        '*': '઼', // nukta
        '*-': '*',
        '.a': 'ઽ', // avagrah
        '||': '॥',
        '|': '।',
        'Rs-': '૱',
        Rs: '₹',
        OM: 'ૐ',
        '+-': '卐',
        '|-': '|',
        ':-': ':',
        // Note: '.' should remain as '.' (purna viram), not '।' (danda)
        // Only '|' should be converted to '।'
      },
      virama: '્',
      anusvara: 'ં',
      chandrabindu: 'ઁ',
      visarga: 'ઃ',
      nukta: '઼',
      avagrah: 'ઽ',
      zwj: '\u200D',
      zwnj: '\u200C',
      inherentVowel: 'a',
    };

    // Hindi Configuration (basic setup for future expansion)
    this.languageConfigs.hindi = {
      vowels: {
        a: { standalone: 'अ', matra: '' },
        aa: { standalone: 'आ', matra: 'ा' },
        A: { standalone: 'आ', matra: 'ा' },
        i: { standalone: 'इ', matra: 'ि' },
        ee: { standalone: 'ई', matra: 'ी' },
        I: { standalone: 'ई', matra: 'ी' },
        u: { standalone: 'उ', matra: 'ु' },
        oo: { standalone: 'ऊ', matra: 'ू' },
        U: { standalone: 'ऊ', matra: 'ू' },
        e: { standalone: 'ए', matra: 'े' },
        ai: { standalone: 'ऐ', matra: 'ै' },
        o: { standalone: 'ओ', matra: 'ो' },
        au: { standalone: 'औ', matra: 'ौ' },
        Ri: { standalone: 'ऋ', matra: 'ृ' },
      },
      consonants: {
        chh: 'छ',
        kh: 'ख',
        gh: 'घ',
        jh: 'झ',
        Th: 'ठ',
        Dh: 'ढ',
        th: 'थ',
        dh: 'ध',
        ph: 'फ',
        bh: 'भ',
        sh: 'श',
        Sh: 'ष',
        NG: 'ङ',
        NY: 'ञ',
        ch: 'च',
        k: 'क',
        g: 'ग',
        j: 'ज',
        T: 'ट',
        D: 'ड',
        N: 'ण',
        t: 'त',
        d: 'द',
        n: 'न',
        p: 'प',
        b: 'ब',
        m: 'म',
        y: 'य',
        r: 'र',
        l: 'ल',
        v: 'व',
        w: 'व',
        s: 'स',
        h: 'ह',
      },
      numbers: {
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
      specialChars: {
        x: 'क्ष',
        Gy: 'ज्ञ',
        M: 'ं',
        '.n': 'ं',
        '.m': 'ं',
        H: 'ः',
        ':': 'ः',
        '|': '।',
        '||': '॥',
        Rs: '₹',
        OM: 'ॐ',
        '--': '\u200D',
        '---': '\u200C',
      },
      virama: '्',
      anusvara: 'ं',
      chandrabindu: 'ँ',
      visarga: 'ः',
      nukta: '़',
      avagrah: 'ऽ',
      zwj: '\u200D',
      zwnj: '\u200C',
      inherentVowel: 'a',
    };
  }

  // Pattern arrays (longest first for proper matching)
  private getConsonantPatterns(): string[] {
    const config = this.getConfig();
    if (!config) return [];
    return Object.keys(config.consonants).sort((a, b) => b.length - a.length);
  }

  private getVowelPatterns(): string[] {
    const config = this.getConfig();
    if (!config) return [];
    return Object.keys(config.vowels).sort((a, b) => b.length - a.length);
  }

  private getSpecialPatterns(): string[] {
    const config = this.getConfig();
    if (!config) return [];
    return Object.keys(config.specialChars).sort((a, b) => b.length - a.length);
  }

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

  private getConfig() {
    return this.languageConfigs[this.currentLanguage];
  }

  private isVowel(pattern: string): boolean {
    if (this.currentLanguage === 'english') return false;
    const config = this.getConfig();
    return config && config.vowels[pattern] !== undefined;
  }

  private isConsonant(pattern: string): boolean {
    if (this.currentLanguage === 'english') return false;
    const config = this.getConfig();
    return config && config.consonants[pattern] !== undefined;
  }

  private getConsonant(pattern: string): string | null {
    if (this.currentLanguage === 'english') return null;
    const config = this.getConfig();
    return config?.consonants[pattern] || null;
  }

  private getVowel(
    pattern: string,
    isStandalone: boolean = false,
  ): string | null {
    if (this.currentLanguage === 'english') return null;
    const config = this.getConfig();
    const vowelData = config?.vowels[pattern];
    if (!vowelData) return null;
    return isStandalone ? vowelData.standalone : vowelData.matra;
  }

  private getNumber(pattern: string): string | null {
    if (this.currentLanguage === 'english') return null;
    const config = this.getConfig();
    return config?.numbers[pattern] || null;
  }

  private getSpecialChar(pattern: string): string | null {
    if (this.currentLanguage === 'english') return null;
    const config = this.getConfig();
    return config?.specialChars[pattern] || null;
  }

  // Check if n/m should convert to anusvara based on following character
  private shouldConvertToAnusvara(char: string, nextChars: string): boolean {
    if (this.currentLanguage === 'english') return false;

    const config = this.getConfig();
    if (!config) return false;

    // Check for explicit anusvara patterns or hyphens
    if (
      nextChars.startsWith('-') ||
      nextChars.startsWith('M') ||
      nextChars.startsWith('.n') ||
      nextChars.startsWith('.m')
    ) {
      return false; // explicit patterns take precedence
    }

    // Anusvara rules for Gujarati
    if (char === 'n') {
      // n converts to anusvara before:
      // k, kh, g, gh (gutturals)
      // ch, chh, j, jh (palatals)
      // T, Th, D, Dh (retroflexes)
      // t, th, d, dh (dentals)
      // l, sh, Sh, s (others)
      const patterns = [
        'k',
        'kh',
        'g',
        'gh',
        'ch',
        'chh',
        'Ch',
        'j',
        'jh',
        'z',
        'T',
        'Th',
        'D',
        'Dh',
        't',
        'th',
        'd',
        'dh',
        'l',
        'sh',
        'Sh',
        'S',
        's',
      ];
      return patterns.some((pattern) => nextChars.startsWith(pattern));
    } else if (char === 'm') {
      // m converts to anusvara before p, ph, v, w
      // For b, bh: convert to anusvara only at word end, otherwise conjunct
      if (nextChars.startsWith('b') || nextChars.startsWith('bh')) {
        // Check if this mb/mbh is at word end
        const bPattern = nextChars.startsWith('bh') ? 'bh' : 'b';
        const afterB = nextChars.substring(bPattern.length);
        const isAtWordEnd = afterB === '' || /^[\s.,!?;:()]/.test(afterB);
        return isAtWordEnd;
      }
      const patterns = ['p', 'ph', 'f', 'v', 'w'];
      return patterns.some((pattern) => nextChars.startsWith(pattern));
    }

    return false;
  }

  // Main transliteration function
  transliterateText(text: string): string {
    if (this.currentLanguage === 'english') return text;

    const config = this.getConfig();
    if (!config) return text;

    let result = '';
    let i = 0;
    let hyphenBreak = false;

    while (i < text.length) {
      let found = false;
      let consumed = 0;

      // Handle special patterns first (longest first)
      for (const pattern of this.getSpecialPatterns()) {
        if (i + pattern.length <= text.length) {
          const substr = text.substring(i, i + pattern.length);
          if (substr === pattern) {
            const specialChar = this.getSpecialChar(pattern);
            if (specialChar) {
              result += specialChar;
              consumed = pattern.length;
              found = true;
              break;
            }
          }
        }
      }

      if (!found) {
        // Check for anusvara conversion (before consonants)
        if ((text[i] === 'n' || text[i] === 'm') && i + 1 < text.length) {
          const remainingText = text.substring(i + 1);
          if (this.shouldConvertToAnusvara(text[i], remainingText)) {
            result += config.anusvara;
            consumed = 1;
            found = true;
          }
        }
      }

      if (!found) {
        // Handle numbers
        const number = this.getNumber(text[i]);
        if (number) {
          result += number;
          consumed = 1;
          found = true;
        }
      }

      if (!found) {
        // Check for vocalic consonants first (Ru, Ri, etc.) before regular consonants
        for (const pattern of this.getVowelPatterns()) {
          if (i + pattern.length <= text.length) {
            const substr = text.substring(i, i + pattern.length);
            if (substr === pattern) {
              // Only check vocalic consonants here (patterns that look like consonants but are vowels)
              // Only multi-character patterns like Ru, Ri should be vocalic, not standalone R
              const isVocalicConsonant = [
                'Ru',
                'Ri',
                'RU',
                'RI',
                'Lu-',
                'Li-',
                'LU-',
                'LI-',
              ].includes(pattern);

              if (isVocalicConsonant) {
                const standaloneVowel = this.getVowel(pattern, true);
                if (standaloneVowel) {
                  result += standaloneVowel;
                  consumed = pattern.length;
                  found = true;
                  break;
                }
              }
            }
          }
        }
      }

      if (!found) {
        // Handle consonant patterns (longest first)
        for (const pattern of this.getConsonantPatterns()) {
          if (i + pattern.length <= text.length) {
            const substr = text.substring(i, i + pattern.length);
            if (substr === pattern) {
              const consonant = this.getConsonant(pattern);
              if (consonant) {
                result += consonant;
                consumed = pattern.length;

                // Look for following vowel
                let vowelConsumed = 0;
                let vowelFound = false;

                if (hyphenBreak) {
                  hyphenBreak = false;
                } else {
                  for (const vowelPattern of this.getVowelPatterns()) {
                    if (i + consumed + vowelPattern.length <= text.length) {
                      const vowelSubstr = text.substring(
                        i + consumed,
                        i + consumed + vowelPattern.length,
                      );
                      if (vowelSubstr === vowelPattern) {
                        if (vowelPattern === config.inherentVowel) {
                          // Inherent vowel, skip it
                          vowelConsumed = vowelPattern.length;
                        } else {
                          // Add vowel matra
                          const vowelMatra = this.getVowel(vowelPattern, false);
                          if (vowelMatra) {
                            result += vowelMatra;
                            vowelConsumed = vowelPattern.length;
                          }
                        }
                        vowelFound = true;
                        break;
                      }
                    }
                  }
                }

                // Check for conjunct consonant (if no vowel found)
                if (!vowelFound && !hyphenBreak) {
                  // Check if next character(s) form a consonant or ZWJ/ZWNJ
                  let nextIsConsonant = false;
                  let hasZWJ = false;
                  let hasZWNJ = false;
                  let checkPos = i + consumed;

                  // Check for ZWJ/ZWNJ first
                  if (
                    checkPos + 3 <= text.length &&
                    text.substring(checkPos, checkPos + 3) === '---'
                  ) {
                    hasZWNJ = true;
                    checkPos += 3;
                  } else if (
                    checkPos + 2 <= text.length &&
                    text.substring(checkPos, checkPos + 2) === '--'
                  ) {
                    hasZWJ = true;
                    checkPos += 2;
                  }

                  // Then check for consonant after ZWJ/ZWNJ
                  for (const nextPattern of this.getConsonantPatterns()) {
                    if (checkPos + nextPattern.length <= text.length) {
                      const nextSubstr = text.substring(
                        checkPos,
                        checkPos + nextPattern.length,
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
                    checkPos < text.length &&
                    !/[\s.,!?;:\-]/.test(text[checkPos])
                  ) {
                    result += config.virama;
                    // Add ZWJ/ZWNJ after virama
                    if (hasZWJ) {
                      result += config.zwj;
                      consumed += 2; // consume the '--'
                    } else if (hasZWNJ) {
                      result += config.zwnj;
                      consumed += 3; // consume the '---'
                    }
                  }
                }

                consumed += vowelConsumed;
                found = true;
                break;
              }
            }
          }
        }
      }

      if (!found) {
        // Handle standalone vowels (including vocalic consonants like Ru, Ri)
        const isWordStart = i === 0 || /[\s.,!?;:()]/.test(text[i - 1]);
        const isWordEnd =
          i + 1 >= text.length || /[\s.,!?;:()]/.test(text[i + 1]);
        const isAfterHyphen = hyphenBreak;

        // For vocalic consonants like Ru, Ri, we should check them regardless of word position
        for (const pattern of this.getVowelPatterns()) {
          if (i + pattern.length <= text.length) {
            const substr = text.substring(i, i + pattern.length);
            if (substr === pattern) {
              // Special handling for vocalic consonants - they can appear anywhere
              const isVocalicConsonant = [
                'Ru',
                'Ri',
                'RU',
                'RI',
                'Lu-',
                'Li-',
                'LU-',
                'LI-',
              ].includes(pattern);

              if (
                isWordStart ||
                isAfterHyphen ||
                isWordEnd ||
                isVocalicConsonant
              ) {
                const standaloneVowel = this.getVowel(pattern, true);
                if (standaloneVowel) {
                  result += standaloneVowel;
                  consumed = pattern.length;
                  hyphenBreak = false;
                  found = true;
                  break;
                }
              }
            }
          }
        }
      }

      if (!found) {
        // Handle hyphen for vowel separation or virama
        if (text[i] === '-') {
          if (i === text.length - 1) {
            // Hyphen at end - add virama
            result += config.virama;
            consumed = 1;
            found = true;
          } else {
            // Hyphen in middle - check context
            const nextChar = text[i + 1];
            if (this.isVowel(nextChar) || /[aeiouAEIOU]/.test(nextChar)) {
              // Vowel separation
              hyphenBreak = true;
              consumed = 1;
              found = true;
            } else if (/[\s.,!?;:()]/.test(nextChar)) {
              // Hyphen followed by word boundary - add virama (dead consonant)
              result += config.virama;
              consumed = 1;
              // Only consume the space if it's the last character or followed by punctuation
              if (
                nextChar === ' ' &&
                (i + 2 >= text.length || /[.,!?;:()]/.test(text[i + 2]))
              ) {
                // Consume the space only if it's at the end or followed by punctuation
                consumed = 2;
              }
              found = true;
            } else {
              // Regular hyphen
              result += '-';
              consumed = 1;
              found = true;
            }
          }
        }
      }

      if (!found) {
        // Handle other characters
        if (text[i] === ' ') {
          result += ' ';
          hyphenBreak = false;
        } else if (/[.,!?;:()]/.test(text[i])) {
          result += text[i];
          hyphenBreak = false;
        } else {
          // Unknown character, keep as is
          result += text[i];
        }
        consumed = 1;
      }

      i += consumed || 1;
    }

    return result;
  }

  processInput(char: string): { valid: boolean; output: string } {
    if (char.length === 0) return { valid: false, output: '' };
    const output = this.transliterateText(char);
    return { valid: true, output: output };
  }

  // Test function
  runTests(): TestResults {
    const config = testCases[this.currentLanguage as keyof typeof testCases];
    if (!config) return { passed: 0, failed: 0, results: [] };

    let passed = 0;
    let failed = 0;
    const results: TestResult[] = [];

    for (const testCase of config) {
      const actual = this.transliterateText(testCase.input);
      const success = actual === testCase.expected;

      if (success) {
        passed++;
      } else {
        failed++;
      }

      results.push({
        ...testCase,
        actual,
        success,
      });
    }

    return { passed, failed, results };
  }
}
