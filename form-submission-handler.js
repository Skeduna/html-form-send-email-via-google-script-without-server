
function validEmail(email) { // see:
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}
// get all data in form and return object
function getFormData(form) {
  var elements = form.elements; // all form elements
  var fields = Object.keys(elements).filter(function(k){
    return k.length > 1 && elements[k].name && elements[k].name.length > 0 ;
  });
  var data = {};
  fields.forEach(function(k){
    data[k] = elements[k].value;
  });
  //console.log(data);
  return data;
}

function handleFormSubmit(event) {  // handles form submit withtout any jquery
  event.preventDefault();           // we are submitting via xhr below
  var debugData = '';
  var form = event.target;
  var debug = form.hasAttribute('data-debug');
  var data = getFormData(form);         // get the values submitted in the form
/*(if( !validEmail(data.email) ) {   // if email is not valid show error
  document.getElementById('email-invalid').style.display = 'block';
  return false;
} else {*/
  var url = event.target.action;  //
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  // xhr.withCredentials = true;
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
      //console.log( xhr.status, xhr.statusText )
      //console.log(xhr.responseText);
      if(debug){
        var debugOutput = document.createElement('PRE');
        debugOutput.setAttribute('class', 'form-debug');
        
        debugData += 'Form data: ' + data + '\n';
        debugData += 'Status: ' + xhr.status + '\n';
        debugData += 'Status Text: ' + xhr.statusText + '\n';
        debugData += 'Response: ' + xhr.responseText + '\n';
        
        debugOutput.innerHTML = debugData;

        form.parentNode.appendChild(debugOutput);
        
      }
      

      form.style.display = 'none'; // hide form
      form.parentElement.querySelector('.thank-you-message').style.display = 'block'; //thank you message should be a sibling of the form (inside of the form's parent element)
      return;
  };
  // url encode form data for sending as post data
  var encoded = Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
  }).join('&');
  xhr.send(encoded);
  /*}*/  
}
function loaded() {
  //console.log('contact form submission handler loaded successfully');
  // bind to the submit event of our form
  var forms = document.getElementsByClassName('gform');
  console.log(forms);
  for(var i=0; i < forms.length; i++){
    forms[i].addEventListener("submit", handleFormSubmit, false);
  }
}
document.addEventListener('DOMContentLoaded', loaded, false);