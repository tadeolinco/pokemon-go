$('select.dropdown')
  .dropdown()
;

$('.ui.form')
  .form({
    fields: {
      name: {
        identifier: 'select sex',
        rules: [
          {
            type   : 'empty',
            prompt : 'Enter sex'
          }
        ]
      }
    }
  })
;