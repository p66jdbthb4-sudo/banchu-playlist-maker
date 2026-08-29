import React, { createContext, useContext, useState, useCallback } from 'react';
import { Video, Mode, Playlist, AppState } from '../types';

interface AppContextType extends AppState {
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Video[]) => void;
  setMode: (mode: Mode) => void;
  addSelectedVideo: (video: Video) => void;
  removeSelectedVideo: (videoId: string) => void;
  updateVideoType: (videoId: string, type: string) => void;
  setPlaylist: (playlist: Playlist | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsSearching: (searching: boolean) => void;
  setIsOrganizing: (organizing: boolean) => void;
  clearAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    searchQuery: '',
    searchResults: [],
    selectedVideos: [],
    mode: null,
    playlist: null,
    isLoading: false,
    error: null,
    isSearching: false,
    isOrganizing: false,
  });

  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  }, []);

  const setSearchResults = useCallback((results: Video[]) => {
    setState(prev => ({ ...prev, searchResults: results }));
  }, []);

  const setMode = useCallback((mode: Mode) => {
    setState(prev => ({ ...prev, mode }));
  }, []);

  const addSelectedVideo = useCallback((video: Video) => {
    setState(prev => ({
      ...prev,
      selectedVideos: [
        ...prev.selectedVideos,
        { ...video, videoType: 'normal' }, // デフォルトは「通常動画」
      ],
    }));
  }, []);

  const removeSelectedVideo = useCallback((videoId: string) => {
    setState(prev => ({
      ...prev,
      selectedVideos: prev.selectedVideos.filter(v => v.id !== videoId),
    }));
  }, []);

  const updateVideoType = useCallback((videoId: string, type: string) => {
    setState(prev => ({
      ...prev,
      selectedVideos: prev.selectedVideos.map(v =>
        v.id === videoId ? { ...v, videoType: type as any } : v
      ),
    }));
  }, []);

  const setPlaylist = useCallback((playlist: Playlist | null) => {
    setState(prev => ({ ...prev, playlist }));
  }, []);

  const setIsLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setIsSearching = useCallback((searching: boolean) => {
    setState(prev => ({ ...prev, isSearching: searching }));
  }, []);

  const setIsOrganizing = useCallback((organizing: boolean) => {
    setState(prev => ({ ...prev, isOrganizing: organizing }));
  }, []);

  const clearAll = useCallback(() => {
    setState({
      searchQuery: '',
      searchResults: [],
      selectedVideos: [],
      mode: null,
      playlist: null,
      isLoading: false,
      error: null,
      isSearching: false,
      isOrganizing: false,
    });
  }, []);

  const value: AppContextType = {
    ...state,
    setSearchQuery,
    setSearchResults,
    setMode,
    addSelectedVideo,
    removeSelectedVideo,
    updateVideoType,
    setPlaylist,
    setIsLoading,
    setError,
    setIsSearching,
    setIsOrganizing,
    clearAll,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
