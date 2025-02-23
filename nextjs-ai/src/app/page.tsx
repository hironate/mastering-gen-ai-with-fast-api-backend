import { Chat } from '@/components/Chat';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Database Chat Interface
        </h1>
        <p className="text-lg text-center mb-8 text-gray-700 font-medium">
          Ask questions about your data in natural language
        </p>
        <Chat />
      </div>
    </main>
  );
}
