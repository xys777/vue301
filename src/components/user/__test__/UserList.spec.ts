import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import UserList from "../UserList.vue";
describe("renders user list", () => {
  it("renders ui", () => {
    const wrapper = mount(UserList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              counter: { n: 20 }, // start the counter at 20 instead of 0
            },
          }),
        ],
      },
    });
    expect(wrapper.get('[data-test="userlist"]')).toBeDefined();
    expect(wrapper.text()).toContain("Search");
  });
});
