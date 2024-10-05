"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Router'ı import et

type WeatherData = {
  temperature: number;
  description: string;
};

async function fetchWeather(city: string): Promise<WeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b3fd849da92d6e0cade1d258c717f6b0&units=metric`,
    {
      next: { revalidate: 60 }, // ISR ile sayfa her 60 saniyede yeniden oluşturulur
    }
  );

  if (!res.ok) {
    throw new Error("Hava durumu verisi alınamadı");
  }

  const data = await res.json();
  return {
    temperature: data.main.temp,
    description: data.weather[0].description,
  };
}

export default function ISRPage() {
  const router = useRouter(); // Router'ı kullan
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [showWeather, setShowWeather] = useState(false); // İlk ekranda ISR açıklaması

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Hata mesajını sıfırlama

    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError("Hava durumu verisi alınamadı. Şehri kontrol edin.");
      setWeather(null);
    }
  };

  // Devam Et butonuna basıldığında hava durumu ekranına geç
  const handleContinue = () => {
    setShowWeather(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-600 text-white py-10 relative">
      <h1 className="text-5xl font-extrabold mb-4 text-center drop-shadow-md">
        ISR ile Hava Durumu
      </h1>

      {/* Geri butonu */}
      <button
        className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.back()}
      >
        Geri
      </button>

      {/* Eğer showWeather false ise ISR açıklamasını göster */}
      {!showWeather ? (
        <div className="w-full max-w-4xl bg-white text-gray-800 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-bold mb-2 text-blue-500">
            Neden ISR Kullanılıyor?
          </h2>
          <p className="text-gray-600">
            ISR, sıkça değişen içeriklerin hızlı ve verimli bir şekilde
            sunulmasını sağlar. Örneğin, hava durumu gibi bilgilerin her zaman
            güncel olması önemlidir. ISR sayesinde sayfa, belirlenen bir süre
            (örneğin, 60 saniye) içinde otomatik olarak güncellenir. Bu,
            kullanıcıların en son verileri görmesini sağlarken, sunucu
            üzerindeki yükü de azaltır.
          </p>
          <p className="text-gray-600 mt-2">
            Bu sayede uygulamanızın performansı artar ve kullanıcı deneyimi
            iyileşir. ISR, hem statik sayfa oluşturmanın hızını hem de dinamik
            içeriğin güncelliğini dengeler.
          </p>
          <button
            onClick={handleContinue}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Devam Et
          </button>
        </div>
      ) : (
        // showWeather true olduğunda hava durumu ekranını göster
        <div>
          <form onSubmit={handleSubmit} className="mb-6">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Şehir adı girin..."
              className="p-2 rounded-md text-gray-800"
            />
            <button
              type="submit"
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Hava Durumunu Göster
            </button>
          </form>

          {error && <p className="text-red-500">{error}</p>}

          {weather && (
            <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-4xl bg-white text-gray-800 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="md:w-1/2 mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2 text-blue-500">
                  Hava Durumu
                </h2>
                <p className="text-6xl font-bold text-blue-800 mb-2">
                  {weather.temperature} °C
                </p>
                <p className="text-lg text-gray-700 capitalize">
                  {weather.description}
                </p>
                <p className="text-gray-600 mt-2">
                  Hava durumu verileri her 60 saniyede bir güncellenir. Bu
                  sayede en güncel verileri anlık olarak görebilirsiniz. ISR
                  (Incremental Static Regeneration) sayesinde, sayfanın tamamını
                  yeniden yüklemek zorunda kalmadan hava durumu verileri
                  otomatik olarak yenilenir.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
