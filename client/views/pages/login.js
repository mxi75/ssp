var form = null;

Template.login.events({
  'submit': function(e, t) {
    e.preventDefault();
    debugger;
    form.validate();
    if (form.isValid()) {
      var email = form.fields.email.value;
      var password = form.fields.password.value;
      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          if (err.error == 403) {
            if(err.reason === 'Incorrect password'){
              form.fields.password.invalidate('Неверный пароль');
            }else{
              form.fields.email.invalidate('Емейл не зарегистрирован');
            }
          } else {
            console.log('We are sorry but something went wrong.');
          }
        } else {
          Router.go('/school');
          console.log('Congrats new Meteorite, you\'re in!');
        }
      });

    }
    return false;
  },
});

Template.login.onCreated(function(){
  console.log('login created');
});

Template.login.onDestroyed(function(){
  console.log('login destroyed');
  form = null;
});

Template.login.onRendered(function(){
  var formElement = this.$('form');
  form = new FormHandler(formElement);
  form.fields.email.focus();
});
