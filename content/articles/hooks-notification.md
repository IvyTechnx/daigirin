---
title: "「作業が終わったら教えて」Hooksで通知を飛ばす"
slug: "hooks-notification"
description: "Claude Codeの長い作業が終わったらSlackやmacOS通知を飛ばすHookの設定方法。"
author: "daigirin"
category: "hooks"
tags: ["Hooks", "通知", "自動化"]
difficulty: "intermediate"
type: "recipe"
publishedAt: "2026-03-12"
featured: false
---

## 困りごと

Claude Codeに大きな作業を頼んで放置 → いつ終わったかわからない。

## macOS通知を飛ばす

```json
{
  "hooks": {
    "notification": [
      {
        "matcher": "",
        "command": "osascript -e 'display notification \"$CLAUDE_NOTIFICATION\" with title \"Claude Code\"'"
      }
    ]
  }
}
```

Claude Codeがユーザーに通知を送るタイミングで、macOSの通知センターにポップアップが出る。

## Slack通知を飛ばす

```json
{
  "hooks": {
    "notification": [
      {
        "matcher": "",
        "command": "curl -s -X POST $SLACK_WEBHOOK_URL -H 'Content-type: application/json' -d '{\"text\": \"Claude Code: '$CLAUDE_NOTIFICATION'\"}'"
      }
    ]
  }
}
```

環境変数 `SLACK_WEBHOOK_URL` にSlackのIncoming Webhook URLをセット。

## サウンドで知らせる

```json
{
  "hooks": {
    "notification": [
      {
        "matcher": "",
        "command": "afplay /System/Library/Sounds/Glass.aiff"
      }
    ]
  }
}
```

macOS標準のシステムサウンドが鳴る。

## 設定もClaude Codeに任せる

```
Claude Codeの作業が終わったらmacOS通知を飛ばすHookを設定して。
.claude/settings.json に書いて。
```

```
Slack通知も飛ばしたい。Webhook URLは SLACK_WEBHOOK_URL 環境変数から読んで。
```

## 組み合わせ

通知 + サウンドを同時に：

```json
{
  "matcher": "",
  "command": "osascript -e 'display notification \"$CLAUDE_NOTIFICATION\" with title \"Claude Code\" sound name \"Glass\"'"
}
```
