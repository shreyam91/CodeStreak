'use client';

import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Editor from "@monaco-editor/react";

const dsaQuestions = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    pattern: "Arrays & Hashing",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists."],
    defaultCode: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};",
    testcases: "nums =\n[2,7,11,15]\ntarget =\n9"
  },
  {
    id: 2,
    title: "Valid Anagram",
    difficulty: "Easy",
    pattern: "Arrays & Hashing",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    examples: "Input: s = \"anagram\", t = \"nagaram\"\nOutput: true\n\nInput: s = \"rat\", t = \"car\"\nOutput: false",
    constraints: ["1 <= s.length, t.length <= 5 * 10^4", "s and t consist of lowercase English letters."],
    defaultCode: "/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nvar isAnagram = function(s, t) {\n    \n};",
    testcases: "s =\n\"anagram\"\nt =\n\"nagaram\""
  },
  {
    id: 3,
    title: "Valid Palindrome",
    difficulty: "Easy",
    pattern: "Two Pointers",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string s, return true if it is a palindrome, or false otherwise.",
    examples: "Input: s = \"A man, a plan, a canal: Panama\"\nOutput: true\nExplanation: \"amanaplanacanalpanama\" is a palindrome.",
    constraints: ["1 <= s.length <= 2 * 10^5", "s consists only of printable ASCII characters."],
    defaultCode: "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isPalindrome = function(s) {\n    \n};",
    testcases: "s =\n\"A man, a plan, a canal: Panama\""
  },
  {
    id: 4,
    title: "3Sum",
    difficulty: "Medium",
    pattern: "Two Pointers",
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.",
    examples: "Input: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]",
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    defaultCode: "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function(nums) {\n    \n};",
    testcases: "nums =\n[-1,0,1,2,-1,-4]"
  },
  {
    id: 5,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    pattern: "Sliding Window",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    examples: "Input: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    defaultCode: "/**\n * @param {number[]} prices\n * @return {number}\n */\nvar maxProfit = function(prices) {\n    \n};",
    testcases: "prices =\n[7,1,5,3,6,4]"
  }
];

export default function DSAPage() {
  const [activeId, setActiveId] = useState(dsaQuestions[0].id);
  const [language, setLanguage] = useState("javascript");
  
  const activeQuestion = dsaQuestions.find(q => q.id === activeId);

  // Group questions by pattern
  const questionsByPattern = dsaQuestions.reduce((acc, q) => {
    if (!acc[q.pattern]) acc[q.pattern] = [];
    acc[q.pattern].push(q);
    return acc;
  }, {} as Record<string, typeof dsaQuestions>);

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex h-screen overflow-hidden">
            <div className="flex flex-col h-full w-full">
              <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between z-10">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">DSA Practice</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80">Run Code</button>
                  <button className="px-4 py-1.5 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 flex items-center gap-1.5 shadow-sm">
                    Submit
                  </button>
                </div>
              </header>

              <div className="flex flex-1 overflow-hidden">
                {/* Left Panel: Pattern / Topic List */}
                <div className="w-[300px] flex flex-col border-r border-border bg-card overflow-y-auto">
                  <div className="p-4 border-b border-border sticky top-0 bg-card z-10 shadow-sm">
                    <h2 className="font-bold text-lg">Problems by Pattern</h2>
                    <p className="text-xs text-muted-foreground mt-1">Select a topic to practice</p>
                  </div>
                  
                  <div className="flex-1 p-2">
                    {Object.entries(questionsByPattern).map(([pattern, questions]) => (
                      <div key={pattern} className="mb-4">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">{pattern}</h3>
                        <div className="space-y-1">
                          {questions.map(q => (
                            <button
                              key={q.id}
                              onClick={() => setActiveId(q.id)}
                              className={"w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors text-left " + (
                                activeId === q.id 
                                  ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                                  : "hover:bg-muted text-foreground"
                              )}
                            >
                              <span className="truncate pr-2">{q.title}</span>
                              <span className={"text-[10px] px-1.5 py-0.5 rounded-sm font-bold " + (
                                activeId === q.id 
                                  ? "bg-primary-foreground/20 text-primary-foreground" 
                                  : (q.difficulty === 'Easy' ? 'text-green-500 bg-green-500/10' :
                                     q.difficulty === 'Medium' ? 'text-yellow-500 bg-yellow-500/10' :
                                     'text-red-500 bg-red-500/10')
                              )}>
                                {q.difficulty}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle Panel: Problem Description */}
                <div className="flex-1 flex flex-col border-r border-border bg-background overflow-y-auto min-w-[350px]">
                  {activeQuestion && (
                    <div className="p-6">
                      <h1 className="text-2xl font-bold mb-2">{activeQuestion.id}. {activeQuestion.title}</h1>
                      <div className="flex gap-2 mb-6">
                        <span className={"text-sm font-medium px-2.5 py-0.5 rounded-full " + (
                          activeQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          activeQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        )}>
                          {activeQuestion.difficulty}
                        </span>
                        <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                          {activeQuestion.pattern}
                        </span>
                      </div>
                      
                      <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed">
                        <div className="whitespace-pre-line mb-8 text-foreground">{activeQuestion.description}</div>
                        
                        <h3 className="text-lg font-bold mt-6 mb-3">Example:</h3>
                        <div className="bg-muted/50 p-4 rounded-lg border border-border/50 font-mono text-sm whitespace-pre-line text-muted-foreground">
                          {activeQuestion.examples}
                        </div>

                        <h3 className="text-lg font-bold mt-8 mb-3">Constraints:</h3>
                        <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                          {activeQuestion.constraints.map((c, i) => (
                            <li key={i}><code className="bg-muted px-1.5 py-0.5 rounded text-foreground">{c}</code></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Panel: Code Editor & Console */}
                <div className="flex-1 flex flex-col bg-[#1e1e1e] min-w-[400px]">
                  {/* Editor Header */}
                  <div className="h-10 bg-[#2d2d2d] flex items-center px-4 border-b border-[#1e1e1e] justify-between">
                    <select 
                      className="bg-transparent text-gray-300 text-sm outline-none font-medium cursor-pointer hover:text-white"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                    </select>
                    <div className="flex gap-2">
                      <button className="text-gray-400 hover:text-white text-sm" title="Reset to default code">↻ Reset</button>
                    </div>
                  </div>
                  
                  {/* Monaco Editor */}
                  <div className="flex-1 relative pt-2">
                    {activeQuestion && (
                      <Editor
                        height="100%"
                        language={language}
                        theme="vs-dark"
                        value={activeQuestion.defaultCode}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                          wordWrap: "on",
                          scrollBeyondLastLine: false,
                          smoothScrolling: true,
                          cursorBlinking: "smooth",
                          cursorSmoothCaretAnimation: "on",
                          formatOnPaste: true,
                        }}
                      />
                    )}
                  </div>

                  {/* Console / Output area */}
                  <div className="h-56 bg-[#252526] border-t border-[#3c3c3c] flex flex-col">
                    <div className="flex border-b border-[#3c3c3c]">
                      <button className="px-4 py-2 text-xs font-medium text-gray-300 border-b-2 border-blue-500 bg-[#2d2d2d] uppercase tracking-wider">
                        Testcases
                      </button>
                      <button className="px-4 py-2 text-xs font-medium text-gray-500 hover:text-gray-300 uppercase tracking-wider">
                        Test Result
                      </button>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto text-sm font-mono bg-[#1e1e1e]">
                      {activeQuestion && (
                        <div className="text-gray-300 whitespace-pre-line leading-loose">
                          {activeQuestion.testcases}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
