
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [type, setType] = useState<"work" | "break">("work");

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (type === "work") {
        setTimeLeft(5 * 60);
        setType("break");
        toast.success("Work session complete! Take a break.");
      } else {
        setTimeLeft(25 * 60);
        setType("work");
        toast.success("Break time over! Back to work.");
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, type]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    setType("work");
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-8">
        <div className="text-6xl font-semibold text-slate-800 mb-4">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
        <p className="text-slate-600">
          {type === "work" ? "Focus Time" : "Break Time"}
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={toggleTimer} size="lg">
          {isActive ? (
            <Pause className="mr-2 h-4 w-4" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Pomodoro;
