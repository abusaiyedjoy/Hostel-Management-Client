import { Badge, UserIcon } from "lucide-react";

interface Notification {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  link?: string;
  linkLabel?: string;
  isNew?: boolean;
}
const notifications: { group: string; items: Notification[] }[] = [
  {
    group: "Now",
    items: [
      {
        id: "n1",
        icon: (
          <span className="flex size-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
            <UserIcon className="size-3.5" />
          </span>
        ),
        title: "New User Registration",
        description:
          "It is a long established fact that a reader will be distracted by the readable.",
        time: "23 min",
        link: "#",
        linkLabel: "15 new users registered today",
        isNew: true,
      },
    ],
  },
  {
    group: "Today",
    items: [
      {
        id: "n2",
        icon: (
          <span className="flex size-7 items-center justify-center rounded-lg bg-rose-100 text-rose-500">
            ♡
          </span>
        ),
        title: "Your weekly rescuers is ready!",
        description:
          "It is a long established fact that a reader will be distracted by the readable.",
        time: "23 min",
        link: "#",
        linkLabel: "Open weekly resource",
      },
      {
        id: "n3",
        icon: (
          <span className="flex size-7 items-center justify-center rounded-lg bg-rose-100 text-rose-500">
            ♡
          </span>
        ),
        title: "Your weekly rescuers is ready!",
        description:
          "It is a long established fact that a reader will be distracted by the readable.",
        time: "23 min",
        link: "#",
        linkLabel: "Open weekly resource",
      },
    ],
  },
];

// ── sub-components ────────────────────────────────────────────────────────────

export function NotificationDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute right-0 top-[calc(100%+10px)] z-50 w-[320px] md:w-[380px] rounded-2xl border border-border bg-white shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <span className="text-base font-semibold text-foreground">
          Notifications
        </span>
        <Badge className="bg-violet-100 text-violet-600 hover:bg-violet-100 text-xs px-2 py-0.5 rounded-full font-medium">
          1 new
        </Badge>
      </div>

      <div className="max-h-[420px] overflow-y-auto px-3 pb-3 space-y-4">
        {notifications.map((group) => (
          <div key={group.group}>
            <p className="px-2 pb-1.5 text-sm font-medium text-muted-foreground">
              {group.group}
            </p>
            <div className="space-y-1.5">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="relative flex gap-3 rounded-xl bg-[#f7f7fb] p-3 hover:bg-slate-100 transition-colors"
                >
                  {item.isNew && (
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-violet-500" />
                  )}
                  <div className="mt-0.5 shrink-0 pl-1">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground leading-snug">
                        {item.title}
                      </p>
                      <span className="shrink-0 text-xs text-muted-foreground whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                    {item.link && (
                      <a
                        href={item.link}
                        className="mt-1 inline-block text-xs text-violet-600 font-medium hover:underline"
                      >
                        {item.linkLabel}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="border-t border-border">
        <button className="w-full py-3 text-center text-sm font-medium text-foreground hover:bg-slate-50 rounded-b-2xl transition-colors">
          View all Notification
        </button>
      </div>
    </div>
  );
}
