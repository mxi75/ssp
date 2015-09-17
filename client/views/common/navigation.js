Template.navigation.rendered = function(){

    // Initialize metisMenu
    $('#side-menu').metisMenu();

};

Template.navigation.helpers({
  userName: function(){
    var user = Meteor.user();
    return user.profile.lastName + ' '+user.profile.firstName;
  }
});
