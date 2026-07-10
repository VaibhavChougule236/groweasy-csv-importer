import { FileText, X } from "lucide-react";

interface Props {
  file: File;
  onRemove: () => void;
}

export default function FileInfo({
  file,
  onRemove,
}: Props) {
  return (
    <div className="mt-6 flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <FileText className="text-green-600" />

        <div>
          <h3 className="font-medium">{file.name}</h3>

          <p className="text-sm text-slate-500">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      </div>

      <button
        onClick={onRemove}
        className="rounded-full p-2 hover:bg-red-100"
      >
        <X className="text-red-600" />
      </button>
    </div>
  );
}