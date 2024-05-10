const mainMenuList = ref([
  {
    name: '流程图',
    id: '1',
    icon: 'ep:avatar',
    path: '/index'
  },
  {
    name: '数据处理',
    id: '2',
    icon: 'ep:avatar',
    path: '/dataProcessing'
  },
  {
    name: '专题展示',
    id: '3',
    icon: 'ep:avatar',
    children: [
      {
        name: '测试3-1',
        id: '4',
        icon: 'ep:avatar'
      },
      {
        name: '测试3-2',
        id: '5',
        icon: 'ep:avatar'
      }
    ]
  },
  {
    name: '模型管理',
    id: '6',
    icon: 'ep:avatar',
    path: '/modelManage'
  }
])
const slideMenuList = ref([
  {
    name: '流域管理',
    id: '1',
    icon: 'ep:avatar',
    path: '/modelManage'
  },
  {
    name: '模型率定',
    id: '2',
    icon: 'ep:avatar',
    path: '/modelManage/modelCalibration'
  },
  {
    name: '模型计算',
    id: '3',
    icon: 'ep:avatar',
    path: '/modelManage/modelCalculation'
  },
  {
    name: '遥感解释',
    id: '4',
    icon: 'ep:avatar',
    path: '3'
  }
])
const hasSlide = [
  /modelManage\/*/
]


export {
  mainMenuList, slideMenuList, hasSlide
}
