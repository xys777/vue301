import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import UserDetail from "../UserDetail.vue";
// import sinon from 'sinon'
test("renders properly", () => {
  const wrapper = mount(UserDetail, {
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
  expect(wrapper.get('[data-test="form"]')).toBeDefined();
  expect(wrapper.text()).toContain("Address");
});
