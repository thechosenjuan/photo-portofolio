// function submitForm() {
//   _('submitBtn').disable = true;
//   _('status').innerHTML = 'please wait...';

//   var formData = new FormData();
//   formData.append('name', _('name').value);
//   formData.append('email', _('email').value);
//   formData.append('subject', _('subject').value);
//   formData.append('message', _('message').value);

//   var ajax = new XMLHttpRequest();
//   debugger;
//   ajax.open('POST', '../data/processContact.php');
//   debugger;
//   ajax.onreadystatechange = function() {
//     if (ajax.status == 200) {
//       if (ajax.responseText == 'success') {
//         _('contactFrm').innerHTML = '<h2>Form sent</h2>';
//       } else {
//         _('status').innerHTML = ajax.responseText;
//         _('submitBtn').disable = false;
//       }
//     }
//   };
//   ajax.send(formData);
// }

// function _(id) {
//   return document.getElementById(id);
// }

$(function() {
  // Get the form.
  var form = $('#contactForm');

  // Get the messages div.
  var formMessages = $('#form-messages');

  // Set up an event listener for the contact form.
  $(form).submit(function(event) {
    // Stop the browser from submitting the form.
    event.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData,
    })
      .done(function(response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $('#name').val('');
        $('#email').val('');
        $('#subject').val('');
        $('#message').val('');
      })
      .fail(function(data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');

        // Set the message text.
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text(
            'Oops! An error occured and your message could not be sent.'
          );
        }
      });
  });
});
