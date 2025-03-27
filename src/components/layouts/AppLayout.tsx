import React from "react";
import NavbarApp from "@/components/common/NavbarApp"; 
import BottomBar from "@/components/common/BottomBar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div>
      <header className="container mx-auto">
        <NavbarApp />
      </header>
      {children}
      <footer>
        <BottomBar />
      </footer>
    </div>
  );
};

export default AppLayout;