---
title: "MCPサーバー設定入門"
slug: "mcp-server-setup"
description: "Model Context Protocol (MCP) サーバーの基本的な設定方法と、よく使うサーバーの導入手順を解説します。"
author: "daigirin"
category: "mcp"
tags: ["MCP", "設定", "入門"]
difficulty: "beginner"
type: "recipe"
publishedAt: "2026-03-14"
featured: true
---

## MCPサーバーとは

MCP (Model Context Protocol) サーバーは、Claude Codeに外部ツールやデータソースへのアクセスを提供する仕組みです。ファイルシステム、データベース、API、Webブラウザなど、さまざまな機能を追加できます。

## 設定ファイルの場所

MCPサーバーの設定は以下の場所に配置します：

```json
// ~/.claude/mcp.json（グローバル設定）
// .claude/mcp.json（プロジェクト設定）
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "package-name"],
      "env": {}
    }
  }
}
```

## よく使うMCPサーバー

### ファイルシステム

ファイルの読み書きや検索機能を強化します：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-filesystem", "/path/to/allowed/dir"]
    }
  }
}
```

### Web検索

インターネット検索機能を追加します：

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-api-key"
      }
    }
  }
}
```

### GitHub

GitHubリポジトリの操作を可能にします：

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxx"
      }
    }
  }
}
```

## 設定のベストプラクティス

1. **環境変数で秘密情報を管理**: API キーは直接記述せず、環境変数を使う
2. **プロジェクト固有 vs グローバル**: プロジェクトで必要なサーバーはプロジェクト設定に、常に使うものはグローバルに
3. **不要なサーバーは無効化**: 使わないサーバーは設定から除外してコンテキスト節約
4. **権限を最小限に**: ファイルシステムアクセスは必要なディレクトリのみに制限

## トラブルシューティング

| 症状 | 原因 | 対処法 |
|------|------|--------|
| サーバーが起動しない | パッケージ未インストール | `npx -y` を使用して自動インストール |
| 権限エラー | トークン期限切れ | 環境変数のトークンを更新 |
| タイムアウト | サーバー応答遅延 | ネットワーク接続を確認 |
