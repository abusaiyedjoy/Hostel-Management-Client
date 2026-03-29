"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface ToggleRowProps {
  id: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
}

export function ToggleRow({
  id,
  label,
  description,
  defaultChecked = false,
}: ToggleRowProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={setChecked}
        className="data-[state=checked]:bg-primary"
      />
    </div>
  );
}
