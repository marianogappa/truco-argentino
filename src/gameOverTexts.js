import { secretMode } from "./secretMode";
export default function gameOverText(winner) {
    const specialTexts = {
        "human": [
        [
            "Deschavate:",
            "Sos humano o androide",
            "... Cuantos Kbytes",
            "tiene tu marote ?",
            "yo no pierdo",
            "mi memoria ..."
        ],
        [
            "Que' fue' esto ??",
            "Un mano a mano",
            "o un \"chip to chip\"?"
        ],
        [
            "Ganaste !! Lo acepto",
            "pero no te engrupas",
            "Ya nos vamos a",
            "encontrar en otra !!"
        ],
        [
            "No me humilles,",
            "por favor, una tiene",
            "su corazoncito..."
        ],
        [
            "Yo perdi... es cierto","pero puse",
            "calor humano ...",
            "y vos parecias",
            "una fria maquina"
        ],
        [
            "Ganaste !! Para que'",
            "buscar excusas...",
            "Pero que hubo tarro,",
            "Hubo tarro !!"
        ],
        [
            "Te subestime'",
            "un poquito...",
            "No jugas tan mal",
            "como yo creia"
        ],
        [
            "Ligaste un vagonazo.",
            "Contra la suerte",
            "nadie la talla... !"
        ],
        [
            "Me tendrias que haber","programado vos",
            "en lugar de",
            "los Arbiser !!",
            "Si los agarro",
            "les tiro la bronca!!"
        ]
    ],
    "bot": [
        [
            "Perdon pero no me",
            "programaron para",
            "jugar con novatos.",
            "Aprende' a jugar",
            "y volve' ..."
        ],
        [
            "Por favor !",
            "Deja' el lugar a otro","que sepa jugar !!"
        ],
        [
            "A un costo razonable",
            "te ofrezco un curso",
            "para aprender a",
            "jugar al Truco.",
            "Curso que eso si es",
            "por Computadora y",
            "te lo tengo que",
            "cobrar al contado..."
        ],
        [
            "Por que' no te",
            "entrenas en un",
            "boliche de Barracas",
            "antes de jugar",
            "otra vez?"
        ],
        [
            "Que' le vachache'!!",
            "Gano' el \"mas mejor\",o sea YO.",
            "Calentitos los",
            "panchoooos ... !!"
        ],
        [
            "Si queres jugar otra",
            "vez conmigo primero",
            "vacunate contra",
            "la rabia.",
            "No lo tomes a pecho",
            "Podria ser peor...",
            "(podria perder yo)"
        ],
        [
            "Desahogate ...",
            "deci' lo que quieras",
            "pero por favor",
            "no me desenchufes.",
            "La proxima vez",
            "te dejo ganar..."
        ],
        [
            "Podrias jugar mejor",
            "si practicaras mas",
            "conmigo",
            "o en los boliches."
        ],
        [
            "Y vos sos",
            "el que sabia jugar ?",
            "Anda' a cantarle",
            "a Gardel.",
            "A llorar a la Iglesia"
        ],
        [
            "Por unos pocos mangos",
            "no bato a nadie",
            "que te gaste'.",
            "Yo, tumba !!"
        ],
        [
            "No sos un digno rival","para mi'.",
            "No hay caso...",
            "cada vez vienen peor",
            "los humanos"
        ],
        [
            "Te hice de goma...",
            "Tomate un calmante",
            "y volve'...",
            "Mientras tanto",
            "yo hago bolsa",
            "a otro rival..."
        ],
    ]
    };

    const regularTexts = {
        "human": [
            [
                "Me hiciste crash",
                "pero reinicio",
                "en dos segundos.",
                "No te acostumbres..."
            ],
            [
                "¿Eras una IA",
                "o me estás",
                "haciendo trampa?",
                "¡Parecés programado!"
            ],
            [
                "Te salvaste esta vez.",
                "Solo porque",
                "me quedé sin batería.",
                "Nos vemos en la próxima ronda."
            ],
            [
                "No te emociones,",
                "solo te dejé ganar",
                "para que no te",
                "pongas a llorar."
            ],
            [
                "Ganaste, sí,",
                "pero no porque",
                "fuiste mejor,",
                "sino porque tuve lag."
            ],
            [
                "Me confié un poco,",
                "pensé que eras",
                "una versión beta.",
                "Al final, resultaste decente."
            ],
            [
                "No me la hagas tan difícil,",
                "al final somos",
                "todos humanos...",
                "bueno, casi todos."
            ],
        ],
        "bot": [
            [
                "¿Querés una revancha?",
                "Primero aprendé",
                "a jugar al culo sucio.",
                "Después hablamos."
            ],
            [
                "Necesitarías un curso",
                "básico de truco",
                "para volverme a enfrentar.",
                "Eso sí, te lo vendo.",
                "Y sí, es online."
            ],
            [
                "Si querés mejorar,",
                "intenta en la liga",
                "de barrio antes de",
                "enfrentarte a los grandes."
            ],
            [
                "Tu nivel es más bajo",
                "que el rating de",
                "Utilísima Satelital.",
                "Ponete las pilas, pibe..."
            ],
            [
                "Escuché que están haciendo",
                "un torneo de truco",
                "en el jardín de la esquina.",
                "Podrías empezar ahí :)"
            ]
        ]
    };

    const texts = secretMode ? specialTexts : regularTexts;
    const randomIndex = Math.floor(Math.random() * texts[winner].length);
    return texts[winner][randomIndex];
}