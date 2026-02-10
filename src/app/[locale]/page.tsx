import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
    const t = useTranslations("Login");

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
            {/* ── Decorative cosmic orbs ─────────────────────── */}
            <div
                className="cosmic-orb"
                style={{
                    width: 500,
                    height: 500,
                    top: "-10%",
                    right: "-5%",
                    background:
                        "radial-gradient(circle, rgba(251,146,60,0.5) 0%, transparent 70%)",
                }}
            />
            <div
                className="cosmic-orb"
                style={{
                    width: 400,
                    height: 400,
                    bottom: "-10%",
                    left: "-5%",
                    background:
                        "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
                }}
            />
            <div
                className="cosmic-orb"
                style={{
                    width: 300,
                    height: 300,
                    top: "30%",
                    left: "50%",
                    background:
                        "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
                }}
            />

            {/* ── Floating geometric accents ─────────────────── */}
            <div className="pointer-events-none absolute top-20 right-20 h-16 w-16 rotate-45 rounded-lg border border-amber-500/20 opacity-60" />
            <div className="pointer-events-none absolute bottom-32 left-24 h-10 w-10 rounded-full border border-purple-500/20 opacity-40" />
            <div className="pointer-events-none absolute top-1/3 left-16 h-6 w-6 rotate-12 bg-gradient-to-br from-cyan-400/20 to-transparent" />

            {/* ── Main content ───────────────────────────────── */}
            <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
                {/* ── Left: Hero text ──────────────────────────── */}
                <div className="flex flex-1 flex-col gap-6 pt-8 text-center lg:text-left">
                    {/* Header with logo and language switcher */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-lg">
                                📖
                            </div>
                            <span className="text-sm font-semibold tracking-wide text-white/80">
                                testing
                            </span>
                        </div>
                        <LanguageSwitcher />
                    </div>

                    <div className="mt-8">
                        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                            {t("title")}
                        </h1>
                        <p className="mt-3 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-lg font-medium text-transparent md:text-xl">
                            {t("subtitle")}
                        </p>
                    </div>

                    <p className="max-w-md text-base leading-relaxed text-white/50">
                        {t("description")}
                    </p>
                </div>

                {/* ── Right: Login card ────────────────────────── */}
                <div className="w-full max-w-sm">
                    <div className="glass-card rounded-2xl p-8 shadow-2xl shadow-black/40">
                        <LoginForm />
                    </div>

                    {/* Subtle bottom decoration */}
                    <div className="mt-6 flex justify-center gap-2">
                        <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
                        <div className="h-1.5 w-3 rounded-full bg-white/20" />
                        <div className="h-1.5 w-3 rounded-full bg-white/10" />
                    </div>
                </div>
            </div>
        </div>
    );
}
