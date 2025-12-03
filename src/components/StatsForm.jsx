import { useState } from 'react';

export default function StatsForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    fieldGoalPct: '',
    threePointPct: '',
    dunks: '',
    steals: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const numFields = {
      fieldGoalPct: { min: 0, max: 100, label: 'Field Goal %' },
      threePointPct: { min: 0, max: 100, label: 'Three Point %' },
      dunks: { min: 0, max: 5, label: 'Dunks' },
      steals: { min: 0, max: 5, label: 'Steals' }
    };

    Object.keys(numFields).forEach(key => {
      const value = formData[key].trim();
      
      if (!value) {
        newErrors[key] = `${numFields[key].label} is required`;
        return;
      }

      const numValue = parseFloat(value);
      
      if (isNaN(numValue)) {
        newErrors[key] = `${numFields[key].label} must be a number`;
        return;
      }

      if (numValue < numFields[key].min || numValue > numFields[key].max) {
        newErrors[key] = `${numFields[key].label} must be between ${numFields[key].min} and ${numFields[key].max}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      const stats = {
        fieldGoalPct: parseFloat(formData.fieldGoalPct),
        threePointPct: parseFloat(formData.threePointPct),
        dunks: parseFloat(formData.dunks),
        steals: parseFloat(formData.steals)
      };
      onSubmit(stats);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fieldGoalPct" className="block text-sm font-medium text-gray-700 mb-2">
            Field Goal %
          </label>
          <input
            type="number"
            id="fieldGoalPct"
            name="fieldGoalPct"
            value={formData.fieldGoalPct}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.1"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.fieldGoalPct ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0-100"
          />
          {errors.fieldGoalPct && (
            <p className="mt-1 text-sm text-red-600">{errors.fieldGoalPct}</p>
          )}
        </div>

        <div>
          <label htmlFor="threePointPct" className="block text-sm font-medium text-gray-700 mb-2">
            Three Point %
          </label>
          <input
            type="number"
            id="threePointPct"
            name="threePointPct"
            value={formData.threePointPct}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.1"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.threePointPct ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0-100"
          />
          {errors.threePointPct && (
            <p className="mt-1 text-sm text-red-600">{errors.threePointPct}</p>
          )}
        </div>

        <div>
          <label htmlFor="dunks" className="block text-sm font-medium text-gray-700 mb-2">
            Dunks
          </label>
          <input
            type="number"
            id="dunks"
            name="dunks"
            value={formData.dunks}
            onChange={handleChange}
            min="0"
            max="5"
            step="1"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.dunks ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0-5"
          />
          {errors.dunks && (
            <p className="mt-1 text-sm text-red-600">{errors.dunks}</p>
          )}
        </div>

        <div>
          <label htmlFor="steals" className="block text-sm font-medium text-gray-700 mb-2">
            Steals
          </label>
          <input
            type="number"
            id="steals"
            name="steals"
            value={formData.steals}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.steals ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0-5"
          />
          {errors.steals && (
            <p className="mt-1 text-sm text-red-600">{errors.steals}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Analyze Playstyle
      </button>
    </form>
  );
}

