# Elementi app
Nel progetto è presente un file bat per l'esecuzione del frontend in locale così come previsto dalla documentazione. Nella cartella src sono presenti:
- un index.js che richiama il file App.js e lo renderizza
- un file App.js che renderizza al suo interno il Footer e la Navbar

Come è possibile osservare nel file gitignore è stato escluso il file .env che contiene al suo interno link al server
# Cartella style components 
In questa cartella sono presenti:
- Footer che rappresenta la fine di ogni pagina web e contiene informazioni sui contatti
- Navbar che presenta due componenti una Navbar (importato da bootstrap-react) e un BrowserRouter che permette la navgabilità tra le pagine in base al cambiamento del path
# Cartella pages 
In questa cartella sono presenti:
- Home_Amm: che rappresenta la pagina home dell'app relativa a gestione di sale e postazioni
- Utenti_page: che rappresenta la pagina Utenti, ossia la pagina contenente la lista degli utenti iscritti alla piattaforma in cui è possibile eliminare utenti oppure andare alla pagina Utente
- Utente_page: che rappresenta la pagina Utente, ossia la pagina di un singolo utente accessibile tramite il pulsante visualizza presente nella pagina "Utenti", in cui è possibile visualizzare e modificare alcuni dati dell'Utente (ticket, nome, cognome ecc.) 

Infine sono presenti alcuni file css per visualizzare al meglio i contenuti
