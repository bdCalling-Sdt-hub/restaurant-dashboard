export const colorPalette = [
    "bg-orange-100 text-orange-800 border border-orange-300",
    "bg-amber-100 text-amber-800 border border-amber-300",
    "bg-yellow-100 text-yellow-800 border border-yellow-300",
    "bg-lime-100 text-lime-800 border border-lime-300",
    "bg-emerald-100 text-emerald-800 border border-emerald-300",
    "bg-teal-100 text-teal-800 border border-teal-300",
    "bg-cyan-100 text-cyan-800 border border-cyan-300",
    "bg-sky-100 text-sky-800 border border-sky-300",
    "bg-blue-100 text-blue-800 border border-blue-300",
    "bg-indigo-100 text-indigo-800 border border-indigo-300",
    "bg-violet-100 text-violet-800 border border-violet-300",
    "bg-purple-100 text-purple-800 border border-purple-300",
    "bg-fuchsia-100 text-fuchsia-800 border border-fuchsia-300",
    "bg-pink-100 text-pink-800 border border-pink-300",
    "bg-rose-100 text-rose-800 border border-rose-300",
    "bg-stone-100 text-stone-800 border border-stone-300",
    "bg-neutral-100 text-neutral-800 border border-neutral-300",
    "bg-zinc-100 text-zinc-800 border border-zinc-300",
    "bg-gray-100 text-gray-800 border border-gray-300",
    "bg-slate-100 text-slate-800 border border-slate-300",
    "bg-red-200 text-red-900 border border-red-400",
    "bg-orange-200 text-orange-900 border border-orange-400",
    "bg-amber-200 text-amber-900 border border-amber-400",
    "bg-lime-200 text-lime-900 border border-lime-400",
    "bg-green-200 text-green-900 border border-green-400",
    "bg-teal-200 text-teal-900 border border-teal-400",
    "bg-blue-200 text-blue-900 border border-blue-400",
    "bg-purple-200 text-purple-900 border border-purple-400",
];
  


export const getDiningColorClass = (diningName) => {
  const normalizedName = diningName?.trim().toLowerCase() || "";
  let hash = 0;
  for (let i = 0; i < normalizedName.length; i++) {
    hash = normalizedName.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  const index = Math.abs(hash) % colorPalette.length;
  return colorPalette[index];
};
