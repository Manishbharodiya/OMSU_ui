'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Sun,
  PlusCircle,
  FilePlus,
  BarChart3,
} from 'lucide-react';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Admin',
    href: '/admin',
    icon: BarChart3,
  },
  {
    name: 'Leads Management',
    href: '/leads',
    icon: Users,
  },
  {
    name: 'Consumer Surveys',
    href: '/surveys',
    icon: ClipboardList,
  },
];

const quickActions = [
  {
    name: 'Capture Lead',
    href: '/leads/new',
    icon: PlusCircle,
  },
  {
    name: 'Start Survey',
    href: '/surveys/new',
    icon: FilePlus,
  },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-secondary text-sidebar-foreground border-r border-sidebar-border w-64 transition-all duration-300',
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-sidebar-border bg-slate-950/40">
        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/20">
          <Sun className="h-6 w-6 stroke-[2.5] animate-spin-slow" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-none text-white tracking-wide">
            OMSU
          </h1>
          <span className="text-[10px] text-primary font-semibold tracking-wider uppercase">
            Solar Lead App
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 space-y-7 overflow-y-auto px-4">
        <div>
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Core Modules
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/15'
                      : 'text-slate-300 hover:bg-sidebar-accent hover:text-white'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105',
                      isActive
                        ? 'text-primary-foreground'
                        : 'text-slate-400 group-hover:text-primary'
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Quick Actions
          </p>
          <nav className="space-y-1">
            {quickActions.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/15'
                      : 'text-slate-300 hover:bg-sidebar-accent hover:text-white'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105',
                      isActive
                        ? 'text-primary-foreground'
                        : 'text-slate-400 group-hover:text-primary'
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-sidebar-border bg-slate-950/20">
        <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg">
          <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-primary font-bold text-sm border border-slate-700">
            MB
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">
              Manish Bharodiya
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              Field Executive
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
