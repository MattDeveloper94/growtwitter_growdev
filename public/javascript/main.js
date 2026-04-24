document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            const texto = item.textContent.trim();

            if (texto.includes("Home")) {
                window.location.href = "home.html";
            }

            if (texto.includes("Explore")) {
                window.location.href = "explore.html";
            }

            if (texto.includes("Notifications")) {
                window.location.href = "notifications.html";
            }

            if (texto.includes("Profile")) {
                window.location.href = "profile.html";
            }
        });
    });
});