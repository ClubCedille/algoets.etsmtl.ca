import { cachedProjectInfo } from './cachedProjectInfo.json';
import { createProjectCard } from './projectCardCreator.js';

const projectsInfo = {
    Workshop1: "https://api.github.com/repos/AlgoETS/Workshop1",
    AINewsTracker: "https://api.github.com/repos/AlgoETS/AINewsTracker",
    BatchBacktesting: "https://api.github.com/repos/AlgoETS/BatchBacktesting",
    Salary: "https://api.github.com/repos/AlgoETS/Salary",
    Marketwatch: "https://api.github.com/repos/antoinebou12/Marketwatch",
    BullETS: "https://api.github.com/repos/AlgoETS/BullETS",
};

function createProjectCard(projectData) {
    if (!projectData) return;

    const projectCard = document.createElement("div");
    projectCard.className =
        "project-card bg-white shadow-md rounded-lg overflow-hidden p-4 hover:shadow-lg transition-shadow duration-300";

    let topicsHtml = '';
    if (Array.isArray(projectData.topics)) {
        topicsHtml = `<div class="project-topics text-blue-500 text-xs mb-4">Tags: ${projectData.topics.join(", ")}</div>`;
    }

    const liveDemoLink = projectData.homepage
        ? `<a href="${projectData.homepage}" target="_blank" class="project-link py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 text-sm font-medium inline-block">Live Demo</a>`
        : "";

    projectCard.innerHTML = `
        <img src="${projectData.image_url || 'default-image-url'}" alt="${projectData.name}" class="w-full h-32 object-cover mb-4">
        <h4 class="project-title font-semibold text-lg mb-2">${projectData.name}</h4>
        <p class="project-description text-gray-600 text-sm mb-4">${projectData.description}</p>
        <div class="project-details text-sm text-gray-500 mb-4">
            <span>Language: ${projectData.language}</span><br>
            <span>Stars ⭐ : ${projectData.stargazers_count}</span><br>
            <span>Last Updated: ${new Date(projectData.updated_at).toLocaleDateString()}</span><br>
            <span>Created At: ${new Date(projectData.created_at).toLocaleDateString()}</span>
        </div>
        ${topicsHtml}
        <a href="${projectData.html_url}" target="_blank" class="project-link py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 text-sm font-medium inline-block">View on GitHub</a>
        ${liveDemoLink}
    `;

    document.getElementById("projects-container").appendChild(projectCard);
}


async function fetchAndCreateProjectCard(url, projectKey) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const projectData = await response.json();

        // Add a placeholder image_url or get it from projectData if available
        projectData.image_url = projectData.image_url || 'default-image-url';
        
        createProjectCard(projectData);

        // Update cached data in memory
        cachedProjectInfo[projectKey] = projectData;

        // Send updated data to server to update the JSON file
        updateCachedDataOnServer(projectKey, projectData);

    } catch (error) {
        console.error(`Error fetching data for ${projectKey}:`, error);
        if (cachedProjectInfo[projectKey]) {
            createProjectCard(cachedProjectInfo[projectKey]);
        }
    }
}

async function updateCachedDataOnServer(projectKey, projectData) {
    try {
        await fetch('/api/update-cached-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [projectKey]: projectData })
        });
    } catch (error) {
        console.error('Failed to update cached data on server:', error);
    }
}

async function processProjects() {
    for (const projectKey of Object.keys(projectsInfo)) {
        await fetchAndCreateProjectCard(projectsInfo[projectKey], projectKey);
    }
}

processProjects();