"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Spor haberlerini almak için News API kullanımı
async function fetchSportsNews() {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?category=sports&apiKey=12af7570d7bd4b7abf84acfa15a3cfec`
  );

  if (!res.ok) {
    throw new Error("Spor haberleri alınamadı");
  }

  const data = await res.json();
  return data.articles;
}

export default function SportsSSGPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [showIntro, setShowIntro] = useState(true); // Bilgi ekranı durumu
  const [isTransitioning, setIsTransitioning] = useState(false); // Geçiş animasyonu durumu

  const handleContinue = async () => {
    setShowIntro(false);
    setIsTransitioning(true); // Geçiş animasyonunu başlat

    // Spor haberlerini getirme
    const fetchedArticles = await fetchSportsNews();
    setArticles(fetchedArticles);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 relative">
      <div className="max-w-4xl mx-auto">
        {showIntro ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          >
            <motion.div
              className="bg-white p-10 rounded-lg shadow-lg text-center max-w-2xl mx-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-gray-900">
                Neden SSG Kullanıyoruz?
              </h1>
              <p className="mt-6 text-xl text-gray-700 font-semibold">
                SSG (Statik Site Oluşturma), önceden oluşturulmuş statik
                sayfalar sunarak daha hızlı yükleme süreleri sağlar. Bu projede
                spor haberlerini statik olarak oluşturup, kullanıcıya anında
                sunuyoruz.
              </p>
              <button
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-colors duration-300"
                onClick={handleContinue}
              >
                Devam Et
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <>
            {/* Geçiş animasyonu */}
            {isTransitioning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl font-bold mb-8">
                  Spor Haberleri (SSG)
                </h1>
                <div className="space-y-6">
                  {articles.map((article: any) => (
                    <div
                      key={article.url}
                      className="bg-gray-800 p-4 rounded-lg shadow-lg"
                    >
                      <h2 className="text-2xl font-semibold mb-2">
                        {article.title}
                      </h2>
                      <p className="text-lg mb-2">{article.description}</p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        Devamını Oku
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
