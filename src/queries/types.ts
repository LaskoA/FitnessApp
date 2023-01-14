export interface TrainDay {
  id: number;
  day: string;
}

export interface Muscle {
  id: number;
  title: string;
}

export interface Train {
  id: number;
  name: string;
  comment: string;
  day: TrainDay;
  muscles: Muscle[];
  user: number;
  program: number;
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
  rest: number;
  timePerRep: number;
}

export interface Program {
  id: number;
  name: string;
  difficulty: string;
  exercise_id: number[];
}

export interface MyTrain {
  date: number | Date;
  // timeStamp?: number; 
  program: number;
  name: string;
  user: number;
  id?: number;
  comment: string;
}
