import { cn } from "@/lib/utils";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsSection({ title, children, className }: SettingsSectionProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-white p-6", className)}>
      <h3 className="text-base font-semibold text-foreground mb-5">{title}</h3>
      {children}
    </div>
  );
}