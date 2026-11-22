# eto works — 他アプリ担当Codex向け編集・公開ガイド

確認日：2026-11-22 JST。BEYONDやADRIFT以外のアプリ担当も、この資料から公式ページの追加・更新を始められるようにする。ユーザーの現在の依頼と `AGENTS.md` に従う。

## 1. 編集先と公開方式

| 項目 | 内容 |
|---|---|
| 公開サイト | https://eto-works.com/ |
| GitHub | https://github.com/eto-h/eto-works-site |
| 公開ブランチ | `main` |
| 既存の公開方式 | GitHub Pages、Deploy from a branch、`main / (root)` |
| 技術 | 静的HTML／CSS／PNG。アプリのUnity・Expo・EAS環境とは独立 |
| ドメイン指定 | ルートの `CNAME` は `eto-works.com` |
| Jekyll | ルートに `.nojekyll` あり。不要なビルド工程を追加しない |
| 公開問い合わせ先 | `support@eto-works.com`。アプリ名をメール件名で区別 |

資料作成時点ではGitHubはpublic、default branchはmain、Pages有効。更新前コミット `9510384` の `pages build and deployment` 成功と、公開トップ／ADRIFT／app-ads.txtのHTTPS 200を確認した。Pages管理設定の匿名REST APIは404だったため、管理画面設定を今回APIで再取得できたとは記載しない。上記main/rootは既存READMEの運用記録・実際の公開構成による。通常の編集にPages設定変更は不要。

## 2. ファイルとURLの所有範囲

```text
index.html                   全アプリを紹介する共通トップ
site.css                     共通の文字・余白・ナビゲーション等
games.css                    トップのゲーム一覧レイアウト
assets/BeyondLogo.png        BEYOND用
assets/BeyondTitle.png       BEYOND用
support.html                 BEYOND専用サポート
privacy.html                 BEYOND専用ポリシー
licenses.html                BEYOND専用ライセンス
adrift/
  index.html                 ADRIFT紹介
  support.html               ADRIFT専用サポート
  privacy.html               ADRIFT専用ポリシー
  licenses.html              ADRIFT専用ライセンス
  adrift.css                 ADRIFT固有スタイル
  assets/                    ADRIFT画像
  *LICENSE.txt, noto-OFL.txt  ADRIFTの権利表示原本
app-ads.txt                  ドメイン共通の広告販売者情報
CNAME, .nojekyll             既存公開設定を保持
```

特に **ルートのprivacy.htmlを、新しいアプリ用の内容へ置き換えない**。既にBEYONDのストア／ゲームから参照されている。既存のADRIFT専用URLも固定する。

新しいゲームのURL例（`new-game` は新アプリに合わせた未使用の英小文字slug）：

- 紹介：`https://eto-works.com/new-game/`
- サポート：`https://eto-works.com/new-game/support.html`
- Privacy：`https://eto-works.com/new-game/privacy.html`
- ライセンス：`https://eto-works.com/new-game/licenses.html`

BEYONDだけは従来のルートURLを維持し、新アプリのために移転しない。新しいゲームにはMarketing／Support／Privacyそれぞれの専用URLをゲーム内とストア設定へ渡す。別ゲームのBundle ID、AdMobアプリ／ユニットIDやEAS IDを流用しない。

## 3. このWindows環境の作業場所と並行編集

同じ個人開発フォルダー内に、同一Gitリポジトリの作業ツリーがある。

| フォルダー名 | 調査時点の状態 |
|---|---|
| `ETO-Works-ADRIFT-site` | `feat/adrift-official-pages`。最新origin/mainと同じ内容で、今回の資料作成前はclean。サイト全体を編集可能でADRIFT専用リポジトリではない |
| `ETO-Works-site` | `main`。古いコミット `c4cb5e0` で `privacy.html` に既存未コミット変更あり。無断pull・reset・上書きしない |

これらは2026-11-22の観測で、固定の最新状態ではない。毎回確認する。

```powershell
# 現在のcheckoutのルートで実行
git status -sb
git remote -v
git worktree list
git fetch origin
git log -3 --oneline
git diff --stat origin/main
```

同じフォルダーを他のCodexと同時に編集しない。別アプリが同時進行する場合は、環境にある `create_worktree` 等の機能で分ける。適切なcheckoutがない別PCでは、所有者のGit権限で別フォルダーへcloneしてよい。

```powershell
git clone https://github.com/eto-h/eto-works-site.git eto-works-site-new-game
Set-Location eto-works-site-new-game
git switch -c feat/new-game-site
```

GitHub CLIの `gh` はこの作成時のPATHにはない。必須ツールではなく、通常のgitとGitHub Webで作業できる。既存Git認証を使い、トークンをコード・ログ・チャットへ出さない。pushに認証が必要ならGitHubの正規ログイン画面等で所有者に操作してもらう。

## 4. 新しいアプリを追加する要領

1. 対象アプリの `AGENTS.md`／`HANDOFF.md`、配布候補の実装、素材台帳、SDK／Privacy Manifestを確認する。予定と実装済みを区別する。
2. 未使用slugのディレクトリと4ページ（紹介・Support・Privacy・Licenses）を作る。ADRIFTの構造は参考にできるが、ゲーム仕様・SDK・ライセンス文章を無検証で複製しない。
3. `index.html` のゲーム一覧へカードと専用ページへのリンクを追加する。既存BEYOND／ADRIFTの掲載とリンクは残す。ゲーム数に応じたグリッド変更は他カードも確認する。
4. 共通 `site.css` のナビゲーション・余白・文字ルールを活用し、固有の色や背景は `new-game/new-game.css` に分ける。例：`body class="new-game"` と `.new-game .hero`。共通変数の上書きもそのbody内に限定する。
5. 固有画像を `new-game/assets/` に配置し、出典・権利を記録する。軽いWeb用サイズ、alt、適切なwidth/heightを使用する。第三者素材には必要な権利表示とライセンス原文を用意する。
6. アプリのPrivacy導線と、ストアへ渡す専用URLを開発担当へ伝える。ストアの登録作業はその依頼範囲に従う。

サブディレクトリ内のHTMLからは `../site.css`、共通トップへは `../`、同アプリのページへは `support.html` 等を使う。CSS内の `url("assets/...")` は **HTMLではなくCSSファイルの位置** が基準。Windowsで動いても公開では大小文字が異なると失敗するので、ファイル名と完全一致させる。画像の参照先をローカルの `C:`／`D:` パスにしない。

日本語と英語の必要情報を用意する。既存の `lang="en"`、`id="english"` の構造・フッター・問い合わせ方法を参考にし、見出しとリンク先のアンカーが一致するようにする。ゲームの対応言語数と、サイトで用意した翻訳数を混同しない。

## 5. Support／Privacy／Licensesの内容

| ページ | 確認すること |
|---|---|
| 紹介 | 実際の操作・特徴・対応OS・配布状況。開発中を配信済みと書かない。未発行のストアURLを作らない |
| Support | 操作、失敗／復帰条件、保存／再開、記録、音・振動・言語、問い合わせ。任意広告がなくてもできることを実装に合わせる |
| Privacy | 端末内保存と外部送信の区別、実SDK、広告・同意・ATTの条件、削除方法、第三者サービス、問い合わせ。Manifest／App Privacy申告／実装と一致させる |
| Licenses | 対象アプリの素材台帳・実パッケージの作者、出典URL、ライセンス、必要な原文。別アプリの一覧をそのまま転記しない |

実装されていない解析・ログイン・課金・クラウド保存・問い合わせフォームを実施しているように書かない。生成アートを、CC0からダウンロードした素材とは記載しない。問い合わせメールは既存の公開用 `support@eto-works.com` に合わせ、件名へ新アプリ名を入れる。個人の審査連絡先は掲載しない。

`app-ads.txt` は `/new-game/app-ads.txt` ではなく **ドメイン直下**。既存の販売者行を維持し、変更が必要な場合はAdMob管理画面の個別スニペットと照合する。ここで使うのは販売者／publisher IDで、個別アプリID・広告ユニットIDとは違う。公開HTTP 200だけでAdMobのクロール完了とは断定しない。

## 6. ローカル確認

リポジトリ直下からlocalhostに限定して配信する。公開用サーバーを別に立てる必要はない。

```powershell
python -m http.server 8079 --bind 127.0.0.1
```

`python` が使えなければ利用可能なPythonの実行パスを指定する。8079が別作業で使用中なら空きポートに変更し、他のサーバーを止めない。確認後はこのサーバーだけをCtrl+Cで終了する。バックグラウンド起動する場合はWindowsでは非表示にし、起動したPIDを記録する。

- トップ、新アプリ4ページ、全ナビゲーション、画像、日英アンカー、公開問い合わせ先。
- PCとスマートフォン相当（例390×844、720×1280）で表示、折返し、リンクやタップ範囲を確認。
- 共通CSSやトップを触った場合、BEYONDの既存3ページとADRIFTの既存4ページも確認。
- `CNAME`／`.nojekyll`／`app-ads.txt`／無関係なページに意図しない差分がないことを確認。
- ブラウザのエラー、404、画像パスの大小文字、モバイルの横はみ出しを確認。HTTP確認と実機目視を別に記録。

## 7. commit・push・GitHub Pages確認

まず対象ファイルだけをstageし、既存の他作業を巻き込まない。コマンド中の `new-game` やメッセージは実際の変更へ置き換える。

```powershell
git diff --check
git diff --stat
git add -- index.html games.css new-game/
git diff --cached
git commit -m "feat: add new game official pages"
git fetch origin
git log --oneline --left-right origin/main...HEAD
# origin/mainに他の変更がなければ、現在ブランチから公開mainへ通常push
git push origin HEAD:main
```

`main` へのpushでサイトが更新される。featureブランチだけへのpush／ローカルcommitだけでは公開されない。PR運用の場合は対象PRをmainへマージして公開する。上の例は公開を含む依頼のための手順であり、別アプリの公開やApp Store申請を許可する指示ではない。

他のCodexが先にmainへpushした場合、force pushしない。fetchして他者の差分を読み、自分のブランチへ取り込み、競合箇所と共通トップの両アプリ掲載を整えてから再検証する。未コミット変更を `reset --hard` や自動stashで隠さない。

公開後は [Actions](https://github.com/eto-h/eto-works-site/actions) の `pages build and deployment` を開き、**自分のコミット** の成功を確認する。過去の緑色を今回の成功と扱わない。ghが使える環境なら `gh run list --repo eto-h/eto-works-site --limit 5` でも読める。

```powershell
$siteUrl = 'https://eto-works.com'
foreach ($page in @('/', '/new-game/', '/new-game/support.html', '/new-game/privacy.html', '/new-game/licenses.html', '/app-ads.txt')) {
    $response = Invoke-WebRequest -Uri ($siteUrl + $page)
    [pscustomobject]@{ Path = $page; Status = $response.StatusCode; ContentType = $response.Headers['Content-Type'] -join ',' }
}
```

新ページだけでなく既存ページもHTTPで確認し、本文の固有文字列や画像が新コミットと一致することを確かめる。必要なら `?v=<短縮コミット>` でブラウザキャッシュを区別する。200だけで別ページ／古い本文を見逃さない。HTTPS／独自ドメイン／app-ads.txtのプレーンテキストを保持する。

配信に問題があれば、自分の変更だけを修正するか `git revert <対象コミット>` で戻し、通常pushで再配信する。他者の変更も含む履歴全体をresetしない。DNSやTLS設定を試行錯誤で変更しない。

## 8. 完了報告と別Codexへ渡す文

変更したページ・CSS・素材、Gitコミット、公開Actionsの結果、認証なしで開けるURL、PC／スマートフォン幅での検証、実機未確認などの残作業を報告する。Git／公開権限が使えなければ、完成済み差分と実行できていない操作を明記する。認証情報自体を渡す必要はない。

新しいアプリの担当へは、次の文と対象ゲームの実装資料を渡せばよい。

> `eto-h/eto-works-site` の `AGENTS.md` と `HANDOFF.md` を読み、現在のGit状態とorigin/mainを確認してください。対象アプリの実装・素材台帳に合わせて、専用ディレクトリに紹介・Support・Privacy・Licensesを整備し、共通トップへ追加してください。BEYOND／ADRIFT、CNAME、HTTPS、app-ads.txtを維持してください。公開を依頼している場合は、検証・通常push・Pagesと公開URLの確認まで進め、変更と結果を記録してください。

公開されるアプリ名・slug・開発中か配信済みか・公開依頼の有無は、その都度のユーザー依頼から確定する。この資料だけで任意のアプリを公開しない。

## 参考一次資料

- [GitHub Pagesの公開ソース設定](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Google AdMobのapp-ads.txt設定](https://support.google.com/admob/answer/9363762)
- [既存ADRIFTのページ構成](https://eto-works.com/adrift/)
