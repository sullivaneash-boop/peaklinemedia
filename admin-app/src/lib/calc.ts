import type { Brand, Athlete, MatchEvaluation } from '../types'

export const calculateFitScore = (brand: Brand, athlete: Athlete): Omit<MatchEvaluation, 'id' | 'createdAt'> => {
  const audienceKeywords = ['athlete', 'college', 'sport', 'student', 'young'];
  const audienceMatches = audienceKeywords.filter(keyword => 
    brand.targetAudience.toLowerCase().includes(keyword)
  ).length;
  const audienceOverlap = Math.min(100, (audienceMatches / audienceKeywords.length) * 100 + 40);

  const brandCity = brand.location.split(',')[0]?.trim().toLowerCase() || '';
  const athleteCity = athlete.location.split(',')[0]?.trim().toLowerCase() || '';
  const brandState = brand.location.split(',')[1]?.trim().toLowerCase() || '';
  const athleteState = athlete.location.split(',')[1]?.trim().toLowerCase() || '';

  let locationMatch = 0;
  if (brandCity === athleteCity) {
    locationMatch = 100;
  } else if (brandState === athleteState) {
    locationMatch = 75;
  } else {
    locationMatch = 40;
  }

  const engagementQuality = Math.min(100, (athlete.engagementRate / 6) * 100);

  const categoryMatrix: Record<string, string[]> = {
    'Apparel': ['Football', 'Basketball', 'Baseball', 'Soccer', 'Volleyball', 'Track'],
    'Nutrition': ['Football', 'Basketball', 'Track', 'Swimming', 'Wrestling'],
    'Fitness': ['Football', 'Basketball', 'Volleyball', 'Track', 'Wrestling'],
    'Technology': ['Basketball', 'Baseball', 'Soccer', 'Golf'],
    'Automotive': ['Football', 'Basketball', 'Baseball'],
    'Food & Beverage': ['Football', 'Basketball', 'Baseball', 'Soccer'],
    'Health & Wellness': ['Track', 'Swimming', 'Volleyball', 'Tennis'],
  };

  const alignedSports = categoryMatrix[brand.category] || [];
  const categoryAlignment = alignedSports.includes(athlete.sport) ? 95 : 55;

  const estimatedValue = athlete.followers * 0.25;
  const budgetDifference = Math.abs(brand.budget - estimatedValue) / (estimatedValue || 1);
  const budgetFit = Math.max(40, 100 - (budgetDifference * 50));

  const score = Math.round(
    (audienceOverlap * 0.25) +
    (locationMatch * 0.20) +
    (engagementQuality * 0.20) +
    (categoryAlignment * 0.20) +
    (budgetFit * 0.15)
  );

  const riskFactors: string[] = [];
  if (athlete.engagementRate < 2.0) {
    riskFactors.push('Low engagement rate may limit campaign effectiveness');
  }
  if (brand.budget < 3000) {
    riskFactors.push('Limited budget may restrict campaign scope');
  }
  if (athlete.followers < 5000) {
    riskFactors.push('Small audience size');
  }
  if (brand.category === 'Alcohol' || brand.category === 'Gambling') {
    riskFactors.push('CRITICAL: Prohibited category for NCAA athletes');
  }

  let explanation = '';
  if (score >= 80) explanation = `Excellent match (${score}/100). `;
  else if (score >= 65) explanation = `Strong potential (${score}/100). `;
  else explanation = `Moderate fit (${score}/100). `;

  if (locationMatch >= 90) explanation += `Both based in ${brandCity}, enabling powerful local marketing synergy. `;
  if (categoryAlignment >= 90) explanation += `${brand.category} category aligns perfectly with ${athlete.sport}. `;
  if (engagementQuality >= 80) explanation += `Outstanding ${athlete.engagementRate.toFixed(1)}% engagement rate indicates highly active, responsive audience. `;
  if (budgetFit >= 80) explanation += "Budget aligns well with athlete's market value.";

  return {
    brandId: brand.id,
    athleteId: athlete.id,
    score,
    audienceOverlap,
    locationMatch,
    engagementQuality,
    categoryAlignment,
    budgetFit,
    riskFactors,
    explanation,
  };
}
