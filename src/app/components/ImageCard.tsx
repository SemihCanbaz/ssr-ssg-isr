import Image from "next/image";
import Link from "next/link";

interface ImageCardProps {
  id: number;
  src: string;
  alt: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ id, src, alt }) => {
  return (
    <div className="rounded-lg border border-gray-200 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={300}
        height={200}
        className="object-cover w-full h-48 transition-transform duration-300"
      />
      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold text-gray-800">{alt || "Görsel"}</h3>
        <p className="text-gray-600 mt-2">Tıklayın ve detayları görün.</p>
        <div className="mt-4 flex space-x-4">
          <Link href={`/ssg`} className="text-blue-600">
            SSG Sayfası
          </Link>
          <Link href={`/ssr`} className="text-blue-600">
            SSR Sayfası
          </Link>
          <Link href={`/isr`} className="text-blue-600">
            ISR Sayfası
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
