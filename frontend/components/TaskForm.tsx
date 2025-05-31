'use client'
import * as React from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { tasksApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/use-toast";

const TaskForm = () => {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [smartInput, setSmartInput] = React.useState<string>("");

  const [dueDate, setDueDate] = React.useState<string>("");
  const [dueTime, setDueTime] = React.useState<string>("");
  const [withinTime, setWithinTime] = React.useState<string>("");
  const [priority, setPriority] = React.useState<"high" | "mid" | "easy">("mid");
  const [parseError, setParseError] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Debounce the smart input to avoid too many API calls
  const debouncedSmartInput = useDebounce(smartInput, 500);

  // Function to convert UTC to local time
  const convertToLocalTime = (utcDate: string, utcTime: string) => {
    const date = new Date(`${utcDate}T${utcTime}:00Z`);
    return {
      date: date.toLocaleDateString('en-CA'), // YYYY-MM-DD format
      time: date.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  // Auto-parse when smart input changes
  React.useEffect(() => {
    const parseSmartInput = async () => {
      if (!debouncedSmartInput.trim()) return;

      try {
        setParseError("");
        setIsLoading(true);

        const token = localStorage.getItem('token');
        const response = await fetch('/api/parse-date', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ text: debouncedSmartInput }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to parse date');
        }

        // Convert UTC to local time
        const localDateTime = convertToLocalTime(data.date, data.time);
        setDueDate(localDateTime.date);
        setDueTime(localDateTime.time);

        // Set timer (duration user should complete the task in)
        if (data.durationMinutes !== null && data.durationMinutes !== undefined) {
          const hours = Math.floor(data.durationMinutes / 60);
          const minutes = data.durationMinutes % 60;
          const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
          setWithinTime(timeStr);
        } else {
          setWithinTime("");
        }

        // Parse priority from input
        const lowerInput = debouncedSmartInput.toLowerCase();
        if (lowerInput.includes("high")) setPriority("high");
        else if (lowerInput.includes("mid")) setPriority("mid");
        else if (lowerInput.includes("easy")) setPriority("easy");
      } catch (error) {
        setParseError(error instanceof Error ? error.message : 'Error parsing date');
        console.error('Date parsing error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    parseSmartInput();
  }, [debouncedSmartInput]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }

    setSubmitError(null);
    setIsLoading(true);

    try {
      const taskData = {
        title,
        description,
        dueDate,
        dueTime,
        duration: withinTime,
        priority,
        completed: false
      };

      await tasksApi.create(taskData);
      
      // Reset form
      setTitle("");
      setDescription("");
      setSmartInput("");
      setDueDate("");
      setDueTime("");
      setWithinTime("");
      setPriority("mid");
      
      // Show success message using toast
      toast({
        title: "Task Created",
        description: "Your task has been created successfully!",
        variant: "success",
      });
    } catch (error: any) {
      if (error.message === 'Session expired. Please login again.') {
        router.push('/login');
      } else {
        setSubmitError(error.message || 'Failed to create task');
        toast({
          title: "Error",
          description: error.message || 'Failed to create task',
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md font-sans space-y-6"
    >
      {/* Title input */}
      <div>
        <label htmlFor="task-title" className="block mb-2 font-semibold text-gray-700">
          Task Title:
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 outline-none"
        />
      </div>

      {/* Description with smart input */}
      <div>
        <label htmlFor="task-desc" className="block mb-2 font-semibold text-gray-700">
          Task Description:
        </label>
        <textarea
          id="task-desc"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            // Also update smart input when description changes
            setSmartInput(e.target.value);
          }}
          required
          rows={4}
          placeholder="Type your description here. You can include dates and priorities in natural language."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-base resize-none focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 outline-none"
        />
        {isLoading && (
          <p className="text-sm text-gray-500 mt-2">Parsing...</p>
        )}
        {parseError && (
          <p className="text-sm text-red-500 mt-2">{parseError}</p>
        )}
      </div>

      {/* Row with due date, due time, priority, submit */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col flex-1 min-w-[140px]">
          <label htmlFor="due-date" className="mb-1 font-semibold text-gray-700">
            Due Date:
          </label>
          <input
            type="date"
            id="due-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="rounded-md border border-gray-300 px-3 py-2 text-base focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 outline-none"
          />
        </div>

        <div className="flex flex-col flex-1 min-w-[120px]">
          <label htmlFor="due-time" className="mb-1 font-semibold text-gray-700">
            Due Time:
          </label>
          <input
            type="time"
            id="due-time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            required
            className="rounded-md border border-gray-300 px-3 py-2 text-base focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 outline-none"
          />
        </div>

        <div className="flex flex-col flex-1 min-w-[140px]">
          <label htmlFor="due-timewithIn" className="mb-1 font-semibold text-gray-700">
            Duration:
          </label>
          <div className="relative w-full max-w-xs">
            <input
              type="time"
              id="due-timewithIn"
              value={withinTime}
              onChange={(e) => setWithinTime(e.target.value)}
              step="60"
              className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-base focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 outline-none"
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m3-9h-2M9 2h6a1 1 0 011 1v1H8V3a1 1 0 011-1zM12 22a9 9 0 100-18 9 9 0 000 18z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-[120px]">
          <label htmlFor="priority" className="mb-1 font-semibold text-gray-700">
            Priority:
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            required
            className="rounded-md border border-gray-300 px-3 py-2 text-base focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 outline-none"
          >
            <option value="high">High</option>
            <option value="mid">Mid</option>
            <option value="easy">Easy</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="whitespace-nowrap rounded-md bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Task'}
        </button>
      </div>

      {submitError && (
        <div className="text-red-500 text-sm mt-2">{submitError}</div>
      )}
    </form>
  );
};

export default TaskForm;
