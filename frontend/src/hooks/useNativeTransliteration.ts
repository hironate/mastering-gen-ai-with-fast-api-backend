import { useState, useEffect, useCallback, useRef } from 'react';
import { BhaSha, SupportedLanguage } from '@bhashaime/core';

export interface UseNativeTransliterationOptions {
  language?: SupportedLanguage;
  onTransliterationChange?: (
    rawInput: string,
    transliteratedText: string,
  ) => void;
  initialValue?: string;
}

interface UseNativeTransliterationReturn {
  rawInput: string;
  displayText: string;
  bhaShaInstance: BhaSha;
  handlers: {
    onKeyDown: (
      event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    onPaste: (
      event: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    onCompositionEnd: (
      event: React.CompositionEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    onInput?: (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
  };
  methods: {
    setRawInput: (input: string) => void;
    clear: () => void;
    setValue: (value: string) => void;
    getValue: () => string;
  };
  ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
}

export function useNativeTransliteration(
  options: UseNativeTransliterationOptions = {},
): UseNativeTransliterationReturn {
  const {
    language = 'gujarati',
    onTransliterationChange,
    initialValue = '',
  } = options;

  const [bhaShaInstance] = useState(() => new BhaSha());
  const [rawInput, setRawInput] = useState(initialValue);
  const [displayText, setDisplayText] = useState('');
  const elementRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

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
    if (elementRef.current) {
      const newCursorPos = displayText.length;
      elementRef.current.setSelectionRange(newCursorPos, newCursorPos);
    }
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

  const setValue = useCallback((value: string) => {
    setRawInput(value);
  }, []);

  const getValue = useCallback(() => {
    return displayText;
  }, [displayText]);

  return {
    rawInput,
    displayText,
    bhaShaInstance,
    handlers: {
      onKeyDown: handleKeyDown,
      onPaste: handlePaste,
      onCompositionEnd: handleCompositionEnd,
    },
    methods: {
      setRawInput,
      clear,
      setValue,
      getValue,
    },
    ref: elementRef,
  };
}
