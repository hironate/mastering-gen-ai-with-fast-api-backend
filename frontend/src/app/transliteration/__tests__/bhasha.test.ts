import { BhaSha } from '@bhashaime/core';

describe('BhaSha Transliteration Engine', () => {
  let bhaSha: BhaSha;

  beforeEach(() => {
    bhaSha = new BhaSha();
  });

  describe('Basic Setup', () => {
    test('should support gujarati language', () => {
      expect(bhaSha.supports('gujarati')).toBe(true);
    });

    test('should support hindi language', () => {
      expect(bhaSha.supports('hindi')).toBe(true);
    });

    test('should not support unsupported language', () => {
      expect(bhaSha.supports('french')).toBe(false);
    });

    test('should set language correctly', () => {
      bhaSha.setLanguage('gujarati');
      expect(bhaSha.getLanguage()).toBe('gujarati');
    });
  });

  describe('Gujarati Transliteration', () => {
    beforeEach(() => {
      bhaSha.setLanguage('gujarati');
    });

    describe('Basic Vowels', () => {
      test('should transliterate basic vowels', () => {
        expect(bhaSha.transliterateText('a')).toBe('અ');
        expect(bhaSha.transliterateText('aa')).toBe('આ');
        expect(bhaSha.transliterateText('A')).toBe('આ'); // Alternative for aa
        expect(bhaSha.transliterateText('i')).toBe('ઇ');
        expect(bhaSha.transliterateText('ee')).toBe('ઈ');
        expect(bhaSha.transliterateText('I')).toBe('ઈ'); // Alternative for ee
        expect(bhaSha.transliterateText('u')).toBe('ઉ');
        expect(bhaSha.transliterateText('oo')).toBe('ઊ');
        expect(bhaSha.transliterateText('U')).toBe('ઊ'); // Alternative for oo
        expect(bhaSha.transliterateText('e')).toBe('એ');
        expect(bhaSha.transliterateText('o')).toBe('ઓ');
        expect(bhaSha.transliterateText('ai')).toBe('ઐ');
        expect(bhaSha.transliterateText('au')).toBe('ઔ');
        expect(bhaSha.transliterateText('ou')).toBe('ઔ'); // Alternative for au
      });

      test('should transliterate vocalic consonants', () => {
        expect(bhaSha.transliterateText('Ru')).toBe('ઋ');
        expect(bhaSha.transliterateText('Ri')).toBe('ઋ');
        expect(bhaSha.transliterateText('RU')).toBe('ૠ');
        expect(bhaSha.transliterateText('RI')).toBe('ૠ');
        expect(bhaSha.transliterateText('Lu-')).toBe('ઌ');
        expect(bhaSha.transliterateText('Li-')).toBe('ઌ');
        expect(bhaSha.transliterateText('LU-')).toBe('ૡ');
        expect(bhaSha.transliterateText('LI-')).toBe('ૡ');
      });

      test('should transliterate chandra vowels', () => {
        expect(bhaSha.transliterateText('E')).toBe('ઍ');
        expect(bhaSha.transliterateText('O')).toBe('ઑ');
      });

      test('should transliterate anusvara with vowels', () => {
        expect(bhaSha.transliterateText('aM')).toBe('અં');
        expect(bhaSha.transliterateText('a.n')).toBe('અં');
        expect(bhaSha.transliterateText('a.m')).toBe('અં');
      });

      test('should transliterate visarga with vowels', () => {
        expect(bhaSha.transliterateText('aH')).toBe('અઃ');
        expect(bhaSha.transliterateText('a:')).toBe('અઃ');
      });
    });

    describe('Basic Consonants', () => {
      test('should transliterate basic consonants', () => {
        expect(bhaSha.transliterateText('k')).toBe('ક');
        expect(bhaSha.transliterateText('ka')).toBe('ક');
        expect(bhaSha.transliterateText('kaa')).toBe('કા');
        expect(bhaSha.transliterateText('ki')).toBe('કિ');
        expect(bhaSha.transliterateText('kee')).toBe('કી');
      });

      test('should transliterate guttural consonants', () => {
        expect(bhaSha.transliterateText('k')).toBe('ક');
        expect(bhaSha.transliterateText('kh')).toBe('ખ');
        expect(bhaSha.transliterateText('g')).toBe('ગ');
        expect(bhaSha.transliterateText('gh')).toBe('ઘ');
        expect(bhaSha.transliterateText('NG')).toBe('ઙ');
      });

      test('should transliterate palatal consonants', () => {
        expect(bhaSha.transliterateText('ch')).toBe('ચ');
        expect(bhaSha.transliterateText('chh')).toBe('છ');
        expect(bhaSha.transliterateText('Ch')).toBe('છ'); // Alternative
        expect(bhaSha.transliterateText('j')).toBe('જ');
        expect(bhaSha.transliterateText('jh')).toBe('ઝ');
        expect(bhaSha.transliterateText('z')).toBe('ઝ'); // Alternative for jh
        expect(bhaSha.transliterateText('NY')).toBe('ઞ');
      });

      test('should transliterate retroflex consonants', () => {
        expect(bhaSha.transliterateText('T')).toBe('ટ');
        expect(bhaSha.transliterateText('Th')).toBe('ઠ');
        expect(bhaSha.transliterateText('D')).toBe('ડ');
        expect(bhaSha.transliterateText('Dh')).toBe('ઢ');
        expect(bhaSha.transliterateText('N')).toBe('ણ');
      });

      test('should transliterate dental consonants', () => {
        expect(bhaSha.transliterateText('t')).toBe('ત');
        expect(bhaSha.transliterateText('th')).toBe('થ');
        expect(bhaSha.transliterateText('d')).toBe('દ');
        expect(bhaSha.transliterateText('dh')).toBe('ધ');
        expect(bhaSha.transliterateText('n')).toBe('ન');
      });

      test('should transliterate labial consonants', () => {
        expect(bhaSha.transliterateText('p')).toBe('પ');
        expect(bhaSha.transliterateText('ph')).toBe('ફ');
        expect(bhaSha.transliterateText('f')).toBe('ફ'); // Alternative for ph
        expect(bhaSha.transliterateText('b')).toBe('બ');
        expect(bhaSha.transliterateText('bh')).toBe('ભ');
        expect(bhaSha.transliterateText('m')).toBe('મ');
      });

      test('should transliterate semi-vowels and liquids', () => {
        expect(bhaSha.transliterateText('y')).toBe('ય');
        expect(bhaSha.transliterateText('r')).toBe('ર');
        expect(bhaSha.transliterateText('R')).toBe('ર'); // Alternative for r
        expect(bhaSha.transliterateText('l')).toBe('લ');
        expect(bhaSha.transliterateText('L')).toBe('ળ'); // Retroflex L
        expect(bhaSha.transliterateText('v')).toBe('વ');
        expect(bhaSha.transliterateText('w')).toBe('વ'); // Alternative for v
      });

      test('should transliterate sibilants and aspirates', () => {
        expect(bhaSha.transliterateText('sh')).toBe('શ');
        expect(bhaSha.transliterateText('S')).toBe('શ'); // Alternative for sh
        expect(bhaSha.transliterateText('Sh')).toBe('ષ');
        expect(bhaSha.transliterateText('s')).toBe('સ');
        expect(bhaSha.transliterateText('h')).toBe('હ');
      });
    });

    describe('Consonant + Vowel Combinations (Matras)', () => {
      test('should transliterate consonant with basic vowel matras', () => {
        expect(bhaSha.transliterateText('ka')).toBe('ક'); // inherent vowel
        expect(bhaSha.transliterateText('kaa')).toBe('કા');
        expect(bhaSha.transliterateText('kA')).toBe('કા'); // Alternative
        expect(bhaSha.transliterateText('ki')).toBe('કિ');
        expect(bhaSha.transliterateText('kee')).toBe('કી');
        expect(bhaSha.transliterateText('kI')).toBe('કી'); // Alternative
        expect(bhaSha.transliterateText('ku')).toBe('કુ');
        expect(bhaSha.transliterateText('koo')).toBe('કૂ');
        expect(bhaSha.transliterateText('kU')).toBe('કૂ'); // Alternative
      });

      test('should transliterate consonant with special vowel matras', () => {
        expect(bhaSha.transliterateText('ke')).toBe('કે');
        expect(bhaSha.transliterateText('kai')).toBe('કૈ');
        expect(bhaSha.transliterateText('ko')).toBe('કો');
        expect(bhaSha.transliterateText('kau')).toBe('કૌ');
        expect(bhaSha.transliterateText('kou')).toBe('કૌ'); // Alternative
      });

      test('should transliterate consonant with vocalic matras', () => {
        expect(bhaSha.transliterateText('kR')).toBe('કૃ');
        expect(bhaSha.transliterateText('kRi')).toBe('કૃ');
        expect(bhaSha.transliterateText('kRU')).toBe('કૄ');
        expect(bhaSha.transliterateText('kRI')).toBe('કૄ');
      });
    });

    describe('Special Characters', () => {
      test('should transliterate special combinations', () => {
        expect(bhaSha.transliterateText('x')).toBe('ક્ષ');
        expect(bhaSha.transliterateText('kSh')).toBe('ક્ષ');
        expect(bhaSha.transliterateText('Gn')).toBe('જ્ઞ');
        expect(bhaSha.transliterateText('Gy')).toBe('જ્ઞ');
        expect(bhaSha.transliterateText('Sr')).toBe('શ્ર');
      });

      test('should transliterate anusvara and visarga', () => {
        expect(bhaSha.transliterateText('M')).toBe('ં');
        expect(bhaSha.transliterateText('.n')).toBe('ં');
        expect(bhaSha.transliterateText('.m')).toBe('ં');
        expect(bhaSha.transliterateText('H')).toBe('ઃ');
        expect(bhaSha.transliterateText(':')).toBe('ઃ');
      });

      test('should transliterate punctuation', () => {
        expect(bhaSha.transliterateText('|')).toBe('।');
        expect(bhaSha.transliterateText('||')).toBe('॥');
        expect(bhaSha.transliterateText('OM')).toBe('ૐ');
        expect(bhaSha.transliterateText('Rs')).toBe('₹');
      });

      test('should handle regular punctuation vs danda correctly', () => {
        expect(bhaSha.transliterateText('e karavuM ayogy.')).toBe(
          'એ કરવું અયોગ્ય.',
        );
        expect(bhaSha.transliterateText('e karavuM ayogy|')).toBe(
          'એ કરવું અયોગ્ય।',
        );
        expect(bhaSha.transliterateText('e karavuM ayogy||')).toBe(
          'એ કરવું અયોગ્ય॥',
        );
      });
    });

    describe('Automatic Anusvara Conversion', () => {
      test('should convert n to anusvara before gutturals', () => {
        expect(bhaSha.transliterateText('ang')).toBe('અંગ');
        expect(bhaSha.transliterateText('ank')).toBe('અંક');
        expect(bhaSha.transliterateText('ankh')).toBe('અંખ');
        expect(bhaSha.transliterateText('angh')).toBe('અંઘ');
      });

      test('should convert n to anusvara before palatals', () => {
        expect(bhaSha.transliterateText('anj')).toBe('અંજ');
        expect(bhaSha.transliterateText('anch')).toBe('અંચ');
        expect(bhaSha.transliterateText('anchh')).toBe('અંછ');
        expect(bhaSha.transliterateText('anjh')).toBe('અંઝ');
      });

      test('should convert n to anusvara before dentals', () => {
        expect(bhaSha.transliterateText('ant')).toBe('અંત');
        expect(bhaSha.transliterateText('and')).toBe('અંદ');
        expect(bhaSha.transliterateText('anth')).toBe('અંથ');
        expect(bhaSha.transliterateText('andh')).toBe('અંધ');
      });

      test('should convert m to anusvara before labials', () => {
        expect(bhaSha.transliterateText('amp')).toBe('અંપ');
        expect(bhaSha.transliterateText('amb')).toBe('અંબ');
        expect(bhaSha.transliterateText('amph')).toBe('અંફ');
        expect(bhaSha.transliterateText('ambh')).toBe('અંભ');
        expect(bhaSha.transliterateText('amv')).toBe('અંવ');
      });
    });

    describe('ZWJ/ZWNJ Support', () => {
      test('should handle ZWJ (Zero Width Joiner)', () => {
        expect(bhaSha.transliterateText('prash--n')).toBe('પ્રશ્‍ન');
        expect(bhaSha.transliterateText('an--n')).toBe('અન્‍ન');
      });

      test('should handle ZWNJ (Zero Width Non-Joiner)', () => {
        expect(bhaSha.transliterateText('vid---yaa')).toBe('વિદ્‌યા');
        expect(bhaSha.transliterateText('ud---ghoSh')).toBe('ઉદ્‌ઘોષ');
      });
    });

    describe('Vowel Separation with Hyphens', () => {
      test('should separate vowels with hyphen', () => {
        expect(bhaSha.transliterateText('thai')).toBe('થૈ');
        expect(bhaSha.transliterateText('tha-i')).toBe('થઇ');
        expect(bhaSha.transliterateText('dau')).toBe('દૌ');
        expect(bhaSha.transliterateText('da-u')).toBe('દઉ');
      });
    });

    describe('Dead Consonants (Virama)', () => {
      test('should add virama with trailing hyphen', () => {
        expect(bhaSha.transliterateText('daMDavat-')).toBe('દંડવત્');
      });

      test('should handle dead consonants with space after hyphen', () => {
        expect(bhaSha.transliterateText('daMDavat- ')).toBe('દંડવત્');
        expect(bhaSha.transliterateText('daMDavat- test')).toBe('દંડવત્ તેસ્ત');
        expect(bhaSha.transliterateText('daMDavat-.')).toBe('દંડવત્.');
      });
    });

    describe('Complex Words - Real Examples', () => {
      test('should transliterate common greetings', () => {
        expect(bhaSha.transliterateText('namaste')).toBe('નમસ્તે');
        expect(bhaSha.transliterateText('suprabhaat')).toBe('સુપ્રભાત');
      });

      test('should transliterate philosophical terms', () => {
        expect(bhaSha.transliterateText('karm')).toBe('કર્મ');
        expect(bhaSha.transliterateText('shree')).toBe('શ્રી');
        expect(bhaSha.transliterateText('vidyaa')).toBe('વિદ્યા');
        expect(bhaSha.transliterateText('padm')).toBe('પદ્મ');
        expect(bhaSha.transliterateText('vidvaan')).toBe('વિદ્વાન');
      });

      test('should transliterate question words', () => {
        expect(bhaSha.transliterateText('prashn')).toBe('પ્રશ્ન');
      });

      test('should transliterate food terms', () => {
        expect(bhaSha.transliterateText('ann')).toBe('અન્ન');
      });

      test('should transliterate words with anusvara', () => {
        expect(bhaSha.transliterateText('saaM')).toBe('સાં');
        expect(bhaSha.transliterateText('aMg')).toBe('અંગ');
        expect(bhaSha.transliterateText('saanj')).toBe('સાંજ');
        expect(bhaSha.transliterateText('shaant')).toBe('શાંત');
        expect(bhaSha.transliterateText('amb')).toBe('અંબ');
      });

      test('should transliterate words with conjunct consonants', () => {
        expect(bhaSha.transliterateText('aambo')).toBe('આમ્બો');
        expect(bhaSha.transliterateText('prashn')).toBe('પ્રશ્ન');
        expect(bhaSha.transliterateText('vidyaa')).toBe('વિદ્યા');
        expect(bhaSha.transliterateText('vid--yaa')).toBe('વિદ્‍યા'); // With ZWJ
      });

      test('should handle ZWJ/ZWNJ in real words', () => {
        expect(bhaSha.transliterateText('an--n')).toBe('અન્‍ન'); // ZWJ
        expect(bhaSha.transliterateText('ud--ghoSh')).toBe('ઉદ્‍ઘોષ'); // ZWJ
      });

      test('should transliterate compound words', () => {
        expect(bhaSha.transliterateText('gujaraatI')).toBe('ગુજરાતી');
        expect(bhaSha.transliterateText('gujarati')).toBe('ગુજરતિ');
      });

      test('should handle two-word phrases', () => {
        expect(bhaSha.transliterateText('kem chho')).toBe('કેમ છો');
      });

      test('should transliterate time and nature words', () => {
        expect(bhaSha.transliterateText('shaanti')).toBe('શાંતિ');
        expect(bhaSha.transliterateText('prashnu')).toBe('પ્રશ્નુ');
      });

      test('should transliterate complex sentences', () => {
        expect(
          bhaSha.transliterateText('ame musaafarI karI rahyaa hataa.'),
        ).toBe('અમે મુસાફરી કરી રહ્યા હતા.');
      });
    });

    describe('Numbers', () => {
      test('should transliterate individual numbers', () => {
        expect(bhaSha.transliterateText('0')).toBe('૦');
        expect(bhaSha.transliterateText('1')).toBe('૧');
        expect(bhaSha.transliterateText('2')).toBe('૨');
        expect(bhaSha.transliterateText('3')).toBe('૩');
        expect(bhaSha.transliterateText('4')).toBe('૪');
        expect(bhaSha.transliterateText('5')).toBe('૫');
        expect(bhaSha.transliterateText('6')).toBe('૬');
        expect(bhaSha.transliterateText('7')).toBe('૭');
        expect(bhaSha.transliterateText('8')).toBe('૮');
        expect(bhaSha.transliterateText('9')).toBe('૯');
      });

      test('should transliterate number sequences', () => {
        expect(bhaSha.transliterateText('0123456789')).toBe('૦૧૨૩૪૫૬૭૮૯');
      });
    });

    describe('Edge Cases', () => {
      test('should handle empty string', () => {
        expect(bhaSha.transliterateText('')).toBe('');
      });

      test('should handle single characters', () => {
        expect(bhaSha.transliterateText('k')).toBe('ક');
        expect(bhaSha.transliterateText('a')).toBe('અ');
      });

      test('should preserve spaces and punctuation', () => {
        expect(bhaSha.transliterateText('k k')).toBe('ક ક');
        expect(bhaSha.transliterateText('k, k')).toBe('ક, ક');
        expect(bhaSha.transliterateText('k. k')).toBe('ક. ક');
      });

      test('should handle mixed case', () => {
        expect(bhaSha.transliterateText('KaRaNa')).toBe('કરણ');
      });

      test('should handle unknown characters gracefully', () => {
        expect(bhaSha.transliterateText('k@k')).toBe('ક@ક');
      });
    });
  });

  describe('Hindi Transliteration', () => {
    beforeEach(() => {
      bhaSha.setLanguage('hindi');
    });

    test('should transliterate basic Hindi words', () => {
      expect(bhaSha.transliterateText('namaste')).toBe('नमस्ते');
      expect(bhaSha.transliterateText('vidyaa')).toBe('विद्या');
      expect(bhaSha.transliterateText('karm')).toBe('कर्म');
    });

    test('should handle Hindi special characters', () => {
      expect(bhaSha.transliterateText('x')).toBe('क्ष');
      expect(bhaSha.transliterateText('Gy')).toBe('ज्ञ');
    });

    test('should transliterate Hindi numbers', () => {
      expect(bhaSha.transliterateText('0123456789')).toBe('०१२३४५६७८९');
    });
  });

  describe('Language Switching', () => {
    test('should switch between languages correctly', () => {
      bhaSha.setLanguage('gujarati');
      expect(bhaSha.transliterateText('k')).toBe('ક');

      bhaSha.setLanguage('hindi');
      expect(bhaSha.transliterateText('k')).toBe('क');

      bhaSha.setLanguage('gujarati');
      expect(bhaSha.transliterateText('k')).toBe('ક');
    });

    test('should handle unsupported language gracefully', () => {
      // TypeScript will prevent this at compile time, but we can test the supports method
      expect(bhaSha.supports('french')).toBe(false);
    });
  });

  describe('processInput method', () => {
    beforeEach(() => {
      bhaSha.setLanguage('gujarati');
    });

    test('should process valid input', () => {
      const result = bhaSha.processInput('namaste');
      expect(result.valid).toBe(true);
      expect(result.output).toBe('નમસ્તે');
    });

    test('should handle empty input', () => {
      const result = bhaSha.processInput('');
      expect(result.valid).toBe(false);
      expect(result.output).toBe('');
    });
  });
});
