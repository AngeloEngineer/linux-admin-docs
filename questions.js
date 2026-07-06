window.questionBank = {
  chapters: [
    {
      id: "ch1",
      title: "Introduction aux syst\u00e8mes d'exploitation",
      questions: [
        {
          id: "q-ch1-01",
          type: "qcm",
          level: "debutant",
          chapter: "ch1",
          question: "Qu'est-ce qu'un syst\u00e8me d'exploitation ?",
          options: [
            { text: "Un ensemble de programmes qui g\u00e8re les ressources mat\u00e9rielles et logicielles d'un ordinateur", correct: true },
            { text: "Un navigateur web permettant de surfer sur Internet", correct: false },
            { text: "Une interface entre l'utilisateur et le mat\u00e9riel", correct: true },
            { text: "Un logiciel de traitement de texte", correct: false }
          ],
          explanation: "Un SE est un ensemble de programmes qui fait office d'interm\u00e9diaire entre l'utilisateur et le mat\u00e9riel, en g\u00e9rant les ressources (m\u00e9moire, CPU, p\u00e9riph\u00e9riques) et en fournissant des services aux applications.",
          commonMistake: "Confondre le SE avec une application particuli\u00e8re comme un navigateur ou un traitement de texte.",
          keyTakeaway: "Le SE est le chef d'orchestre qui g\u00e8re toutes les ressources du syst\u00e8me.",
          reviewChapter: "ch1-s1"
        },
        {
          id: "q-ch1-02",
          type: "vraifaux",
          level: "debutant",
          chapter: "ch1",
          question: "Le mode noyau (kernel mode) permet d'ex\u00e9cuter des instructions privil\u00e9gi\u00e9es et d'acc\u00e9der \u00e0 l'ensemble de la m\u00e9moire.",
          correct: true,
          explanation: "Le mode noyau est le mode le plus privil\u00e9gi\u00e9 du processeur. Le noyau du SE y a acc\u00e8s \u00e0 toutes les instructions et \u00e0 toute la m\u00e9moire, contrairement au mode utilisateur qui est restreint.",
          reviewChapter: "ch1-s3"
        },
        {
          id: "q-ch1-03",
          type: "ouverte",
          level: "intermediaire",
          chapter: "ch1",
          question: "Qu'est-ce qu'un appel syst\u00e8me (system call) et quel est son r\u00f4le ?",
          answer: "Un appel syst\u00e8me est une fonction fournie par le noyau qu'un programme en mode utilisateur peut invoquer pour demander un service privil\u00e9gi\u00e9 (lecture de fichier, cr\u00e9ation de processus, allocation m\u00e9moire). C'est l'interface de programmation entre les applications et le noyau. Exemples : open(), read(), write(), fork(), exec().",
          commonMistake: "Croire qu'un programme peut acc\u00e9der directement au mat\u00e9riel sans passer par le noyau.",
          keyTakeaway: "Les appels syst\u00e8me sont la seule fa\u00e7on pour un programme en mode utilisateur d'obtenir des services du noyau.",
          reviewChapter: "ch1-s4"
        },
        {
          id: "q-ch1-04",
          type: "commande",
          level: "debutant",
          chapter: "ch1",
          question: "Quelle commande permet d'afficher le nom du r\u00e9pertoire courant ?",
          answer: "pwd",
          explanation: "La commande pwd (Print Working Directory) affiche le chemin absolu du r\u00e9pertoire dans lequel l'utilisateur se trouve actuellement.",
          reviewChapter: "ch1-s6"
        },
        {
          id: "q-ch1-05",
          type: "pratique",
          level: "intermediaire",
          chapter: "ch1",
          question: "Vous devez lister tous les fichiers d'un r\u00e9pertoire dont le nom contient 'conf', en affichant les d\u00e9tails (permissions, taille, date). Quelle commande utilisez-vous ?",
          answer: "ls -la | grep conf ou ls -la *conf*",
          reviewChapter: "ch1-s6"
        },
        {
          id: "q-ch1-06",
          type: "erreur",
          level: "avance",
          chapter: "ch1",
          question: "Quelle est l'erreur dans la commande suivante ?",
          code: "cd /etc/httpd/conf/httpd.conf",
          answer: "La commande cd (change directory) sert \u00e0 se d\u00e9placer dans un r\u00e9pertoire, pas \u00e0 ouvrir un fichier. httpd.conf est un fichier, pas un r\u00e9pertoire. Il faut utiliser cd /etc/httpd/conf/ pour se d\u00e9placer dans le r\u00e9pertoire, puis utiliser less, cat ou vim pour lire le fichier.",
          reviewChapter: "ch1-s6"
        },
        {
          id: "q-ch1-07",
          type: "interpretation",
          level: "debutant",
          chapter: "ch1",
          question: "Interpr\u00e9tez le r\u00e9sultat de cette commande :",
          output: "$ ls -la\n-rw-r--r--  1 root root  1234 Jan 15 10:30 fichier.txt\ndrwxr-xr-x  2 root root  4096 Jan 15 10:31 dossier/",
          answer: "Le r\u00e9pertoire contient deux entr\u00e9es : un fichier ordinaire 'fichier.txt' de 1234 octets et un sous-r\u00e9pertoire 'dossier/'. Les permissions du fichier sont rw- (lecture/ccriture pour le propri\u00e9taire), r-- (lecture pour le groupe), r-- (lecture pour les autres). Le dossier a les permissions rwx (propri\u00e9taire), r-x (groupe), r-x (autres). Le propri\u00e9taire est root et le groupe est root.",
          reviewChapter: "ch1-s6"
        },
        {
          id: "q-ch1-08",
          type: "qcm",
          level: "intermediaire",
          chapter: "ch1",
          question: "Quelles sont les caract\u00e9ristiques du projet GNU ?",
          options: [
            { text: "Cr\u00e9\u00e9 par Richard Stallman en 1983", correct: true },
            { text: "Un syst\u00e8me d'exploitation propri\u00e9taire de Microsoft", correct: false },
            { text: "Bas\u00e9 sur le principe du logiciel libre (GPL)", correct: true },
            { text: "D\u00e9velopp\u00e9 uniquement par des entreprises priv\u00e9es", correct: false }
          ],
          explanation: "Le projet GNU a \u00e9t\u00e9 lanc\u00e9 par Richard Stallman en 1983 pour cr\u00e9er un syst\u00e8me d'exploitation libre. Il a produit les outils GNU (gcc, bash, coreutils) sous licence GPL.",
          commonMistake: "Penser que GNU/Linux a \u00e9t\u00e9 cr\u00e9\u00e9 par une seule personne ou entreprise.",
          keyTakeaway: "Linux est le noyau, GNU fournit les outils ; le syst\u00e8me complet est GNU/Linux.",
          reviewChapter: "ch1-s5"
        },
        {
          id: "q-ch1-09",
          type: "vraifaux",
          level: "debutant",
          chapter: "ch1",
          question: "Le noyau Linux a \u00e9t\u00e9 cr\u00e9\u00e9 par Linus Torvalds en 1991.",
          correct: true,
          explanation: "Linus Torvalds, alors \u00e9tudiant \u00e0 l'Universit\u00e9 d'Helsinki, a cr\u00e9\u00e9 le noyau Linux en 1991 comme projet personnel, initialement inspir\u00e9 par Minix.",
          reviewChapter: "ch1-s5"
        },
        {
          id: "q-ch1-10",
          type: "commande",
          level: "debutant",
          chapter: "ch1",
          question: "Quelle commande permet de rechercher un fichier nomm\u00e9 'passwd' \u00e0 partir de la racine ?",
          answer: "find / -name passwd",
          explanation: "find / -name passwd parcourt l'ensemble de l'arborescence \u00e0 partir de la racine (/) pour trouver les fichiers nomm\u00e9s 'passwd'.",
          reviewChapter: "ch1-s6"
        }
      ]
    },
    {
      id: "ch2",
      title: "Gestion des utilisateurs",
      questions: [
        {
          id: "q-ch2-01",
          type: "qcm",
          level: "debutant",
          chapter: "ch2",
          question: "Quels sont les champs du fichier /etc/passwd ?",
          options: [
            { text: "login:password:UID:GID:comment:home:shell", correct: false },
            { text: "login:password:UID:GID:GECOS:home:shell", correct: true },
            { text: "login:password:UID:GID:comment:shell:home", correct: false },
            { text: "login:x:UID:GID:GECOS:r\u00e9pertoire personnel:shell", correct: true }
          ],
          explanation: "/etc/passwd contient 7 champs s\u00e9par\u00e9s par des deux-points : nom login, mot de passe (g\u00e9n\u00e9ralement x), UID, GID, champ GECOS (commentaire), r\u00e9pertoire personnel, et shell de connexion.",
          commonMistake: "Confondre l'ordre des champs, notamment GECOS et home, ou croire que le mot de passe est stock\u00e9 dans ce fichier.",
          keyTakeaway: "Le mot de passe n'est plus dans /etc/passwd mais dans /etc/shadow (d'o\u00f9 le 'x').",
          reviewChapter: "ch2-s2"
        },
        {
          id: "q-ch2-02",
          type: "vraifaux",
          level: "debutant",
          chapter: "ch2",
          question: "La commande useradd cr\u00e9e automatiquement un r\u00e9pertoire home pour l'utilisateur si l'option -m est utilis\u00e9e.",
          correct: true,
          explanation: "Par d\u00e9faut selon la configuration, useradd peut ne pas cr\u00e9er le home. L'option -m force la cr\u00e9ation du r\u00e9pertoire home avec copie des fichiers de squelette depuis /etc/skel.",
          reviewChapter: "ch2-s1"
        },
        {
          id: "q-ch2-03",
          type: "ouverte",
          level: "intermediaire",
          chapter: "ch2",
          question: "Expliquez la structure et le r\u00f4le du fichier /etc/shadow.",
          answer: "/etc/shadow stocke les mots de passe chiffr\u00e9s et les informations de vieillissement des mots de passe. Champs s\u00e9par\u00e9s par ':' : login, mot de passe chiffr\u00e9 (algorithme $type$sel$hash), date du dernier changement (en jours depuis 01/01/1970), nombre de jours avant modification autoris\u00e9e, nombre de jours apr\u00e8s changement obligatoire, jours d'avertissement avant expiration, jours de gr\u00e2ce apr\u00e8s expiration, date d'expiration du compte, champ r\u00e9serv\u00e9. Seul root peut lire ce fichier.",
          commonMistake: "Croire que /etc/shadow est directement lisible par tous les utilisateurs.",
          keyTakeaway: "/etc/shadow est prot\u00e9g\u00e9 en lecture (root seulement) contrairement \u00e0 /etc/passwd qui est lisible par tous.",
          reviewChapter: "ch2-s3"
        },
        {
          id: "q-ch2-04",
          type: "commande",
          level: "debutant",
          chapter: "ch2",
          question: "Quelle commande utilise-t-on pour d\u00e9finir ou modifier le mot de passe d'un utilisateur ?",
          answer: "passwd nom_utilisateur",
          explanation: "La commande passwd permet de d\u00e9finir ou modifier le mot de passe d'un utilisateur. root peut changer le mot de passe de n'importe quel utilisateur, un utilisateur normal ne peut changer que son propre mot de passe.",
          reviewChapter: "ch2-s1"
        },
        {
          id: "q-ch2-05",
          type: "pratique",
          level: "intermediaire",
          chapter: "ch2",
          question: "Vous devez cr\u00e9er un utilisateur 'techuser' avec un UID sp\u00e9cifique (1500), un r\u00e9pertoire home dans /opt/techuser, un shell bash, et l'ajouter aux groupes 'tech' et 'developers'. \u00c9crivez la commande compl\u00e8te.",
          answer: "useradd -u 1500 -d /opt/techuser -s /bin/bash -G tech,developers techuser",
          reviewChapter: "ch2-s1"
        },
        {
          id: "q-ch2-06",
          type: "erreur",
          level: "avance",
          chapter: "ch2",
          question: "Que contient l'erreur dans cette commande ?",
          code: "usermod -l nouveau_nom -u 2000 -d /home/nouveau -m ancien_utilisateur",
          answer: "Cette commande est correcte dans sa syntaxe. usermod -l change le login, -u change l'UID, -d change le r\u00e9pertoire home, et -m d\u00e9place le contenu de l'ancien home vers le nouveau. L'ordre des options n'a pas d'importance.",
          reviewChapter: "ch2-s5"
        },
        {
          id: "q-ch2-07",
          type: "interpretation",
          level: "intermediaire",
          chapter: "ch2",
          question: "Interpr\u00e9tez le r\u00e9sultat de cette commande :",
          output: "$ id alice\nuid=1001(alice) gid=1001(alice) groupes=1001(alice),1002(projet),1003(dev)",
          answer: "L'utilisateur 'alice' a l'UID 1001, son groupe principal (GID) est 1001 (alice). Elle appartient \u00e9galement aux groupes secondaires 'projet' (GID 1002) et 'dev' (GID 1003). Les groupes secondaires sont s\u00e9par\u00e9s par des virgules apr\u00e8s 'groupes='.",
          commonMistake: "Confondre le premier groupe (gid=) avec un groupe secondaire.",
          keyTakeaway: "Le premier groupe est le groupe primaire, les suivants sont les groupes secondaires.",
          reviewChapter: "ch2-s8"
        },
        {
          id: "q-ch2-08",
          type: "qcm",
          level: "debutant",
          chapter: "ch2",
          question: "Quels sont les r\u00f4les des groupes secondaires ?",
          options: [
            { text: "D\u00e9finir le groupe par d\u00e9faut des fichiers cr\u00e9\u00e9s", correct: false },
            { text: "Donner des permissions suppl\u00e9mentaires \u00e0 l'utilisateur sur des fichiers", correct: true },
            { text: "Permettre le partage de fichiers entre membres d'un m\u00eame groupe", correct: true },
            { text: "Modifier l'UID de l'utilisateur", correct: false }
          ],
          explanation: "Les groupes secondaires permettent d'accorder des droits d'acc\u00e8s suppl\u00e9mentaires et facilitent le partage de fichiers entre utilisateurs. Le groupe primaire d\u00e9finit le groupe propri\u00e9taire des fichiers cr\u00e9\u00e9s.",
          commonMistake: "Penser que tous les groupes ont le m\u00eame r\u00f4le que le groupe primaire.",
          keyTakeaway: "Un utilisateur a un groupe primaire et peut appartenir \u00e0 plusieurs groupes secondaires.",
          reviewChapter: "ch2-s8"
        },
        {
          id: "q-ch2-09",
          type: "commande",
          level: "intermediaire",
          chapter: "ch2",
          question: "Quelle commande permet de modifier le commentaire (champ GECOS) d'un utilisateur ?",
          answer: "chfn nom_utilisateur",
          explanation: "chfn (CHange Full Name) permet de modifier le champ GECOS de /etc/passwd contenant le nom complet et les coordonn\u00e9es de l'utilisateur.",
          reviewChapter: "ch2-s5"
        },
        {
          id: "q-ch2-10",
          type: "vraifaux",
          level: "avance",
          chapter: "ch2",
          question: "La commande userdel -r supprime l'utilisateur, son r\u00e9pertoire home et sa bo\u00eete aux lettres.",
          correct: true,
          explanation: "L'option -r de userdel supprime le r\u00e9pertoire home et la bo\u00eete aux lettres (/var/spool/mail/utilisateur) en plus de supprimer le compte utilisateur.",
          reviewChapter: "ch2-s5"
        }
      ]
    },
    {
      id: "ch3",
      title: "Gestion des fichiers",
      questions: [
        {
          id: "q-ch3-01",
          type: "qcm",
          level: "debutant",
          chapter: "ch3",
          question: "Que contient le r\u00e9pertoire /etc ?",
          options: [
            { text: "Les fichiers de configuration du syst\u00e8me", correct: true },
            { text: "Les binaires ex\u00e9cutables des commandes essentielles", correct: false },
            { text: "Les fichiers de p\u00e9riph\u00e9riques", correct: false },
            { text: "Les fichiers de configuration des services et applications", correct: true }
          ],
          explanation: "/etc contient les fichiers de configuration du syst\u00e8me et des services (passwd, shadow, fstab, ssh_config, httpd.conf, etc.). Les binaires sont dans /bin ou /usr/bin ; les p\u00e9riph\u00e9riques sont dans /dev.",
          commonMistake: "Confondre /etc avec /bin ou /dev.",
          keyTakeaway: "/etc = configuration, /bin = binaires, /dev = p\u00e9riph\u00e9riques.",
          reviewChapter: "ch3-s1"
        },
        {
          id: "q-ch3-02",
          type: "vraifaux",
          level: "debutant",
          chapter: "ch3",
          question: "Le bit SUID (Set User ID) permet \u00e0 un utilisateur d'ex\u00e9cuter un fichier avec les droits du propri\u00e9taire du fichier.",
          correct: true,
          explanation: "Le SUID (valeur 4000 en octal) permet \u00e0 un utilisateur d'ex\u00e9cuter un programme avec les privil\u00e8ges du propri\u00e9taire du fichier (souvent root). Exemple typique : /usr/bin/passwd qui a le SUID root pour permettre aux utilisateurs de modifier leur mot de passe dans /etc/shadow.",
          reviewChapter: "ch3-s6"
        },
        {
          id: "q-ch3-03",
          type: "ouverte",
          level: "intermediaire",
          chapter: "ch3",
          question: "Expliquez le fonctionnement de l'umask et comment calculer les permissions r\u00e9sultantes pour un fichier et un r\u00e9pertoire.",
          answer: "L'umask est un masque qui soustrait des permissions maximales. Pour un fichier, les permissions maximales sont 666 (rw-rw-rw-) ; pour un r\u00e9pertoire, 777 (rwxrwxrwx). La valeur umask (ex: 022) est soustraite : fichier = 666 - 022 = 644 (rw-r--r--), r\u00e9pertoire = 777 - 022 = 755 (rwxr-xr-x). On peut aussi voir l'umask comme un masque de bits \u00e0 retirer.",
          commonMistake: "Oublier que les fichiers n'ont pas le bit x par d\u00e9faut et appliquer 777 - umask alors que c'est 666 - umask.",
          keyTakeaway: "Umask 022 donne fichiers en 644 et r\u00e9pertoires en 755.",
          reviewChapter: "ch3-s5"
        },
        {
          id: "q-ch3-04",
          type: "commande",
          level: "debutant",
          chapter: "ch3",
          question: "Quelle commande permet de changer le propri\u00e9taire d'un fichier ?",
          answer: "chown nouvel_utilisateur fichier",
          explanation: "chown (CHange OWNer) modifie le propri\u00e9taire d'un fichier. Syntaxe : chown utilisateur[:groupe] fichier. Seul root peut changer le propri\u00e9taire.",
          reviewChapter: "ch3-s4"
        },
        {
          id: "q-ch3-05",
          type: "pratique",
          level: "intermediaire",
          chapter: "ch3",
          question: "Vous devez partager un dossier /home/projets entre les membres du groupe 'projets'. Tous les nouveaux fichiers cr\u00e9\u00e9s dans ce dossier doivent h\u00e9riter du groupe 'projets'. Quelles commandes ex\u00e9cutez-vous ?",
          answer: "chgrp projets /home/projets && chmod g+s /home/projets (ou chmod 2775 /home/projets). Le SGID (2000) fait que les fichiers cr\u00e9\u00e9s dans le r\u00e9pertoire h\u00e9ritent du groupe du r\u00e9pertoire.",
          reviewChapter: "ch3-s6"
        },
        {
          id: "q-ch3-06",
          type: "erreur",
          level: "avance",
          chapter: "ch3",
          question: "Quelle est l'erreur dans cette commande ?",
          code: "chmod 777 fichier.txt && chown user:group fichier.txt",
          answer: "Il n'y a pas d'erreur syntaxique, mais chmod 777 donne tous les droits \u00e0 tout le monde (lecture, \u00e9criture, ex\u00e9cution), ce qui est une mauvaise pratique de s\u00e9curit\u00e9. Il faudrait utiliser des permissions plus restrictives (ex: 755 pour un ex\u00e9cutable, 644 pour un fichier standard). De plus, seul root peut utiliser chown pour changer le propri\u00e9taire.",
          reviewChapter: "ch3-s4"
        },
        {
          id: "q-ch3-07",
          type: "interpretation",
          level: "debutant",
          chapter: "ch3",
          question: "Interpr\u00e9tez les permissions suivantes :",
          output: "drwxr-sr-x  2 alice  proj  4096 Jan 15 10:30 dossier/\n-rwsr-xr-x  1 root   root  34000 Jan 15 10:31 programme",
          answer: "Le dossier a le bit SGID (s dans la position groupe-x), ce qui fait que les fichiers cr\u00e9\u00e9s \u00e0 l'int\u00e9rieur h\u00e9riteront du groupe 'proj'. Le fichier 'programme' a le bit SUID (s dans la position propri\u00e9taire-x) : ex\u00e9cut\u00e9 par un utilisateur normal, il s'ex\u00e9cutera avec les droits de root.",
          reviewChapter: "ch3-s6"
        },
        {
          id: "q-ch3-08",
          type: "qcm",
          level: "intermediaire",
          chapter: "ch3",
          question: "Quels sont les types de fichiers sous Linux ?",
          options: [
            { text: "- (fichier ordinaire)", correct: true },
            { text: "d (r\u00e9pertoire)", correct: true },
            { text: "l (lien symbolique)", correct: true },
            { text: "p (pipe nomm\u00e9)", correct: true },
            { text: "e (fichier ex\u00e9cutable)", correct: false },
            { text: "b (p\u00e9riph\u00e9rique bloc)", correct: true },
            { text: "c (p\u00e9riph\u00e9rique caract\u00e8re)", correct: true },
            { text: "s (socket)", correct: true }
          ],
          explanation: "Les types de fichiers Linux sont : - (fichier ordinaire), d (r\u00e9pertoire), l (lien symbolique), b (p\u00e9riph\u00e9rique bloc), c (p\u00e9riph\u00e9rique caract\u00e8re), p (pipe nomm\u00e9/FIFO), s (socket). Il n'existe pas de type 'e'.",
          commonMistake: "Penser que les extensions (.exe, .txt) d\u00e9terminent le type de fichier sous Linux.",
          keyTakeaway: "Sous Linux, le type est indiqu\u00e9 par le premier caract\u00e8re des permissions (ls -l).",
          reviewChapter: "ch3-s2"
        },
        {
          id: "q-ch3-09",
          type: "commande",
          level: "debutant",
          chapter: "ch3",
          question: "Quelle commande permet de changer r\u00e9cursivement le groupe propri\u00e9taire d'un r\u00e9pertoire et de tout son contenu ?",
          answer: "chgrp -R groupe repertoire/",
          explanation: "chgrp -R (r\u00e9cursif) change le groupe de tous les fichiers et sous-r\u00e9pertoires contenus dans le r\u00e9pertoire sp\u00e9cifi\u00e9.",
          reviewChapter: "ch3-s4"
        },
        {
          id: "q-ch3-10",
          type: "vraifaux",
          level: "avance",
          chapter: "ch3",
          question: "Le sticky bit (valeur 1000) sur un r\u00e9pertoire comme /tmp permet \u00e0 tout utilisateur de cr\u00e9er des fichiers, mais seul le propri\u00e9taire du fichier ou root peut supprimer un fichier.",
          correct: true,
          explanation: "Le sticky bit (ou 'restricted deletion flag') sur /tmp (permissions 1777) emp\u00eache un utilisateur de supprimer les fichiers d'un autre utilisateur m\u00eame si le r\u00e9pertoire est en \u00e9criture pour tous.",
          reviewChapter: "ch3-s6"
        }
      ]
    },
    {
      id: "ch4",
      title: "Travail avec les shells",
      questions: [
        {
          id: "q-ch4-01",
          type: "qcm",
          level: "debutant",
          chapter: "ch4",
          question: "Quelles sont les redirections valides sous bash ?",
          options: [
            { text: "< : rediriger l'entr\u00e9e standard depuis un fichier", correct: true },
            { text: "> : rediriger la sortie standard vers un fichier (\u00e9crasement)", correct: true },
            { text: ">> : rediriger la sortie standard vers un fichier (ajout)", correct: true },
            { text: "<< : rediriger l'entr\u00e9e standard depuis le clavier (heredoc)", correct: true },
            { text: "2> : rediriger la sortie d'erreur", correct: true },
            { text: "2>&1 : rediriger la sortie d'erreur vers la sortie standard", correct: true },
            { text: ">>> : rediriger en triple", correct: false }
          ],
          explanation: "Les redirections bash sont : < (entr\u00e9e), > (sortie avec \u00e9crasement), >> (sortie avec ajout), 2> (erreur), 2>&1 (erreur vers sortie), << (heredoc). >>> n'existe pas.",
          commonMistake: "Confondre > et >> ou oublier que 2>&1 doit \u00eatre plac\u00e9 apr\u00e8s la redirection de sortie.",
          keyTakeaway: "Les chiffres 0=entr\u00e9e, 1=sortie, 2=erreur sont les descripteurs de fichiers.",
          reviewChapter: "ch4-s3"
        },
        {
          id: "q-ch4-02",
          type: "vraifaux",
          level: "debutant",
          chapter: "ch4",
          question: "Le fichier .bashrc est ex\u00e9cut\u00e9 \u00e0 chaque ouverture d'un shell non interactif.",
          correct: false,
          explanation: ".bashrc est ex\u00e9cut\u00e9 pour les shells interactifs non login. Pour les shells de connexion, c'est .bash_profile (ou .profile) qui est ex\u00e9cut\u00e9. Les shells non interactifs (scripts) n'ex\u00e9cutent pas ces fichiers.",
          reviewChapter: "ch4-s1"
        },
        {
          id: "q-ch4-03",
          type: "ouverte",
          level: "intermediaire",
          chapter: "ch4",
          question: "Expliquez la diff\u00e9rence entre les substitutions $(commande) et `commande` en bash.",
          answer: "Les deux formes ex\u00e9cutent une commande et retournent le r\u00e9sultat comme cha\u00eene de caract\u00e8res. $(...) est la forme moderne recommand\u00e9e : elle est plus lisible, permet l'imbrication facile ($(cmd1 $(cmd2))), et \u00e9vite les probl\u00e8mes d'\u00e9chappement avec les antislashs. La forme avec backticks (`...`) est l'ancienne syntaxe h\u00e9rit\u00e9e du shell Bourne.",
          commonMistake: "Utiliser les backticks dans des scripts modernes, ce qui rend le code moins lisible.",
          keyTakeaway: "Toujours pr\u00e9f\u00e9rer $(commande) \u00e0 `commande`.",
          reviewChapter: "ch4-s4"
        },
        {
          id: "q-ch4-04",
          type: "commande",
          level: "debutant",
          chapter: "ch4",
          question: "Quelle commande permet de compter le nombre de fichiers dans un r\u00e9pertoire en utilisant un pipe ?",
          answer: "ls -1 | wc -l",
          explanation: "ls -1 liste les fichiers un par ligne, le pipe | passe la sortie \u00e0 wc -l qui compte le nombre de lignes.",
          reviewChapter: "ch4-s4"
        },
        {
          id: "q-ch4-05",
          type: "pratique",
          level: "avance",
          chapter: "ch4",
          question: "\u00c9crivez un script bash qui prend un nom de r\u00e9pertoire en param\u00e8tre, v\u00e9rifie s'il existe, et affiche le nombre de fichiers et de sous-r\u00e9pertoires qu'il contient.",
          answer: "#!/bin/bash\nif [ -d \"$1\" ]; then\n  fichiers=$(find \"$1\" -maxdepth 1 -type f | wc -l)\n  dossiers=$(find \"$1\" -maxdepth 1 -type d | wc -l)\n  dossiers=$((dossiers - 1)) # soustrait le r\u00e9pertoire lui-m\u00eame\n  echo \"Fichiers: $fichiers\"\n  echo \"R\u00e9pertoires: $dossiers\"\nelse\n  echo \"Erreur: le r\u00e9pertoire $1 n'existe pas\"\n  exit 1\nfi",
          reviewChapter: "ch4-s6"
        },
        {
          id: "q-ch4-06",
          type: "erreur",
          level: "intermediaire",
          chapter: "ch4",
          question: "Quelle est l'erreur dans ce script ?",
          code: "#!/bin/bash\nif [ $USER = \"root\" ]\nthen\n  echo \"Utilisateur root\"\nfi",
          answer: "La condition if utilise des crochets simples [ ] qui n\u00e9cessitent des espaces autour des op\u00e9rateurs et des variables. Ici la variable $USER n'est pas entre guillemets, ce qui peut causer une erreur si elle est vide. La syntaxe correcte est : if [ \"$USER\" = \"root\" ]. De plus, le point-virgule apr\u00e9s la condition ou un retour \u00e0 la ligne avec 'then' sur la ligne suivante est correct.",
          reviewChapter: "ch4-s5"
        },
        {
          id: "q-ch4-07",
          type: "interpretation",
          level: "intermediaire",
          chapter: "ch4",
          question: "Quel sera le r\u00e9sultat de l'ex\u00e9cution de ce script ?",
          output: "#!/bin/bash\nfor i in 1 2 3\ndo\n  echo \"$i\"\ndone\necho \"Termin\u00e9\"",
          answer: "Le script affichera :\n1\n2\n3\nTermin\u00e9\nLa boucle for parcourt la liste des valeurs (1, 2, 3) et affiche chaque valeur. Apr\u00e8s la boucle, le script affiche 'Termin\u00e9'.",
          reviewChapter: "ch4-s5"
        },
        {
          id: "q-ch4-08",
          type: "qcm",
          level: "intermediaire",
          chapter: "ch4",
          question: "Quels sont les r\u00f4les de la variable PATH ?",
          options: [
            { text: "Contient la liste des r\u00e9pertoires o\u00f9 le shell cherche les commandes ex\u00e9cutables", correct: true },
            { text: "D\u00e9finit le r\u00e9pertoire personnel de l'utilisateur", correct: false },
            { text: "Les r\u00e9pertoires sont s\u00e9par\u00e9s par des deux-points (:)", correct: true },
            { text: "Permet d'ex\u00e9cuter une commande sans pr\u00e9ciser son chemin complet", correct: true }
          ],
          explanation: "PATH est une variable d'environnement qui contient les chemins des r\u00e9pertoires (s\u00e9par\u00e9s par :) dans lesquels le shell recherche les commandes. Exemple : /usr/local/bin:/usr/bin:/bin.",
          commonMistake: "Ajouter le r\u00e9pertoire courant (.) dans PATH pour des raisons de s\u00e9curit\u00e9.",
          keyTakeaway: "PATH \u00e9vite d'avoir \u00e0 taper le chemin complet \u00e0 chaque commande.",
          reviewChapter: "ch4-s2"
        },
        {
          id: "q-ch4-09",
          type: "commande",
          level: "avance",
          chapter: "ch4",
          question: "Quelle commande permet de cr\u00e9er un alias permanent pour que 'll' ex\u00e9cute 'ls -la' dans tous les futurs shells ?",
          answer: "echo \"alias ll='ls -la'\" >> ~/.bashrc",
          explanation: "Pour rendre un alias permanent, on ajoute la commande alias dans ~/.bashrc (ou ~/.bash_profile). Les alias d\u00e9finis directement en ligne de commande ne sont pas conserv\u00e9s entre les sessions.",
          reviewChapter: "ch4-s1"
        },
        {
          id: "q-ch4-10",
          type: "pratique",
          level: "avance",
          chapter: "ch4",
          question: "\u00c9crivez un script utilisant un case pour afficher un message selon le jour de la semaine (lundi au dimanche).",
          answer: "#!/bin/bash\njour=$(date +%A)\ncase $jour in\n  lundi) echo \"D\u00e9but de semaine\" ;;\n  mardi|mercredi|jeudi) echo \"En pleine semaine\" ;;\n  vendredi) echo \"Bient\u00f4t le week-end\" ;;\n  samedi|dimanche) echo \"Week-end !\" ;;\n  *) echo \"Jour inconnu\" ;;\nesac",
          reviewChapter: "ch4-s5"
        }
      ]
    },
    {
      id: "ch5",
      title: "Fonctionnement du syst\u00e8me",
      questions: [
        {
          id: "q-ch5-01",
          type: "qcm",
          level: "debutant",
          chapter: "ch5",
          question: "Quels sont les niveaux d'ex\u00e9cution (runlevels) standards sous Linux ?",
          options: [
            { text: "0 : arr\u00eat du syst\u00e8me", correct: true },
            { text: "1 : mode mono-utilisateur", correct: true },
            { text: "2 : mode multi-utilisateurs sans r\u00e9seau", correct: true },
            { text: "3 : mode multi-utilisateurs avec r\u00e9seau (console)", correct: true },
            { text: "4 : inutilis\u00e9 / personnalisable", correct: true },
            { text: "5 : mode graphique (X Window)", correct: true },
            { text: "6 : red\u00e9marrage", correct: true },
            { text: "7 : mode maintenance avanc\u00e9", correct: false }
          ],
          explanation: "Les runlevels standards sont : 0 (halt), 1 (mono-utilisateur), 2 (multi-utilisateurs sans r\u00e9seau), 3 (multi-utilisateurs avec r\u00e9seau), 4 (personnalisable), 5 (graphique), 6 (reboot). Il n'y a pas de niveau 7.",
          commonMistake: "Confondre les num\u00e9ros ou croire que le niveau 5 est le mode console.",
          keyTakeaway: "0=arr\u00eat, 1=mono, 2=sans r\u00e9seau, 3=r\u00e9seau, 5=graphique, 6=reboot.",
          reviewChapter: "ch5-s3"
        },
        {
          id: "q-ch5-02",
          type: "vraifaux",
          level: "debutant",
          chapter: "ch5",
          question: "La commande kill -9 envoie le signal SIGKILL qui termine un processus imm\u00e9diatement sans lui permettre de faire du m\u00e9nage.",
          correct: true,
          explanation: "SIGKILL (signal 9) ne peut pas \u00eatre ignor\u00e9 ou captur\u00e9 par le processus. Il force l'arr\u00eat imm\u00e9diat du processus par le noyau, sans lib\u00e9ration propre des ressources.",
          commonMistake: "Utiliser syst\u00e9matiquement kill -9 au lieu d'essayer d'abord kill -15 (SIGTERM) qui permet un arr\u00eat propre.",
          keyTakeaway: "Toujours essayer SIGTERM (15) d'abord, puis SIGKILL (9) en dernier recours.",
          reviewChapter: "ch5-s5"
        },
        {
          id: "q-ch5-03",
          type: "ouverte",
          level: "intermediaire",
          chapter: "ch5",
          question: "Expliquez le r\u00f4le du syst\u00e8me de fichiers /proc.",
          answer: "/proc est un syst\u00e8me de fichiers virtuel (procfs) qui fournit une interface avec le noyau. Chaque processus actif a un sous-r\u00e9pertoire num\u00e9rot\u00e9 par son PID contenant des informations : cmdline (commande), status (\u00e9tat, PID, PPID), fd/ (descripteurs de fichiers ouverts). Des fichiers sp\u00e9ciaux donnent des informations syst\u00e8me : cpuinfo, meminfo, partitions, uptime, version. /proc n'occupe pas d'espace disque car il est g\u00e9n\u00e9r\u00e9 en m\u00e9moire par le noyau.",
          commonMistake: "Penser que /proc est un r\u00e9pertoire normal dans lequel on peut \u00e9crire librement.",
          keyTakeaway: "/proc est une interface virtuelle avec le noyau, pas un vrai r\u00e9pertoire sur disque.",
          reviewChapter: "ch5-s6"
        },
        {
          id: "q-ch5-04",
          type: "commande",
          level: "debutant",
          chapter: "ch5",
          question: "Quelle commande permet d'afficher tous les processus en cours avec leur hi\u00e9rarchie ?",
          answer: "ps auxf",
          explanation: "ps auxf affiche tous les processus (a=autres utilisateurs, u=format utilisateur, x=processus sans terminal) avec un arbre de filiation (f).",
          reviewChapter: "ch5-s5"
        },
        {
          id: "q-ch5-05",
          type: "pratique",
          level: "intermediaire",
          chapter: "ch5",
          question: "Un processus Apache (httpd) ne r\u00e9pond plus et vous devez le tuer proprement. Comment proc\u00e9dez-vous ?",
          answer: "1. ps aux | grep httpd pour trouver le PID\n2. kill -15 PID (SIGTERM) pour une terminaison propre\n3. Si le processus ne s'arr\u00eate pas apr\u00e8s quelques secondes : kill -9 PID (SIGKILL)\n4. V\u00e9rifier avec ps aux | grep httpd qu'il est bien arr\u00eat\u00e9",
          reviewChapter: "ch5-s5"
        },
        {
          id: "q-ch5-06",
          type: "erreur",
          level: "avance",
          chapter: "ch5",
          question: "Quelle est l'erreur dans cette commande ?",
          code: "kill -1 1",
          answer: "La commande envoie le signal SIGHUP (1) au processus PID 1 (init). Bien que techniquement possible, tuer init fait planter le syst\u00e8me. Il est dangereux d'envoyer des signaux au PID 1 sans comprendre les cons\u00e9quences. Sauf pour SIGHUP qui lui demande de recharger sa configuration.",
          reviewChapter: "ch5-s5"
        },
        {
          id: "q-ch5-07",
          type: "interpretation",
          level: "intermediaire",
          chapter: "ch5",
          question: "Interpr\u00e9tez cette sortie de top :",
          output: "top - 14:23:01 up 3:45, 2 users, load average: 0.45, 0.30, 0.25\nTasks: 120 total, 1 running, 119 sleeping, 0 stopped, 0 zombie\n%Cpu(s): 5.2 us, 2.1 sy, 0.0 ni, 92.7 id\nMiB Mem : 3864 total, 1203 free, 1567 used, 1094 buff/cache",
          answer: "Le syst\u00e8me est actif depuis 3h45, charge moyenne basse (0.45 sur 1 min). 120 processus dont 1 en cours d'ex\u00e9cution et 119 en sommeil. CPU utilis\u00e9 \u00e0 5.2% en mode utilisateur et 2.1% en mode noyau, 92.7% inactif. M\u00e9moire utilis\u00e9e \u00e0 1567 Mo sur 3864 Mo.",
          reviewChapter: "ch5-s5"
        },
        {
          id: "q-ch5-08",
          type: "qcm",
          level: "intermediaire",
          chapter: "ch5",
          question: "Quels sont les signaux standards sous Linux ?",
          options: [
            { text: "SIGTERM (15) : demande d'arr\u00eat polie", correct: true },
            { text: "SIGKILL (9) : arr\u00eat forc\u00e9 imm\u00e9diat", correct: true },
            { text: "SIGHUP (1) : reconnexion / rechargement", correct: true },
            { text: "SIGSTOP (19) : suspendre un processus", correct: true },
            { text: "SIGCONT (18) : reprendre un processus suspendu", correct: true },
            { text: "SIGINT (2) : interruption (Ctrl+C)", correct: true },
            { text: "SIGQUIT (3) : arr\u00eat avec core dump (Ctrl+\\)", correct: true },
            { text: "SIGWIN (28) : redimensionnement de fen\u00eatre", correct: false }
          ],
          explanation: "Les signaux standards incluent SIGHUP(1), SIGINT(2), SIGQUIT(3), SIGKILL(9), SIGTERM(15), SIGSTOP(19), SIGCONT(18). SIGWIN n'existe pas ; le vrai signal pour redimensionnement est SIGWINCH (28).",
          commonMistake: "Confondre les num\u00e9ros de signaux ou leur effet.",
          keyTakeaway: "15=SIGTERM (arr\u00eat propre), 9=SIGKILL (arr\u00eat forc\u00e9), 19=SIGSTOP (pause).",
          reviewChapter: "ch5-s5"
        },
        {
          id: "q-ch5-09",
          type: "commande",
          level: "intermediaire",
          chapter: "ch5",
          question: "Quelle commande permet d'afficher l'utilisation de l'espace disque de tous les syst\u00e8mes de fichiers mont\u00e9s ?",
          answer: "df -h",
          explanation: "df (Disk Free) avec l'option -h (human readable) affiche l'espace disque utilis\u00e9 et disponible pour chaque partition mont\u00e9e, avec des unit\u00e9s lisibles (Ko, Mo, Go).",
          reviewChapter: "ch5-s8"
        },
        {
          id: "q-ch5-10",
          type: "vraifaux",
          level: "avance",
          chapter: "ch5",
          question: "Le fichier /etc/inittab d\u00e9finit le niveau d'ex\u00e9cution par d\u00e9faut et les actions \u00e0 ex\u00e9cuter pour chaque niveau.",
          correct: true,
          explanation: "/etc/inittab est le fichier de configuration du processus init. Il d\u00e9finit le runlevel par d\u00e9faut (id:3:initdefault:), les actions \u00e0 chaque niveau, les consoles virtuelles, et les processus \u00e0 lancer comme getty.",
          reviewChapter: "ch5-s2"
        }
      ]
    },
    {
      id: "ch6",
      title: "\u00c9l\u00e9ments de r\u00e9seau",
      questions: [
        {
          id: "q-ch6-01",
          type: "qcm",
          level: "debutant",
          chapter: "ch6",
          question: "Quelles sont les caract\u00e9ristiques d'une adresse IP de classe C ?",
          options: [
            { text: "Les 3 premiers octets identifient le r\u00e9seau", correct: true },
            { text: "Le dernier octet identifie la machine", correct: true },
            { text: "Masque par d\u00e9faut : 255.255.255.0", correct: true },
            { text: "Plage de 192.0.0.0 \u00e0 223.255.255.255", correct: true },
            { text: "Peut accueillir jusqu'\u00e0 65534 machines", correct: false },
            { text: "Peut accueillir jusqu'\u00e0 254 machines", correct: true }
          ],
          explanation: "Classe C : 192-223, masque 255.255.255.0, 3 octets r\u00e9seau + 1 octet machine = 254 machines max. La classe B permet 65534 machines.",
          commonMistake: "Confondre le nombre de machines entre les classes A, B et C.",
          keyTakeaway: "Classe C = 254 machines, masque en /24.",
          reviewChapter: "ch6-s2"
        },
        {
          id: "q-ch6-02",
          type: "vraifaux",
          level: "intermediaire",
          chapter: "ch6",
          question: "Les adresses IP 10.0.0.0/8, 172.16.0.0/12 et 192.168.0.0/16 sont des adresses priv\u00e9es non routables sur Internet.",
          correct: true,
          explanation: "Ces plages sont r\u00e9serv\u00e9es aux r\u00e9seaux priv\u00e9s (RFC 1918). Les routeurs Internet ne les acheminent pas. Elles sont utilis\u00e9es pour les r\u00e9seaux locaux (LAN) avec traduction d'adresse (NAT) pour acc\u00e9der \u00e0 Internet.",
          reviewChapter: "ch6-s2"
        },
        {
          id: "q-ch6-03",
          type: "ouverte",
          level: "intermediaire",
          chapter: "ch6",
          question: "Expliquez le r\u00f4le de la commande netstat et les informations qu'elle fournit.",
          answer: "netstat affiche les connexions r\u00e9seau actives, les tables de routage, les statistiques d'interface et les connexions masqu\u00e9es. Options : -t (TCP), -u (UDP), -l (ports en \u00e9coute), -n (num\u00e9rique), -p (PID/programme), -r (table de routage), -a (toutes les connexions). netstat -tulpn est souvent utilis\u00e9 pour voir les ports d'\u00e9coute.",
          commonMistake: "Oublier l'option -p pour voir le programme associ\u00e9 \u00e0 un port.",
          keyTakeaway: "netstat -tulpn donne tous les ports ouverts avec les programmes associ\u00e9s.",
          reviewChapter: "ch6-s5"
        },
        {
          id: "q-ch6-04",
          type: "commande",
          level: "debutant",
          chapter: "ch6",
          question: "Quelle commande permet d'afficher la configuration des interfaces r\u00e9seau ?",
          answer: "ifconfig",
          explanation: "ifconfig (sans arguments) affiche toutes les interfaces r\u00e9seau actives avec leur adresse IP, masque, adresse MAC, etc. ifconfig -a montre aussi les interfaces inactives.",
          reviewChapter: "ch6-s3"
        },
        {
          id: "q-ch6-05",
          type: "pratique",
          level: "intermediaire",
          chapter: "ch6",
          question: "Vous devez configurer une interface eth0 avec l'adresse IP 192.168.1.100, masque 255.255.255.0 et d\u00e9finir une passerelle par d\u00e9faut 192.168.1.1. Quelles commandes utilisez-vous ?",
          answer: "ifconfig eth0 192.168.1.100 netmask 255.255.255.0 up\nroute add default gw 192.168.1.1\nOu :\nip addr add 192.168.1.100/24 dev eth0\nip route add default via 192.168.1.1",
          reviewChapter: "ch6-s3"
        },
        {
          id: "q-ch6-06",
          type: "erreur",
          level: "avance",
          chapter: "ch6",
          question: "Quelle est l'erreur dans cette configuration r\u00e9seau ?",
          code: "# /etc/hosts\n127.0.0.1\tlocalhost\n192.168.1.10\tmonserveur.local monserveur\n\n# /etc/resolv.conf\nnameserver 8.8.8.8\nsearch localdomain",
          answer: "Il n'y a pas d'erreur flagrante. /etc/hosts associe 192.168.1.10 \u00e0 monserveur.local (FQDN) et monserveur (alias). /etc/resolv.conf d\u00e9finit le DNS Google (8.8.8.8) et le domaine de recherche. Attention : /etc/hosts est consult\u00e9 avant DNS si la configuration nsswitch.conf le d\u00e9finit ainsi (hosts: files dns).",
          reviewChapter: "ch6-s4"
        },
        {
          id: "q-ch6-07",
          type: "interpretation",
          level: "debutant",
          chapter: "ch6",
          question: "Interpr\u00e9tez le r\u00e9sultat de cette commande :",
          output: "$ ping -c 3 8.8.8.8\nPING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.\n64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.3 ms\n64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=11.8 ms\n64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=13.1 ms\n\n--- 8.8.8.8 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss",
          answer: "La connectivit\u00e9 avec 8.8.8.8 (DNS Google) est bonne. Les 3 paquets ont \u00e9t\u00e9 envoy\u00e9s et 3 re\u00e7us (0% de perte). Le TTL est de 117 (nombre de sauts restant) et le temps de r\u00e9ponse moyen est d'environ 12 ms, ce qui indique un r\u00e9seau r\u00e9actif.",
          reviewChapter: "ch6-s5"
        },
        {
          id: "q-ch6-08",
          type: "qcm",
          level: "intermediaire",
          chapter: "ch6",
          question: "Quel est le r\u00f4le du fichier /etc/resolv.conf ?",
          options: [
            { text: "D\u00e9finir les serveurs DNS \u00e0 utiliser", correct: true },
            { text: "Mappage entre noms d'h\u00f4tes et adresses IP locales", correct: false },
            { text: "D\u00e9finir le domaine de recherche (search)", correct: true },
            { text: "Configurer les interfaces r\u00e9seau", correct: false }
          ],
          explanation: "/etc/resolv.conf configure la r\u00e9solution DNS : nameserver (adresse du serveur DNS), search (domaine de recherche pour les noms courts), domain (nom de domaine local). Le mappage nom/IP local se fait dans /etc/hosts.",
          commonMistake: "Confondre /etc/hosts et /etc/resolv.conf.",
          keyTakeaway: "/etc/resolv.conf = serveurs DNS, /etc/hosts = correspondances locales.",
          reviewChapter: "ch6-s4"
        },
        {
          id: "q-ch6-09",
          type: "commande",
          level: "intermediaire",
          chapter: "ch6",
          question: "Quelle commande permet d'afficher la table de routage IP ?",
          answer: "route -n",
          explanation: "route -n affiche la table de routage sans r\u00e9soudre les noms (plus rapide). La sortie montre le r\u00e9seau de destination, la passerelle, le masque, les indicateurs et l'interface.",
          reviewChapter: "ch6-s3"
        },
        {
          id: "q-ch6-10",
          type: "vraifaux",
          level: "avance",
          chapter: "ch6",
          question: "La commande dig permet d'effectuer des requ\u00eates DNS d\u00e9taill\u00e9es, contrairement \u00e0 nslookup qui est d\u00e9pr\u00e9ci\u00e9.",
          correct: true,
          explanation: "dig (Domain Information Groper) est l'outil DNS le plus complet et flexible. Il affiche des informations d\u00e9taill\u00e9es sur les enregistrements DNS. nslookup est d\u00e9pr\u00e9ci\u00e9 sur certains syst\u00e8mes au profit de dig et host.",
          reviewChapter: "ch6-s7"
        }
      ]
    },
    {
      id: "ch7",
      title: "Gestion des programmes",
      questions: [
        {
          id: "q-ch7-01",
          type: "qcm",
          level: "debutant",
          chapter: "ch7",
          question: "Quelles sont les options principales de la commande rpm ?",
          options: [
            { text: "-i : installer un paquet", correct: true },
            { text: "-U : mettre \u00e0 jour un paquet", correct: true },
            { text: "-e : effacer (supprimer) un paquet", correct: true },
            { text: "-q : interroger la base RPM", correct: true },
            { text: "-V : v\u00e9rifier l'int\u00e9grit\u00e9 d'un paquet install\u00e9", correct: true },
            { text: "-c : compiler un paquet depuis les sources", correct: false },
            { text: "-x : extraire un paquet", correct: false }
          ],
          explanation: "Les options principales de rpm sont : -i (install), -U (update), -e (erase), -q (query), -V (verify). il n'y a pas d'options -c ou -x pour rpm.",
          commonMistake: "Confondre -i (install) et -U (update/mise \u00e0 jour).",
          keyTakeaway: "i=install, U=update, e=erase, q=query, V=verify.",
          reviewChapter: "ch7-s1"
        },
        {
          id: "q-ch7-02",
          type: "vraifaux",
          level: "debutant",
          chapter: "ch7",
          question: "La commande tar -cvf archive.tar dossier/ cr\u00e9e une archive compress\u00e9e.",
          correct: false,
          explanation: "tar -cvf cr\u00e9e une archive non compress\u00e9e. Les options sont : -c (create), -v (verbose), -f (fichier). Pour compresser, on doit ajouter -z (gzip) : tar -czvf archive.tar.gz dossier/.",
          reviewChapter: "ch7-s2"
        },
        {
          id: "q-ch7-03",
          type: "ouverte",
          level: "intermediaire",
          chapter: "ch7",
          question: "Expliquez l'organisation des sections du manuel (man) sous Linux.",
          answer: "Les sections du manuel sont : 1 (commandes utilisateur), 2 (appels syst\u00e8me), 3 (fonctions de la biblioth\u00e8que C), 4 (p\u00e9riph\u00e9riques et drivers), 5 (formats de fichiers), 6 (jeux), 7 (divers/conventions), 8 (commandes d'administration), 9 (noyau). La section est pr\u00e9cis\u00e9e par le num\u00e9ro entre parenth\u00e8ses : man 5 passwd affiche la page de la section 5 (format du fichier).",
          commonMistake: "Ne pas pr\u00e9ciser la section et obtenir la page d'une autre section (ex: passwd commande vs passwd fichier).",
          keyTakeaway: "Pr\u00e9ciser la section avec man N commande pour obtenir la page souhait\u00e9e.",
          reviewChapter: "ch7-s4"
        },
        {
          id: "q-ch7-04",
          type: "commande",
          level: "intermediaire",
          chapter: "ch7",
          question: "Quelle commande permet de lister tous les fichiers install\u00e9s par un paquet RPM ?",
          answer: "rpm -ql nom_du_paquet",
          explanation: "rpm -q (query) -l (list) affiche la liste de tous les fichiers appartenant au paquet sp\u00e9cifi\u00e9.",
          reviewChapter: "ch7-s1"
        },
        {
          id: "q-ch7-05",
          type: "pratique",
          level: "intermediaire",
          chapter: "ch7",
          question: "Vous devez v\u00e9rifier l'int\u00e9grit\u00e9 d'un paquet RPM install\u00e9 pour savoir si des fichiers ont \u00e9t\u00e9 modifi\u00e9s depuis l'installation.",
          answer: "rpm -V nom_du_paquet (ou rpm --verify). La sortie montre les fichiers modifi\u00e9s avec des codes : S (taille), M (mode/permissions), 5 (MD5), D (p\u00e9riph\u00e9rique), L (lien symbolique), U (propri\u00e9taire), G (groupe), T (date). Un '.' signifie que le fichier est conforme.",
          reviewChapter: "ch7-s1"
        },
        {
          id: "q-ch7-06",
          type: "erreur",
          level: "avance",
          chapter: "ch7",
          question: "Quelle est l'erreur dans cette commande ?",
          code: "tar -czvf /tmp/backup.tgz /home /etc /usr/local",
          answer: "La commande est correcte syntaxiquement. Ce n'est pas une erreur, mais attention : l'option -f doit \u00eatre suivie du nom de l'archive imm\u00e9diatement (ici c'est le cas). Certaines anciennes versions de tar n\u00e9cessitent que l'option -f soit la derni\u00e8re. Il est recommand\u00e9 de mettre -f juste avant le nom de l'archive.",
          reviewChapter: "ch7-s2"
        },
        {
          id: "q-ch7-07",
          type: "interpretation",
          level: "intermediaire",
          chapter: "ch7",
          question: "Interpr\u00e9tez la sortie de cette commande RPM :",
          output: "$ rpm -qi bash\nName        : bash\nVersion     : 4.2.46\nRelease     : 34.el7\nArchitecture: x86_64\nInstall Date: Mon 15 Jan 2024 10:30:00\nGroup       : System Environment/Shells\nSize        : 4843945\nLicense     : GPLv3+\nSummary     : The GNU Bourne Again shell",
          answer: "Le paquet bash version 4.2.46-34.el7 est install\u00e9. Architecture x86_64, install\u00e9 le 15 janvier 2024, taille environ 4.8 Mo, licence GPLv3+. Le groupe est 'System Environment/Shells'. -qi = query information donne les m\u00e9ta-donn\u00e9es compl\u00e8tes du paquet.",
          reviewChapter: "ch7-s1"
        },
        {
          id: "q-ch7-08",
          type: "qcm",
          level: "debutant",
          chapter: "ch7",
          question: "Quels sont les formats de compression support\u00e9s par tar ?",
          options: [
            { text: "-z : compression gzip (fichiers .tar.gz ou .tgz)", correct: true },
            { text: "-j : compression bzip2 (fichiers .tar.bz2)", correct: true },
            { text: "-J : compression xz (fichiers .tar.xz)", correct: true },
            { text: "-Z : compression compress (fichiers .tar.Z)", correct: true },
            { text: "-x : compression zip", correct: false },
            { text: "-r : compression rar", correct: false }
          ],
          explanation: "tar supporte -z (gzip), -j (bzip2), -J (xz), -Z (compress). Zip et rar ne sont pas des formats natifs de tar.",
          commonMistake: "Penser que tar compresse par d\u00e9faut ou confondre les options de compression.",
          keyTakeaway: "-z=gzip, -j=bzip2, -J=xz pour la compression tar.",
          reviewChapter: "ch7-s3"
        },
        {
          id: "q-ch7-09",
          type: "commande",
          level: "debutant",
          chapter: "ch7",
          question: "Quelle commande affiche le chemin complet d'un fichier ex\u00e9cutable cherch\u00e9 dans le PATH ?",
          answer: "which nom_commande",
          explanation: "which affiche le chemin complet de la commande qui serait ex\u00e9cut\u00e9e si on la tape dans le terminal, en parcourant les r\u00e9pertoires list\u00e9s dans la variable PATH.",
          reviewChapter: "ch7-s4"
        },
        {
          id: "q-ch7-10",
          type: "vraifaux",
          level: "avance",
          chapter: "ch7",
          question: "La commande rpm -e supprime un paquet uniquement si aucun autre paquet n'en d\u00e9pend.",
          correct: true,
          explanation: "rpm -e v\u00e9rifie les d\u00e9pendances avant de supprimer un paquet. Si d'autres paquets d\u00e9pendent de celui-ci, rpm refuse la suppression et affiche les d\u00e9pendances non satisfaites. L'option --nodeps force la suppression sans v\u00e9rification.",
          reviewChapter: "ch7-s1"
        }
      ]
    },
    {
      id: "ch8",
      title: "Installation de GNU/Linux",
      questions: [
        {
          id: "q-ch8-01",
          type: "qcm",
          level: "debutant",
          chapter: "ch8",
          question: "Quelles sont les partitions recommand\u00e9es lors d'une installation Linux ?",
          options: [
            { text: "/ (partition racine)", correct: true },
            { text: "swap (espace d'\u00e9change)", correct: true },
            { text: "/boot (noyau et fichiers de d\u00e9marrage)", correct: true },
            { text: "/usr (programmes et biblioth\u00e8ques)", correct: true },
            { text: "/var (donn\u00e9es variables : logs, spool)", correct: true },
            { text: "/home (r\u00e9pertoires personnels)", correct: true },
            { text: "/windows (partition syst\u00e8me Windows)", correct: false },
            { text: "/tmp (fichiers temporaires)", correct: true }
          ],
          explanation: "Les partitions Linux recommand\u00e9es sont : /, swap, /boot, /usr, /var, /home, /tmp. /windows n'existe pas. /boot contient le noyau et les fichiers de d\u00e9marrage.",
          commonMistake: "Oublier la partition swap ou /boot sur des syst\u00e8mes modernes.",
          keyTakeaway: "Les partitions principales : /, swap, /boot, /usr, /var, /home.",
          reviewChapter: "ch8-s1"
        },
        {
          id: "q-ch8-02",
          type: "vraifaux",
          level: "debutant",
          chapter: "ch8",
          question: "GRUB est un chargeur d'amor\u00e7age (boot loader) qui permet de choisir le syst\u00e8me d'exploitation au d\u00e9marrage.",
          correct: true,
          explanation: "GRUB (Grand Unified Bootloader) est le chargeur d'amor\u00e7age moderne de Linux. Il lit son fichier de configuration (menu.lst ou grub.cfg) qui d\u00e9finit les entr\u00e9es de menu, le noyau \u00e0 charger et les options de d\u00e9marrage.",
          reviewChapter: "ch8-s4"
        },
        {
          id: "q-ch8-03",
          type: "ouverte",
          level: "intermediaire",
          chapter: "ch8",
          question: "Expliquez le r\u00f4le de la partition swap et comment d\u00e9terminer sa taille.",
          answer: "La partition swap sert d'espace d'\u00e9change (m\u00e9moire virtuelle). Quand la RAM est pleine, le noyau d\u00e9place des pages en m\u00e9moire sur le disque (swap). La taille recommand\u00e9e est : 2 fois la RAM pour les petites machines (< 2 Go), \u00e9quivalente \u00e0 la RAM pour 2-8 Go, ou bas\u00e9e sur l'utilisation (hibernation n\u00e9cessite swap >= RAM).",
          commonMistake: "Omettre la swap ou lui donner une taille insuffisante.",
          keyTakeaway: "La swap est une extension de la RAM sur le disque, essentielle pour la stabilit\u00e9.",
          reviewChapter: "ch8-s1"
        },
        {
          id: "q-ch8-04",
          type: "commande",
          level: "intermediaire",
          chapter: "ch8",
          question: "Quelle commande permet de cr\u00e9er une partition sur un disque ?",
          answer: "fdisk /dev/sda",
          explanation: "fdisk (Fixed Disk) est un outil de partitionnement. On sp\u00e9cifie le p\u00e9riph\u00e9rique (ex: /dev/sda). fdisk propose un menu interactif : n (nouvelle partition), d (supprimer), p (afficher), w (ecrire la table), q (quitter sans sauver).",
          reviewChapter: "ch8-s2"
        },
        {
          id: "q-ch8-05",
          type: "pratique",
          level: "avance",
          chapter: "ch8",
          question: "Vous devez installer Linux en dual-boot avec Windows d\u00e9j\u00e0 install\u00e9. D\u00e9crivez la proc\u00e9dure et les pr\u00e9cautions \u00e0 prendre.",
          answer: "1. D\u00e9fragmenter Windows et sauvegarder les donn\u00e9es\n2. Lib\u00e9rer de l'espace avec l'outil de gestion des disques Windows\n3. D\u00e9marrer sur le live CD Linux\n4. Cr\u00e9er les partitions Linux dans l'espace libre (/boot, swap, /usr, /var, /, /home)\n5. Installer GRUB dans le MBR pour pouvoir choisir au d\u00e9marrage\n6. Important : installer Windows d'abord, puis Linux (Windows \u00e9crase le MBR). Si l'ordre est invers\u00e9, il faut restaurer GRUB avec un live CD.",
          reviewChapter: "ch8-s6"
        },
        {
          id: "q-ch8-06",
          type: "erreur",
          level: "avance",
          chapter: "ch8",
          question: "Quelle est l'erreur dans cette configuration LILO ?",
          code: "boot=/dev/sda\nprompt\ntimeout=50\nimage=/vmlinuz\n  root=/dev/sda2\n  label=linux\n  read-only",
          answer: "Il n'y a pas d'erreur syntaxique majeure. Cependant, une configuration plus robuste inclurait un 'other' pour un \u00e9ventuel dual-boot. Aussi, le timeout est de 50 dixi\u00e8mes de seconde (5 secondes), ce qui peut \u00eatre court pour un utilisateur d\u00e9butant. Note : la directive 'boot=' prend le p\u00e9riph\u00e9rique o\u00f9 installer LILO, g\u00e9n\u00e9ralement le MBR.",
          reviewChapter: "ch8-s3"
        },
        {
          id: "q-ch8-07",
          type: "interpretation",
          level: "intermediaire",
          chapter: "ch8",
          question: "Interpr\u00e9tez la sortie de cette configuration GRUB :",
          output: "default=0\ntimeout=10\ntitle Linux\n  root (hd0,0)\n  kernel /vmlinuz-3.10.0 ro root=/dev/sda1\n  initrd /initramfs-3.10.0.img\ntitle Windows\n  root (hd0,1)\n  chainloader +1",
          answer: "GRUB propose 2 entr\u00e9es : Linux (par d\u00e9faut) et Windows. Le d\u00e9lai est de 10 secondes. Pour Linux : noyau sur (hd0,0) = premi\u00e8re partition du premier disque, avec kernel /vmlinuz-3.10.0, root=/dev/sda1, et initrd. Pour Windows : amorce sur (hd0,1) = deuxi\u00e8me partition, chainloader +1 d\u00e9l\u00e8gue le d\u00e9marrage au chargeur Windows.",
          reviewChapter: "ch8-s4"
        },
        {
          id: "q-ch8-08",
          type: "qcm",
          level: "intermediaire",
          chapter: "ch8",
          question: "Quelles sont les caract\u00e9ristiques du fichier de configuration de GRUB (menu.lst) ?",
          options: [
            { text: "default=0 : la premi\u00e8re entr\u00e9e est celle par d\u00e9faut", correct: true },
            { text: "timeout : d\u00e9lai avant d\u00e9marrage automatique (en secondes)", correct: true },
            { text: "title : nom de l'entr\u00e9e dans le menu", correct: true },
            { text: "root (hd0,0) : partition contenant le noyau", correct: true },
            { text: "kernel : chemin du noyau et options", correct: true },
            { text: "chainloader +1 : d\u00e9l\u00e8gue au secteur de boot de la partition", correct: true },
            { text: "loader : sp\u00e9cifie le fichier NTLDR de Windows", correct: false },
            { text: "initrd : disque RAM initial pour charger les modules", correct: true }
          ],
          explanation: "menu.lst contient default, timeout, et des entr\u00e9es title avec root, kernel, initrd, et optionnellement chainloader +1 pour d\u00e9l\u00e9gation. 'loader' est une directive de LILO, pas de GRUB.",
          commonMistake: "Confondre les directives de LILO et de GRUB.",
          keyTakeaway: "GRUB utilise (hdN,M) pour d\u00e9signer les disques/partitions (N disque, M partition).",
          reviewChapter: "ch8-s4"
        },
        {
          id: "q-ch8-09",
          type: "commande",
          level: "avance",
          chapter: "ch8",
          question: "Quelle commande permet de copier le secteur de boot Linux pour le d\u00e9marrer depuis NTLDR (Windows) ?",
          answer: "dd if=/dev/sda2 of=/linux.boot bs=512 count=1",
          explanation: "dd copie le premier secteur (512 octets) de la partition Linux (sda2) vers un fichier linux.boot dans C:\\. Ce fichier peut \u00eatre ajout\u00e9 dans boot.ini de Windows pour le dual-boot avec NTLDR.",
          reviewChapter: "ch8-s5"
        },
        {
          id: "q-ch8-10",
          type: "vraifaux",
          level: "avance",
          chapter: "ch8",
          question: "L'ordre d'installation recommand\u00e9 pour un dual-boot Windows/Linux est d'installer Windows en premier, car Windows \u00e9crase le MBR.",
          correct: true,
          explanation: "Windows \u00e9crase le MBR (Master Boot Record) lors de son installation, supprimant tout autre chargeur d'amor\u00e7age. Si Linux est install\u00e9 apr\u00e8s Windows, on peut configurer GRUB pour d\u00e9marrer les deux. Si Windows est install\u00e9 apr\u00e8s Linux, il faut restaurer GRUB avec un live CD.",
          reviewChapter: "ch8-s6"
        }
      ]
    }
  ],
  allQuestions: function() {
    var result = [];
    for (var i = 0; i < this.chapters.length; i++) {
      for (var j = 0; j < this.chapters[i].questions.length; j++) {
        result.push(this.chapters[i].questions[j]);
      }
    }
    return result;
  }
};
