"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle, AlertCircle, KeyRound } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import AuthSideVideo, { FORGOT_PASSWORD_VIDEO } from "../components/AuthSideVideo";
import AuthPageShell from "../components/AuthPageShell";

function AuthInput({ label, icon: Icon, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide nb-auth-label">{label}</span>}
      <div className="relative min-w-0">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 nb-auth-icon pointer-events-none" />
        )}
        <input
          {...props}
          className={`w-full font-sans text-sm ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 rounded-xl nb-auth-input focus:outline-none focus:ring-2 focus:ring-red-500/40 placeholder:text-xs`}
        />
      </div>
    </label>
  );
}

function ForgotFormCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full min-w-0 max-w-md lg:max-w-none rounded-3xl border p-6 md:p-8 nb-auth-card ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpToken, setOtpToken] = useState(undefined);
  const [cooldown, setCooldown] = useState(0);

  const { requestResetOtp } = useAuth();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await requestResetOtp(email.trim());
      if (result.success) {
        setIsSubmitted(true);
        const maybeToken = result?.data?.otpToken;
        if (maybeToken) setOtpToken(maybeToken);
        setCooldown(60);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const verifyUrl = `/auth/verify-otp?email=${encodeURIComponent(email)}${
    otpToken ? `&otpToken=${encodeURIComponent(otpToken)}` : ""
  }`;

  if (isSubmitted) {
    return (
      <AuthPageShell variant="brand" withGrid={false}>
        <AuthSideVideo src={FORGOT_PASSWORD_VIDEO} />

        <ForgotFormCard className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">OTP sent</h1>
          <p className="nb-auth-muted text-sm mb-1">
            We sent a 6-digit code to <span className="font-semibold">{email}</span>
          </p>
          <p className="nb-auth-muted text-sm mb-6">
            Enter the code on the next screen to verify your identity and reset your password.
          </p>

          <button
            type="button"
            onClick={() => router.push(verifyUrl)}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold text-white"
          >
            Continue to verification
          </button>

          <Link
            href="/auth"
            className="mt-5 inline-flex items-center justify-center gap-2 text-sm nb-auth-link hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </ForgotFormCard>
      </AuthPageShell>
    );
  }

  return (
    <AuthPageShell variant="brand" withGrid={false}>
      <AuthSideVideo src={FORGOT_PASSWORD_VIDEO} />

      <ForgotFormCard>
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/25">
            <KeyRound className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display leading-tight">
              Reset password
            </h1>
            <p className="mt-1 text-sm nb-auth-muted">
              We&apos;ll email you a verification code to reset your password.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <AuthInput
            label="Email address"
            icon={Mail}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || cooldown > 0}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed transition font-semibold text-white"
          >
            {isSubmitting ? "Sending..." : cooldown > 0 ? `Resend in ${cooldown}s` : "Send OTP"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm nb-auth-muted border-t border-white/10 pt-4">
          Remember your password?{" "}
          <Link href="/auth" className="nb-auth-link hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </ForgotFormCard>
    </AuthPageShell>
  );
}
