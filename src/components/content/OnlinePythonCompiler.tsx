import { useState, useEffect, useRef } from 'react';
import { PlayIcon, ArrowPathIcon, ExclamationTriangleIcon, DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/solid';
import { CommandLineIcon as CommandLineIconOutline } from '@heroicons/react/24/outline';

interface ExecutionResponse {
    stdout: string;
    stderr: string;
    exit_code: number;
    error?: string;
}

interface OnlinePythonCompilerProps {
    initialCode?: string;
}

export default function OnlinePythonCompiler({ initialCode = '# Write your Python code here\nprint("Hello, AI PH!")' }: OnlinePythonCompilerProps) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const outputRef = useRef<HTMLDivElement>(null);

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const runCode = async () => {
        if (isRunning) return;

        setIsRunning(true);
        setError(null);
        setOutput('Compiling and running...');

        try {
            const response = await fetch('https://ai-ph-backend.onrender.com/api/v1/compile-python', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const result: ExecutionResponse = await response.json();

            if (result.error) {
                setError(result.error);
                setOutput(result.stderr || result.error);
            } else {
                let finalOutput = result.stdout;
                if (result.stderr) {
                    finalOutput += '\n--- Errors ---\n' + result.stderr;
                }
                if (finalOutput.trim() === '' && result.exit_code === 0) {
                    finalOutput = '(Execution finished with no output)';
                }
                setOutput(finalOutput);
                if (result.exit_code !== 0) {
                    setError(`Process exited with code ${result.exit_code}`);
                }
            }
        } catch (err: any) {
            setError(err.message || 'Failed to connect to the compiler service.');
            setOutput('Error: ' + (err.message || 'Check your internet connection or try again later.'));
        } finally {
            setIsRunning(false);
        }
    };

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output]);

    return (
        <div className="my-8 border border-[color:var(--color-border)] rounded-xl overflow-hidden bg-[var(--color-bg-soft)] shadow-xl transition-all hover:shadow-2xl group">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-bg-soft)] border-b border-[color:var(--color-border)]">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-[color:var(--color-accent)]/10">
                        <CommandLineIconOutline className="w-6 h-6 text-[color:var(--color-accent)]" />
                    </div>
                    <span className="text-sm font-medium tracking-[0.2em] opacity-80">INTERACTIVE PYTHON</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={copyCode}
                        className="p-1.5 rounded-lg hover:bg-[var(--color-elev)] transition-colors text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
                        title="Copy code"
                    >
                        {copied ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : <DocumentDuplicateIcon className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={runCode}
                        disabled={isRunning}
                        className={`flex items-center gap-2 px-5 py-1.5 rounded-lg text-sm font-bold transition-all shadow-lg ${isRunning
                                ? 'opacity-50 cursor-not-allowed bg-[var(--color-bg-soft)] text-[color:var(--color-muted)]'
                                : 'bg-[color:var(--color-accent)] hover:brightness-110 text-[var(--color-bg)] hover:scale-[1.02] active:scale-[0.98] shadow-[color:var(--color-accent)]/20'
                            }`}
                    >
                        {isRunning ? (
                            <ArrowPathIcon className="w-4 h-4 animate-spin" />
                        ) : (
                            <PlayIcon className="w-4 h-4" />
                        )}
                        {isRunning ? 'RUNNING' : 'RUN'}
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="relative">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck={false}
                    className="w-full h-48 md:h-64 p-4 font-mono text-sm bg-black/5 dark:bg-black/20 text-[color:var(--color-text)] focus:outline-none resize-y border-none leading-relaxed"
                    placeholder="Type your python code here..."
                />
                <div className="absolute top-2 right-2 opacity-30 pointer-events-none text-xs font-mono">
                    python 3.x
                </div>
            </div>

            {/* Output Area */}
            <div className="border-t border-[color:var(--color-border)] bg-[var(--color-bg-soft)]/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider opacity-60 border-b border-[color:var(--color-border)]/50">
                    <span>Output Console</span>
                    {error && <ExclamationTriangleIcon className="w-3 h-3 text-red-500 animate-pulse" />}
                </div>
                <div
                    ref={outputRef}
                    className={`p-4 font-mono text-sm overflow-auto max-h-40 min-h-[4rem] whitespace-pre-wrap leading-relaxed transition-colors ${error ? 'text-red-400' : 'text-emerald-400 dark:text-emerald-300'
                        }`}
                >
                    {output || <span className="opacity-30 italic">Console output will appear here...</span>}
                </div>
            </div>

            {/* Footer Info */}
            <div className="px-4 py-1 text-[10px] text-[color:var(--color-muted)] flex justify-between border-t border-[color:var(--color-border)]/30">
                <span>AI PH Playground</span>
                <span>Powered by FastAPI & Google Cloud Run</span>
            </div>
        </div>
    );
}
