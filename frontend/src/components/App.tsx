import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Header } from './Header';
import { ErrorAlert } from './ErrorAlert';
import { ModeSelector } from './ModeSelector';
import { SearchSection } from './SearchSection';
import { SearchResults } from './SearchResults';
import { SelectedVideos } from './SelectedVideos';
import { OrganizeButton } from './OrganizeButton';
import { PlaylistResult } from './PlaylistResult';
import { RuleValidator } from './RuleValidator';

export const App: React.FC = () => {
  const { mode, selectedVideos, playlist } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ErrorAlert />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* ステップ 1: モード選択 */}
        {!mode && <ModeSelector />}

        {/* ステップ 2: 動画検索 */}
        {mode && !playlist && (
          <>
            <SearchSection />
            <SearchResults />
            <SelectedVideos />
            {selectedVideos.length > 0 && <OrganizeButton />}
          </>
        )}

        {/* ステップ 3: 完成リスト表示 */}
        {playlist && (
          <>
            <RuleValidator playlist={playlist} />
            <PlaylistResult playlist={playlist} />
          </>
        )}
      </main>
    </div>
  );
};
