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
            $this.prop("disabled", true);
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
                  // clear form and show a success message
                  alert("Successfull");
                  document.getElementById("contact-form").reset();
              location.reload();
                },
                error: function () {
                  // show an error message
                  alert("UnSuccessfull");
                }});
                setTimeout(function () {
                    $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                }, 1000);
            }
    });
});
