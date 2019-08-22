// JavaScript libary

//DOM elementen
let eOutput = document.getElementById('output');
let eKnopKrediet = document.getElementById('krediet');
let eKnopDebiet = document.getElementById('debiet');

//standaardwaarden
let sMsg = ''; // bericht aan gebruiker
let sNaam = 'nieuwe klant'; // standaard invulling naam
let nSaldo = 0; // standaard saldo


if(getCookie('klantnaam')){
     //gekende klant
     let sNaam = getCookie('klantnaam');
     nSaldo = parseFloat(getCookie('saldo')).toFixed(2);

     //outputbericht
     sMsg = "Welkom " + sNaam + ",";
     sMsg += "uw saldo bedraagt " + nSaldo + " Euro";

     //knop
     let eKnop = maakKnop('Sluit rekening');
     eKnop.addEventListener('click',rekeningSluiten); //eventhandler
}
else{
     //eerste bezoek
     sMsg = "Welkom beste bezoeker. ";
     sMsg += "Als u bij ons een nieuwe rekening opent, ontvangt u een startsaldo van 100 Euro!";

     //knop
     let eKnop = maakKnop('Open rekening');
     eKnop.addEventListener('click',rekeningOpenen);
}

// generische DOM elementen
let dfBericht = document.createDocumentFragment();
let eNl = document.createElement('br');

//vervolledig documentFragment en voeg in
let tNode = document.createTextNode(sMsg);
dfBericht.appendChild(tNode);
dfBericht.appendChild(eNl.cloneNode(false));
dfBericht.appendChild(eNl.cloneNode(false));
dfBericht.appendChild(eKnop);

eOutput.appendChild(dfBericht);

/*******************EVENT HANDLERS **************************/
//event handler voor + - knoppen
eKnopKrediet.addEventListener('click', function(){ berekenen('+')});
eKnopDebiet.addEventListener('click', function(){ berekenen('-')});

/******************FUNCTIES*********************************/
function maakKnop(tekst){
     /*
     returnt een DOM button element
     */
     let eKnop = document.createElement('button');
     let sTekst = document.createTextNode(tekst);
     eKnop.appendChild(sTekst);
     eKnop.setAttribute('type','button');
     return eKnop;
}

//----------------------------------------------------------

function rekeningOpenen(){
     //console.log('rekening openen');
     let sNaam = window.prompt("Uw naam, graag?","");
     if (sNaam!="" && sNaam!=null){
          setCookie('klantnaam',sNaam,100);
          setCookie('saldo',100,100);
          window.history.go(0);
     }
}

//----------------------------------------------------------

function rekeningSluiten(){
console.log('rekening sluiten');
}

function berekenen(bewerking){
     /*
     storting of geldafhaling
     @bewerking = een '+' of een '-' teken
     */

     let nNieuwSaldo = 0;
     let eBedrag = document.getElementById('bedrag');
     let sBedrag = eBedrag.value;
     let sSaldo = getCookie('saldo');
     let sBericht = "";
     let re = /,/;
     sBedrag = sBedrag.replace(re,'.');
     let nNieuwSaldo = 0;

     if(sSaldo !== null && sSaldo !== ""){
     if(sBedrag !== "" && !isNaN(sBedrag)){
          nSaldo = parseFloat(sSaldo);
          nBedrag = parseFloat(sBedrag);
          switch (bewerking) {
          case '+':
               nNieuwSaldo = nSaldo + nBedrag;
               break;
          case '-':
               nNieuwSaldo = nSaldo - nBedrag;
               break;
          }

          if (nNieuwSaldo<=0){
               let nMax = nSaldo-0.01;
               sBericht += "Uw saldo is onvoldoende om dit bedrag af te halen. ";
               sBericht += "U kunt maximaal " + nMax + " Euro afhalen.";
               eBedrag.value = nMax;
               eBedrag.focus();
               toonWaarschuwing(sBericht);
          }
          else{
               setCookie('saldo',nNieuwSaldo,100);
               window.history.go(0);
               eBedrag.value = "";
     }
          }
          else{
               alert('U moet een correct bedrag ingeven');
          }

          setCookie('saldo',nNieuwSaldo,100);
          window.history.go(0);
          eBedrag.value = "";
     }
     else{
          alert('U moet een correct bedrag ingeven');
     }
     }
     else{
     //geen saldo = geen rekening
     let bOpenen = window.confirm('U heeft nog geen rekening geopend, nu even doen?');
     if(bOpenen===true){rekeningOpenen()}
     }
}

/**************** DOM functies *******************/

function leegNode(objNode){
/* verwijdert alle inhoud/children van een Node
     @ objNode: node, verplicht, de node die geleegd wordt
*/
     while(objNode.hasChildNodes()){
          objNode.removeChild(objNode.firstChild);
     }
}

/**************** Datum, tijd functies *************/

//globale datum objecten
let vandaag = new Date();

function getVandaagStr(){
//returnt een lokale datumtijdstring

let strNu = "Momenteel: " + vandaag.toLocaleDateString() + ", ";
strNu += vandaag.toLocaleTimeString();
return strNu;
}
//---------------------------------------------

//----------datum arrays----------------------

//dagen volgens getDay() volgorde
let arrWeekdagen= new Array('zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag');

//vervang feb dagen voor een schrikkeljaar
let arrMaanden= new Array(['januari',31], ['februari',28], ['maart',31], ['april',30], ['mei',31], ['juni',30], ['juli',31],
['augustus',31], ['september',30], ['oktober',31], ['november',30], ['december',31]);

//---------------------------------------------

//globale datum objecten te gebruiken in je pagina
let vandaag = new Date();
let huidigeDag = vandaag.getDate(); //dag van de maand
let huidigeWeekDag = vandaag.getDay(); //weekdag
let huidigeMaand = vandaag.getMonth();
let huidigJaar = vandaag.getFullYear();

/************** cookies ****************************/
function setCookie(naam,waarde,dagen){
     /*plaatst een cookie
     
     naam: cookienaam;
     waarde: de inhoud van het cookie
     dagen: optioneel, het aantal dagen dat het cookie geldig blijft vanaf nu
     indien afwezig wordt het een session cookie
     */
     
     let verval = "";
     if(dagen){
          //vandaag global bovenaan deze lib;
          let vervalDatum = new Date(vandaag.getTime()+dagen*24*60*60*1000);
          verval = vervalDatum.toUTCString();
     }
     document.cookie = naam + "=" + waarde + ";expires=" + verval;
     }

//---------------------------------------------
function getCookie(naam){
     /*leest een cookie
     
     naam: cookienaam
     */
     
     let zoek = naam + "=";
     if (document.cookie.length>0){
          let begin = document.cookie.indexOf(zoek);
          if (begin!=-1){
               begin += zoek.length;
               let einde = document.cookie.indexOf(";", begin);
               if (einde==-1){
                    einde = document.cookie.length;
               }
               return document.cookie.substring(begin, einde);
          }
     }
     }

//---------------------------------------------
function clearCookie(naam){
     /*
     verwijdert een cookie
     
     naam: cookienaam
     */
     setCookie(naam,"",-1);
     }