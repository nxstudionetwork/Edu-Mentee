window.renderPage = window.renderPage || {};

(function() {
  function showToast(message, type) {
    type = type || 'info';
    var container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type + ' c-transition';
    var icons = { success: '\u2713', error: '\u2715', info: '\u2139', warning: '\u26A0' };
    toast.innerHTML = '<span>' + (icons[type] || '') + '</span><span>' + Utils.sanitizeHTML(message) + '</span>';
    container.appendChild(toast);
    setTimeout(function() {
      toast.classList.add('toast-hiding');
      setTimeout(function() { if (toast.parentNode) toast.remove(); }, 300);
    }, 3000);
  }

  function renderAuthShell(title, subtitle, content, footerContent) {
    return '\
<div class="auth-page">\
  <div class="auth-bg-shapes">\
    <div class="auth-shape auth-shape-1"></div>\
    <div class="auth-shape auth-shape-2"></div>\
    <div class="auth-shape auth-shape-3"></div>\
  </div>\
  <div class="auth-container">\
    <div class="auth-card animate-scaleIn">\
      <div class="auth-logo">\
        <div class="auth-logo-icon">EM</div>\
        <div class="auth-logo-text"><span>Edu</span>Mentee</div>\
      </div>\
      <h1 class="auth-title">' + title + '</h1>\
      <p class="auth-subtitle">' + subtitle + '</p>\
      ' + content + '\
      <div class="auth-footer">' + footerContent + '</div>\
    </div>\
  </div>\
</div>';
  }

  var authState = {
    resetEmail: '',
    otp: '',
    otpGenerated: ''
  };

  window.renderPage.login = function(params) {
    var app = document.getElementById('app');
    app.innerHTML = '\
<div class="auth-page">\
  <div class="auth-bg-shapes">\
    <div class="auth-shape auth-shape-1"></div>\
    <div class="auth-shape auth-shape-2"></div>\
    <div class="auth-shape auth-shape-3"></div>\
  </div>\
  <div class="auth-container">\
    <div class="auth-card animate-scaleIn">\
      <div class="auth-logo">\
        <div class="auth-logo-icon">EM</div>\
        <div class="auth-logo-text"><span>Edu</span>Mentee</div>\
      </div>\
      <h1 class="auth-title">Welcome Back</h1>\
      <p class="auth-subtitle">Sign in to continue your learning journey</p>\
      <form id="login-form" onsubmit="return false">\
        <div class="input-group">\
          <label class="input-label" for="login-email">Email Address</label>\
          <input type="email" class="input-field" id="login-email" placeholder="you@example.com" autocomplete="email" required>\
          <div class="text-xs text-accent-red c-hidden" id="login-email-error" style="margin-top:4px"></div>\
        </div>\
        <div class="input-group" style="margin-top:var(--space-4)">\
          <label class="input-label" for="login-password">Password</label>\
          <input type="password" class="input-field" id="login-password" placeholder="Enter your password" autocomplete="current-password" required>\
          <div class="text-xs text-accent-red c-hidden" id="login-password-error" style="margin-top:4px"></div>\
        </div>\
        <div class="c-flex c-flex-between" style="margin-top:var(--space-4)">\
          <label class="checkbox-group">\
            <input type="checkbox" id="login-remember">\
            <span class="text-sm text-secondary">Remember me</span>\
          </label>\
          <a href="#/forgot-password" class="text-sm font-medium c-text-accent">Forgot password?</a>\
        </div>\
        <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top:var(--space-6)" id="login-submit-btn">\
          <span id="login-btn-text">Sign In</span>\
          <span class="animate-spin c-hidden c-inline-block" id="login-btn-spinner" style="width:18px;height:18px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff"></span>\
        </button>\
      </form>\
      <div class="auth-divider">\
        <span class="auth-divider-line"></span>\
        <span class="auth-divider-text">or continue with</span>\
        <span class="auth-divider-line"></span>\
      </div>\
      <div class="auth-social">\
        <button class="auth-social-btn" data-social="google" type="button">\
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>\
        </button>\
        <button class="auth-social-btn" data-social="microsoft" type="button">\
          <svg width="18" height="18" viewBox="0 0 23 23"><rect x="1" y="1" width="10" height="10" fill="#f25022"/><rect x="12" y="1" width="10" height="10" fill="#7fba00"/><rect x="1" y="12" width="10" height="10" fill="#00a4ef"/><rect x="12" y="12" width="10" height="10" fill="#ffb900"/></svg>\
        </button>\
        <button class="auth-social-btn" data-social="github" type="button">\
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>\
        </button>\
      </div>\
      <div class="auth-footer">\
        Don\'t have an account? <a href="#/signup">Sign up</a>\
      </div>\
    </div>\
  </div>\
</div>';

    var emailInput = document.getElementById('login-email');
    var passwordInput = document.getElementById('login-password');
    var emailError = document.getElementById('login-email-error');
    var passwordError = document.getElementById('login-password-error');
    var submitBtn = document.getElementById('login-submit-btn');
    var btnText = document.getElementById('login-btn-text');
    var btnSpinner = document.getElementById('login-btn-spinner');

    function clearErrors() {
      emailInput.classList.remove('error');
      passwordInput.classList.remove('error');
      emailError.classList.add('c-hidden');
      passwordError.classList.add('c-hidden');
    }

    function showFieldError(input, errorEl, msg) {
      input.classList.add('error');
      errorEl.textContent = msg;
      errorEl.classList.remove('c-hidden');
    }

    document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      clearErrors();
      var email = emailInput.value.trim();
      var password = passwordInput.value;
      var valid = true;

      if (!email) {
        showFieldError(emailInput, emailError, 'Email is required');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFieldError(emailInput, emailError, 'Please enter a valid email address');
        valid = false;
      }

      if (!password) {
        showFieldError(passwordInput, passwordError, 'Password is required');
        valid = false;
      } else if (password.length < 6) {
        showFieldError(passwordInput, passwordError, 'Password must be at least 6 characters');
        valid = false;
      }

      if (!valid) return;

      submitBtn.disabled = true;
      btnText.classList.add('c-hidden');
      btnSpinner.classList.remove('c-hidden');

      API.login(email, password).then(function(res) {
        if (res.success) {
          App.authStateChanged();
        } else {
          showFieldError(passwordInput, passwordError, res.error || 'Invalid email or password');
          submitBtn.disabled = false;
          btnText.classList.remove('c-hidden');
          btnSpinner.classList.add('c-hidden');
        }
      }).catch(function() {
        showFieldError(passwordInput, passwordError, 'An error occurred. Please try again.');
        submitBtn.disabled = false;
        btnText.classList.remove('c-hidden');
        btnSpinner.classList.add('c-hidden');
      });
    });

    var socialBtns = document.querySelectorAll('.auth-social-btn');
    for (var i = 0; i < socialBtns.length; i++) {
      socialBtns[i].addEventListener('click', function() {
        showToast('Social login coming soon!', 'info');
      });
    }
  };

  window.renderPage.signup = function(params) {
    var app = document.getElementById('app');
    var signupData = {};
    var currentStep = 1;
    var totalSteps = 4;
    var selectedClass = null;
    var selectedStream = null;

    function render() {
      var progressHtml = '\
<div class="c-flex c-flex-center c-flex-gap-2" style="margin-bottom:var(--space-6)">';
      for (var s = 1; s <= totalSteps; s++) {
        var isActive = s === currentStep;
        var isDone = s < currentStep;
        var stepClass = isActive ? 'badge badge-blue' : (isDone ? 'badge badge-green' : 'badge');
        var label = '';
        if (s === 1) label = 'Info';
        else if (s === 2) label = 'School';
        else if (s === 3) label = 'Class';
        else if (s === 4) label = 'Password';
        progressHtml += '\
  <div class="' + stepClass + '">\
    <span>' + (isDone ? '\u2713' : s) + '</span>\
    <span style="margin-left:4px">' + label + '</span>\
  </div>';
        if (s < totalSteps) {
          progressHtml += '\
  <div style="width:24px;height:1px;background:' + (isDone ? 'var(--accent-green)' : 'var(--border-color)') + '"></div>';
        }
      }
      progressHtml += '\
</div>';

      var stepContent = '';
      if (currentStep === 1) {
        stepContent = '\
<div class="animate-fadeInUp">\
  <div class="input-group">\
    <label class="input-label" for="signup-name">Full Name</label>\
    <input type="text" class="input-field" id="signup-name" placeholder="Enter your full name" value="' + Utils.sanitizeHTML(signupData.name || '') + '" autocomplete="name">\
    <div class="text-xs text-accent-red c-hidden" id="signup-name-error" style="margin-top:4px"></div>\
  </div>\
  <div class="input-group" style="margin-top:var(--space-4)">\
    <label class="input-label" for="signup-email">Email Address</label>\
    <input type="email" class="input-field" id="signup-email" placeholder="you@example.com" value="' + Utils.sanitizeHTML(signupData.email || '') + '" autocomplete="email">\
    <div class="text-xs text-accent-red c-hidden" id="signup-email-error" style="margin-top:4px"></div>\
  </div>\
  <div class="input-group" style="margin-top:var(--space-4)">\
    <label class="input-label" for="signup-phone">Phone Number</label>\
    <input type="tel" class="input-field" id="signup-phone" placeholder="Enter 10-digit phone number" value="' + Utils.sanitizeHTML(signupData.phone || '') + '" autocomplete="tel" maxlength="10">\
    <div class="text-xs text-accent-red c-hidden" id="signup-phone-error" style="margin-top:4px"></div>\
  </div>\
</div>';
      } else if (currentStep === 2) {
        stepContent = '\
<div class="animate-fadeInUp">\
  <div class="input-group">\
    <label class="input-label" for="signup-school">School Name</label>\
    <input type="text" class="input-field" id="signup-school" placeholder="Enter your school name" value="' + Utils.sanitizeHTML(signupData.school || '') + '">\
    <div class="text-xs text-accent-red c-hidden" id="signup-school-error" style="margin-top:4px"></div>\
  </div>\
  <div class="input-group" style="margin-top:var(--space-4)">\
    <label class="input-label" for="signup-board">Board</label>\
    <select class="input-field" id="signup-board">\
      <option value="">Select Board</option>\
      <option value="CBSE"' + (signupData.board === 'CBSE' ? ' selected' : '') + '>CBSE</option>\
      <option value="ICSE"' + (signupData.board === 'ICSE' ? ' selected' : '') + '>ICSE</option>\
      <option value="State Board"' + (signupData.board === 'State Board' ? ' selected' : '') + '>State Board</option>\
    </select>\
    <div class="text-xs text-accent-red c-hidden" id="signup-board-error" style="margin-top:4px"></div>\
  </div>\
  <div class="input-group" style="margin-top:var(--space-4)">\
    <label class="input-label" for="signup-country">Country</label>\
    <input type="text" class="input-field" id="signup-country" placeholder="Country" value="' + Utils.sanitizeHTML(signupData.country || 'India') + '">\
    <div class="text-xs text-accent-red c-hidden" id="signup-country-error" style="margin-top:4px"></div>\
  </div>\
  <div class="flex gap-4" style="margin-top:var(--space-4)">\
    <div class="input-group flex-1">\
      <label class="input-label" for="signup-state">State</label>\
      <input type="text" class="input-field" id="signup-state" placeholder="State" value="' + Utils.sanitizeHTML(signupData.state || '') + '">\
      <div class="text-xs text-accent-red c-hidden" id="signup-state-error" style="margin-top:4px"></div>\
    </div>\
    <div class="input-group flex-1">\
      <label class="input-label" for="signup-city">City</label>\
      <input type="text" class="input-field" id="signup-city" placeholder="City" value="' + Utils.sanitizeHTML(signupData.city || '') + '">\
      <div class="text-xs text-accent-red c-hidden" id="signup-city-error" style="margin-top:4px"></div>\
    </div>\
  </div>\
</div>';
      } else if (currentStep === 3) {
        var classes = [1,2,3,4,5,6,7,8,9,10,11,12];
        var classGrid = '\
<div class="animate-fadeInUp">\
  <label class="input-label" style="margin-bottom:var(--space-3)">Select Your Class</label>\
  <div class="stream-options" id="signup-class-grid">';
        for (var c = 0; c < classes.length; c++) {
          var cls = classes[c];
          var sel = selectedClass === cls ? ' selected' : '';
          classGrid += '\
    <button class="stream-option' + sel + '" data-class="' + cls + '" type="button">Class ' + cls + '</button>';
        }
        classGrid += '\
    <button class="stream-option' + (selectedClass === 'self' ? ' selected' : '') + '" data-class="self" type="button">Self Learner</button>\
  </div>\
  <div class="text-xs text-accent-red c-hidden" id="signup-class-error" style="margin-top:4px"></div>';

        if (selectedClass === 11 || selectedClass === 12) {
          var streams = [
            { id: 'MPC', label: 'MPC', sub: 'Maths, Physics, Chemistry' },
            { id: 'BiPC', label: 'BiPC', sub: 'Biology, Physics, Chemistry' },
            { id: 'CEC', label: 'CEC', sub: 'Commerce, Economics, Civics' },
            { id: 'MEC', label: 'MEC', sub: 'Maths, Economics, Commerce' },
            { id: 'HEC', label: 'HEC', sub: 'History, Economics, Civics' },
            { id: 'Commerce', label: 'Commerce', sub: 'Business, Accountancy, Eco' },
            { id: 'Arts', label: 'Arts', sub: 'History, Pol Science, Geo' },
            { id: 'Humanities', label: 'Humanities', sub: 'Psychology, Sociology, English' }
          ];
          classGrid += '\
  <div style="margin-top:var(--space-5)">\
    <label class="input-label" style="margin-bottom:var(--space-3)">Select Stream</label>\
    <div class="stream-options">';
          for (var st = 0; st < streams.length; st++) {
            var stream = streams[st];
            var streamSel = selectedStream === stream.id ? ' selected' : '';
            classGrid += '\
      <button class="stream-option' + streamSel + '" data-stream="' + stream.id + '" type="button">\
        <div class="font-semibold">' + stream.label + '</div>\
        <div class="text-xs text-tertiary" style="margin-top:2px">' + stream.sub + '</div>\
      </button>';
          }
          classGrid += '\
    </div>\
  </div>';
        }

        classGrid += '\
</div>';
        stepContent = classGrid;
      } else if (currentStep === 4) {
        stepContent = '\
<div class="animate-fadeInUp">\
  <div class="input-group">\
    <label class="input-label" for="signup-password">Create Password</label>\
    <input type="password" class="input-field" id="signup-password" placeholder="At least 8 characters" autocomplete="new-password">\
    <div class="text-xs text-accent-red c-hidden" id="signup-password-error" style="margin-top:4px"></div>\
  </div>\
  <div class="c-mt-2" id="signup-password-strength"></div>\
  <div class="input-group" style="margin-top:var(--space-4)">\
    <label class="input-label" for="signup-confirm">Confirm Password</label>\
    <input type="password" class="input-field" id="signup-confirm" placeholder="Re-enter your password" autocomplete="new-password">\
    <div class="text-xs text-accent-red c-hidden" id="signup-confirm-error" style="margin-top:4px"></div>\
  </div>\
  <label class="checkbox-group" style="margin-top:var(--space-5)">\
    <input type="checkbox" id="signup-terms">\
    <span class="text-sm text-secondary">I agree to the <a href="#" class="c-text-accent">Terms of Service</a> and <a href="#" class="c-text-accent">Privacy Policy</a></span>\
  </label>\
  <div class="text-xs text-accent-red c-hidden" id="signup-terms-error" style="margin-top:4px"></div>\
</div>';
      }

      var navHtml = '\
<div class="c-flex c-flex-between" style="margin-top:var(--space-6)">\
  <button class="btn btn-secondary" id="signup-back-btn" ' + (currentStep === 1 ? 'style="visibility:hidden"' : '') + ' type="button">\
    <span aria-hidden="true">&larr;</span> Back\
  </button>\
  <button class="btn btn-primary" id="signup-next-btn" type="button">\
    ' + (currentStep === totalSteps ? 'Create Account' : 'Continue') + ' ' + (currentStep < totalSteps ? '<span aria-hidden="true">&rarr;</span>' : '') + '\
  </button>\
</div>';

      var socialHtml = '';
      if (currentStep === 1) {
        socialHtml = '\
<div class="auth-divider">\
  <span class="auth-divider-line"></span>\
  <span class="auth-divider-text">or sign up with</span>\
  <span class="auth-divider-line"></span>\
</div>\
<div class="auth-social" style="margin-bottom:var(--space-4)">\
  <button class="auth-social-btn" data-social="google" type="button"><svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg></button>\
  <button class="auth-social-btn" data-social="microsoft" type="button"><svg width="18" height="18" viewBox="0 0 23 23"><rect x="1" y="1" width="10" height="10" fill="#f25022"/><rect x="12" y="1" width="10" height="10" fill="#7fba00"/><rect x="1" y="12" width="10" height="10" fill="#00a4ef"/><rect x="12" y="12" width="10" height="10" fill="#ffb900"/></svg></button>\
  <button class="auth-social-btn" data-social="github" type="button"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg></button>\
</div>';
      }

      var html = '\
<div class="auth-page">\
  <div class="auth-bg-shapes">\
    <div class="auth-shape auth-shape-1"></div>\
    <div class="auth-shape auth-shape-2"></div>\
    <div class="auth-shape auth-shape-3"></div>\
  </div>\
  <div class="auth-container">\
    <div class="auth-card">\
      <div class="auth-logo">\
        <div class="auth-logo-icon">EM</div>\
        <div class="auth-logo-text"><span>Edu</span>Mentee</div>\
      </div>\
      <h1 class="auth-title">Create Account</h1>\
      <p class="auth-subtitle">Join millions of learners on EduMentee</p>\
      ' + progressHtml + '\
      <div id="signup-step-content">' + stepContent + '</div>\
      <div id="signup-navigation">' + navHtml + '</div>\
      ' + socialHtml + '\
      <div class="auth-footer">\
        Already have an account? <a href="#/login">Sign in</a>\
      </div>\
    </div>\
  </div>\
</div>';

      app.innerHTML = html;
      attachEvents();
    }

    function saveStepData() {
      if (currentStep === 1) {
        signupData.name = document.getElementById('signup-name').value.trim();
        signupData.email = document.getElementById('signup-email').value.trim();
        signupData.phone = document.getElementById('signup-phone').value.trim();
      } else if (currentStep === 2) {
        signupData.school = document.getElementById('signup-school').value.trim();
        signupData.board = document.getElementById('signup-board').value;
        signupData.country = document.getElementById('signup-country').value.trim();
        signupData.state = document.getElementById('signup-state').value.trim();
        signupData.city = document.getElementById('signup-city').value.trim();
      }
    }

    function validateStep() {
      var valid = true;
      if (currentStep === 1) {
        var name = document.getElementById('signup-name').value.trim();
        var email = document.getElementById('signup-email').value.trim();
        var phone = document.getElementById('signup-phone').value.trim();
        var nameErr = document.getElementById('signup-name-error');
        var emailErr = document.getElementById('signup-email-error');
        var phoneErr = document.getElementById('signup-phone-error');
        var nameInput = document.getElementById('signup-name');
        var emailInput = document.getElementById('signup-email');
        var phoneInput = document.getElementById('signup-phone');

        nameErr.classList.add('c-hidden');
        emailErr.classList.add('c-hidden');
        phoneErr.classList.add('c-hidden');
        nameInput.classList.remove('error');
        emailInput.classList.remove('error');
        phoneInput.classList.remove('error');

        if (!name || name.length < 2) {
          nameErr.textContent = 'Please enter your full name (min 2 characters)';
          nameErr.classList.remove('c-hidden');
          nameInput.classList.add('error');
          valid = false;
        }
        if (!email) {
          emailErr.textContent = 'Email is required';
          emailErr.classList.remove('c-hidden');
          emailInput.classList.add('error');
          valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          emailErr.textContent = 'Please enter a valid email address';
          emailErr.classList.remove('c-hidden');
          emailInput.classList.add('error');
          valid = false;
        }
        if (!phone) {
          phoneErr.textContent = 'Phone number is required';
          phoneErr.classList.remove('c-hidden');
          phoneInput.classList.add('error');
          valid = false;
        } else if (!/^[6-9]\d{9}$/.test(phone)) {
          phoneErr.textContent = 'Please enter a valid 10-digit Indian phone number';
          phoneErr.classList.remove('c-hidden');
          phoneInput.classList.add('error');
          valid = false;
        }
        if (valid) saveStepData();
      } else if (currentStep === 2) {
        var school = document.getElementById('signup-school').value.trim();
        var board = document.getElementById('signup-board').value;
        var country = document.getElementById('signup-country').value.trim();
        var state = document.getElementById('signup-state').value.trim();
        var city = document.getElementById('signup-city').value.trim();
        var schoolErr = document.getElementById('signup-school-error');
        var boardErr = document.getElementById('signup-board-error');
        var countryErr = document.getElementById('signup-country-error');
        var stateErr = document.getElementById('signup-state-error');
        var cityErr = document.getElementById('signup-city-error');
        var schoolInput = document.getElementById('signup-school');
        var boardInput = document.getElementById('signup-board');
        var countryInput = document.getElementById('signup-country');
        var stateInput = document.getElementById('signup-state');
        var cityInput = document.getElementById('signup-city');

        schoolErr.classList.add('c-hidden');
        boardErr.classList.add('c-hidden');
        countryErr.classList.add('c-hidden');
        stateErr.classList.add('c-hidden');
        cityErr.classList.add('c-hidden');
        schoolInput.classList.remove('error');
        boardInput.classList.remove('error');
        countryInput.classList.remove('error');
        stateInput.classList.remove('error');
        cityInput.classList.remove('error');

        if (!school) { schoolErr.textContent = 'School name is required'; schoolErr.classList.remove('c-hidden'); schoolInput.classList.add('error'); valid = false; }
        if (!board) { boardErr.textContent = 'Please select your board'; boardErr.classList.remove('c-hidden'); boardInput.classList.add('error'); valid = false; }
        if (!country) { countryErr.textContent = 'Country is required'; countryErr.classList.remove('c-hidden'); countryInput.classList.add('error'); valid = false; }
        if (!state) { stateErr.textContent = 'State is required'; stateErr.classList.remove('c-hidden'); stateInput.classList.add('error'); valid = false; }
        if (!city) { cityErr.textContent = 'City is required'; cityErr.classList.remove('c-hidden'); cityInput.classList.add('error'); valid = false; }
        if (valid) saveStepData();
      } else if (currentStep === 3) {
        if (!selectedClass) {
          var classErr = document.getElementById('signup-class-error');
          classErr.textContent = 'Please select your class';
          classErr.classList.remove('c-hidden');
          valid = false;
        }
        if ((selectedClass === 11 || selectedClass === 12) && !selectedStream) {
          var streamErr = document.getElementById('signup-class-error');
          streamErr.textContent = 'Please select your stream';
          streamErr.classList.remove('c-hidden');
          valid = false;
        }
      } else if (currentStep === 4) {
        var password = document.getElementById('signup-password').value;
        var confirm = document.getElementById('signup-confirm').value;
        var terms = document.getElementById('signup-terms').checked;
        var passErr = document.getElementById('signup-password-error');
        var confirmErr = document.getElementById('signup-confirm-error');
        var termsErr = document.getElementById('signup-terms-error');
        var passInput = document.getElementById('signup-password');
        var confirmInput = document.getElementById('signup-confirm');

        passErr.classList.add('c-hidden');
        confirmErr.classList.add('c-hidden');
        termsErr.classList.add('c-hidden');
        passInput.classList.remove('error');
        confirmInput.classList.remove('error');

        if (!password || password.length < 8) {
          passErr.textContent = 'Password must be at least 8 characters';
          passErr.classList.remove('c-hidden');
          passInput.classList.add('error');
          valid = false;
        }
        if (!confirm) {
          confirmErr.textContent = 'Please confirm your password';
          confirmErr.classList.remove('c-hidden');
          confirmInput.classList.add('error');
          valid = false;
        } else if (password !== confirm) {
          confirmErr.textContent = 'Passwords do not match';
          confirmErr.classList.remove('c-hidden');
          confirmInput.classList.add('error');
          valid = false;
        }
        if (!terms) {
          termsErr.textContent = 'You must agree to the terms and conditions';
          termsErr.classList.remove('c-hidden');
          valid = false;
        }
      }
      return valid;
    }

    function handleNext() {
      if (!validateStep()) return;

      if (currentStep === totalSteps) {
        var submitBtn = document.getElementById('signup-next-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';

        var payload = {
          name: signupData.name,
          email: signupData.email,
          phone: signupData.phone,
          school: signupData.school,
          board: signupData.board,
          country: signupData.country,
          state: signupData.state,
          city: signupData.city,
          class: selectedClass === 'self' ? null : selectedClass,
          stream: selectedStream || null,
          password: document.getElementById('signup-password').value
        };

        API.signup(payload).then(function(res) {
          if (res.success) {
            showToast('Account created successfully! Welcome to EduMentee.', 'success');
            App.authStateChanged();
          } else {
            showToast(res.error || 'Failed to create account', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Create Account';
          }
        }).catch(function() {
          showToast('An error occurred. Please try again.', 'error');
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Create Account';
        });
        return;
      }

      currentStep++;
      render();
    }

    function handleBack() {
      if (currentStep > 1) {
        saveStepData();
        currentStep--;
        render();
      }
    }

    function updatePasswordStrength() {
      var pw = document.getElementById('signup-password').value;
      var container = document.getElementById('signup-password-strength');
      if (!container) return;
      if (!pw) { container.innerHTML = ''; return; }

      var score = 0;
      if (pw.length >= 8) score++;
      if (pw.length >= 12) score++;
      if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
      if (/\d/.test(pw)) score++;
      if (/[^a-zA-Z0-9]/.test(pw)) score++;

      var labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
      var colors = ['var(--accent-red)', 'var(--accent-orange)', 'var(--accent-yellow)', 'var(--accent-green)', 'var(--accent-green)'];
      var widths = ['25%', '50%', '75%', '90%', '100%'];
      var idx = Math.min(score, 4);

      container.innerHTML = '\
<div class="progress-bar" style="margin-top:var(--space-1);height:6px">\
  <div class="progress-bar-fill" style="width:' + widths[idx] + ';background:' + colors[idx] + '"></div>\
</div>\
<div class="text-xs" style="color:' + colors[idx] + ';margin-top:2px">' + labels[idx] + '</div>';
    }

    function attachEvents() {
      if (currentStep === 4) {
        var passInput = document.getElementById('signup-password');
        if (passInput) {
          passInput.addEventListener('input', updatePasswordStrength);
        }
      }

      if (currentStep === 3) {
        var classButtons = document.querySelectorAll('#signup-class-grid .stream-option');
        for (var ci = 0; ci < classButtons.length; ci++) {
          classButtons[ci].addEventListener('click', function() {
            var allBtns = document.querySelectorAll('#signup-class-grid .stream-option');
            for (var bi = 0; bi < allBtns.length; bi++) {
              allBtns[bi].classList.remove('selected');
            }
            this.classList.add('selected');
            selectedClass = this.getAttribute('data-class');
            if (this.getAttribute('data-class') === 'self') {
              selectedClass = 'self';
            } else {
              selectedClass = parseInt(this.getAttribute('data-class'), 10);
            }
            selectedStream = null;
            var err = document.getElementById('signup-class-error');
            if (err) err.classList.add('c-hidden');
            render();
          });
        }

        var streamButtons = document.querySelectorAll('.stream-option[data-stream]');
        for (var si = 0; si < streamButtons.length; si++) {
          streamButtons[si].addEventListener('click', function() {
            var allStream = document.querySelectorAll('.stream-option[data-stream]');
            for (var bi2 = 0; bi2 < allStream.length; bi2++) {
              allStream[bi2].classList.remove('selected');
            }
            this.classList.add('selected');
            selectedStream = this.getAttribute('data-stream');
            var err = document.getElementById('signup-class-error');
            if (err) err.classList.add('c-hidden');
          });
        }
      }

      var nextBtn = document.getElementById('signup-next-btn');
      if (nextBtn) nextBtn.addEventListener('click', handleNext);

      var backBtn = document.getElementById('signup-back-btn');
      if (backBtn) backBtn.addEventListener('click', handleBack);

      var socialBtns = document.querySelectorAll('.auth-social-btn');
      for (var si2 = 0; si2 < socialBtns.length; si2++) {
        socialBtns[si2].addEventListener('click', function() {
          showToast('Social signup coming soon!', 'info');
        });
      }
    }

    render();
  };

  window.renderPage.forgotPassword = function(params) {
    var app = document.getElementById('app');
    var sent = false;

    function render() {
      var content;
      if (sent) {
        content = '\
<div class="c-text-center animate-fadeInUp" style="padding:var(--space-4) 0">\
  <div style="font-size:3rem;margin-bottom:var(--space-4)">\u2709\uFE0F</div>\
  <h2 class="c-fs-lg c-fw-semibold" style="margin-bottom:var(--space-2)">OTP Sent!</h2>\
  <p class="text-sm text-secondary" style="margin-bottom:var(--space-6)">We\'ve sent a 6-digit OTP to your email. Please check your inbox.</p>\
  <button class="btn btn-primary btn-block btn-lg" id="otp-sent-btn" type="button">Enter OTP</button>\
</div>';
      } else {
        content = '\
<form id="forgot-form" onsubmit="return false">\
  <p class="text-sm text-secondary c-text-center" style="margin-bottom:var(--space-6)">Enter your registered email address and we\'ll send you a password reset OTP.</p>\
  <div class="input-group">\
    <label class="input-label" for="forgot-email">Email Address</label>\
    <input type="email" class="input-field" id="forgot-email" placeholder="you@example.com" autocomplete="email" required>\
    <div class="text-xs text-accent-red c-hidden" id="forgot-email-error" style="margin-top:4px"></div>\
  </div>\
  <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top:var(--space-6)" id="forgot-submit-btn">\
    <span id="forgot-btn-text">Send OTP</span>\
    <span class="animate-spin c-hidden c-inline-block" id="forgot-btn-spinner" style="width:18px;height:18px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%"></span>\
  </button>\
</form>';
      }

      app.innerHTML = renderAuthShell(
        'Forgot Password?',
        'No worries, we\'ll help you reset it',
        content,
        'Remember your password? <a href="#/login">Back to login</a>'
      );

      if (sent) {
        document.getElementById('otp-sent-btn').addEventListener('click', function() {
          Router.navigate('/otp-verification');
        });
      } else {
        document.getElementById('forgot-form').addEventListener('submit', function(e) {
          e.preventDefault();
          var email = document.getElementById('forgot-email').value.trim();
          var emailError = document.getElementById('forgot-email-error');
          var emailInput = document.getElementById('forgot-email');
          emailError.classList.add('c-hidden');
          emailInput.classList.remove('error');

          if (!email) {
            emailError.textContent = 'Email is required';
            emailError.classList.remove('c-hidden');
            emailInput.classList.add('error');
            return;
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.classList.remove('c-hidden');
            emailInput.classList.add('error');
            return;
          }

          var submitBtn = document.getElementById('forgot-submit-btn');
          var btnText = document.getElementById('forgot-btn-text');
          var btnSpinner = document.getElementById('forgot-btn-spinner');
          submitBtn.disabled = true;
          btnText.classList.add('c-hidden');
          btnSpinner.classList.remove('c-hidden');

          var otp = String(Math.floor(100000 + Math.random() * 900000));
          authState.resetEmail = email;
          authState.otpGenerated = otp;

          setTimeout(function() {
            sent = true;
            render();
            showToast('OTP sent to ' + email, 'success');
          }, 800);
        });
      }
    }

    render();
  };

  window.renderPage.otpVerification = function(params) {
    var app = document.getElementById('app');
    var countdown = 30;
    var timerInterval = null;

    function render() {
      var otpInputs = '';
      for (var i = 0; i < 6; i++) {
        otpInputs += '<input type="text" class="input-field c-text-center c-fs-xl c-fw-bold" id="otp-' + i + '" maxlength="1" style="width:48px;height:56px;padding:0" inputmode="numeric" pattern="[0-9]" autocomplete="one-time-code">';
      }

      app.innerHTML = '\
<div class="auth-page">\
  <div class="auth-bg-shapes">\
    <div class="auth-shape auth-shape-1"></div>\
    <div class="auth-shape auth-shape-2"></div>\
    <div class="auth-shape auth-shape-3"></div>\
  </div>\
  <div class="auth-container">\
    <div class="auth-card animate-scaleIn">\
      <div class="auth-logo">\
        <div class="auth-logo-icon">EM</div>\
        <div class="auth-logo-text"><span>Edu</span>Mentee</div>\
      </div>\
      <h1 class="auth-title">Verify OTP</h1>\
      <p class="auth-subtitle">Enter the 6-digit OTP sent to <strong>' + Utils.sanitizeHTML(authState.resetEmail || 'your email') + '</strong></p>\
      <div class="c-flex-center c-flex-gap-2" style="margin:var(--space-8) 0" id="otp-container">' + otpInputs + '\
      </div>\
      <div class="text-xs text-accent-red c-text-center c-hidden" id="otp-error" style="margin-bottom:var(--space-3)"></div>\
      <button class="btn btn-primary btn-block btn-lg" id="otp-verify-btn" type="button">\
        <span id="otp-btn-text">Verify OTP</span>\
        <span class="animate-spin c-hidden c-inline-block" id="otp-btn-spinner" style="width:18px;height:18px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%"></span>\
      </button>\
      <div class="c-text-center" style="margin-top:var(--space-5)">\
        <span class="text-sm text-secondary">Didn\'t receive OTP? </span>\
        <button class="text-sm font-medium c-text-accent c-pointer" id="otp-resend-btn" style="background:none;border:none" disabled>\
          Resend in <span id="otp-countdown">30</span>s\
        </button>\
      </div>\
      <div class="auth-footer">\
        <a href="#/forgot-password">Back to forgot password</a>\
      </div>\
    </div>\
  </div>\
</div>';

      attachOtpEvents();
      startCountdown();
    }

    function startCountdown() {
      countdown = 30;
      if (timerInterval) clearInterval(timerInterval);
      var countdownEl = document.getElementById('otp-countdown');
      var resendBtn = document.getElementById('otp-resend-btn');
      resendBtn.disabled = true;

      timerInterval = setInterval(function() {
        countdown--;
        if (countdownEl) countdownEl.textContent = countdown;
        if (countdown <= 0) {
          clearInterval(timerInterval);
          timerInterval = null;
          if (resendBtn) {
            resendBtn.disabled = false;
            resendBtn.textContent = 'Resend OTP';
          }
        }
      }, 1000);
    }

    function attachOtpEvents() {
      var inputs = [];
      for (var i = 0; i < 6; i++) {
        inputs.push(document.getElementById('otp-' + i));
      }

      function focusNext(idx) {
        if (idx < 5) inputs[idx + 1].focus();
      }

      function focusPrev(idx) {
        if (idx > 0) inputs[idx - 1].focus();
      }

      function getOtpValue() {
        var val = '';
        for (var j = 0; j < 6; j++) {
          val += inputs[j].value;
        }
        return val;
      }

      for (var i2 = 0; i2 < 6; i2++) {
        inputs[i2].addEventListener('input', function() {
          this.value = this.value.replace(/[^0-9]/g, '');
          var idx = parseInt(this.id.split('-')[1], 10);
          if (this.value.length >= 1) {
            focusNext(idx);
          }
          var err = document.getElementById('otp-error');
          if (err) err.classList.add('c-hidden');
        });

        inputs[i2].addEventListener('keydown', function(e) {
          var idx = parseInt(this.id.split('-')[1], 10);
          if (e.key === 'Backspace' && this.value === '') {
            focusPrev(idx);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            focusNext(idx);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            focusPrev(idx);
          }
        });

        inputs[i2].addEventListener('focus', function() {
          this.select();
        });
      }

      inputs[0].addEventListener('paste', function(e) {
        e.preventDefault();
        var data = (e.clipboardData || window.clipboardData).getData('text');
        if (/^\d{6}$/.test(data)) {
          for (var k = 0; k < 6; k++) {
            inputs[k].value = data[k];
          }
          inputs[5].focus();
          var err = document.getElementById('otp-error');
          if (err) err.classList.add('c-hidden');
        }
      });

      document.getElementById('otp-verify-btn').addEventListener('click', function() {
        var otp = getOtpValue();
        var errorEl = document.getElementById('otp-error');

        if (otp.length < 6) {
          errorEl.textContent = 'Please enter the complete 6-digit OTP';
          errorEl.classList.remove('c-hidden');
          return;
        }

        var submitBtn = document.getElementById('otp-verify-btn');
        var btnText = document.getElementById('otp-btn-text');
        var btnSpinner = document.getElementById('otp-btn-spinner');
        submitBtn.disabled = true;
        btnText.classList.add('c-hidden');
        btnSpinner.classList.remove('c-hidden');

        setTimeout(function() {
          if (otp === authState.otpGenerated) {
            showToast('OTP verified successfully!', 'success');
            Router.navigate('/reset-password');
          } else {
            errorEl.textContent = 'Invalid OTP. Please try again.';
            errorEl.classList.remove('c-hidden');
            submitBtn.disabled = false;
            btnText.classList.remove('c-hidden');
            btnSpinner.classList.add('c-hidden');
          }
        }, 600);
      });

      document.getElementById('otp-resend-btn').addEventListener('click', function() {
        var otp = String(Math.floor(100000 + Math.random() * 900000));
        authState.otpGenerated = otp;
        showToast('New OTP sent to your email', 'success');
        for (var m = 0; m < 6; m++) {
          inputs[m].value = '';
        }
        inputs[0].focus();
        startCountdown();
      });
    }

    render();
  };

  window.renderPage.resetPassword = function(params) {
    var app = document.getElementById('app');

    function getStrength(pw) {
      if (!pw) return { score: 0, label: '', color: '', width: '0%' };
      var score = 0;
      if (pw.length >= 8) score++;
      if (pw.length >= 12) score++;
      if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
      if (/\d/.test(pw)) score++;
      if (/[^a-zA-Z0-9]/.test(pw)) score++;

      var labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
      var colors = ['transparent', 'var(--accent-red)', 'var(--accent-orange)', 'var(--accent-yellow)', 'var(--accent-green)', 'var(--accent-green)'];
      var widths = ['0%', '25%', '50%', '75%', '90%', '100%'];
      var idx = Math.min(score, 5);
      return { score: idx, label: labels[idx], color: colors[idx], width: widths[idx] };
    }

    function render() {
      app.innerHTML = '\
<div class="auth-page">\
  <div class="auth-bg-shapes">\
    <div class="auth-shape auth-shape-1"></div>\
    <div class="auth-shape auth-shape-2"></div>\
    <div class="auth-shape auth-shape-3"></div>\
  </div>\
  <div class="auth-container">\
    <div class="auth-card animate-scaleIn">\
      <div class="auth-logo">\
        <div class="auth-logo-icon">EM</div>\
        <div class="auth-logo-text"><span>Edu</span>Mentee</div>\
      </div>\
      <h1 class="auth-title">Reset Password</h1>\
      <p class="auth-subtitle">Choose a strong new password for your account</p>\
      <form id="reset-form" onsubmit="return false">\
        <div class="input-group">\
          <label class="input-label" for="reset-password">New Password</label>\
          <input type="password" class="input-field" id="reset-password" placeholder="At least 8 characters" autocomplete="new-password">\
          <div class="text-xs text-accent-red c-hidden" id="reset-password-error" style="margin-top:4px"></div>\
        </div>\
        <div class="c-mt-2" id="reset-strength"></div>\
        <div class="input-group" style="margin-top:var(--space-4)">\
          <label class="input-label" for="reset-confirm">Confirm New Password</label>\
          <input type="password" class="input-field" id="reset-confirm" placeholder="Re-enter new password" autocomplete="new-password">\
          <div class="text-xs text-accent-red c-hidden" id="reset-confirm-error" style="margin-top:4px"></div>\
        </div>\
        <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top:var(--space-6)" id="reset-submit-btn">\
          <span id="reset-btn-text">Reset Password</span>\
          <span class="animate-spin c-hidden c-inline-block" id="reset-btn-spinner" style="width:18px;height:18px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%"></span>\
        </button>\
      </form>\
      <div class="auth-footer">\
        <a href="#/login">Back to login</a>\
      </div>\
    </div>\
  </div>\
</div>';

      var passwordInput = document.getElementById('reset-password');
      var strengthEl = document.getElementById('reset-strength');

      passwordInput.addEventListener('input', function() {
        var pw = passwordInput.value;
        var s = getStrength(pw);
        if (!pw) {
          strengthEl.innerHTML = '';
          return;
        }
        strengthEl.innerHTML = '\
  <div class="progress-bar" style="height:6px">\
    <div class="progress-bar-fill" style="width:' + s.width + ';background:' + s.color + '"></div>\
  </div>\
  <div class="text-xs" style="color:' + s.color + ';margin-top:2px">' + s.label + '</div>';
      });

      document.getElementById('reset-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var password = passwordInput.value;
        var confirm = document.getElementById('reset-confirm').value;
        var passErr = document.getElementById('reset-password-error');
        var confirmErr = document.getElementById('reset-confirm-error');
        var passInput = passwordInput;
        var confirmInput = document.getElementById('reset-confirm');

        passErr.classList.add('c-hidden');
        confirmErr.classList.add('c-hidden');
        passInput.classList.remove('error');
        confirmInput.classList.remove('error');

        var valid = true;
        if (!password || password.length < 8) {
          passErr.textContent = 'Password must be at least 8 characters';
          passErr.classList.remove('c-hidden');
          passInput.classList.add('error');
          valid = false;
        }
        if (!confirm) {
          confirmErr.textContent = 'Please confirm your new password';
          confirmErr.classList.remove('c-hidden');
          confirmInput.classList.add('error');
          valid = false;
        } else if (password !== confirm) {
          confirmErr.textContent = 'Passwords do not match';
          confirmErr.classList.remove('c-hidden');
          confirmInput.classList.add('error');
          valid = false;
        }
        if (!valid) return;

        var submitBtn = document.getElementById('reset-submit-btn');
        var btnText = document.getElementById('reset-btn-text');
        var btnSpinner = document.getElementById('reset-btn-spinner');
        submitBtn.disabled = true;
        btnText.classList.add('c-hidden');
        btnSpinner.classList.remove('c-hidden');

        setTimeout(function() {
          authState.resetEmail = '';
          authState.otpGenerated = '';
          showToast('Password reset successful! You can now sign in with your new password.', 'success');
          Router.navigate('/login');
        }, 800);
      });
    }

    render();
  };
})();
