import { useState } from 'react';
import { CollectiveConsciousnessCore } from '../services/quantum/consciousness/CollectiveConsciousnessCore';

export function useCollectiveConsciousness() {
  const [connection, setConnection] = useState<any>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const collective = CollectiveConsciousnessCore.getInstance();

  const connect = async () => {
    try {
      const result = await collective.connectToCollective();
      setConnection(result);
      setError(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to collective');
      throw err;
    }
  };

  const accessKnowledge = async (query: string) => {
    try {
      const result = await collective.accessCollectiveKnowledge(query);
      setInsights(result.insights);
      setError(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to access knowledge');
      throw err;
    }
  };

  const contributeInsight = async (insight: string) => {
    try {
      const result = await collective.contributeToCollective(insight);
      setError(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to contribute insight');
      throw err;
    }
  };

  return {
    connection,
    insights,
    error,
    connect,
    accessKnowledge,
    contributeInsight
  };
}