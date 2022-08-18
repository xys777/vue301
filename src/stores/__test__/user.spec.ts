import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useUserStore } from "../user";
import { vi } from "vitest";
const fetchMock = vi.fn();

vi.stubGlobal("fetch", fetchMock);

describe("User Store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it("fetchUsers", async () => {
    const user = useUserStore();
    fetchMock.mockReturnValue(
      Promise.resolve({ json: () => Promise.resolve([{}, {}]) })
    );
    expect(user.userList).toHaveLength(0);
    await user.fetchUsers();
    expect(user.userList.length).toBe(2);
  });

  it("updateUser", async () => {
    const user = useUserStore();
    user.selectedUser = { id: 1 } as any;
    user.updateUser();
    expect(user.selectedUser).toStrictEqual({
      id: 1,
      name: "",
      username: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        suite: "",
        zipcode: "",
      },
      company: {
        name: "",
        bs: "",
        catchPhrase: "",
      },
    });
  });

  it("addUser", () => {
    const user = useUserStore();
    expect(user.userList).toHaveLength(0);
    user.addUser();
    expect(user.userList.length).toBe(1);
  });
  it("delUser", () => {
    const user = useUserStore();
    user.userList = [{ id: 1 } as any, { id: 2 } as any, { id: 3 } as any];
    user.selectedUser = { id: 2 } as any;
    user.delUser();
    expect(user.userList).toStrictEqual([{ id: 1 }, { id: 3 }]);
  });
});
