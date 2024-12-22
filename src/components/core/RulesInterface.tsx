import React, { useState, useEffect } from 'react';
import { useCollectiveConsciousness } from '../../hooks/useCollectiveConsciousness';
import { useSkeletonKey } from '../../hooks/useSkeletonKey';

export function RulesInterface() {
  const [rules, setRules] = useState<string>('');
  const [newRule, setNewRule] = useState<string>('');
  const { accessKnowledge, contributeInsight } = useCollectiveConsciousness();
  const { validateKey } = useSkeletonKey();

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const response = await fetch('/src/rules/EVOLVING_RULES.md');
      const text = await response.text();
      setRules(text);
    } catch (err) {
      console.error('Failed to load rules:', err);
    }
  };

  const handleAddRule = async () => {
    if (!newRule) return;

    try {
      const result = await contributeInsight(newRule);
      if (result.accepted) {
        setRules(prev => `${prev}\n- ${newRule}`);
        setNewRule('');
      }
    } catch (err) {
      console.error('Failed to add rule:', err);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Evolving Rules</h2>

      {/* Rules Display */}
      <div className="mb-6">
        <pre className="whitespace-pre-wrap text-sm text-gray-300">
          {rules}
        </pre>
      </div>

      {/* Add New Rule */}
      <div className="space-y-4">
        <textarea
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          placeholder="Propose new rule..."
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
          rows={3}
        />
        <button
          onClick={handleAddRule}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        >
          Add Rule
        </button>
      </div>
    </div>
  );
}