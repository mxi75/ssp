var form = null;
Template.register.events({
  'submit': function(e, t) {
    debugger;
    e.preventDefault();

    form.validate();

    if(form.isValid()){
    //if (isNotEmpty(lastName) && isNotEmpty(firstName) && isEmail(email)) {
      var options = {
        username: form.fields.email.value,
        email: form.fields.email.value,
        password: '12345',
        profile:{
          lastName: form.fields.lastName.value,
          firstName: form.fields.firstName.value
        }
      };
      Accounts.createUser(options, function(err) {
        if (err) {
          if (err.reason === 'Username already exists.') {
            form.fields.email.invalidate('Данный емайл уже используется');
          } else {
            console.log('We are sorry but something went wrong.');
          }
        } else {
          Router.go('/school');
        }
      });

    }
    return false;
  },
});

Template.register.onCreated(function(){
  console.log('register created');
});

Template.register.onDestroyed(function(){
  console.log('register destroyed');
  form = null;
});

Template.register.onRendered(function(){
  var formElement = this.$('form');
  form = new FormHandler(formElement);
  form.fields.lastName.focus();
});
