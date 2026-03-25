import { Film } from "lucide-react";

function EmptyState({ title = "No movies found", description = "Please check back later." }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300">
        <Film className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>
    </div>
  );
}

export default EmptyState;
