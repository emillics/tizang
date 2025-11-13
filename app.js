// app.js
App({
  globalData: {
    userInfo: null,
    phone: null,
    // 注册的手机号列表
    registeredPhones: [
      "13800138000",
      "13800138001", 
      "13800138002",
      "18888888888",
      "17777777777",
      "15600001111",
      "15600002222",
      "18258873901",
      "13867450542",
      "18957135316"
    ]
  },
  onLaunch: function () {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  }
})