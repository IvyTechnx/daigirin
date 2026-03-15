import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "免責事項",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        トップに戻る
      </Link>

      <h1 className="mb-2 text-3xl font-bold">免責事項</h1>
      <p className="mb-8 text-sm text-muted-foreground">最終更新: 2026年3月15日</p>

      <div className="prose">
        <h2>本サイトについて</h2>
        <p>
          本サイト「Claude Code Tips」はIVYXON編集部が独自にキュレーションした情報サイトです。
          Anthropic社の公式コンテンツではなく、Anthropic社との提携・推奨関係はありません。
        </p>

        <h2>掲載情報の正確性</h2>
        <p>
          掲載されているプロンプト例や設定例は執筆時点の動作確認に基づいています。
          Claude Codeのアップデートにより、記事の内容が最新の仕様と異なる場合や、
          動作しなくなる可能性があります。
        </p>

        <h2>サードパーティツール・MCPサーバー</h2>
        <p>
          記事中で紹介しているMCPサーバーやサードパーティツールの利用は、
          各自の責任において行ってください。
          APIキーの管理、料金の発生、データの取り扱いについて、IVYXONは一切の責任を負いません。
        </p>

        <h2>生成コードについて</h2>
        <p>
          記事中のプロンプトを実行した結果生成されるコードの品質、セキュリティ、
          ライセンス上の問題について、IVYXONは責任を負いません。
          商用プロジェクトに適用する場合は、必ずご自身でコードレビューとテストを実施してください。
        </p>

        <h2>損害の免責</h2>
        <p>
          本サイトの情報を利用したことにより生じた損害（データの消失、システム障害、
          経済的損失等を含むがこれに限定されない）について、
          IVYXONは一切の責任を負いません。
        </p>

        <h2>運営者</h2>
        <p>
          本サイトはIVYXON（ポラリス合同会社）が運営しています。
          お問い合わせは <a href="mailto:support@ivyxon.com">support@ivyxon.com</a> までお願いいたします。
        </p>
      </div>
    </div>
  );
}
