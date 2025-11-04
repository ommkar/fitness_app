const API_URL = 'http://localhost:8000/generate-plan';

export async function generatePlan(payload) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const err = await res.json();
      if (err && err.detail) message = Array.isArray(err.detail) ? err.detail.map((d) => d.msg || d).join(', ') : err.detail;
    } catch (_) {}
    throw new Error(message);
  }

  // Backend may return text; prefer text, fallback to json
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await res.json();
    // Return plain string if shape is { plan: "..." }
    if (data && typeof data.plan === 'string') return data.plan;
    return data;
  }
  return await res.text();
}


