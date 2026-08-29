#!/bin/bash

# B&ZAI Playlist Maker - 開発環境セットアップスクリプト

echo "🎵 B&ZAI Playlist Maker セットアップを開始します"

# Node.jsバージョンチェック
if ! command -v node &> /dev/null; then
    echo "❌ Node.jsがインストールされていません"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION が見つかりました"

# バックエンドセットアップ
echo ""
echo "📦 バックエンドをセットアップ中..."
cd backend
if [ -f .env.example ] && [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ .env ファイルを作成しました"
fi
npm install
echo "✅ バックエンド セットアップ完了"

# フロントエンドセットアップ
echo ""
echo "📦 フロントエンドをセットアップ中..."
cd ../frontend
npm install
echo "✅ フロントエンド セットアップ完了"

echo ""
echo "✨ セットアップが完了しました！"
echo ""
echo "🚀 開発サーバーを起動するには、2つのターミナルで以下を実行してください："
echo ""
echo "ターミナル1 (バックエンド):"
echo "  cd backend && npm run dev"
echo ""
echo "ターミナル2 (フロントエンド):"
echo "  cd frontend && npm run dev"
echo ""
echo "ブラウザで http://localhost:5173 を開いてください"
