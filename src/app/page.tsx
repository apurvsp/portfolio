"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import MobileTopbar from "@/components/MobileTopbar";
import HomeView from "@/components/views/HomeView";
import VenturesView from "@/components/views/VenturesView";
import ProjectsView from "@/components/views/ProjectsView";
import WritingView from "@/components/views/WritingView";
import NowView from "@/components/views/NowView";
import ConnectView from "@/components/views/ConnectView";
import { View } from "@/types";

export default function Home() {
  const [activeView, setActiveView] = useState<View>("home");

  const viewMap: Record<View, React.ReactNode> = {
    home: <HomeView setActiveView={setActiveView} />,
    ventures: <VenturesView />,
    projects: <ProjectsView />,
    writing: <WritingView />,
    now: <NowView />,
    connect: <ConnectView />,
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <MobileTopbar activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 md:ml-[200px] min-h-screen">
        <div className="pt-[52px] md:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {viewMap[activeView]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
