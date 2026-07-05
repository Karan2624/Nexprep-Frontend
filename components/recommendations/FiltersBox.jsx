const DifficultyPill = ({ label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${
      isActive 
        ? 'bg-white border-blue-400 text-blue-600 shadow-sm' 
        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
    }`}
  >
    {label}
  </button>
);

export default function FiltersBox({ activeDifficulty, setActiveDifficulty }) {
  return (
    <div className="bg-linear-to-br from-[#F8FAFF] to-[#EBF2FC] border border-blue-100/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Filters</h2>
      <hr className="border-blue-100/60 mb-6"/>
      
      <div className="mb-4">
        <h3 className="text-[13px] font-semibold text-slate-900 mb-4">Difficulty</h3>
        <div className="flex flex-wrap gap-2">
          {['Easy', 'Medium', 'Hard'].map(diff => (
            <DifficultyPill 
              key={diff} 
              label={diff} 
              isActive={activeDifficulty === diff} 
              onClick={() => setActiveDifficulty(diff)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}