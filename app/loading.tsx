import Filters from "./components/Filters";

export default function Loading() {
  return (
    <div className="p-12 w-[1024px] m-auto max-w-full">
      <div className="mb-4">
        <div className="bg-white rounded-full p-6 shadow-xl">
          <Filters />
        </div>

        <div className="text-right text-white mt-4 pr-8">
          <span>Laden...</span>
        </div>
      </div>
    </div>
  );
}
