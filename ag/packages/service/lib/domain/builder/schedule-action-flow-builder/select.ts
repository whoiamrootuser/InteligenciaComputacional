import { Schedule } from "../../entity/schedules.entity";
import { ActionFlowAbstractBuilder } from "../action-flow-builder/action-flow.abstract.builder";

export class Select extends ActionFlowAbstractBuilder<Schedule> {

   select(max: number): ActionFlowAbstractBuilder<Schedule> {
    const selected = this.data.slice(0, max);
    return this;
  }
}