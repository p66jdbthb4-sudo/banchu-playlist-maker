import React from 'react';
import { Playlist } from '../types';
import { formatDurationJapanese } from '../utils/formatter';
import { MAX_PLAYLIST_DURATION } from '../utils/constants';

interface RuleValidatorProps {
  playlist: Playlist;
}

export const RuleValidator: React.FC<RuleValidatorProps> = ({ playlist }) => {
  const { validation, mode } = playlist;
  const maxDurationDisplay = formatDurationJapanese(MAX_PLAYLIST_DURATION);

  return (
    <div className="bg-white p-4 shadow mb-4">
      <h2 className="text-lg font-semibold mb-4">✅ ルール検証</h2>

      {/* 基本情報 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded">
          <p className="text-xs text-gray-600 mb-1">合計時間</p>
          <p className="text-lg font-bold text-blue-600">
            {formatDurationJapanese(validation.totalDuration)}
          </p>
          <p className="text-xs text-gray-500 mt-1">（上限：{maxDurationDisplay}）</p>
        </div>
        <div className="bg-purple-50 p-3 rounded">
          <p className="text-xs text-gray-600 mb-1">バンチューブ本数</p>
          <p className="text-lg font-bold text-purple-600">
            {validation.banchubeCount}本
          </p>
          <p className="text-xs text-gray-500 mt-1">（上限：6本）</p>
        </div>
      </div>

      {/* モード情報 */}
      <div className="mb-4 p-3 bg-gray-50 rounded">
        <p className="text-sm font-semibold mb-2">
          📌 {mode === 'premium' ? 'プレミアム用' : '全員用'}ルール
        </p>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>✓ 3時間以内</li>
          <li>✓ バンチューブ最大6本</li>
          <li>✓ バンチューブ間隔305秒以上</li>
          {mode === 'premium' && (
            <>
              <li>✓ MV/♪をバンチューブ間に配置可能</li>
            </>
          )}
          {mode === 'everyone' && (
            <>
              <li>✓ MV/♪は最初に配置</li>
              <li>✓ MV/♪はバンチューブ間に配置不可</li>
            </>
          )}
        </ul>
      </div>

      {/* ルール検証結果 */}
      {validation.isValid ? (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-lg font-bold text-green-700">✨ すべてのルールを満たしています！</p>
        </div>
      ) : (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="font-bold text-red-700 mb-3">⚠️ ルール違反があります</p>
          <ul className="space-y-2">
            {validation.errors.map((error, idx) => (
              <li key={idx} className="text-sm text-red-600">
                • {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 警告メッセージ */}
      {validation.warnings && validation.warnings.length > 0 && (
        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p className="font-bold text-yellow-700 mb-2">📢 注意事項</p>
          <ul className="space-y-1">
            {validation.warnings.map((warning, idx) => (
              <li key={idx} className="text-sm text-yellow-700">
                • {warning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
