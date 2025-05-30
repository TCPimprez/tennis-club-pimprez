<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription - Tennis Club de Pimprez</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .required-field::after {
            content: " *";
            color: #ef4444;
        }
        .form-section {
            transition: all 0.3s ease;
        }
        .form-section.collapsed {
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            margin-bottom: 0;
            padding: 0;
        }
        .form-section.expanded {
            max-height: 1000px;
            opacity: 1;
        }
    </style>
</head>
<body class="bg-gray-50 font-sans">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        <!-- Header -->
        <header class="bg-green-600 text-white rounded-lg shadow-md mb-8 p-6 text-center">
            <h1 class="text-3xl font-bold mb-2">Tennis Club de Pimprez</h1>
            <h2 class="text-xl">Formulaire d'inscription 2025-2026</h2>
        </header>

        <!-- Confirmation Message (hidden by default) -->
        <div id="confirmation-message" class="hidden bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8 rounded">
            <div class="flex items-center">
                <i class="fas fa-check-circle text-green-500 text-2xl mr-3"></i>
                <div>
                    <h3 class="font-bold text-lg">Inscription envoyée avec succès !</h3>
                    <p class="text-sm">Merci pour votre inscription. Nous vous contacterons bientôt pour finaliser votre adhésion.</p>
                </div>
            </div>
            <button id="btn-new-inscription" class="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                <i class="fas fa-plus mr-2"></i>Nouvelle inscription
            </button>
        </div>

        <!-- Main Form -->
        <form id="inscriptionForm" class="bg-white shadow-md rounded-lg p-6" action="https://formspree.io/f/xjvnqkqg" method="POST">
            <!-- Member Navigation -->
            <div id="member-navigation" class="hidden bg-gray-100 p-4 rounded-lg mb-6">
                <div class="flex justify-between items-center">
                    <button id="btn-prev-member" type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50 disabled:cursor-not-allowed">
                        <i class="fas fa-arrow-left mr-2"></i>Précédent
                    </button>
                    <div class="text-center">
                        <span id="membre-count" class="font-bold">1</span> / <span id="membre-total" class="font-bold">1</span> membre(s)
                    </div>
                    <button id="btn-next-member" type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50 disabled:cursor-not-allowed">
                        Suivant<i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>

            <!-- Personal Information Section -->
            <div class="form-section expanded mb-8">
                <h3 class="text-xl font-semibold mb-4 text-green-700 border-b pb-2 flex items-center">
                    <i class="fas fa-user-circle mr-2"></i>Informations personnelles
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Civilité -->
                    <div class="mb-4">
                        <label for="civilite" class="block text-gray-700 text-sm font-bold mb-2 required-field">Civilité</label>
                        <select id="civilite" name="civilite" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                            <option value="">-- Sélectionnez --</option>
                            <option value="Monsieur">Monsieur</option>
                            <option value="Madame">Madame</option>
                            <option value="Mademoiselle">Mademoiselle</option>
                        </select>
                    </div>

                    <!-- Nom -->
                    <div class="mb-4">
                        <label for="nom" class="block text-gray-700 text-sm font-bold mb-2 required-field">Nom</label>
                        <input type="text" id="nom" name="nom" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                    </div>

                    <!-- Prénom -->
                    <div class="mb-4">
                        <label for="prenom" class="block text-gray-700 text-sm font-bold mb-2 required-field">Prénom</label>
                        <input type="text" id="prenom" name="prenom" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                    </div>

                    <!-- Date de naissance -->
                    <div class="mb-4">
                        <label for="date_naissance" class="block text-gray-700 text-sm font-bold mb-2 required-field">Date de naissance</label>
                        <input type="date" id="date_naissance" name="date_naissance" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                    </div>

                    <!-- Nationalité -->
                    <div class="mb-4">
                        <label for="nationalite" class="block text-gray-700 text-sm font-bold mb-2">Nationalité</label>
                        <input type="text" id="nationalite" name="nationalite" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                </div>
            </div>

            <!-- Tennis Information Section -->
            <div class="form-section expanded mb-8">
                <h3 class="text-xl font-semibold mb-4 text-green-700 border-b pb-2 flex items-center">
                    <i class="fas fa-tennis-ball mr-2"></i>Informations tennis
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Niveau -->
                    <div class="mb-4">
                        <label for="niveau" class="block text-gray-700 text-sm font-bold mb-2">Niveau</label>
                        <select id="niveau" name="niveau" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">-- Sélectionnez --</option>
                            <option value="Débutant">Débutant</option>
                            <option value="Intermédiaire">Intermédiaire</option>
                            <option value="Avancé">Avancé</option>
                            <option value="Compétiteur">Compétiteur</option>
                        </select>
                    </div>

                    <!-- Licence FFT -->
                    <div class="mb-4 hidden" id="container-licence_fft">
                        <label for="licence_fft" class="block text-gray-700 text-sm font-bold mb-2">Numéro de licence FFT</label>
                        <input type="text" id="licence_fft" name="licence_fft" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>

                    <!-- Classement -->
                    <div class="mb-4 hidden" id="container-classement">
                        <label for="classement" class="block text-gray-700 text-sm font-bold mb-2">Classement</label>
                        <input type="text" id="classement" name="classement" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>

                    <!-- Compétitions -->
                    <div class="mb-4 col-span-2">
                        <label class="inline-flex items-center">
                            <input type="checkbox" id="competitions" name="competitions" class="form-checkbox h-5 w-5 text-green-600">
                            <span class="ml-2 text-gray-700">Je souhaite participer aux compétitions</span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Minor Section (hidden by default) -->
            <div id="section-mineur" class="form-section collapsed mb-8 bg-blue-50 p-4 rounded-lg">
                <h3 class="text-xl font-semibold mb-4 text-blue-700 border-b pb-2 flex items-center">
                    <i class="fas fa-child mr-2"></i>Informations du responsable légal
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Parent Nom -->
                    <div class="mb-4">
                        <label for="parent_nom" class="block text-gray-700 text-sm font-bold mb-2 required-field">Nom du responsable</label>
                        <input type="text" id="parent_nom" name="parent_nom" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>

                    <!-- Parent Prénom -->
                    <div class="mb-4">
                        <label for="parent_prenom" class="block text-gray-700 text-sm font-bold mb-2 required-field">Prénom du responsable</label>
                        <input type="text" id="parent_prenom" name="parent_prenom" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>

                    <!-- Parent Téléphone -->
                    <div class="mb-4">
                        <label for="parent_tel" class="block text-gray-700 text-sm font-bold mb-2 required-field">Téléphone du responsable</label>
                        <input type="tel" id="parent_tel" name="parent_tel" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>

                    <!-- Parent Email -->
                    <div class="mb-4">
                        <label for="parent_email" class="block text-gray-700 text-sm font-bold mb-2 required-field">Email du responsable</label>
                        <input type="email" id="parent_email" name="parent_email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                </div>
            </div>

            <!-- Contact Information Section -->
            <div class="form-section expanded mb-8">
                <h3 class="text-xl font-semibold mb-4 text-green-700 border-b pb-2 flex items-center">
                    <i class="fas fa-address-card mr-2"></i>Coordonnées
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Adresse -->
                    <div class="mb-4 col-span-2">
                        <label for="adresse" class="block text-gray-700 text-sm font-bold mb-2 required-field">Adresse</label>
                        <input type="text" id="adresse" name="adresse" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                    </div>

                    <!-- Code Postal -->
                    <div class="mb-4">
                        <label for="code_postal" class="block text-gray-700 text-sm font-bold mb-2 required-field">Code postal</label>
                        <input type="text" id="code_postal" name="code_postal" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                    </div>

                    <!-- Ville -->
                    <div class="mb-4">
                        <label for="ville" class="block text-gray-700 text-sm font-bold mb-2 required-field">Ville</label>
                        <input type="text" id="ville" name="ville" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                    </div>

                    <!-- Téléphone Mobile -->
                    <div class="mb-4">
                        <label for="tel_mobile" class="block text-gray-700 text-sm font-bold mb-2 required-field">Téléphone mobile</label>
                        <input type="tel" id="tel_mobile" name="tel_mobile" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                    </div>

                    <!-- Téléphone Fixe -->
                    <div class="mb-4 hidden" id="container-tel_fixe">
                        <label for="tel_fixe" class="block text-gray-700 text-sm font-bold mb-2">Téléphone fixe</label>
                        <input type="tel" id="tel_fixe" name="tel_fixe" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>

                    <!-- Email -->
                    <div class="mb-4 col-span-2">
                        <label for="email" class="block text-gray-700 text-sm font-bold mb-2 required-field">Email</label>
                        <input type="email" id="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                    </div>
                </div>
            </div>

            <!-- Comments Section -->
            <div class="mb-8">
                <label for="commentaires" class="block text-gray-700 text-sm font-bold mb-2">Commentaires</label>
                <textarea id="commentaires" name="commentaires" rows="3" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>

            <!-- Administrative Section -->
            <div class="bg-gray-100 p-4 rounded-lg mb-8">
                <!-- Certificat Médical -->
                <div class="mb-4">
                    <label class="inline-flex items-center">
                        <input type="checkbox" id="certificat_medical" name="certificat_medical" class="form-checkbox h-5 w-5 text-green-600" required>
                        <span class="ml-2 text-gray-700 required-field">Je m'engage à fournir un certificat médical de non contre-indication à la pratique du tennis</span>
                    </label>
                </div>

                <!-- Règlement Intérieur -->
                <div class="mb-4">
                    <label class="inline-flex items-center">
                        <input type="checkbox" id="reglement" name="reglement" class="form-checkbox h-5 w-5 text-green-600" required>
                        <span class="ml-2 text-gray-700 required-field">J'accepte le règlement intérieur du club</span>
                    </label>
                </div>
            </div>

            <!-- Form Actions -->
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <button id="btn-add-member" type="button" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <i class="fas fa-user-plus mr-2"></i>Ajouter un membre
                </button>
                
                <div class="flex gap-4">
                    <button type="reset" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center">
                        <i class="fas fa-undo mr-2"></i>Réinitialiser
                    </button>
                    <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
                        <i class="fas fa-paper-plane mr-2"></i>Envoyer mon inscription
                    </button>
                </div>
            </div>
        </form>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white text-center py-4 mt-8">
        <p>Tennis Club de Pimprez &copy; <span id="current-year"></span></p>
    </footer>

    <script>
        // Configuration du formulaire d'inscription au Tennis Club de Pimprez
        // Version simplifiée et robuste pour Formspree

        // Configuration par défaut
        let config = {
            fields: {
                civilite: true,
                nom: true,
                prenom: true,
                date_naissance: true,
                nationalite: true,
                niveau: true,
                licence_fft: false,
                classement: false,
                competitions: true,
                adresse: true,
                code_postal: true,
                ville: true,
                tel_mobile: true,
                tel_fixe: false,
                email: true,
                commentaires: true
            },
            admin: {
                certificat_medical: true,
                reglement: true,
                text_certificat_medical: "Je m'engage à fournir un certificat médical de non contre-indication à la pratique du tennis",
                text_reglement: "J'accepte le règlement intérieur du club"
            },
            clubName: "Tennis Club de Pimprez",
            season: "2025-2026",
            headerColor: "#4CAF50",
            buttonColor: "#4CAF50"
        };

        // Structure pour gérer les inscriptions multiples
        let famille = {
            membres: [],
            adresse: "",
            code_postal: "",
            ville: "",
            tel_mobile: "",
            tel_fixe: "",
            email: "",
            commentaires: "",
            certificat_medical: false,
            reglement: false
        };

        // Membre actif (celui en cours d'édition)
        let membreActif = 0;

        // Attendre que le DOM soit chargé
        document.addEventListener('DOMContentLoaded', function() {
            // Mettre à jour l'année dans le footer
            document.getElementById('current-year').textContent = new Date().getFullYear();

            // Appliquer la configuration au formulaire
            applyFormConfig(config);
            
            // Initialiser le premier membre
            ajouterMembre();
            
            // Gérer l'ajout de membres
            document.getElementById('btn-add-member').addEventListener('click', function() {
                ajouterMembre();
            });
            
            // Gérer la navigation entre membres
            document.getElementById('btn-prev-member').addEventListener('click', function() {
                if (membreActif > 0) {
                    sauvegarderDonneesMembre(membreActif);
                    membreActif--;
                    afficherDonneesMembre(membreActif);
                    updateMemberNavigation();
                }
            });
            
            document.getElementById('btn-next-member').addEventListener('click', function() {
                if (membreActif < famille.membres.length - 1) {
                    sauvegarderDonneesMembre(membreActif);
                    membreActif++;
                    afficherDonneesMembre(membreActif);
                    updateMemberNavigation();
                }
            });
            
            // Gérer l'affichage des champs pour mineurs
            document.getElementById('date_naissance').addEventListener('change', function() {
                verifierAge();
            });
            
            // Gérer la soumission du formulaire
            document.getElementById('inscriptionForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Sauvegarder les données du membre actif
                sauvegarderDonneesMembre(membreActif);
                
                // Récupérer les données communes
                famille.adresse = document.getElementById('adresse').value;
                famille.code_postal = document.getElementById('code_postal').value;
                famille.ville = document.getElementById('ville').value;
                famille.tel_mobile = document.getElementById('tel_mobile').value;
                famille.tel_fixe = document.getElementById('tel_fixe') ? document.getElementById('tel_fixe').value : "";
                famille.email = document.getElementById('email').value;
                famille.commentaires = document.getElementById('commentaires').value;
                
                // Vérifier les champs administratifs
                famille.certificat_medical = document.getElementById('certificat_medical').checked;
                famille.reglement = document.getElementById('reglement').checked;
                
                // Créer un élément caché pour stocker les données JSON
                let hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'famille_data';
                hiddenInput.value = JSON.stringify(famille);
                
                // Ajouter l'élément au formulaire
                this.appendChild(hiddenInput);
                
                // Créer un élément caché pour le nombre de membres
                hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'nombre_membres';
                hiddenInput.value = famille.membres.length;
                this.appendChild(hiddenInput);
                
                // Soumettre le formulaire à Formspree
                this.submit();
                
                // Afficher le message de confirmation
                document.getElementById('confirmation-message').style.display = 'block';
                document.getElementById('inscriptionForm').style.display = 'none';
                
                // Faire défiler vers le haut pour voir le message
                window.scrollTo(0, 0);
            });
            
            // Gérer le bouton de nouvelle inscription
            document.getElementById('btn-new-inscription').addEventListener('click', function() {
                // Réinitialiser le formulaire
                document.getElementById('inscriptionForm').reset();
                
                // Réinitialiser la famille
                famille = {
                    membres: [],
                    adresse: "",
                    code_postal: "",
                    ville: "",
                    tel_mobile: "",
                    tel_fixe: "",
                    email: "",
                    commentaires: "",
                    certificat_medical: false,
                    reglement: false
                };
                
                // Réinitialiser le membre actif
                membreActif = 0;
                
                // Ajouter un nouveau membre
                ajouterMembre();
                
                // Cacher le message de confirmation et afficher le formulaire
                document.getElementById('confirmation-message').style.display = 'none';
                document.getElementById('inscriptionForm').style.display = 'block';
            });
        });

        // Appliquer la configuration au formulaire
        function applyFormConfig(config) {
            // Mettre à jour le nom du club et la saison
            document.getElementById('club-name').textContent = config.clubName;
            document.getElementById('season').textContent = config.season;
            
            // Afficher/masquer les champs selon la configuration
            for (const [field, visible] of Object.entries(config.fields)) {
                const fieldContainer = document.getElementById(`container-${field}`);
                if (fieldContainer) {
                    fieldContainer.style.display = visible ? 'block' : 'none';
                }
            }
            
            // Mettre à jour les textes des cases à cocher administratives
            if (config.admin) {
                const certificatLabel = document.querySelector('#container-certificat_medical label span');
                if (certificatLabel && config.admin.text_certificat_medical) {
                    certificatLabel.textContent = config.admin.text_certificat_medical;
                }
                
                const reglementLabel = document.querySelector('#container-reglement label span');
                if (reglementLabel && config.admin.text_reglement) {
                    reglementLabel.textContent = config.admin.text_reglement;
                }
            }
        }

        // Ajouter un nouveau membre
        function ajouterMembre() {
            // Sauvegarder les données du membre actif si ce n'est pas le premier ajout
            if (famille.membres.length > 0) {
                sauvegarderDonneesMembre(membreActif);
            }
            
            // Créer un nouveau membre
            const nouveauMembre = {
                civilite: "",
                nom: "",
                prenom: "",
                date_naissance: "",
                nationalite: "",
                niveau: "",
                licence_fft: "",
                classement: "",
                competitions: false,
                parent_nom: "",
                parent_prenom: "",
                parent_tel: "",
                parent_email: "",
                est_mineur: false
            };
            
            // Ajouter le membre à la famille
            famille.membres.push(nouveauMembre);
            
            // Mettre à jour le membre actif
            membreActif = famille.membres.length - 1;
            
            // Réinitialiser le formulaire
            document.getElementById('inscriptionForm').reset();
            
            // Mettre à jour la navigation
            updateMemberNavigation();
            
            // Mettre à jour le compteur de membres
            document.getElementById('membre-count').textContent = membreActif + 1;
            document.getElementById('membre-total').textContent = famille.membres.length;
            
            // Afficher la section de navigation entre membres
            document.getElementById('member-navigation').style.display = 'block';
        }

        // Sauvegarder les données du membre actif
        function sauvegarderDonneesMembre(index) {
            if (index >= 0 && index < famille.membres.length) {
                const membre = famille.membres[index];
                
                // Récupérer les valeurs des champs
                membre.civilite = document.getElementById('civilite').value;
                membre.nom = document.getElementById('nom').value;
                membre.prenom = document.getElementById('prenom').value;
                membre.date_naissance = document.getElementById('date_naissance').value;
                membre.nationalite = document.getElementById('nationalite').value;
                membre.niveau = document.getElementById('niveau').value;
                membre.licence_fft = document.getElementById('licence_fft') ? document.getElementById('licence_fft').value : "";
                membre.classement = document.getElementById('classement') ? document.getElementById('classement').value : "";
                membre.competitions = document.getElementById('competitions').checked;
                
                // Champs pour mineurs
                membre.est_mineur = document.getElementById('section-mineur').style.display === 'block';
                if (membre.est_mineur) {
                    membre.parent_nom = document.getElementById('parent_nom').value;
                    membre.parent_prenom = document.getElementById('parent_prenom').value;
                    membre.parent_tel = document.getElementById('parent_tel').value;
                    membre.parent_email = document.getElementById('parent_email').value;
                }
            }
        }

        // Afficher les données d'un membre
        function afficherDonneesMembre(index) {
            if (index >= 0 && index < famille.membres.length) {
                const membre = famille.membres[index];
                
                // Remplir les champs avec les données du membre
                document.getElementById('civilite').value = membre.civilite;
                document.getElementById('nom').value = membre.nom;
                document.getElementById('prenom').value = membre.prenom;
                document.getElementById('date_naissance').value = membre.date_naissance;
                document.getElementById('nationalite').value = membre.nationalite;
                document.getElementById('niveau').value = membre.niveau;
                if (document.getElementById('licence_fft')) document.getElementById('licence_fft').value = membre.licence_fft;
                if (document.getElementById('classement')) document.getElementById('classement').value = membre.classement;
                document.getElementById('competitions').checked = membre.competitions;
                
                // Mettre à jour l'affichage pour les mineurs
                verifierAge();
                
                // Remplir les champs pour mineurs si nécessaire
                if (membre.est_mineur) {
                    document.getElementById('parent_nom').value = membre.parent_nom;
                    document.getElementById('parent_prenom').value = membre.parent_prenom;
                    document.getElementById('parent_tel').value = membre.parent_tel;
                    document.getElementById('parent_email').value = membre.parent_email;
                }
                
                // Mettre à jour le compteur de membres
                document.getElementById('membre-count').textContent = index + 1;
            }
        }

        // Mettre à jour la navigation entre membres
        function updateMemberNavigation() {
            document.getElementById('btn-prev-member').disabled = membreActif === 0;
            document.getElementById('btn-next-member').disabled = membreActif === famille.membres.length - 1;
        }

        // Vérifier l'âge pour afficher ou masquer les champs pour mineurs
        function verifierAge() {
            const dateNaissance = document.getElementById('date_naissance').value;
            if (dateNaissance) {
                const aujourdhui = new Date();
                const dateNaissanceObj = new Date(dateNaissance);
                const age = aujourdhui.getFullYear() - dateNaissanceObj.getFullYear();
                
                // Vérifier si l'anniversaire est déjà passé cette année
                const moisAujourdhui = aujourdhui.getMonth();
                const jourAujourdhui = aujourdhui.getDate();
                const moisNaissance = dateNaissanceObj.getMonth();
                const jourNaissance = dateNaissanceObj.getDate();
                
                const ageAjuste = (moisAujourdhui < moisNaissance || (moisAujourdhui === moisNaissance && jourAujourdhui < jourNaissance)) ? age - 1 : age;
                
                // Afficher ou masquer la section pour mineurs
                document.getElementById('section-mineur').style.display = ageAjuste < 18 ? 'block' : 'none';
                
                // Mettre à jour le statut de mineur du membre actif
                if (membreActif >= 0 && membreActif < famille.membres.length) {
                    famille.membres[membreActif].est_mineur = ageAjuste < 18;
                }
            }
        }
    </script>
</body>
</html>
