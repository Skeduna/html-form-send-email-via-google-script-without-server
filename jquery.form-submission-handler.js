$(function(){
  var forms = $('body').find('.gform');
  $(forms).on('submit', handleFormSubmit);
});

function getFormData(form) {
  var elements = $(form).find('input, textarea, select'); // all form elements
  var data = {};
  $(elements).each(function(index,element){
    data[element.name] = element.value;
  });
  return data;
}

function handleFormSubmit(event) {
  event.preventDefault();
  var form = $(event.target);
  var data = getFormData(form);
  var encoded = Object.keys(data).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
  }).join('&');

  form.hide();
  form.parent().find('.thank-you-message').show();

  var request = $.ajax({
    type: 'POST',
    url: event.target.action,
    data: encoded
  });

  request.done(function(data){
    console.log(data);
  });  
}

function validate(form){
  var valid = true;
  var elements = $(form).find('input, select, textarea');
  $(elements).each(function(index,element){
    if( $(element).attr('required') && (!element.value || element.value == '') ){
      valid = false;
      $(element).addClass('invalid');
    }
  });
  return valid;
}