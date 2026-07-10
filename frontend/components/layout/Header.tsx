import { DatabaseZap } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-600 p-3 text-white">
            <DatabaseZap size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              AI CSV Importer
            </h1>

            <p className="text-slate-500">
              Intelligent CRM Lead Importer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}