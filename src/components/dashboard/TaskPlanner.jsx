import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { CheckSquare, Square, Plus, Sparkles, AlertCircle } from 'lucide-react';

export default function TaskPlanner() {
  const { tasks, toggleTask, addTask } = useAgriculture();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newPriority, setNewPriority] = useState('Medium');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask({
      title: newTitle,
      category: newCategory,
      priority: newPriority,
      dueDate: 'Today'
    });
    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md space-y-4">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-emerald-400" />
          <h3 className="font-serif font-bold text-base text-white">AI Farm Task Planner</h3>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 rounded-xl bg-emerald-800/60 hover:bg-emerald-700/80 text-emerald-100 text-xs font-semibold flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
              task.completed
                ? 'bg-emerald-950/30 border-emerald-900/40 opacity-60'
                : 'bg-emerald-900/40 border-emerald-800/40 hover:border-emerald-700/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <button className="text-emerald-400 shrink-0">
                {task.completed ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
              </button>
              <div>
                <p className={`text-xs font-semibold ${task.completed ? 'line-through text-emerald-400/60' : 'text-emerald-100'}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-emerald-400 font-medium">{task.category}</span>
                  <span className="text-[10px] text-emerald-600">•</span>
                  <span className="text-[10px] text-emerald-300">{task.dueDate}</span>
                  {task.recommendedByAi && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      <Sparkles className="w-2.5 h-2.5" /> AI Recommended
                    </span>
                  )}
                </div>
              </div>
            </div>

            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                task.priority === 'High'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : task.priority === 'Medium'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-emerald-950 border border-emerald-700 p-6 rounded-2xl max-w-md w-full space-y-4">
            <h4 className="font-serif font-bold text-lg text-white">Create New Farm Task</h4>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-emerald-300">Task Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Apply Bio-fertilizer to Field A1"
                  className="w-full mt-1 bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2.5 text-xs text-white placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-emerald-300">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full mt-1 bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="General">General</option>
                    <option value="Pesticide">Pesticide</option>
                    <option value="Fertilizer">Fertilizer</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="Hardware">Hardware</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-emerald-300">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full mt-1 bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-900 text-emerald-200 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
