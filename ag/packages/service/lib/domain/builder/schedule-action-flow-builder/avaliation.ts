import { ActionFlowAbstractBuilder } from "../action-flow-builder/action-flow.abstract.builder";
import { Schedule } from "../../entity/schedules.entity";

export class Avaliation extends ActionFlowAbstractBuilder<Schedule> {
    constructor(generation: number, data: Array<Schedule>) {
        super(generation, data);
    }

    avaliation(): ActionFlowAbstractBuilder<Schedule> {
        // Implement concrete logic for evaluating schedules
        console.log("Evaluating schedules", this.data);
        return this;
    }
}