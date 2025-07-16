export interface Teacher {
  id: number;
  name: string;
}

export interface Discipline {
  id: number;
  name: string;
  hoursPerWeek: number;
  period: number; // 0-4 for 5 periods
  teacherId: number | null;
}

export interface Gene {
  period: number; // 0-4 for 5 periods
  disciplineId: number;
  teacherId: number;
  day: number; // 0 = Monday, 1 = Tuesday, ...
  hour: number; // 9, 10, 11, ...
}

export interface Chromosome {
  genes: Gene[];
  fitness: number;
}

export interface AppData {
  teachers: Teacher[];
  disciplines: Discipline[];
}

export enum AppStep {
  Input,
  Algorithm,
  Result,
}