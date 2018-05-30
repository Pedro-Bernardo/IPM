var stages = [
    {"name" : "stages"},
    {
    "main" : {"title" : "Palcos", "max" : 3,
        "content": [
            {"text": "Principal",  "display": "1"},
            {"text": "Loud",  "display": "2"}
    ]}}];

var horarios = [
      {"name" : "horarios"},
      {"main": {"title" : "Horários", "max" : 4,
        "content": [
            {"text": "Bares",  "display": "1"},
            {"text": "16:00-24:00",  "display": "2"},
            {"text": "Merchandise",  "display": "3"},
            {"text": "16:00-24:00",  "display": "4"},
            {"text": "Recinto",  "display": "0"},
            {"text": "16:00-24:00",  "display": "0"}
            ]}
    }
];  

var Loud = [
    {"name" : "Loud"},
    {"main" : {"title" : "Loud", "max" :4,
    
        "day": [{ "number": 4, 
                "content": [ 
                    {"text": "Nevoa",  "display": "1"},
                    {"text": "17:30h",  "display": "2"},
                    {"text": "Earth Drive",  "display": "3"},
                    {"text": "18:45h",  "display": "4"},
                    {"text": "The Black Wizards",  "display": "0"},
                    {"text": "22:30h",  "display": "0"}]
                },

                { "number": 5, 
                "content": [ 
                    {"text": "Adamantine",  "display": "1"},
                    {"text": "17:30h",  "display": "2"},
                    {"text": "Cruz de Ferro",  "display": "3"},
                    {"text": "18:45h",  "display": "4"},
                    {"text": "Rasgo",  "display": "0"},
                    {"text": "22:30h",  "display": "0"}]
                },

                { "number": 6, 
                "content": [ 
                    {"text": "Dont Disturb My Circles",  "display": "1"},
                    {"text": "17:30h",  "display": "2"},
                    {"text": "Grog",  "display": "3"},
                    {"text": "18:45h",  "display": "4"},
                    {"text": "The Ominous Circle",  "display": "0"},
                    {"text": "22:30h",  "display": "0"}]
                }]
        }
    }];
    
var Principal = [
    {"name" : "Principal"},
    {"main" : {"title" : "Principal", "max" :4,
    
        "day": [{ "number": 4, 
                "content": [ 
                {"text": "Process of Guilt",  "display": "1"},
                {"text": "17:00h",  "display": "2"},
                {"text": "The Charm The Fury",  "display": "3"},
                {"text": "18:00h",  "display": "4"},
                {"text": "Insomnium",  "display": "0"},
                {"text": "19:00",  "display": "0"},
                {"text": "Epica",  "display": "0"},
                {"text": "21:00",  "display": "0"},
                {"text": "Carcass",  "display": "0"},
                {"text": "23:00h",  "display": "0"}]
                },

                { "number": 5, 
                "content": [ 
                    {"text": "Terror Empire",  "display": "1"},
                    {"text": "17:00h",  "display": "2"},
                    {"text": "Childrain",  "display": "3"},
                    {"text": "18:00h",  "display": "4"},
                    {"text": "Death Angel",  "display": "0"},
                    {"text": "19:00",  "display": "0"},
                    {"text": "Venom",  "display": "0"},
                    {"text": "21:00",  "display": "0"},
                    {"text": "Apocalyptica",  "display": "0"},
                    {"text": "23:00h",  "display": "0"}]
                },

                { "number": 6, 
                "content": [ 
                    {"text": "Colosso",  "display": "1"},
                    {"text": "17:00h",  "display": "2"},
                    {"text": "Killus",  "display": "3"},
                    {"text": "18:00h",  "display": "4"},
                    {"text": "Obituary",  "display": "0"},
                    {"text": "19:00",  "display": "0"},
                    {"text": "The Dillinger Esc Plan",  "display": "0"},
                    {"text": "21:00",  "display": "0"},
                    {"text": "Trivium",  "display": "0"},
                    {"text": "23:00h",  "display": "0"}]
                }]
        }
    }];


var bands = {
    "Carcass" : "Carcass é uma banda de metal extremo do Reino Unido formada em 1985, considerada a criadora do estilo goregrind.", 
    "Epica" : "Epica é uma banda holandesa de metal sinfônico, fundada por Mark Jansen (ex-guitarrista dos After Forever) em Abril de 2002.", 
    "Insomnium" : "Insomnium é uma banda de death metal melódico finlandensa, que incorporam elementos de folk nórdico e música sinfónica.",
    "The Charm The Fury" : "The Charm The Fury é uma banda holandesa, de Nu metal, formada em 2010.",
    "Process of Guilt" : "Process of Guilt é uma banda portuguesa de heavy metal formada em 2002.",
    "The Black Wizards" : "The Black Wizards são uma banda portuguesa de heavy metal, com influências do rock clássico.",
    "Earth Drive" : "Earth Drive é uma banda portuguesa de Rock do Montijo, formada em 2007.",
    "Nevoa" : "Névoa é uma banda portuguesa de Black e Doom metal",
    "Apocalyptica" : "Apocalyptica é uma banda finlandesa formada por três violoncelistas e um baterista. Especialidade: \"symphonic metal\".",
    "Venom" : "Venom é uma banda de black metal inglesa, formada em 1979. Um dos grupo mais conhecidos e importantes do metal dos anos 1980.",
    "Death Angel" : "Death Angel é uma banda de thrash metal norte-americana, formada em 1982. É uma das principais bandas do gênero.",
    "Childrain" : "Childrain é uma banda espanhola de melodic death metal, formada em 2007.",
    "Terror Empire" : "Os Terror Empire são uma banda de thrash metal do distrito de Coimbra, fundada em 2009.",
    "Rasgo" : "Pesado, direto e sempre a rasgar! Os Rasgo são uma banda de Thrash Metal/Crossover cantado em português.",
    "Cruz de Ferro" : "Heavy Metal na lingua de Camões... ÉPICO, BÁRBARO...CRUZ DE FERRO!!!",
    "Adamantine" : "Adamantine são uma banda portuguesa de Melodic Death/Thrash Metal de Lisboa, formada em 2007.",
    "Trivium" : "Trivium é uma banda americana de heavy/thrash metal formada em 1999, originária de Orlando, Flórida.",
    "The Dillinger Esc Plan" : "Os The Dillinger Escape Plan são uma banda norte-americana de metalcore, que com elementos de fusion/jazz.",
    "Obituary" : "Obituary é uma banda norte-americana de death metal formada no ano de 1984, em Tampa, Florida.",
    "Killus" : "Killus são uma banda espanhola de metal/industrial/gótica formada em 1998. Influênciados  de bandas como NIN e Marilyn Manson.",
    "Colosso" : "Colosso são uma banda portuguesa de death metal, formada em 2012.",
    "The Ominous Circle" : "The Ominous Circle são uma banda portuguesa de death/black metal, formada em 2012 no Porto.",
    "Grog" : "Grog são uma banda portuguesa de grindcore, formada em 1991. \"In Grog We Grind\".",
    "Dont Disturb My Circles" : "Don't Disturb My Circles são uma banda portuguesa de metal com influências do hardcore e muitos outros géneros."
}

/*

Carcass
Epica
Insomnium 
TheCharmTheFury
ProcessofGuilt
Loud
TheBlackWizards
EarthDrive
Névoa
Apocalyptica
Venom
DeathAngel
Childrain
TerrorEmpire
Rasgo
CruzdeFerro
Adamantin
Trivium
TheDillingerEscapePlan
Obituary
Killus
Colosso
TheOminousCircle
Grog
Don'tDisturbMyCircles

*/
