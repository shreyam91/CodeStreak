'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from "@/components/ProtectedRoute";
import { ArrowLeft, Lightbulb, Target, Code2, CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const machineCodingQuestions = [
  {
    id: 1,
    title: "Star Rating Component",
    difficulty: "Easy",
    category: "Frontend UI",
    description: "Build a reusable Star Rating component in React. It should take a 'maximum rating' and 'current rating' as props. The component must allow users to click a star to set the rating, and hover over stars to see a visual preview of the rating.",
    how: "Use a state variable to track the current rating and another for the hover state. Iterate from 1 to maxRating to render the stars. Attach `onMouseEnter`, `onMouseLeave`, and `onClick` event handlers to each star element to update the states accordingly.",
    why: "This is a fundamental UI pattern found in e-commerce and review sites. Interviewers ask this to test your grasp of React state management, DOM event handling, and conditional styling (e.g., highlighting stars up to the hovered index).",
    code: "import { useState } from \"react\";\n\nconst StarRating = ({ max = 5 }) => {\n  const [rating, setRating] = useState(0);\n  const [hover, setHover] = useState(0);\n\n  return (\n    <div className=\"flex gap-1\">\n      {[...Array(max)].map((_, i) => {\n        const starValue = i + 1;\n        return (\n          <span\n            key={starValue}\n            className={`text-3xl cursor-pointer transition-colors ${starValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}\n            onClick={() => setRating(starValue)}\n            onMouseEnter={() => setHover(starValue)}\n            onMouseLeave={() => setHover(0)}\n          >\n            ★\n          </span>\n        );\n      })}\n    </div>\n  );\n};\n\nexport default StarRating;"
  },
  {
    id: 2,
    title: "Autocomplete / Typeahead",
    difficulty: "Medium",
    category: "Frontend Logic",
    description: "Build an autocomplete search bar that fetches data from a mock API as the user types. It should debounce the input, show a loading state, and display a dropdown of clickable results.",
    how: "Implement a custom `useDebounce` hook to delay the API call (e.g., by 300ms) to avoid spamming the server. Maintain local state for the `query`, `results`, `isLoading`, and `error`. Use a `useEffect` that listens to the debounced query to trigger the fetch.",
    why: "This tests your understanding of asynchronous operations, debouncing, handling race conditions (e.g., when an older request resolves after a newer one), and managing complex UI states (dropdown visibility, loading spinners).",
    code: "import { useState, useEffect } from \"react\";\nimport { useDebounce } from \"./hooks/useDebounce\";\n\nconst Autocomplete = () => {\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n  const [isLoading, setIsLoading] = useState(false);\n  const debouncedQuery = useDebounce(query, 300);\n\n  useEffect(() => {\n    if (!debouncedQuery) {\n      setResults([]);\n      return;\n    }\n    \n    let isMounted = true;\n    setIsLoading(true);\n    \n    fetch(`/api/search?q=${debouncedQuery}`)\n      .then(res => res.json())\n      .then(data => {\n        if (isMounted) setResults(data);\n      })\n      .finally(() => {\n        if (isMounted) setIsLoading(false);\n      });\n\n    return () => { isMounted = false; };\n  }, [debouncedQuery]);\n\n  return (\n    <div className=\"relative w-64\">\n      <input \n        value={query} \n        onChange={(e) => setQuery(e.target.value)} \n        placeholder=\"Search...\"\n        className=\"w-full border p-2 rounded\"\n      />\n      {isLoading && <div className=\"absolute right-2 top-2\">...</div>}\n      {results.length > 0 && (\n        <ul className=\"absolute top-full left-0 w-full bg-white border shadow-md\">\n          {results.map(item => (\n            <li key={item.id} className=\"p-2 hover:bg-gray-100 cursor-pointer\">\n              {item.name}\n            </li>\n          ))}\n        </ul>\n      )}\n    </div>\n  );\n};"
  },
  {
    id: 3,
    title: "Progress Bar Component",
    difficulty: "Easy",
    category: "Frontend UI",
    description: "Create an animated Progress Bar component that accepts a `value` (0 to 100). The bar should smoothly transition to the new width when the value changes.",
    how: "Return a container `div` with a fixed width and background. Inside, render a child `div` whose width percentage is bound to the `value` prop. Add CSS `transition: width 0.3s ease` to the child element for smooth animation.",
    why: "Evaluates basic component composition, inline styling vs classes, and understanding of CSS transitions tied to React props.",
    code: "const ProgressBar = ({ value }) => {\n  const clampedValue = Math.min(Math.max(value, 0), 100);\n  \n  return (\n    <div className=\"w-full bg-gray-200 rounded-full h-4 overflow-hidden\">\n      <div \n        className=\"bg-blue-600 h-full transition-all duration-300 ease-in-out\"\n        style={{ width: `${clampedValue}%` }}\n      />\n    </div>\n  );\n};"
  }
];

export default function MachineCodingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params.id ? parseInt(params.id as string) : 1;
  const activeQuestion = machineCodingQuestions.find(q => q.id === idParam) || machineCodingQuestions[0];

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen overflow-hidden bg-background">
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center border-b px-4 justify-between z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/dashboard/machine-coding')}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted"
            >
              <ArrowLeft size={16} />
              Machine Coding List
            </button>
            <div className="h-4 w-px bg-border"></div>
            <h2 className="font-bold hidden sm:block">{activeQuestion.title}</h2>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-1.5 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2">
              <CheckCircle2 size={16} />
              Mark as Solved
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel: Description and Walkthrough */}
          <div className="w-1/2 flex flex-col border-r border-border bg-background overflow-y-auto">
            <div className="p-8 max-w-4xl mx-auto w-full space-y-10">
              <div>
                <h1 className="text-3xl font-bold mb-4">{activeQuestion.title}</h1>
                <div className="flex gap-2 mb-6">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                    activeQuestion.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                    activeQuestion.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' :
                    'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}>
                    {activeQuestion.difficulty}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
                    {activeQuestion.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-3">Problem Statement</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {activeQuestion.description}
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-card p-6 rounded-2xl border shadow-sm">
                  <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                    <Lightbulb size={20} className="text-yellow-500" />
                    How to solve it
                  </h3>
                  <p className="text-card-foreground leading-relaxed">
                    {activeQuestion.how}
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-2xl border shadow-sm">
                  <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                    <Target size={20} className="text-blue-500" />
                    Why is it asked?
                  </h3>
                  <p className="text-card-foreground leading-relaxed">
                    {activeQuestion.why}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Solution Code */}
          <div className="w-1/2 flex flex-col bg-[#1e1e1e] overflow-hidden">
            <div className="flex px-4 py-3 bg-[#2d2d2d] border-b border-[#3c3c3c] items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 size={16} className="text-primary" />
                <span className="text-sm font-medium text-gray-200">Solution Implementation (React)</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6 font-mono text-sm leading-relaxed bg-[#1e1e1e]">
              <pre className="text-[#d4d4d4]">
                <code>{activeQuestion.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
