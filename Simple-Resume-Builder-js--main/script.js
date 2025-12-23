// Utility to get all values from dynamic sections
function getDynamicValues(containerId, fieldPrefixes) {
    const container = document.getElementById(containerId);
    const entries = container.querySelectorAll('.entry-input, .skill-input');
    const data = [];

    entries.forEach((entry) => {
        const entryData = {};
        fieldPrefixes.forEach(prefix => {
            const input = entry.querySelector(`[id^="${prefix}-"]`);
            if (input) {
                entryData[prefix] = input.value;
            }
        });
        // Special case for skills which might just be one input
        if (fieldPrefixes.length === 1 && fieldPrefixes[0] === 'skill') {
            const input = entry.querySelector('input');
            if (input && input.value.trim()) data.push(input.value);
        } else if (Object.values(entryData).some(val => val.trim() !== '')) {
            data.push(entryData);
        }
    });
    return data;
}

// Dark mode toggle
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    this.innerHTML = isDark ? '<span>☀️</span> Light Mode' : '<span>🌙</span> Dark Mode';
});

// Live preview logic
function updateLivePreview() {
    const previewContent = document.getElementById('preview-content');
    if (!previewContent) return;

    const name = document.getElementById('name').value || 'Your Name';
    const email = document.getElementById('email').value || 'email@example.com';
    const phone = document.getElementById('phone').value || 'Phone Number';
    const summary = document.getElementById('summary').value || 'Your professional summary will appear here...';

    // Get dynamic data
    const experiences = getDynamicValues('experience-container', ['job-title', 'company', 'exp-details']);
    const education = getDynamicValues('education-container', ['degree', 'university']);
    const skills = getDynamicValues('skills-container', ['skill']);

    let html = `
        <div style="text-align: center; border-bottom: 2px solid #6366f1; padding-bottom: 1rem; margin-bottom: 1.5rem;">
            <h1 style="font-size: 2rem; margin: 0; color: #0f172a;">${name}</h1>
            <p style="color: #64748b; margin: 5px 0;">${email} | ${phone}</p>
        </div>
        <section style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.1rem; color: #6366f1; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3rem;">Summary</h2>
            <p style="font-size: 0.95rem; color: #334155;">${summary}</p>
        </section>
    `;

    if (experiences.length > 0) {
        html += `<section style="margin-bottom: 1.5rem;"><h2 style="font-size: 1.1rem; color: #6366f1; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3rem;">Experience</h2>`;
        experiences.forEach(exp => {
            html += `
                <div style="margin-bottom: 1rem;">
                    <h3 style="font-size: 1rem; margin: 0;">${exp['job-title'] || 'Job Title'}</h3>
                    <p style="font-style: italic; color: #64748b; font-size: 0.9rem;">${exp['company'] || 'Company'}</p>
                </div>
            `;
        });
        html += `</section>`;
    }

    if (skills.length > 0) {
        html += `
            <section>
                <h2 style="font-size: 1.1rem; color: #6366f1; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3rem;">Skills</h2>
                <p style="font-size: 0.95rem;">${skills.join(', ')}</p>
            </section>
        `;
    }

    previewContent.innerHTML = html;
}

// Global counters for unique IDs (to keep labels working)
let idCounter = 100;

function createEntry(type) {
    idCounter++;
    const div = document.createElement('div');
    div.className = type === 'skill' ? 'skill-input' : 'entry-input';
    
    let content = '';
    if (type === 'experience') {
        content = `
            <label>Job Title</label>
            <input type="text" id="job-title-${idCounter}" placeholder="e.g. Senior Software Engineer">
            <label>Company</label>
            <input type="text" id="company-${idCounter}" placeholder="e.g. Google">
            <label>Details</label>
            <textarea id="exp-details-${idCounter}" rows="2" placeholder="Responsibilities and achievements..."></textarea>
        `;
    } else if (type === 'education') {
        content = `
            <label>Degree / Major</label>
            <input type="text" id="degree-${idCounter}" placeholder="e.g. B.S. Computer Science">
            <label>University</label>
            <input type="text" id="university-${idCounter}" placeholder="e.g. Stanford University">
        `;
    } else if (type === 'skill') {
        content = `<input type="text" id="skill-${idCounter}" placeholder="e.g. JavaScript">`;
    } else if (type === 'project') {
        content = `
            <label>Project Name</label>
            <input type="text" id="project-name-${idCounter}" placeholder="e.g. Portfolio Website">
            <label>Description</label>
            <textarea id="project-desc-${idCounter}" rows="2" placeholder="Short description..."></textarea>
        `;
    } else if (type === 'certification') {
        content = `
            <label>Certification Name</label>
            <input type="text" id="cert-name-${idCounter}" placeholder="e.g. AWS Certified Developer">
            <label>Issuer</label>
            <input type="text" id="cert-issuer-${idCounter}" placeholder="e.g. Amazon Web Services">
        `;
    }

    div.innerHTML = content + `<button class="remove-btn" onclick="this.parentElement.remove(); updateLivePreview();">Remove</button>`;
    return div;
}

// Button click handlers
function addExperience() { document.getElementById('experience-container').appendChild(createEntry('experience')); }
function addEducation() { document.getElementById('education-container').appendChild(createEntry('education')); }
function addSkill() { document.getElementById('skills-container').appendChild(createEntry('skill')); }
function addProject() { document.getElementById('projects-container').appendChild(createEntry('project')); }
function addCertification() { document.getElementById('certifications-container').appendChild(createEntry('certification')); }

// Form generation
function generateResume() {
    const name = document.getElementById('name').value;
    if (!name) {
        alert('Please enter at least your name.');
        return;
    }

    // Populate the final resume
    document.getElementById('out-name').textContent = name;
    document.getElementById('out-email').textContent = document.getElementById('email').value;
    document.getElementById('out-phone').textContent = document.getElementById('phone').value;
    document.getElementById('out-summary').textContent = document.getElementById('summary').value;

    // Social Links
    const socialLinks = document.getElementById('out-social-links');
    socialLinks.innerHTML = '';
    ['linkedin', 'github', 'portfolio'].forEach(id => {
        const val = document.getElementById(id).value;
        if (val) {
            const label = id.charAt(0).toUpperCase() + id.slice(1);
            socialLinks.innerHTML += `<a href="${val}" target="_blank" style="margin-right: 15px; color: #6366f1; text-decoration: none; font-weight: 500;">${label}</a> `;
        }
    });

    // Experience
    const outExp = document.getElementById('out-experience');
    outExp.innerHTML = '';
    getDynamicValues('experience-container', ['job-title', 'company', 'exp-details']).forEach(exp => {
        const div = document.createElement('div');
        div.className = 'entry';
        div.innerHTML = `
            <h3>${exp['job-title']}</h3>
            <p class="subtitle">${exp['company']}</p>
            <div style="white-space: pre-line; color: #475569; margin-top: 0.5rem;">${exp['exp-details']}</div>
        `;
        outExp.appendChild(div);
    });

    // Education
    const outEdu = document.getElementById('out-education');
    outEdu.innerHTML = '';
    getDynamicValues('education-container', ['degree', 'university']).forEach(edu => {
        const div = document.createElement('div');
        div.className = 'entry';
        div.innerHTML = `
            <h3>${edu['degree']}</h3>
            <p class="subtitle">${edu['university']}</p>
        `;
        outEdu.appendChild(div);
    });

    // Skills
    const outSkills = document.getElementById('out-skills');
    outSkills.innerHTML = '';
    getDynamicValues('skills-container', ['skill']).forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        li.style.display = 'inline-block';
        li.style.background = '#f1f5f9';
        li.style.padding = '0.3rem 0.8rem';
        li.style.borderRadius = '99px';
        li.style.margin = '0 0.5rem 0.5rem 0';
        li.style.fontSize = '0.9rem';
        outSkills.appendChild(li);
    });

    // Projects
    const outProjects = document.getElementById('out-projects');
    outProjects.innerHTML = '';
    getDynamicValues('projects-container', ['project-name', 'project-desc']).forEach(proj => {
        const div = document.createElement('div');
        div.className = 'entry';
        div.innerHTML = `
            <h3>${proj['project-name']}</h3>
            <p style="color: #475569;">${proj['project-desc']}</p>
        `;
        outProjects.appendChild(div);
    });

    // Certs
    const outCerts = document.getElementById('out-certifications');
    outCerts.innerHTML = '';
    getDynamicValues('certifications-container', ['cert-name', 'cert-issuer']).forEach(cert => {
        const div = document.createElement('div');
        div.className = 'entry';
        div.innerHTML = `
            <h3>${cert['cert-name']}</h3>
            <p class="subtitle">${cert['cert-issuer']}</p>
        `;
        outCerts.appendChild(div);
    });

    document.getElementById('input-form').classList.add('hidden');
    document.getElementById('live-preview').classList.add('hidden');
    document.getElementById('resume-output').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetBuilder() {
    document.getElementById('input-form').classList.remove('hidden');
    document.getElementById('live-preview').classList.remove('hidden');
    document.getElementById('resume-output').classList.add('hidden');
}

// Initial event listeners
document.addEventListener('input', updateLivePreview);
document.addEventListener('DOMContentLoaded', updateLivePreview);
