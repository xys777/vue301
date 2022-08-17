import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import TextField from "../TextField.vue";
describe("renders a text field", () => {
  it("renders empty", () => {
    const wrapper = mount(TextField, { props: {  } });
    expect(wrapper.get('label')).toBeDefined();
    expect(wrapper.get('input')).toBeDefined();
    expect(wrapper.text()).toBe("");
  });
});

describe("test value change",  () => {
  let parent: VueWrapper<any> ;
  beforeEach(()=>{
    parent = mount({
      data() { return { value:'test value' }  },
      template: '<TextField v-model="value"></TextField>',
      components: {TextField }
    });
  })
  it("should change value after input",async () => {
    const input = parent.find('input');
    expect(input.element.value).toBe('test value');
    input.setValue ( 'test new ')
    await input.trigger('input')    
    expect(parent.vm.value).toBe('test new ');
  });
});