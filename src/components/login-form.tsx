"use client";

import { useTranslations } from "next-intl";

export function LoginForm() {
    const t = useTranslations("Login");

    return (
        <form
            className="flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
        >
            {/* Student ID */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="studentId"
                    className="text-xs font-medium tracking-wider text-slate-500 dark:text-white/50 uppercase"
                >
                    {t("studentId")}
                </label>
                <input
                    id="studentId"
                    type="text"
                    placeholder={t("studentId")}
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 backdrop-blur-sm focus:border-orange-500/50 focus:bg-white dark:focus:bg-white/[0.08]"
                    autoComplete="username"
                />
            </div>

            {/* Access Code */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="accessCode"
                    className="text-xs font-medium tracking-wider text-slate-500 dark:text-white/50 uppercase"
                >
                    {t("accessCode")}
                </label>
                <input
                    id="accessCode"
                    type="text"
                    placeholder={t("accessCode")}
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 backdrop-blur-sm focus:border-orange-500/50 focus:bg-white dark:focus:bg-white/[0.08]"
                    autoComplete="off"
                />
            </div>

            {/* Submit button */}
            <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 hover:shadow-orange-500/40 active:scale-[0.98]"
            >
                {t("submit")}
            </button>
        </form>
    );
}
