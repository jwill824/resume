// assets/js/skills.js

export function calculateYearsOfExperience(experiences, skill) {
    if (!experiences || !skill) return 0;
    const skillLower = skill.toLowerCase();
    const yearsSet = new Set();

    experiences.forEach(job => {
        const hasSkill = job.achievements.some(achievement =>
            achievement.toLowerCase().includes(skillLower)
        );

        if (hasSkill) {
            const [startStr, endStr] = job.date.split('-').map(d => d.trim());
            const startDate = new Date(startStr);
            const endDate = endStr === 'Present' ? new Date() : new Date(endStr);

            for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
                yearsSet.add(year);
            }
        }
    });

    return yearsSet.size;
}

export function formatYears(years) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
}

function processSkills() {
    const experienceData = JSON.parse(document.getElementById('experience-data').textContent);
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach(category => {
        const skillsText = category.textContent.split(':')[1];
        const skills = skillsText.split(',').map(s => s.trim());
        const categoryName = category.querySelector('strong').textContent;

        const processedSkills = skills.map(skill => {
            // Remove parenthetical expressions before calculating years
            const cleanSkill = skill.replace(/\s*\(.*?\)\s*/g, '').trim();
            const years = calculateYearsOfExperience(experienceData, cleanSkill);
            return years > 0 ? `${cleanSkill} (${formatYears(years)})` : cleanSkill;
        });

        category.innerHTML = `<strong>${categoryName}</strong> ${processedSkills.join(', ')}`;
    });
}

document.addEventListener('DOMContentLoaded', processSkills);