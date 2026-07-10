interface Props {
  imported: number;
  skipped: number;
}

export default function ImportStats({
  imported,
  skipped,
}: Props) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-6">

      <div className="rounded-xl bg-green-50 p-6">

        <h3 className="text-sm text-green-700">
          Imported
        </h3>

        <p className="mt-2 text-3xl font-bold text-green-800">
          {imported}
        </p>

      </div>

      <div className="rounded-xl bg-red-50 p-6">

        <h3 className="text-sm text-red-700">
          Skipped
        </h3>

        <p className="mt-2 text-3xl font-bold text-red-800">
          {skipped}
        </p>

      </div>

    </div>
  );
}