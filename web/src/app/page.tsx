'use client';

import { useState } from 'react';

const rewriteOptions = ['Paraphrase', 'Formal', 'Casual', 'Shorten', 'Expand'];

export default function Home() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState(rewriteOptions[0]);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRewrite() {
    setLoading(true);
    const res = await fetch('/api/rewrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, mode }),
    });
    const data = await res.json();
    setOutput(data.result);
    setLoading(false);
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Text Rewriter</h1>

      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={6}
        placeholder="Paste your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex items-center gap-4 mb-4">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="border p-2 rounded"
        >
          {rewriteOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleRewrite}
          disabled={loading || !input}
        >
          {loading ? 'Rewriting...' : 'Rewrite'}
        </button>
      </div>

      <div className="border p-4 rounded bg-gray-50 min-h-[100px] whitespace-pre-wrap">
        {output}
      </div>
    </main>
  );
}
