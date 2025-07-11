import { BhaSha, SupportedLanguage } from '@bhashaime/core';

// Use a WeakMap to store raw input state for each element without polluting the DOM
const elementRawInputMap = new WeakMap<
  HTMLInputElement | HTMLTextAreaElement,
  string
>();

class BhashaIMEInjector {
  private bhaSha: BhaSha;
  private currentLanguage: SupportedLanguage = 'gujarati';

  constructor() {
    this.bhaSha = new BhaSha();
    this.bhaSha.setLanguage(this.currentLanguage);
    this.attachEventListeners();
    console.log('BhaShaIME Injector has been initialized.');
  }

  public setLanguage = (language: SupportedLanguage) => {
    if (this.bhaSha.supports(language)) {
      this.currentLanguage = language;
      this.bhaSha.setLanguage(language);
      console.log(`BhaShaIME language changed to: ${language}`);
      // Note: This won't automatically re-transliterate existing text in inputs,
      // as that could be unexpected behavior for a global injector.
    } else {
      console.error(`BhaShaIME does not support language: ${language}`);
    }
  };

  private findRawPos(rawInput: string, translitPos: number): number {
    if (translitPos === 0) return 0;
    let bestPos = 0;
    for (let i = 1; i <= rawInput.length; i++) {
      const rawPrefix = rawInput.slice(0, i);
      const translitLen = this.bhaSha.transliterateText(rawPrefix).length;
      if (translitLen <= translitPos) {
        bestPos = i;
      } else {
        break;
      }
    }
    return bestPos;
  }

  private attachEventListeners() {
    // Using event delegation on the document for efficiency
    document.addEventListener('keydown', this.handleKeyDown, true);
    document.addEventListener('paste', this.handlePaste, true);
    document.addEventListener('cut', this.handleCut, true);
    // We might need 'input' for edge cases, but keydown is more controlled.
  }

  private isEditableElement(
    element: EventTarget | null,
  ): element is HTMLInputElement | HTMLTextAreaElement {
    return (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement
    );
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.isEditableElement(event.target)) return;

    const element = event.target;
    const { key } = event;
    const { selectionStart, selectionEnd } = element;

    if (selectionStart === null || selectionEnd === null) return;

    const rawInput = elementRawInputMap.get(element) || '';

    const rawStart = this.findRawPos(rawInput, selectionStart);
    const rawEnd =
      selectionStart === selectionEnd
        ? rawStart
        : this.findRawPos(rawInput, selectionEnd);

    if (key === 'Backspace') {
      event.preventDefault();
      if (rawStart === rawEnd && rawStart > 0) {
        const newRawInput =
          rawInput.slice(0, rawStart - 1) + rawInput.slice(rawEnd);
        elementRawInputMap.set(element, newRawInput);
        this.handleTransliteration(element, rawStart - 1, rawStart - 1);
      } else if (rawStart < rawEnd) {
        const newRawInput =
          rawInput.slice(0, rawStart) + rawInput.slice(rawEnd);
        elementRawInputMap.set(element, newRawInput);
        this.handleTransliteration(element, rawStart, rawStart);
      }
    } else if (key === 'Delete') {
      event.preventDefault();
      if (rawStart === rawEnd && rawEnd < rawInput.length) {
        const newRawInput =
          rawInput.slice(0, rawStart) + rawInput.slice(rawEnd + 1);
        elementRawInputMap.set(element, newRawInput);
        this.handleTransliteration(element, rawStart, rawStart);
      } else if (rawStart < rawEnd) {
        const newRawInput =
          rawInput.slice(0, rawStart) + rawInput.slice(rawEnd);
        elementRawInputMap.set(element, newRawInput);
        this.handleTransliteration(element, rawStart, rawStart);
      }
    } else if (key.length === 1 && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      const newRawInput =
        rawInput.slice(0, rawStart) + key + rawInput.slice(rawEnd);
      elementRawInputMap.set(element, newRawInput);
      this.handleTransliteration(
        element,
        rawStart + key.length,
        rawStart + key.length,
      );
    }
  };

  private handlePaste = (event: ClipboardEvent) => {
    if (!this.isEditableElement(event.target)) return;

    event.preventDefault();
    const element = event.target;
    const pastedText = event.clipboardData?.getData('text') || '';
    const { selectionStart, selectionEnd } = element;

    if (selectionStart === null || selectionEnd === null) return;

    const rawInput = elementRawInputMap.get(element) || '';

    const rawStart = this.findRawPos(rawInput, selectionStart);
    const rawEnd =
      selectionStart === selectionEnd
        ? rawStart
        : this.findRawPos(rawInput, selectionEnd);

    const newRawInput =
      rawInput.slice(0, rawStart) + pastedText + rawInput.slice(rawEnd);
    elementRawInputMap.set(element, newRawInput);
    this.handleTransliteration(
      element,
      rawStart + pastedText.length,
      rawStart + pastedText.length,
    );
  };

  private handleCut = (event: ClipboardEvent) => {
    if (!this.isEditableElement(event.target)) return;

    event.preventDefault();
    const element = event.target;
    const { selectionStart, selectionEnd } = element;

    if (
      selectionStart === null ||
      selectionEnd === null ||
      selectionStart === selectionEnd
    ) {
      return;
    }

    const rawInput = elementRawInputMap.get(element) || '';

    const rawStart = this.findRawPos(rawInput, selectionStart);
    const rawEnd = this.findRawPos(rawInput, selectionEnd);

    const textToCut = element.value.substring(selectionStart, selectionEnd);
    event.clipboardData?.setData('text/plain', textToCut);

    const newRawInput = rawInput.slice(0, rawStart) + rawInput.slice(rawEnd);
    elementRawInputMap.set(element, newRawInput);
    this.handleTransliteration(element, rawStart, rawStart);
  };

  private handleTransliteration = (
    element: HTMLInputElement | HTMLTextAreaElement,
    rawCursorStart: number | null = null,
    rawCursorEnd: number | null = null,
  ) => {
    const rawInput = elementRawInputMap.get(element) || '';
    const transliterated = this.bhaSha.transliterateText(rawInput);

    element.value = transliterated;

    if (rawCursorStart !== null) {
      const rawBeforeCursor = rawInput.slice(0, rawCursorStart);
      const transliteratedBeforeCursor =
        this.bhaSha.transliterateText(rawBeforeCursor);
      const transliteratedCursorPos = transliteratedBeforeCursor.length;

      const endPos =
        rawCursorEnd !== null && rawCursorEnd !== rawCursorStart
          ? this.bhaSha.transliterateText(rawInput.slice(0, rawCursorEnd))
              .length
          : transliteratedCursorPos;

      element.setSelectionRange(transliteratedCursorPos, endPos);
    }
  };
}

// --- Global Initialization ---
interface BhashaIMEWindow extends Window {
  bhashaIME?: BhashaIMEInjector;
}

// Create a single global instance and attach it to the window object
if (typeof window !== 'undefined') {
  (window as BhashaIMEWindow).bhashaIME = new BhashaIMEInjector();
}
