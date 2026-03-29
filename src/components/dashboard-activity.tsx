import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const recentActivities = [
  {
    title: "New business registration",
    description: "Pizza Place submitted certification",
    time: "2 min ago",
  },
  {
    title: "Review flagged",
    description: "Content requires moderation",
    time: "2 min ago",
  },
  {
    title: "Payment processed",
    description: "Monthly subscription renewal",
    time: "2 min ago",
  },
]

const quickActions = [
  {
    title: "Approve Business",
    description: "Pizza Place submitted certification",
  },
  {
    title: "Moderate Content",
    description: "Pizza Place submitted certification",
  },
  {
    title: "Send Notification",
    description: "Monthly subscription renewal",
  },
  {
    title: "Generate Report",
    description: "Monthly subscription renewal",
  },
]

export function DashboardActivity() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-6 mt-4 mb-6">
      {/* Recent Activity */}
      <Card className="shadow-sm border-none bg-white">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">Latest platform activities and alerts</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex justify-between items-start bg-slate-50 rounded-lg p-3">
              <div>
                <p className="text-sm font-semibold">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-sm border-none bg-white">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">Latest platform activities and alerts</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <button key={index} className="flex flex-col text-left border rounded-lg p-3 hover:bg-slate-50 transition-colors">
              <span className="text-sm font-semibold">{action.title}</span>
              <span className="text-xs text-muted-foreground mt-1">{action.description}</span>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
