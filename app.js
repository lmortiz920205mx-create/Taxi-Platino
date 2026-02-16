let deferredPrompt;
const installBtn = document.getElementById('installBtn');
const updateBtn = document.getElementById('updateBtn');

document.addEventListener("DOMContentLoaded", () => {

    // Render content demo
    const content = document.getElementById("content");
    if (typeof data !== "undefined") {
        data.forEach(item => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
            content.appendChild(div);
        });
    }

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(reg => {

            reg.onupdatefound = () => {
                const newWorker = reg.installing;
                newWorker.onstatechange = () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        updateBtn.classList.remove('hidden');
                    }
                }
            };

        });
    }
});

// Install PWA
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.remove('hidden');
});

installBtn.addEventListener('click', async () => {
    installBtn.classList.add('hidden');
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
});

// Force Update
updateBtn.addEventListener('click', () => {
    window.location.reload();
});
