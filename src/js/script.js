document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const menuItems = document.querySelector('.menu-items');

    hamburger.addEventListener('click', function() {
        menuItems.classList.toggle('active');
    });

    const menuLinks = document.querySelectorAll('.menu-items a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuItems.classList.remove('active');
        });
    });

    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !menuItems.contains(event.target)) {
            menuItems.classList.remove('active');
        }
    });

    const blogLink = document.querySelector('.blog-link');
    if (blogLink) {
        blogLink.addEventListener('click', function(event) {
            event.preventDefault(); 
            alert('O blog está em construção!');
        });
    }
});