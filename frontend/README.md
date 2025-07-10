# Frontend - Flexible Native Transliteration Components

This frontend application demonstrates multiple approaches to implementing native transliteration for Indian languages, specifically Gujarati. The components are designed to be flexible and adoptable for any input or textarea element.

## 🚀 Features

- **Real-time transliteration**: Type in English, see Gujarati instantly
- **Multiple implementation approaches**: From simple pre-built components to fully custom solutions
- **Flexible and adoptable**: Can be used with any input or textarea element
- **TypeScript support**: Full type safety and IntelliSense
- **Debug mode**: Development tools to inspect raw input and transliterated output
- **Ref-based API**: Programmatic control over transliteration behavior

## 📦 Installation

```bash
npm install
npm run dev
```

## 🎯 Usage Patterns

### Method 1: Pre-built Components (Easiest)

The simplest way to add transliteration to your forms:

```tsx
import {
  NativeTransliterationInput,
  NativeTransliterationTextarea,
} from '@/components/NativeTransliterationInput';

function MyForm() {
  const inputRef = useRef<NativeTransliterationRef>(null);

  return (
    <div>
      <NativeTransliterationInput
        ref={inputRef}
        language="gujarati"
        placeholder="Type in Gujarati..."
        showDebugInfo
        className="w-full p-2 border rounded"
      />

      <NativeTransliterationTextarea
        language="gujarati"
        rows={4}
        placeholder="Type in Gujarati..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
```

### Method 2: Hook with Custom Elements (Most Flexible)

Use the hook to add transliteration to any existing input or textarea:

```tsx
import { useTransliterationElement } from '@/components/NativeTransliterationInput';

function CustomForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { elementProps, methods, debugInfo } = useTransliterationElement({
    language: 'gujarati',
    showDebugInfo: true,
    elementRef: inputRef,
  });

  return (
    <div>
      <input
        ref={inputRef}
        {...elementProps}
        placeholder="Type in Gujarati..."
        className="w-full p-2 border rounded"
      />
      {debugInfo}

      <button onClick={methods.clear}>Clear</button>
      <button onClick={() => methods.setValue('namaste')}>Set Example</button>
    </div>
  );
}
```

### Method 3: Direct Hook Usage (Maximum Control)

For complete control over the transliteration process:

```tsx
import { useNativeTransliteration } from '@/hooks/useNativeTransliteration';

function AdvancedForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { rawInput, displayText, handlers, methods } = useNativeTransliteration(
    {
      language: 'gujarati',
      onTransliterationChange: (raw, display) => {
        console.log('Raw:', raw, 'Display:', display);
      },
    },
  );

  return (
    <div>
      <input
        ref={inputRef}
        value={displayText}
        onKeyDown={handlers.onKeyDown}
        onPaste={handlers.onPaste}
        onCompositionEnd={handlers.onCompositionEnd}
        placeholder="Type in Gujarati..."
        className="w-full p-2 border rounded"
      />

      <div>Raw: {rawInput}</div>
      <div>Display: {displayText}</div>
    </div>
  );
}
```

## 🔧 API Reference

### NativeTransliterationInput & NativeTransliterationTextarea

#### Props

| Prop                      | Type                | Default      | Description                           |
| ------------------------- | ------------------- | ------------ | ------------------------------------- |
| `language`                | `SupportedLanguage` | `'gujarati'` | The language for transliteration      |
| `showDebugInfo`           | `boolean`           | `false`      | Show debug information in development |
| `onTransliterationChange` | `function`          | -            | Callback when transliteration changes |
| `initialValue`            | `string`            | `''`         | Initial value for the input           |
| `className`               | `string`            | -            | CSS classes for styling               |
| `placeholder`             | `string`            | -            | Placeholder text                      |
| `...restProps`            | -                   | -            | All standard input/textarea props     |

#### Ref Methods

| Method                       | Description                            |
| ---------------------------- | -------------------------------------- |
| `clear()`                    | Clear the input content                |
| `setRawInput(input: string)` | Set the raw English input              |
| `setValue(value: string)`    | Set the value (will be transliterated) |
| `getValue()`                 | Get the current transliterated value   |
| `focus()`                    | Focus the input element                |
| `blur()`                     | Blur the input element                 |

### useTransliterationElement Hook

#### Parameters

| Parameter | Type                             | Description           |
| --------- | -------------------------------- | --------------------- |
| `props`   | `UseTransliterationElementProps` | Configuration options |

#### Returns

| Property       | Type        | Description                             |
| -------------- | ----------- | --------------------------------------- |
| `elementProps` | `object`    | Props to spread on input/textarea       |
| `methods`      | `object`    | Control methods (clear, setValue, etc.) |
| `debugInfo`    | `ReactNode` | Debug information component             |
| `rawInput`     | `string`    | Current raw input                       |
| `displayText`  | `string`    | Current transliterated text             |

### useNativeTransliteration Hook

#### Parameters

| Parameter | Type                              | Description           |
| --------- | --------------------------------- | --------------------- |
| `options` | `UseNativeTransliterationOptions` | Configuration options |

#### Returns

| Property      | Type        | Description                               |
| ------------- | ----------- | ----------------------------------------- |
| `rawInput`    | `string`    | Current raw input                         |
| `displayText` | `string`    | Current transliterated text               |
| `handlers`    | `object`    | Event handlers (onKeyDown, onPaste, etc.) |
| `methods`     | `object`    | Control methods                           |
| `ref`         | `RefObject` | Reference to the DOM element              |

## 🎨 Styling

All components accept standard CSS classes and can be styled like regular HTML elements:

```tsx
<NativeTransliterationInput
  className="w-full p-3 border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-300"
  placeholder="Type in Gujarati..."
/>
```

## 🔍 Debug Mode

Enable debug mode to see the raw input and transliterated output:

```tsx
<NativeTransliterationInput
  showDebugInfo
  language="gujarati"
  placeholder="Type in Gujarati..."
/>
```

This will show:

- Raw input (English characters)
- Display text (Gujarati characters)
- Current language setting

## 🌐 Supported Languages

Currently supports:

- `'gujarati'` - Gujarati transliteration

## 📝 Example Typing

| English Input | Gujarati Output |
| ------------- | --------------- |
| `namaste`     | નમસ્તે          |
| `kem chho`    | કેમ છો          |
| `x`           | ક્ષ             |
| `Gn`          | જ્ઞ             |
| `prash--n`    | પ્રશ્‍ન         |

## 🚀 Getting Started

1. **Choose your approach**: Decide between pre-built components, hook with custom elements, or direct hook usage
2. **Import the components**: Import the components or hooks you need
3. **Add to your form**: Use the components in your React forms
4. **Style as needed**: Apply your own CSS classes for styling
5. **Test the functionality**: Try typing in English to see Gujarati output

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 📁 File Structure

```
src/
├── components/
│   └── NativeTransliterationInput.tsx  # Main components and hooks
├── hooks/
│   └── useNativeTransliteration.ts     # Core transliteration hook
└── app/
    └── transliteration/
        └── native/
            └── page.tsx                 # Demo page
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
