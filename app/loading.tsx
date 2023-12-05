import Filters from "./components/Filters";

export default function Loading() {
  return (
    <div className="flex gap-12 p-12">
      <div>
        <div className="bg-white rounded-xl p-6 w-96">
          {/* <Filters total={0} /> */}
        </div>
      </div>

      <div className="flex-1">
        <div className="p-4">Loading...</div>
      </div>
    </div>
  );
}
