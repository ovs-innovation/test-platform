import Editor from '@monaco-editor/react';

export default function CodeEditor({ value, onChange, language = 'javascript', height = 320 }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700">
      <Editor
        height={height}
        language={language}
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
