import { Playlist } from '../types';

interface PlaylistViewerProps {
  playlist: Playlist;
}

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}時間${minutes}分${secs}秒`;
  }
  return `${minutes}分${secs}秒`;
};

const getModeLabel = (mode: string): string => {
  return mode === 'everyone' ? '全員用' : 'プレミアム用';
};

const getVideoTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    banchube: 'bg-red-100 text-red-800',
    mv: 'bg-purple-100 text-purple-800',
    normal: 'bg-blue-100 text-blue-800',
    shorts: 'bg-yellow-100 text-yellow-800',
    short: 'bg-orange-100 text-orange-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

const getVideoTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    banchube: 'バンチューブ',
    mv: 'MV/♪',
    normal: '通常動画',
    shorts: 'Shorts',
    short: '短編',
  };
  return labels[type] || type;
};

export const PlaylistViewer = ({ playlist }: PlaylistViewerProps) => {
  const { videos, validation, mode } = playlist;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
        <h2 className="text-3xl font-bold mb-2">プレイリスト編成完了</h2>
        <p className="text-blue-100 mb-4">{getModeLabel(mode)}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-blue-100">合計時間</p>
            <p className="text-2xl font-bold">{formatDuration(validation.totalDuration)}</p>
          </div>
          <div>
            <p className="text-sm text-blue-100">バンチューブ数</p>
            <p className="text-2xl font-bold">{validation.banchubeCount}本</p>
          </div>
        </div>
      </div>

      {/* バリデーション */}
      {!validation.isValid && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-red-900 mb-2">⚠️ エラー</h3>
          {validation.errors.map((error, i) => (
            <p key={i} className="text-sm text-red-800 mb-1">
              • {error.message}
            </p>
          ))}
        </div>
      )}

      {validation.warnings && validation.warnings.length > 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-900 mb-2">ℹ️ 注意</h3>
          {validation.warnings.map((warning, i) => (
            <p key={i} className="text-sm text-yellow-800 mb-1">
              • {warning}
            </p>
          ))}
        </div>
      )}

      {validation.isValid && (!validation.warnings || validation.warnings.length === 0) && (
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-semibold">✅ 全てのルールを満たしています！</p>
        </div>
      )}

      {/* プレイリスト */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900">プレイリスト（{videos.length}本）</h3>
        <div className="space-y-3">
          {videos.map((video) => (
            <div key={video.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-blue-600 w-8">{video.order}</span>
                    <span className={`text-xs px-2 py-1 rounded ${getVideoTypeColor(video.videoType)}`}>
                      {getVideoTypeLabel(video.videoType)}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900">{video.title}</p>
                  <p className="text-sm text-gray-600">{video.channelName}</p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                  {Math.floor(video.duration / 60)}分
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* エクスポートボタン */}
      <div className="mt-6 flex gap-4 justify-center">
        <button
          onClick={() => {
            const json = JSON.stringify(playlist, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `playlist-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          JSON形式でダウンロード
        </button>
        <button
          onClick={() => {
            const csv = [
              ['順番', 'タイトル', 'チャンネル', 'タイプ', '時間(分)'].join(','),
              ...videos.map((v) =>
                [
                  v.order,
                  `"${v.title.replace(/"/g, '""')}"`,
                  `"${v.channelName}"`,
                  getVideoTypeLabel(v.videoType),
                  Math.floor(v.duration / 60),
                ].join(','),
              ),
            ].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `playlist-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
          }}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          CSV形式でダウンロード
        </button>
      </div>
    </div>
  );
};
