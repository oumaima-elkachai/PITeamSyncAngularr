"use strict"
$(document).on('click', '#sweet-success', function(e) {
    swal(
        'Success',
        'Make your <b style="color:#38E25D;">Success</b> story!',
        'success',
    )
});

$(document).on('click', '#sweet-error', function(e) {
    swal(
        'Error!',
        'You clicked the <b style="color:#FF4A55;">error</b> button!',
        'error'
    )
});

$(document).on('click', '#sweet-warning', function(e) {
    swal(
        'Warning!',
        'Be careful <b style="color:#FF9325;">warning</b> button!',
        'warning'
    )
});

$(document).on('click', '#sweet-info', function(e) {
    swal(
        'Info!',
        'You clicked the <b style="color:#5ECFFF;">info</b> button!',
        'info'
    )
});

$(document).on('click', '#sweet-question', function(e) {
    swal(
        'Question!',
        'You clicked the <b style="color:#924AEF;">question</b> button!',
        'question'
    )
});

// Alert With Custom Icon and Background Image
$(document).on('click', '#sweet-icon', function(event) {
    swal({
        title: 'Custom icon!',
        text: 'Alert with a custom image.',
        imageUrl: '../../assets/img/svg/bell.svg',
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'Custom Icon/Image',
        animation: false
    })
});

$(document).on('click', '#sweet-image', function(event) {
    swal({
        title: 'Modal with background image and width, padding.',
        width: 700,
        padding: 100,
        background: '#fff url(../../assets/img/company.jpg) center',
        color: '#fff'
    })
});

// Alert With Input Type
$(document).on('click', '#sweet-subscribe', function(e) {
    swal({
      title: 'Submit email to subscribe',
      input: 'email',
      inputPlaceholder: 'Enter Email',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (email === 'example@email.com') {
              swal.showValidationError(
                'This email is already taken.'
              )
            }
            resolve()
          }, 2000)
        })
      },
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        swal({
          type: 'success',
          title: 'Thank you for subscribe!',
          html: 'Submitted email: ' + result.value
        })
      }
    })
});

// Alert Redirect to Another Link
$(document).on('click', '#sweet-link', function(e) {
    swal({
        title: "Are you sure?", 
        text: "You will be redirected to #url", 
        type: "warning",
        confirmButtonText: "Yes, visit link!",
        showCancelButton: true
    })
        .then((result) => {
            if (result.value) {
                window.location = '#url';
            } else if (result.dismiss === 'cancel') {
                swal(
                  'Cancelled',
                  'Your stay here :)',
                  'error'
                )
            }
        })
});