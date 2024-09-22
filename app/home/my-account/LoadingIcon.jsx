// components/LoadingIcon.js


const LoadingIcon = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <svg
      className="animate-spin h-8 w-8 text-yellow-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
      ></path>
    </svg>
  </div>
);

export default LoadingIcon;
