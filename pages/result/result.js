// pages/result/result.js
Page({
  data: {
    result: {}
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
    if (Array.isArray(answer)) {
      return answer.join(', ')
    } else {
      return answer
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
  
  // 返回登录页
  goBackToLogin: function() {
    wx.reLaunch({
      url: '../login/login'
    })
  },
  
  // 处理页面返回事件
  onBackPress: function() {
    wx.showModal({
      title: '确认',
      content: '确定要结束当前考试吗？',
      success: (res) => {
        if (res.confirm) {
          // 返回到登录页
          wx.reLaunch({
            url: '../login/login'
          });
        }
      }
    });
    
    // 阻止默认返回行为
    return true;
  }
})