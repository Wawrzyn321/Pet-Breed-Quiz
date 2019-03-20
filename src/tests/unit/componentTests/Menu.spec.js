import Menu from "@/components/Menu";
import { shallowMount } from "@vue/test-utils";
import { Categories, AppState } from "@/utility/enums";

describe("Menu", () => {
  it("emits cat quiz request on clicking on left half", () => {
    const wrapper = shallowMount(Menu, {
      propsData: { state: AppState.Menu }
    });

    wrapper.find(".half.half-left").trigger("click");

    expect(wrapper.emitted()).toEqual({
      "quiz-requested": [[Categories.Cats]]
    });
  });

  it("emits dog quiz request on clicking on right half", () => {
    const wrapper = shallowMount(Menu, {
      propsData: { state: AppState.Menu }
    });

    wrapper.find(".half.half-right").trigger("click");

    expect(wrapper.emitted()).toEqual({
      "quiz-requested": [[Categories.Dogs]]
    });
  });

  it("emits both quiz request on clicking on center", () => {
    const wrapper = shallowMount(Menu, {
      propsData: { state: AppState.Menu }
    });

    wrapper.find(".center-button").trigger("click");

    expect(wrapper.emitted()).toEqual({
      "quiz-requested": [[Categories.Both]]
    });
  });
});
