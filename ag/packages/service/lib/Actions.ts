export interface ActionFlow<T> {
    data: Array<T>;
    generate (): void;
    avaliation (): void;
    select (max: number): void;

}