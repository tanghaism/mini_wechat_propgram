import {pageScroll} from '@/behaviors/pageScroll.behavior'

const app = getApp();


Page({
  behaviors: [pageScroll],
  data: {
    swiper: {
      current: 0,
      list: [
        {
          img: 'https://cdn.zierwa.com/photo/3.jpeg',
          bg: '#ff3300'
        },
        {
          img: 'https://cdn.zierwa.com/photo/3.jpeg',
          bg: '#0000f3'
        },
        {
          img: 'https://cdn.zierwa.com/photo/3.jpeg',
          bg: '#ffacff'
        },
        {
          img: 'https://cdn.zierwa.com/photo/3.jpeg',
          bg: '#aaff00'
        }
      ]
    }
  },
  onReady(options) {
    this.handleSwiperChange({detail: {current: 0}})
  },
  onPageScroll(options) {
    this.handlePageScrollBehavior(options.scrollTop, 10)
  },

  handleSwiperChange(event){
    const {current} = event.detail;
    this.setData({
      'swiper.current': current
    }, () => {
      const item = this.data.swiper.list[this.data.swiper.current];
      wx.setBackgroundColor({
        backgroundColorTop: item.bg
      })
    })
  }
});
