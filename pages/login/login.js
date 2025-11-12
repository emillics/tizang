// pages/login/login.js
const app = getApp()

Page({
  data: {
    phone: ''
  },

  onLoad: function (options) {
    
  },

  // 开始考试 - 弹出手机号输入框
  startExam: function() {
    wx.showModal({
      title: '请输入手机号',
      editable: true,
      placeholderText: '请输入您的注册手机号',
      success: (res) => {
        if (res.cancel) {
          // 用户取消
          return
        }
        
        const inputtedPhone = res.content ? res.content.trim() : ''
        
        // 验证手机号格式
        if (!this.validatePhone(inputtedPhone)) {
          wx.showToast({
            title: '手机号格式不正确',
            icon: 'none'
          })
          return
        }
        
        // 检查是否在注册列表中
        if (app.globalData.registeredPhones.includes(inputtedPhone)) {
          app.globalData.phone = inputtedPhone
          wx.navigateTo({
            url: '../exam/exam'
          })
        } else {
          wx.showToast({
            title: '该手机号未注册',
            icon: 'none'
          })
        }
      }
    })
  },

  // 验证手机号格式（中国大陆手机号格式）
  validatePhone: function(phone) {
    // 中国大陆手机号格式：1开头，第二位为3-9，共11位数字
    const phoneRegex = /^1[3-9]\d{9}$/
    return phoneRegex.test(phone)
  }
})