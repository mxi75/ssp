function isLoggedUser(){
  if(Meteor.userId()){
    return true;
  }
}

function isEntrance(url){
  return url === '/login';
}

ApplicationController = RouteController.extend({

  onBeforeAction: function (action) {
    // do some login checks or other custom logic
    if(!(isLoggedUser() || isEntrance(action.url))){
      this.redirect('/login');
    }
    this.next();
  }
});

Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound',
    controller: 'ApplicationController'
});

//
// Example pages routes
//

Router.route('/school', function () {
    this.render('school');
});

Router.route('/chat', function () {
    this.render('chat');
});

Router.route('/', function () {
    Router.go('school');
});

Router.route('/login', function () {
    this.layout(null);
    this.render('login');
});
