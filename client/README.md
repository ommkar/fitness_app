# Fitness Plan Frontend (React + Vite + Tailwind)

A responsive, dark-mode-first UI to collect fitness inputs, call the backend at `http://localhost:8000/generate-plan`, and display the AI-generated plan.

## Requirements
- Node.js 18+
- Backend running on `http://localhost:8000` (FastAPI endpoint: `POST /generate-plan`)

## Install
```bash
cd client
npm install
```

## Run (Dev)
```bash
npm run dev
```
- Open the printed local URL in your browser

## Build
```bash
npm run build
npm run preview
```

## Environment
- Tailwind is configured with dark mode using the `class` strategy
- Default theme is dark; use the toggle to switch

## API Contract
Request body (JSON):
```json
{
  "height_cm": 180,
  "weight_kg": 75,
  "age": 28,
  "gender": "M",
  "goal": "maintain",
  "activity_level": "moderate"
}
```
The response is displayed as text (JSON is also supported and will be shown as formatted string).

## Notes
- Copy the generated plan using the Copy button (clipboard)
- Reset clears all fields and the result


