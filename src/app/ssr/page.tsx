"use client"; // Bu bileşenin istemci tarafında çalışmasını sağlar

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// TMDb API'den film verisi almak için fonksiyon
async function fetchMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=46448bb2ba66892ca76bf7f2ccb2269b&language=en-US&page=1`
  );

  if (!res.ok) {
    throw new Error("Film verisi alınamadı");
  }

  const data = await res.json();
  return data.results;
}

export default function SSRPage() {
  const router = useRouter();
  const [movies, setMovies] = useState<any[]>([]);
  const [showIntro, setShowIntro] = useState(true); // Bilgi yazısı için state
  const [isTransitioning, setIsTransitioning] = useState(false); // Geçiş animasyonu için state

  const handleContinue = async () => {
    setShowIntro(false);
    setIsTransitioning(true); // Geçiş animasyonunu başlat

    // Film verisini getirme
    const fetchedMovies = await fetchMovies();
    setMovies(fetchedMovies);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 relative">
      <div className="max-w-6xl mx-auto">
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
                Neden SSR Kullanıyoruz?
              </h1>
              <p className="mt-6 text-xl text-gray-700 font-semibold">
                SSR (Sunucu Tarafında Render), kullanıcıya daha hızlı ve SEO
                dostu içerikler sunmamızı sağlar. Bu projede, popüler filmleri
                sunucu tarafında render ederek kullanıcıya daha hızlı ve güncel
                içerikler sunuyoruz.
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
                <button
                  className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.back()}
                >
                  Geri
                </button>
                <h1 className="text-5xl font-bold mb-8 text-center">
                  Popüler Filmler (SSR)
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {movies.map((movie: any) => (
                    <motion.div
                      key={movie.id}
                      className="bg-gray-800 p-4 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:shadow-2xl"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="mb-4 rounded-lg transition-transform duration-300 transform hover:scale-110"
                      />
                      <h2 className="text-xl font-semibold mb-2 text-center">
                        {movie.title}
                      </h2>
                      <p className="text-gray-400 text-center">
                        {movie.release_date}
                      </p>
                      <p className="text-gray-300 text-sm text-center mt-2">
                        {movie.overview}
                      </p>
                    </motion.div>
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
