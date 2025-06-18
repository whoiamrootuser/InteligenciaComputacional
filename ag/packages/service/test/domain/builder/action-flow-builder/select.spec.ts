import { Select } from "../../../../lib/domain/builder/schedule-action-flow-builder/select";
import { expect } from "chai";

describe(Select.name, () => {
    let sut: Select;

    beforeEach(() => {
        sut = new Select(1, []);
    });

    it("should be defined", () => {
        expect(Select).to.not.be.undefined;
    });
});