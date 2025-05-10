export interface EventRecommendation {
    event_id: string;
    title: string;
    description: string;
    event_type: string;
    start_date: string;
    start_time: string;
    score: number;
    score_breakdown: {
      type_preference: number;
      engagement: number;
      recency: number;
    };
  }
  
  export interface ParticipationPattern {
    most_frequent_event_type: string;
    type_distribution: { [key: string]: number };
    total_participations: number;
  }
  
  export interface RecommendationResponse {
    recommendations?: EventRecommendation[];
    participation_pattern: ParticipationPattern;
    message?: string;
    total_events?: number;
    future_events?: number;
    past_events?: number;
  }
  