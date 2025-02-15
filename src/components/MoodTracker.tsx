
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface MoodEntry {
  date: Date;
  mood: string;
  note: string;
}

const MoodTracker = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>("");

  const handleMoodSelect = (mood: string) => {
    if (!date) return;

    setSelectedMood(mood);
    setMoodEntries([...moodEntries, { date, mood, note: "" }]);
    toast.success("Mood logged successfully!");
  };

  const getDayMood = (day: Date) => {
    const entry = moodEntries.find(
      (e) => e.date.toDateString() === day.toDateString()
    );
    return entry?.mood;
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-slate-800 mb-2">How are you feeling today?</h3>
        <Select value={selectedMood} onValueChange={handleMoodSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select your mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="great">Great</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="okay">Okay</SelectItem>
            <SelectItem value="bad">Bad</SelectItem>
            <SelectItem value="terrible">Terrible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </div>
  );
};

export default MoodTracker;
