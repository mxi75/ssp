Field = function(groupElement){
  this.groupElement = groupElement;
  this.parseField = parseField.bind(this);
  this.parseValidationAttributes = parseValidationAttributes.bind(this);
  this.bindRules = bindRules.bind(this);
  this.setMessage = setMessage.bind(this);

  this.rules=[];

  var field = this.parseField(groupElement);

  this.inputElement = field.element;
  this.messageElement = getMessageElement(groupElement);

  this.name = field.name;
  this.value = field.value;
  this.type = field.type;
}

Field.prototype.validate = function(){
  this.value = parseInputElement(this.inputElement).value;
  var messages = [];
  for(var i=0;i<this.rules.length;i++){
    var message = this.rules[i](this.value);
    if(message){
      messages.push(message);
    }
  }
  this.setMessage(messages.join(' | '));
  return messages;
}

Field.prototype.focus = function(){
  this.inputElement.focus();
}

function setMessage(message){
  if(message){
    this.groupElement.addClass('has-error');
    if(this.messageElement){
      this.messageElement.html(message);
    }
  }else{
    this.groupElement.removeClass('has-error');
  }
}

Field.prototype.invalidate = function(message){
  this.setMessage(message);
}

function getMessageElement(groupElement){
  var element = groupElement.find('.validation-message');
  if(elementExists(element)){
    return element;
  }
  return null;
}


function parseField(groupElement){

  var fieldName = groupElement.data().field;

  this.parseValidationAttributes(groupElement);

  var inputElement = groupElement.find('input').first();

  if(!elementExists(inputElement)){
    throw Error('Input element is not found for field with name '+fieldName);
  }

  this.parseValidationAttributes(inputElement);

  var inputData = parseInputElement(inputElement);

  this.bindRules({'type':{name:'type',value:inputData.type}},{
    'type':dataTypeValidationRule
  });

  inputData.element = inputElement;
  inputData.name = fieldName;

  return inputData;
}

function getElementDataAttributes(element){
  var result = {};
  for(var attrName in element.data()){
    var value = element.data(attrName);
    result[attrName] = {
      name: attrName,
      value: value
    };
  }
  return result;
}

function parseInputElement(element){
  var data = {
      type: element.attr('type') || 'text'
  };
  switch (data.type) {
    case 'text':
    case 'email':
    case 'password':
      data.value = element.val();
      break;
  }
  return data;
}

function parseValidationAttributes(element){
  var attributes = getElementDataAttributes(element);
  this.bindRules(attributes,{
    'minLength':minLengthValidationRule
  });
}

function bindRules(attributes,rules){
  for(var ruleName in rules){
    var attribute = attributes[ruleName];
    if(attribute){
      var ruleHandler = rules[ruleName];
      this.rules.push(ruleHandler(attribute.value));
    }
  }
}

function minLengthValidationRule(attribute){
  var minLength = attribute;
  return function(value){
    if(value.length == 0){
      return 'Поле не может быть пустым';
    }else
    if(value.length < minLength){
      return 'Минимальная длина '+ minLength+' символов';
    }
  }
}

function dataTypeValidationRule(attribute){
  return function(value){
      switch(attribute){
        case 'email':
          if(!isEmail(value)){
            return 'Укажите свой емейл';
          }
      }
  }
}
