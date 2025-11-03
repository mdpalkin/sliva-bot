import fs from 'fs';
import path from 'path';

const filePath = path.resolve('reviews.json');

export interface Review {
  userId: number;
  username?: string;
  text: string;
  date: string;
}

export function getReviews(): Review[] {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data || '[]');
}

export function addReview(review: Review): void {
  const reviews = getReviews();
  reviews.push(review);
  fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));
}
