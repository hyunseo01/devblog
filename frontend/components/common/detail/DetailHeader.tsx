type Props = {
  title: string;
  tagsOrCategory: string[] | string;
  date: string;
  badge?: string; // 예: '추천'
};

export default function DetailHeader({
  title,
  tagsOrCategory,
  date,
  badge,
}: Props) {
  return (
    <div className="flex justify-between items-start gap-2">
      <div>
        <h1 className="text-2xl font-bold mb-1">{title}</h1>
        <div className="flex gap-1 text-xs">
          {badge && (
            <span className="bg-yellow-200 text-gray-600 px-2 py-0.5 rounded font-semibold">
              {badge}
            </span>
          )}
          {Array.isArray(tagsOrCategory) ? (
            tagsOrCategory.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
              {tagsOrCategory}
            </span>
          )}
        </div>
      </div>
      <span className="text-sm text-gray-500 whitespace-nowrap">{date}</span>
    </div>
  );
}
