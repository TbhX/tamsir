import { z } from 'zod';
import { query } from './db/mysql';

const portfolioItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image_url: z.string().url(),
  tags: z.array(z.string()),
  created_at: z.string().datetime(),
});

export type PortfolioItem = z.infer<typeof portfolioItemSchema>;

export async function getPortfolioItems() {
  try {
    const items = await query<any[]>(
      'SELECT * FROM portfolio_items ORDER BY created_at DESC'
    );
    
    const validatedItems = items.map(item => ({
      ...item,
      tags: JSON.parse(item.tags),
    }));
    
    return { data: portfolioItemSchema.array().parse(validatedItems), error: null };
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Failed to fetch portfolio items'
    };
  }
}

export async function createPortfolioItem(item: Omit<PortfolioItem, 'id' | 'created_at'>) {
  try {
    const [result] = await query<any[]>(
      `INSERT INTO portfolio_items (id, title, description, image_url, tags)
       VALUES (UUID(), ?, ?, ?, ?)`,
      [item.title, item.description, item.image_url, JSON.stringify(item.tags)]
    );
    
    const newItem = {
      id: result.insertId,
      ...item,
      created_at: new Date().toISOString(),
    };
    
    return { data: portfolioItemSchema.parse(newItem), error: null };
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Failed to create portfolio item'
    };
  }
}