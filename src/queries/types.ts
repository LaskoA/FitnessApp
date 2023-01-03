export interface Train {
  id: number;
  name: string;
  comment: string;
  day: number;
  muscles: number[];
  user: number;
}

export interface ApiError {
  message: string;
  status: number;
  statusText: string;
  data: Record<any, any>;
}

export interface Shape {
  height: number,
  weight: number,
  waist: number,
}

export interface Shapes {
  id: number;
  shape: Shape[];
  user: number;
}

export interface Exercise {
  id: number;
  type: string;
  info: string;
  description: string;
  video: string;
  sets: number;
  reps: number;
  timePerRep: number;
}