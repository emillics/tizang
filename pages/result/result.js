// pages/result/result.js
Page({
  data: {
    result: {},
    isBackPressed: true //是否按了返回键
  },

  onLoad: function (options) {
    if (options.result) {
      try {
        this.setData({
          result: JSON.parse(options.result)
        })
      } catch (e) {
        console.error('解析结果数据失败', e)
        wx.showToast({
          title: '数据解析错误',
          icon: 'none'
        })
      }
    }
  },

  // 格式化答案显示
  formatAnswer: function(answer) {
    if (!answer) {
      return '无';
    }
    if (Array.isArray(answer)) {
      if (answer.length === 0) {
        return '无';
      }
      return answer.join(', ');
    } else {
      return String(answer);
    }
  },

  // 判断选项是否为正确答案
  isCorrectOption: function(correctAnswer, optionId) {
    if (Array.isArray(correctAnswer)) {
      return correctAnswer.includes(optionId);
    } else {
      return correctAnswer === optionId;
    }
  },

  //再考一次
  examAgain: function() {
    this.data.isBackPressed = false;
    wx.reLaunch({
      url: '../exam/exam'
    })
  },
  
  // 返回登录页
  goBackToLogin: function() {
    this.data.isBackPressed = false;
    wx.reLaunch({
      url: '../login/login'
    })
  },

  onShow: function() {
    // 重新设置返回按钮的处理
    wx.setNavigationBarTitle({
      title: '题藏'
    });
  },

  onUnload: function () {
    if (this.data.isBackPressed) {
      wx.reLaunch({
        url: '../login/login'
      })
    }
  },
})