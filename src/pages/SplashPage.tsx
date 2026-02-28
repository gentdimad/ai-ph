import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const SPLASH_FADE_DELAY_MS = 200
const SPLASH_LOGO_SIZE = 'w-[80vmin] h-[80vmin]'
const SPLASH_LOGO_SRC = '/logo.png'

export default function SplashPage() {
    const navigate = useNavigate()
    const [logoLoaded, setLogoLoaded] = useState(false)
    const [logoFailed, setLogoFailed] = useState(false)
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        const img = new Image()
        img.src = SPLASH_LOGO_SRC
        img.onload = () => setLogoLoaded(true)
        img.onerror = () => setLogoFailed(true)
    }, [])

    useEffect(() => {
        if (!logoLoaded && !logoFailed) return
        const timer = setTimeout(() => setShowContent(true), SPLASH_FADE_DELAY_MS)
        return () => clearTimeout(timer)
    }, [logoLoaded, logoFailed])

    const handleEnter = useCallback(() => {
        navigate('/home')
    }, [navigate])

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleEnter()
        }
    }, [handleEnter])

    return (
        <div
            onClick={handleEnter}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            className="min-h-screen flex flex-col items-center justify-center cursor-pointer select-none bg-[var(--color-bg)] text-[var(--color-text)] outline-none"
        >
            {!logoLoaded && !logoFailed ? (
                <div className="flex flex-col items-center gap-4" aria-label="Loading">
                    <div className="splash-loader" />
                    <span className="text-sm text-[var(--color-muted)]">Loading…</span>
                </div>
            ) : (
                <div
                    className={`splash-fade-in flex flex-col items-center ${showContent ? 'splash-fade-in-visible' : ''}`}
                >
                    {logoLoaded && (
                        <div>
                            <img
                                src={SPLASH_LOGO_SRC}
                                alt="AI PH Logo"
                                className={`splash-rays ${SPLASH_LOGO_SIZE}`}
                            />
                        </div>
                    )}

                    <h1 className="-mt-10 text-3xl sm:text-4xl font-bold tracking-wider text-[color:var(--color-brand)]">
                        AI PH
                    </h1>

                    <p className="mt-3 text-sm text-[var(--color-muted)] animate-pulse">
                        {logoFailed ? 'Tap or press Enter to continue' : 'Click anywhere to enter'}
                    </p>
                </div>
            )}
        </div>
    )
}
