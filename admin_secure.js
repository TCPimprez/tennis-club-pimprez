// Script pour protéger la page d'administration par mot de passe
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'utilisateur est déjà authentifié
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    
    if (!isAuthenticated) {
        // Créer l'overlay de connexion
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.zIndex = '1000';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        
        // Créer le formulaire de connexion
        const loginForm = document.createElement('div');
        loginForm.style.backgroundColor = 'white';
        loginForm.style.padding = '30px';
        loginForm.style.borderRadius = '10px';
        loginForm.style.width = '350px';
        loginForm.style.maxWidth = '90%';
        
        loginForm.innerHTML = `
            <h3 style="margin-top: 0; color: #4CAF50;">Accès Administration</h3>
            <p>Veuillez entrer le mot de passe pour accéder au panneau d'administration.</p>
            <div style="margin-bottom: 15px;">
                <label for="password" style="display: block; margin-bottom: 5px;">Mot de passe:</label>
                <input type="password" id="admin-password" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div id="password-error" style="color: red; margin-bottom: 15px; display: none;">
                Mot de passe incorrect. Veuillez réessayer.
            </div>
            <button id="login-button" style="background-color: #4CAF50; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; width: 100%;">
                Se connecter
            </button>
            <div style="margin-top: 15px; text-align: center;">
                <a href="index.html" style="color: #666; text-decoration: none; font-size: 14px;">Retour au formulaire</a>
            </div>
        `;
        
        // Ajouter le formulaire à l'overlay
        overlay.appendChild(loginForm);
        
        // Ajouter l'overlay au body
        document.body.appendChild(overlay);
        
        // Gérer la soumission du formulaire
        document.getElementById('login-button').addEventListener('click', function() {
            const password = document.getElementById('admin-password').value;
            
            // Mot de passe simple à modifier selon vos besoins
            if (password === 'pimprez2025') {
                // Authentification réussie
                sessionStorage.setItem('adminAuthenticated', 'true');
                overlay.remove();
            } else {
                // Afficher l'erreur
                document.getElementById('password-error').style.display = 'block';
            }
        });
        
        // Permettre l'utilisation de la touche Entrée
        document.getElementById('admin-password').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('login-button').click();
            }
        });
    }
});
