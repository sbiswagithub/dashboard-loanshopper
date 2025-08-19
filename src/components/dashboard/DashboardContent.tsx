import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import DocumentsPage from '@/components/documents/DocumentsPage';
import { ProfilePage } from '../profile/ProfilePage';

interface DashboardContentProps {
  activeItem: string;
}

const stats = [
  {
    title: "Total Users",
    value: "2,345",
    description: "+20.1% from last month",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Revenue",
    value: "$45,231.89",
    description: "+30.5% from last month", 
    icon: DollarSign,
    color: "text-green-600"
  },
  {
    title: "Growth Rate",
    value: "12.5%",
    description: "+2.5% from last month",
    icon: TrendingUp,
    color: "text-purple-600"
  },
  {
    title: "Active Sessions",
    value: "573",
    description: "+201 since last hour",
    icon: Activity,
    color: "text-orange-600"
  }
];

export const DashboardContent: React.FC<DashboardContentProps> = ({ activeItem }) => {
  const { user } = useAuth();

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return (
          <div>
             {/* <h2>Dashboard</h2> */}
          </div>
        );
      
      case 'documents':
        return <DocumentsPage />;

        case 'profile':
          return <ProfilePage/>
      
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <h2 className="text-2xl font-bold mb-2">
              {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
            </h2>
            <p className="text-muted-foreground">
              This section is under development. Stay tuned for updates!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {renderContent()}
    </div>
  );
};