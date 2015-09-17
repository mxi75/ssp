elementExists = function (element){
  return $(element).length > 0;
}

FormHandler = function(formSelector){
  this.parseFields = parseFields.bind(this);
  this.fields=[];
  this.parseFields(formSelector);
  this.messages = [];
}

FormHandler.prototype.validate = function(){
  this.messages = [];
  for(var field in this.fields){
    var fieldMessages = this.fields[field].validate();
    if(fieldMessages.length > 0){
      this.messages.push({
        field:field,
        messages:fieldMessages
      });
    }
  }
  return this.messages;
}

FormHandler.prototype.isValid = function(){
  return this.messages.length == 0;
}

function parseFields(formSelector){
  var formGroups = $(formSelector).find('.form-group[data-field]');
  for (var i = 0; i < formGroups.length; i++) {
    var field = new Field($(formGroups[i]));
    this.fields[field.name] = field;
  }
}
