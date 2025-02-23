import Chat from './components/Chat';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          AI Chat Assistant
        </h1>
        <Chat />
      </div>
    </main>
  );
}
