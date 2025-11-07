let selectedTemplate = "";

// Initialize with pre-selected template
const preSelected = document.querySelector(".template-img.selected");
if (preSelected) {
  selectedTemplate = preSelected.getAttribute("data-template");
  console.log("Pre-selected template:", selectedTemplate);
}

// Click listener for templates
document.querySelectorAll(".template-img").forEach(template => {
  template.addEventListener("click", function () {
    document.querySelectorAll(".template-img").forEach(t => t.classList.remove("selected"));
    this.classList.add("selected");

    selectedTemplate = this.getAttribute("data-template");
    console.log("Selected template:", selectedTemplate);
  });
});

document.getElementById("submit_form").addEventListener("click", async function () {
  if (!selectedTemplate) {
    alert("Please select a template first!");
    return;
  }

  const name = document.querySelector('input[name="name"]').value || "";
  const job = document.querySelector('input[name="job"]').value || "";
  const email = document.querySelector('input[name="email"]').value || "";
  const phone = document.querySelector('input[name="phone"]').value || "";
  const address = document.querySelector('input[name="address"]').value || "";
  const website = (document.querySelector('textarea[name="website-link"]').value || "").trim()
    .replace(/\n/g, "<br>");;
  const summary = (document.querySelector('textarea[name="summary"]').value || "").trim()
    .replace(/\n/g, "<br>");;

  const experienceArr = [];
  document.querySelectorAll(".work-fields > div").forEach(work => {
    const role = work.querySelector('input[name="role-title[]"]').value || "";
    const company = work.querySelector('input[name="company-name[]"]').value || "";
    const loc = work.querySelector('input[name="employer-location[]"]').value || "";
    const start = work.querySelector('input[name="employer-start-date[]"]').value || "";
    const end = work.querySelector('input[name="employer-end-date[]"]').value || "";
    const details = (work.querySelector('textarea[name="employer-extra-details[]"]').value || "").trim()
      .replace(/\n/g, "<br>");;

    if (role || company || loc || start || end || details) {
      experienceArr.push(`
      <div style="margin-bottom:10px;">
        ${role ? `<strong>${role}</strong>` : ""}
        ${company ? `<p><em>${company}</em></p>` : ""}
        ${loc ? `<p>${loc}</p>` : ""}
        ${(start || end) ? `<p>${start} - ${end}</p>` : ""}
        ${details ? `<p>${details}</p>` : ""}
      </div>
    `);
    }
  });
  const experienceHTML = experienceArr.join("");

  const projectArr = [];
  document.querySelectorAll(".project-fields > div").forEach(project => {
    const namepro = project.querySelector('input[name="project-name[]"]').value || "";
    const descriptionpro = (project.querySelector('textarea[name="description[]"]').value || "").trim()
      .replace(/\n/g, "<br>");;
    const technologies = (project.querySelector('textarea[name="technologies-used[]"]').value || "")
      .trim()
      .replace(/\n/g, "<br>");

    const key = (project.querySelector('textarea[name="key-features[]"]').value || "").trim()
      .replace(/\n/g, "<br>");;
    const outcome = project.querySelector('input[name="outcomes[]"]').value || "";


    if (namepro || descriptionpro || technologies || key || outcome) {
      projectArr.push(`
      <div style="margin-bottom:10px;">
        ${namepro ? `<strong>${namepro}</strong>` : ""}
        ${descriptionpro ? `<p><b>Description:</b> <em>${descriptionpro}</em></p>` : ""}
        ${technologies ? `<p><b>Technologies:</b><br>${technologies}</p>` : ""}
        ${key ? `<p><b>Key Features:</b><br>${key}</p>` : ""}
        ${outcome ? `<p><b>Outcomes:</b> ${outcome}</p>` : ""}
      </div>
    `);
    }
  });
  const projectHTML = projectArr.join("");


  const educationArr = [];
  document.querySelectorAll(".education-fields > div").forEach(ed => {
    const school = ed.querySelector('input[name="school-name[]"]').value || "";
    const cert = ed.querySelector('input[name="school-certification[]"]').value || "";
    const end = ed.querySelector('input[name="school-end-date[]"]').value || "";
    const details = (ed.querySelector('textarea[name="school-extra-details[]"]').value || "").trim()
      .replace(/\n/g, "<br>");;

    educationArr.push(`
      <div style="margin-bottom:10px;">
        <strong>${school}</strong> 
        <div><em>${cert}</em></div>
        <div>${end}</div>
        <p>${details}</p>
      </div>
    `);
  });
  const educationHTML = educationArr.join("");

  const skillsArr = [];
  document.querySelectorAll('input[name="skill[]"]').forEach(skill => {
    if (skill.value.trim() !== "") skillsArr.push(skill.value.trim());
  });
  const skillsHTML = skillsArr.map(s => `<li>${s}</li>`).join("");

  // CREATE CONTAINER
  const resumeContainer = document.createElement("div");

  let templateHTML = "";

  // TEMPLATE HTML with inline CSS
  if (selectedTemplate === "template1") {
    templateHTML = `
<style>
  body {
    background: #f2f2f2;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  .a4-container {
    width: 210mm;
    background: #fff;
    padding: 25mm;
    box-sizing: border-box;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
  }

  @media print {
  .a4-container {
    page-break-before: auto;
    page-break-after: auto;
    page-break-inside: avoid;
  }
  .section {
    page-break-inside: avoid;
  }
}
  @media screen and (max-width: 1024px) {
  .a4-container {
    padding: 18mm;
  }
}

/* Mobile screens */
@media screen and (max-width: 768px) {
  .a4-container {
    padding: 10mm;
    width: 100%;
  }
}

/* Extra small devices */
@media screen and (max-width: 480px) {
  .a4-container {
    padding: 0mm;
    width: 100%;
  }
}

  body, div, p {
    font-family: 'Helvetica', 'Arial', sans-serif;
    color: #111;
  }

  h1 {
    font-size: 26px;
    font-weight: 700;
    margin: 0;
  }

  h2 {
    font-size: 16px;
    margin: 25px 0 8px 0;
    font-weight: 700;
    border-bottom: 2px solid #000;
    padding-bottom: 4px;
  }

  p {
    font-size: 12.5px;
    line-height: 1.6;
    margin: 3px 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
  }

  .left h1 {
    letter-spacing: 1px;
  }

  .right {
    text-align: right;
    font-size: 12px;
    line-height: 1.4;
    padding-right: 10%;
  }

  .section {
    margin-top: 20px;
  }

  .experience-item,
  .education-item {
    display: flex;
    margin-bottom: 10px;
  }

  .year {
    width: 60px;
    font-size: 12px;
    color: #555;
  }

  .details {
    flex: 1;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
    color: #333;
  }

  @media print {
    body {
      background: #fff;
      margin: 0;
    }
    .a4-container {
      box-shadow: none;
      width: 100%;
      height: auto;
      padding: 0;
    }
  }
    
}

</style>

<div class="a4-container">
  <div class="header">
    <div class="left">
      <h1>${name}</h1>
      <h2>${job}</h2>
      <p>${website}</p>
    </div>
    <div class="right">
      <div>${address}</div>
      <div>${phone}</div>
      <div>${email}</div>
    </div>
  </div>

  <div class="section">
    <h2>About me</h2>
    <p>${summary}</p>
  </div>

  ${experienceHTML.trim() ? `
    <div class="section">
      <h2>Professional Experience</h2>
      ${experienceHTML}
    </div>
  ` : ""}

  ${projectHTML.trim() ? `
    <div class="section">
      <h2>Projects</h2>
      ${projectHTML}
    </div>
  ` : ""}

  <div class="section">
    <h2>Education</h2>
    ${educationHTML}
  </div>

  <div class="section">
    <h2>Skills</h2>
    <p>${skillsHTML}</p>
  </div>
</div>
`;

  } else if (selectedTemplate === "template2") {
    templateHTML = `
       <style>
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background: #fff;
    color: #333;
    margin: 0;
    padding: 0;
  }

  .resume-container {
    display: grid;
    grid-template-columns: 30% 70%;
    min-height: 100vh;
    width: 100%;
  }

  /* LEFT COLUMN */
  .left-column {
    background: #f4f4f4;
    padding: 40px 25px;
  }

  .left-column h2 {
    font-size: 13px;
    text-transform: uppercase;
    color: #555;
    border-bottom: 1px solid #ccc;
    padding-bottom: 6px;
    margin-top: 25px;
  }

  .left-column p,
  .left-column li {
    font-size: 12.5px;
    line-height: 1.6;
    margin: 4px 0;
  }

  .contact-info {
    margin-top: 10px;
  }

  .contact-info div {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* RIGHT COLUMN */
  .right-column {
    padding: 40px 45px;
  }

  .header {
    text-align: center;
    margin-bottom: 35px;
  }

  .header h1 {
    font-size: 30px;
    font-weight: 700;
    margin: 0;
    letter-spacing: 1px;
  }

  .header h3 {
    font-size: 13px;
    color: #666;
    letter-spacing: 2px;
    margin-top: 5px;
    text-transform: uppercase;
  }

  .section {
    margin-bottom: 30px;
  }

  .section h2 {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 700;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    margin-bottom: 8px;
    color: #333;
  }

  .section p {
    font-size: 12.5px;
    color: #333;
  }

  .experience-item {
    margin-bottom: 12px;
  }

  .experience-item strong {
    display: block;
    font-size: 13px;
    font-weight: 600;
  }

  .experience-item em {
    font-size: 12px;
    color: #666;
  }

  ul {
    margin: 4px 0 10px 18px;
  }

  li {
    font-size: 12.5px;
    color: #444;
  }
    @media screen and (max-width: 768px) {
  .a4-container {
    transform: scale(0.9);
    transform-origin: top center;
    width: 100%;
    margin: 0 auto;
  }
}
  @media screen and (max-width: 1024px) {
  .a4-container {
    padding: 18mm;
  }
}

/* Mobile screens */
@media screen and (max-width: 768px) {
  .a4-container {
    padding: 10mm;
  }
}

/* Extra small devices */
@media screen and (max-width: 480px) {
  .a4-container {
    padding: 5mm;
  }
}

</style>
<div class="resume-container">
  <!-- LEFT COLUMN -->
  <div class="left-column">
    <h2>Contact</h2>
    <div class="contact-info">
      <div>📞 ${phone}</div>
      <div>✉️ ${email}</div>
      <div>📍 ${address}</div>
      ${website ? `<div>🌐 ${website}</div>` : ""}
    </div>

    <h2>Education</h2>
    ${educationHTML}

    <h2>Skills</h2>
    <ul>${skillsHTML}</ul>
  </div>

  <!-- RIGHT COLUMN -->
  <div class="right-column">
    <div class="header">
      <h1>${name}</h1>
      <h2>${job}</h2>
    </div>

    <div class="section">
      <h2>Summary</h2>
      <p>${summary}</p>
    </div>

    ${experienceHTML.trim() ? `
    <div class="section">
      <h2>Professional Experience</h2>
      ${experienceHTML}
    </div>
  ` : ""}

  ${projectHTML.trim() ? `
    <div class="section">
      <h2>Projects</h2>
      ${projectHTML}
    </div>
  ` : ""}

  </div>
</div>

`;
  } else if (selectedTemplate === "template3") {
    templateHTML = `
<style>
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #222;
    background: #f3f3f3;
    margin: 0;
    padding: 30px 0;
    display: flex;
    justify-content: center;
  }

  /* A4 CONTAINER */
  .a4-container {
    background: #fff;
    width: 210mm;
    padding: 50px 60px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    box-sizing: border-box;
  }
    @media print {
  .a4-container {
    page-break-before: auto;
    page-break-after: auto;
    page-break-inside: avoid;
  }
  .section {
    page-break-inside: avoid;
  }
}
  @media screen and (max-width: 768px) {
  .a4-container {
    transform: scale(0.9);
    transform-origin: top center;
    width: 100%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 1024px) {
  .a4-container {
    padding: 18mm;
  }
}

/* Mobile screens */
@media screen and (max-width: 768px) {
  .a4-container {
    padding: 12mm;
  }
}

/* Extra small devices */
@media screen and (max-width: 480px) {
  .a4-container {
    padding: 8mm;
  }
}

  /* HEADER */
  .header {
    text-align: left;
    margin-bottom: 25px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
  }

  .header h1 {
    font-size: 34px;
    font-weight: 800;
    margin: 0;
    letter-spacing: 1px;
  }

  .header h1 span {
    color: #2d5a88;
    font-weight: 800;
  }

  .header h2 {
    font-size: 13px;
    text-transform: uppercase;
    color: #555;
    margin-top: 6px;
    font-weight: 600;
    letter-spacing: 1.5px;
  }

  .role-tag {
    background: #2d5a88;
    color: #fff;
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 2px;
    margin-top: 6px;
  }

  /* CONTACT SECTION */
  .contact {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11.5px;
    color: #444;
    margin-top: 15px;
    border-top: 1px solid #ddd;
    padding-top: 10px;
    flex-wrap: wrap;
    gap: 5px;
  }

  .contact div {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* SECTIONS */
  .section {
    margin-top: 30px;
  }

  .section h3 {
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #2d5a88;
    margin-bottom: 8px;
  }

  .section p {
    font-size: 12.5px;
    color: #333;
  }

  .date {
    float: right;
    font-size: 12px;
    color: #777;
  }

  strong {
    font-weight: 700;
  }

  em {
    color: #333;
    font-style: italic;
  }

  /* PRINT STYLING */
  @media print {
    body {
      background: #fff;
      margin: 0;
    }
    .a4-container {
      box-shadow: none;
      margin: 0;
      width: 100%;
      height: auto;
    }
  }
</style>

<div class="a4-container">
  <div class="header">
    <h1>${name.split(' ')[0]} <span>${name.split(' ')[1] || ''}</span></h1>
    <div class="role-tag">${job}</div>
  </div>

  <div class="contact">
    <div>📍 ${address}</div>
    <div>📞 ${phone}</div>
    <div>✉️ ${email}</div>
    ${website ? `<div>🌐 ${website}</div>` : ""}
  </div>

  <div class="section">
    <h3>Objective</h3>
    <p>${summary}</p>
  </div>

  ${experienceHTML.trim() ? `
    <div class="section">
      <h3>Professional Experience</h3>
      ${experienceHTML}
    </div>
  ` : ""}

  ${projectHTML.trim() ? `
    <div class="section">
      <h3>Projects</h3>
      ${projectHTML}
    </div>
  ` : ""}

  <div class="section">
    <h3>Education</h3>
    ${educationHTML}
  </div>

  <div class="section">
    <h3>Skills</h3>
    <p>${skillsHTML}</p>
  </div>

</div>
`;
  }

  resumeContainer.style.width = "785px"; 
  resumeContainer.style.minHeight = "1100px"; 

  resumeContainer.innerHTML = templateHTML;

  setTimeout(async () => {
    await html2pdf().from(resumeContainer).set({
      margin: 10,
      padding: 2,
      filename: `${name.replace(/\s+/g, '_')}_resume.pdf`,
      html2canvas: {
        scale: 2,
        logging: true,
        letterRendering: true
      },
      jsPDF: {
        unit: 'px',
        format: 'a4',
        orientation: 'portrait'
      }
    }).save();

  }, 100);


});
