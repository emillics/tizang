// pages/exam/exam.js
import {
  getAllQuestions
} from '../../utils/questionParser.js'

Page({
  data: {
    currentPaper: [],
    currentIndex: 0,
    userAnswers: {}, // 存储用户答案
    countdown: 600, // 10分钟倒计时（秒）
    timer: null,
    timerColor: '#e74c3c',
    formattedTime: '10:00', // 预先格式化的时间
    currentQuestionAnswered: false, // 当前题目是否已回答
    cardWidth: 0, // 动态计算的卡片宽度
    cardHeight: 0, // 动态计算的卡片高度
    contentHeight: 0, // 上部可滚动内容区域高度
    navHeight: 120, // 下部导航区域的固定高度 (rpx)
    isFlashing: false, // 是否闪烁
    flashTimer: null, // 闪烁定时器
    isBackPressed: true //是否按了返回键
  },

  // 获取屏幕尺寸并计算卡片尺寸
  calculateCardSize: function () {
    const systemInfo = wx.getSystemInfoSync();
    const screenWidth = systemInfo.windowWidth;
    const screenHeight = systemInfo.windowHeight;

    // 计算可用高度：屏幕高度 - 顶部倒计时区域 - 卡片四周留白
    const topReserved = this.data.countdown > 0 ? 120 : 60; // 倒计时区域高度
    const marginAllAround = 60; // 卡片四周的留白 (30rpx * 2)
    const availableHeight = screenHeight - topReserved - marginAllAround;

    // 卡片宽度：屏幕宽度 - 左右留白
    const cardWidth = screenWidth - marginAllAround;

    // 卡片高度：可用高度
    const cardHeight = availableHeight;

    // 上部内容区域高度：卡片高度 - 下部导航区域高度 - 内边距
    const contentHeight = cardHeight - this.data.navHeight - 80; // 80是上下内边距总和

    this.setData({
      cardWidth: cardWidth,
      cardHeight: cardHeight,
      contentHeight: contentHeight
    });
  },

  onLoad: function (options) {
    this.calculateCardSize(); // 计算卡片尺寸
    this.generatePaper()
    this.startTimer()
  },

  onShow: function () {
    // 页面显示时更新按钮状态
    this.updateButtonState()
  },

  // 生成试卷
  generatePaper: function () {
    const allQuestions = getAllQuestions()

    // 随机抽取题目
    const singleQuestions = this.getRandomQuestions(allQuestions.single, 6)
    const multipleQuestions = this.getRandomQuestions(allQuestions.multiple, 8)
    const judgmentQuestions = this.getRandomQuestions(allQuestions.judgment, 6)

    // 合并并打乱题目顺序
    let paper = [...singleQuestions, ...multipleQuestions, ...judgmentQuestions]
    paper = this.shuffleArray(paper)

    // 初始化每个题目的选项选择状态
    const initialUserAnswers = {}
    for (let i = 0; i < paper.length; i++) {
      initialUserAnswers[i] = [] // 每个题目初始答案为空数组
    }

    this.setData({
      currentPaper: paper,
      userAnswers: initialUserAnswers
    }, () => {
      // 设置完成后再更新按钮状态
      this.updateButtonState()
    })
  },

  // 随机抽取指定数量的题目
  getRandomQuestions: function (questions, count) {
    if (questions.length <= count) {
      return questions
    }

    const shuffled = [...questions]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count)
  },

  // 打乱数组
  shuffleArray: function (array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled
  },

  // 开始倒计时
  startTimer: function () {
    this.data.timer = setInterval(() => {
      const newCountdown = this.data.countdown - 1
      const shouldFlash = newCountdown <= 30; // 30秒以内开始闪烁

      this.setData({
        countdown: newCountdown,
        formattedTime: this.formatTime(newCountdown),
        isFlashing: shouldFlash
      })

      if (newCountdown <= 0) {
        this.autoSubmit()
      }
    }, 1000)
  },

  // 格式化时间显示
  formatTime: function (seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  },

  // 単选题和判断题的选择事件
  onRadioChange: function (e, questionIndexOverride = null) {
    const questionIndex = questionIndexOverride !== null ? questionIndexOverride : this.data.currentIndex;
    const selectedValue = e.detail.value;

    console.log('单选题选择:', questionIndex, selectedValue);

    let userAnswers = {
      ...this.data.userAnswers
    };
    userAnswers[questionIndex] = [selectedValue];

    // 更新当前题目回答状态
    const currentQuestionAnswered = userAnswers[questionIndex] && userAnswers[questionIndex].length > 0;

    this.setData({
      userAnswers: userAnswers,
      currentQuestionAnswered: currentQuestionAnswered
    }, () => {
      // 更新按钮状态
      this.updateButtonState();
    });
  },

  // 多选题的选择事件
  onCheckboxChange: function (e, questionIndexOverride = null) {
    const questionIndex = questionIndexOverride !== null ? questionIndexOverride : this.data.currentIndex;
    const selectedValues = e.detail.value.sort((a, b) => a.localeCompare(b));

    console.log('多选题选择:', questionIndex, selectedValues);

    let userAnswers = {
      ...this.data.userAnswers
    };
    userAnswers[questionIndex] = selectedValues;

    // 更新当前题目回答状态
    const currentQuestionAnswered = userAnswers[questionIndex] && userAnswers[questionIndex].length > 0;

    this.setData({
      userAnswers: userAnswers,
      currentQuestionAnswered: currentQuestionAnswered
    }, () => {
      // 更新按钮状态
      this.updateButtonState();
    });
  },

  // 检查答案是否已选
  isOptionSelected: function (questionIndex, optionId) {
    const answers = this.data.userAnswers[questionIndex]
    if (!answers) {
      return false
    }
    return answers.includes(optionId)
  },

  // 检查题目是否已回答
  isQuestionAnswered: function (questionIndex) {
    const answers = this.data.userAnswers[questionIndex]
    // 检查是否已选择答案且答案数组非空
    return answers && Array.isArray(answers) && answers.length > 0
  },

  // 当题目索引改变时更新按钮状态
  updateButtonState: function () {
    const currentQuestionAnswered = this.isQuestionAnswered(this.data.currentIndex)
    this.setData({
      currentQuestionAnswered: currentQuestionAnswered
    })
  },

  // 上一题
  prevQuestion: function () {
    if (this.data.currentIndex > 0) {
      // 检查是否允许跳转到上一题
      this.setData({
        currentIndex: this.data.currentIndex - 1
      }, () => {
        // 更新按钮状态
        this.updateButtonState()
      })
    }
  },

  // 下一题
  nextQuestion: function () {
    if (this.data.currentIndex < this.data.currentPaper.length - 1) {
      // 检查当前题是否已完成
      if (!this.isQuestionAnswered(this.data.currentIndex)) {
        wx.showToast({
          title: '请先完成当前题目',
          icon: 'none'
        })
        return
      }

      this.setData({
        currentIndex: this.data.currentIndex + 1
      }, () => {
        // 更新按钮状态
        this.updateButtonState()
      })
    }
  },

  // 提交考试
  submitExam: function () {
    // 检查是否已到时间结束
    if (this.data.countdown <= 0) {
      // 时间已到，自动提交
      this.autoSubmit();
      return;
    }

    // 检查最后一题是否完成
    if (!this.isQuestionAnswered(this.data.currentIndex)) {
      wx.showToast({
        title: '请完成当前题目',
        icon: 'none'
      })
      return
    }

    // 显示用户确认提交对话框
    wx.showModal({
      title: '确认提交',
      content: '确认提交试卷吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          // 检查是否在用户操作期间倒计时已结束
          if (this.data.countdown <= 0) {
            // 如果倒计时恰好在此期间结束，关闭当前对话框，显示自动提交提示
            // 但因为当前对话框已经关闭，我们需要直接自动提交
            this.autoSubmit();
          } else {
            // 正常用户提交流程
            this.performSubmit();
          }
        }
      }
    })
  },

  // 自动提交（倒计时结束时调用）
  autoSubmit: function () {
    wx.showModal({
      title: '提示',
      content: '倒计时结束，试卷将自动提交',
      showCancel: false, // 只显示确定按钮
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          this.performSubmit();
        }
      }
    });
  },

  // 执行提交动作
  performSubmit: function () {
    // 停止计时器
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }

    // 清除闪烁定时器（如果存在）
    if (this.data.flashTimer) {
      clearInterval(this.data.flashTimer);
    }

    // 计算成绩
    const result = this.calculateResult();

    // 跳转到成绩页面
    this.data.isBackPressed = false;
    wx.redirectTo({
      url: `../result/result?result=${JSON.stringify(result)}`
    });
  },

  // 计算成绩
  calculateResult: function () {
    let correctCount = 0
    let wrongQuestions = []

    for (let i = 0; i < this.data.currentPaper.length; i++) {
      const question = this.data.currentPaper[i]
      const userAnswer = this.data.userAnswers[i] || []

      // 标准化用户答案和正确答案
      let normalizedUserAnswer = [...userAnswer].sort()
      let normalizedCorrectAnswer = Array.isArray(question.correctAnswer) ? [...question.correctAnswer].sort() : [question.correctAnswer].sort()

      // 检查答案是否正确
      if (JSON.stringify(normalizedUserAnswer) === JSON.stringify(normalizedCorrectAnswer)) {
        correctCount++
      } else {
        wrongQuestions.push({
          question: question,
          userAnswer: userAnswer,
          correctAnswer: question.correctAnswer
        })
      }
    }

    const score = correctCount * 5 // 每题5分

    return {
      score: score,
      total: this.data.currentPaper.length,
      correct: correctCount,
      wrong: this.data.currentPaper.length - correctCount,
      wrongQuestions: wrongQuestions
    }
  },

  // 切换计时器颜色（用于UI效果）
  toggleTimerColor: function () {
    this.setData({
      timerColor: this.data.timerColor === '#e74c3c' ? '#f39c12' : '#e74c3c'
    })
  },

  // 单选题选项选择事件（供点击选项区域调用）
  selectOption: function (e) {
    const optionId = e.currentTarget.dataset.optionId;
    const questionIndex = e.currentTarget.dataset.questionIndex || this.data.currentIndex;

    // 触发radio-group的change事件
    let userAnswers = {
      ...this.data.userAnswers
    };
    userAnswers[questionIndex] = [optionId];

    const currentQuestionAnswered = userAnswers[questionIndex] && userAnswers[questionIndex].length > 0;

    this.setData({
      userAnswers: userAnswers,
      currentQuestionAnswered: currentQuestionAnswered
    }, () => {
      // 更新按钮状态
      this.updateButtonState();
    });
  },

  // 多选题选项选择事件（供点击选项区域调用）
  selectMultipleOption: function (e) {
    const optionId = e.currentTarget.dataset.optionId;
    const questionIndex = e.currentTarget.dataset.questionIndex || this.data.currentIndex;

    // 获取当前已选择的选项
    let currentAnswers = [...(this.data.userAnswers[questionIndex] || [])];
    const optionIndex = currentAnswers.indexOf(optionId);

    // 如果已选中则取消选中，否则添加选中
    if (optionIndex > -1) {
      currentAnswers.splice(optionIndex, 1);
    } else {
      currentAnswers.push(optionId);
    }

    let userAnswers = {
      ...this.data.userAnswers
    };
    userAnswers[questionIndex] = currentAnswers;

    const currentQuestionAnswered = userAnswers[questionIndex] && userAnswers[questionIndex].length > 0;

    this.setData({
      userAnswers: userAnswers,
      currentQuestionAnswered: currentQuestionAnswered
    }, () => {
      // 更新按钮状态
      this.updateButtonState();
    });
  },

  // 处理swiper切换事件
  onSwiperChange: function (e) {
    const current = e.detail.current;
    const previousIndex = this.data.currentIndex;

    // 验证当前题目是否已完成（仅在向前切换时验证）
    if (current > previousIndex && !this.isQuestionAnswered(previousIndex)) {
      // 回退到当前题目
      this.setData({
        currentIndex: previousIndex
      });
      wx.showToast({
        title: '请先完成当前题目',
        icon: 'none'
      });
      return;
    }

    this.setData({
      currentIndex: current
    }, () => {
      // 更新按钮状态
      this.updateButtonState();
    });
  },

  onUnload: function () {
    // 页面卸载时清理计时器
    if (this.data.timer) {
      clearInterval(this.data.timer)
    }
    if (this.data.isBackPressed) {
      wx.reLaunch({
        url: '../login/login'
      })
    }
  },

  // 监听返回按钮和手势返回
  onShow: function () {
    // 设置导航栏返回按钮监听
    wx.setNavigationBarTitle({
      title: '题藏'
    });
  },
})