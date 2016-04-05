// 方案一：jsp + react
var form = new Form({
  config: {
    type: 1  //表单格式
  },
  form: [
    {
      label: '姓名',
      content: [
        {
          type: 'input',
          column: 8,
          name: 'registerName',
          class: 'input-type',
          id: 'iName',
          placeholder: '请输入姓名',
          tip: '姓名格式错误',
          verify: {
            required: true,
            regex: '/0-9/'
          }
        }
      ]
    }
  ]
})
