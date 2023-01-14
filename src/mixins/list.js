module.exports = {
  data() {
    return {
      downOption: {
        textLoading: '',
        textInOffset: '',
        textOutOffset: '',
        textSuccess: '',
        textErr: '',
        textColor: '#FF77BB',
        offset: 60,
      },
      upOption: {
        empty: {
          use: true,
          // icon: require('@/static/images/empty.png'),
          tip: '暂无数据',
        },
        textLoading: '',
        textColor: '#FF77BB',
        textNoMore: '',
        noMoreSize: 1,
        onScroll: true,
      },
    }
  },
}
