// JavaScript libary

//DOM elementen
var eOutput = document.getElementById('output');
var eKnopKrediet = document.getElementById('krediet');
var eKnopDebiet = document.getElementById('debiet');

//standaardwaarden
var sMsg = ''; // bericht aan gebruiker
var sNaam = 'nieuwe klant'; // standaard invulling naam
var nSaldo = 0; // standaard saldo


if(getCookie('klantnaam')){
     //gekende klant
     var sNaam = getCookie('klantnaam');
     var nSaldo = getCookie('saldo');

     //outputbericht
     sMsg = "Welkom " + sNaam + ",";
     sMsg += "uw saldo bedraagt " + nSaldo + " Euro";

     //knop
     var eKnop = maakKnop('Sluit rekening');
     eKnop.addEventListener('click',rekeningSluiten); //eventhandler
}
else{
     //eerste bezoek
     sMsg = "Welkom beste bezoeker. ";
     sMsg += "Als u bij ons een nieuwe rekening opent, ontvangt u een startsaldo van 100 Euro!";

     //knop
     var eKnop = maakKnop('Open rekening');
     eKnop.addEventListener('click',rekeningOpenen);
}

// generische DOM elementen
var dfBericht = document.createDocumentFragment();
var eNl = document.createElement('br');

//vervolledig documentFragment en voeg in
var tNode = document.createTextNode(sMsg);
dfBericht.appendChild(tNode);
dfBericht.appendChild(eNl.cloneNode(false));
dfBericht.appendChild(eNl.cloneNode(false));
dfBericht.appendChild(eKnop);

eOutput.appendChild(dfBericht);

/******************FUNCTIES*********************************/
function maakKnop(tekst){
     /*
     returnt een DOM button element
     */
     var eKnop = document.createElement('button');
     var sTekst = document.createTextNode(tekst);
     eKnop.appendChild(sTekst);
     eKnop.setAttribute('type','button');
     return eKnop;
}

//----------------------------------------------------------

function rekeningOpenen(){
console.log('rekening openen');
}

//----------------------------------------------------------

function rekeningSluiten(){
console.log('rekening sluiten');
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
var vandaag = new Date();

function getVandaagStr(){
//returnt een lokale datumtijdstring

var strNu = "Momenteel: " + vandaag.toLocaleDateString() + ", ";
strNu += vandaag.toLocaleTimeString();
return strNu;
}
//---------------------------------------------

//----------datum arrays----------------------

//dagen volgens getDay() volgorde
var arrWeekdagen= new Array('zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag');

//vervang feb dagen voor een schrikkeljaar
var arrMaanden= new Array(['januari',31], ['februari',28], ['maart',31], ['april',30], ['mei',31], ['juni',30], ['juli',31],
['augustus',31], ['september',30], ['oktober',31], ['november',30], ['december',31]);

//---------------------------------------------

//globale datum objecten te gebruiken in je pagina
var vandaag = new Date();
var huidigeDag = vandaag.getDate(); //dag van de maand
var huidigeWeekDag = vandaag.getDay(); //weekdag
var huidigeMaand = vandaag.getMonth();
var huidigJaar = vandaag.getFullYear();

/************** cookies ****************************/
function setCookie(naam,waarde,dagen){
     /*plaatst een cookie
     
     naam: cookienaam;
     waarde: de inhoud van het cookie
     dagen: optioneel, het aantal dagen dat het cookie geldig blijft vanaf nu
     indien afwezig wordt het een session cookie
     */
     
     var verval = "";
     if(dagen){
          //vandaag global bovenaan deze lib;
          var vervalDatum = new Date(vandaag.getTime()+dagen*24*60*60*1000);
          verval = vervalDatum.toUTCString();
     }
     document.cookie = naam + "=" + waarde + ";expires=" + verval;
     }

//---------------------------------------------
function getCookie(naam){
     /*leest een cookie
     
     naam: cookienaam
     */
     
     var zoek = naam + "=";
     if (document.cookie.length>0){
          var begin = document.cookie.indexOf(zoek);
          if (begin!=-1){
               begin += zoek.length;
               var einde = document.cookie.indexOf(";", begin);
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