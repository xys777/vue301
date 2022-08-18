import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import UserDetail from "../UserDetail.vue";
import { useUserStore } from "@/stores/user";
import { vi } from "vitest";

// import sinon from 'sinon'
test("renders properly", () => {
  const wrapper = mount(UserDetail, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            user: {
              selectedUser: {
                id: 6,
                name: "Mrs. Dennis Schulist",
                username: "Leopoldo_Corkery",
                email: "Karley_Dach@jasper.info",
                address: {
                  street: "Norberto Crossing",
                  suite: "Apt. 950",
                  city: "South Christy",
                  zipcode: "23505-1337",
                  geo: {
                    lat: "-71.4197",
                    lng: "71.7478",
                  },
                },
                phone: "1-477-935-8478 x6430",
                website: "ola.org",
                company: {
                  name: "Considine-Lockman",
                  catchPhrase: "Synchronised bottom-line interface",
                  bs: "e-enable innovative applications",
                },
              },
            },
          },
        }),
      ],
    },
  });
  expect(wrapper.get('[data-test="form"]')).toBeDefined();
  expect(wrapper.text()).toContain("Address");
});

test("renders empty data", () => {
  const wrapper = mount(UserDetail, {
    global: {
      plugins: [createTestingPinia()],
    },
  });
  const store = useUserStore(); // uses the testing pinia!
  vi.spyOn(store, "userDetail", "get").mockReturnValue(null as any);

  expect(wrapper.get('[data-test="form"]')).toBeDefined();
  expect(wrapper.text()).toContain("Address");
});
