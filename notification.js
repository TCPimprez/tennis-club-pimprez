// Configuration du système de notification par email
// Ce script sera ajouté au formulaire pour envoyer les données par email

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inscriptionForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = new FormData(form);
        const formDataObj = {};
        
        // Conversion des données en objet
        formData.forEach((value, key) => {
            // Gestion des valeurs multiples (comme les cases à cocher)
            if (formDataObj[key]) {
                if (!Array.isArray(formDataObj[key])) {
                    formDataObj[key] = [formDataObj[key]];
                }
                formDataObj[key].push(value);
            } else {
                formDataObj[key] = value;
            }
        });
        
        // Préparation des données pour l'email
        const emailData = {
            formData: formDataObj,
            formId: 'tennis-club-inscription',
            subject: 'Nouvelle inscription au club de tennis'
        };
        
        // Envoi des données à Formspree
        fetch('https://formspree.io/f/xgegvdwj', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(emailData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erreur lors de l\'envoi du formulaire');
        })
        .then(data => {
            // Affichage d'un message de confirmation
            form.innerHTML = `
                <div class="alert alert-success">
                    <h4>Merci pour votre inscription !</h4>
                    <p>Votre demande d'inscription a bien été enregistrée.</p>
                    <p>Le responsable du club va traiter votre demande et vous contactera prochainement.</p>
                </div>
            `;
            
            // Création d'un fichier CSV pour l'export Excel
            const csvData = [];
            const headers = Object.keys(formDataObj);
            csvData.push(headers);
            
            const values = Object.values(formDataObj);
            csvData.push(values);
            
            // Génération du CSV
            const csvContent = csvData.map(row => row.join(',')).join('\n');
            
            // Envoi du CSV par email (via Formspree)
            const csvEmailData = {
                csv: csvContent,
                formId: 'tennis-club-inscription-csv',
                subject: 'Données CSV - Nouvelle inscription au club de tennis'
            };
            
            fetch('https://formspree.io/f/xgegvdwj', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(csvEmailData)
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
            form.innerHTML += `
                <div class="alert alert-danger">
                    <p>Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer ultérieurement.</p>
                </div>
            `;
        });
    });
});
