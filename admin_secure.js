// Script pour protéger la page d'administration avec un mot de passe
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const adminPanel = document.getElementById('admin-panel');
    const loginBtn = document.getElementById('login-btn');
    const passwordInput = document.getElementById('password');
    
    // Mot de passe par défaut
    const defaultPassword = 'pimprez2025';
    
    // Vérifier si l'utilisateur est déjà connecté
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // Si déjà connecté, afficher directement le panneau d'administration
        adminPanel.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        // Sinon, afficher le formulaire de connexion
        loginForm.style.display = 'flex';
        adminPanel.style.display = 'none';
        
        // Gérer la soumission du formulaire de connexion
        loginBtn.addEventListener('click', function() {
            const password = passwordInput.value;
            
            if (password === defaultPassword) {
                // Mot de passe correct
                sessionStorage.setItem('adminLoggedIn', 'true');
                loginForm.style.display = 'none';
                adminPanel.style.display = 'block';
            } else {
                // Mot de passe incorrect
                alert('Mot de passe incorrect. Veuillez réessayer.');
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
        
        // Permettre la validation par la touche Entrée
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                loginBtn.click();
            }
        });
    }
});
