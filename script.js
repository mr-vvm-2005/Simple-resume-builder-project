// Global variables for dynamic entries
let experienceCount = 1;
let educationCount = 1;
let skillCount = 1;
let projectCount = 1;
let certificationCount = 1;

// Dark mode toggle
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Live preview functionality
document.addEventListener('input', updateLivePreview);

function updateLivePreview() {
    const previewContent = document.getElementById('preview-content');
    if (!previewContent) return;

    const name = document.getElementById('name').value || 'Your Name';
    const email = document.getElementById('email').value || 'your.email@example.com';
    const phone = document.getElementById('phone').value || '(123) 456-7890';
    const summary = document.getElementById('summary').value || 'Your professional summary...';

    previewContent.innerHTML = `
        <header style="text-align: center; margin-bottom: 20px;">
            <h1>${name}</h1>
            <p>${email} | ${phone}</p>
        </header>
        <section>
            <h2>Summary</h2>
            <p>${summary}</p>
        </section>
        <p><em>Preview updates as you type...</em></p>
    `;
}

// Dynamic entry functions
function addExperience() {
    const container = document.getElementById('experience-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'entry-input';
    newEntry.innerHTML = `
        <label for="job-title-${experienceCount}">Job Title:</label>
        <input type="text" id="job-title-${experienceCount}" placeholder="Senior Developer"><br>
        <label for="company-${experienceCount}">Company:</label>
        <input type="text" id="company-${experienceCount}" placeholder="Tech Solutions Inc."><br>
        <label for="exp-details-${experienceCount}">Details/Achievements:</label>
        <textarea id="exp-details-${experienceCount}" rows="2" placeholder="Key responsibilities and achievements..."></textarea><br>
        <button onclick="removeExperience(${experienceCount})" class="remove-btn">Remove</button>
    `;
    container.appendChild(newEntry);
    experienceCount++;
}

function removeExperience(index) {
    const entry = document.getElementById(`job-title-${index}`)?.parentElement;
    if (entry) {
        entry.remove();
    }
}

function addEducation() {
    const container = document.getElementById('education-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'entry-input';
    newEntry.innerHTML = `
        <label for="degree-${educationCount}">Degree/Major:</label>
        <input type="text" id="degree-${educationCount}" placeholder="M.S. Computer Science"><br>
        <label for="university-${educationCount}">University:</label>
        <input type="text" id="university-${educationCount}" placeholder="State University"><br>
        <button onclick="removeEducation(${educationCount})" class="remove-btn">Remove</button>
    `;
    container.appendChild(newEntry);
    educationCount++;
}

function removeEducation(index) {
    const entry = document.getElementById(`degree-${index}`)?.parentElement;
    if (entry) {
        entry.remove();
    }
}

function addSkill() {
    const container = document.getElementById('skills-container');
    const newSkill = document.createElement('div');
    newSkill.className = 'skill-input';
    newSkill.innerHTML = `
        <input type="text" id="skill-${skillCount}" placeholder="JavaScript"><br>
        <button onclick="removeSkill(${skillCount})" class="remove-btn">Remove</button>
    `;
    container.appendChild(newSkill);
    skillCount++;
}

function removeSkill(index) {
    const skill = document.getElementById(`skill-${index}`)?.parentElement;
    if (skill) {
        skill.remove();
    }
}

function addProject() {
    const container = document.getElementById('projects-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'entry-input';
    newEntry.innerHTML = `
        <label for="project-name-${projectCount}">Project Name:</label>
        <input type="text" id="project-name-${projectCount}" placeholder="E-commerce Website"><br>
        <label for="project-desc-${projectCount}">Description:</label>
        <textarea id="project-desc-${projectCount}" rows="2" placeholder="Brief description of the project..."></textarea><br>
        <button onclick="removeProject(${projectCount})" class="remove-btn">Remove</button>
    `;
    container.appendChild(newEntry);
    projectCount++;
}

function removeProject(index) {
    const entry = document.getElementById(`project-name-${index}`).parentElement;
    entry.remove();
}

function addCertification() {
    const container = document.getElementById('certifications-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'entry-input';
    newEntry.innerHTML = `
        <label for="cert-name-${certificationCount}">Certification Name:</label>
        <input type="text" id="cert-name-${certificationCount}" placeholder="AWS Certified Developer"><br>
        <label for="cert-issuer-${certificationCount}">Issuer:</label>
        <input type="text" id="cert-issuer-${certificationCount}" placeholder="Amazon Web Services"><br>
        <button onclick="removeCertification(${certificationCount})" class="remove-btn">Remove</button>
    `;
    container.appendChild(newEntry);
    certificationCount++;
}

function removeCertification(index) {
    const entry = document.getElementById(`cert-name-${index}`)?.parentElement;
    if (entry) {
        entry.remove();
    }
}

function generateResume() {
    // Get DOM elements
    const form = document.getElementById('input-form');
    const resumeOutput = document.getElementById('resume-output');
    const livePreview = document.getElementById('live-preview');

    // Personal Info
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const summary = document.getElementById('summary').value;

    // Social Links
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const portfolio = document.getElementById('portfolio').value;

    // Basic Validation
    if (name.trim() === '') {
        alert('Please enter your full name to generate the resume.');
        return;
    }

    // Populate Resume Output
    document.getElementById('out-name').textContent = name;
    document.getElementById('out-email').textContent = email;
    document.getElementById('out-phone').textContent = phone;
    document.getElementById('out-summary').textContent = summary;

    // Social Links
    const socialLinks = document.getElementById('out-social-links');
    socialLinks.innerHTML = '';
    if (linkedin) socialLinks.innerHTML += `<a href="${linkedin}" target="_blank">LinkedIn</a> `;
    if (github) socialLinks.innerHTML += `<a href="${github}" target="_blank">GitHub</a> `;
    if (portfolio) socialLinks.innerHTML += `<a href="${portfolio}" target="_blank">Portfolio</a>`;

    // Experience
    const outExperience = document.getElementById('out-experience');
    outExperience.innerHTML = '';
    for (let i = 0; i < experienceCount; i++) {
        const jobTitle = document.getElementById(`job-title-${i}`)?.value;
        const company = document.getElementById(`company-${i}`)?.value;
        const expDetails = document.getElementById(`exp-details-${i}`)?.value;
        if (jobTitle || company) {
            const entry = document.createElement('div');
            entry.className = 'entry';
            entry.innerHTML = `
                <h3>${jobTitle || 'Job Title'}</h3>
                <p class="subtitle">${company || 'Company'}</p>
                <ul>${expDetails ? expDetails.split('\n').filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join('') : ''}</ul>
            `;
            outExperience.appendChild(entry);
        }
    }

    // Education
    const outEducation = document.getElementById('out-education');
    outEducation.innerHTML = '';
    for (let i = 0; i < educationCount; i++) {
        const degree = document.getElementById(`degree-${i}`)?.value;
        const university = document.getElementById(`university-${i}`)?.value;
        if (degree || university) {
            const entry = document.createElement('div');
            entry.className = 'entry';
            entry.innerHTML = `
                <h3>${degree || 'Degree'}</h3>
                <p class="subtitle">${university || 'University'}</p>
            `;
            outEducation.appendChild(entry);
        }
    }

    // Skills
    const outSkills = document.getElementById('out-skills');
    outSkills.innerHTML = '';
    for (let i = 0; i < skillCount; i++) {
        const skill = document.getElementById(`skill-${i}`)?.value;
        if (skill) {
            const li = document.createElement('li');
            li.textContent = skill;
            outSkills.appendChild(li);
        }
    }

    // Projects
    const outProjects = document.getElementById('out-projects');
    outProjects.innerHTML = '';
    for (let i = 0; i < projectCount; i++) {
        const projectName = document.getElementById(`project-name-${i}`)?.value;
        const projectDesc = document.getElementById(`project-desc-${i}`)?.value;
        if (projectName || projectDesc) {
            const entry = document.createElement('div');
            entry.className = 'entry';
            entry.innerHTML = `
                <h3>${projectName || 'Project Name'}</h3>
                <p>${projectDesc || 'Description'}</p>
            `;
            outProjects.appendChild(entry);
        }
    }

    // Certifications
    const outCertifications = document.getElementById('out-certifications');
    outCertifications.innerHTML = '';
    for (let i = 0; i < certificationCount; i++) {
        const certName = document.getElementById(`cert-name-${i}`)?.value;
        const certIssuer = document.getElementById(`cert-issuer-${i}`)?.value;
        if (certName || certIssuer) {
            const entry = document.createElement('div');
            entry.className = 'entry';
            entry.innerHTML = `
                <h3>${certName || 'Certification'}</h3>
                <p class="subtitle">${certIssuer || 'Issuer'}</p>
            `;
            outCertifications.appendChild(entry);
        }
    }

    // Toggle Views
    form.classList.add('hidden');
    livePreview.classList.add('hidden');
    resumeOutput.classList.remove('hidden');
}

function resetBuilder() {
    const form = document.getElementById('input-form');
    const resumeOutput = document.getElementById('resume-output');
    const livePreview = document.getElementById('live-preview');

    // Reset counts and clear dynamic entries
    experienceCount = 1;
    educationCount = 1;
    skillCount = 1;
    projectCount = 1;
    certificationCount = 1;

    document.getElementById('experience-container').innerHTML = `
        <div class="entry-input">
            <label for="job-title-0">Job Title:</label>
            <input type="text" id="job-title-0" placeholder="Senior Developer"><br>
            <label for="company-0">Company:</label>
            <input type="text" id="company-0" placeholder="Tech Solutions Inc."><br>
            <label for="exp-details-0">Details/Achievements:</label>
            <textarea id="exp-details-0" rows="2" placeholder="Key responsibilities and achievements..."></textarea><br>
            <button onclick="removeExperience(0)" class="remove-btn">Remove</button>
        </div>
    `;

    document.getElementById('education-container').innerHTML = `
        <div class="entry-input">
            <label for="degree-0">Degree/Major:</label>
            <input type="text" id="degree-0" placeholder="M.S. Computer Science"><br>
            <label for="university-0">University:</label>
            <input type="text" id="university-0" placeholder="State University"><br>
            <button onclick="removeEducation(0)" class="remove-btn">Remove</button>
        </div>
    `;

    document.getElementById('skills-container').innerHTML = `
        <div class="skill-input">
            <input type="text" id="skill-0" placeholder="JavaScript"><br>
            <button onclick="removeSkill(0)" class="remove-btn">Remove</button>
        </div>
    `;

    document.getElementById('projects-container').innerHTML = `
        <div class="entry-input">
            <label for="project-name-0">Project Name:</label>
            <input type="text" id="project-name-0" placeholder="E-commerce Website"><br>
            <label for="project-desc-0">Description:</label>
            <textarea id="project-desc-0" rows="2" placeholder="Brief description of the project..."></textarea><br>
            <button onclick="removeProject(0)" class="remove-btn">Remove</button>
        </div>
    `;

    document.getElementById('certifications-container').innerHTML = `
        <div class="entry-input">
            <label for="cert-name-0">Certification Name:</label>
            <input type="text" id="cert-name-0" placeholder="AWS Certified Developer"><br>
            <label for="cert-issuer-0">Issuer:</label>
            <input type="text" id="cert-issuer-0" placeholder="Amazon Web Services"><br>
            <button onclick="removeCertification(0)" class="remove-btn">Remove</button>
        </div>
    `;

    // Toggle Views
    form.classList.remove('hidden');
    livePreview.classList.remove('hidden');
    resumeOutput.classList.add('hidden');
}

// Initialize live preview on page load
document.addEventListener('DOMContentLoaded', function() {
    updateLivePreview();
});
