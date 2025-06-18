import { ActionFlowAbstractBuilder } from "../action-flow-builder/action-flow.abstract.builder";
import { Schedule } from "../../entity/schedules.entity";

export class Mutation extends ActionFlowAbstractBuilder<Schedule> {
    constructor(generation: number, data: Array<Schedule>) {
        super(generation, data);
    }

    mutation(): ActionFlowAbstractBuilder<Schedule> {
        // Implement concrete logic for mutating schedules
        console.log("Mutating schedules", this.data);
        return this;
        
    }
}