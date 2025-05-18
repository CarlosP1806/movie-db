interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export const PaginationControls = ({
  page,
  totalPages,
  onPrev,
  onNext,
}: PaginationControlsProps) => {
  return (
    <div className="flex justify-center items-center space-x-6">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className={`
            px-5 py-2.5 rounded-lg font-semibold
            transition-colors duration-300
            ${
              page === 1
                ? "bg-gray-400 dark:bg-gray-600 text-gray-700 dark:text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white cursor-pointer shadow-md"
            }
          `}
      >
        Previous
      </button>

      <span className="px-4 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 select-none">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className={`
            px-5 py-2.5 rounded-lg font-semibold
            transition-colors duration-300
            ${
              page === totalPages
                ? "bg-gray-400 dark:bg-gray-600 text-gray-700 dark:text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white cursor-pointer shadow-md"
            }
          `}
      >
        Next
      </button>
    </div>
  );
};
