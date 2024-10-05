// src/app/image/[id]/page.tsx
import Image from "next/image";

interface ImageDetailProps {
  params: {
    id: string; // ID'yi string olarak alıyoruz
  };
}

async function fetchImage(id: string) {
  const res = await fetch(
    `https://api.pexels.com/v1/photos/${id}`, // ID'ye göre tekil veri çekme
    {
      headers: {
        Authorization:
          "XxMIke7U6p1NKxh9a3NYB3rA7aZ1UzZVFmJNVKlkiAnwlB6aXOGaaIuY",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Image not found");
  }

  return res.json();
}

const ImageDetail = async ({ params }: ImageDetailProps) => {
  const image = await fetchImage(params.id);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">
        {image.alt || "Görsel Detayı"}
      </h1>
      <Image
        src={image.src.original}
        alt={image.alt}
        width={600}
        height={400}
        className="rounded"
      />
      <p className="mt-4">ID: {image.id}</p>
    </div>
  );
};

// Dinamik yolları oluştur
export async function generateStaticParams() {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=nature&per_page=3`, // API'den 3 görsel al
    {
      headers: {
        Authorization:
          "XxMIke7U6p1NKxh9a3NYB3rA7aZ1UzZVFmJNVKlkiAnwlB6aXOGaaIuY",
      },
    }
  );

  const data = await res.json();
  const images = data.photos;

  // Her görsel için statik yollar oluştur
  return images.map((image: any) => ({
    id: image.id.toString(), // ID'yi string olarak döndür
  }));
}

export default ImageDetail;
