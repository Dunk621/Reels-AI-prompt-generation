# AI Learning Reels

Frontend scaffold for the AI Learning Reels app built with Next.js 14, Tailwind CSS, and shadcn/ui.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Environment Variables

To enable real GPT and Sora integrations, create a `.env.local` file in the project root with:

```
OPENAI_API_KEY=your_openai_api_key
SORA_API_KEY=your_sora_api_key
```

The `/api/expand-prompt` route uses `OPENAI_API_KEY` to call the OpenAI GPT API, and `/api/generate-video` uses `SORA_API_KEY` to request videos from the Sora service. Without these keys the app falls back to placeholder data.

## Project Structure

- `app/` - Next.js App Router routes.
- `components/` - UI components such as `ReelCard` and `QuizCard`.
- `store/` - Zustand store for user preferences.

## Settings

Use the **Settings** button on the feed page to choose a theme, voice, and quiz frequency. Preferences are saved to `localStorage` via Zustand so they persist across sessions.
