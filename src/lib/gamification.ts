export const REWARDS = { lesson: 1, flashcards: 2, quiz: 5, pastpaper: 5 } as const;
export const PASS_PERCENT = 80;

export const RANKS = [
  { name: "Bronze", min: 0, color: "#D97706" },
  { name: "Silver", min: 1000, color: "#CBD5E1" },
  { name: "Gold", min: 2500, color: "#FBBF24" },
  { name: "Platinum", min: 5000, color: "#67E8F9" },
  { name: "Champion", min: 8000, color: "#F472B6" },
] as const;

export function rankFor(coins: number) {
  return [...RANKS].reverse().find((r) => coins >= r.min) ?? RANKS[0];
}

export function nextRank(coins: number) {
  return RANKS.find((r) => r.min > coins) ?? null;
}

export const BADGES = [
  { code: "first_note", title: "First Lesson", description: "Complete your first lesson note.", icon: "book-open" },
  { code: "first_quiz", title: "Quiz Rookie", description: "Pass your first quiz.", icon: "circle-help" },
  { code: "first_flashcards", title: "Card Flipper", description: "Complete a full flashcard set.", icon: "layers" },
  { code: "five_lessons", title: "Study Streak Hero", description: "Complete 5 lessons.", icon: "library" },
  { code: "three_quizzes", title: "Quiz Champion", description: "Pass 3 quizzes.", icon: "trophy" },
  { code: "exam_explorer", title: "Exam Explorer", description: "Pass a past-paper practice set.", icon: "scroll-text" },
  { code: "seven_day_streak", title: "7 Day Streak", description: "Keep learning for seven days in a row.", icon: "flame" },
  { code: "gold_rank", title: "Gold Rank", description: "Reach Gold rank with your coin haul.", icon: "crown" },
  { code: "coin_miner", title: "Coin Miner", description: "Earn 20 coins from study activities.", icon: "coins" },
] as const;

export const PROVINCES = [
  "Western",
  "Central",
  "Southern",
  "Northern",
  "Eastern",
  "North Western",
  "North Central",
  "Uva",
  "Sabaragamuwa",
] as const;

export const REWARD_SHOP = [
  { title: "Scholar Panda Outfit", description: "Equip a study look", cost: 450, icon: "shirt" },
  { title: "Cool Violet Theme", description: "Premium purple glow", cost: 800, icon: "palette" },
  { title: "Gold Profile Frame", description: "Shine on the ranks", cost: 650, icon: "frame" },
  { title: "Exam Coach Stickers", description: "Chat flair pack", cost: 300, icon: "sticker" },
] as const;

export type CompletionKind = keyof typeof REWARDS;
