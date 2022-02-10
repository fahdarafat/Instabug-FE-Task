import PerformanceFilterComponent from "../performance-filter";
import { shallowMount, createLocalVue  } from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue()

localVue.use(Vuex);

describe('Actions.vue', () => {

  beforeEach(() => {
    let actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    let store = new Vuex.Store({
      actions
    })
  })
  describe('Filter Component', () => {
    // Inspect the raw component options
    it('has data', () => {
      expect(typeof PerformanceFilterComponent.data).toBe('function')
    })
    it("Should trigger action", () => {
      const wrapper = shallowMount(PerformanceFilterComponent);
      expect(wrapper.exists()).toBe(true)
    })
  })
})


