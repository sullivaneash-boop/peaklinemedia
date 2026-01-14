export interface Brand {
  id: string;
  name: string;
  category: string;
  location: string;
  budget: number;
  targetAudience: string;
  description: string;
  createdAt: string;
}

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  school: string;
  location: string;
  followers: number;
  engagementRate: number;
  bio: string;
  createdAt: string;
}

export interface MatchEvaluation {
  id: string;
  brandId: string;
  athleteId: string;
  score: number;
  audienceOverlap: number;
  locationMatch: number;
  engagementQuality: number;
  categoryAlignment: number;
  budgetFit: number;
  riskFactors: string[];
  explanation: string;
  createdAt: string;
}

export interface Deal {
  id: string;
  brandId: string;
  athleteId: string;
  status: 'pending' | 'active' | 'completed';
  value: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}
