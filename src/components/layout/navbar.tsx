'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Bell, RefreshCw, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { Sidebar } from './sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const pathname = usePathname();
  const [isSynced, setIsSynced] = useState(true);

  // Helper to format path into a user-friendly page title
  const getPageTitle = () => {
    if (pathname === '/' || pathname === '/dashboard') return 'Field Dashboard';
    if (pathname === '/admin') return 'Admin Dashboard';
    if (pathname.startsWith('/leads/new')) return 'Capture New Solar Lead';
    if (pathname.startsWith('/leads/upload-bill')) return 'Upload Electricity Bill';
    if (pathname.startsWith('/leads/review')) return 'Review Lead Details';
    if (pathname.startsWith('/leads/location')) return 'Lead Location';
    if (pathname.startsWith('/leads')) return 'Leads Directory';
    if (pathname.startsWith('/surveys/new')) return 'Conduct Consumer Survey';
    if (pathname.startsWith('/surveys')) return 'Surveys History';
    return 'Solar Lead App';
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-border shadow-sm">
      {/* Mobile Drawer (Visible on Mobile only) */}
      <div className="flex items-center gap-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-700">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-secondary text-sidebar-foreground border-none">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <Sidebar className="border-r-0" />
          </SheetContent>
        </Sheet>
        <span className="font-bold text-lg text-slate-800 tracking-tight">OMSU</span>
      </div>

      {/* Desktop Title */}
      <div className="hidden md:block">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">{getPageTitle()}</h2>
        <p className="text-[11px] text-slate-500">Solar Lead Management & Consumer Survey</p>
      </div>

      {/* Right Navbar Controls */}
      <div className="flex items-center gap-3">
        {/* Offline Sync Status Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 text-[11px] font-medium border border-slate-200">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-slate-600">Online & Synced</span>
        </div>

        {/* Sync Trigger button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-600 hover:text-primary transition-colors"
          onClick={() => {
            setIsSynced(false);
            setTimeout(() => setIsSynced(true), 1200);
          }}
        >
          <RefreshCw className={`h-4 w-4 ${!isSynced ? 'animate-spin' : ''}`} />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-slate-600 hover:text-slate-900 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Survey Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
              <div className="flex justify-between w-full">
                <span className="font-semibold text-xs text-slate-800">New Survey Scheduled</span>
                <span className="text-[10px] text-slate-400">10m ago</span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                A survey has been assigned for Row House 12, Green Meadows, Pune (Meera Deshmukh).
              </p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
              <div className="flex justify-between w-full">
                <span className="font-semibold text-xs text-slate-800">Lead Converted successfully</span>
                <span className="text-[10px] text-slate-400">2h ago</span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                Lead L-104 (Sunita Gupta) converted! Array structures approved for 12 kW solar system.
              </p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 hover:bg-slate-50 border border-slate-200/50 rounded-lg"
            >
              <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                RV
              </div>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Field Attendance</DropdownMenuItem>
            <DropdownMenuItem>Offline Sync Cache</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive font-medium">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
