'use client';

import { useEffect, useRef, useCallback } from 'react';
import { BhaSha, SupportedLanguage } from '@bhashaime/core';

const rawInputKey = 'data-raw-input';

interface UseDirectInputTransliterationParams {
  ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  language: SupportedLanguage;
  initialRawValue?: string;
  onTransliterate?: (raw: string, transliterated: string) => void;
}

export function useDirectInputTransliteration({
  ref,
  language,
  initialRawValue = '',
  onTransliterate,
}: UseDirectInputTransliterationParams) {
  const bhaShaRef = useRef(new BhaSha());

  const handleTransliteration = useCallback(
    (
      element: HTMLInputElement | HTMLTextAreaElement,
      rawCursorStart: number | null = null,
      rawCursorEnd: number | null = null,
    ) => {
      const rawInput = element.getAttribute(rawInputKey) || '';
      const transliterated = bhaShaRef.current.transliterateText(rawInput);
      onTransliterate?.(rawInput, transliterated);

      const previousCursorPos = element.selectionStart;

      element.value = transliterated;

      if (rawCursorStart !== null) {
        const rawBeforeCursor = rawInput.slice(0, rawCursorStart);
        const transliteratedBeforeCursor =
          bhaShaRef.current.transliterateText(rawBeforeCursor);
        const transliteratedCursorPos = transliteratedBeforeCursor.length;

        const endPos =
          rawCursorEnd !== null && rawCursorEnd !== rawCursorStart
            ? bhaShaRef.current.transliterateText(
                rawInput.slice(0, rawCursorEnd),
              ).length
            : transliteratedCursorPos;

        element.setSelectionRange(transliteratedCursorPos, endPos);
      } else {
        if (
          previousCursorPos !== null &&
          previousCursorPos >= element.value.length - 1
        ) {
          element.setSelectionRange(element.value.length, element.value.length);
        }
      }
    },
    [onTransliterate],
  );

  const handleInputChange = useCallback((event: Event) => {
    event.preventDefault();
  }, []);

  const findRawPos = useCallback((rawInput: string, translitPos: number) => {
    if (translitPos === 0) return 0;
    let bestPos = 0;
    for (let i = 1; i <= rawInput.length; i++) {
      const rawPrefix = rawInput.slice(0, i);
      const translitLen = bhaShaRef.current.transliterateText(rawPrefix).length;
      if (translitLen <= translitPos) {
        bestPos = i;
      } else {
        break;
      }
    }
    return bestPos;
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const element = event.currentTarget as
        | HTMLInputElement
        | HTMLTextAreaElement;
      const { key } = event;
      const { selectionStart, selectionEnd } = element;

      if (selectionStart === null || selectionEnd === null) return;

      const rawInput = element.getAttribute(rawInputKey) || '';

      const rawStart = findRawPos(rawInput, selectionStart);
      const rawEnd =
        selectionStart === selectionEnd
          ? rawStart
          : findRawPos(rawInput, selectionEnd);

      if (key === 'Backspace') {
        event.preventDefault();
        if (rawStart === rawEnd && rawStart > 0) {
          const newRawInput =
            rawInput.slice(0, rawStart - 1) + rawInput.slice(rawEnd);
          element.setAttribute(rawInputKey, newRawInput);
          handleTransliteration(element, rawStart - 1, rawStart - 1);
        } else if (rawStart < rawEnd) {
          const newRawInput =
            rawInput.slice(0, rawStart) + rawInput.slice(rawEnd);
          element.setAttribute(rawInputKey, newRawInput);
          handleTransliteration(element, rawStart, rawStart);
        }
      } else if (key === 'Delete') {
        event.preventDefault();
        if (rawStart === rawEnd && rawEnd < rawInput.length) {
          const newRawInput =
            rawInput.slice(0, rawStart) + rawInput.slice(rawEnd + 1);
          element.setAttribute(rawInputKey, newRawInput);
          handleTransliteration(element, rawStart, rawStart);
        } else if (rawStart < rawEnd) {
          const newRawInput =
            rawInput.slice(0, rawStart) + rawInput.slice(rawEnd);
          element.setAttribute(rawInputKey, newRawInput);
          handleTransliteration(element, rawStart, rawStart);
        }
      } else if (key.length === 1 && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        const newRawInput =
          rawInput.slice(0, rawStart) + key + rawInput.slice(rawEnd);
        element.setAttribute(rawInputKey, newRawInput);
        handleTransliteration(
          element,
          rawStart + key.length,
          rawStart + key.length,
        );
      }
    },
    [findRawPos, handleTransliteration],
  );

  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      event.preventDefault();
      const element = event.currentTarget as
        | HTMLInputElement
        | HTMLTextAreaElement;
      if (!event.clipboardData) return;
      const pastedText = event.clipboardData.getData('text');
      const { selectionStart, selectionEnd } = element;
      if (selectionStart === null || selectionEnd === null) return;

      const rawInput = element.getAttribute(rawInputKey) || '';

      const rawStart = findRawPos(rawInput, selectionStart);
      const rawEnd =
        selectionStart === selectionEnd
          ? rawStart
          : findRawPos(rawInput, selectionEnd);

      const newRawInput =
        rawInput.slice(0, rawStart) + pastedText + rawInput.slice(rawEnd);
      element.setAttribute(rawInputKey, newRawInput);

      handleTransliteration(
        element,
        rawStart + pastedText.length,
        rawStart + pastedText.length,
      );
    },
    [findRawPos, handleTransliteration],
  );

  const handleCut = useCallback(
    (event: ClipboardEvent) => {
      event.preventDefault();
      const element = event.currentTarget as
        | HTMLInputElement
        | HTMLTextAreaElement;
      if (!event.clipboardData) return;

      const { selectionStart, selectionEnd } = element;
      if (
        selectionStart === null ||
        selectionEnd === null ||
        selectionStart === selectionEnd
      ) {
        return;
      }

      const rawInput = element.getAttribute(rawInputKey) || '';

      const rawStart = findRawPos(rawInput, selectionStart);
      const rawEnd = findRawPos(rawInput, selectionEnd);

      const textToCut = element.value.substring(selectionStart, selectionEnd);
      event.clipboardData.setData('text/plain', textToCut);

      const newRawInput = rawInput.slice(0, rawStart) + rawInput.slice(rawEnd);
      element.setAttribute(rawInputKey, newRawInput);
      handleTransliteration(element, rawStart, rawStart);
    },
    [findRawPos, handleTransliteration],
  );

  useEffect(() => {
    bhaShaRef.current.setLanguage(language);
    const element = ref.current;
    if (element) {
      handleTransliteration(element);
    }
  }, [language, ref, handleTransliteration]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (initialRawValue && !element.hasAttribute(rawInputKey)) {
      element.setAttribute(rawInputKey, initialRawValue);
    }
    handleTransliteration(element);

    const keyDownHandler = (e: Event) => handleKeyDown(e as KeyboardEvent);
    const pasteHandler = (e: Event) => handlePaste(e as ClipboardEvent);
    const cutHandler = (e: Event) => handleCut(e as ClipboardEvent);

    element.addEventListener('keydown', keyDownHandler);
    element.addEventListener('paste', pasteHandler);
    element.addEventListener('cut', cutHandler);
    element.addEventListener('input', handleInputChange);

    return () => {
      element.removeEventListener('keydown', keyDownHandler);
      element.removeEventListener('paste', pasteHandler);
      element.removeEventListener('cut', cutHandler);
      element.removeEventListener('input', handleInputChange);
    };
  }, [
    ref,
    initialRawValue,
    handleKeyDown,
    handlePaste,
    handleCut,
    handleInputChange,
    handleTransliteration,
  ]);
}
