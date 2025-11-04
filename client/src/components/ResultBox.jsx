import React from 'react';

export default function ResultBox({ text, loading }) {
  return (
    <div className="flex-1 min-h-[200px] max-h-[60vh] overflow-auto rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 font-mono text-sm whitespace-pre-wrap">
      {loading && (
        <div className="animate-pulse text-neutral-500">Loading plan…</div>
      )}
      {!loading && !text && (
        <div className="text-neutral-500">Your plan will appear here.</div>
      )}
      {!loading && text && <pre className="whitespace-pre-wrap">{text}</pre>}
    </div>
  );
}


