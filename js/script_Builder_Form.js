$("input").attr("maxlength", 100);
$("textarea").attr("maxlength", 2000);

var next_click = document.querySelectorAll(".next_button");
var back_click = document.querySelectorAll(".back_button");
var main_form = document.querySelectorAll(".main");
var step_list = document.querySelectorAll(".progress-bar li");
var num = document.querySelector(".step-number");
let formnumber = 0;


//function of next button 
next_click.forEach(function (next_click_form) {
  next_click_form.addEventListener("click", function (event) {
    event.preventDefault();
    if (!validateform()) {
      return false
    }
    formnumber++;
    updateform();
    progress_forward();
    contentchange();
    $('html, body').animate({
      scrollTop: 0
    }, 'slow');
  });
});

//function of back button
back_click.forEach(function (back_click_form) {
  back_click_form.addEventListener("click", function (event) {
    event.preventDefault();
    formnumber--;
    updateform();
    progress_backward();
    contentchange();
    $('html, body').animate({
      scrollTop: 0
    }, 'slow');
  });
});
//check if the input are filled
function validateform() {
  validate = true;
  var validate_inputs = document.querySelectorAll(".main.active input");
  var validate_textareas = document.querySelectorAll(".main.active textarea");
  validate_inputs.forEach(function (vaildate_input) {
    vaildate_input.classList.remove('warning');
    if (vaildate_input.hasAttribute('require')) {
      if (vaildate_input.value.length == 0) {
        validate = false;
        vaildate_input.classList.add('warning');
      }
    }
  });
  validate_textareas.forEach(function (vaildate_textarea) {
    vaildate_textarea.classList.remove('warning');
    if (vaildate_textarea.hasAttribute('require')) {
      if (vaildate_textarea.value.length == 0) {
        validate = false;
        vaildate_textarea.classList.add('warning');
      }
    }
  });
  return validate;
}

//change the part of form
function updateform() {
  main_form.forEach(function (mainform_number) {
    mainform_number.classList.remove("active");
  });
  main_form[formnumber].classList.add("active");
}

//increase number for progress bar
function progress_forward() {
  num.innerHTML = formnumber + 1;
  step_list[formnumber].classList.add("active");
}

//remove the class active for old progress bar 
function progress_backward() {
  var form_num = formnumber + 1;
  step_list[form_num].classList.remove("active");
  num.innerHTML = form_num;
}

var step_num_content = document.querySelectorAll(".step-number-content");

//this is for change phrases in left side of form
function contentchange() {
  step_num_content.forEach(function (content) {
    content.classList.remove("active");
    content.classList.add("d-none");
  });

  if (step_num_content[formnumber]) {
    step_num_content[formnumber].classList.add("active");
  }
}

var max_fields = 6;
var max_skill_fields = 10;
var work_wrapper = $(".work-fields");
var add_work_button = $(".add_work_fields");
var project_wrapper = $(".project-fields");
var add_project_button = $(".add_projects_fields");
var ed_wrapper = $(".education-fields");
var add_ed_button = $(".add_fields");
var skill_wrapper = $(".skill-fields");
var add_skill_button = $(".add_skill_fields");
var add_work_button_div = document.getElementById("add-work-button");
var add_project_button_div = document.getElementById("ad-project-button");
var add_education_button_div = document.getElementById("ad-ed-button");
var add_skill_button_div = document.getElementById("add_skill_fields");

var a = 1, b = 1, c = 1, d = 1;

// add new experience
$(add_work_button).click(function (e) {
  e.preventDefault();
  if (a < max_fields) {
    a++;
    $(work_wrapper).append(`
      <div class="work-wrapper">
        <div>
          <div class="input-text">
            <div class="input-div">
              <input type="text" name="company-name[]" required>
              <span>Company Name</span>
            </div>
          </div>
          <div class="input-text">
            <div class="input-div">
              <input type="text" name="role-title[]" required>
              <span>Your Role</span>
            </div>
            <div class="input-div">
              <input type="text" name="employer-location[]" required>
              <span>Location</span>
            </div>
        </div>
        <div class="input-text">
          <div class="input-div">
            <input type="month" name="employer-start-date[]" required>
            <span>Start Date</span>
          </div>
          <div class="input-div">
            <input type="month" name="employer-end-date[]" required>
            <span>End Date</span>
          </div>
        </div>
        <div class="input-text">
          <div class="input-div">
            <textarea name="employer-extra-details[]" placeholder="Describe your key duties and highlight what you achieved in this role."></textarea>
            <a href="javascript:void(0);" class="remove_work_field">Remove</a></div>
          </div>
        </div>
      </div>
    `)
  }else {
    add_work_button_div.style.display = "none";
	}
});

//remove experience
$(work_wrapper).on("click",".remove_work_field", function(e){ 
	e.preventDefault();
	$(this).closest('div.work-wrapper').remove();
	add_work_button_div.style.display = "block";
	a--;
});

//add new project
$(add_project_button).click(function (e) {
  e.preventDefault();
  if (b < max_fields) {
    b++;
    $(project_wrapper).append(`
      <div class="project-wrapper">
        <div>
          <div class="input-text">
            <div class="input-div">
              <input type="text" name="project-name[]" required>
              <span>Project Name</span>
            </div>
          </div>
          <div class="input-text">
            <div class="input-div">
              <textarea name="description[]" placeholder="Description"></textarea>
            </div>
          </div>
          <div class="input-text">
            <div class="input-div">
              <textarea type="text" name="technologies-used[]" required></textarea>
              <span>Technologies Used</span>
            </div>
            <div class="input-div">
              <textarea type="text" name="key-features[]" required></textarea>
              <span>Key Features</span>
            </div>
          </div>
          <div class="input-text">
            <div class="input-div">
              <input type="text" name="outcomes[]" required>
              <span>Outcome</span>
              <a href="javascript:void(0);" class="remove_projects_field">Remove</a></div>
            </div>
          </div>
        </div>
      </div>
    `)
  }else {
    add_project_button_div.style.display = "none";
	}
});

//remove project
$(project_wrapper).on("click",".remove_projects_field", function(e){ 
	e.preventDefault();
	$(this).closest('div.project-wrapper').remove();
	add_project_button_div.style.display = "block";
	b--;
});

//add new education
$(add_ed_button).click(function (e) {
  e.preventDefault();
  if (c < max_fields) {
    c++;
    $(ed_wrapper).append(`
      <div class="education-wrapper">
        <div>
          <div class="input-text">
            <div class="input-div">
              <input type="text" name="school-name[]" required require>
              <span>School Name</span>
            </div>
            <div class="input-div">
              <input type="text" name="school-certification[]" required require>
              <span>Certification</span>
            </div>
          </div>
          <div class="input-text">
            <div class="input-div">
              <input type="month" name="school-end-date[]" required require>
              <span>End Date</span>
            </div>
          </div>
          <div class="input-text">
            <div class="input-div">
              <textarea name="school-extra-details[]" placeholder="Extra details"></textarea>
               <a href="javascript:void(0);" class="remove_education_field">Remove</a></div>
            </div>
          </div>
        </div>
      </div>
    `)
  }else {
    add_education_button_div.style.display = "none";
	}
});

//remove education
$(ed_wrapper).on("click",".remove_education_field", function(e){ 
	e.preventDefault();
	$(this).closest('div.education-wrapper').remove();
	add_education_button_div.style.display = "block";
	c--;
});

$(add_skill_button).click(function (e) {
  e.preventDefault();
  if (d < max_fields) {
    d++;
    $(skill_wrapper).append(`
      <div class="skill-wrapper">
        <div class="input-text">
          <div class="input-div">
            <input type="text" name="skill[]" required require>
            <span>Skill</span>
             <a href="javascript:void(0);" class="remove_skill_field">Remove</a></div>
          </div>
        </div>
      </div>
    `)
  }else {
    add_skill_button_div.style.display = "none";
	}
});

//remove skill
$(skill_wrapper).on("click",".remove_skill_field", function(e){ 
	e.preventDefault();
	$(this).closest('div.skill-wrapper').remove();
	add_skill_button_div.style.display = "block";
	d--;
});

//live preview for update
$(document).ready(function() {

  function updatePreview() {
    // Personal Info
    $('#preview-name').text($('input[name="name"]').val());
    $('#preview-job').text($('input[name="job"]').val());
    $('#preview-email').text($('input[name="email"]').val());
    $('#preview-phone').text($('input[name="phone"]').val());
    $('#preview-address').text($('input[name="address"]').val());
   const website = $('textarea[name="website-link"]').val().trim();
   if (website === '') {
    $('#preview-website').closest('.website-section').hide();
  } else {
    $('#preview-website').closest('.website-section').show();
    $('#preview-website').text(website);
  }

    // Summary
    $('#preview-summary').html(
  $('textarea[name="summary"]').val().trim().replace(/\n/g, '<br>')
);

    // Experience
    let expHTML = '';
    $('.work-fields > div').each(function() {
      const company = $(this).find('input[name="company-name[]"]').val();
      const role = $(this).find('input[name="role-title[]"]').val();
      const loc = $(this).find('input[name="employer-location[]"]').val();
      const start = $(this).find('input[name="employer-start-date[]"]').val();
      const end = $(this).find('input[name="employer-end-date[]"]').val();
      const details = ($(this).find('textarea[name="employer-extra-details[]"]').val()).trim()
  .replace(/\n/g, "<br>");;

      if (company || role || details) {
        expHTML += `
          <div class="preview-item">
            <h4>${role || ''}</h4>
            <h6>${company || ''}</h6>
            <p><em>${loc || ''}</em> (${start || ''} - ${end || ''})</p>
            <p>${details || ''}</p>
          </div>
        `;
      }
    });
    if (expHTML.trim() === '') {
      $('#preview-experience').closest('.experience-section').hide();
    } else {
      $('#preview-experience').closest('.experience-section').show();
    }
    $('#preview-experience').html(expHTML);

    // Projects
    let projectHTML = '';
    $('.project-fields > div').each(function() {
      const project = $(this).find('input[name="project-name[]"]').val();
      const descriptionpro = ($(this).find('textarea[name="description[]"]').val()).trim()
  .replace(/\n/g, "<br>");;
      const technologies = ($(this).find('textarea[name="technologies-used[]"]').val()).trim()
  .replace(/\n/g, "<br>");;
      const key = ($(this).find('textarea[name="key-features[]"]').val()).trim()
  .replace(/\n/g, "<br>");;
      const outcome = $(this).find('input[name="outcomes[]"]').val();

      if (project || descriptionpro) {
        projectHTML += `
          <div class="preview-item">
            <h4>${project || ''}</h4>
            <p>${descriptionpro || ''}</p>
            <p>${technologies || ''}</p>
            <p>${key || ''}</p>
            <p>${outcome || ''}</p>
          </div>
        `;
      }
    });
    if (projectHTML.trim() === '') {
      $('#preview-project').closest('.project-section').hide();
    }else {
      $('#preview-project').closest('.project-section').show();
    }
    $('#preview-project').html(projectHTML);

    // Education
    let eduHTML = '';
    $('.education-fields > div').each(function() {
      const school = $(this).find('input[name="school-name[]"]').val();
      const cert = $(this).find('input[name="school-certification[]"]').val();
      const end = $(this).find('input[name="school-end-date[]"]').val();
      const details = ($(this).find('textarea[name="school-extra-details[]"]').val()).trim()
  .replace(/\n/g, "<br>");;

      if (school || cert) {
        eduHTML += `
          <div class="preview-item">
            <h4>${school || ''}</h4>
            <p>${cert || ''} (${end || ''})</p>
            <p>${details || ''}</p>
          </div>
        `;
      }
    });
    $('#preview-education').html(eduHTML);

    // Skills
    let skillsHTML = '';
    $('input[name="skill[]"]').each(function() {
      const skill = $(this).val();
      if (skill) skillsHTML += `<li>${skill}</li><br>`;
    });
    $('#preview-skills').html(skillsHTML);
  }
  $(document).on('input', 'input, textarea', updatePreview);
  $(document).on('click', '.add_fields, .add_work_fields, .add_skill_fields, .add_projects_fields', function() {
    setTimeout(updatePreview, 100);
  });
  $(document).on('click', '.next_button, .back_button', updatePreview);
  updatePreview();
});
