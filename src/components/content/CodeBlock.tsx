import CopyButton from './CopyButton'

export default function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  return (
    <div className="code-block" style={{ position: 'relative' }}>
      <pre className={`language-${lang || 'txt'}`}>
        <code>{code}</code>
      </pre>
      <div style={{ position: 'absolute', top: 8, right: 8 }}>
        <CopyButton text={code} />
      </div>
    </div>
  )
}
