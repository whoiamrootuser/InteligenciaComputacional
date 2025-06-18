import { ActionFlowAbstractBuilder } from "../action-flow-builder/action-flow.abstract.builder";
import { Schedule } from "../../entity/schedules.entity";

export class Ordering extends ActionFlowAbstractBuilder<Schedule> {
    constructor(generation: number, data: Array<Schedule>) {
        super(generation, data);
    }

    ordering(): ActionFlowAbstractBuilder<Schedule> {
        // Implement concrete logic for ordering schedules
        this.data.sort(() => 0); // placeholder sort
        console.log("Ordering schedules", this.data);
        return this;

    }
}