# eto works 公式サイト

[https://eto-works.com/](https://eto-works.com/) 用の静的サイトです。BEYOND: Quiet Ascent、ADRIFT、kotoVim、kotopoの製品ページを含みます。HTML、CSS、画像と操作ガイド用のJavaScriptで構成し、ビルド工程はありません。

公開リポジトリに置く資料は [AGENTS.md](AGENTS.md) を参照してください。担当者向け手順は [非公開のサイト引き継ぎ](https://github.com/eto-h/eto-works-development-guide/blob/main/ETO_WORKS_SITE_HANDOFF.md) にあり、閲覧にはGitHubのアクセス権が必要です。

| 対象 | ファイル／公開先 |
|---|---|
| 共通トップ | `index.html` → `/` |
| BEYOND | `beyond/index.html` → `/beyond/`、ルートの `support.html`、`privacy.html`、`licenses.html` |
| ADRIFT | `adrift/index.html`、`support.html`、`privacy.html`、`licenses.html` → `/adrift/` 以下 |
| kotoVim | `kotovim/index.html`、`en.html`、`support.html`、`privacy.html`、`licenses.html` → `/kotovim/` 以下 |
| kotopo | 紹介・操作ガイド・プライバシー・ライセンス → `/kotopo/` 以下 |
| 共通スタイル | `site.css`、トップ一覧用 `games.css` |
| ADRIFTスタイル | `adrift/adrift.css` |
| 共通の広告販売者情報 | `/app-ads.txt` |
| 公開設定 | `CNAME`（eto-works.com）、`.nojekyll` |

公開サイトは、このリポジトリの `main` からGitHub Pagesで配信しています。
