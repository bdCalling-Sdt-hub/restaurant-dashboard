const bgColorMap = [
  { bg: "bg-red-100", text: "text-red-700" },
  { bg: "bg-orange-100", text: "text-orange-700" },
  { bg: "bg-yellow-100", text: "text-yellow-700" },
  { bg: "bg-green-100", text: "text-green-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-lime-100", text: "text-lime-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
  { bg: "bg-sky-100", text: "text-sky-700" },
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-stone-100", text: "text-stone-700" },
  { bg: "bg-gray-100", text: "text-gray-700" },
  { bg: "bg-zinc-100", text: "text-zinc-700" },
  { bg: "bg-neutral-100", text: "text-neutral-700" },
  { bg: "bg-slate-100", text: "text-slate-700" },
  { bg: "bg-red-200", text: "text-red-800" },
  { bg: "bg-orange-200", text: "text-orange-800" },
  { bg: "bg-yellow-200", text: "text-yellow-800" },
  { bg: "bg-green-200", text: "text-green-800" },
  { bg: "bg-blue-200", text: "text-blue-800" },
  { bg: "bg-purple-200", text: "text-purple-800" },
  { bg: "bg-pink-200", text: "text-pink-800" },
  { bg: "bg-indigo-200", text: "text-indigo-800" },
  { bg: "bg-rose-200", text: "text-rose-800" }
];

const getColorClassForDate = (date) => {
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash += date.charCodeAt(i);
  }
  const index = hash % bgColorMap.length;
  return bgColorMap[index];
};

export default getColorClassForDate;