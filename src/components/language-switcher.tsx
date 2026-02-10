"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const locales = [
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
    { code: "kk", label: "KK" },
] as const;

export function LanguageSwitcher() {
    const currentLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    function handleSwitch(newLocale: string) {
        const segments = pathname.split("/");
        segments[1] = newLocale;
        router.push(segments.join("/"));
    }

    return (
        <div className="flex items-center gap-1 rounded-full bg-black/5 dark:bg-white/10 p-1 backdrop-blur-sm">
            {locales.map(({ code, label }) => (
                <button
                    key={code}
                    onClick={() => handleSwitch(code)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${currentLocale === code
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                            : "text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                        }`}
                    aria-label={`Switch to ${label}`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
