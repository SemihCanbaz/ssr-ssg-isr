"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-6xl font-bold mb-12">Kullanım Senaryoları</h1>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      />
      <div className="flex flex-col space-y-24">
        <div className="flex justify-around flex-wrap gap-12">
          {/* SSR Dairesi */}
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              router.push("/ssr");
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex items-center justify-center w-52 h-52 bg-blue-600 rounded-full shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-5xl font-extrabold text-white">SSR</h2>
            </motion.div>
            <p className="mt-6 text-center text-gray-300 text-lg font-medium max-w-xs leading-relaxed">
              Sunucu tarafında render edilen içerikler, hızlı yüklenme süreleri
              sağlayarak SEO dostu bir deneyim sunar.
            </p>
          </motion.div>

          {/* SSG Dairesi */}
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              router.push("/ssg");
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex items-center justify-center w-40 h-40 bg-green-600 rounded-full shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-4xl font-extrabold text-white">SSG</h2>
            </motion.div>
            <p className="mt-6 text-center text-gray-300 text-lg font-medium max-w-xs leading-relaxed">
              Önceden oluşturulmuş sayfalar, içeriklerin hızla yüklenmesini
              sağlar, bu da kullanıcı deneyimini iyileştirir.
            </p>
          </motion.div>

          {/* ISR Dairesi */}
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              router.push("/isr");
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex items-center justify-center w-32 h-32 bg-red-600 rounded-full shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-extrabold text-white">ISR</h2>
            </motion.div>
            <p className="mt-6 text-center text-gray-300 text-lg font-medium max-w-xs leading-relaxed">
              ISR, verilerin düzenli aralıklarla güncellenmesini sağlayarak
              kullanıcıların her zaman güncel bilgilere erişmesini sağlar.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
