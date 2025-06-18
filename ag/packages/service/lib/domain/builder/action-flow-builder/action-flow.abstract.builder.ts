import { ActionFlowService } from "../schedule-action-flow-builder/action-flow.service";

export abstract class ActionFlowAbstractBuilder<T> {
  protected sourceData: T[];
  protected generation: number;
  protected transformedData: string[][] | undefined;
  public targetData: string[][] | undefined; 

  constructor(generation: number , sourceData: Array<T>) {
    this.sourceData = sourceData;
    this.generation = generation;
  }

  populate(): ActionFlowService<T> {
    throw new Error("Method not implemented.");
  }

  avaliation(): ActionFlowService<T> {
    throw new Error("Method not implemented.");
  }

  ordering(): ActionFlowService<T> {
    throw new Error("Method not implemented.");
  }
  select(max: number): ActionFlowService<T> {
    throw new Error("Method not implemented.");
  }
  cross(): ActionFlowService<T> {
    throw new Error("Method not implemented.");
  }
  mutation(): ActionFlowService<T> {
    throw new Error("Method not implemented.");
  }


  public get data(): string[][] {
    if(this.targetData) {
      return this.targetData;
    }
    throw new Error("Transformed data is not set. Please call the appropriate method to set it.");
  }
}
