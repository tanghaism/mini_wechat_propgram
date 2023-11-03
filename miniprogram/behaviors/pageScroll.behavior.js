export const pageScroll = Behavior({
  data: {
    isScrollToMaxNumber: false
  },
  methods: {
    handlePageScrollBehavior(scrollTop, maxNumber, cb){
      if(scrollTop > maxNumber && !this.data.isScrollToMaxNumber) {
        const params = {
          isScrollToMaxNumber: true,
          ...(cb ? cb(true) : {})
        }
        this.setData(params)
      }else if(scrollTop <= maxNumber && this.data.isScrollToMaxNumber) {
        const params = {
          isScrollToMaxNumber: false,
          ...(cb ? cb(false) : {})
        }
        this.setData(params)
      }
    }
  }
})