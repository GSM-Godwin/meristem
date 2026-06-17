function PlayIcon() {
  return (
    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-md">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l11.04-6.86c.63-.39.63-1.29 0-1.68L9.54 4.3C8.87 3.87 8 4.35 8 5.14z"
          fill="#3B2314"
        />
      </svg>
    </div>
  );
}

export default function PlayButton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <PlayIcon />
    </div>
  );
}
