import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

interface SaveButtonProps {
  onClick?: () => void;
  className?: string;
}

export function SaveButton({ onClick, className }: SaveButtonProps) {
  return (
    <div className={`flex justify-end pt-4 ${className ?? ""}`}>
      <Button
        onClick={onClick}
        className="bg-primary hover:bg-[#5B45D4] text-white gap-2 px-6 rounded-lg cursor-pointer"
      >
        <SaveIcon className="size-4" />
        Save Changes
      </Button>
    </div>
  );
}
