import { pageScroll } from "@/behaviors/pageScroll.behavior";
import { clickFeedbackBehavior } from "@/behaviors/clickFeedback.behavior";

const app = getApp();

Page({
  behaviors: [pageScroll, clickFeedbackBehavior],
  data: {
    loading: true,
    /** 轮播图数据 */
    swiper: {
      current: 0,
      list: [],
    },
    /** 金刚位数据 */
    diamond: [],
    /** 运营位数据 */
    operation: {},
    /** 商品列表 */
    goodsList: []
  },
  onReady() {
    const initData = {
      "swiper.list": [
        {
          img: "https://cdn.zierwa.com/photo/3.jpeg",
          bg: "#ff3300",
        },
        {
          img: "https://cdn.zierwa.com/photo/3.jpeg",
          bg: "#0000f3",
        },
        {
          img: "https://cdn.zierwa.com/photo/3.jpeg",
          bg: "#ffacff",
        },
        {
          img: "https://cdn.zierwa.com/photo/3.jpeg",
          bg: "#aaff00",
        },
      ],
      diamond: [
        {
          img: "https://cdn.zierwa.com/photo/3.jpeg",
          name: "测试1",
        },
        {
          img: "https://cdn.zierwa.com/photo/3.jpeg",
          name: "测试2",
        },
        {
          img: "https://cdn.zierwa.com/photo/3.jpeg",
          name: "测试3",
        },
        {
          img: "https://cdn.zierwa.com/photo/3.jpeg",
          name: "测试4",
        },
        {
          img: "https://cdn.zierwa.com/photo/3.jpeg",
          name: "测试5",
        },
        {
          img: "https://cdn.zierwa.com/photo/3.jpeg",
          name: "测试6",
        },
      ],
      operation: {
        type: 1,
        a: {
          img: "https://cdn.zierwa.com/photo/3.jpeg",
        },
        b: [
          {
            img: "https://cdn.zierwa.com/photo/3.jpeg",
          },
          {
            img: "https://cdn.zierwa.com/photo/3.jpeg",
          },
        ],
      },
      goodsList: [
        {
          id: 1,
          img: 'https://cdn.zierwa.com/photo/3.jpeg?a=1',
          title: '测试标题',
          originPrice: 399,
          price: 299,
          coupon: 100,
          sales: 1000
        },
        {
          id: 2,
          img: 'https://cdn.zierwa.com/photo/3.jpeg?a=2',
          title: '测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题',
          originPrice: 399,
          price: 299,
          coupon: 100,
          sales: 1000
        },
        {
          id: 3,
          img: 'https://cdn.zierwa.com/photo/3.jpeg?a=3',
          title: '测试标题',
          originPrice: 1399,
          price: 1299,
          coupon: 1000,
          sales: 1000
        },
        {
          id: 4,
          img: 'https://cdn.zierwa.com/photo/3.jpeg?a=4',
          title: '测试标题',
          originPrice: 399,
          price: 299,
          coupon: 100,
          sales: 1000
        }
      ]
    };
    this.setData(initData, () => {
      this.handleBackgroundColorTopChange();
      wx.nextTick(() => {
        this.setData({
          loading: false,
        });
      });
    });
  },
  onPageScroll(options) {
    this.handlePageScrollBehavior(options.scrollTop, 10);
  },

  handleSwiperChange(event) {
    const { current } = event.detail;
    this.setData(
      {
        "swiper.current": current,
      },
      () => {
        this.handleBackgroundColorTopChange();
      }
    );
  },

  handleBackgroundColorTopChange() {
    const item = this.data.swiper.list[this.data.swiper.current];
    wx.setBackgroundColor({
      backgroundColorTop: item.bg,
    });
  },
});
