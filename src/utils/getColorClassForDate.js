
const colorClasses = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
    "bg-red-100 text-red-700",
    "bg-purple-100 text-purple-700"
  ];

const getColorClassForDate = (date) => {
    // Simple hash based on char codes
    const hash = date.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = hash % colorClasses.length;
    return colorClasses[colorIndex];
};

export default getColorClassForDate;