import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Grid from "../SimpleGrid.vue";
describe("renders a grid", () => {
  it("renders empty", () => {
    const wrapper = mount(Grid, { props: { data: [], columns: [] } });
    expect(wrapper.get('[data-test="empty"]')).toBeDefined();
    expect(wrapper.text()).toContain("No matches found.");
  });
  it("renders no columns", () => {
    const wrapper = mount(Grid, { props: { data: [{ id: 1 }], columns: [] } });
    const titleEle = wrapper.get('[data-test="title"]');
    expect(titleEle).toBeDefined();
    expect(titleEle.text()).toBe("");
  });
  it("renders columns and rows", () => {
    const wrapper = mount(Grid, {
      props: {
        data: [
          { id: 1, name: "Evans" },
          { id: 2, name: "Gavin" },
        ],
        columns: ["id", "name"],
      },
    });
    const titleEle = wrapper.get('[data-test="title"]');
    expect(titleEle).toBeDefined();
    const colEle = wrapper.get('[data-test="column:id"]');
    expect(colEle.text()).toBe("Id");
    expect(wrapper.findAll('[data-test^="row:"]')).toHaveLength(2);
    expect(wrapper.get('[data-test="row:0"]').text()).toBe("1Evans");
    expect(wrapper.get('[data-test="row:1"]').text()).toBe("2Gavin");
  });
  it("renders properly if set filter", () => {
    const wrapper = mount(Grid, {
      props: {
        data: [
          { id: 1, name: "Evans" },
          { id: 2, name: "Gavin" },
        ],
        columns: ["id", "name"],
        filterKey: "gav",
      },
    });
    const titleEle = wrapper.get('[data-test="title"]');
    expect(titleEle).toBeDefined();
    const colEle = wrapper.get('[data-test="column:id"]');
    expect(colEle.text()).toBe("Id");
    expect(wrapper.findAll('[data-test^="row:"]')).toHaveLength(1);
    expect(wrapper.get('[data-test="row:0"]').text()).toBe("2Gavin");
  });
});

describe("test sort grid", () => {
  let wrapper: VueWrapper<any>;
  beforeEach(() => {
    wrapper = mount(Grid, {
      props: {
        data: [
          { id: 1, name: "Evans" },
          { id: 2, name: "Gavin" },
        ],
        columns: ["id", "name"],
      },
    });
  });
  it("should sort data after click", async () => {
    const idCol = wrapper.get('[data-test="column:id"]');
    expect(idCol).toBeDefined();
    await idCol.trigger("click");
    expect(wrapper.get('[data-test="row:0"]').text()).toBe("2Gavin");
    expect(wrapper.get('[data-test="row:1"]').text()).toBe("1Evans");
    await idCol.trigger("click");
    expect(wrapper.get('[data-test="row:0"]').text()).toBe("1Evans");
    expect(wrapper.get('[data-test="row:1"]').text()).toBe("2Gavin");
  });
});
