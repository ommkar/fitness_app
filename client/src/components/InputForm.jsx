import React from 'react';

export default function InputForm({ values, onChange, onSubmit, onReset, loading }) {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label htmlFor="height_cm" className="text-sm mb-1">Height (cm)</label>
        <input
          id="height_cm"
          name="height_cm"
          type="number"
          inputMode="numeric"
          min="0"
          value={values.height_cm}
          onChange={onChange}
          required
          className="rounded-xl px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="weight_kg" className="text-sm mb-1">Weight (kg)</label>
        <input
          id="weight_kg"
          name="weight_kg"
          type="number"
          inputMode="numeric"
          min="0"
          value={values.weight_kg}
          onChange={onChange}
          required
          className="rounded-xl px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="age" className="text-sm mb-1">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          inputMode="numeric"
          min="0"
          value={values.age}
          onChange={onChange}
          required
          className="rounded-xl px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="gender" className="text-sm mb-1">Gender</label>
        <select
          id="gender"
          name="gender"
          value={values.gender}
          onChange={onChange}
          className="rounded-xl px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
        >
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="goal" className="text-sm mb-1">Goal</label>
        <select
          id="goal"
          name="goal"
          value={values.goal}
          onChange={onChange}
          className="rounded-xl px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
        >
          <option value="bulk">bulk</option>
          <option value="cut">cut</option>
          <option value="maintain">maintain</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="activity_level" className="text-sm mb-1">Activity Level</label>
        <select
          id="activity_level"
          name="activity_level"
          value={values.activity_level}
          onChange={onChange}
          className="rounded-xl px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
        >
          <option value="low">low</option>
          <option value="moderate">moderate</option>
          <option value="high">high</option>
        </select>
      </div>

      <div className="md:col-span-2 flex gap-3 mt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Generating…' : 'Submit'}
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={loading}
          className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 transition-colors"
        >
          Reset
        </button>
      </div>
    </form>
  );
}


