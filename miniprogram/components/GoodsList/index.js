// components/GoodsList/index.js
import { clickFeedbackBehavior } from "@/behaviors/clickFeedback.behavior";

Component({
  behaviors: [clickFeedbackBehavior],
  /**
   * 组件的属性列表
   */
  options: {
    /** 引用页面样式影响组件内样式 */
    styleIsolation: 'apply-shared'
  },
  properties: {
    list: {
      type: Array,
      value: []
    },
    loading: {
      type: Boolean,
      value: true
    },
    finished: {
      type: Boolean,
      value: false
    },
    isPage: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClickGoodsItem(event){
      const { item } = event.currentTarget.dataset || {};
      this.handleClickFeedback({
        type: 0,
        path: `/shop/detail/index?id=${item.id}`
      })
    },
    handleToThirdApp(event){
      const { item } = event.currentTarget.dataset || {};
      this.handleClickFeedback({
        type: 0,
        path: `/shop/detail/index?id=${item.id}`
      })
    }
  }
})
