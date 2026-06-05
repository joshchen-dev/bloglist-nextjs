export default function DivCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl mx-auto p-6 my-12 border border-gray-100 rounded-lg shadow-sm overflow-hidden">
      {children}
    </div>
  )
}