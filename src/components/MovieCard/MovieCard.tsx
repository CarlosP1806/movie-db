import Image from "next/image";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  rating: number;
  posterPath: string;
}

export const MovieCard = ({
  id,
  title,
  overview,
  releaseDate,
  rating,
  posterPath,
}: MovieCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/movie/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md overflow-hidden transition hover:scale-[1.02] hover:shadow-lg duration-200 cursor-pointer"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        width={500}
        height={750}
        className="w-full h-72 object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
          {title}
        </h3>
        <div className="text-sm text-zinc-500 dark:text-zinc-300">
          <span className="font-medium">Rating:</span> {rating.toFixed(1)} ★
        </div>
        <div className="text-sm text-zinc-500 dark:text-zinc-300">
          <span className="font-medium">Release:</span> {releaseDate}
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
          {overview}
        </p>
      </div>
    </div>
  );
};
