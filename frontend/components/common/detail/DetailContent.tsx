export default function DetailContent({ content }: { content: string }) {
  return (
    <div className="whitespace-pre-wrap bg-gray-50 text-sm text-gray-800 rounded p-4">
      {content}
    </div>
  );
}
