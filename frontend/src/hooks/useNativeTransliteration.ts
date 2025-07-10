import { useState, useEffect, useCallback } from 'react';
import { BhaSha, SupportedLanguage } from '@bhashaime/core';

export interface UseNativeTransliterationOptions {
  language?: SupportedLanguage;
  onTransliterationChange?: (
    rawInput: string,
    transliteratedText: string,
  ) => void;
}

interface UseNativeTransliterationReturn {
  rawInput: string;
  displayText: string;
  bhaShaInstance: BhaSha;
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handlePaste: (
    event: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleCompositionEnd: (
    event: React.CompositionEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setRawInput: (input: string) => void;
  clear: () => void;
}

export function useNativeTransliteration(
  options: UseNativeTransliterationOptions = {},
): UseNativeTransliterationReturn {
  const { language = 'gujarati', onTransliterationChange } = options;

  const [bhaShaInstance] = useState(() => new BhaSha());
  const [rawInput, setRawInput] = useState('');
  const [displayText, setDisplayText] = useState('');

  // Initialize BhaSha with the specified language
  useEffect(() => {
    bhaShaInstance.setLanguage(language);
  }, [bhaShaInstance, language]);

  // Update display text when raw input changes
  useEffect(() => {
    const transliterated = bhaShaInstance.transliterateText(rawInput);
    setDisplayText(transliterated);
    onTransliterationChange?.(rawInput, transliterated);
  }, [rawInput, bhaShaInstance, onTransliterationChange]);

  // Set cursor position after display text changes
  useEffect(() => {
    // This will be handled by the component using this hook
  }, [displayText]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // Handle special keys
      if (event.key === 'Backspace') {
        if (rawInput.length > 0) {
          const newRawInput = rawInput.slice(0, -1);
          setRawInput(newRawInput);
          event.preventDefault();
        }
      } else if (event.key === 'Delete') {
        // Delete from end for now
        if (rawInput.length > 0) {
          const newRawInput = rawInput.slice(0, -1);
          setRawInput(newRawInput);
          event.preventDefault();
        }
      } else if (event.key === 'Enter') {
        // Handle Enter key
        const newRawInput = rawInput + '\n';
        setRawInput(newRawInput);
        event.preventDefault();
      } else if (event.key === 'Tab') {
        // Handle Tab key
        const newRawInput = rawInput + '\t';
        setRawInput(newRawInput);
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
        event.preventDefault();
      }
    },
    [rawInput],
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.preventDefault();
      const pastedText = event.clipboardData.getData('text');
      const newRawInput = rawInput + pastedText;
      setRawInput(newRawInput);
    },
    [rawInput],
  );

  const handleCompositionEnd = useCallback(
    (event: React.CompositionEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const compositionText = event.data;
      if (compositionText) {
        const newRawInput = rawInput + compositionText;
        setRawInput(newRawInput);
      }
    },
    [rawInput],
  );

  const clear = useCallback(() => {
    setRawInput('');
  }, []);

  return {
    rawInput,
    displayText,
    bhaShaInstance,
    handleKeyDown,
    handlePaste,
    handleCompositionEnd,
    setRawInput,
    clear,
  };
}
