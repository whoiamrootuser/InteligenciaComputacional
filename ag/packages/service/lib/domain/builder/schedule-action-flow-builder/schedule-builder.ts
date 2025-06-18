import { Schedule } from "../../entity/schedules.entity";
import { ActionFlowAbstractBuilder } from "../action-flow-builder/action-flow.abstract.builder";
import { ActionFlowService } from "./action-flow.service";
import { Populate } from "./populate";

export class ScheduleActionFlowFactory {
  private currentAction: ActionFlowService<Schedule>;

  constructor() {
    this.currentAction = new Populate(0, []);
  }

  execute(): ActionFlowService<Schedule> | void {
    this.currentAction = this.currentAction.next();
    if (this.currentAction) {
      this.execute();
    }
    return;
  }
}
