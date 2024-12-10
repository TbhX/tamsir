import { useState, useEffect } from 'react';
import { getPortfolioItems, type PortfolioItem } from '../lib/portfolio';

export function usePortfolio() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const { data, error } = await getPortfolioItems();
        
        if (error) throw new Error(error);
        if (data) setProjects(data);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch portfolio');
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, []);

  return { projects, loading, error };
}