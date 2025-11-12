// utils/questionParser.js
/**
 * 解析题库文件的工具函数
 * 包含完整的题库数据
 */

// 单选题数据
const singleChoiceQuestions = [
  { id: 1, title: '保安员在防火巡查时，以下项目中不需要检查的是（  ）', type: 'single', 
    options: [
      { id: 'A', content: '防火门、防火卷帘、消防安全疏散指示标志等设施均处于正常状态' },
      { id: 'B', content: '消防安全标志是否完好' },
      { id: 'C', content: '消防安全重点部位的人员在岗情况' },
      { id: 'D', content: '本单位人员是否掌握灭火器使用方法' }
    ], 
    correctAnswer: 'D' },
  { id: 2, title: '在道路交通活动中，驾驶机动车必须遵守（  ）的原则', type: 'single',
    options: [
      { id: 'A', content: '左侧通行' },
      { id: 'B', content: '右侧通行' },
      { id: 'C', content: '中间通行' },
      { id: 'D', content: '内侧通行' }
    ],
    correctAnswer: 'B' },
  { id: 3, title: '在道路交通活动中，道路交通主体是指（  ）', type: 'single',
    options: [
      { id: 'A', content: '机动车和非机动车' },
      { id: 'B', content: '机动车、非机动车和行人' },
      { id: 'C', content: '机动车、非机动车和交通警察' },
      { id: 'D', content: '机动车、非机动车、行人和交通管理部门' }
    ],
    correctAnswer: 'B' },
  { id: 4, title: '以下是某一小区消防安全设施的使用情况，存有火灾隐患的一项是（  ）', type: 'single',
    options: [
      { id: 'A', content: '小区内无消防安全通道' },
      { id: 'B', content: '室内外均有消防供水设施' },
      { id: 'C', content: '常闭式防火门处于关闭状态' },
      { id: 'D', content: '防火卷帘下无堆放物品' }
    ],
    correctAnswer: 'A' },
  { id: 5, title: '在道路交通活动中，当机动车行驶至车道减少的路段或路口时，机动车应当（  ）', type: 'single',
    options: [
      { id: 'A', content: '借道超车' },
      { id: 'B', content: '依次交替通行' },
      { id: 'C', content: '加速通过' },
      { id: 'D', content: '抢道行驶' }
    ],
    correctAnswer: 'B' },
  { id: 6, title: '机动车在设有最高限速标志的道路上行驶时（  ）', type: 'single',
    options: [
      { id: 'A', content: '不得超过标明的最高时速' },
      { id: 'B', content: '允许超过标明最高时速的10%' },
      { id: 'C', content: '可以超过车辆的最高设计时速' },
      { id: 'D', content: '按规定的最高车速行驶' }
    ],
    correctAnswer: 'A' },
  { id: 7, title: '机动车行驶在没有限速标志的路段时，（  ）', type: 'single',
    options: [
      { id: 'A', content: '应当以最高设计车速行驶' },
      { id: 'B', content: '可以不受速度限制行驶' },
      { id: 'C', content: '应当保持安全车速行驶' },
      { id: 'D', content: '可以按自己的意愿行驶' }
    ],
    correctAnswer: 'C' },
  { id: 8, title: '正在道路上作业的清扫车在不影响其他车辆通行的情况下，可以（  ）', type: 'single',
    options: [
      { id: 'A', content: '不受行驶速度限制' },
      { id: 'B', content: '不受车辆分道行驶的限制' },
      { id: 'C', content: '不受交通信号灯的限制' },
      { id: 'D', content: '不受交通标志的限制' }
    ],
    correctAnswer: 'B' },
  { id: 9, title: '非机动车通过有交通信号灯控制的交叉路口，向左转弯时，应靠路口中心点（  ）转弯', type: 'single',
    options: [
      { id: 'A', content: '右侧' },
      { id: 'B', content: '左侧' },
      { id: 'C', content: '最近处' },
      { id: 'D', content: '最远处' }
    ],
    correctAnswer: 'A' },
  { id: 10, title: '某保安公司保安员张三因就餐在饭店将与其发生争执的李四打成重伤，则张三直接侵犯李四的（  ）', type: 'single',
    options: [
      { id: 'A', content: '名誉权' },
      { id: 'B', content: '自由权' },
      { id: 'C', content: '平等权' },
      { id: 'D', content: '健康权' }
    ],
    correctAnswer: 'D' },
  { id: 11, title: '下列选项不属于电气火灾隐患的是（  ）', type: 'single',
    options: [
      { id: 'A', content: '线路电量负荷过大' },
      { id: 'B', content: '用钢、铁丝代替保险丝' },
      { id: 'C', content: '电气线路严重老化' },
      { id: 'D', content: '消防控制室电路出现故障' }
    ],
    correctAnswer: 'D' },
  { id: 12, title: '机动车距离交叉路口（  ）米以内不准停车', type: 'single',
    options: [
      { id: 'A', content: '20' },
      { id: 'B', content: '30' },
      { id: 'C', content: '40' },
      { id: 'D', content: '50' }
    ],
    correctAnswer: 'D' },
  { id: 13, title: '机动车在停车场以外的其他地点临时停车时，应当（  ），但不得妨碍其他车辆和行人通过', type: 'single',
    options: [
      { id: 'A', content: '在非机动车道停车' },
      { id: 'B', content: '紧靠道路右边停放' },
      { id: 'C', content: '紧靠道路左边停放' },
      { id: 'D', content: '选择路边停车' }
    ],
    correctAnswer: 'B' },
  { id: 14, title: '（  ）符合用火规范', type: 'single',
    options: [
      { id: 'A', content: '在小区花园角落可以焚烧垃圾' },
      { id: 'B', content: '消防控制室严禁使用明火' },
      { id: 'C', content: '在楼道内焚烧垃圾' },
      { id: 'D', content: '在小区内燃放烟花炮竹' }
    ],
    correctAnswer: 'B' },
  { id: 15, title: '机动车载物的宽度不准超出（  ）', type: 'single',
    options: [
      { id: 'A', content: '车厢' },
      { id: 'B', content: '车厢左右各10厘米' },
      { id: 'C', content: '车厢左右各20厘米' },
      { id: 'D', content: '车厢左右各15厘米' }
    ],
    correctAnswer: 'A' },
  { id: 16, title: '对重大火灾隐患这一概念叙述正确的是（  ）', type: 'single',
    options: [
      { id: 'A', content: '违反消防法律法规，可能导致火灾发生或火灾危害增大，并由此可能造成重大火灾事故和严重社会影响的各类潜在不安全因素' },
      { id: 'B', content: '违反保安法律法规，必定导致火灾发生或火灾危害增大，并由此可能造成特大火灾事故和严重社会影响的各类潜在不安全因素' },
      { id: 'C', content: '违反消防法律法规，必定导致火灾发生或火灾危害增大，并由此可能造成重大火灾事故和严重政治影响的各类潜在不安全因素' },
      { id: 'D', content: '违反保安法律法规，可能导致火灾发生或火灾危害增大，并由此可能造成重大火灾事故和严重政治影响的各类潜在不安全因素' }
    ],
    correctAnswer: 'A' },
  { id: 17, title: '在目标部位守护中，流动岗一般是设置在（  ）或容易出问题的部位区域', type: 'single',
    options: [
      { id: 'A', content: '重点单位的重要部位' },
      { id: 'B', content: '防范工作的薄弱环节' },
      { id: 'C', content: '客户单位认定的重要部位' },
      { id: 'D', content: '保安公司认定的重要部位' }
    ],
    correctAnswer: 'B' },
  { id: 18, title: '保安公司根据服务单位的要求，在目标部位守护中一般设置（  ）岗位', type: 'single',
    options: [
      { id: 'A', content: '三个' },
      { id: 'B', content: '两个以上' },
      { id: 'C', content: '一个' },
      { id: 'D', content: '一个或多个' }
    ],
    correctAnswer: 'D' },
  { id: 19, title: '在急救现场，当你一人面对额头受伤者、前臂骨折者及呼吸心跳停止者三名患者时，正确救护顺序是（  ）', type: 'single',
    options: [
      { id: 'A', content: '额头擦伤者 前臂骨折者 呼吸心跳停止者' },
      { id: 'B', content: '呼吸心跳停止者 前臂骨折者 额头擦伤者' },
      { id: 'C', content: '呼吸心跳停止者 额头擦伤者 前臂骨折者' },
      { id: 'D', content: '前臂骨折者 呼吸心跳停止者 额头擦伤者' }
    ],
    correctAnswer: 'B' },
  { id: 20, title: '下列说法中，对现场救护的认识正确的是（  ）', type: 'single',
    options: [
      { id: 'A', content: '免除患者去医院的麻烦' },
      { id: 'B', content: '可以替代医务人员处置患者' },
      { id: 'C', content: '可以减轻患者家属的负担' },
      { id: 'D', content: '挽救生命，减少伤残和痛苦' }
    ],
    correctAnswer: 'D' }
  // 注意：这里只包含了部分单选题作为示例，实际项目中应包含全部题目
];

// 多选题数据
const multipleChoiceQuestions = [
  { id: 1165, title: '扑救带电火灾必须使用绝缘性能好、不会发生触电伤人事故的灭火器，下列可以作为扑救带电火灾的有（  ）', type: 'multiple',
    options: [
      { id: 'A', content: '消防水枪直接喷射' },
      { id: 'B', content: '泡沫灭火器' },
      { id: 'C', content: '干粉灭火器' },
      { id: 'D', content: '二氧化碳灭火器' },
      { id: 'E', content: '室内消火栓' }
    ],
    correctAnswer: ['C', 'D'] },
  { id: 1166, title: '某饭店因线路电量负荷过大，造成火灾。为控制火灾蔓延，应该使用（  ）灭火', type: 'multiple',
    options: [
      { id: 'A', content: '泡沫灭火器' },
      { id: 'B', content: '水' },
      { id: 'C', content: '干粉灭火器' },
      { id: 'D', content: '干粉灭火器' },
      { id: 'E', content: '水型灭火器' }
    ],
    correctAnswer: ['C', 'D'] },
  { id: 1167, title: '道路交通信号包括（   ）', type: 'multiple',
    options: [
      { id: 'A', content: '交通标志' },
      { id: 'B', content: '交通标线' },
      { id: 'C', content: '交通警察的指挥' },
      { id: 'D', content: '交通信号灯' },
      { id: 'E', content: '交通信息诱导板' }
    ],
    correctAnswer: ['A', 'B', 'C', 'D'] },
  { id: 1168, title: '勤务方案是保安员岗位工作的依据和指南，它的编写要求是（ ）', type: 'multiple',
    options: [
      { id: 'A', content: '结构编写合理' },
      { id: 'B', content: '全面' },
      { id: 'C', content: '细致' },
      { id: 'D', content: '文字简练' },
      { id: 'E', content: '操作性强' }
    ],
    correctAnswer: ['A', 'B', 'C', 'D', 'E'] },
  { id: 1169, title: '骨折固定时，需要注意的事项有（   ）', type: 'multiple',
    options: [
      { id: 'A', content: '皮肤与固定材料之间要加衬垫' },
      { id: 'B', content: '超关节固定' },
      { id: 'C', content: '不易过紧，避免影响血液循环' },
      { id: 'D', content: '暴露肢体末端，以观察血液循环' },
      { id: 'E', content: '固定材料要直接接触皮肤' }
    ],
    correctAnswer: ['A', 'B', 'C', 'D'] }
  // 注意：这里只包含了部分多选题作为示例，实际项目中应包含全部题目
];

// 判断题数据
const judgmentQuestions = [
  { id: 1570, title: '消防安全重点部位没有必要日夜看守', type: 'judgment',
    options: [
      { id: 'A', content: '正确' },
      { id: 'B', content: '错误' }
    ],
    correctAnswer: 'B' },
  { id: 1571, title: '存在重大火灾隐患的单位，一定有违反消防法律法规行为', type: 'judgment',
    options: [
      { id: 'A', content: '正确' },
      { id: 'B', content: '错误' }
    ],
    correctAnswer: 'A' },
  { id: 1572, title: '安装电路时，若没有保险丝，可以用钢、铁丝暂时代替', type: 'judgment',
    options: [
      { id: 'A', content: '正确' },
      { id: 'B', content: '错误' }
    ],
    correctAnswer: 'B' },
  { id: 1573, title: '机动车行径弯道时，可以迅速超车', type: 'judgment',
    options: [
      { id: 'A', content: '正确' },
      { id: 'B', content: '错误' }
    ],
    correctAnswer: 'B' },
  { id: 1574, title: '在交通信号灯控制的交叉路口，相对方向行驶的左转弯机动车让左转弯机动车先行', type: 'judgment',
    options: [
      { id: 'A', content: '正确' },
      { id: 'B', content: '错误' }
    ],
    correctAnswer: 'B' },
  { id: 1575, title: '灭火器是借助驱动压力将所充装的灭火剂喷出，达到灭火目的的器具', type: 'judgment',
    options: [
      { id: 'A', content: '正确' },
      { id: 'B', content: '错误' }
    ],
    correctAnswer: 'A' },
  { id: 1576, title: '夜晚进入煤气泄露的房间救护煤气中毒患者时，首先应开灯查看环境是否安全', type: 'judgment',
    options: [
      { id: 'A', content: '正确' },
      { id: 'B', content: '错误' }
    ],
    correctAnswer: 'B' },
  { id: 1577, title: '对严重的煤气中毒患者，应及早送医院做高压氧仓治疗', type: 'judgment',
    options: [
      { id: 'A', content: '正确' },
      { id: 'B', content: '错误' }
    ],
    correctAnswer: 'A' }
  // 注意：这里只包含了部分判断题作为示例，实际项目中应包含全部题目
];

// 组织所有题目数据
function getAllQuestions() {
  return {
    single: singleChoiceQuestions,
    multiple: multipleChoiceQuestions,
    judgment: judgmentQuestions
  };
}

module.exports = {
  getAllQuestions
};