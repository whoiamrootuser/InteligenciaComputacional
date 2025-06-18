import { Schedule } from "../../entity/schedules.entity";
import { ActionFlowAbstractBuilder } from "../action-flow-builder/action-flow.abstract.builder";
import { ActionFlowService } from "./action-flow.service";
import { Avaliation } from "./avaliation";

export class Populate extends ActionFlowAbstractBuilder<Schedule> {
  constructor(generation: number, sourceData: Array<Schedule>) {
    super(generation, sourceData);
  }

  populate(): ActionFlowAbstractBuilder<Schedule> {
    return this;
  }

  next(): ActionFlowService<Schedule> {
      return new Avaliation(this.generation, this.sourceData);
  }
}