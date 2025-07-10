import React, { useRef, useEffect, forwardRef } from 'react';
import {
  useNativeTransliteration,
  UseNativeTransliterationOptions,
} from '@/hooks/useNativeTransliteration';

// Extended interfaces for ref methods
interface NativeTransliterationInputRef extends HTMLInputElement {
  clear: () => void;
  setRawInput: (input: string) => void;
}

interface NativeTransliterationTextareaRef extends HTMLTextAreaElement {
  clear: () => void;
  setRawInput: (input: string) => void;
}

// Base interface for common props
interface BaseTransliterationProps extends UseNativeTransliterationOptions {
  showDebugInfo?: boolean;
  onTransliterationChange?: (
    rawInput: string,
    transliteratedText: string,
  ) => void;
}

// Input component
interface NativeTransliterationInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'onChange' | 'value'
    >,
    BaseTransliterationProps {}

export const NativeTransliterationInput = forwardRef<
  NativeTransliterationInputRef,
  NativeTransliterationInputProps
>((props, ref) => {
  const {
    language = 'gujarati',
    showDebugInfo = false,
    onTransliterationChange,
    className = '',
    ...restProps
  } = props;

  const internalRef = useRef<NativeTransliterationInputRef>(null);
  const finalRef = (ref ||
    internalRef) as React.RefObject<NativeTransliterationInputRef>;

  const {
    rawInput,
    displayText,
    handleKeyDown,
    handlePaste,
    handleCompositionEnd,
    setRawInput,
    clear,
  } = useNativeTransliteration({
    language,
    onTransliterationChange,
  });

  // Set cursor position after display text changes
  useEffect(() => {
    if (finalRef.current) {
      const newCursorPos = displayText.length;
      finalRef.current.setSelectionRange(newCursorPos, newCursorPos);
    }
  }, [displayText, finalRef]);

  // Expose methods on ref
  useEffect(() => {
    if (finalRef.current) {
      (finalRef.current as NativeTransliterationInputRef).clear = clear;
      (finalRef.current as NativeTransliterationInputRef).setRawInput =
        setRawInput;
    }
  }, [clear, setRawInput, finalRef]);

  return (
    <div className="native-transliteration-wrapper">
      <input
        ref={finalRef}
        value={displayText}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onCompositionEnd={handleCompositionEnd}
        className={`native-transliteration-input ${className}`}
        {...restProps}
      />

      {showDebugInfo && process.env.NODE_ENV === 'development' && (
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
          <div>
            <strong>Debug Info:</strong>
          </div>
          <div>Raw Input: {rawInput}</div>
          <div>Display Text: {displayText}</div>
          <div>Language: {language}</div>
        </div>
      )}
    </div>
  );
});

NativeTransliterationInput.displayName = 'NativeTransliterationInput';

// Textarea component
interface NativeTransliterationTextareaProps
  extends Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      'onChange' | 'value'
    >,
    BaseTransliterationProps {}

export const NativeTransliterationTextarea = forwardRef<
  HTMLTextAreaElement,
  NativeTransliterationTextareaProps
>((props, ref) => {
  const {
    language = 'gujarati',
    showDebugInfo = false,
    onTransliterationChange,
    className = '',
    ...restProps
  } = props;

  const internalRef = useRef<HTMLTextAreaElement>(null);
  const finalRef = (ref || internalRef) as React.RefObject<HTMLTextAreaElement>;

  const {
    rawInput,
    displayText,
    handleKeyDown,
    handlePaste,
    handleCompositionEnd,
    setRawInput,
    clear,
  } = useNativeTransliteration({
    language,
    onTransliterationChange,
  });

  // Set cursor position after display text changes
  useEffect(() => {
    if (finalRef.current) {
      const newCursorPos = displayText.length;
      finalRef.current.setSelectionRange(newCursorPos, newCursorPos);
    }
  }, [displayText, finalRef]);

  // Expose methods on ref
  useEffect(() => {
    if (finalRef.current) {
      (finalRef.current as NativeTransliterationTextareaRef).clear = clear;
      (finalRef.current as NativeTransliterationTextareaRef).setRawInput =
        setRawInput;
    }
  }, [clear, setRawInput, finalRef]);

  return (
    <div className="native-transliteration-wrapper">
      <textarea
        ref={finalRef}
        value={displayText}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onCompositionEnd={handleCompositionEnd}
        className={`native-transliteration-textarea ${className}`}
        {...restProps}
      />

      {showDebugInfo && process.env.NODE_ENV === 'development' && (
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
          <div>
            <strong>Debug Info:</strong>
          </div>
          <div>Raw Input: {rawInput}</div>
          <div>Display Text: {displayText}</div>
          <div>Language: {language}</div>
        </div>
      )}
    </div>
  );
});

NativeTransliterationTextarea.displayName = 'NativeTransliterationTextarea';
