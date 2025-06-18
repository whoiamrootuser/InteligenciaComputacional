export interface ScheduleRepository<T> {
    getSchedules(): Promise<T[]>;
}