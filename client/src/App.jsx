import React, { useEffect, useState } from 'react';
import InputForm from './components/InputForm.jsx';
import ResultBox from './components/ResultBox.jsx';
import DarkModeToggle from './components/DarkModeToggle.jsx';
import { generatePlan } from './api/planService.js';

export default function App() {
  const [formData, setFormData] = useState({
    height_cm: '',
    weight_kg: '',
    age: '',
    gender: 'M',
    goal: 'maintain',
    activity_level: 'moderate',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  // Default dark mode on first load if no preference is stored
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (!stored) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (stored === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');
    setLoading(true);
    try {
      // Coerce numeric fields
      const payload = {
        height_cm: Number(formData.height_cm),
        weight_kg: Number(formData.weight_kg),
        age: Number(formData.age),
        gender: formData.gender,
        goal: formData.goal,
        activity_level: formData.activity_level,
      };
      const data = await generatePlan(payload);
      setResult(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err.message || 'Failed to fetch plan');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      height_cm: '',
      weight_kg: '',
      age: '',
      gender: 'M',
      goal: 'maintain',
      activity_level: 'moderate',
    });
    setResult('');
    setError('');
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
    } catch (_) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Fitness Plan Generator</h1>
          <DarkModeToggle />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl p-6 shadow-lg bg-white/70 dark:bg-neutral-800/70 backdrop-blur border border-neutral-200/60 dark:border-neutral-700/60 transition-colors">
            <InputForm
              values={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onReset={handleReset}
              loading={loading}
            />
            {error && (
              <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>

          <div className="rounded-2xl p-6 shadow-lg bg-white/70 dark:bg-neutral-800/70 backdrop-blur border border-neutral-200/60 dark:border-neutral-700/60 transition-colors flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium">AI Plan</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!result}
                  className="px-3 py-1.5 rounded-xl text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            <ResultBox text={result} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}


