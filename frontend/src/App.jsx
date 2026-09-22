import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import RepoHeader from './components/layout/RepoHeader';
import RepoNav from './components/layout/RepoNav';
import Footer from './components/layout/Footer';
import AuthModal from './components/auth/AuthModal';
import TerminalCommitModal from './components/terminal/TerminalCommitModal';
import InteractiveCliDrawer from './components/terminal/InteractiveCliDrawer';
import OverviewTab from './components/overview/OverviewTab';
import RoadmapView from './components/roadmap/RoadmapView';
import CommitList from './components/commits/CommitList';
import ContributionHeatmap from './components/heatmap/ContributionHeatmap';
import DsaSheetView from './components/dsa/DsaSheetView';
import CodeDiffInspector from './components/diff/CodeDiffInspector';
import ResourceHubView from './components/resources/ResourceHubView';
import ReadmeProfileView from './components/readme/ReadmeProfileView';

function MainLayout() {
  const { isAuthenticated, loading } = useAuth();
  const { activeTab, setActiveTab, cliOpen, setCliOpen } = useApp();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070a12] flex items-center justify-center font-mono text-cyan-400 text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span>Initializing commit:// telemetry engine...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthModal />;
  }

  return (
    <div className="min-h-screen bg-[#070a12] flex flex-col justify-between text-slate-200">
      
      {/* Top Header & Repo Navigation */}
      <div>
        <RepoHeader />
        <RepoNav />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'roadmap' && <RoadmapView />}
          {activeTab === 'commits' && <CommitList />}
          {activeTab === 'heatmap' && (
            <div className="space-y-6">
              <ContributionHeatmap onSelectDate={() => setActiveTab('commits')} />
              <CommitList />
            </div>
          )}
          {activeTab === 'dsa' && <DsaSheetView />}
          {activeTab === 'diff' && <CodeDiffInspector />}
          {activeTab === 'resources' && <ResourceHubView />}
          {activeTab === 'readme' && <ReadmeProfileView />}
        </main>
      </div>

      {/* Interactive CLI Drawer, Terminal Commit Modal & Status Footer */}
      <div>
        <InteractiveCliDrawer isOpen={cliOpen} onClose={() => setCliOpen(false)} />
        <TerminalCommitModal />
        <Footer />
      </div>

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <MainLayout />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
