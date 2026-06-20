import { useState } from 'react';
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Home,
  Inbox,
  LogOut,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  Users,
  X,
  TrendingUp,
  AlertCircle,
  CheckCheck,
  ChevronDown,
  Filter,
  MoreVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { useTheme } from '@/contexts/ThemeContext';
import { useLocation, Link } from 'wouter';
import Navigation from '@/components/Navigation';
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  tags: string[];
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Sarah Chen',
    dueDate: '2024-06-25',
    tags: ['Design', 'Frontend']
  },
  {
    id: '2',
    title: 'Implement user authentication',
    status: 'todo',
    priority: 'high',
    assignee: 'John Developer',
    dueDate: '2024-06-20',
    tags: ['Backend', 'Security']
  },
  {
    id: '3',
    title: 'Write API documentation',
    status: 'review',
    priority: 'medium',
    assignee: 'Alex Martinez',
    dueDate: '2024-06-22',
    tags: ['Documentation']
  },
  {
    id: '4',
    title: 'Fix mobile responsiveness',
    status: 'done',
    priority: 'medium',
    assignee: 'Emma Wilson',
    dueDate: '2024-06-18',
    tags: ['Frontend', 'Bug Fix']
  },
  {
    id: '5',
    title: 'Setup CI/CD pipeline',
    status: 'in-progress',
    priority: 'high',
    assignee: 'David Kim',
    dueDate: '2024-06-28',
    tags: ['DevOps', 'Infrastructure']
  },
  {
    id: '6',
    title: 'Create user onboarding flow',
    status: 'todo',
    priority: 'medium',
    assignee: 'Sarah Chen',
    dueDate: '2024-06-30',
    tags: ['UX', 'Frontend']
  },
];

const chartData = [
  { date: 'Mon', tasks: 4, completed: 2 },
  { date: 'Tue', tasks: 6, completed: 3 },
  { date: 'Wed', tasks: 8, completed: 5 },
  { date: 'Thu', tasks: 7, completed: 4 },
  { date: 'Fri', tasks: 9, completed: 7 },
  { date: 'Sat', tasks: 5, completed: 5 },
  { date: 'Sun', tasks: 3, completed: 3 },
];

export default function Dashboard() {
  const [location, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [events, setEvents] = useState([
    { title: 'Product Strategy Review', time: '10:00 AM - 11:30 AM', type: 'Meeting' },
    { title: 'Design Sync', time: '2:00 PM - 3:00 PM', type: 'Call' },
    { title: 'Team Retrospective', time: '4:00 PM - 5:00 PM', type: 'Meeting' }
  ]);
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Sarah Chen', email: 'sarah@taskflow.inc', role: 'Admin', dept: 'Engineering', status: 'Active', initial: 'SC' },
    { name: 'Alex Mercer', email: 'alex@taskflow.inc', role: 'Editor', dept: 'DevOps', status: 'Active', initial: 'AM' },
    { name: 'David Kim', email: 'david@taskflow.inc', role: 'Viewer', dept: 'Product', status: 'Offline', initial: 'DK' },
    { name: 'Elena Rostova', email: 'elena@taskflow.inc', role: 'Admin', dept: 'Leadership', status: 'Active', initial: 'ER' },
    { name: 'Marcus Vance', email: 'marcus@taskflow.inc', role: 'Editor', dept: 'Design', status: 'Away', initial: 'MV' },
  ]);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || task.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const tasksByStatus = {
    todo: filteredTasks.filter(t => t.status === 'todo'),
    'in-progress': filteredTasks.filter(t => t.status === 'in-progress'),
    review: filteredTasks.filter(t => t.status === 'review'),
    done: filteredTasks.filter(t => t.status === 'done'),
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'done').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    highPriority: tasks.filter(t => t.priority === 'high').length,
  };

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTask: Task = {
      id: Math.random().toString(36).substring(7),
      title: formData.get('title') as string,
      status: 'todo',
      priority: formData.get('priority') as 'low' | 'medium' | 'high',
      assignee: formData.get('assignee') as string,
      dueDate: formData.get('dueDate') as string,
      tags: [],
    };
    setTasks([...tasks, newTask]);
    setNewTaskOpen(false);
  };

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent = {
      title: formData.get('title') as string,
      time: formData.get('time') as string,
      type: formData.get('type') as string,
    };
    setEvents([...events, newEvent]);
    setAddEventOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const initial = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    
    const newMember = {
      name,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      dept: formData.get('dept') as string,
      status: 'Offline',
      initial
    };
    
    setTeamMembers([...teamMembers, newMember]);
    setAddMemberOpen(false);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'done' ? 'todo' : 'done'
        };
      }
      return task;
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sidebarItems = [
    { icon: CheckCircle2, label: 'My Tasks', path: '/dashboard/my-tasks' },
    { icon: Inbox, label: 'Inbox', badge: 3, path: '/dashboard/inbox' },
    { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
    { icon: BarChart3, label: 'Reports', path: '/dashboard/reports' },
    { icon: Users, label: 'Teams', path: '/dashboard/teams' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const isActive = (path: string) => {
    if (location === '/dashboard' && path === '/dashboard/my-tasks') return true;
    return location.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950">
      <Navigation />

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background/80 backdrop-blur-xl border-r border-border/50 transition-all duration-300 z-40 overflow-y-auto ${
            sidebarOpen ? 'w-[280px]' : 'w-20'
          }`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <div className="p-4 space-y-[12px]">
            {sidebarItems.map((item, index) => {
              const active = isActive(item.path);
              return (
                <UITooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <a
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.path);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                        active
                          ? 'bg-gradient-to-r from-blue-600/10 to-transparent border-l-2 border-blue-600 text-blue-600'
                          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:shadow-[0_0_12px_rgba(0,102,255,0.1)]'
                      }`}
                    >
                      <item.icon className={`w-[22px] h-[22px] flex-shrink-0 transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                      {sidebarOpen && (
                        <>
                          <span className="flex-1 text-left text-[14px] font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs bg-blue-600/10 text-blue-600 border-none">{item.badge}</Badge>
                          )}
                        </>
                      )}
                    </a>
                  </TooltipTrigger>
                  {!sidebarOpen && (
                    <TooltipContent side="right" className="ml-2 bg-slate-800 text-white border-slate-700">
                      {item.label}
                    </TooltipContent>
                  )}
                </UITooltip>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-[280px]' : 'ml-20'}`}>
          {/* Top Bar */}
          <div className="sticky top-16 bg-background/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border z-30">
            <div className="container flex items-center justify-between h-16 px-4">
              <div className="flex items-center gap-4 flex-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="rounded-lg"
                >
                  {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
                <div className="relative hidden sm:block flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className="rounded-lg"
                  title="Toggle filters"
                >
                  <Filter className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-lg"
                >
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  title="Back to Home"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="container p-4 space-y-8">
            {location.startsWith('/dashboard/settings') ? (
              <div className="max-w-2xl mx-auto py-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'Geist' }}>Account Settings</h2>
                    <p className="text-muted-foreground mt-2">Manage your profile, preferences, and security.</p>
                  </div>
                </div>
                
                {settingsSaved && (
                  <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center gap-3">
                    <CheckCheck className="w-5 h-5" />
                    <span className="font-medium">Settings saved successfully.</span>
                  </div>
                )}

                <Card className="p-6 border-border shadow-sm">
                  <form onSubmit={handleSaveSettings} className="space-y-8">
                    {/* Profile */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4 border-b border-border pb-2">Profile Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="Sarah" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Chen" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue="sarah@taskflow.inc" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Job Title</Label>
                          <Input id="role" defaultValue="VP of Engineering" />
                        </div>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4 border-b border-border pb-2">Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive daily digest and mention alerts.</p>
                          </div>
                          <Button type="button" variant={emailNotif ? 'default' : 'outline'} className={emailNotif ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''} onClick={() => setEmailNotif(!emailNotif)}>
                            {emailNotif ? 'Enabled' : 'Disabled'}
                          </Button>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-medium">Dark Mode Appearance</p>
                            <p className="text-sm text-muted-foreground">Switch between light and dark themes.</p>
                          </div>
                          <Button type="button" variant="outline" onClick={toggleTheme}>Toggle Theme</Button>
                        </div>
                      </div>
                    </div>

                    {/* Security */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4 border-b border-border pb-2">Security</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-medium">Two-Factor Authentication (2FA)</p>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                          </div>
                          <Button type="button" variant={twoFA ? 'default' : 'outline'} className={twoFA ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''} onClick={() => setTwoFA(!twoFA)}>
                            {twoFA ? 'Enabled' : 'Enable'}
                          </Button>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-medium">Active Sessions</p>
                            <p className="text-sm text-muted-foreground">Manage devices currently logged into your account.</p>
                          </div>
                          <Button type="button" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">Log out all devices</Button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border flex justify-end">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8">Save Changes</Button>
                    </div>
                  </form>
                </Card>
              </div>
            ) : location.startsWith('/dashboard/inbox') ? (
              <div className="py-8 max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold" style={{ fontFamily: 'Geist' }}>Inbox</h2>
                    <p className="text-muted-foreground mt-2">Stay on top of mentions, task assignments, and team updates.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Mark all as read</Button>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <div className="divide-y divide-border">
                    {[
                      {
                        user: 'Alex Mercer',
                        action: 'assigned you to',
                        target: 'Optimize CI/CD Pipelines',
                        time: '10m ago',
                        avatar: 'AM',
                        unread: true,
                        content: 'I have set up the initial Docker config. Can you review the parallelization step?'
                      },
                      {
                        user: 'Sarah Chen',
                        action: 'mentioned you in',
                        target: 'Homepage Redesign',
                        time: '2h ago',
                        avatar: 'SC',
                        unread: true,
                        content: '@Olivia What do you think about the new hero image spacing?'
                      },
                      {
                        user: 'David Kim',
                        action: 'completed',
                        target: 'Microservices Migration Auth',
                        time: '5h ago',
                        avatar: 'DK',
                        unread: false,
                        content: 'Deployment successful. The auth service is now completely decoupled.'
                      },
                      {
                        user: 'Elena Rostova',
                        action: 'commented on',
                        target: 'Q3 Product Roadmap',
                        time: 'Yesterday',
                        avatar: 'ER',
                        unread: false,
                        content: 'We should push the AI integrations to Q4 and focus on core stability first.'
                      },
                      {
                        user: 'System',
                        action: 'integrated',
                        target: 'GitHub Repository',
                        time: '2 days ago',
                        avatar: 'SY',
                        unread: false,
                        content: "TaskFlow Pro has successfully connected to your organization's GitHub account."
                      }
                    ].map((msg, idx) => (
                      <div key={idx} className={`p-6 hover:bg-secondary/30 transition-colors flex gap-4 ${msg.unread ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${msg.user === 'System' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                            {msg.avatar}
                          </div>
                          {msg.unread && <div className="absolute top-0 right-0 w-3 h-3 bg-blue-600 border-2 border-white dark:border-slate-900 rounded-full"></div>}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <p className="text-sm">
                              <span className="font-bold">{msg.user}</span>{' '}
                              <span className="text-muted-foreground">{msg.action}</span>{' '}
                              <span className="font-medium text-foreground">{msg.target}</span>
                            </p>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{msg.time}</span>
                          </div>
                          <p className="text-sm text-foreground/80 mt-2 bg-background p-3 rounded-lg border border-border inline-block">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : location.startsWith('/dashboard/calendar') ? (
              <div className="py-8 max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold" style={{ fontFamily: 'Geist' }}>Calendar</h2>
                    <p className="text-muted-foreground mt-2">Manage your schedule and task deadlines.</p>
                  </div>
                  <Dialog open={addEventOpen} onOpenChange={setAddEventOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Add Event</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Calendar Event</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddEvent} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="event-title">Event Title</Label>
                          <Input id="event-title" name="title" required placeholder="e.g. Weekly Standup" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="event-time">Time</Label>
                          <Input id="event-time" name="time" required placeholder="e.g. 10:00 AM - 11:00 AM" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="event-type">Event Type</Label>
                          <Select name="type" defaultValue="Meeting" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Meeting">Meeting</SelectItem>
                              <SelectItem value="Call">Call</SelectItem>
                              <SelectItem value="Focus Time">Focus Time</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <DialogFooter className="mt-6">
                          <Button type="button" variant="outline" onClick={() => setAddEventOpen(false)}>Cancel</Button>
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save Event</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                      <h3 className="font-semibold text-xl mb-4">Upcoming Schedule</h3>
                      <div className="space-y-4">
                        {events.map((evt, i) => (
                          <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-1.5 h-12 rounded-full bg-blue-500"></div>
                              <div>
                                <p className="font-semibold">{evt.title}</p>
                                <p className="text-sm text-muted-foreground mt-1">{evt.time}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-background">{evt.type}</Badge>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                  <div className="flex flex-col gap-6">
                    <Card className="p-4 flex justify-center border-border shadow-sm">
                      <CalendarUI
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md"
                      />
                    </Card>
                  </div>
                </div>
              </div>
            ) : location.startsWith('/dashboard/reports') ? (
              <div className="py-8 max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold" style={{ fontFamily: 'Geist' }}>Analytics & Reports</h2>
                    <p className="text-muted-foreground mt-2">Track team velocity, project completion rates, and bottlenecks.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Export CSV</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Generate Report</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Task Velocity', value: '+24%', sub: 'vs last month' },
                    { label: 'Avg Resolution Time', value: '1.2 days', sub: '-0.4 days' },
                    { label: 'Sprint Completion', value: '94%', sub: '+2% vs target' },
                    { label: 'Open Blockers', value: '3', sub: 'Action required', alert: true }
                  ].map((stat, i) => (
                    <Card key={i} className={`p-6 border ${stat.alert ? 'border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10' : 'border-border'}`}>
                      <p className="text-sm text-muted-foreground mb-2 font-medium">{stat.label}</p>
                      <h3 className={`text-3xl font-bold mb-1 ${stat.alert ? 'text-red-600 dark:text-red-400' : ''}`}>{stat.value}</h3>
                      <p className={`text-xs ${stat.alert ? 'text-red-500' : 'text-emerald-500'}`}>{stat.sub}</p>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="p-6 border-border">
                    <h3 className="text-lg font-bold mb-6">Completion Rate (Last 7 Days)</h3>
                    <div className="h-64 flex items-end gap-2 pb-6 pt-4 border-b border-l pl-4 border-border/50">
                      {[45, 60, 30, 80, 55, 90, 70].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-t-sm relative group cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors" style={{ height: `${h}%` }}>
                          <div className="absolute bottom-0 w-full bg-blue-500 dark:bg-blue-400 rounded-t-sm" style={{ height: `${h * 0.7}%` }}></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground px-4">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </Card>
                  <Card className="p-6 border-border">
                    <h3 className="text-lg font-bold mb-6">Workload Distribution</h3>
                    <div className="space-y-6">
                      {[
                        { team: 'Engineering', perc: 45, color: 'bg-blue-500' },
                        { team: 'Design', perc: 25, color: 'bg-indigo-500' },
                        { team: 'Product', perc: 20, color: 'bg-violet-500' },
                        { team: 'Marketing', perc: 10, color: 'bg-cyan-500' }
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">{item.team}</span>
                            <span className="text-muted-foreground">{item.perc}%</span>
                          </div>
                          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.perc}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            ) : location.startsWith('/dashboard/teams') ? (
              <div className="py-8 max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold" style={{ fontFamily: 'Geist' }}>Team Directory</h2>
                    <p className="text-muted-foreground mt-2">Manage your organization members, roles, and permissions.</p>
                  </div>
                  <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Invite Team Member</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddMember} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="member-name">Full Name</Label>
                          <Input id="member-name" name="name" required placeholder="e.g. Jane Doe" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="member-email">Email Address</Label>
                          <Input id="member-email" name="email" type="email" required placeholder="e.g. jane@taskflow.inc" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="member-role">Role</Label>
                            <Select name="role" defaultValue="Viewer" required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Editor">Editor</SelectItem>
                                <SelectItem value="Viewer">Viewer</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="member-dept">Department</Label>
                            <Input id="member-dept" name="dept" required placeholder="e.g. Marketing" />
                          </div>
                        </div>
                        <DialogFooter className="mt-6">
                          <Button type="button" variant="outline" onClick={() => setAddMemberOpen(false)}>Cancel</Button>
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Send Invite</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-secondary/50 text-muted-foreground">
                        <tr>
                          <th className="font-medium p-4">Member</th>
                          <th className="font-medium p-4">Role</th>
                          <th className="font-medium p-4">Department</th>
                          <th className="font-medium p-4">Status</th>
                          <th className="font-medium p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {teamMembers.map((user, i) => (
                          <tr key={i} className="hover:bg-secondary/20 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-xs">
                                  {user.initial}
                                </div>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 font-medium">{user.role}</td>
                            <td className="p-4 text-muted-foreground">{user.dept}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2 text-xs">
                                <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : user.status === 'Away' ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}></span>
                                {user.status}
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <Button variant="ghost" size="sm" className="h-8">Edit</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold" style={{ fontFamily: 'Geist' }}>
                  Welcome back to TaskFlow Pro 👋
                </h1>
                <p className="text-foreground/60 mt-2">Here's what's happening with your tasks today.</p>
              </div>
              <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 w-fit">
                    <Plus className="w-5 h-5" />
                    New Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateTask} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Task Title</Label>
                      <Input id="title" name="title" required placeholder="e.g. Design homepage" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignee">Assignee</Label>
                      <Input id="assignee" name="assignee" required placeholder="e.g. John Doe" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input id="dueDate" name="dueDate" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select name="priority" defaultValue="medium" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter className="mt-6">
                      <Button type="button" variant="outline" onClick={() => setNewTaskOpen(false)}>Cancel</Button>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Create Task</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: CheckCheck,
                  label: 'Tasks Completed',
                  value: stats.completed,
                  total: stats.total,
                  color: 'text-green-600',
                  bgColor: 'bg-green-50 dark:bg-green-950/20'
                },
                {
                  icon: Clock,
                  label: 'In Progress',
                  value: stats.inProgress,
                  total: stats.total,
                  color: 'text-blue-600',
                  bgColor: 'bg-blue-50 dark:bg-blue-950/20'
                },
                {
                  icon: AlertCircle,
                  label: 'High Priority',
                  value: stats.highPriority,
                  total: stats.total,
                  color: 'text-red-600',
                  bgColor: 'bg-red-50 dark:bg-red-950/20'
                },
                {
                  icon: TrendingUp,
                  label: 'Completion Rate',
                  value: `${Math.round((stats.completed / stats.total) * 100)}%`,
                  color: 'text-purple-600',
                  bgColor: 'bg-purple-50 dark:bg-purple-950/20'
                },
              ].map((stat, index) => (
                <Card key={index} className={`p-6 hover:shadow-lg transition-all duration-300 ${stat.bgColor}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-foreground/60 mb-2">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      {stat.total && (
                        <p className="text-xs text-foreground/50 mt-2">of {stat.total} total</p>
                      )}
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Geist' }}>Weekly Progress</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="tasks" stroke="#0066FF" fillOpacity={1} fill="url(#colorTasks)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Geist' }}>Task Completion</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="completed" stroke="#00D9FF" strokeWidth={2} dot={{ fill: '#0066FF', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Tasks Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Geist' }}>Tasks</h2>
                <Tabs defaultValue="all" className="w-auto">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all" onClick={() => setSelectedStatus(null)}>All</TabsTrigger>
                    <TabsTrigger value="todo" onClick={() => setSelectedStatus('todo')}>To Do</TabsTrigger>
                    <TabsTrigger value="in-progress" onClick={() => setSelectedStatus('in-progress')}>In Progress</TabsTrigger>
                    <TabsTrigger value="review" onClick={() => setSelectedStatus('review')}>Review</TabsTrigger>
                    <TabsTrigger value="done" onClick={() => setSelectedStatus('done')}>Done</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Kanban Board */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
                {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                  <div key={status} className="space-y-3 min-w-full md:min-w-0">
                    <div className="flex items-center justify-between px-2">
                      <h3 className="font-semibold text-sm capitalize">
                        {status === 'in-progress' ? 'In Progress' : status}
                      </h3>
                      <Badge variant="secondary" className="text-xs">{statusTasks.length}</Badge>
                    </div>
                    <div className="space-y-2 min-h-96 bg-secondary/30 rounded-lg p-3">
                      {statusTasks.map((task) => (
                        <Card
                          key={task.id}
                          className="p-4 cursor-pointer hover:shadow-md transition-all duration-200 group border border-border hover:border-blue-400"
                          onClick={() => handleToggleTask(task.id)}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleTask(task.id);
                              }}
                              className="mt-1 flex-shrink-0"
                            >
                              {task.status === 'done' ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-border group-hover:border-blue-600 transition-colors" />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-medium text-sm ${task.status === 'done' ? 'line-through text-foreground/50' : ''}`}>
                                {task.title}
                              </h4>
                              <p className="text-xs text-foreground/60 mt-1">{task.assignee}</p>
                              <div className="flex items-center gap-2 mt-3 flex-wrap">
                                <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                                  {task.priority}
                                </Badge>
                                <span className="text-xs text-foreground/50">{task.dueDate}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert('Task options menu would open here');
                              }}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                      {statusTasks.length === 0 && (
                        <div className="flex items-center justify-center h-32 text-foreground/40">
                          <p className="text-sm">No tasks</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ fontFamily: 'Geist' }}>Recent Activity</h3>
                <Button variant="ghost" size="sm">View all</Button>
              </div>
              <div className="space-y-4">
                {[
                  { user: 'Emma Wilson', action: 'completed', task: 'Fix mobile responsiveness', time: '2 hours ago', avatar: 'EW' },
                  { user: 'David Kim', action: 'started', task: 'Setup CI/CD pipeline', time: '4 hours ago', avatar: 'DK' },
                  { user: 'Alex Martinez', action: 'commented on', task: 'Write API documentation', time: '6 hours ago', avatar: 'AM' },
                  { user: 'Sarah Chen', action: 'created', task: 'Design new landing page', time: '1 day ago', avatar: 'SC' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0 hover:bg-secondary/30 -mx-6 px-6 py-2 rounded transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-medium">{activity.task}</span>
                      </p>
                      <p className="text-xs text-foreground/60 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
