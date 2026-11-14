# ETO Works 公式サイト

BEYOND: Quiet Ascent の案内・サポート・プライバシーポリシーを配信する静的サイトです。

- `index.html` · トップ
- `support.html` · 操作と問い合わせ案内
- `privacy.html` · iOS 版の日英プライバシーポリシー
- `licenses.html` · 第三者ライセンス
- `app-ads.txt` · AdMob が指定する販売者情報。ドメイン直下で配信

## 更新

対象の HTML や CSS を編集し、`python -m http.server 8079` でローカル表示を確認します。GitHub の `main` に反映すると、Settings → Pages → Deploy from a branch の `main / (root)` から再配信されます。Actions の配信結果を確認し、公開 URL を開き直してください。

公開用連絡先が確定したら、`support.html` に連絡先を記載します。問い合わせ情報の取り扱いを `privacy.html` の日本語・英語に追記します。SDK・広告構成を更新するときは、配信するビルドのプライバシー開示と照合してポリシーを更新してください。

## 独自ドメイン

リポジトリの Settings → Pages でカスタムドメイン `eto-works.com` を設定します。DNS の更新と証明書の発行を確認後、Enforce HTTPS を有効にします。トップ、`/support.html`、`/privacy.html`、`/licenses.html` が HTTPS で表示され、`/app-ads.txt` が HTTP 200 のプレーンテキストで取得できることを確認します。

App Store Connect の Marketing URL はサイトのルート、Support URL と Privacy Policy URL は対応するページを使用します。販売者情報を更新する場合は AdMob 管理画面の指定行と照合します。
