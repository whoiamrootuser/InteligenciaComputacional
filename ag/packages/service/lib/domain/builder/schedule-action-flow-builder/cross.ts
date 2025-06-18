import { ActionFlowAbstractBuilder } from "../action-flow-builder/action-flow.abstract.builder";
import { Schedule } from "../../entity/schedules.entity";

export class Cross extends ActionFlowAbstractBuilder<Schedule> {
    constructor(generation: number, data: Array<Schedule>) {
        super(generation, data);
    }

    cross(): ActionFlowAbstractBuilder<Schedule> {
        // Implement concrete logic for crossover operations
        console.log("Performing crossover on schedules", this.data);
        return this;
    }
}