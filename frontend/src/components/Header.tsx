import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 px-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🎧 B&ZAI 再生リストメーカー</h1>
        <p className="text-lg opacity-90">
          動画を選ぶだけで、ルールに沿った再生リストを自動編成
        </p>
      </div>
    </header>
  );
};
