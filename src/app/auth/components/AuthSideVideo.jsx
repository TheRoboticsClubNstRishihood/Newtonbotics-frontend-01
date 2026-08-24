"use client";

import { motion } from "framer-motion";

export const FORGOT_PASSWORD_VIDEO = "/forgetpasswords01.mp4";

export default function AuthSideVideo({ src = "/authentication.mp4" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-lg mx-auto lg:max-w-none min-w-0 h-64 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl nb-auth-media-panel"
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 nb-auth-media-overlay" aria-hidden />
    </motion.div>
  );
}
