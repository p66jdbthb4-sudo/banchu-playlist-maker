# B&ZAI Playlist Maker

🎵 YouTube動画から最適なプレイリストを自動編成するツール

## 📋 プロジェクト概要

B&ZAI Playlist Makerは、YouTubeの動画を自動分類し、以下の2つのモードでプレイリストを編成します：

### モード説明

**全員用モード（Everyone Mode）**
- MV/音楽動画を最初に配置
- その後、バンチューブと通常動画を交互に配置
- 時間がない視聴者向け

**プレミアム用モード（Premium Mode）**
- バンチューブ間にMVと通常動画を挿入
- より充実した視聴体験を提供
- ファン向けの長時間視聴に適切

## ✨ 機能

- 🔍 **動的検索**: YouTube検索APIを使用した動画検索
- 🤖 **自動分類**: タイトルと時間で動画タイプを自動判定
  - バンチューブ
  - MV/音楽
  - 通常動画
  - Shorts
  - 短編（60秒以下）
- ✅ **自動検証**: ルールに基づいたプレイリスト検証
  - 合計時間3時間以内
  - バンチューブ最大6本
  - バンチューブ間隔5分以上
- 📥 **エクスポート**: JSON/CSV形式でダウンロード

## 🚀 セットアップ

### 環境要件

- Node.js 18.0 以上
- npm または yarn

### インストール

```bash
# リポジトリクローン
git clone https://github.com/p66jdbthb4-sudo/banchu-playlist-maker.git
cd banchu-playlist-maker

# バックエンド
cd backend
npm install
cp .env.example .env

# フロントエンド
cd ../frontend
npm install
```

## 🏃 実行方法

### 開発環境での起動

**ターミナル1: バックエンド**
```bash
cd backend
npm run dev
# http://localhost:5000 で起動
```

**ターミナル2: フロントエンド**
```bash
cd frontend
npm run dev
# http://localhost:5173 で起動
```

### 本番環境でのビルド

```bash
# バックエンド
cd backend
npm run build
npm start

# フロントエンド
cd frontend
npm run build
npm run preview
```

## 📁 プロジェクト構成

```
banchu-playlist-maker/
├── backend/
│   ├── src/
│   │   ├── server.ts          # Express サーバー
│   │   ├── routes/
│   │   │   ├── search.ts      # YouTube検索エンドポイント
│   │   │   └── organize.ts    # プレイリスト編成エンドポイント
│   │   ├── utils/
│   │   │   ├── youtube.ts     # YouTube検索処理
│   │   │   ├── detector.ts    # 動画タイプ判定ロジック
│   │   │   └── organizer.ts   # プレイリスト編成ロジック
│   │   └── types/
│   │       └── index.ts       # TypeScript型定義
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── main.tsx           # エントリーポイント
    │   ├── App.tsx            # メインアプリケーション
    │   ├── components/
    │   │   ├── SearchForm.tsx      # 検索フォーム
    │   │   ├── VideoList.tsx       # 動画リスト
    │   │   └── PlaylistViewer.tsx  # プレイリスト表示
    │   ├── api/
    │   │   └── client.ts      # API クライアント
    │   ├── types/
    │   │   └── index.ts       # TypeScript型定義
    │   └── index.css          # Tailwind CSS
    ├── index.html
    ├── vite.config.ts
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── .gitignore
```

## 🔌 API エンドポイント

### 検索

```bash
GET /api/search?q=keyword
```

**レスポンス例**
```json
{
  "success": true,
  "data": [
    {
      "id": "video_id",
      "title": "動画タイトル",
      "channelName": "チャンネル名",
      "duration": 300,
      "videoType": "normal"
    }
  ]
}
```

### プレイリスト編成

```bash
POST /api/organize
Content-Type: application/json

{
  "videos": [...],
  "mode": "everyone"
}
```

**レスポンス例**
```json
{
  "success": true,
  "data": {
    "videos": [...],
    "mode": "everyone",
    "validation": {
      "isValid": true,
      "totalDuration": 7200,
      "banchubeCount": 3,
      "errors": [],
      "warnings": []
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🎯 検証ルール

| ルール | 説明 | 制限値 |
|--------|------|--------|
| 合計時間 | プレイリスト全体の再生時間 | 最大3時間 |
| バンチューブ数 | バンチューブ動画の本数 | 最大6本 |
| バンチューブ間隔 | バンチューブ同士の間隔 | 最小5分 |

## 🛠️ 技術スタック

### バックエンド
- Node.js + Express
- TypeScript
- youtube-sr（YouTube検索ライブラリ）

### フロントエンド
- React 18
- TypeScript
- Vite
- Tailwind CSS

## 📝 ライセンス

MIT License

## 👤 作成者

p66jdbthb4-sudo

## 📧 お問い合わせ

バグ報告や機能リクエストは、GitHubのIssuesで報告してください。
