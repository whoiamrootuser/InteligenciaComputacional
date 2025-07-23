
export class AgService {
    private pop: ScheduleSlot[];
    private tamPop: number = 50;
    private maxGen: number = 100;
    private pc: number = 0.7;
    private pm: number = 0.1;

    private notas: number[] = [];
    private slots: number = 20;




    constructor(private data: DataCourses[], private rate: number = 0.1) {
         
        this.pop = this.initialPopulation();
    }
    initialPopulation() {
        // Implementation for initial population
        // Day of the week: 0-4
        // Slots per day: 0-3
        // Periods: 0-4
        // Example: { period: 0, code: "001-POO1", teacher: "001", course: "POO1" }
        for (let i = 0; i < this.tamPop; i++) {
            const individuo: Individual = [];
            for (const teacherData of this.data) {
                for(let j = 0; j < 4; j++) { // Assuming 4 periods per day
                const aula: ScheduleSlot = {
                    period: j,
                    code: `${teacherData.teacher}-${teacherData.periods[j].courses[0]}`,    
                    
        }
  
    }

    fitnessEvaluation() {
        // Implementation for fitness evaluation
        // Example: return a score based on the number of conflicts or other criteria
        this.schedule.forEach(slot => {
            // Check for conflicts, overlaps, etc.
            console.log(`Checking slot: ${slot.period}, code: ${slot.code}, teacher: ${slot.teacher}, course: ${slot.course}`);

            let conflicts = 0;
            this.schedule.forEach((slotA, idxA) => {
                for (let idxB = idxA + 1; idxB < this.schedule.length; idxB++) {
                    const slotB = this.schedule[idxB];
                    // Conflict if same teacher and same period (teacher double-booked)
                    if (slotA.teacher === slotB.teacher && slotA.period === slotB.period) {
                        conflicts++;
                    }
                    // Conflict if same course and same period (course double-booked)
                    if (slotA.course === slotB.course && slotA.period === slotB.period) {
                        conflicts++;
                    }
                }
            });
            return -conflicts;
        });
        return 0;
    }

    selection() {
        // Implementation for selection
        // Select slots that do not have conflicts (fitness >= 0)
        const selected: ScheduleSlot[] = [];
        this.schedule.forEach(slot => {
            // Count conflicts for this slot
            let conflicts = 0;
            this.schedule.forEach(other => {
                if (slot !== other) {
                    if (slot.teacher === other.teacher && slot.period === other.period) {
                        conflicts++;
                    }
                    if (slot.course === other.course && slot.period === other.period) {
                        conflicts++;
                    }
                }
            });
            if (conflicts === 0) {
                selected.push(slot);
            }
        });
        return selected;
    }

    crossover() {
        // Implementation for crossover
        // Single-point crossover: split schedule in half and swap
        const midpoint = Math.floor(this.schedule.length / 2);
        const parent1 = this.schedule.slice(0, midpoint);
        const parent2 = this.schedule.slice(midpoint);

        const child1 = [...parent1, ...parent2];
        const child2 = [...parent2, ...parent1];

        // For demonstration, replace current schedule with one child
        this.schedule = child1;
        return [child1, child2];
    }

    mutation() {
        // Implementation for mutation
        const mutationRate = this.rate; // Use the class-level mutation rate

        this.schedule = this.schedule.map(slot => {
            if (Math.random() < mutationRate) {
                // Mutate period randomly (assuming periods 0-4)
                const newPeriod = Math.floor(Math.random() * 5);
                return { ...slot, period: newPeriod };
            }
            return slot;
        });
    }
}

type DataCourses = {
    teacher: string;
    periods: {
        id: number;
        courses: string[];
    }[];
}

type ScheduleSlot = {
    period: number;
    code: string; // Teacher-Course
    teacher: string;
    course: string;
}

type Individual = ScheduleSlot[];
