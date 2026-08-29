# B&ZAI Playlist Maker

🎵 YouTube動画から最適なプレイリストを自動編成するツール

## 機能

- YouTube動画の自動分類
- 2つのモード（全員用/プレミアム用）でのプレイリスト編成
- 自動検証（時間制限、バンチューブ数制限等）
- JSON/CSV形式でのエクスポート

## セットアップ

詳細は [README.md](./README.md) をご覧ください。

## 開発サーバー起動

```bash
# ターミナル1: バックエンド
cd backend
npm install
npm run dev

# ターミナル2: フロントエンド
cd frontend
npm install
npm run dev
```

## プロジェクト構成

- **backend/**: Express + Node.js バックエンド
- **frontend/**: React + Vite フロントエンド
