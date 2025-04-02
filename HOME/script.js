document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    const stats = document.querySelectorAll('.stat h2');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const target = parseFloat(stat.textContent);
                    let count = 0;
                    const increment = target / 50; // Adjust speed of animation

                    const updateCount = () => {
                        count += increment;
                        if (count >= target) {
                            stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
                        } else {
                            stat.textContent = Math.ceil(count) + (stat.textContent.includes('%') ? '%' : '+');
                            requestAnimationFrame(updateCount);
                        }
                    };
                    updateCount();
                });
                observer.unobserve(statsSection);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
});