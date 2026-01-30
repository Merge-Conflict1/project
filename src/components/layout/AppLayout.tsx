import { ReactNode } from "react";
import TopHeader from "./TopHeader";
import BottomNav from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  showNav?: boolean;
}

const AppLayout = ({ 
  children, 
  title, 
  showHeader = true, 
  showNav = true 
}: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && <TopHeader title={title} />}
      <main className={`${showNav ? 'pb-24' : ''} ${showHeader ? '' : 'pt-0'}`}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
