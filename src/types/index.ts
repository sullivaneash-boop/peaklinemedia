export type BodyRegion =
  | "neck"
  | "shoulder-left"
  | "shoulder-right"
  | "upper-back"
  | "lower-back"
  | "chest"
  | "abdomen"
  | "hip-left"
  | "hip-right"
  | "knee-left"
  | "knee-right"
  | "ankle-left"
  | "ankle-right"
  | "hamstring-left"
  | "hamstring-right"
  | "quad-left"
  | "quad-right";

export type Symptom =
  | "tight"
  | "sore"
  | "stiff"
  | "weak"
  | "painful"
  | "swollen"
  | "cramping"
  | "numb";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type ExerciseCategory =
  | "stretching"
  | "strength"
  | "mobility"
  | "recovery";

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  difficulty: Difficulty;
  target_regions: BodyRegion[];
  duration_seconds: number;
  sets: number;
  instructions: string[];
  video_url?: string;
  thumbnail_url?: string;
  created_at: string;
}

export interface Routine {
  id: string;
  user_id: string;
  exercises: Exercise[];
  regions: BodyRegion[];
  symptoms: Symptom[];
  completed_at?: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  streak: number;
  routines_completed: number;
  created_at: string;
}
