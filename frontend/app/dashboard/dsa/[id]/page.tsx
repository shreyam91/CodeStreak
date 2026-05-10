'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from "@/components/ProtectedRoute";
import Editor from "@monaco-editor/react";
import { ArrowLeft, Lightbulb, Clock, Database, Building2, ChevronDown, ChevronUp } from "lucide-react";

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
    testcases: "nums =\n[2,7,11,15]\ntarget =\n9",
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.",
      "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array keeping a track of the elements we have already seen and their indices?"
    ],
    timeComplexity: "O(n) - We traverse the list containing n elements exactly once. Each lookup in the table costs only O(1) time.",
    spaceComplexity: "O(n) - The extra space required depends on the number of items stored in the hash table, which stores at most n elements.",
    companies: ["Google", "Amazon", "Facebook", "Microsoft", "Apple"]
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
    testcases: "s =\n\"anagram\"\nt =\n\"nagaram\"",
    hints: [
      "A simple way is to sort both strings. If they are anagrams, they will be identical after sorting.",
      "Can we do this faster? We could use a hash table or a frequency array to count the occurrences of each letter in the strings."
    ],
    timeComplexity: "O(n) - We only need to traverse both strings once.",
    spaceComplexity: "O(1) - Since the size of the character set is fixed (26 lowercase letters), the extra space is constant.",
    companies: ["Google", "Amazon", "Bloomberg", "Spotify"]
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
    testcases: "s =\n\"A man, a plan, a canal: Panama\"",
    hints: [
      "Filter the string to remove non-alphanumeric characters and convert to lowercase.",
      "Use two pointers, one at the beginning and one at the end of the string. Move them inwards comparing characters."
    ],
    timeComplexity: "O(n) - We traverse the string linearly.",
    spaceComplexity: "O(1) - If implemented using two pointers without creating a new filtered string.",
    companies: ["Facebook", "Microsoft", "Amazon", "LinkedIn"]
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
    testcases: "nums =\n[-1,0,1,2,-1,-4]",
    hints: [
      "Sorting the array simplifies the problem significantly.",
      "Once sorted, you can iterate through the array, fixing one number and using the two-pointer approach for the remaining two numbers to find pairs that sum to -fixedNumber.",
      "Be careful to skip duplicate values to ensure the solution set does not contain duplicate triplets."
    ],
    timeComplexity: "O(n^2) - Sorting takes O(n log n), and then we do an O(n) two-pointer search for each of the n elements.",
    spaceComplexity: "O(1) or O(n) - Depending on the sorting algorithm implementation, not counting the output array.",
    companies: ["Amazon", "Facebook", "Microsoft", "Apple", "Google"]
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
    testcases: "prices =\n[7,1,5,3,6,4]",
    hints: [
      "As we iterate through the prices, we want to keep track of the lowest price seen so far.",
      "At each step, calculate the potential profit if we sold at the current price, and update the maximum profit seen so far."
    ],
    timeComplexity: "O(n) - We only iterate through the prices array once.",
    spaceComplexity: "O(1) - Only two variables are needed: min_price and max_profit.",
    companies: ["Amazon", "Google", "Facebook", "Microsoft", "Bloomberg"]
  }
];

export default function DSAPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params.id ? parseInt(params.id as string) : 1;
  const [activeId, setActiveId] = useState(idParam);
  const [language, setLanguage] = useState("javascript");
  
  // Hint expansion state
  const [expandedHints, setExpandedHints] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (params.id) {
      setActiveId(parseInt(params.id as string));
    }
  }, [params.id]);

  const activeQuestion = dsaQuestions.find(q => q.id === activeId) || dsaQuestions[0];

  const toggleHint = (index: number) => {
    setExpandedHints(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen overflow-hidden bg-background">
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center border-b px-4 justify-between z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/dashboard/dsa')}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted"
            >
              <ArrowLeft size={16} />
              Problem List
            </button>
            <div className="h-4 w-px bg-border"></div>
            <h2 className="font-bold hidden sm:block">{activeQuestion.id}. {activeQuestion.title}</h2>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors">Run Code</button>
            <button className="px-4 py-1.5 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors shadow-sm">
              Submit
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel: Problem Description */}
          <div className="w-1/2 flex flex-col border-r border-border bg-background overflow-y-auto">
            <div className="p-6 lg:p-8">
              <h1 className="text-2xl font-bold mb-4">{activeQuestion.id}. {activeQuestion.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                <span className={"text-xs font-semibold px-2.5 py-1 rounded-md " + (
                  activeQuestion.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                  activeQuestion.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' :
                  'bg-red-500/10 text-red-600 dark:text-red-400'
                )}>
                  {activeQuestion.difficulty}
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border">
                  {activeQuestion.pattern}
                </span>
              </div>
              
              <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed mb-8">
                <div className="whitespace-pre-line text-foreground/90 text-base">{activeQuestion.description}</div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">Example:</h3>
                  <div className="bg-muted/50 p-4 rounded-xl border border-border font-mono text-sm whitespace-pre-line text-foreground/80 shadow-inner">
                    {activeQuestion.examples}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">Constraints:</h3>
                  <ul className="list-none space-y-2">
                    {activeQuestion.constraints.map((c, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/50"></div>
                        <code className="bg-muted px-2 py-0.5 rounded-md text-foreground/80">{c}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Complexity Section */}
              <div className="mt-10 mb-8 p-5 bg-card border border-border rounded-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Complexity Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <div className="mt-0.5 bg-blue-500/10 p-2 rounded-lg h-fit text-blue-500">
                      <Clock size={16} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold block mb-1">Time</span>
                      <span className="text-xs text-muted-foreground">{activeQuestion.timeComplexity}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-0.5 bg-purple-500/10 p-2 rounded-lg h-fit text-purple-500">
                      <Database size={16} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold block mb-1">Space</span>
                      <span className="text-xs text-muted-foreground">{activeQuestion.spaceComplexity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Tags Section */}
              <div className="mb-8">
                <h3 className="text-sm font-bold flex items-center gap-2 text-foreground mb-3">
                  <Building2 size={16} className="text-muted-foreground" />
                  Companies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeQuestion.companies.map((company, i) => (
                    <span key={i} className="px-3 py-1 bg-muted text-xs font-medium rounded-full text-foreground/70 border border-border/50">
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hints Section */}
              <div className="space-y-3 mb-10">
                <h3 className="text-sm font-bold text-foreground mb-3">Need Help?</h3>
                {activeQuestion.hints.map((hint, i) => (
                  <div key={i} className="border border-border rounded-xl overflow-hidden bg-card">
                    <button 
                      onClick={() => toggleHint(i)}
                      className="w-full flex items-center justify-between p-3.5 text-sm font-medium hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Lightbulb size={16} className={expandedHints[i] ? "text-yellow-500" : "text-muted-foreground"} />
                        <span>Hint {i + 1}</span>
                      </div>
                      {expandedHints[i] ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                    </button>
                    {expandedHints[i] && (
                      <div className="p-4 pt-0 text-sm text-muted-foreground border-t border-border/50 bg-muted/20">
                        {hint}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Code Editor & Console */}
          <div className="w-1/2 flex flex-col bg-[#1e1e1e]">
            {/* Editor Header */}
            <div className="h-12 bg-[#252526] flex items-center px-4 border-b border-[#1e1e1e] justify-between">
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
                <button className="text-gray-400 hover:text-white text-xs font-medium flex items-center gap-1.5" title="Reset to default code">
                  ↻ Reset
                </button>
              </div>
            </div>
            
            {/* Monaco Editor */}
            <div className="flex-1 relative pt-2">
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
                  padding: { top: 16 }
                }}
              />
            </div>

            {/* Console / Output area */}
            <div className="h-64 bg-[#1e1e1e] border-t border-[#3c3c3c] flex flex-col">
              <div className="flex bg-[#252526]">
                <button className="px-5 py-2.5 text-xs font-bold text-gray-200 border-t-2 border-blue-500 bg-[#1e1e1e] tracking-wide">
                  Testcases
                </button>
                <button className="px-5 py-2.5 text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors tracking-wide">
                  Test Result
                </button>
              </div>
              <div className="p-5 flex-1 overflow-y-auto text-sm font-mono bg-[#1e1e1e]">
                <div className="text-gray-300 whitespace-pre-line leading-loose">
                  {activeQuestion.testcases}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
