export default function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-yellow-500 animate-spin"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-ping opacity-20"></div>
        </div>
        <p className="ml-4 text-xl font-semibold">Loading...</p>
      </div>
    );
  }