$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            var URL = "https://crdcobfj67.execute-api.us-east-1.amazonaws.com/01/contact-us"
            var data = {
                name: name,
                email: email,
                message: message
            }
            $.ajax({
                type: "POST",
                url : URL,
                dataType: "json",
                crossDomain: "true",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                
                success: function () {
                  // Success message
                  $("#success").html("<div class='alert alert-success'>");
                  $("#success > .alert-success")
                      .html(
                          "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                      )
                      .append("</button>");
                  $("#success > .alert-success").append(
                      "<strong>Your message has been sent. I will respond within 1 business day. </strong>"
                  );
                  $("#success > .alert-success").append("</div>");
                  //clear all fields
                  $("#contactForm").trigger("reset");
              },
                error: function () {
                  // Fail message
                  $("#success").html("<div class='alert alert-danger'>");
                  $("#success > .alert-danger")
                      .html(
                          "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                      )
                      .append("</button>");
                  $("#success > .alert-danger").append(
                      $("<strong>").text(
                          "Sorry " +
                              firstName +
                              ", it seems that my mail server is not responding. Please try again later!"
                      )
                  );
                  $("#success > .alert-danger").append("</div>");
                  //clear all fields
                  $("#contactForm").trigger("reset");
              }});
                setTimeout(function () {
                    $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                }, 1000);
            }
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});
