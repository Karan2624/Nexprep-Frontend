export const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
};

export const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.getDate() === now.getDate() && 
                  date.getMonth() === now.getMonth() && 
                  date.getFullYear() === now.getFullYear();
  
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.getDate() === yesterday.getDate() && 
                      date.getMonth() === yesterday.getMonth() && 
                      date.getFullYear() === yesterday.getFullYear();

  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isToday) return timeStr;
  if (isYesterday) return `Yesterday, ${timeStr}`;

  const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  return `${dateStr}, ${timeStr}`;
};

export const getGroupUI = (name = "Study Group") => {
  const colors = ['bg-rose-500', 'bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-amber-500'];
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const color = colors[name.length % colors.length];
  return { initials, color };
};

export const chatPatternStyle = {
  backgroundColor: '#F8FAFC',
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2394a3b8' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='4' cy='4' r='2'/%3E%3Ccircle cx='16' cy='16' r='2'/%3E%3C/g%3E%3C/svg%3E")`
};