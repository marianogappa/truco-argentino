import React from 'react';
import { useEffect, useState } from 'react';

const actionTexts = {
    "say_envido": [
        [
            "Amalaya con las penas",
            "cuando flaquea el corazon",
            "Yo le canto Envido",
            "apenas pues no tengo",
            "pa'l rabon"
        ],
        [
            "Atienda la relacion",
            "que hace un gaucho perseguido:",
            "Ahorita le via' ganar",
            "con este grandioso",
            "Envido !!!"
        ],
        [
            "Cuando vine",
            "de la Pampa traiba",
            "un lazo retorcido,",
            "con el enlace'",
            "tres cartas,",
            "y con dos le digo envido"
        ],
        [
            "A este humano",
            "reprimido",
            "le via'",
            "cantar el envido ..."
        ],
        [
            "A este rival tan",
            "BANDIDO le via'",
            "cantar el Envido ..."
        ],
        [
            "A este humano",
            "compungido",
            "lo achico con un ...",
            "ENVIDO"
        ],
        [
            "Aunque lo creas",
            "indebido",
            "te via' cantar",
            "un envido"
        ],
        [
            "Aunque yo tenga pintade computadora,",
            "hay un enano",
            "aqui metido",
            "que me esta' dele",
            "soplar:",
            "Dale que tenes Envido"
        ],
        [
            "El humano",
            "me ha herido:",
            "Dijo que yo no se'",
            "jugar al Envido"
        ],
        [
            "Vea Vea Vea !",
            "que cosa mas bonita",
            "Salio' a afanar",
            "Envido",
            "la famosa Teresita"
        ],
        [
            "Si no me convidas",
            "con Cerveza,",
            "por lo menos",
            "ofreceme un Envido"
        ]
    ],
    "say_real_envido": [
        [
            "No piense en un descuido",
            "si no es pa'tanto la cosa...",
            "yo le digo",
            "Real Envido",
            "que es",
            "lo mesmo que olorosa"
        ],
        [
            "Con su boquita",
            "de grana y su",
            "pelo renegrido",
            "no envidia",
            "a la manana este",
            "hermoso Real Envido"
        ],
        [
            "Tomala vos",
            "Damela a mi'",
            "Con Real Envido",
            "te vas a divertir..."
        ],
        [
            "Si la computadora",
            "te ha aturdido,",
            "habras de perdonarla:","Es que vino cargada",
            "con un esplendoroso",
            "Real Envido"
        ],
        [
            "Que' coraje...",
            "Que' atrevido andar",
            "comiendo electrones",
            "y escupiendo",
            "Real Envido"
        ],
        [
            "Aunque suene",
            "presumido yo te canto","el Real Envido"
        ],
        [
            "Un gaucho bajo'",
            "del cielo",
            "en un plato volador,",
            "al pasar junto",
            "a una vaca,",
            "Real Envido le grito'"
        ],
        [
            "Me llenaste de bronca","Ahora el partido",
            "te lo gano",
            "con Real Envido",
            "y con toda pompa"
        ],
        [
            "Che, humanoide:",
            "Quedaste tan",
            "resentido que hace",
            "mucho que no me",
            "gritas el Real Envido"
        ],
        [
            "No se' si arriesgarme","tanto... No se' si",
            "tengo que tirarme",
            "el lance...",
            "y Bue'",
            "te lo digo nomas:",
            "Real Envido !!"
        ]
    ],
    "say_dos_reales_envido": [
        [
            "Parece algo afligido",
            "Que tal si lo sacudo",
            "con Dos Reales Envido------ eh?"
        ],
        [
            "La pata tiene su pato","La esposa tiene",
            "marido. Y vos",
            "chitrulo barato",
            "tenis",
            "Dos Reales Envido ??"
        ],
        [
            "Caminando por mis pagos",
            "me sorprendio' un alarido...",
            "Yo creiba",
            "que era Mandinga y",
            "no Dos Reales Envido"
        ],
        [
            "Desde el dia que he nacido",
            "siempre fui un poco fiaca",
            "Naides palabra",
            "me saca... salvo",
            "Dos Reales Envido"
        ],
        [
            "A este",
            "truquero atrevido",
            "le zampo no uno",
            "sino",
            "Dos Reales Envido",
            "Que' tal ???..."
        ],
        [
            "A mi contrincante",
            "aturdido le exclamo",
            "Dos Reales Envido !"
        ],
        [
            "A este humano",
            "reprimido",
            "lo asusto con",
            "Dos Reales Envido"
        ],
        [
            "Estas cansado?",
            "Estas molido?",
            "Entonces refrescate",
            "con dos reales envido"
        ],
        [
            "A ver que te puedo",
            "cantar para no",
            "traumatizarte tanto ?",
            "Dos reales Envido !!"
        ],
        [
            "Que me escuches",
            "yo te pido.",
            "Y ahi van...",
            "Dos reales Envido"
        ]
    ],
    "say_falta_envido": [
        [
            "Pido gancho",
            "gancho pido",
            "Chupate esta",
            "Falta Envido !"
        ],
        [
            "No todo esta' perdido","contesta' esta",
            "Falta Envido"
        ],
        [
            "Si queres ganarme el",
            "partido,",
            "quereme esta",
            "falta envido"
        ],
        [
            "A este rival",
            "comedido",
            "lo echo con",
            "Falta Envido"
        ],
        [
            "A este neurotico",
            "compungido",
            "lo corro con",
            "la falta envido"
        ],
        [
            "Sos un adversario",
            "dormido.",
            "No importa:",
            "yo te despierto",
            "con un falta envido"
        ],
        [
            "No creas que",
            "me has vencido:",
            "Atajate esta",
            "Falta Envido"
        ],
        [
            "A que te achicas:",
            "Falta Envido"
        ],
        [
            "Para el tanto yo no",
            "tengo nada pero",
            "vos menos... asi que",
            "Falta Envido"
        ],
        [
            "Che, humano",
            "no sea tan altivo",
            "que yo lo desafio",
            "con una falta envido"
        ]
    ],
    "say_flor": [
        [
            "Que' cartas fuleras.",
            "Que'bronca, que dolor","No tengo otro",
            "consuelo",
            "que esta hermosa Flor"
        ],
        [
            "Ayer pase'",
            "por tu casa y me",
            "tiraste con una Flor",
            "Hoy cuando pase",
            "de nuevo:",
            "Sin maceta, por favor!"
        ],
        [
            "Tengo en la mano un misterio.",
            "Tengo en el alma un dolor.",
            "No se me ponga",
            "tan serio !",
            "En la mano tengo Flor"
        ],
        [
            "De los bichos:",
            "la cigarra,",
            "el verde como color",
            "en instrumentos:",
            "la guitarra...,",
            "y elijo al malvon de flor !!!"
        ],
        [
            "El paisano anda de",
            "negro, apero y facon",
            "Los Domingos va",
            "de blanco y en",
            "su sonrisa una Flor"
        ],
        [
            "Tengo un chancho color verde,",
            "un caballo volador,",
            "una gallina",
            "que muerde",
            "y en la mano",
            "tengo Flor"
        ],
        [
            "Por recostarme",
            "a tu reja",
            "tuve que ver al dotor","para sacarme la Flor",
            "que me clavaste",
            "en la oreja"
        ],
        [
            "Todo gaucho",
            "que presume de haber",
            "tenido un amor se queda",
            "con el perfume",
            "si se le pianta",
            "la Flor"
        ],
        [
            "Yo nunca he sido pintor,",
            "pero algo se' de colores,",
            "y para pintar las",
            "flores le doy",
            "amor a la Flor",
            "---Que' tal ??"
        ],
        [
            "En la esquina de arrabal",
            "por defender un amor",
            "me bordo'",
            "un barbeijo FLOR",
            "un Taura Animal"
        ]
    ],
    "say_con_flor_quiero": [
        [
            "Asi que canto' olorosa ?",
            "Esta' jugando con fuego",
            "Sabe cual es mi respuesta ?",
            "Mi respuesta es",
            "Con Flor Quiero !"
        ],
        [
            "Asi que te haces el guapo ?",
            "Y me estas jugando fiero ?",
            "Vas a perder el",
            "partido,",
            "porque yo...",
            "con flor quiero..."
        ],
        [
            "En la puerta de mi rancho",
            "hizo su nido un jilguero",
            "Todas las mananas",
            "canta:",
            "Con Flor Quiero ...",
            "Con Flor Quiero ..."
        ],
        [
            "Me gusta templar",
            "la voz con un canto verdadero",
            "y cuando me cantan Flor",
            "yo contesto",
            "con Flor Quiero"
        ],
        [
            "Mientras ganarte",
            "yo espero",
            "voy diciendo:",
            "Con Flor Quiero"
        ],
        [
            "Me toco' un rival",
            "humano 'liguero'",
            "pero yo",
            "igualmente canto:",
            "con Flor Quiero"
        ],
        [
            "No me gusta",
            "ser querendon",
            "pero ya que",
            "yo tambien ligue'",
            "entonces",
            "Con Flor Quiero"
        ],
        [
            "Se cruzaron las flores",
            "y no las palizas",
            "mejor asi",
            "entonces",
            "con flor quiero"
        ],
        [
            "Si por vos",
            "de amor me muero",
            "entonces",
            "con Flor Quiero"
        ],
        [
            "Me toco' un rival",
            "muy fiero",
            "Esta mano",
            "con flor Quiero"
        ]
    ],
    "say_con_flor_me_achico": [
        [
            "Yo juego mejor que Uste'",
            "y perder me importa",
            "un pito,",
            "y aunque me crea",
            "cobarde le dire'",
            "Con Flor Me Achico"
        ],
        [
            "Pa'ganarle a este rival",
            "es bastante lo que aplico,",
            "pero pa'esta ocasion",
            "cantare Con Flor",
            "me Achico"
        ],
        [
            "Le ganare por pucho",
            "y por eso yo no pico",
            "Parece que tiene mucho",
            "Por eso...",
            "con Flor me Achico"
        ],
        [
            "Buen dia dijo Jose",
            "Buen dia dijo Perico",
            "Que le gano ya lo se'","pero con Flor",
            "Me Achico"
        ],
        [
            "Mi china con la calor","traiba un",
            "gran abanico,yo",
            "le dije:",
            "Apantalla', por favor","que si no con",
            "Flor me Achico ..."
        ],
        [
            "Uste' me quiere",
            "pescar",
            "En ese anzuelo",
            "no pico","No me dejo",
            "acorralar y canto:",
            "Con Flor me Achico"
        ],
        [
            "Con los cuatros",
            "que sacas",
            "no te vas a hacer muy","rico pero igual",
            "te los ganas porque",
            "yo con Flor...",
            "me achico ..."
        ],
        [
            "Yo tambien ligue'",
            "pero por si acaso",
            "con Flor me Achico"
        ],
        [
            "Yo tengo lo mismo",
            "pero el palpito",
            "me dice que",
            "con Flor me Achico"
        ],
        [
            "Me parece que",
            "con Flor me Achico",
            "y me dejo de jorobar"
        ],
        [
            "Las olorosas se nos",
            "cruzaron, viste ?",
            "pero yo que tengo",
            "olfato declaro",
            "Con Flor me Achico"
        ]
    ],
    "say_truco": [
        [
            "Tengo apuro por ganar","y no quiero padecer,",
            "Truco te voy a cantar","Para poderte vencer"
        ],
        [
            "Jugaron una carrera",
            "el sapo y la",
            "comadreja.",
            "El sapo al",
            "aventajarla le dijo",
            "Truco en la oreja"
        ],
        [
            "Te noto muy asustado",
            "o sera' que viste al cuco ?",
            "Y aunque parezca",
            "apurado",
            "te via'",
            "cantar el Truco"
        ],
        [
            "Tengo un vagon en la mano",
            "Por eso no puedo jugar,",
            "y aunque te parezca",
            "en vano,",
            "Truco tengo",
            "que cantar"
        ],
        [
            "Pa'pintar una pared",
            "Tuve que usar",
            "mameluco,",
            "y pa'ganarle a Uste'",
            "tengo que hacerle",
            "algun truco"
        ],
        [
            "Cuando me pongo a rimar",
            "muchas veces me trabuco,",
            "si el tanto",
            "quiero cantar",
            "a veces me sale truco"
        ],
        [
            "Pa' poder salir del bosque",
            "muchas plantas yo machuco",
            "Pa' ganarle a Uste'",
            "no hay otra",
            "que cantar Truco"
        ],
        [
            "Si queres",
            "jugar conmigo",
            "no te hagas el pituco","yo te quiero ganar",
            "porque estoy jugando",
            "al Truco"
        ],
        [
            "No me importa si sos",
            "tan bruto",
            "con tal que",
            "me aceptes",
            "mi modesto truco"
        ],
        [
            "Turco... este...",
            "Bueno ! Digo Truco !!"
        ],
        [
            "Dejame pensar... Bah",
            "Ni siquiera merece",
            "esto ser pensado...",
            "Vas a ver que' inspiracion la mia:",
            "Te digo Truco, y a",
            "otra cosa, che"
        ]
    ],
    "say_quiero_retruco": [
        [
            "Jugas como un",
            "viejo caduco",
            "Yo te voy a sacudir",
            "con mi Quiero Retruco"
        ],
        [
            "Viene muy facil la cosa...",
            "me lo llevo",
            "al campo Santo,",
            "Me queda una carta hermosa",
            "y quiero Retruco canto ..."
        ],
        [
            "Me parece que esta'",
            "frito, eso espero...",
            "y como yo tengo",
            "el quiero",
            "quiero Retruco",
            "le grito !"
        ],
        [
            "Tengo poca inspiracion.",
            "Cuando tengo que mentir",
            "Me traiciona la pasion:",
            "Quiero Retruco, y morir"
        ],
        [
            "A mi esposa quiero,",
            "A mi hijo educo,",
            "y a vos companero,",
            "quiero Retruco !!"
        ],
        [
            "En mi casa de verano",
            "se come fideos con tuco,",
            "y el partido yo te gano",
            "con este quiero Retruco !"
        ],
        [
            "Pensaste que",
            "me achicaba o que ibaa salir corriendo.",
            "Te voy a dar",
            "flor de biaba quiero",
            "Retruco mintiendo"
        ],
        [
            "Barrunto que esta' mintiendo,",
            "no le tengo miedo al cuco",
            "y en sus ojos estoy viendo",
            "ansias de un Quiero Retruco !!"
        ],
        [
            "No temas al Diablo...","No temas al Cuco...",
            "Si tenes",
            "naipes buenos quereme","este quiero Retruco"
        ],
        [
            "A ver... A ver...",
            "Mi olfato me dice te",
            "gasto si me aceptas",
            "un Quiero Retruco,",
            "che"
        ]
    ],
    "say_quiero_vale_cuatro": [
        [
            "Que' bronca",
            "Que' maltrato",
            "Ya te voy a dar digo",
            "Quiero Vale Cuatro"
        ],
        [
            "Mi china se recosto'",
            "con un",
            "sospechoso sapo",
            "y cuando desperto'",
            "le dijo: Mi amor !",
            "Quiero Vale Cuatro !"
        ],
        [
            "Uste' ...",
            "que juega conmigo",
            "me ve' pinta de aparato,",
            "Tengo adentro un",
            "Enano que chiya:",
            "Mi amigo, quiero Vale Cuatro !!"
        ],
        [
            "Ya cayo'",
            "el chivo en el lazo,",
            "y el rival no es para tanto",
            "te via' dar con un",
            "hachazo quiero",
            "Vale Cuatro canto !!"
        ],
        [
            "Esta guitarra gastada","fue' encontrada",
            "en un teatro",
            "y aunque no he ligadonada, canto",
            "quiero Vale Cuatro !"
        ],
        [
            "Ganarme esta partida",
            "te dara' mucho trabajo.",
            "Te costara' mas todavia",
            "si yo Quiero Vale Cuatro !"
        ],
        [
            "Te enterraste",
            "hasta el espanto",
            "No vas a poder salir,","Quiero vale cuatro canto",
            "y me voy a divertir"
        ],
        [
            "Aqui me pongo a jugar","al compas",
            "de la mentira",
            "Canto quiero",
            "vale cuatro",
            "Tengo un tres",
            "y no se estira"
        ],
        [
            "Este alarde",
            "de guapeza se me hace","que es teatro,",
            "la cosa recien--",
            "--empieza.",
            "Quiero....",
            "Quiero vale cuatro"
        ],
        [
            "Hasta aqui te haces el gallo",
            "Yo te via' dejar--",
            "-- pollito,",
            "y este canto no lo--",
            "--callo, quiero--",
            "-- vale cuatro grito"
        ],
        [
            "La Pampa,",
            "en su inmensidad,",
            "tiene al ombu' de testigo.",
            "Que ligue'",
            "una cantidad Quiero",
            "Vale Cuatro digo"
        ]
    ],
    "say_contraflor_al_resto": [
        [
            "Te voy a dar flor",
            "de pesto,",
            "Flor y por si",
            "eso era poco...",
            "Contraflor al Resto"
        ],
        [
            "El otro dia a mi pingo",
            "se le quedo' el cabestro,",
            "y al verme pasar",
            "un gringo, dijo",
            "contraflor al resto"
        ],
        [
            "No esta'",
            "sintiendo una aroma ?","y no me dira'",
            "que apesto !",
            "Aunque su flor no sea broma",
            "canto ...",
            "contraflor al resto"
        ],
        [
            "Si te crees que estas de suerte",
            "te voy a dar",
            "un gran pesto,",
            "Ni al espejo podes",
            "verte Flor",
            "y Contraflor Al Resto",
        ],
        [
            "Que' barajas,",
            "aparcero.",
            "Tira' las tuyas",
            "al cesto.",
            "O recula', te sugiero","Digo Contraflor",
            "al Resto"
        ],
        [
            "Que' me dice",
            "si le hago esto ?",
            "Devolviendole su flor",
            "con Contraflor",
            "al Resto !!"
        ],
        [
            "Yo a vos te tengo",
            "que matar.",
            "Como ? dandote",
            "el pesto con",
            "contraflor al resto"
        ],
        [
            "Con Uste' ya no me",
            "queda ningun",
            "buen gesto.",
            "Yo le devuelvo con",
            "Contraflor al Resto"
        ],
        [
            "Uy, uy,uy, que pesto",
            "ahora te zampo el",
            "Contraflor al Resto",
            "Que' tal ?",
            "No juego tan mal,",
            "Verdad ?"
        ]
    ]
}

const fallbackText = (action) => {
    let text = '';
    switch (action.name) {
        case 'say_envido':
            text = 'Envido';
            break;
        case 'say_real_envido':
            text = 'Real envido';
            break;
        case 'say_falta_envido':
            text = 'Falta envido';
            break;
        case 'say_truco':
            text = 'Truco';
            break;
        case 'say_envido_score':
        case 'say_flor_score':
            text = `${action.score}`;
            break;
        case 'say_envido_quiero':
        case 'say_truco_quiero':
            if (action.forced) {
                text = 'Quiero obligado';
            } else {
                text = 'Quiero';
            }
            break;
        case 'say_quiero_retruco':
            text = 'Quiero retruco';
            break;
        case 'say_quiero_vale_cuatro':
            text = 'Quiero vale cuatro';
            break;
        case 'say_envido_no_quiero':
        case 'say_truco_no_quiero':
            text = 'No quiero';
            break;
        case 'say_son_buenas':
        case 'say_flor_son_buenas':
            text = 'Son buenas';
            break;
        case 'say_son_mejores':
        case 'say_flor_son_mejores':
            console.log(action);
            text = `${action.score} son mejores`;
            break;
        case 'say_me_voy_al_mazo':
            text = 'Me voy al mazo';
            break;
        case 'reveal_card':
        case 'reveal_envido_score':
        case 'reveal_flor_score':
            text = `${action.score} en mesa`;
            break;
        case 'say_flor':
            text = 'Flor';
            break;
        case 'say_contraflor_al_resto':
            text = 'Contraflor al resto';
            break;
        case 'say_contraflor':
            text = 'Contraflor';
            break;
        case 'say_con_flor_quiero':
            text = 'Con flor quiero';
            break;
        case 'say_con_flor_me_achico':
            text = 'Con flor me achico';
            break;
        default:
            break;
    }
    return [text];
}

const getLines = (action) => {
    if (action === null) {
        return [];
    }
    if (actionTexts[action.name]) {
        const options = actionTexts[action.name];
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    }
    return fallbackText(action);
}

const getSpeechBubbleClass = (lines) => {
    switch (lines.length) {
        case 1:
            return "speech-bubble small-speech-bubble";
        case 2, 3, 4:
            return "speech-bubble medium-speech-bubble"
        case 0:
            return "speech-bubble hidden";
        default:
            return "speech-bubble";
    }
}

const getAction = (playerID, lastActionLog) => {
    if (!lastActionLog) {
        return null;
    }
    const { playerID: actionPlayerID, action } = lastActionLog;
    if (playerID === actionPlayerID) {
        return null;
    }
    if (action.name === 'reveal_card' && !action.en_mesa) {
        return null;
    }
    if (action.name === 'say_me_voy_al_mazo') {
        return null;
    }
    return action;
}

const SpeechBubble = ({ playerID, lastActionLog, dijeTruco }) => {
    const [showDijeTruco, setShowDijeTruco] = useState(false);

    useEffect(() => {
        if (!dijeTruco) {
            setShowDijeTruco(false);
            return;
        }
        const timer = setTimeout(() => {
            setShowDijeTruco(true);
        }, 2000);

        return () => clearTimeout(timer); // Cleanup the timeout on component unmount
    }, [dijeTruco]); // Add dijeTruco as a dependency

    const action = getAction(playerID, lastActionLog);
    let lines = getLines(action);
    let speechBubbleClass = getSpeechBubbleClass(lines);

    if (showDijeTruco) {
        lines = ['Dije truco...'];
        speechBubbleClass = "speech-bubble small-speech-bubble";
    }

    return (
        <div className="speech-bubble-container column">
            <div className={speechBubbleClass}>
                <div className="speech-bubble-text">
                    {lines.map((line, index) => (
                        <p key={index}>{line}</p> // Ensure key is unique and consistent
                    ))}
                </div>
                <div className="speech-bubble-arrow"></div>
            </div>
        </div>
    );
};


export default SpeechBubble;