export type Schedule = {
    teacher: string;
    periods: Period[];
}

export type Period = {
    index: 1 | 2 | 3 | 4 | 5;
    code: string;
    title: string;
    description: string;
    disciplines: Discipline[];
}

export type Discipline = {
    code: string;
    title: string;
    description: string;
}