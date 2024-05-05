const campagne = {
    "manuelles": [
        {
            "nom": "Campagne de Printemps",
            "description": "Promotion spéciale pour la saison du printemps.",
            "type": "manuelle",
            "date_debut": "2024-04-01",
            "date_fin": "2024-04-30",
            "budget": 5000
        },
        {
            "nom": "Promotion estivale",
            "description": "Offres estivales pour attirer les clients pendant les mois d'été.",
            "type": "manuelle",
            "date_debut": "2024-06-01",
            "date_fin": "2024-08-31",
            "budget": 8000
        }
    ],
    "automatiques": [
        {
            "nom": "Campagne Google Ads",
            "description": "Campagne publicitaire en ligne utilisant Google Ads pour cibler des mots-clés pertinents.",
            "type": "automatique",
            "date_debut": "2024-05-01",
            "date_fin": "2024-05-31",
            "budget": 3000,
            "parametres": {
                "ciblage": "Mots-clés",
                "enchères": "Automatiques",
                "plages_horaires": ["8h-12h", "14h-18h"]
            }
        },
        {
            "nom": "Campagne Emailing Automatisée",
            "description": "Envoi d'emails personnalisés à des clients fidèles pour promouvoir des offres spéciales.",
            "type": "automatique",
            "date_debut": "2024-07-01",
            "date_fin": "2024-07-31",
            "budget": 2000,
            "parametres": {
                "segmentation": "Clients fidèles",
                "contenu": "Offres personnalisées"
            }
        }
    ]
};

export default campagne;
