import { create } from 'zustand';

type WorkspaceMode = 'client' | 'provider';

interface WorkspaceState {
  mode: WorkspaceMode;
  setMode: (mode: WorkspaceMode) => void;
  toggleMode: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  mode: 'client',
  setMode: (mode) => set({ mode }),
  toggleMode: () => set((state) => ({ mode: state.mode === 'client' ? 'provider' : 'client' })),
}));
