
export interface ActionFlowService<T> {
    execute(): ActionFlowService<T>;
    next(): ActionFlowService<T>;
    get data(): string[][];
}