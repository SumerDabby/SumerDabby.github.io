// Enquiry Modal JS
// Expose a function to bind the enquiry form submit handler
console.log('[Enquiry Modal JS] Loaded');
window.bindEnquiryFormHandler = function() {
  console.log('[Enquiry Modal JS] bindEnquiryFormHandler called');
  var form = document.getElementById('enquiryForm');
  if (!form) {
    console.warn('[Enquiry Modal JS] enquiryForm not found in DOM');
    return;
  }
  console.log('[Enquiry Modal JS] enquiryForm found, attaching submit handler');
  form.onsubmit = function(e) {
    e.preventDefault();
    var formStatus = document.getElementById('formStatus');
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var mobile = form.mobile.value.trim();
    var subject = form.subject.value.trim();
    var message = form.message.value.trim();
    if (!name || !email || !mobile || !subject || !message) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.className = 'modal-status error';
      return;
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.className = 'modal-status error';
      return;
    }
    var mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      formStatus.textContent = 'Please enter a valid 10-digit mobile number.';
      formStatus.className = 'modal-status error';
      return;
    }
    formStatus.textContent = 'Sending inquiry...';
    formStatus.className = 'modal-status';
    var data = {
      name: name,
      email: email,
      mobile: mobile,
      subject: subject,
      message: message
    };
    fetch('https://api.shiwansh.com/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://www.shiwansh.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua-mobile': '?0'
      },
      body: JSON.stringify(data)
    })
    .then(function(response) {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(function(result) {
      formStatus.textContent = 'Thank you! Your inquiry has been sent successfully. I\'ll get back to you soon.';
      formStatus.className = 'modal-status success';
      form.reset();
      setTimeout(function() {
        if (window.modalManager) window.modalManager.close();
      }, 3000);
    })
    .catch(function(error) {
      formStatus.textContent = 'Submission failed. Please try again later.';
      formStatus.className = 'modal-status error';
    });
  };
}
