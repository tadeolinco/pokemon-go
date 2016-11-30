$('select.dropdown')
  .dropdown()
;

$('#regForm')
  .form({
    fields: {
      name: {
        identifier: 'reg name',
        rules: [
          {
            type   : 'empty',
            prompt : 'Enter name'
          }
        ]
      },
      username: {
        identifier: 'reg username',
        rules: [
          {
            type   : 'empty',
            prompt : 'Enter username'
          }
        ]
      },
      password: {
        identifier: 'reg password',
        rules: [
          {
            type   : 'empty',
            prompt : 'Enter password'
          }
        ]
      },
      sex: {
        identifier: 'reg sex',
        rules: [
          {
            type   : 'empty',
            prompt : 'Enter sex'
          }
        ]
      },
      country: {
        identifier: 'reg country',
        rules: [
          {
            type   : 'empty',
            prompt : 'Enter country'
          }
        ]
      }
    }
  })
;  

