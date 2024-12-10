import { sql } from '@vercel/postgres';
import { z } from 'zod';

// Schema validation
const portfolioSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image_url: z.string().url(),
  tags: z.array(z.string()),
  created_at: z.string().datetime()
});

const portfolioArraySchema = z.array(portfolioSchema);

export type Portfolio = z.infer<typeof portfolioSchema>;

// Portfolio queries
export async function getPortfolioItems() {
  try {
    const { rows } = await sql`
      SELECT * FROM portfolio 
      ORDER BY created_at DESC
    `;
    
    const validatedData = portfolioArraySchema.parse(rows);
    return { data: validatedData, error: null };
  } catch (error) {
    console.error('Database error:', error);
    return { data: null, error: 'Failed to fetch portfolio items' };
  }
}

export async function createPortfolioItem(item: Omit<Portfolio, 'id' | 'created_at'>) {
  try {
    const { rows } = await sql`
      INSERT INTO portfolio (title, description, image_url, tags)
      VALUES (${item.title}, ${item.description}, ${item.image_url}, ${item.tags})
      RETURNING *
    `;
    
    const validatedData = portfolioSchema.parse(rows[0]);
    return { data: validatedData, error: null };
  } catch (error) {
    console.error('Database error:', error);
    return { data: null, error: 'Failed to create portfolio item' };
  }
}

export async function updatePortfolioItem(id: string, item: Partial<Portfolio>) {
  try {
    const { rows } = await sql`
      UPDATE portfolio
      SET 
        title = COALESCE(${item.title}, title),
        description = COALESCE(${item.description}, description),
        image_url = COALESCE(${item.image_url}, image_url),
        tags = COALESCE(${item.tags}, tags)
      WHERE id = ${id}
      RETURNING *
    `;
    
    const validatedData = portfolioSchema.parse(rows[0]);
    return { data: validatedData, error: null };
  } catch (error) {
    console.error('Database error:', error);
    return { data: null, error: 'Failed to update portfolio item' };
  }
}

export async function deletePortfolioItem(id: string) {
  try {
    await sql`
      DELETE FROM portfolio
      WHERE id = ${id}
    `;
    return { error: null };
  } catch (error) {
    console.error('Database error:', error);
    return { error: 'Failed to delete portfolio item' };
  }
}

// Auth queries
export async function verifyAdmin(email: string, password: string) {
  const ADMIN_EMAIL = process.env.VITE_ADMIN_EMAIL || 'admin@tamsir.fr';
  const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD || 'zeus';
  
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}