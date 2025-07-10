import React, { forwardRef, useImperativeHandle } from 'react';
import {
  useNativeTransliteration,
  UseNativeTransliterationOptions,
} from '@/hooks/useNativeTransliteration';

// Extended interfaces for ref methods
export interface NativeTransliterationRef {
  clear: () => void;
  setRawInput: (input: string) => void;
  setValue: (value: string) => void;
  getValue: () => string;
  focus: () => void;
  blur: () => void;
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
  NativeTransliterationRef,
  NativeTransliterationInputProps
>((props, ref) => {
  const {
    language = 'gujarati',
    showDebugInfo = false,
    onTransliterationChange,
    initialValue,
    className = '',
    ...restProps
  } = props;

  const {
    rawInput,
    displayText,
    handlers,
    methods,
    ref: elementRef,
  } = useNativeTransliteration({
    language,
    onTransliterationChange,
    initialValue,
  });

  // Cast the ref to the correct type for input
  const inputRef = elementRef as React.RefObject<HTMLInputElement>;

  // Expose methods on ref
  useImperativeHandle(
    ref,
    () => ({
      clear: methods.clear,
      setRawInput: methods.setRawInput,
      setValue: methods.setValue,
      getValue: methods.getValue,
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    }),
    [methods, inputRef],
  );

  return (
    <div className="native-transliteration-wrapper">
      <input
        ref={inputRef}
        value={displayText}
        onKeyDown={handlers.onKeyDown}
        onPaste={handlers.onPaste}
        onCompositionEnd={handlers.onCompositionEnd}
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
  NativeTransliterationRef,
  NativeTransliterationTextareaProps
>((props, ref) => {
  const {
    language = 'gujarati',
    showDebugInfo = false,
    onTransliterationChange,
    initialValue,
    className = '',
    ...restProps
  } = props;

  const {
    rawInput,
    displayText,
    handlers,
    methods,
    ref: elementRef,
  } = useNativeTransliteration({
    language,
    onTransliterationChange,
    initialValue,
  });

  // Cast the ref to the correct type for textarea
  const textareaRef = elementRef as React.RefObject<HTMLTextAreaElement>;

  // Expose methods on ref
  useImperativeHandle(
    ref,
    () => ({
      clear: methods.clear,
      setRawInput: methods.setRawInput,
      setValue: methods.setValue,
      getValue: methods.getValue,
      focus: () => textareaRef.current?.focus(),
      blur: () => textareaRef.current?.blur(),
    }),
    [methods, textareaRef],
  );

  return (
    <div className="native-transliteration-wrapper">
      <textarea
        ref={textareaRef}
        value={displayText}
        onKeyDown={handlers.onKeyDown}
        onPaste={handlers.onPaste}
        onCompositionEnd={handlers.onCompositionEnd}
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

// Hook-based component for maximum flexibility
export interface UseTransliterationElementProps
  extends BaseTransliterationProps {
  elementRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
}

export function useTransliterationElement(
  props: UseTransliterationElementProps,
) {
  const {
    language = 'gujarati',
    showDebugInfo = false,
    onTransliterationChange,
    initialValue,
    elementRef: externalRef,
  } = props;

  const {
    rawInput,
    displayText,
    handlers,
    methods,
    ref: internalRef,
  } = useNativeTransliteration({
    language,
    onTransliterationChange,
    initialValue,
  });

  const elementRef = externalRef || internalRef;

  const elementProps = {
    value: displayText,
    onKeyDown: handlers.onKeyDown,
    onPaste: handlers.onPaste,
    onCompositionEnd: handlers.onCompositionEnd,
    ref: elementRef,
  };

  const debugInfo =
    showDebugInfo && process.env.NODE_ENV === 'development' ? (
      <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
        <div>
          <strong>Debug Info:</strong>
        </div>
        <div>Raw Input: {rawInput}</div>
        <div>Display Text: {displayText}</div>
        <div>Language: {language}</div>
      </div>
    ) : null;

  return {
    elementProps,
    methods,
    debugInfo,
    rawInput,
    displayText,
  };
}
