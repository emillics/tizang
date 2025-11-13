// pages/login/login.js
import { getAllQuestions } from '../../utils/questionParser.js'

const app = getApp()

Page({
  data: {
    phone: '',
    statsText: '' // 统计数据文本
  },

  onLoad: function (options) {
    this.loadStatistics(); // 加载统计数据
  },

  // 加载统计数据
  loadStatistics: function() {
    const allQuestions = getAllQuestions();
    
    // 计算各题型总数
    const singleCount = allQuestions.single ? allQuestions.single.length : 0;
    const multipleCount = allQuestions.multiple ? allQuestions.multiple.length : 0;
    const judgmentCount = allQuestions.judgment ? allQuestions.judgment.length : 0;
    const totalCount = singleCount + multipleCount + judgmentCount;
    
    // 计算人员总数
    const phoneCount = app.globalData.registeredPhones ? app.globalData.registeredPhones.length : 0;
    
    // 格造统计文本
    const statsText = `题库：${totalCount}　　人员：${phoneCount}`;
    
    this.setData({
      statsText: statsText
    });
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