export interface Highlight {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  number: string;
  name: string;
  year: string;
  size: 'featured' | 'major' | 'minor';
  context: string;
  subtitle: string;
  type: string;
  description: string;
  categories: string[];
  tags: string[];
  highlights: Highlight[];
  challenge: string;
  contributions: string[];
  scope: string;
  gallery?: Shot[];
  /** How screenshots are framed: phone (portrait) or browser (16:9). Defaults to phone. */
  frame?: 'phone' | 'browser';
  video?: { src: string; poster: string; length: string };
}

export interface Shot {
  src: string;
  caption: string;
}

export interface TimelineItem {
  period: string;
  place: string;
  role: string;
  detail: string;
  meta?: string;
}

/** English text is the key; French is the value. Unlisted strings fall back to English. */
export const TRANSLATIONS: Record<string, string> = {};

const l = (en: string, fr: string) => {
  TRANSLATIONS[en] = fr;
  return en;
};

/* ------------------------------------------------------------------ */
/* Interface copy                                                      */
/* ------------------------------------------------------------------ */
[
  ['Work', 'Projets'],
  ['Experience', 'Parcours'],
  ['Skills', 'Compétences'],
  ['About', 'À propos'],
  ['Let’s talk', 'Échangeons'],
  ['Menu', 'Menu'],
  ['Close', 'Fermer'],
  ['Contact', 'Contact'],
  ['Skip to selected work', 'Aller aux projets'],
  ['Software engineering student', 'Élève ingénieur en informatique'],
  ['Open to a PFE internship · 2027', 'Disponible pour un stage PFE · 2027'],
  ['Engineering', 'Imaginer.'],
  ['what’s', 'Créer'],
  ['next.', 'demain.'],
  [
    'Final-year engineering student at ESPRIT. I build full-stack and mobile applications, integrate local AI models with real safeguards, and test what I ship.',
    'Élève ingénieur en dernière année à ESPRIT. Je développe des applications web et mobiles, j’intègre des modèles d’IA locaux avec de vrais garde-fous, et je teste ce que je livre.',
  ],
  ['Explore my work', 'Voir mes projets'],
  ['Download CV', 'Télécharger le CV'],
  ['Download CV (PDF)', 'Télécharger le CV (PDF)'],
  ['projects', 'projets'],
  ['internships', 'stages'],
  ['automated tests', 'tests automatisés'],
  ['IDEAS INTO SYSTEMS', 'DES IDÉES AUX SYSTÈMES'],
  ['CONTINUOUS EXPLORATION', 'EXPLORER SANS CESSE'],
  ['SCROLL TO EXPLORE', 'DÉFILER POUR DÉCOUVRIR'],
  ['DRAG THE OBJECT. GET CURIOUS.', 'FAITES TOURNER L’OBJET. EXPLOREZ.'],
  ['Pause 3D animation', 'Mettre l’animation 3D en pause'],
  ['Motion off', 'Animation arrêtée'],
  ['Motion on', 'Animation active'],
  ['WHAT I WORK WITH', 'MES OUTILS'],
  ['SELECTED WORK', 'PROJETS CHOISIS'],
  ['Ideas, made', 'Des idées'],
  ['real.', 'concrètes.'],
  ['Six projects, from AI marketplaces', 'Six projets, des marketplaces IA'],
  ['to mobile apps tested on real devices.', 'aux applications mobiles testées sur appareil réel.'],
  ['All work', 'Tous'],
  ['Full-stack', 'Full-stack'],
  ['Mobile', 'Mobile'],
  ['Applied AI', 'IA appliquée'],
  ['Data & DevOps', 'Data & DevOps'],
  ['PROJECTS', 'PROJETS'],
  ['Filter projects', 'Filtrer les projets'],
  ['Explore', 'Découvrir'],
  ['VIEW CASE STUDY', 'VOIR LE PROJET'],
  ['FIND YOUR PERFECT FIT.', 'LA BONNE PIÈCE, TOUT SIMPLEMENT.'],
  ['Find a part that fits my car', 'Trouver une pièce pour ma voiture'],
  ['AI SEARCH', 'RECHERCHE IA'],
  ['YOUR VEHICLE', 'VOTRE VÉHICULE'],
  ['SEMANTIC SEARCH', 'RECHERCHE SÉMANTIQUE'],
  ['THE RIGHT PART', 'LA BONNE PIÈCE'],
  ['KNOWLEDGE, CONNECTED.', 'LE SAVOIR, CONNECTÉ.'],
  ['CONNECTED MUNICIPAL SERVICES', 'SERVICES MUNICIPAUX CONNECTÉS'],
  ['HOUSEKEEPING, LIVE.', 'LE MÉNAGE, EN DIRECT.'],
  ['Floor', 'Étage'],
  ['Screens from the app', 'Écrans de l’application'],
  ['Demo video', 'Vidéo de démonstration'],
  ['A walkthrough of the marketplace, recorded in the local demo environment (captions in French).', 'Visite guidée de la marketplace, enregistrée dans l’environnement de démonstration local (sous-titres en français).'],
  ['Screenshots from the local demo environment.', 'Captures de l’environnement de démonstration local.'],
  ['WATCH THE DEMO', 'VOIR LA DÉMO'],
  ['Scroll screens left', 'Faire défiler vers la gauche'],
  ['Scroll screens right', 'Faire défiler vers la droite'],
  ['Open screen', 'Ouvrir l’écran'],
  ['Screen viewer', 'Visionneuse d’écrans'],
  ['Previous screen', 'Écran précédent'],
  ['Next screen', 'Écran suivant'],
  ['← → to browse · click the screen to zoom · Esc to close', '← → pour naviguer · cliquez sur l’écran pour zoomer · Échap pour fermer'],
  ['Zoom in', 'Zoomer'],
  ['Zoom out', 'Dézoomer'],
  ['Real screenshots from the 43-step end-to-end test on an Android phone.', 'Captures réelles du test de bout en bout de 43 étapes sur téléphone Android.'],
  ['REAL SCREENS · ANDROID 14', 'ÉCRANS RÉELS · ANDROID 14'],
  ['ENGINEER PROFILE', 'PROFIL INGÉNIEUR'],
  ['FULL-STACK · MOBILE · AI', 'FULL-STACK · MOBILE · IA'],
  ['YEAR', 'ANNÉE'],
  ['FINAL', 'FINALE'],
  ['Projects', 'Projets'],
  ['Internships', 'Stages'],
  ['Auto tests', 'Tests auto'],
  ['Languages', 'Langues'],
  ['TILT THE CARD. GET CURIOUS.', 'INCLINEZ LA CARTE. EXPLOREZ.'],
  ['Free', 'Libre'],
  ['To clean', 'À nettoyer'],
  ['Occupied', 'Occupée'],
  ['Out of order', 'Hors service'],
  ['E2E ON DEVICE', 'E2E SUR APPAREIL'],
  ['RECOMMENDED FOR YOU', 'RECOMMANDÉ POUR VOUS'],
  ['Allergy-safe', 'Sans allergène'],
  ['Local LLM', 'LLM local'],
  ['Rule fallback', 'Repli sur règles'],
  ['SAME QUERY · LOWER IS BETTER', 'MÊME REQUÊTE · PLUS BAS = MIEUX'],
  ['More code on GitHub', 'Plus de code sur GitHub'],
  ['EXPERIENCE & EDUCATION', 'EXPÉRIENCE & FORMATION'],
  ['Where I’ve', 'Là où j’ai'],
  ['learned.', 'appris.'],
  ['Two internships, one remote role,', 'Deux stages, un poste à distance,'],
  ['and an engineering degree in progress.', 'et un diplôme d’ingénieur en cours.'],
  ['EXPERIENCE', 'EXPÉRIENCE'],
  ['EDUCATION', 'FORMATION'],
  ['MY TOOLKIT', 'MES COMPÉTENCES'],
  ['The thinking.', 'La réflexion.'],
  ['The', 'La'],
  ['building.', 'réalisation.'],
  ['From the first API endpoint', 'Du premier endpoint API'],
  ['to the test that proves it works.', 'au test qui prouve qu’il fonctionne.'],
  ['Backend & systems', 'Backend & systèmes'],
  [
    'Clear APIs, focused services, and data that stays consistent under real use.',
    'Des API claires, des services ciblés et des données qui restent cohérentes à l’usage.',
  ],
  ['Mobile apps', 'Applications mobiles'],
  [
    'Flutter apps that keep working offline, migrate data safely, and are tested on real phones.',
    'Des applications Flutter qui fonctionnent hors ligne, migrent les données sans perte et sont testées sur de vrais téléphones.',
  ],
  ['Applied intelligence', 'Intelligence appliquée'],
  [
    'Local models connected to real product needs, with validated outputs and safe fallbacks.',
    'Des modèles locaux reliés à de vrais besoins produit, avec des sorties validées et des replis sûrs.',
  ],
  ['Quality & delivery', 'Qualité & livraison'],
  [
    'Automated tests at every level, repeatable builds, and systems you can observe.',
    'Des tests automatisés à chaque niveau, des builds reproductibles et des systèmes observables.',
  ],
  ['Web & interface', 'Web & interface'],
  [
    'Responsive interfaces in Angular, from the first mockup to interactive 3D.',
    'Des interfaces Angular responsives, de la première maquette à la 3D interactive.',
  ],
  ['Versioned migrations', 'Migrations versionnées'],
  ['Android: notifications, camera, QR', 'Android : notifications, caméra, QR'],
  ['Figma prototyping', 'Prototypage Figma'],
  ['Interactive 3D', '3D interactive'],
  ['BEYOND THE CODE', 'AU-DELÀ DU CODE'],
  ['A LITTLE ABOUT THE PERSON', 'LA PERSONNE DERRIÈRE LE CODE'],
  ['TUNISIA → EVERYWHERE', 'TUNISIE → PARTOUT'],
  ['Built on curiosity.', 'La curiosité comme moteur.'],
  ['Driven by', 'Le sens comme'],
  ['purpose.', 'direction.'],
  [
    'I’m Jasser, a final-year software engineering student at ESPRIT in Tunis. I like understanding how things work, then making them work better.',
    'Je suis Jasser, élève ingénieur en dernière année à ESPRIT, à Tunis. J’aime comprendre comment les choses fonctionnent, puis les faire mieux fonctionner.',
  ],
  [
    'My work sits between backend engineering, mobile development and applied AI. I care about clear architecture, honest measurements, and the details that turn a working application into a dependable one.',
    'Mon travail se situe entre le backend, le développement mobile et l’IA appliquée. Je tiens à une architecture claire, à des mesures honnêtes et aux détails qui rendent une application fiable.',
  ],
  ['CURRENTLY', 'ACTUELLEMENT'],
  ['Final-year engineering student', 'Élève ingénieur, dernière année'],
  ['LOOKING FOR', 'JE RECHERCHE'],
  ['A PFE internship', 'Un stage PFE'],
  ['4–6 months · from early 2027', '4 à 6 mois · dès début 2027'],
  ['LANGUAGES', 'LANGUES'],
  ['Arabic', 'Arabe'],
  ['Native', 'Langue maternelle'],
  ['English', 'Anglais'],
  ['French', 'Français'],
  ['YOUR NEXT PROJECT STARTS HERE', 'VOTRE PROCHAIN PROJET COMMENCE ICI'],
  ['Let’s build', 'Créons'],
  ['something', 'quelque chose'],
  ['great.', 'd’unique.'],
  [
    'An internship, a project, or a good conversation.',
    'Un stage, un projet ou une belle discussion.',
  ],
  ['I’d love to hear from you.', 'Je serais ravi d’échanger avec vous.'],
  ['Copy email address', 'Copier l’adresse e-mail'],
  ['Email copied', 'Adresse copiée'],
  ['Email copied to clipboard.', 'Adresse copiée dans le presse-papiers.'],
  ['Please select the email address to copy it.', 'Sélectionnez l’adresse e-mail pour la copier.'],
  ['BUILT WITH INTENTION. AND A LITTLE CURIOSITY.', 'CRÉÉ AVEC SOIN. ET UN PEU DE CURIOSITÉ.'],
  ['Back to top', 'Retour en haut'],
  ['Close project details', 'Fermer les détails du projet'],
  ['Key results', 'Résultats clés'],
  ['The challenge', 'Le défi'],
  ['What I built', 'Ce que j’ai réalisé'],
  ['Let’s talk about it', 'Parlons-en'],
  [
    'Software engineering student in Tunis. Full-stack, mobile and applied AI. Discover e-Biessa, Nova Paris, Nirvana and more.',
    'Élève ingénieur en informatique à Tunis. Full-stack, mobile et IA appliquée. Découvrez e-Biessa, Nova Paris, Nirvana et plus encore.',
  ],
  ['Engineering what’s next.', 'Imaginer. Créer demain.'],
].forEach(([en, fr]) => (TRANSLATIONS[en] = fr));

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */
export const PROJECTS: Project[] = [
  {
    id: 'ebiessa',
    number: '01',
    name: 'e-Biessa',
    year: '2026',
    size: 'featured',
    context: l('Internship · ReaddlyTech', 'Stage · ReaddlyTech'),
    subtitle: l('The right part. Intelligently found.', 'La bonne pièce. Trouvée intelligemment.'),
    type: l('AI-POWERED MARKETPLACE', 'MARKETPLACE & INTELLIGENCE ARTIFICIELLE'),
    description: l(
      'An automotive parts marketplace combining a Spring Boot backend, an Angular interface, multilingual vector search and a fine-tuned local LLM.',
      'Une marketplace de pièces automobiles associant un backend Spring Boot, une interface Angular, une recherche vectorielle multilingue et un LLM local adapté.',
    ),
    categories: ['Full-stack', 'Applied AI', 'Data & DevOps'],
    tags: ['Spring Boot', 'Angular', 'FastAPI', 'Qdrant', 'Ollama · Qwen 2.5', 'Redis', 'Docker'],
    highlights: [
      { value: 'QLoRA', label: l('Qwen 2.5 fine-tuned, served locally', 'Qwen 2.5 adapté, servi en local') },
      { value: '3', label: l('user journeys: buyer, seller, admin', 'parcours : acheteur, vendeur, admin') },
      { value: 'CI/CD', label: l('Jenkins · SonarQube · Grafana', 'Jenkins · SonarQube · Grafana') },
    ],
    challenge: l(
      'Finding a used car part is more than a keyword search. A useful result has to fit the vehicle, make sense to the buyer, and come from real inventory — and the site must keep working when the AI does not.',
      'Trouver une pièce automobile d’occasion va au-delà des mots-clés. Le résultat doit correspondre au véhicule, être compréhensible et provenir du stock réel — et le site doit continuer à fonctionner quand l’IA ne répond pas.',
    ),
    contributions: [
      l(
        'Designed and built the buyer, seller and administrator journeys: multi-vehicle listings, reviews, moderation and real-time messaging with attachments.',
        'Conception et développement des parcours acheteur, vendeur et administrateur : annonces multivéhicules, avis, modération et messagerie temps réel avec pièces jointes.',
      ),
      l(
        'Implemented multilingual semantic search with FastAPI and Qdrant, deterministic compatibility checks, personalised recommendations and part-type identification from a photo.',
        'Recherche sémantique multilingue avec FastAPI et Qdrant, contrôles de compatibilité déterministes, recommandations personnalisées et identification du type de pièce par photo.',
      ),
      l(
        'Fine-tuned Qwen 2.5 with QLoRA/Unsloth and served it locally through Ollama.',
        'Adaptation de Qwen 2.5 avec QLoRA/Unsloth et intégration locale via Ollama.',
      ),
      l(
        'Set up backend, frontend and end-to-end tests, a Jenkins/SonarQube pipeline, Prometheus/Grafana monitoring, and circuit breakers with degraded modes around every AI call.',
        'Mise en place des tests backend, frontend et E2E, d’une chaîne Jenkins/SonarQube, de la supervision Prometheus/Grafana et de circuit breakers avec modes dégradés autour de chaque appel IA.',
      ),
    ],
    scope: l(
      'Internship at ReaddlyTech · July–August 2026 · Local development and resilience lab; no public production deployment is claimed.',
      'Stage chez ReaddlyTech · juillet–août 2026 · Développement local et laboratoire de résilience ; aucun déploiement public en production n’est revendiqué.',
    ),

    frame: 'browser',
    video: { src: 'projects/ebiessa/demo.mp4', poster: 'projects/ebiessa/01-accueil.webp', length: '1:15' },
    gallery: [
      { src: 'projects/ebiessa/01-accueil.webp', caption: l('Home: keyword and fitment search', 'Accueil : recherche par mot-clé et compatibilité') },
      { src: 'projects/ebiessa/02-recherche-ia.webp', caption: l('AI search with compatibility checks', 'Recherche IA et contrôles de compatibilité') },
      { src: 'projects/ebiessa/11-photo-2.webp', caption: l('Identify a part from a photo', 'Identification d’une pièce par photo') },
      { src: 'projects/ebiessa/03-fiche-annonce.webp', caption: l('Listing page and vehicle compatibility', 'Fiche annonce et compatibilité véhicule') },
      { src: 'projects/ebiessa/04-messagerie.webp', caption: l('Buyer–seller messaging', 'Messagerie acheteur–vendeur') },
      { src: 'projects/ebiessa/06-studio-vendeur.webp', caption: l('Seller studio: inventory', 'Studio vendeur : inventaire') },
      { src: 'projects/ebiessa/07-nouvelle-annonce.webp', caption: l('New listing with price guidance', 'Nouvelle annonce avec aide au prix') },
      { src: 'projects/ebiessa/08-administration.webp', caption: l('Admin dashboard and moderation', 'Administration et modération') },
      { src: 'projects/ebiessa/05-accueil-sombre.webp', caption: l('Dark mode', 'Mode sombre') },
    ],
  },
  {
    id: 'nova',
    number: '02',
    name: 'Nova Paris',
    year: '2026',
    size: 'major',
    context: l('Mobile app · ESPRIT', 'Application mobile · ESPRIT'),
    subtitle: l('Every room, ready on time.', 'Chaque chambre, prête à l’heure.'),
    type: l('HOTEL OPERATIONS · FLUTTER', 'GESTION HÔTELIÈRE · FLUTTER'),
    description: l(
      'A Flutter hotel-management app. I built the rooms & housekeeping module and the shared foundation the rest of the app runs on.',
      'Une application Flutter de gestion hôtelière. J’ai développé le module chambres & ménage et le socle sur lequel repose le reste de l’application.',
    ),
    categories: ['Mobile'],
    tags: ['Flutter', 'Dart', 'sqflite', 'Android', 'integration_test'],
    highlights: [
      { value: '20', label: l('features in the module', 'fonctionnalités dans le module') },
      { value: '155', label: l('unit, widget & golden tests', 'tests unitaires, widget & golden') },
      { value: '43/43', label: l('E2E steps passed on a real phone', 'étapes E2E réussies sur téléphone réel') },
    ],
    challenge: l(
      'Housekeeping changes minute by minute: rooms free up, agents get reassigned, problems are reported from the corridor. The app has to stay correct offline, keep data safe across updates, and show changes live.',
      'Le ménage évolue minute par minute : chambres libérées, agents réaffectés, incidents signalés depuis le couloir. L’application doit rester correcte hors ligne, préserver les données à chaque mise à jour et afficher les changements en direct.',
    ),
    contributions: [
      l(
        'Built 20 features (~20,500 lines of Dart): automatic assignment by floor and priority, scored inspections, cleaning timers, incident reports with photos and voice notes, stock, laundry, minibar and a live dashboard.',
        '20 fonctionnalités (~20 500 lignes de Dart) : affectation automatique par étage et priorité, inspections notées, chronomètres de nettoyage, incidents avec photos et notes vocales, stocks, blanchisserie, minibar et tableau de bord en direct.',
      ),
      l(
        'Designed the app foundation: modules that communicate only through events, one SQLite database with 7 schema versions migrated in place, and every action run in a transaction with role, ownership and version checks.',
        'Conception du socle : modules communiquant uniquement par événements, une base SQLite avec 7 versions de schéma migrées sans perte, et chaque action exécutée dans une transaction avec contrôles de rôle, de propriété et de version.',
      ),
      l(
        'Made actions idempotent with client UUIDs, scheduled Android alerts that fire with the app closed, and added backup and restore for the module’s data, photos and voice notes.',
        'Actions idempotentes grâce aux UUID clients, alertes Android planifiées qui se déclenchent application fermée, et sauvegarde/restauration des données, photos et notes vocales du module.',
      ),
      l(
        'Wrote 155 automated tests on a real SQLite database and a 43-step end-to-end test on an Android 14 phone with screenshots and an HTML report — 43/43 passed.',
        'Écriture de 155 tests automatisés sur une vraie base SQLite et d’un test de bout en bout de 43 étapes sur téléphone Android 14, avec captures et rapport HTML — 43/43 réussies.',
      ),
    ],
    scope: l(
      'Mobile development course project · ESPRIT · 2026',
      'Projet du module Développement mobile · ESPRIT · 2026',
    ),

    gallery: [
      { src: 'projects/nova/01_connexion.webp', caption: l('Sign-in: pick a demo profile', 'Connexion : choix du profil') },
      { src: 'projects/nova/02_accueil_gouvernante.webp', caption: l('Supervisor home', 'Accueil de la gouvernante') },
      { src: 'projects/nova/03_chambres_statuts.webp', caption: l('Room statuses and filters', 'Statuts des chambres et filtres') },
      { src: 'projects/nova/05_attribution_auto.webp', caption: l('Automatic assignment', 'Attribution automatique') },
      { src: 'projects/nova/18_accueil_agent.webp', caption: l('Agent home: today’s rooms', 'Accueil agent : chambres du jour') },
      { src: 'projects/nova/20_nettoyage_demarre.webp', caption: l('Cleaning timer and checklist', 'Minuteur et liste de contrôle') },
      { src: 'projects/nova/14_tableau_de_bord.webp', caption: l('Live dashboard', 'Tableau de bord en direct') },
      { src: 'projects/nova/38_manager_etages.webp', caption: l('Manager: floors and rooms', 'Manager : étages et chambres') },
      { src: 'projects/nova/42_restauration.webp', caption: l('Backup and restore', 'Sauvegarde et restauration') },
    ],
  },
  {
    id: 'nirvana',
    number: '03',
    name: 'Nirvana',
    year: '2026',
    size: 'major',
    context: l('Web app with AI · ESPRIT', 'Application web avec IA · ESPRIT'),
    subtitle: l('Recommendations that respect allergies.', 'Des recommandations qui respectent les allergies.'),
    type: l('RESTAURANT PLATFORM · LOCAL AI', 'PLATEFORME RESTAURANT · IA LOCALE'),
    description: l(
      'A restaurant web app with local AI: allergy-aware dish recommendations, demand forecasting and review analysis — private by design.',
      'Une application web de restauration avec IA locale : recommandations tenant compte des allergies, prévision de la demande et analyse des avis — confidentielle par conception.',
    ),
    categories: ['Full-stack', 'Applied AI'],
    tags: ['Angular 20', 'FastAPI', 'SQLite', 'Ollama · Qwen 2.5', 'scikit-learn', 'pytest'],
    highlights: [
      { value: '94%', label: l('test coverage', 'de couverture de tests') },
      { value: '86', label: l('automated tests', 'tests automatisés') },
      { value: '0', label: l('raw personal data sent to the model', 'donnée personnelle brute envoyée au modèle') },
    ],
    challenge: l(
      'An AI that recommends food can hurt someone. Recommendations must never ignore an allergy, the model must never see raw personal data, and the app must keep working when the model is slow or missing.',
      'Une IA qui recommande des plats peut faire du tort. Les recommandations ne doivent jamais ignorer une allergie, le modèle ne doit jamais voir de données personnelles brutes, et l’application doit fonctionner même si le modèle est lent ou absent.',
    ),
    contributions: [
      l(
        'Built the customer and staff sides: menu, cart and checkout, order history, reviews, table reservations, kitchen board and inventory with low-stock warnings.',
        'Développement des espaces client et personnel : menu, panier et paiement, historique, avis, réservations, tableau de cuisine et stock avec alertes.',
      ),
      l(
        'Personalised dish recommendations with a local LLM (Ollama, Qwen 2.5) that enforce allergy rules, with a rule-based fallback when the model fails.',
        'Recommandations personnalisées par LLM local (Ollama, Qwen 2.5) appliquant les règles d’allergie, avec repli sur règles en cas d’échec du modèle.',
      ),
      l(
        'Demand and ingredient forecasting with scikit-learn, and review summaries generated by the local model with the exact prompts shown to staff.',
        'Prévision de la demande et des ingrédients avec scikit-learn, et synthèse des avis par le modèle local avec les prompts exacts visibles par le personnel.',
      ),
      l(
        'Validated every model output before display, handled timeouts and missing models, and reached 94% coverage with 86 pytest tests; 30-page technical report.',
        'Validation de chaque sortie du modèle, gestion des délais et des modèles absents, 94 % de couverture avec 86 tests pytest ; rapport technique de 30 pages.',
      ),
    ],
    scope: l(
      'AI for Software Engineering course project · ESPRIT · 2026',
      'Projet du module IA pour le génie logiciel · ESPRIT · 2026',
    ),
  },
  {
    id: 'aletheia',
    number: '04',
    name: 'Aletheia',
    year: '2025–26',
    size: 'minor',
    context: l('Microservices · ESPRIT', 'Microservices · ESPRIT'),
    subtitle: l('A connected space for learning.', 'Un espace connecté pour apprendre.'),
    type: l('LEARNING & CERTIFICATION', 'FORMATION & CERTIFICATION'),
    description: l(
      'A microservices platform for training and certification. I built the digital library: catalogue, stock, cart, orders and receipts.',
      'Une plateforme microservices de formation et de certification. J’ai développé la bibliothèque numérique : catalogue, stock, panier, commandes et reçus.',
    ),
    categories: ['Full-stack'],
    tags: ['Spring Boot', 'Angular', 'MySQL', 'Gateway · Eureka', 'Docker'],
    highlights: [],
    challenge: l(
      'Training involves more than courses. Learning materials, a shop, stock and orders have to work together while each service keeps a clear responsibility.',
      'La formation ne se limite pas aux cours. Supports, boutique, stock et commandes doivent fonctionner ensemble, tout en gardant des services aux responsabilités claires.',
    ),
    contributions: [
      l(
        'Built the library service: catalogue, search, filters and pagination, with REST APIs and an Angular interface.',
        'Développement du service bibliothèque : catalogue, recherche, filtres et pagination, avec API REST et interface Angular.',
      ),
      l(
        'Implemented stock management and thresholds, cart, orders, simulated payment and receipts.',
        'Gestion des stocks et des seuils, panier, commandes, paiement simulé et reçus.',
      ),
      l(
        'Integrated the service behind Spring Cloud Gateway and Eureka, containerised with Docker.',
        'Intégration derrière Spring Cloud Gateway et Eureka, conteneurisation avec Docker.',
      ),
    ],
    scope: l('Integrated project · ESPRIT · 2025–26', 'Projet intégré · ESPRIT · 2025–26'),
  },
  {
    id: 'polars',
    number: '05',
    name: 'Polars & Qdrant',
    year: '2024',
    size: 'minor',
    context: l('Licence final project · ISSAT', 'PFE de licence · ISSAT'),
    subtitle: l('Analytics at the speed of Rust.', 'L’analytique à la vitesse de Rust.'),
    type: l('RUST · ANALYTICAL & VECTOR DATABASES', 'RUST · BASES ANALYTIQUES & VECTORIELLES'),
    description: l(
      'Benchmarked Polars (Rust/Python) against PostgreSQL on 67 million rows, and built semantic, image and recommendation search with Qdrant.',
      'Comparaison de Polars (Rust/Python) et PostgreSQL sur 67 millions de lignes, et recherche sémantique, d’images et de recommandations avec Qdrant.',
    ),
    categories: ['Applied AI', 'Data & DevOps'],
    tags: ['Rust', 'Python', 'Polars', 'PostgreSQL', 'Qdrant', 'CLIP'],
    highlights: [],
    challenge: l(
      'Row-oriented databases slow down on large analytical queries, and keyword search cannot find “similar” images. How much do columnar and vector databases really change?',
      'Les bases orientées lignes ralentissent sur les grosses requêtes analytiques, et la recherche par mots-clés ne trouve pas d’images « similaires ». Que changent vraiment les bases colonnes et vectorielles ?',
    ),
    contributions: [
      l(
        'Compared Polars in Rust and Python with PostgreSQL 16 on a 9 GB e-commerce dataset (67M rows): import, aggregations, filters, group-bys and exports.',
        'Comparaison de Polars en Rust et Python avec PostgreSQL 16 sur un jeu de données e-commerce de 9 Go (67 M lignes) : import, agrégations, filtres, regroupements et exports.',
      ),
      l(
        'Measured Polars up to several times faster on analytical queries — for example 3.7 s versus 15.6 s for a filtered product sum.',
        'Polars mesuré jusqu’à plusieurs fois plus rapide sur les requêtes analytiques — par exemple 3,7 s contre 15,6 s pour une somme filtrée par produit.',
      ),
      l(
        'Built a semantic news search, an image similarity search over 6,000+ photos with CLIP embeddings, and a movie recommender with Qdrant in Docker.',
        'Développement d’une recherche sémantique d’actualités, d’une recherche d’images similaires sur plus de 6 000 photos avec CLIP, et d’un système de recommandation de films avec Qdrant sous Docker.',
      ),
    ],
    scope: l(
      'Licence final-year project (PFE) · ISSAT Kasserine · defended June 2024',
      'Projet de fin d’études de licence · ISSAT Kasserine · soutenu en juin 2024',
    ),
  },
  {
    id: 'bledismart',
    number: '06',
    name: 'BlediSmart',
    year: '2024',
    size: 'minor',
    context: l('Desktop & web · ESPRIT', 'Desktop & web · ESPRIT'),
    subtitle: l('Less paperwork. More possibility.', 'Moins de paperasse. Plus de possibilités.'),
    type: l('DIGITAL MUNICIPAL SERVICES', 'SERVICES MUNICIPAUX NUMÉRIQUES'),
    description: l(
      'Document workflows that bring municipal services together across a JavaFX desktop app and a Symfony web platform.',
      'Des workflows documentaires qui relient les services municipaux entre une application JavaFX et une plateforme web Symfony.',
    ),
    categories: ['Full-stack'],
    tags: ['JavaFX', 'Symfony', 'MySQL', 'REST APIs'],
    highlights: [],
    challenge: l(
      'Municipal documents need a clear path from storage to access, and that path should feel the same on the desktop and on the web.',
      'Les documents municipaux nécessitent un parcours clair, du stockage à l’accès, identique sur desktop et sur le web.',
    ),
    contributions: [
      l(
        'Designed and implemented the document management workflow.',
        'Conception et implémentation du workflow de gestion documentaire.',
      ),
      l(
        'Built file browsing for the JavaFX application and the Symfony web platform.',
        'Développement de la navigation de fichiers pour l’application JavaFX et la plateforme web Symfony.',
      ),
      l(
        'Organised document storage, access and the APIs between components.',
        'Organisation du stockage, des accès et des API entre composants.',
      ),
    ],
    scope: l('Integrated project · ESPRIT · 2024', 'Projet intégré · ESPRIT · 2024'),
  },
];

/* ------------------------------------------------------------------ */
/* Experience & education                                              */
/* ------------------------------------------------------------------ */
export const EXPERIENCE: TimelineItem[] = [
  {
    period: l('Jul – Aug 2026', 'Juil. – août 2026'),
    place: 'ReaddlyTech',
    role: l('Software engineering intern', 'Stagiaire en génie logiciel'),
    detail: l(
      'Built e-Biessa, an AI-powered car-parts marketplace: Spring Boot, Angular, Qdrant search, a fine-tuned local LLM, CI/CD and monitoring.',
      'Développement d’e-Biessa, marketplace de pièces automobiles avec IA : Spring Boot, Angular, recherche Qdrant, LLM local adapté, CI/CD et supervision.',
    ),
  },
  {
    period: l('Aug – Sep 2025', 'Août – sept. 2025'),
    place: 'Tunisie Telecom · Actel Sbeitla',
    role: l('Initiation internship & field work', 'Stage d’initiation & travaux terrain'),
    detail: l(
      'Fixed-line installation and maintenance along the subscriber chain, and fault diagnosis: short circuits, insulation faults, water infiltration, interference.',
      'Installation et maintenance de lignes fixes sur la chaîne de raccordement abonné, et diagnostic de pannes : courts-circuits, défauts d’isolement, infiltrations, perturbations.',
    ),
  },
  {
    period: l('Jun 2024 – Apr 2025', 'Juin 2024 – avr. 2025'),
    place: 'Veeva',
    role: l('Data verification specialist', 'Spécialiste en vérification de données'),
    meta: l('Remote', 'À distance'),
    detail: l(
      'Verified professional records with healthcare institutions and kept CRM data accurate.',
      'Vérification des informations professionnelles auprès d’établissements de santé et mise à jour rigoureuse des données CRM.',
    ),
  },
];

export const EDUCATION: TimelineItem[] = [
  {
    period: l('2024 – present', '2024 – aujourd’hui'),
    place: 'ESPRIT · Tunis',
    role: l('Engineering degree, software engineering', 'Cycle ingénieur, génie informatique'),
    detail: l(
      'Final year. Coursework in software architecture, mobile development, AI for software engineering, cloud and DevOps.',
      'Dernière année. Architecture logicielle, développement mobile, IA pour le génie logiciel, cloud et DevOps.',
    ),
  },
  {
    period: '2021 – 2024',
    place: 'ISSAT Kasserine',
    role: l('Licence in computer science', 'Licence en sciences informatiques'),
    detail: l(
      'Software engineering and information systems. Final project on Rust analytical and vector databases (Polars & Qdrant).',
      'Génie logiciel et systèmes d’information. PFE sur les bases de données analytiques et vectorielles en Rust (Polars & Qdrant).',
    ),
  },
];
