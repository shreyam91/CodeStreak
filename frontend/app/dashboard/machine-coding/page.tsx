'use client';

import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

const machineCodingQuestions = [
  {
    id: 1,
    title: "Star Rating Component",
    difficulty: "Easy",
    description: "Build a reusable Star Rating component in React. It should take a 'maximum rating' and 'current rating' as props. The component must allow users to click a star to set the rating, and hover over stars to see a visual preview of the rating.",
    how: "Use a state variable to track the current rating and another for the hover state. Iterate from 1 to maxRating to render the stars. Attach `onMouseEnter`, `onMouseLeave`, and `onClick` event handlers to each star element to update the states accordingly.",
    why: "This is a fundamental UI pattern found in e-commerce and review sites. Interviewers ask this to test your grasp of React state management, DOM event handling, and conditional styling (e.g., highlighting stars up to the hovered index).",
    code: "import { useState } from \"react\";\n\nconst StarRating = ({ max = 5 }) => {\n  const [rating, setRating] = useState(0);\n  const [hover, setHover] = useState(0);\n\n  return (\n    <div className=\"flex gap-1\">\n      {[...Array(max)].map((_, i) => {\n        const starValue = i + 1;\n        return (\n          <span\n            key={starValue}\n            className={`text-3xl cursor-pointer transition-colors ${starValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}\n            onClick={() => setRating(starValue)}\n            onMouseEnter={() => setHover(starValue)}\n            onMouseLeave={() => setHover(0)}\n          >\n            ★\n          </span>\n        );\n      })}\n    </div>\n  );\n};\n\nexport default StarRating;"
  },
  {
    id: 2,
    title: "Autocomplete / Typeahead",
    difficulty: "Medium",
    description: "Build an autocomplete search bar that fetches data from a mock API as the user types. It should debounce the input, show a loading state, and display a dropdown of clickable results.",
    how: "Implement a custom `useDebounce` hook to delay the API call (e.g., by 300ms) to avoid spamming the server. Maintain local state for the `query`, `results`, `isLoading`, and `error`. Use a `useEffect` that listens to the debounced query to trigger the fetch.",
    why: "This tests your understanding of asynchronous operations, debouncing, handling race conditions (e.g., when an older request resolves after a newer one), and managing complex UI states (dropdown visibility, loading spinners).",
    code: "import { useState, useEffect } from \"react\";\nimport { useDebounce } from \"./hooks/useDebounce\";\n\nconst Autocomplete = () => {\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n  const [isLoading, setIsLoading] = useState(false);\n  const debouncedQuery = useDebounce(query, 300);\n\n  useEffect(() => {\n    if (!debouncedQuery) {\n      setResults([]);\n      return;\n    }\n    \n    let isMounted = true;\n    setIsLoading(true);\n    \n    fetch(`/api/search?q=${debouncedQuery}`)\n      .then(res => res.json())\n      .then(data => {\n        if (isMounted) setResults(data);\n      })\n      .finally(() => {\n        if (isMounted) setIsLoading(false);\n      });\n\n    return () => { isMounted = false; };\n  }, [debouncedQuery]);\n\n  return (\n    <div className=\"relative w-64\">\n      <input \n        value={query} \n        onChange={(e) => setQuery(e.target.value)} \n        placeholder=\"Search...\"\n        className=\"w-full border p-2 rounded\"\n      />\n      {isLoading && <div className=\"absolute right-2 top-2\">...</div>}\n      {results.length > 0 && (\n        <ul className=\"absolute top-full left-0 w-full bg-white border shadow-md\">\n          {results.map(item => (\n            <li key={item.id} className=\"p-2 hover:bg-gray-100 cursor-pointer\">\n              {item.name}\n            </li>\n          ))}\n        </ul>\n      )}\n    </div>\n  );\n};"
  },
  {
    id: 3,
    title: "Progress Bar Component",
    difficulty: "Easy",
    description: "Create an animated Progress Bar component that accepts a `value` (0 to 100). The bar should smoothly transition to the new width when the value changes.",
    how: "Return a container `div` with a fixed width and background. Inside, render a child `div` whose width percentage is bound to the `value` prop. Add CSS `transition: width 0.3s ease` to the child element for smooth animation.",
    why: "Evaluates basic component composition, inline styling vs classes, and understanding of CSS transitions tied to React props.",
    code: "const ProgressBar = ({ value }) => {\n  const clampedValue = Math.min(Math.max(value, 0), 100);\n  \n  return (\n    <div className=\"w-full bg-gray-200 rounded-full h-4 overflow-hidden\">\n      <div \n        className=\"bg-blue-600 h-full transition-all duration-300 ease-in-out\"\n        style={{ width: `${clampedValue}%` }}\n      />\n    </div>\n  );\n};"
  }
];

export default function MachineCodingPage() {
  const [activeId, setActiveId] = useState(machineCodingQuestions[0].id);
  
  const activeQuestion = machineCodingQuestions.find(q => q.id === activeId);

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex h-screen overflow-hidden">
            <div className="flex flex-col h-full w-full">
              <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">Machine Coding</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>

              <div className="flex flex-1 overflow-hidden">
                <div className="w-1/3 flex flex-col border-r border-border bg-card overflow-y-auto p-4 gap-3">
                  <h2 className="font-bold text-lg mb-2">Frontend Problems</h2>
                  {machineCodingQuestions.map((q) => (
                    <div 
                      key={q.id}
                      onClick={() => setActiveId(q.id)}
                      className={`p-4 rounded-lg cursor-pointer border transition-all duration-200 ${
                        activeId === q.id 
                          ? 'border-primary bg-primary/10 shadow-sm' 
                          : 'border-border hover:border-primary/50 hover:bg-muted'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-sm">{q.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          q.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-2">{q.description}</p>
                    </div>
                  ))}
                </div>

                <div className="w-2/3 flex flex-col bg-background overflow-y-auto">
                  {activeQuestion && (
                    <div className="p-8 max-w-4xl mx-auto w-full">
                      <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-3">{activeQuestion.title}</h1>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground mb-6">
                          {activeQuestion.difficulty}
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Problem Statement</h2>
                        <p className="text-muted-foreground leading-relaxed">{activeQuestion.description}</p>
                      </div>

                      <Separator className="my-8" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-card p-6 rounded-xl border shadow-sm">
                          <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                            <span className="bg-primary/20 p-1.5 rounded-md text-primary">💡</span> How to solve it
                          </h3>
                          <p className="text-sm text-card-foreground leading-relaxed">
                            {activeQuestion.how}
                          </p>
                        </div>
                        
                        <div className="bg-card p-6 rounded-xl border shadow-sm">
                          <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                            <span className="bg-primary/20 p-1.5 rounded-md text-primary">🎯</span> Why is it asked?
                          </h3>
                          <p className="text-sm text-card-foreground leading-relaxed">
                            {activeQuestion.why}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-xl overflow-hidden border border-[#3c3c3c] bg-[#1e1e1e] shadow-lg mt-8">
                        <div className="flex px-4 py-3 bg-[#2d2d2d] border-b border-[#3c3c3c] items-center justify-between">
                          <span className="text-sm font-medium text-gray-200">Solution (React)</span>
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-sm text-[#d4d4d4] font-mono leading-relaxed">
                            <code>{activeQuestion.code}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
