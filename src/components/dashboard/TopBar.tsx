import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Search, Settings, LogOut, Menu, FileText, DollarSign, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface TopBarProps {
  onToggleSidebar?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Mobile menu toggle and search */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={onToggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Mobile search dropdown */}
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80">
                  <div className="p-3">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search for ..."
                        className="bg-muted border-0 rounded px-3 py-2 text-sm w-full outline-none"
                      />
                      <Button size="sm">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Right side - Notifications and user menu */}
          <div className="flex items-center space-x-1">
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3+
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="text-center text-sm">Alerts Center</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <div className="max-h-80 overflow-y-auto">
                  <DropdownMenuItem className="p-0">
                    <div className="flex items-center w-full p-3 hover:bg-muted">
                      <div className="mr-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-muted-foreground">December 12, 2019</span>
                        <p className="text-sm">A new monthly report is ready to download!</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="p-0">
                    <div className="flex items-center w-full p-3 hover:bg-muted">
                      <div className="mr-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-muted-foreground">December 7, 2019</span>
                        <p className="text-sm">$290.29 has been deposited into your account!</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="p-0">
                    <div className="flex items-center w-full p-3 hover:bg-muted">
                      <div className="mr-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-muted-foreground">December 2, 2019</span>
                        <p className="text-sm">Spending Alert: We've noticed unusually high spending for your account.</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
                  Show All Alerts
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Divider */}
            <div className="hidden sm:block h-6 w-px bg-border mx-2"></div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-2 h-auto py-2">
                  <span className="hidden lg:inline text-sm text-muted-foreground">{user?.name}</span>
                  <Avatar className="h-8 w-8 rounded-full border">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-xs">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4 text-muted-foreground" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};