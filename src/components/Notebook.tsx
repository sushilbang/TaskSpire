
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Notebook = () => {
  const [notes, setNotes] = useState<string>("");
  const [isEditing, setIsEditing] = useState(true);

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Notes saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Preview" : "Edit"}
        </Button>
        {isEditing && (
          <Button onClick={handleSave}>Save</Button>
        )}
      </div>

      {isEditing ? (
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes here using Markdown..."
          className="min-h-[500px] font-mono"
        />
      ) : (
        <div className="prose max-w-none bg-white p-6 rounded-xl border border-slate-200">
          <ReactMarkdown>{notes || "No notes yet. Click Edit to start writing!"}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Notebook;
