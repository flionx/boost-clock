import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import getTodayString from '@/shared/lib/getTodayString';
import { FALLBACK_QUOTES } from '@/features/quote/constants';

interface IQuote {
  text: string;
  author: string;
  date: string;
}

const RUSSIAN_FALLBACKS = [
  { text: "Жизнь - это то, что с тобой происходит, пока ты строишь планы", author: "Джон Леннон" },
  { text: "Будь изменением, которое хочешь видеть в мире", author: "Махатма Ганди" },
  { text: "Единственный способ делать великую работу - любить то, что ты делаешь", author: "Стив Джобс" },
];

const CACHE_DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'daily_quote.json');

async function ensureCacheDir() {
  if (!process.env.VERCEL) {
    try {
      await fs.mkdir(CACHE_DIR, { recursive: true });
    } catch (error) {
    }
  }
}

async function fetchEnglishQuote(): Promise<IQuote> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);
  
  try {
    const response = await fetch("https://favqs.com/api/qotd", { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return {
      text: data.quote.body,
      author: data.quote.author?.trim() || "Unknown",
      date: getTodayString(),
    };
  } catch {
    clearTimeout(timeoutId);
    throw new Error("English API failed");
  }
}

async function fetchRussianQuote(): Promise<IQuote> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);
  
  try {
    const response = await fetch(
      "https://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json",
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error();
    const data = await response.json();
    if (!data.quoteText?.trim()) throw new Error();
    
    return {
      text: data.quoteText,
      author: data.quoteAuthor?.trim() || "Неизвестный",
      date: getTodayString(),
    };
  } catch {
    clearTimeout(timeoutId);
    const random = RUSSIAN_FALLBACKS[Math.floor(Math.random() * RUSSIAN_FALLBACKS.length)];
    return {
      text: random.text,
      author: random.author,
      date: getTodayString(),
    };
  }
}

export async function GET() {
  try {
    await ensureCacheDir();
    const today = getTodayString();
    
    try {
      const cachedContent = await fs.readFile(CACHE_FILE, 'utf-8');
      const cached = JSON.parse(cachedContent);
      
      if (cached.en?.date === today && cached.ru?.date === today) {
        return NextResponse.json(cached);
      }
    } catch (error) {
    }
    
    const [enResult, ruResult] = await Promise.allSettled([
      fetchEnglishQuote(),
      fetchRussianQuote()
    ]);
    
    const quotes = {
      en: enResult.status === 'fulfilled' ? enResult.value : { ...FALLBACK_QUOTES.en, date: today },
      ru: ruResult.status === 'fulfilled' ? ruResult.value : { ...FALLBACK_QUOTES.ru, date: today }
    };
    
    try {
      await fs.writeFile(CACHE_FILE, JSON.stringify(quotes));
    } catch (error) {
      console.error("Failed to write cache:", error);
    }
    
    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Critical error:", error);
    const today = getTodayString();
    
    return NextResponse.json({
      en: { ...FALLBACK_QUOTES.en, date: today },
      ru: { ...FALLBACK_QUOTES.ru, date: today }
    });
  }
}