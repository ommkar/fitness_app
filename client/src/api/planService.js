const BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export async function generatePlan(payload) {
  const res = await fetch(`${BASE}/generate-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const err = await res.json();
      if (err && err.detail) {
        message = Array.isArray(err.detail)
          ? err.detail.map((d) => d.msg || d).join(', ')
          : err.detail;
      }
    } catch (_) {}
    throw new Error(message);
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await res.json();
    if (data && typeof data.plan === 'string') return data.plan;
    return data;
  }
  return await res.text();
}

