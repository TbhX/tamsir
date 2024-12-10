import { createHash, randomBytes } from 'crypto';
import { config } from './config';

const RATE_LIMIT_DURATION = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30; // Maximum requests per minute

interface RateLimitEntry {
  count: number;
  timestamp: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - entry.timestamp > RATE_LIMIT_DURATION) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return true;
};

export const validateCaptcha = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `response=${token}&secret=${config.hcaptcha.secretKey}`,
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Captcha validation error:', error);
    return false;
  }
};

export const isBot = (userAgent: string): boolean => {
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /headless/i,
    /selenium/i,
    /puppet/i,
  ];
  
  return botPatterns.some(pattern => pattern.test(userAgent));
};

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256')
    .update(password + salt)
    .digest('hex');
  return `${salt}:${hash}`;
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const [salt, storedHash] = hashedPassword.split(':');
  const hash = createHash('sha256')
    .update(password + salt)
    .digest('hex');
  return hash === storedHash;
}