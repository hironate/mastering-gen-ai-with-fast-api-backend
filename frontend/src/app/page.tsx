'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { MessageCircle, FileText, LucideIcon } from 'lucide-react';

interface POC {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  status: 'active' | 'coming-soon';
  tags: string[];
}

export default function HomePage() {
  const pocs: POC[] = [
    {
      title: 'Chat with Files POC',
      description:
        'Interactive chat interface that allows you to upload files and have conversations with AI models about their content. Supports multiple file formats and streaming responses.',
      href: '/chat',
      icon: MessageCircle,
      status: 'active',
      tags: ['Chat', 'File Upload', 'Streaming', 'Multi-modal'],
    },
    {
      title: 'Document Analysis POC',
      description:
        'Advanced document processing and analysis using AI. Extract insights, summarize content, and ask questions about your documents.',
      href: '/document-analysis',
      icon: FileText,
      status: 'coming-soon',
      tags: ['Document Processing', 'Analysis', 'Summarization'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI POC Hub</h1>
                <p className="text-sm text-gray-600">
                  Mastering Generative AI with FastAPI
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active Development
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* POCs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pocs.map((poc) => (
            <Card
              key={poc.title}
              className="group hover:border-gray-300 transition-all duration-300 border border-gray-200"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <poc.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {poc.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          poc.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {poc.status === 'active' ? 'Available' : 'Coming Soon'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 flex-grow">
                  {poc.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {poc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  {poc.status === 'active' ? (
                    <Link href={poc.href} className="block">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform group-hover:scale-105">
                        Try Now →
                      </button>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-100 text-gray-400 font-medium py-2 px-4 rounded-lg cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 AI POC Hub. Built with Next.js, FastAPI, and ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
