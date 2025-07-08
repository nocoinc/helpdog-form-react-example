# React お問い合わせフォーム with Helpdog 検索連携

3 ステップのお問い合わせフォーム（入力 → 確認 → 完了）と Helpdog の検索連携を実装したサンプルです。

## 主な機能

- **3 ステップフォーム**: 入力画面、確認画面、完了画面
- **Helpdog 検索連携**: フォーム入力内容に基づいて関連ヘルプ記事を表示
- **リアルタイム検索**: 入力と同時に検索結果を更新
- **レスポンシブデザイン**: モバイル対応

## 実装のポイント

フォームの入力値を監視して自動的に Helpdog の検索を実行：

```tsx
<HelpdogSearch
  siteId="01JPVM5ZPX7E96GTDF9S3W1MS9"
  queryFields="#subject,#message,input[name='inquiryType'],input[name='services'],#implementationMethod"
  tracking={{
    form_id: "contact-form",
    form_name: "お問い合わせフォーム",
    hosting_type: "external",
  }}
/>
```

## 実行方法

```bash
npm install
npm start
```

## テスト

```bash
npm test
```
