# 🎧 B&ZAI YouTube 再生リストメーカー

YouTube上のB&ZAI関連動画をキーワード検索し、ユーザーが動画を選択すると、指定したルールに従って再生リストの順番を自動で編成できるWebアプリです。

## 📋 プロジェクト概要

### 機能
- YouTube検索（B&ZAI関連動画）
- 動画の手動選択
- 動画の分類（バンチューブ、MV、通常など）
- ルール基づく自動編成
- ルール検証
- URL一覧のコピー出力

### 特徴
- モバイルファースト UI（スマートフォン・タブレット対応）
- 初心者向けのシンプルな構成
- バンチューブ間隔の秒単位での正確な計算
- 2つのモード（プレミアム用/全員用）

## 🛠️ 技術スタック

### フロントエンド
- **React 18** + TypeScript
- **Tailwind CSS** - レスポンシブデザイン
- **Vite** - ビルドツール
- **React Context API** - 状態管理

### バックエンド
- **Node.js** + Express
- **YouTube Data API v3** - YouTube検索
- **TypeScript** - 型安全
- **dotenv** - 環境変数管理

## 📁 プロジェクト構成

```
banchu-playlist-maker/
├── frontend/                    # React アプリ
│   ├── src/
│   │   ├── components/         # React コンポーネント
│   │   ├── types/              # TypeScript 型定義
│   │   ├── utils/              # ユーティリティ関数
│   │   ├── context/            # Context API
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                     # Express サーバー
│   ├── src/
│   │   ├── routes/             # API ルート
│   │   ├── services/           # ビジネスロジック
│   │   ├── types/              # TypeScript 型定義
│   │   ├── utils/              # ユーティリティ関数
│   │   └── app.ts
│   ├── .env.example            # 環境変数テンプレート
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                    # このファイル
```

## 🚀 セットアップ手順

### 前提条件
- Node.js v18以上
- npm v9以上
- YouTube Data API キー（Google Cloud Console から取得）

### インストール

#### 1. リポジトリをクローン
```bash
git clone https://github.com/p66jdbthb4-sudo/banchu-playlist-maker.git
cd banchu-playlist-maker
```

#### 2. フロントエンドセットアップ
```bash
cd frontend
npm install
npm run dev
# http://localhost:5173 でアクセス可能
```

#### 3. バックエンドセットアップ
```bash
cd ../backend
npm install

# .env ファイルを作成
cp .env.example .env

# .env に YouTube API キーを設定
# YOUTUBE_API_KEY=AIzaSy...

npm run dev
# http://localhost:5000 で起動
```

## 📱 使い方

1. **モード選択** - 「プレミアム用」または「全員用」を選択
2. **YouTube検索** - "バンチューブ"などのキーワードで検索
3. **動画選択** - 検索結果から「追加」ボタンで動画を選択
4. **動画分類** - 各動画の「動画タイプ」を設定（バンチューブ、MV など）
5. **自動編成** - 「✨ ルールに沿って自動編成」ボタンをクリック
6. **ルール検証** - 完成リストのルール違反をチェック
7. **URL出力** - 動画URLをコピー

## 📋 ルール仕様

### プレミアム用ルール
- 1つの再生リストは **3時間以内**
- バンチューブは **最大6本**
- バンチューブ間は、間にある動画の合計時間が **305秒以上**
- MV / ♪動画をバンチューブ間に配置してもよい
- 最初と最後には短めの動画を優先
- Shortsは対象外

### 全員用ルール
- 1つの再生リストは **3時間以内**
- バンチューブは **最大6本**
- バンチューブ間は、間にある動画の合計時間が **305秒以上**
- MV / ♪動画は基本的に最初に配置
- バンチューブ間にはMV / ♪動画を配置しない
- 最初と最後には短めの動画を優先
- Shortsは対象外

### 📌 間隔の定義
「バンチューブ間隔 305秒以上」の意味：

```
バンチューブ
↓
2:10の動画 (130秒)
↓
1:47の動画 (107秒)
↓
1:18の動画 (78秒)
↓
バンチューブ

合計: 130 + 107 + 78 = 315秒 ✅ OK （305秒以上）
```

## 🔐 環境変数

### バックエンド（.env）
```bash
# YouTube API キー（必須）
YOUTUBE_API_KEY=AIzaSy...

# サーバー設定
BACKEND_PORT=5000

# フロントエンドURL
FRONTEND_URL=http://localhost:3000
```

**⚠️ 重要**: `.env` ファイルは `.gitignore` に追加してください。APIキーは絶対に共有しないでください。

## 📚 開発コマンド

### フロントエンド
```bash
cd frontend

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

### バックエンド
```bash
cd backend

# 開発サーバー起動（自動リロード）
npm run dev

# ビルド
npm run build

# 本番環境で実行
npm run start
```

## 🎯 実装フェーズ

- [x] **Phase 1** - プロジェクト初期化
- [x] **Phase 2** - UI構築（フロントエンド）
- [x] **Phase 3** - バックエンド基本設定
- [x] **Phase 4** - API連携（YouTube検索）
- [x] **Phase 5** - 自動編成アルゴリズム
- [x] **Phase 6** - ルール検証 + 完成

## 📞 サポート

問題が発生した場合は、GitHubのIssueを作成してください。

## 📄 ライセンス

MIT License

---

**作成日**: 2026年8月29日
**バージョン**: 0.1.0（初期実装）
