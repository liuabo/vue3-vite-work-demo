import Mock from 'mockjs'

export default {
  fetchMockModelListData: {
    code: 200,
    msg: '请求成功',
    ...Mock.mock({
      'data|10-100': [
        {
          'name|+1': '@cparagraph(1, 3)',
          'lymj': 'aliquip Excepteur',
          'mxlx': '@cparagraph(1, 3)',
          'sfld': '@cparagraph(1, 3)',
          'sfqy': '@cparagraph(1, 3)'

        }
      ]
    })
    // data: Mock.mock('@cparagraph(1, 3)')
  },
  fetchMockCaptchaImage: {
    'msg': '请求成功',
    'img': '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',
    'code': 200,
    'captchaEnabled': true,
    'uuid': '0c23e3cd676c4d948e29d72fa3cc4cb3'
  },
  fetchMockLogin: {
    'msg': '操作成功',
    'code': 200,
    'username': 'admin',
    'uuid': '0c23e3cd676c4d948e29d72fa3cc4cb3',
    'token': '0c23e3cd676c4d948e29d72fa3cc4cb3'
  },
  fetchMockUserInfo: {
    'msg': '操作成功',
    'code': 200,
    'permissions': [
      '*:*:*'
    ],
    'roles': [
      'admin'
    ],
    'user': {
      'createBy': 'admin',
      'createTime': '2023-04-23 16:11:38',
      'updateBy': null,
      'updateTime': null,
      'remark': '管理员',
      'userId': 1,
      'deptId': 103,
      'userName': 'admin',
      'nickName': '若依',
      'email': 'ry@163.com',
      'phonenumber': '15888888888',
      'sex': '1',
      'avatar': '',
      'password': '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2',
      'status': '0',
      'delFlag': '0',
      'loginIp': '183.40.37.244',
      'loginDate': '2024-04-11T14:39:06.000+08:00',
      'dept': {
        'createBy': null,
        'createTime': null,
        'updateBy': null,
        'updateTime': null,
        'remark': null,
        'deptId': 103,
        'parentId': 101,
        'ancestors': '0,100,101',
        'deptName': '研发部门',
        'orderNum': 1,
        'leader': '若依',
        'phone': null,
        'email': null,
        'status': '0',
        'delFlag': null,
        'parentName': null,
        'children': []
      },
      'roles': [
        {
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'remark': null,
          'roleId': 1,
          'roleName': '超级管理员',
          'roleKey': 'admin',
          'roleSort': 1,
          'dataScope': '1',
          'menuCheckStrictly': false,
          'deptCheckStrictly': false,
          'status': '0',
          'delFlag': null,
          'flag': false,
          'menuIds': null,
          'deptIds': null,
          'permissions': null,
          'admin': true
        }
      ],
      'roleIds': null,
      'postIds': null,
      'roleId': null,
      'admin': true
    }
  },
  fetchModelTuning: {
    'msg': '操作成功',
    'code': 200,
    'data': [

      {
        name: '蒸发折算系数',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      },
      {
        name: '上层张力水蓄水容量(mm)',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      },
      {
        name: '率定所需数据',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      },
      {
        name: '下层张力水蓄水容量(mm)',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      },
      {
        name: '深层散发扩散系数',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      },
      {
        name: '流域张力水平均蓄水容量(mm)',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      },
      {
        name: '张力水蓄水容量曲线指数',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      },
      {
        name: '不透水面积占全流域面积比',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      },
      {
        name: '自由水蓄水库容量(mm)',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      },
      {
        name: '自由蓄水水容量曲线指数',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      },
      {
        name: '壤中流出流系数',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      },
      {
        name: '壤中水径流日消退系数',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      },
      {
        name: '地下径流日消退系数',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      },
      {
        name: '河网水流日消退系数',
        value: Mock.mock('@integer(0)'),
        key: '',
        isEdit: true
      }

    ]
  }
}
