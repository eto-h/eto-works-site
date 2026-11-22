# eto works 公式サイト

[https://eto-works.com/](https://eto-works.com/) を配信する、HTML/CSSと画像だけの静的サイトです。現在はBEYOND: Quiet AscentとADRIFTを掲載しています。Node.js、Unity、EAS、データベースの起動は不要です。

**編集を引き継ぐCodexは [AGENTS.md](AGENTS.md) と [HANDOFF.md](HANDOFF.md) を先に読んでください。** 新しいアプリの追加、Git・公開手順、並行作業の注意、検証方法をまとめています。

アプリ開発・広告・審査申請から続けて作業する場合は、[eto works 共通開発手順](https://github.com/eto-h/eto-works-development-guide) も参照してください。共通資料の閲覧にはGitHubのアクセス権が必要です。

| 対象 | ファイル／公開先 |
|---|---|
| 共通トップ | `index.html` → `/` |
| BEYOND | `beyond/index.html` → `/beyond/`、ルートの `support.html`、`privacy.html`、`licenses.html` |
| ADRIFT | `adrift/index.html`、`support.html`、`privacy.html`、`licenses.html` → `/adrift/` 以下 |
| 共通スタイル | `site.css`、トップ一覧用 `games.css` |
| ADRIFTスタイル | `adrift/adrift.css` |
| 共通の広告販売者情報 | `/app-ads.txt` |
| 公開設定 | `CNAME`（eto-works.com）、`.nojekyll` |

ローカル確認はリポジトリ直下で `python -m http.server 8079 --bind 127.0.0.1` を実行し、`http://127.0.0.1:8079/` を開きます。

公開先は [eto-h/eto-works-site](https://github.com/eto-h/eto-works-site) の `main`。既存運用はGitHub Pagesの `main / (root)` で、push後の [Actions](https://github.com/eto-h/eto-works-site/actions) とHTTPSの実URLを確認します。新しいアプリを追加するためのドメイン・DNS・HTTPS設定の変更は不要です。
