export default function AdminLoading() {
  return (
    <div className="max-w-frame mx-auto px-4 xl:px-0 py-10">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-black/10 rounded w-48"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-black/10 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
