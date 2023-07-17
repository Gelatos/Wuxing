// =================================================
// Calculator
// =================================================

function GetAdjustedResolveAndMorale(baseResolve, baseMorale, modMorale, modResolve) {

    if (modResolve == undefined) {
        modResolve = 0;
    }
    var resolveObj = {
        resolve: parseInt(baseResolve),
        morale: parseInt(baseMorale)
    }
    // add the modify values
    resolveObj.resolve += parseInt(modResolve);
    resolveObj.morale += parseInt(modMorale);

    var moraleLoopIsDone = false;
    var nextMoraleValue = 0;
    while (!moraleLoopIsDone) {
        nextMoraleValue = 10 + (resolveObj.resolve * 10);
        if (resolveObj.morale >= nextMoraleValue) {
            resolveObj.morale -= nextMoraleValue;
            resolveObj.resolve++;
        } else {
            moraleLoopIsDone = true;
        }
    }

    return resolveObj;
}

function GetAdjustedFateAndKarma(baseFate, baseKarma, gainedKarma) {

    var fateObj = {
        fate: parseInt(baseFate),
        karma: parseInt(baseKarma)
    }
    fateObj.karma += parseInt(gainedKarma);
    const karmaMax = 50;

    while (fateObj.karma >= karmaMax) {
        fateObj.karma -= karmaMax;
        fateObj.fate++;
    }

    return fateObj;
}

function GetPlayerCharactersList() {
    return GetWuxingPlayerDirectMessageData();
}

function GetWuxingPlayerDirectMessageData() {
    let playerDirectMessageData = [];
    
    playerDirectMessageData.push(CreatePlayerCharacterData("GM", []));
    playerDirectMessageData.push(CreatePlayerCharacterData("Jacob", ["arete", "cagar", "edward", "flora", "ivan", "leo", "othin", "shivali"]));
    playerDirectMessageData.push(CreatePlayerCharacterData("Matthew", ["ajna", "chirapa", "cure", "dheval", "kit", "lorna", "marigold", "mitr", "nageem", "samiel", "vinaya"]));
    playerDirectMessageData.push(CreatePlayerCharacterData("Nick", ["ajay", "baxter", "maxwell", "soma", "tashi"]));
    playerDirectMessageData.push(CreatePlayerCharacterData("Isaac", ["fahim", "ineke", "lizzy", "logan"]));
    playerDirectMessageData.push(CreatePlayerCharacterData("Braden", ["kana"]));

    return playerDirectMessageData;
}

function CreatePlayerCharacterData(playerName, characterList) {
    return {
        player: playerName,
        characters: characterList,
        messageData: [],

        hasActor: function (actor) {
            actor = actor.trim().toLowerCase();
            return this.characters.includes(actor);
        }
    };
}

// ===== Generators
// =================================================

function GetBlankCharacter() {
    return {
        name: "",
        nationality: "",
        nature: "",
        ancestry: "",
        gender: "",
        classCategory: "",
        sector: "",
        profession: "",
        rapport: 0,
        favors: 0
    };
}

function CharacterNationalityGenerator() {
    var rnd = Math.floor(Math.random() * 5);
    switch (rnd) {
        case 0:
            return "Minerva";
        case 1:
            return "Apollo";
        case 2:
            return "Juno";
        case 3:
            return "Ceres";
        case 4:
            return "Liber";
        default:
            return "Minerva";
    }
}

function CharacterRaceGenerator(nationality) {
    var races = [];

    // change the odds based on nationality
    switch (nationality) {
        case "Minerva":
            races = GetRaceList(60, 12, 10, 17, 1);
            break;
        case "Apollo":
            races = GetRaceList(3, 85, 2, 10, 0);
            break;
        case "Juno":
            races = GetRaceList(3, 2, 80, 10, 5);
            break;
        case "Ceres":
            races = GetRaceList(10, 30, 4, 55, 1);
            break;
        case "Liber":
            races = GetRaceList(1, 0, 2, 2, 95);
            break;
        default:
            races = GetRaceList(20, 20, 20, 20, 20);
            break;
    }

    // roll on the randomizer
    var rnd = Math.floor(Math.random() * 100);

    for (var i = 0; i < races.length; i++) {
        if (rnd < races[i].odds) {
            return races[i].race;
        }
        rnd -= races[i].odds;
    }

    return "Coastborne";
}

function CharacterGenderGenerator() {
    var rnd = Math.floor(Math.random() * 2);
    if (rnd == 0) {
        return "Male";
    } else {
        return "Female";
    }
}

function CharacterNameGenerator(nationality, race, gender) {
    var firstNameList = [""];
    var lastNameList = [""];
    var firstName = "";
    var lastName = "";
    var rnd = 0;

    // Choose whether to select a name based on race or nationality. 
    rnd = Math.random() * 100;

    // The logic here is that race has less of an effect than nationality on first names
    if (rnd < 70) {
        firstNameList = GetNameList(nationality, gender);
    } else {
        firstNameList = GetNameList(race, gender);
    }

    // The logic here is that race has more of an effect than nationality on last names
    if (rnd < 15) {
        lastNameList = GetNameList(nationality, "last");
    } else {
        lastNameList = GetNameList(race, "last");
    }

    // choose the names
    firstName = firstNameList[Math.floor(Math.random() * firstNameList.length)];
    lastName = lastNameList[Math.floor(Math.random() * lastNameList.length)];

    if (lastName != "") {
        return firstName + " " + lastName;
    } else {
        return firstName;
    }
}

function CharacterNatureGenerator() {
    var natures = GetNatureList();

    var rnd = Math.floor(Math.random() * natures.length);

    return natures[rnd];
}

function CharacterClassGenerator(venueClass) {
    // set up variables
    var maxRoll = 0;
    var eliteRoll = 0;
    var highRoll = 0;
    var mediumRoll = 0;
    var lowRoll = 0;


    // these represent ratios or chances each class might show up
    var eliteMod = 1;
    var highMod = 9;
    var mediumMod = 60;
    var lowMod = 120;


    // first we need to determine the maxRoll value which represents the highest possible roll
    maxRoll += eliteMod;
    eliteRoll = maxRoll;
    maxRoll += highMod;
    highRoll = maxRoll;


    // add the other sets if the class is potentially lower
    if (venueClass != "High") {
        maxRoll += mediumMod;
        mediumRoll = maxRoll;
    }
    if (venueClass != "High" && venueClass != "Medium") {
        maxRoll += lowMod;
        lowRoll = maxRoll;
    }


    // select a random number within the Max Range
    var rnd = Math.floor(Math.random() * maxRoll);


    // return a class
    if (rnd <= eliteRoll) {
        return "Elite";
    } else if (rnd <= highRoll) {
        return "High";
    } else if (rnd <= mediumRoll) {
        return "Medium";
    } else {
        return "Low";
    }
}

function CharacterSectorGenerator(classCategory) {
    var sectors = GetSectorProbabilityList(classCategory);
    var i = 0;

    // determine the number of odds
    var maxRnd = 0;
    for (i = 0; i < sectors.length; i++) {
        maxRnd += sectors[i].odds;
    }

    // select a random sector
    var rnd = Math.floor(Math.random() * maxRnd);
    for (i = 0; i < sectors.length; i++) {
        if (rnd < sectors[i].odds) {
            return sectors[i].sector;
        }
        rnd -= sectors[i].odds;
    }

    return "";
}

function CharacterProfessionGenerator(classCategory, sector) {
    var professions = GetProfessionList(sector);
    var professionsList = [];

    switch (classCategory) {
        case "Elite":
            professionsList = professions.elite;
            break;
        case "High":
            professionsList = professions.high;
            break;
        case "Medium":
            professionsList = professions.medium;
            break;
        case "Low":
        default:
            professionsList = professions.low;
            break;
    }

    // select a random number within the list
    var rnd = Math.floor(Math.random() * professionsList.length);

    return professionsList[rnd];
}

// ====== Databases
// =================================================

function GetExpToNextLevel(level) {

    // set exp
    switch (level) {
        case 1:
            return "300";
        case 2:
            return "900";
        case 3:
            return "2700";
        case 4:
            return "6500";
        case 5:
            return "14000";
        case 6:
            return "23000";
        case 7:
            return "34000";
        case 8:
            return "48000";
        case 9:
            return "64000";
        case 10:
            return "85000";
        case 11:
            return "100000";
        case 12:
            return "120000";
        case 13:
            return "140000";
        case 14:
            return "165000";
        case 15:
            return "195000";
        case 16:
            return "225000";
        case 17:
            return "265000";
        case 18:
            return "305000";
        case 19:
            return "355000";
        default:
            return "0";
    }
}

function GetRaceList(coastOdds, sunOdds, sandOdds, plainsOdds, frostOdds) {
    return [{
            race: "Coastborne",
            odds: 20
        },
        {
            race: "Suntouched",
            odds: 20
        },
        {
            race: "Sandfolk",
            odds: 20
        },
        {
            race: "Plains-kin",
            odds: 20
        },
        {
            race: "Frostcloaked",
            odds: 20
        },
    ];
}

function GetNameList(nationality, nameType) {
    switch (nationality.toLowerCase()) {
        case "apollo":
        case "suntouched":
            if (nameType.toLowerCase() == "male") {
                return [
                    "Adalbert", "Alban", "Albrecht", "Alexei", "Alfons", "Alois", "Anselm", "Armin", "Aurel",
                    "Beat", "Bernd", "Borya", "Burchard", "Burkhart",
                    "Christoph", "Claus", "Conrad",
                    "Demyan", "Detleff", "Diederich", "Dieter", "Dima", "Dimitri", "Dorofey",
                    "Eckart", "Egon", "Elmar", "Emil", "Engel", "Erhard", "Ernst", "Eugen", "Ewald",
                    "Falk", "Fedot", "Feliks", "Ferdinand", "Filipp", "Fiete", "Franz", "Friedrich",
                    "Gebhard", "Genya", "Germain", "Gilbert", "Gottfried", "Gotthold", "Grigory", "Gunter",
                    "Hagen", "Hartmut", "Heike", "Heiner", "Helmut", "Hilmar", "Horst",
                    "Ignatz", "Ingo", "Ipati", "Irinei", "Isidor", "Ivo",
                    "Jorg", "Julian", "Lustus",
                    "Karlmann", "Kaspar", "Kirill", "Kolman", "Kolya", "Kurt",
                    "Lars", "Laurenz", "Lavrenti", "Leonid", "Levin", "Lothar", "Ludwig", "Lutz", "Lyov",
                    "Maks", "Malte", "Manfried", "Maxim", "Meine", "Meino", "Miron", "Mitya", "Moritz",
                    "Nikifor", "Nikon", "Nil",
                    "Onisim", "Otmar", "Otto",
                    "Patya", "Pavel", "Platon", "Prokhor", "Quirin",
                    "Radimir", "Rainer", "Reimund", "Rein", "Renat", "Reto", "Rodion", "Rolan", "Rudi",
                    "Sanya", "Serafim", "Sevastian", "Shura", "Sieger", "Sievert", "Slava", "Stas", "Stepan",
                    "Taras", "Terentity", "Thiemo", "Tikhon", "Tillo", "Timofey", "Timur", "Traugott",
                    "Udo", "Ueli", "Ulli", "Ulrich", "Utz",
                    "Vadim", "Valeri", "Varlam", "Vasily", "Veit", "Vilen", "Vitya", "Vladilen", "Volker",
                    "Waldemar", "Wenzil", "Werner", "Wessel", "Wiebe", "Witold", "Wolfram",
                    "Xaver", "Yarik", "Yegor", "Yuli", "Yuri", "Zinovy"
                ];
            } else if (nameType.toLowerCase() == "female") {
                return [
                    "Adelina", "Agnes", "Aksinya", "Alexa", "Alida", "Amalya", "Anfisa", "Arina", "Ava",
                    "Barbel", "Boleslava", "Brunhilde",
                    "Cacilie", "Cathrin", "Celine", "Christel", "Clara", "Cora", "Cornelia",
                    "Darya", "Diana", "Dietlinde", "Dorothea", "Dunya",
                    "Edel", "Elena", "Elfriede", "Emilia", "Erna", "Esfir", "Evelin",
                    "Faina", "Felicitas", "Franka", "Fritzi", "Fyokla",
                    "Galya", "Gennadiya", "Gerhild", "Gisela", "Greta", "Gunda",
                    "Hedy", "Heike", "Helena", "Helmine", "Hermine", "Hiltraud",
                    "Imke", "Inna", "Irina", "Iris", "Irmetrud", "Isidora", "Isolde", "Ivonne",
                    "Juliane",
                    "Karina", "Kasmira", "Kathe", "Kiki", "Klava", "Konstanze", "Kristiane",
                    "Lada", "Leonie", "Lore", "Ludmila", "Luise", "Lutgard", "Lyubov",
                    "Margit", "Marta", "Meta", "Mila", "Monika",
                    "Nadine", "Nata", "Nele", "Nicole", "Ninel", "Nora",
                    "Oda", "Oksana", "Olesya", "Ortrun", "Ottilie",
                    "Phillomena", "Phyllis", "Pia", "Priska",
                    "Rada", "Regine", "Reinhild", "Renate", "Rita", "Rosalie",
                    "Salome", "Selena", "Sieglinde", "Silke", "Sofya", "Sveta",
                    "Taisiya", "Tresa", "Theda", "Tonya",
                    "Ulrike", "Ursel", "Uschi", "Ute", "Varya", "Vaska", "Veron", "Vreni",
                    "Wenke", "Wilhemina", "Yesfir", "Yvonne", "Zella", "Zina", " Ziska", "Zoya"
                ];
            } else {
                return [
                    "Baifan", "Baihou", "Baikwan", "Baitang",
                    "Chandu", "Chanhu", "Chanlam", "Chenma", "Chensun", "Chenwu",
                    "Choubai", "Choujiang", "Chouzhao", "Chowguan", "Chowlin", "Chowtan",
                    "Ducheung", "Duhou", "Duli", "Dupan", "Fanchou", "Fanhuang", "Fanlau", "Fanwen",
                    "Guanhou", "Guansun", "Guanxu", "Guanzhou", "Guochan", "Guojin", "Guoli", "Guoruan",
                    "Hancheung", "Hankuang", "Hansong", "Hanzhao", "Houchen", "Houliao",
                    "Housong", "Houwong", "Hujin", "Hulam", "Hutan", "Huwong",
                    "Jianghsu", "Jiangwen", "Jiangyu", "Jinbai", "Jinkwan", "Jinliao",
                    "Kwandu", "Kwanlam", "Kwanma", "Kwanzhang",
                    "Lauchan", "Lauman", "Lauxu", "Lifan", "Litang", "Lixun",
                    "Liaobai", "Liaojiang", "Liaosong", "Linkuang", "Linwen", "Linyu",
                    "Liuhan", "Liutan", "Liuyeung", "Lubai", "Luwen", "Luzhou",
                    "Macheung", "Majiang", "Malin", "Mazhang",
                    "Panguan", "Panlau", "Pansun", "Panxu",
                    "Songfan", "Songguo", "Songlin", "Songwu", "Sunchou", "Sunhuang", "Sunli", "Sunzhao", "Tan chou",
                    "Wanghan", "Wangkwan", "Wangliao", "Wenliu", "Wenruan", "Wenxun",
                    "Wonghu", "Wongli", "Wongman", "Wukuang", "Wuxun", "Wuzhang",
                    "Xucheung", "Xulau", "Xuma", "Xuyuen", "Xundu", "Xunguan", "Xunkwan", "Xunpan",
                    "Yujin", "Yuman", "Yutang", "Yuzhou",
                    "Zhaodu", "Zhaoguo", "Zhaoliu", "Zhaowu", "Zhoufan", "Zhouma",
                    "Zhoupan", "Zhouhsu", "Zhukuang", "Zhusun", "Zhuyeung", "Zhuzheng"
                ];
            }
        case "ceres":
        case "plains-kin":
        case "plainskin":
            if (nameType.toLowerCase() == "male") {
                return [
                    "Abioye", "Ade", "Adkachi", "KAKoni", "Akpan", "Amadi", "Anan", "Axmed", "Ayo",
                    "Baako", "Bandile", "Berphane", "Berhanu", "Berko", "Bitrus", "Bongani", "Buhle",
                    "Cali", "Chi", "Chidi", "Chike", "Chima", "Chizoba", "Chuks",
                    "Dayo", "Dejen", "Desta", "Dumi", "Dumisani",
                    "Efe", "Ejiro", "Ekene", "Eliud", "Emeka", "Emem", "Enitan", "Enu", "Eskender",
                    "Darai", "Faraji", "Femi", "Filbert", "Folami", "Fungai",
                    "Gadisa", "Gudina", "Gwandoya",
                    "Iakkopa", "Idir", "Ifa", "Ikaia", "Imamu", "Ime", "Inyene", "Itoro", "Izem",
                    "Jatau", "Jengo", "Jumaane",
                    "Kaipo", "Kalei", "Kato", "Keanu", "Kekoa", "Keoni", "Kibwe", "Kojo", "Kweku",
                    "Lanre", "Lekan", "Lencho", "Lishan",
                    "Maina", "Makaio", "Maui", "Melisizwe", "Mikala", "Moana", "Mwangi", "Mwenye",
                    "Nalani", "Neo", "Ngozi", "Nijinga", "Noa", "Nsia", "Nthanda",
                    "Obi", "Ochieng", "Oghenero", "Okafor", "Okeke", "Olabode", "Oluchi", "Otieno",
                    "Peni", "Pika", "Refilwe", "Rutendo",
                    "Sefu", "Sekani", "Seydou", "Sifiso", "Simiyu", "Sipho", "Sizwe",
                    "Tadala", "Tadesse", "Tafari", "Tesfaye", "Thabo", "Themba", "Tionge", "Tumelo",
                    "Udo", "Uduak", "Ufuoma", "Unathi", "Uzochi", "Uzoma",
                    "Wafula", "Wanjala", "Wassma", "Wekesa", "Workneh",
                    "Xasan", "Zolani", "Yakubu", "Yao", "Yared", "Zikomo", "Zuberi"
                ];
            } else if (nameType.toLowerCase() == "female") {
                return [
                    "Abena", "Adaeze", "Ade", "Afia", "Akua", "Alaba", "Ama", "Anan", "Awiti", "Ayanda",
                    "Baako", "Babirye", "Berhane", "Bolanle", "Bontu", "Bosede", "Buhle",
                    "Charlize", "Chichi", "Chika", "Chioma", "Chisomo", "Chizoba",
                    "Dada", "Dayo", "Desta", "Dikeledi", "Dubaku",
                    "Ebele", "Efemena", "Ejiro", "Ekene", "Ekua", "Emem", "Enu", "Eshe",
                    "Dadumo", "Farai", "Fatsani", "Folami", "Funanya", "Fungai", "Furaha",
                    "Gadise", "Ganizani", "Gugulethu",
                    "Hadiza", "Haukea", "Hibo", "Hiwot", "Hodan", "Hokulani",
                    "Idowu", "Iekika", "Ife", "Ime", "Iolana", "Itoro",
                    "Kagiso", "Kahina", "Kalea", "Kapua", "Keone", "Kiana", "Kidist", "Kirabo", "Konani",
                    "Lani", "Lehua", "Lelise", "Lerato", "Lulit", "Lungile",
                    "Malie", "Makena", "Meklit", "Mele", "Momi", "Monifa", "Mumbi", "Muthoni",
                    "Nafula", "Nakato", "Nanjala", "Neo", "Nia", "Njeri", "Nneka", "Nontle", "Nosipho", "Nyah",
                    "Ogechi", "Olamide", "Oluchi", "Onyeka", "Opeyemi", "Oyibo",
                    "Palesa", "Pemphero", "Pilirani", "Puleng",
                    "Retha", "Rufaro", "Rutendo",
                    "Sauda", "Saynab", "Seble", "Sibongile", "Simisola", "Subira",
                    "Tadala", "Taonga", "Tapiwa", "Thema", "Tidir", "Titrit", "Tumelo",
                    "Uzoma", "Wairimu", "Wangari", "Wikolia",
                    "Yamikani", "Yejide", "Yewande", "Zodwa", "Zola"
                ];
            } else {
                return [
                    "Cho", "Choe", "Choi", "Chung",
                    "Gang", "Gim", "Han", "Jeong", "Jo",
                    "Kang", "Kim", "Lee", "Moon", "Mun",
                    "Park", "Rhee", "Song", "Yi"
                ];
            }
        case "juno":
        case "sandfolk":
            if (nameType.toLowerCase() == "male") {
                return [
                    "Aamir", "Abhay", "Adel", "Ajit", "Ala", "Almas", "Amrit", "Anik", "Anwer", "Aseem", "Atif", "Ayaz",
                    "Babur", "Baha", "Bahij", "Baki", "Baldev", "Basant", "Bilal", "Botros", "Bulis", "Burhan",
                    "Chand", "Chander", "Chandra", "Cheten", "Chiranjeevi", "Chiranjivi", 
                    "Daniyal", "Darshan", "Dawud", "Danyal", "Debdas", "Deo", "Dharma", "Dilip", "Diya", "Durai", "Dushyant",
                    "Ebrahim", "Eesa", "Esmail", "Essa", "Ezhil",
                    "Fadil", "Fahd", "Faisal", "Faizel", "Farag", "Faraj", "Faruk", "Fathi", "Firdos", "Fuad", "Furqan",
                    "Gabir", "Gafar", "Galal", "Ganesh", "Ghassan", "Ghufran", "Girish", "Gopal", "Govind", "Guda", "Gul",
                    "Hadi", "Hafiz", "Hakim", "Hayder", "Hesham", "Hidayat", "Hisein", "Hosni", "Hyder",
                    "Idris", "Ihab", "Ikram", "Ilyas", "Imad", "Imran", "Inayat", "Indra", "Isa", "Iskander", "Itimad",
                    "Jabir", "Jafer", "Jagadish", "Jaya", "Jibril", "Jinan", "Jitender", "Jothi", "Juda", "Juma", "Jyoti",
                    "Kais", "Kalash", "Kali", "Kalyan", "Kanta", "Kavi", "Khayri", "Kishan", "Kuldeep", "Kumaran", "Kunal",
                    "Lakshman", "Lal", "Latif", "Laxmi", "Laxmi", "Lochan",
                    "Maalik", "Magdi", "Mahir", "Maram", "Mehdi", "Midhat", "Miraj", "Mitul", "Mohan", "Mushin", "Musa",
                    "Naaji", "Nader", "Narendra", "Neelam", "Nihal", "Nima", "Nitin", "Noor", "Nuri", "Nurul",
                    "Om", "Omar", "Omran", "Othman", "Othmane", "Oualid",
                    "Padma", "Parth", "Parveen", "Pitambar", "Prabhat", "Prakash", "Pran", "Pratap", "Prem", "Punit",
                    "Qadir", "Qamar", "Qays", "Qismat", "Qusay",
                    "Rabi", "Radha", "Rafiq", "Rajesh", "Ramiz", "Rehman", "Riaz", "Rifat", "Ruh", "Rusul",
                    "Sabri", "Safi", "Saleh", "Sandeep", "Satish", "Shadi", "Shakeel", "Sib", "Sri", "Suhayl", "Suresh",
                    "Tabassum", "Tahir", "Tahmid", "Talib", "Tariq", "Tayyib", "Thamir", "Toufik", "Tufayl", "Tushar",
                    "Umar", "Umran", "Usama", "Usman", "Uthman", "Uttar",
                    "Varghese", "Vasant", "Venkat", "Vijay", "Vipul", "Vishal", "Vivek",
                    "Wafai", "Waheed", "Walid", "Wassim",
                    "Yahya", "Yakub", "Yaser", "Yousaf", "Yunus", "Yusuf",
                    "Zaahir", "Zahid", "Zain", "Zaki", "Ziad", "Ziya", "Zulfaqar"
                ];
            } else if (nameType.toLowerCase() == "female") {
                return [
                    "Aaminah", "Aarti", "Abha", "Afra", "Alia", "Aliyya", "Alya", "Amal", "Anila", "Aqila", "Arij",
                    "Badr", "Bahija", "Bahiyya", "Balqis", "Basira", "Batul", "Bhavana", "Bhavna", "Budur", "Bushra",
                    "Chanda", "Chandana", "Chandra", "Chandrakanta", "Chetana",
                    "Dalal", "Dalia", "Danya", "Deepa", "Deepti", "Dema", "devi", "Dipali", "Drishti", "Dua", "Durga",
                    "Eman", "Ezhil",
                    "Fadia", "Fadila", "Fahima", "Fahmida", "Fairuz", "Faiza", "Fareeha", "Farida", "Fikriyya", "Fizza",
                    "Galila", "Gargi", "Gayatri", "Ghadir", "Gowri", "Grishma", "Gulnaz", "Gulrukh", "Gurmeet",
                    "Habiba", "Hadil", "Hafza", "Hagir", "Hana", "Hema", "Hind", "Hooda", "Hosni", "Husna", "Husniya",
                    "Ihab", "Ihsan", "Ikram", "Ila", "Inas", "Indira", "Iqra", "Isha", "Ishani", "Isra", "Izdihar",
                    "Jalila", "Jameela", "Janan", "Jannat", "Jasvinder", "Jawdat", "Jinan", "Jothi", "Jumanah", "Jyoti",
                    "Kajal", "Kalyani", "Kamatchi", "Kamini", "Kashi", "Khadija", "Kirtida", "Kubra", "Kumari",
                    "Laila", "Lamis", "Lateefah", "Leela", "Leila", "Lina", "Lochana", "Lubna", "Lujayn",
                    "Maha", "Mahinder", "Mala", "Malati", "Manisha", "Maya", "Mira", "Mitra", "Mohini", "Mubina", "Munya",
                    "Nadia", "Narinder", "Neela", "Nida", "Nihal", "Nisha", "Noor", "Noora", "Nour", "Nuha", "Nurul",
                    "Padma", "Pallabi", "Parminder", "Parveen", "Pooja", "Prachi", "Preethi", "Priya", "Punita", "Pushpa",
                    "Rabab", "Rachana", "Radha", "Raisa", "Rajani", "Rakshi", "Reem", "Reva", "Ritika", "Ruba", "Ruya",
                    "Sabah", "Sadaf", "Sadia", "Samar", "Seema", "Shadya", "Shreya", "Shukriyya", 
                    "Shweta", "Shyama", "Sita", "Sitara", "Somaya", "Sona", "Souad", "Sri", "Suad", "Suha", "Sujata",
                    "Tabassum", "Tahira", "Taliba", "Tara", "Tejal", "Thamina", "Thana", "Thurayya", "Trishna", "Tuba", 
                    "Uma", "Upasana", "Urvi", "Usha", "Uttara", "Uzma",
                    "Vaishnavi", "Varsha", "Vasanti", "Vasuda", "Vasundhara", "Veda", "Vijaya", "Vimala",
                    "Wafiya", "Wahida", "Warda", "Wedad", "Widad", "Yamuna", "Yusra",
                    "Zahia", "Zahra", "Zeenat", "Zulekha"
                ];
            } else {
                return [
                    "Abarca", "Abello", "Abreu", "Agua", "Aiza", "Alonso", "Alvarez", "Antunez", "Araya",
                    "Barros", "Bello", "Belmonte", "Bernat", "Blanco", "Bosch", "Bustillo", "Bustos",
                    "Cabello", "Campos", "Cantu", "Castro", "Chaves", "Coello", "Cruz", "Cuesta",
                    "Dali", "Diaz", "Duarte",
                    "Elizondo", "Esparza", "Espina", "Estrada",
                    "Felix", "Ferreira", "Ferrer", "Flores", "Fontana", "Franco", "Fuentes",
                    "Gallego", "Garcia", "Garza", "Gebara", "Gomez", "Grec", "Guerra", "Guzma",
                    "Herrera", "Hierro", "Huerta",
                    "Ibarra", "Iglesias", "Inguez",
                    "Jaso", "Jorda", "Juarez",
                    "Lobo", "Losa", "Lucas",
                    "Macias", "Magro", "Marti", "Mateu", "Medina", "Merlo", "Moles", "Moreno",
                    "Narvaez", "Nieves", "Noguera", "Nunez",
                    "Obando", "Ochoa", "Ola", "Olguin", "Ortega", "Ortiz", "Otxoa",
                    "Palomo", "Pavia", "Pena", "Pereiro", "Petit", "Puga", "Puig",
                    "Quntana", "Quiros",
                    "Ramrez", "Ramos", "Reyes", "Rios", "Rivera", "Robles", "Rocha", "Roig", "Rojo",
                    "Sala", "Salazar", "Sanchez", "Sandoval", "Silva", "Solos", "Suarez",
                    "Tapia", "Terrazas", "Tomas", "Tosell", "Trujillo",
                    "Ubina", "Urbina",
                    "Valdez", "Varela", "Vega", "Ventura", "Vicario", "Viteri", "Vives",
                    "Ybarra", "Zabala", "Zavala", "Zubizarreta", "Zuniga"
                ];
            }
        case "liber":
        case "frostcloaked":
            if (nameType.toLowerCase() == "male") {
                return [
                    "Abdul", "Adi", "Aditya", "Agung", "Agus", "Akbar", "Ali", "Amit", "Anh", "Arif", "Ashok",
                    "Bagus", "Bao", "Batbayer", "Bibek", "Bima", "Binh", "Budi",
                    "Cahaya", "Cahya", "Cahyo", "Chau", "Chi", "Chingis", "Cong",
                    "Darma", "Dat", "Daud", "Deepak", "Dian", "Dinesh", "Dorji", "Dwi",
                    "Eka", "Eko", "Firdaus",
                    "Ganbaatar", "Ganesh", "Giang", "Gopal", "Gusti", "Gyatso",
                    "Hai", "Hari", "Harta", "Hidayat", "Hiri", "Hung",
                    "Ibrahim", "Ilham", "Iman", "Indra", "Iskandar",
                    "Jamyang", "Jusuf", "Jyoti",
                    "Kadek", "Kamon", "Ketut", "Khanh", "Kishor", "Klahan", "Komang", "Kulap", "Kuwat",
                    "Lan", "Lanh", "Laxmi", "Liem", "Lutfi",
                    "Madhav", "Mahesh", "Mega", "Minh", "Mongkut", "Muhammad",
                    "Narayan", "Nergui", "Ngoc", "Nguyen", "Niraj", "Nur", "Nurul", "Nyoman",
                    "Pankaj", "Passang", "Pema", "Pradeep", "Prasad", "Preecha", "Putra", "Putu",
                    "Quan", "Quy", "Quyen", "Quynh",
                    "Raharjo", "Rahman", "Raja", "Rajani", "Rajiv", "Ratna", "Rishi", "Roshan", "Rustam",
                    "Sakchai", "Sandip", "Sanjay", "Shankar", "Shyam", "Somchai", "Somsak", "Suchart", "Sunil",
                    "Taufik", "Tenzin", "Thanh", "Tirta", "Trai", "Truc", "Tsering", "Tuan",
                    "Van", "Vien", "Vinh", "Wahyu", "Wayan", "Wibawa", "Wira",
                    "Xuan", "Yohanes", "Yuda", "Yusuf"
                ];
            } else if (nameType.toLowerCase() == "female") {
                return [
                    "Aisyah", "Alya", "Anh", "Anong", "Asih",
                    "Batari", "Bethari", "Binh", "Bulan",
                    "Chaya", "Cahya", "Chandra", "Chau", "Chi", "Cinta", "Cuc",
                    "Dawa", "Dechin", "Dewi", "Dian", "Diep", "Dorji", "Dwi",
                    "Eka", "Eko", "Enkhtuya", "Fatimah",
                    "Gerel", "Giang", "Hang", "Hira", "Hong", "Hue", "Huong",
                    "Ilham", "Iman", "Indah", "Intan", "Intira",
                    "Jamyang", "Jyoti",
                    "Kadek", "Kalpana", "Kamala", "Kamon", "Kanya", "Kasih", "Ketut", "Khulan",
                    "Komang", "Kulap", "Kunzang", "Kusuma", "Lan", "Lanh", "Lawan", "Laxmi", "Lestari", "Linh",
                    "Loan", "Made", "Mai", "Malai", "Mali", "Manisha", "Mawar", "Melati", "My",
                    "Namrata", "Narangerel", "Nergui", "Ngoc", "Nhung", "Nirmala", "Nisha", "Nur", "Nyoman",
                    "Otyunchimeg", "Pakpao", "Passang", "Pema", "Phuntsok", "Porntip", "Puja", "Purnama",
                    "Pushpa", "Putri", "Putu", "Quy",
                    "Rachana", "Rajani", "Ratna", "Ratree", "Ratu", "Roshan", "Rupa",
                    "Sari", "Sarita", "Sarnai", "Sasithorn", "Shanta", "Shanti", "Sinta", "Siriporn", "Sita",
                    "Sonam", "Sri", "Sukhon", "Suman", "Sunan", "Sunita", "Sushila",
                    "Tara", "Tenzing", "Thanh", "Thi", "Thu", "Thuy", "Tien", "Trinh", "Truc", "Tsering",
                    "Testseg", "Tu", "Tuyen", "Tuyet",
                    "Ubon", "Usha", "Utari", "Van", "Vina", "Vinh",
                    "Wangchuk", "Wangi", "Wati", "Wattana", "Wayan", "Widya", "Wulan", "Xuan",
                    "Yen", "Yuliana"
                ];
            } else {
                return [
                    "Snowfree"
                ];
            }
        default:
        case "minerva":
        case "coastborne":
            if (nameType.toLowerCase() == "male") {
                return [
                    "Abel", "Ace", "Andie", "Ansel", "Aretes", "Arlo", "Ash", "Austin",
                    "Baldwin", "Basil", "Ben", "Bertram", "Booker", "Brady", "Burke",
                    "Caden", "Cal", "Casey", "Cedric", "Charles", "Clark", "Corbin",
                    "Dalton", "Dane", "Daryl", "Dax", "Deric", "Dezi", "Dion", "Dorian", "Drew",
                    "Easton", "Edgard", "Edom", "Eliot", "Emery", "Ennis", "Ern", "Esmond", "Ethan",
                    "Faron", "Felix", "Fenton", "Fitz", "Florence", "Ford", "Fredric", "Fulton",
                    "Gabe", "Garth", "Geoffrey", "Gerald", "Gideon", "Gil", "Glen", "Gordon", "Grant",
                    "Hale", "Harris", "Hector", "Hiram", "Holden", "Hollis", "Howe", "Hubert", "Hugh",
                    "Ian", "Ilbert", "Inigo", "Ingram", "Irvin", "Ithiel",
                    "Jabin", "Jace", "Jaden", "Jeffry", "Jenson", "Jett", "Joby", "Joss", "Julien",
                    "Kaidan", "Karson", "Kendric", "Kent", "Kimbal", "Kory",
                    "Laird", "Lawrence", "Laverne", "Leigh", "Leon", "Lloyd", "Lovel", "Lucius",
                    "Mack", "Marius", "Meade", "Merit", "Merill", "Milo", "Monroe", "Murray",
                    "Nathanael", "Neil", "Nic", "Niles", "Norris", "Nowell",
                    "Odell", "Ogden", "Oliver", "Ormond", "Orral", "Oscar", "Otto",
                    "Paden", "Peers", "Peyton", "Philippe", "Porter", "Prosper",
                    "Quentin", "Quincy", "Rastus", "Reid", "Remi", "Riley", "Robert",
                    "Sawyer", "Scott", "Selwyn", "Shane", "Silas", "Stafford", "Syd",
                    "Talbot", "Terance", "Theo", "Titus", "Topher", "Travers", "Ty",
                    "Urbain", "Vere", "Vergil", "Wade", "Wallis", "Wil", "Wolfe",
                    "Xavier", "Yann", "Yves", "Zander", "Zeph"
                ];
            } else if (nameType.toLowerCase() == "female") {
                return [
                    "Ada", "Agathe", "Alexis", "Anais", "Anona", "Aria", "Ashley",
                    "Bailey", "Belinda", "Blanche", "Brandy", "Brynn",
                    "Carine", "Cecile", "Chante", "Cheryl", "Claudia", "Collyn",
                    "Dahlia", "Dawn", "Delia", "Diantha", "Dory", "Dove", "Drina",
                    "Easter", "Edith", "Eleonore", "Emely", "Etta", "Eve", "Evelyn",
                    "Fallon", "Felicity", "Florianne", "Frankie", "Freida",
                    "Gale", "Gill", "Ginger", "Gloria", "Gretta", "Gwen",
                    "Harper", "Hadyn", "Helah", "Helen", "Hilary", "Hope", "Hyacinth",
                    "Ida", "Ilene", "Ione", "Irene", "Isadora", "Izzy",
                    "Janine", "Jeannette", "Jeri", "Jocelyn", "Jolie", "Judith",
                    "Kacie", "Karenth", "Kelsy", "Keri", "Kori", "Kylee", "Kym",
                    "Lecia", "Leone", "Libby", "Lillian", "Lois", "Lorri",
                    "Maci", "Makenzie", "Marla", "Mercia", "Mia", "Mirelle", "Mora", "Myrtie",
                    "Nance", "Nena", "Nevada", "Ninette", "Nola", "Nydia", "Nylah",
                    "Odell", "Odile", "Opal", "Orianne", "Orinda",
                    "Paige", "Parker", "Pearle", "Peony", "Phibe", "Piper", "Pru", "Purdie",
                    "Rachel", "Ravenna", "Reese", "Rhoda", "Robin", "Rue", "Rylie",
                    "Sabine", "Sandrine", "Selma", "Shari", "Simone", "Sondra",
                    "Tansy", "Tatienne", "Tatum", "Teagan", "Tera", "Tia", "Tori", "Tracy",
                    "Unice", "Val", "Victoire", "Vivian", "Wendy", "Whitney", "Yvra", "Zula"
                ];
            } else {
                return [
                    "Abbott", "Abram", "Akers", "Archambault", "Ash", "Averill",
                    "Babineaux", "Beck", "Bishop", "Blanc", "Bonnay", "Brigham",
                    "Carter", "Chester", "Clement", "Cobb", "Crisp",
                    "Danell", "Daviau", "Deschamps", "Dodge", "Draper", "Dufort",
                    "Eason", "Eldred", "Emerson", "Ewart",
                    "Fabron", "Fevre", "Fields", "Forest", "Frost", "Fulton",
                    "Gagne", "Garland", "Giles", "Glazier", "Gorbold", "Gully",
                    "Hale", "Herriot", "Hobbs", "Hudnall", "Hunt",
                    "Ilbert", "Ingham", "Irvine",
                    "Jakes", "Jepson", "Joubert", "Judd",
                    "Keighley", "Key", "Kimball", "Kipling", "Kynaston",
                    "Lavoie", "Leclair", "Lindon", "Lowry", "Lyon",
                    "Mann", "Mayer", "Merritt", "Millard", "Montgomery", "Mullins",
                    "Neil", "Nicols", "Norris", "Nye",
                    "Odell", "Ogden", "Ott", "Owston",
                    "Paddon", "Penn", "Perigord", "Pilgrim", "Platt", "Poulin",
                    "Quick", "Radcliff", "Reed", "Rimmer", "Romilly", "Roux",
                    "Sams", "Sault", "Seward", "Shaw", "Small", "Stafford", "Styles",
                    "Tatum", "Thayer", "Tobin", "Townsend", "Treloar", "Tuft",
                    "Upton", "Varley", "Virgo", "Voclain",
                    "Wakefield", "Wells", "Winton", "Wynne", "Yap", "Yoxall"

                ];
            }
    }
}

function GetNatureList() {
    return [
        "Relaxed",
        "Naive",
        "Impish",
        "Naughty",
        "Mild",
        "Brave",
        "Bold",
        "Adamant",
        "Quiet",
        "Quirky",
        "Sassy",
        "Docile",
        "Serious",
        "Timid",
        "Careful"
    ];
}

function GetNatureStats(nature) {
    switch (nature) {
        case "Relaxed":
            return {
                nature: "Relaxed",
                    pro: "None",
                    con: "None"
            };
        case "Naive":
            return {
                nature: "Naive",
                    pro: "Deception",
                    con: "Intimidation"
            };
        case "Impish":
            return {
                nature: "Impish",
                    pro: "Deception",
                    con: "Performance"
            };
        case "Naughty":
            return {
                nature: "Naughty",
                    pro: "Deception",
                    con: "Persuasion"
            };
        case "Mild":
            return {
                nature: "Mild",
                    pro: "None",
                    con: "None"
            };
        case "Brave":
            return {
                nature: "Brave",
                    pro: "Intimidation",
                    con: "Deception"
            };
        case "Bold":
            return {
                nature: "Bold",
                    pro: "Intimidation",
                    con: "Performance"
            };
        case "Adamant":
            return {
                nature: "Adamant",
                    pro: "Intimidation",
                    con: "Persuasion"
            };
        case "Quiet":
            return {
                nature: "Quiet",
                    pro: "None",
                    con: "None"
            };
        case "Quirky":
            return {
                nature: "Quirky",
                    pro: "Performance",
                    con: "Deception"
            };
        case "Jolly":
            return {
                nature: "Jolly",
                    pro: "Performance",
                    con: "Intimidation"
            };
        case "Sassy":
            return {
                nature: "Sassy",
                    pro: "Performance",
                    con: "Persuasion"
            };
        case "Docile":
            return {
                nature: "Docile",
                    pro: "None",
                    con: "None"
            };
        case "Serious":
            return {
                nature: "Serious",
                    pro: "Persuasion",
                    con: "Deception"
            };
        case "Timid":
            return {
                nature: "Timid",
                    pro: "Persuasion",
                    con: "Intimidation"
            };
        case "Careful":
            return {
                nature: "Careful",
                    pro: "Persuasion",
                    con: "Performance"
            };
        default:
            return {
                nature: "Serious",
                    pro: "None",
                    con: "None"
            };
    }
}

function GetSectorProbabilityList(classCategory) {
    var professionLists = [];
    professionLists.push(GetProfessionList("Artist"));
    professionLists.push(GetProfessionList("Communications"));
    professionLists.push(GetProfessionList("Production"));
    professionLists.push(GetProfessionList("Management"));
    professionLists.push(GetProfessionList("Business"));
    professionLists.push(GetProfessionList("Security"));
    professionLists.push(GetProfessionList("Social Service"));
    professionLists.push(GetProfessionList("Service"));
    professionLists.push(GetProfessionList("Manufacturing"));
    professionLists.push(GetProfessionList("Construction"));
    professionLists.push(GetProfessionList("Fashion"));
    professionLists.push(GetProfessionList("Labour"));

    var professionProbabilityList = [];

    for (var i = 0; i < professionLists.length; i++) {
        var prob = professionLists[i].elite.length + professionLists[i].high.length;
        if (classCategory == "Medium") {
            prob += professionLists[i].medium.length;
        } else if (classCategory == "Low") {
            prob += professionLists[i].medium.length + professionLists[i].low.length;
        }
        professionProbabilityList.push({
            sector: professionLists[i].sector,
            odds: prob
        });
    }

    return professionProbabilityList;
}

function GetProfessionList(sector) {
    switch (sector) {
        case "Artist":
            return {
                sector: "Artist",
                    low: [{
                            title: "Amateur Actor"
                        },
                        {
                            title: "Amateur Musician"
                        },
                        {
                            title: "Amateur Dancer"
                        },
                        {
                            title: "Amateur Painter"
                        },
                        {
                            title: "Amateur Writer"
                        }
                    ],
                    medium: [{
                            title: "Performer (Acting)"
                        },
                        {
                            title: "Performer (Music)"
                        },
                        {
                            title: "Performer (Song)"
                        },
                        {
                            title: "Dancer"
                        },
                        {
                            title: "Makeup Artist"
                        },
                        {
                            title: "Painter"
                        },
                        {
                            title: "Sculptor"
                        },
                        {
                            title: "Photographer"
                        },
                        {
                            title: "Writer"
                        },
                        {
                            title: "Calligrapher"
                        }
                    ],
                    high: [{
                            title: "Actor"
                        },
                        {
                            title: "Musician"
                        },
                        {
                            title: "Singer"
                        },
                        {
                            title: "Author"
                        }
                    ],
                    elite: [{
                            title: "Star"
                        },
                        {
                            title: "Rockstar"
                        },
                        {
                            title: "Virtuoso"
                        },
                        {
                            title: "Best Selling Author"
                        }
                    ]
            };
        case "Communications":
            return {
                sector: "Communications",
                    low: [{
                            title: "Amateur Critic"
                        },
                        {
                            title: "Messenger"
                        }
                    ],
                    medium: [{
                            title: "Journalist"
                        },
                        {
                            title: "Critic"
                        },
                        {
                            title: "Editor"
                        },
                        {
                            title: "PR Consultant"
                        },
                        {
                            title: "Publicist"
                        },
                        {
                            title: "Receptionist"
                        }
                    ],
                    high: [{
                            title: "Reporter"
                        },
                        {
                            title: "PR Expert"
                        },
                        {
                            title: "Talent Agent"
                        }
                    ],
                    elite: [{
                        title: "Connoisseur"
                    }]
            };
        case "Production":
            return {
                sector: "Production",
                    low: [{
                        title: "Amateur Producer"
                    }],
                    medium: [{
                            title: "College Athlete Coach"
                        },
                        {
                            title: "Talent Scout"
                        },
                        {
                            title: "Choreographer"
                        },
                        {
                            title: "Producer"
                        }
                    ],
                    high: [{
                        title: "Professional Athlete Coach"
                    }],
                    elite: [{
                        title: "Executive Producer"
                    }]
            };
        case "Management":
            return {
                sector: "Management",
                    low: [{
                        title: "Amateur Manager"
                    }],
                    medium: [{
                            title: "Manager"
                        },
                        {
                            title: "Legislator"
                        },
                        {
                            title: "Appraisor"
                        },
                        {
                            title: "Property Inspector"
                        }
                    ],
                    high: [{
                            title: "Administrator"
                        },
                        {
                            title: "Ambassador"
                        },
                        {
                            title: "Politician"
                        }
                    ],
                    elite: [{
                        title: "Leader"
                    }]
            };
        case "Business":
            return {
                sector: "Business",
                    low: [{
                            title: "Amateur Accountant"
                        },
                        {
                            title: "Banking Agent"
                        },
                        {
                            title: "Retail Merchant"
                        },
                        {
                            title: "Real Estate Agent"
                        },
                        {
                            title: "Customs Agent"
                        },
                        {
                            title: "Insurance Agent"
                        }
                    ],
                    medium: [{
                            title: "Accountant"
                        },
                        {
                            title: "Auditor"
                        },
                        {
                            title: "Contractor"
                        },
                        {
                            title: "Retail Broker"
                        },
                        {
                            title: "Real Estate Broker"
                        },
                        {
                            title: "Insurance Broker"
                        }
                    ],
                    high: [{
                            title: "Investor"
                        },
                        {
                            title: "Bank Manager"
                        },
                        {
                            title: "Real Estate Expert"
                        },
                        {
                            title: "Customs Expert"
                        }
                    ],
                    elite: [{
                            title: "Venture Capitalist"
                        },
                        {
                            title: "Contracting Executive"
                        },
                        {
                            title: "Retail Executive"
                        },
                        {
                            title: "Insurance Executive"
                        }
                    ]
            };
        case "Security":
            return {
                sector: "Security",
                    low: [{
                            title: "Patrolman"
                        },
                        {
                            title: "Corrections Officer"
                        }
                    ],
                    medium: [{
                            title: "Minervan Guard"
                        },
                        {
                            title: "Minervan Brigadier"
                        },
                        {
                            title: "Security Guard"
                        },
                        {
                            title: "Corrections Warden"
                        }
                    ],
                    high: [{
                            title: "Minervan Guard Captain"
                        },
                        {
                            title: "Private Security"
                        }
                    ],
                    elite: [{
                        title: "Minervan Guard General"
                    }]
            };
        case "Social Service":
            return {
                sector: "Social Service",
                    low: [{
                            title: "Guidance Accolyte"
                        },
                        {
                            title: "Clergy Accolyte"
                        },
                        {
                            title: "Translator"
                        },
                        {
                            title: "Teacher (Arcana)"
                        },
                        {
                            title: "Teacher (History)"
                        },
                        {
                            title: "Teacher (Nature)"
                        },
                        {
                            title: "Teacher (Religion)"
                        }
                    ],
                    medium: [{
                            title: "Psychologist"
                        },
                        {
                            title: "Rehabilitation Expert"
                        },
                        {
                            title: "Marriage Counselor"
                        },
                        {
                            title: "Guidance Seer"
                        },
                        {
                            title: "Guidance Monk"
                        },
                        {
                            title: "Priest"
                        },
                        {
                            title: "Interpretor"
                        },
                        {
                            title: "Human Resources Agent"
                        },
                        {
                            title: "Professor (Arcana)"
                        },
                        {
                            title: "Professor (History)"
                        },
                        {
                            title: "Professor (Nature)"
                        },
                        {
                            title: "Professor (Religion)"
                        }
                    ],
                    high: [{
                            title: "Guidance Spirit Walker"
                        },
                        {
                            title: "Human Resources Expert"
                        },
                        {
                            title: "Magister"
                        },
                        {
                            title: "Historian"
                        },
                        {
                            title: "Biologist"
                        },
                        {
                            title: "Theologist"
                        }
                    ],
                    elite: [{
                            title: "Guidance High Spirit Walker"
                        },
                        {
                            title: "Grand Magister"
                        }
                    ]
            };
        case "Service":
            return {
                sector: "Service",
                    low: [{
                            title: "Custodian"
                        },
                        {
                            title: "Cashier"
                        },
                        {
                            title: "Clerk"
                        },
                        {
                            title: "Banker"
                        },
                        {
                            title: "Nurse"
                        }
                    ],
                    medium: [{
                        title: "Doctor"
                    }],
                    high: [{
                        title: "Physician"
                    }],
                    elite: [{
                        title: "MD"
                    }]
            };
        case "Manufacturing":
            return {
                sector: "Manufacturing",
                    low: [{
                            title: "Blacksmith"
                        },
                        {
                            title: "Amateur Engineer"
                        },
                        {
                            title: "Amateur Chemist"
                        },
                        {
                            title: "Cook"
                        },
                        {
                            title: "Amateur Brewer"
                        }
                    ],
                    medium: [{
                            title: "Glassblower"
                        },
                        {
                            title: "Potter"
                        },
                        {
                            title: "Armorer"
                        },
                        {
                            title: "Weaponsmith"
                        },
                        {
                            title: "Engineer"
                        },
                        {
                            title: "Architect"
                        },
                        {
                            title: "Chemist"
                        },
                        {
                            title: "Pharmacist"
                        },
                        {
                            title: "Chef"
                        },
                        {
                            title: "Brewer"
                        }
                    ],
                    high: [{
                            title: "Pottery Designer"
                        },
                        {
                            title: "Engineering Expert"
                        },
                        {
                            title: "Expert Chemist"
                        },
                        {
                            title: "Expert Chef"
                        }
                    ],
                    elite: [{
                            title: "Originator"
                        },
                        {
                            title: "Pharmacologist"
                        },
                        {
                            title: "Culinarian"
                        }
                    ]
            };
        case "Construction":
            return {
                sector: "Construction",
                    low: [{
                            title: "Amateur Mason"
                        },
                        {
                            title: "Amateur Carpenter"
                        },
                        {
                            title: "Repairman"
                        },
                        {
                            title: "Amateur Interior Designer"
                        }
                    ],
                    medium: [{
                            title: "Mason"
                        },
                        {
                            title: "Carpenter"
                        },
                        {
                            title: "Building Inspector"
                        },
                        {
                            title: "Flooring Expert"
                        },
                        {
                            title: "Glazier"
                        },
                        {
                            title: "Roofer"
                        },
                        {
                            title: "Plumbing Expert"
                        },
                        {
                            title: "Demolitionist"
                        },
                        {
                            title: "Interior Artist"
                        }
                    ],
                    high: [{
                            title: "Obsidian Mason"
                        },
                        {
                            title: "Ironwood Carpenter"
                        },
                        {
                            title: "Interior Designer"
                        }
                    ],
                    elite: [{
                        title: "Construction Magus"
                    }]
            };
        case "Fashion":
            return {
                sector: "Fashion",
                    low: [{
                        title: "Amateur Fashion Designer"
                    }],
                    medium: [{
                            title: "Leatherworker"
                        },
                        {
                            title: "Leather Artist"
                        },
                        {
                            title: "Goldsmith"
                        },
                        {
                            title: "Weaver"
                        },
                        {
                            title: "Fashion Artist"
                        },
                        {
                            title: "Costume Artist"
                        }
                    ],
                    high: [{
                            title: "Leather Designer"
                        },
                        {
                            title: "Jeweler"
                        },
                        {
                            title: "Fashion Designer"
                        },
                        {
                            title: "Costume Designer"
                        }
                    ],
                    elite: [{
                        title: "Couturier"
                    }]
            };
        case "Labour":
            return {
                sector: "Labour",
                    low: [{
                            title: "Labourer"
                        },
                        {
                            title: "Farmer (Potato)"
                        },
                        {
                            title: "Farmer (Wheat)"
                        },
                        {
                            title: "Farmer (Melon)"
                        },
                        {
                            title: "Farmer (Fruit)"
                        },
                        {
                            title: "Farmer (Corn)"
                        },
                        {
                            title: "Forager"
                        },
                        {
                            title: "Miner"
                        },
                        {
                            title: "Rodman"
                        },
                        {
                            title: "Seafarer"
                        }
                    ],
                    medium: [{
                            title: "Farm Owner"
                        },
                        {
                            title: "Game Hunter"
                        },
                        {
                            title: "Goldminer"
                        },
                        {
                            title: "Jewelminer"
                        },
                        {
                            title: "Fisherman"
                        },
                        {
                            title: "Sea Captain"
                        }
                    ],
                    high: [{
                        title: "Expert Hunter"
                    }],
                    elite: [{
                        title: "Beastmaster"
                    }]
            };
    }
}

// ====== Character Sheet Mods

function GetAbilityScoreAttr(attr, spellcasting_ability) {
    if (attr == "spell") {
        attr = spellcasting_ability;
    }

    switch (attr) {
        case "strength":
            return "strength_mod";
        case "dexterity":
            return "dexterity_mod";
        case "constitution":
            return "constitution_mod";
        case "intelligence":
            return "intelligence_mod";
        case "wisdom":
            return "wisdom_mod";
        case "charisma":
            return "charisma_mod";
    }

    return "";
}

function GetProficiencyAttr(attr) {
    switch (attr.toLowerCase()) {
        case "strength":
            return "strength_save_bonus";
        case "dexterity":
            return "dexterity_save_bonus";
        case "constitution":
            return "constitution_save_bonus";
        case "intelligence":
            return "intelligence_save_bonus";
        case "wisdom":
            return "wisdom_save_bonus";
        case "charisma":
            return "charisma_save_bonus";
        case "spell":
            return "spell_prof-effect";
        case "axe":
            return "weapon_prof-axe";
        case "blade":
            return "weapon_prof-blade";
        case "bow":
            return "weapon_prof-bow";
        case "brawling":
            return "weapon_prof-brawling";
        case "club":
            return "weapon_prof-club";
        case "dart":
            return "weapon_prof-dart";
        case "flail":
            return "weapon_prof-flail";
        case "hammer":
            return "weapon_prof-hammer";
        case "pistol":
            return "weapon_prof-pistol";
        case "polearm":
            return "weapon_prof-polearm";
        case "rifle":
            return "weapon_prof-rifle";
        case "unarmored":
            return "armor_prof-unarmored";
        case "light":
            return "armor_prof-light";
        case "medium":
            return "armor_prof-medium";
        case "heavy":
            return "armor_prof-heavy";
    }

    return "";
}

function GetSectionIdName(sectionName, currentID, variableName) {

    if (variableName.startsWith("attr")) {
        variableName = variableName.substr(4);
    }
    if (!variableName.startsWith("_")) {
        variableName = "_" + variableName;
    }
    if (!sectionName.endsWith("_")) {
        sectionName += "_";
    }
    return sectionName + currentID + variableName;
}

function GetCheckAttr(attr) {

    switch (attr.toLowerCase()) {
        case "strength":
        case "strength save":
            return "strength_save";
        case "dexterity":
        case "dexterity save":
            return "dexterity_save";
        case "constitution":
        case "constitution save":
            return "constitution_save";
        case "intelligence":
        case "intelligence save":
            return "intelligence_save";
        case "wisdom":
        case "wisdom save":
            return "wisdom_save";
        case "charisma":
        case "charisma save":
            return "charisma_save";
        case "spell attack":
            return "spell_effect";
        case "spirit attack":
            return "spirit_effect";
        case "spell dc":
            return "spell_effect";
        case "acrobatics":
            return "acrobatics_mod";
        case "balance":
            return "balance_mod";
        case "escape artist":
            return "escapeartist_mod";
        case "squeeze":
            return "squeeze_mod";
        case "tumble":
            return "tumble_mod";
        case "arcana":
            return "arcana_mod";
        case "identify magic":
            return "identifymagic_mod";
        case "restore barrier":
            return "restorebarrier_mod";
        case "athletics":
            return "athletics_mod";
        case "climb":
            return "climb_mod";
        case "break free":
            return "breakfree_mod";
        case "grapple":
            return "grapple_mod";
        case "high jump":
            return "highjump_mod";
        case "long jump":
            return "longjump_mod";
        case "shove":
            return "shove_mod";
        case "swim":
            return "swim_mod";
        case "deception":
            return "deception_mod";
        case "create a diversion":
            return "createadiversion_mod";
        case "impersonate":
            return "impersonate_mod";
        case "lie":
            return "lie_mod";
        case "health":
            return "health_mod";
        case "identify illness":
            return "identifyillness_mod";
        case "stabilize":
            return "stabilize_mod";
        case "insight":
            return "insight_mod";
        case "discern secret":
            return "discernsecret_mod";
        case "sense motive":
            return "sensemotive_mod";
        case "intimidation":
            return "intimidation_mod";
        case "coerce":
            return "coerce_mod";
        case "demoralize":
            return "demoralize_mod";
        case "investigation":
            return "investigation_mod";
        case "analyze":
            return "analyze_mod";
        case "appraise":
            return "appraise_mod";
        case "seek":
            return "seek_mod";
        case "nature":
            return "nature_mod";
        case "assess creature":
            return "assesscreature_mod";
        case "command animal":
            return "commandanimal_mod";
        case "perception":
            return "perception_mod";
        case "perceive barrier":
            return "perceivebarrier_mod";
        case "sense presence":
            return "sensepresence_mod";
        case "performance":
            return "performance_mod";
        case "act":
            return "act_mod";
        case "comedy":
            return "comedy_mod";
        case "dance":
            return "dance_mod";
        case "oratory":
            return "oratory_mod";
        case "play instrument":
            return "playinstrument_mod";
        case "sing":
            return "sing_mod";
        case "persuasion":
            return "persuasion_mod";
        case "gather information":
            return "gatherinformation_mod";
        case "influence":
            return "influence_mod";
        case "request favor":
            return "requestfavor_mod";
        case "religion":
            return "religion_mod";
        case "society":
            return "society_mod";
        case "decipher writing":
            return "decipherwriting_mod";
        case "stealth":
            return "stealth_mod";
        case "conceal an object":
            return "concealanobject_mod";
        case "hide":
            return "hide_mod";
        case "sneak":
            return "sneak_mod";
        case "survival":
            return "survival_mod";
        case "navigate":
            return "navigate_mod";
        case "track":
            return "track_mod";
        case "thievery":
            return "thievery_mod";
        case "palm":
            return "palm_mod";
        case "steal":
            return "steal_mod";
        case "alchemy":
            return "alchemy_mod";
        case "balm":
            return "balm_mod";
        case "inhalent":
            return "inhalent_mod";
        case "injection":
            return "injection_mod";
        case "tablet":
            return "tablet_mod";
        case "artistry":
            return "artistry_mod";
        case "painting":
            return "painting_mod";
        case "penmanship":
            return "penmanship_mod";
        case "sketching":
            return "sketching_mod";
        case "brewing":
            return "brewing_mod";
        case "blending":
            return "blending_mod";
        case "fermenting":
            return "fermenting_mod";
        case "roasting":
            return "roasting_mod";
        case "steeping":
            return "steeping_mod";
        case "carving":
            return "carving_mod";
        case "chiselling":
            return "chiselling_mod";
        case "cutting":
            return "cutting_mod";
        case "shape ice":
            return "shapeice_mod";
        case "shape plants":
            return "shapeplants_mod";
        case "cooking":
            return "cooking_mod";
        case "baking":
            return "baking_mod";
        case "grilling":
            return "grilling_mod";
        case "mixing":
            return "mixing_mod";
        case "simmering":
            return "simmering_mod";
        case "steaming":
            return "steaming_mod";
        case "stewing":
            return "stewing_mod";
        case "leatherworking":
            return "leatherworking_mod";
        case "stitching":
            return "stitching_mod";
        case "tanning":
            return "tanning_mod";
        case "molding":
            return "molding_mod";
        case "glassblowing":
            return "glassblowing_mod";
        case "sculpting":
            return "sculpting_mod";
        case "shape earth":
            return "shapeearth_mod";
        case "shape glass":
            return "shapeglass_mod";
        case "smithing":
            return "smithing_mod";
        case "forging":
            return "forging_mod";
        case "shape metal":
            return "shapemetal_mod";
        case "tinkering":
            return "tinkering_mod";
        case "engineering":
            return "engineering_mod";
        case "goldsmithing":
            return "goldsmithing_mod";
        case "weaving":
            return "weaving_mod";
        case "fabric craft":
            return "fabriccraft_mod";
        case "sewing":
            return "sewing_mod";
        case "disable device":
            return "disabledevice_mod";
        case "open lock":
            return "openlock_mod";
        case "sabotage":
            return "sabotage_mod";
        case "disguise":
            return "disguise_mod";
        case "guise":
            return "guise_mod";
        case "gathering":
            return "gathering_mod";
        case "farm":
            return "farm_mod";
        case "fish":
            return "fish_mod";
        case "forage":
            return "forage_mod";
        case "mining":
            return "mining_mod";
        case "medicine":
            return "medicine_mod";
        case "coat poison":
            return "coatpoison_mod";
        case "dose":
            return "dose_mod";
        case "first aid":
            return "firstaid_mod";
        case "release poison":
            return "releasepoison_mod";
        case "pilot":
            return "pilot_mod";
        case "pilot aircraft":
            return "pilotaircraft_mod";
        case "pilot groundcraft":
            return "pilotgroundcraft_mod";
        case "pilot seacraft":
            return "pilotseacraft_mod";

    }

    return "";
}

function GetElementalDamageMultiplier(targetElement, attackingElement, damage, pb) {

    let output = {
        type: "Neutral",
        damage: damage,
        mod: 0,
    };

    // determine what should happen based on the attack
    switch (targetElement) {
        case "Wood":
            switch (attackingElement) {
                case "Wood":
                    output.type = "Resistance";
                    break;
                case "Metal":
                    output.type = "Weakness";
                    break;
                case "Water":
                    output.type = "Convalesce";
                    break;
            }
            break;
        case "Fire":
            switch (attackingElement) {
                case "Fire":
                    output.type = "Resistance";
                    break;
                case "Water":
                    output.type = "Weakness";
                    break;
                case "Wood":
                    output.type = "Convalesce";
                    break;
            }
            break;
        case "Earth":
            switch (attackingElement) {
                case "Earth":
                    output.type = "Resistance";
                    break;
                case "Wood":
                    output.type = "Weakness";
                    break;
                case "Fire":
                    output.type = "Convalesce";
                    break;
            }
            break;
        case "Metal":
            switch (attackingElement) {
                case "Metal":
                    output.type = "Resistance";
                    break;
                case "Fire":
                    output.type = "Weakness";
                    break;
                case "Earth":
                    output.type = "Convalesce";
                    break;
            }
            break;
        case "Water":
            switch (attackingElement) {
                case "Water":
                    output.type = "Resistance";
                    break;
                case "Earth":
                    output.type = "Weakness";
                    break;
                case "Metal":
                    output.type = "Convalesce";
                    break;
            }
            break;
    }

    switch (output.type) {
        case "Resistance":
            output.mod = pb * 2;
            output.damage -= output.mod;
            if (output.damage < 0) {
                output.damage = 0;
            }
            break;
        case "Weakness":
            output.mod = pb * 2;
            output.damage += output.mod;
            break;
        case "Convalesce":
            output.damage = Math.floor(output.damage * 0.5);
            break;
    }

    return output;
}

function GetDamageTypeQualities(dmgType) {
    // determine how to deal the damage
    var dmgStats = {
        type: dmgType,
        isMagic: false,
        isHealing: false,
        isBarrierHealing: false,
        bypassesBarrier: false,
        isRadiation: false,
        isImpact: false
    };

    // if the target has no barrier, all the damage goes to hp and we can skip dmgStats
    switch (dmgType) {
        case "Ballistic":
        case "Bludgeoning":
        case "Piercing":
        case "Slashing":
            break;
        case "Convalescing":
            dmgStats.isBarrierHealing = true;
            break;
        case "Healing":
        case "Wound":
        case "Trauma":
        case "Fracture":
        case "Sever":
            dmgStats.isHealing = true;
            break;
        case "Acid":
        case "Burn":
        case "Cold":
        case "Force":
        case "Lightning":
        case "Stab":
        case "Rending":
        case "Sonic":
            dmgStats.isMagic = true;
            break;
        case "Poison":
        case "Tension":
            dmgStats.bypassesBarrier = true;
            break;
        case "Radiation":
            dmgStats.isMagic = true;
            dmgStats.isRadiation = true;
            break;
        case "Impact":
            dmgStats.isImpact = true;
            break;
    }

    return dmgStats;
}

// ====== Language

function GetLanguageName(language) {

    switch (language.toLowerCase()) {
        case "minere":
        case "min":
        case "m":
            return "Minere";
        case "apollen":
        case "apo":
        case "apol":
        case "a":
            return "Apollen";
        case "junal":
        case "jun":
        case "j":
            return "Junal";
        case "cert":
        case "cer":
        case "c":
            return "Cert";
        case "lib":
        case "l":
            return "Lib";
        case "jovean":
        case "novan":
            return "Jovean";

        case "byric":
            return "Byric";
        case "ciel":
            return "Ciel";
        case "citeq":
            return "Citeq";
        case "crinere":
            return "Crinere";
        case "dustell":
            return "Dustell";
        case "kleikan":
            return "Kleikan";
        case "manstan":
            return "Manstan";
        case "muralic":
            return "Muralic";
        case "mytikan":
            return "Mytikan";
        case "palmic":
            return "Palmic";
        case "salkan":
            return "Salkan";
        case "sansic":
            return "Sansic";
        case "shira":
            return "Shira";
        case "shorespeak":
            return "Shorespeak";
        case "silq":
            return "Silq";
        case "spirit":
            return "Spirit";
        case "verdeni":
            return "Verdeni";
        case "vulca":
            return "Vulca";
        case "wolfwarg":
            return "Wolfwarg";
        case "beast":
            return "Beast";
        case "emotion":
            return "Emotion";
        case "empathy":
            return "Empathy";

        default:
            return "";
    }
}

function GetLanguageTag(language) {

    switch (language.toLowerCase()) {
        case "minere":
            return "{{language-coastal=1}}";
        case "apollen":
            return "{{language-mountain=1}}";
        case "junal":
            return "{{language-desert=1}}";
        case "cert":
            return "{{language-plains=1}}";
        case "lib":
            return "{{language-rare=1}}";


        case "palmic":
        case "shorespeak":
        case "verdeni":
            return "{{language-coastal=1}}{{language-regional=1}}";
        case "crinere":
        case "vulca":
            return "{{language-coastal=1}}{{language-ancient=1}}";

        case "kleikan":
            return "{{language-mountain=1}}{{language-regional=1}}";

        case "byric":
        case "dustell":
        case "muralic":
            return "{{language-desert=1}}{{language-regional=1}}";
        case "shira":
            return "{{language-desert=1}}{{language-ancient=1}}";

        case "ciel":
        case "citeq":
        case "manstan":
        case "salkan":
        case "sansic":
        case "silq":
            return "{{language-plains=1}}{{language-regional=1}}";

        case "jovean":
            return "{{language-rare=1}}{{language-regional=1}}";
        case "mytikan":
            return "{{language-rare=1}}{{language-ancient=1}}";

        case "wolfwarg":
        case "beast":
        case "empathy":
        case "emotion":
        case "spirit":
            return "{{language-special=1}}";

        default:
            return "{{language-default=1}}";
    }
}

// ====== Basics DB Section
function GetTraitInfo(trait) {
    switch (trait.toLowerCase()) {
        case "":
            return {
                name: ""
            };
        case "aspected":
            return {
                name: "Aspected",
                    desc: `This feature becomes aspected to the caster's elemental affinity or no affinity at all. If the caster has multiple affinities, you may choose one when casting. If the effect deals damage, the damage type changes based on the element chosen. Wood becomes acid, fire becomes burn, earth becomes force, metal becomes lightning, water becomes cold, and nothing become rending.`
            };
        case "attack":
            return {
                name: "Attack",
                    desc: `An ability with this trait involves an attack. For each attack you make beyond the first on your turn, you take a multiple attack penalty.`
            };
        case "auditory":
            return {
                name: "Auditory",
                    desc: `Auditory actions and effects rely on sound. An action with the auditory trait can be successfully performed only if the creature using the action can speak or otherwise produce the required sounds. An effect with the auditory trait has its effect only if the target can hear it. This applies only to sound-based parts of the effect, as determined by the GM. This is different from a sonic effect, which still affects targets who can't hear it (such as deaf targets) as long as the effect itself makes sound.`
            };
        case "augment":
            return {
                name: "Augment",
                    desc: `This effect modifies another action. One action can only be modified by one augment effect. If a creature has multiple augments active upon them, they must choose which augment affects their action they wish to augment. Once an augment is used on an action the augment is expended.`
            };
        case "concentrate":
            return {
                name: "Concentrate",
                    desc: `An action with this trait requires a degree of mental concentration and discipline.`
            };
        case "daily":
            return {
                name: "Daily",
                    desc: `This feature has a limited number of uses. All of its uses recover once you complete a long rest.`
            };
        case "dust":
            return {
                name: "Dust",
                    desc: `This feature targets an object with the intention of breaking down its material components into dust. If the object has multiple component materials, you can only affect the components that match the material you are dusting. When attempting to dust an object you typically can only target materials in your effective area on the surface and up to 1 inch deep unless otherwise noted. When attacking an object you target the object's AC or the wearer's AC, whichever is higher. `
            };
        case "emotion":
            return {
                name: "Emotion",
                    desc: `This effect alters a creature's emotions. Effects with this trait always have the mental trait as well. Creatures with special training or that have mechanical or artificial intelligence are immune to emotion effects.`
            };
        case "encounter":
            return {
                name: "Encounter",
                    desc: `This feature has a limited number of uses. All of its uses recover once you complete a brief rest.`
            };
        case "extrasensory":
            return {
                name: "Extrasensory",
                    desc: `This feature requires attunement to the Ethereal plane in order to be properly utilized. `
            };
        case "favor":
            return {
                name: "Favor",
                    desc: `This feature requires a favor point to be generated and expended to be used.`
            };
        case "fear":
            return {
                name: "Fear",
                    desc: `Fear effects evoke the emotion of fear. Effects with this trait always have the mental and emotion traits as well.`
            };
        case "flourish":
            return {
                name: "Flourish",
                    desc: `Actions with this trait are special techniques that require too much exertion for you to perform frequently. You can use only 1 action with the flourish trait per turn.`
            };
        case "focus":
            return {
                name: "Focus",
                    desc: `Actions with this trait are special techniques that require too much exertion for you to perform frequently. You can use only 1 action with the focus trait per turn. Effects with this trait always have the concentrate trait as well.`
            };
        case "fortune":
            return {
                name: "Fortune",
                    desc: `A fortune effect beneficially alters how you roll your dice. You can never have more than one fortune effect alter a single roll. If multiple fortune effects would apply, you have to pick which to use. If a fortune effect and a misfortune effect would apply to the same roll, the two cancel each other out, and you roll normally.`
            };
        case "ignite":
            return {
                name: "Ignite",
                    desc: `This effect causes flammable material to catch fire. If a creature ends their turn while in fire they take 1d6 burn damage.`
            };
        case "knowledge":
            return {
                name: "Knowledge",
                    desc: `This action allows you to attempt a knowledge skill check to try to remember a bit of knowledge regarding a topic related to that skill. The GM determines the DCs for such checks and which skills apply.`
            };
        case "limited":
            return {
                name: "Limited",
                    desc: `This feature has a limited number of uses. All of its uses recover once you complete a short rest.`
            };
        case "linguistic":
            return {
                name: "Linguistic",
                    desc: `An effect with this trait depends on language comprehension. A linguistic effect that targets a creature works only if the target understands the language you are using.`
            };
        case "loud":
            return {
                name: "Loud",
                    desc: `The action creates a loud booming noise, audible to those within 300 feet of the source.`
            };
        case "maneuver":
            return {
                name: "Maneuver",
                    desc: `In order to use this action you must expend a superiority die. If you have no superiority dice remaining then this action has no effect.`
            };
        case "manifest":
            return {
                name: "Manifest",
                    desc: `This action allows a spirit to manifest into the material plane. The spirit must choose a target that doesn't already have a spirit within it. A creature or object a spirit is manifesting into is referred to as a host. During the manifestation time, a spirit must remain in the same location as their host's position from the spirit plane. Once a spirit has manifested into the material plane they leave the spirit plane and move with the target of their manifestation. Maintaining a manifestation takes as much effort from them as their host. As such, a spirit's ability to rest is shared with their host.`
            };
        case "manipulate":
            return {
                name: "Manipulate",
                    desc: `You must physically manipulate an item or make gestures to use an action with this trait. Creatures without a suitable appendage can’t perform actions with this trait. Manipulate actions often trigger reactions.`
            };
        case "mental":
            return {
                name: "Mental",
                    desc: `A mental effect can alter the target's mind. It has no effect on an object or a mindless creature.`
            };
        case "metamagic":
            return {
                name: "Metamagic",
                    desc: `Metamagic actions usually require that you use metamagic charges in order to use them. Metamagic charges can be created when using a metamagic action by spending 100 Ki per charge. You must use a metamagic action directly before Casting the Spell you want to alter. If you use any action (including free actions and reactions) other than Cast a Spell directly after, you waste the benefits of the metamagic action. `
            };
        case "misfortune":
            return {
                name: "Misfortune",
                    desc: `A misfortune effect detrimentally alters how you roll your dice. You can never have more than one misfortune effect alter a single roll. If multiple misfortune effects would apply, the GM decides which is worse and applies it. If a fortune effect and a misfortune effect would apply to the same roll, the two cancel each other out, and you roll normally.`
            };
        case "move":
            return {
                name: "Move",
                    desc: `An action with this trait involves moving from one space to another.`
            };
        case "onset":
            return {
                name: "Onset",
                    desc: `This feature is always a part of an area effect. When a creature enters the effect's area for the first time on a turn or starts its turn there the creature must make a save as determined by the effect. This feature cannot be activated multiple times on the same creature per round.`
            };
        case "open":
            return {
                name: "Open",
                    desc: `These actions work only as the first salvo in the attacks you make on your turn. You can use an action with the open trait only if you haven't used an action with the attack or open trait yet this turn.`
            };
        case "press":
            return {
                name: "Press",
                    desc: `Actions with this trait allow you to follow up earlier attacks. An action with the press trait can be used only if you are currently affected by a multiple attack penalty. You can't use a press action when it's not your turn, even if you use the Ready activity.`
            };
        case "renitence":
            return {
                name: "Renitence",
                    desc: `Actions with this trait typically cause some kind of debilitating effect that becomes ineffective if used frequently. Creatures cannot be targetted by this action for 1 minute after they have been targetted by this action.`
            };
        case "round":
            return {
                name: "Round",
                    desc: `This action can only be performed once per round. The action recovers at the start of your turn.`
            };
        case "secret":
            return {
                name: "Secret",
                    desc: `The GM rolls the check for this ability in secret.`
            };
        case "stance":
            return {
                name: "Stance",
                    desc: `A stance is a general combat strategy that you enter by using an action with the stance trait, and you remain in for some time. A stance lasts until you get knocked unconscious, until its requirements (if any) are violated, until the encounter ends, or until you enter a new stance, whichever comes first. After you take an action with the stance trait, you can't take another one for 1 round.`
            };
        case "visual":
            return {
                name: "Visual",
                    desc: `A visual effect can affect only creatures that can see it. This applies only to visible parts of the effect, as determined by the GM.`
            };
        case "vortex":
            return {
                name: "Vortex",
                    desc: `This feature is always a part of an area effect. The effect will always attempt to restrain those within its area. If it successfully restrains a creature, at the start of the creature's turn the vortex will act on the creature as determined by the effect. A restrained creature may use the Break Free or Escape Artist action against the effect's DC to escape the vortex. Many vortexes have additional effects that may trigger on a creature's escape.`
            };
        case "archetype":
            return {
                name: "Archetype",
                    desc: `This feat is usually tied to an archetype or a class. These feats will sometimes require an archetype to be of a certain level instead of a class. A feat with this trait can be selected when a class grants an archetype feat. `
            };
        case "ascension":
            return {
                name: "Ascension",
                    desc: `This feat helps develop capabilities of Espers. These feats can be selected when a class grants an ascension feat.`
            };
        case "combat":
            return {
                name: "Combat",
                    desc: `A feat with the combat trait improves your battle prowess or gives you new actions for a skill. A feat with this trait can be selected when a class grants a combat feat or general feat. `
            };
        case "dedication":
            return {
                name: "Dedication",
                    desc: `A dedication feat is often the first feat required for a variety of feats. They represent focus into a type of fighting style, technique, magic, or something else. `
            };
        case "forma":
            return {
                name: "Forma",
                    desc: `A forma feat allow Espers and Eidolons to manifest their forma. These feats are typically granted when an Esper or Eidolon are created.`
            };
        case "general":
            return {
                name: "General",
                    desc: `A type of feat that any character can select, regardless of ancestry and class, as long as they meet the prerequisites. You can select a feat with this trait when your class grants a general feat.`
            };
        case "skill":
            return {
                name: "Skill",
                    desc: `A feat with the skill trait improves your skills and their actions or gives you new actions for a skill. A feat with this trait can be selected when a class grants a skill feat or general feat. `
            };
        case "spell":
            return {
                name: "Spell",
                    desc: `A feat with the spell trait focuses on increasing your mastery over spellcasting. A feat with this trait can be selected when a class grants a spell feat or general feat. `
            };
        case "spirit":
            return {
                name: "Spirit",
                    desc: `This feat helps spirits develop their abilities. These feats can be selected when a class grants a spirit feat.`
            };
        case "boundary":
            return {
                name: "Boundary",
                    desc: `This spell causes a wall to manifest at a point within range. The spell will always state the dimensions of the panels. When making the wall, each panel must be contiguous with at least one other panel. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material.`
            };
        case "cloak":
            return {
                name: "Cloak",
                    desc: `This spell cloaks the creature with magic in some way. While under the effects of a cloak spell, a creature can only take actions that have the move trait or are specializations of the Insight or Perception skill. Taking any other action, or being damaged, will end the effects of the cloak spell.`
            };
        case "cloud":
            return {
                name: "Cloud",
                    desc: `This spell creates a cloud made of solidified ether particles. The cloud spreads around corners, and its area is considered heavily obscured. It lasts for the duration of the spell or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.`
            };
        case "environmental":
            return {
                name: "Environmental",
                    desc: `This spell alters the environment in some way by creating temporary ethereal matter. Any environmental changes this spell creates maintains form for the duration of the spell or until the caster dismisses it as a free action.`
            };
        case "evocation":
            return {
                name: "Evocation",
                    desc: `This spell creates an instantaneous effect from ether that immediately disipates once the spell completes.`
            };
        case "illusion":
            return {
                name: "Illusion",
                    desc: `This spell creates an illusion to hide what is truly there. Actively examining the illusion with an Investigation (Analyze) check grants a creature a Wisdom saving throw against the caster's spellcasting DC. But on spellcaster's success, it concludes that the illusion is the genuine article.`
            };
        case "platform":
            return {
                name: "Platform",
                    desc: `This spell creates a platform that raises out from a solid surface within range. The spell will always state the dimensions of the platform. If the platform deals damage to creatures the platform can always be slowed to instead deal no damage. If a platform is prevented from reaching its full height because of a ceiling or other obstacle, any creature on the platform takes 3d6 bludgeoning damage and is restrained, pinched between the platform and the obstacle. The creature can use the Break Free or Escape Artist action against the spellcaster's spellcasting DC. `
            };
        case "ravage":
            return {
                name: "Ravage",
                    desc: `This spell deals damage to targets affected by the spell, either by being in the area or being targetted by the caster. When saving against a spell of this type, a target takes the listed damage when the spell is successful. On critical success, all damage dice of the spell is doubled. On failure all damage is halved and on critical failure the target takes no damage.`
            };
        case "structure":
            return {
                name: "Structure",
                    desc: `This spell manipulates ether to form it into a solid material. The material maintains form for the duration of the spell or until the caster dismisses it as a free action. If, on creation, the material cuts through a creature’s space when it appears, the creature is pushed to one side of the material (your choice). If a creature would be surrounded on all sides by the structure (or the structure and another solid surface), that creature can make a Dexterity saving throw against the caster's spellcasting DC. On a success, it can use its reaction to move up to its speed so that it is no longer enclosed by the structure.`
            };
        case "sustain":
            return {
                name: "Sustain",
                    desc: `This spell requires focus to maintain. You can always freely have a single sustain spell active, however maintaining more than one requires you to sustain each spell after the first. When a sustain spell is forced to end, all effects it has created immediately end.`
            };
        case "temporal":
            return {
                name: "Temporal",
                    desc: `This spell affects time in a local area and grants actions to the caster. Whenever a spell with this trait is used, those who are trained in the Time branch and are within 2 miles of the source become aware that time magic was used. Those within 500 feet of the caster also gain all of the effects of the spell that was cast. Regardless of the spell's effects, all other creatures and objects are invulnerable to your attacks, and you can't target or affect them with anything.`
            };
        case "arcane":
            return {
                name: "Arcane",
                    desc: `This feature is tied to magic and requires a source of mana in order to be properly utilized. To use the feature does not necessarily mean they need to have a resource to create mana but rather the user must be able to manipulate mana at all.`
            };
        case "cerebrate":
            return {
                name: "Cerebrate",
                    desc: `This is an arcane trait that is unique amongst cerebrate casters. To use this feature, the user must be a cerebrate caster.`
            };
        case "ethereal":
            return {
                name: "Ethereal",
                    desc: `This is an arcane trait that is unique amongst ethereal casters. To use this feature, the user must be an ethereal caster.`
            };
        case "kinetic":
            return {
                name: "Kinetic",
                    desc: `This is an arcane trait that is unique amongst kinetic casters. To use this feature, the user must be a kinetic caster.`
            };
        case "martial":
            return {
                name: "Martial",
                    desc: `This feature is tied to martial techniques learned through continuous training. `
            };
        case "spirit":
            return {
                name: "Spirit",
                    desc: `This feature is unique to spirits and those that can take a spirit within them.`
            };
    }
    return {
        name: "",
    };
}




// ======= Rooms DB Section
function GetRoomData(room) {
    switch (room.toLowerCase()) {
        case "bath":
            return {
                name: "Bath",
                    cost: 12000,
                    earnings: 0,
                    size: 2,
                    description: "A Bath contains a single bathtub, a stove for heating water, and a toilet. <br /> <br /> After spending 1 hour in this room, you gain a +2 bonus on your next ongoing Constitution save against disease.",
            };
        case "bedroom":
            return {
                name: "Bedroom",
                    cost: 30000,
                    earnings: 6,
                    size: 4,
                    description: "A Bedroom provides comfort and privacy for one to two people, and typically features one large bed or two smaller beds. Many also have furnishings or features, such as chairs, wardrobes, chests, tables, or small fireplaces. a Bedroom might be the sleeping place of a building's owner or a comfortable room for rent.",
            };
        case "bunks":
            return {
                name: "Bunks",
                    cost: 40000,
                    earnings: 16,
                    size: 15,
                    description: "Bunks provide housing and limited storage for up to 10 people. Though hardly private, this space typically includes beds or cots, linens, small chests with poor locks, and chamber pots. If this room is part of an Inn, the building is more of a flophouse or hostel than a traveler's hotel, which would have private rooms. If part of a Hospital, this room houses patients.",
            };
        case "kitchen":
            return {
                name: "Kitchen",
                    cost: 16000,
                    earnings: 8,
                    size: 2,
                    description: "A Kitchen is used to prepare food. It contains a stove, sink, and small pantry with basic cooking tools and supplies. a Kitchen for a business that serves food, such as an Inn, probably also has Storage just for foodstuffs. \n\nA kitchen in a home can be used to reduce weekly costs by 100 Jin per week.",
            };
        case "laundry":
            return {
                name: "Laundry",
                    cost: 12000,
                    earnings: 6,
                    size: 2,
                    description: "A Laundry contains a large vat for soaking clothes, a cauldron to heat water, washboards, drying lines, and racks and bins for dry clothes. This might be an outside area adjacent to a building. <br /><br />Employees and regular users of a Laundry gain a +1 bonus on Constitution saves to resist contracting a disease while they're in the settlement.",
            };
        case "lodging":
            return {
                name: "Lodging",
                    cost: 43000,
                    earnings: 24,
                    size: 20,
                    description: "This area is subdivided into smaller chambers and provides private housing and limited storage for up to 10 people. Each chamber typically includes one or two small beds, linens, a chamber pot, and a small table and chair. The door to the chamber is a simple wooden door with a simple lock. You may upgrade individual locks by paying the price difference between a simple lock and the desired lock.",
            };
        case "nursery":
            return {
                name: "Nursery",
                    cost: 25000,
                    earnings: 12,
                    size: 8,
                    description: "A Nursery is used to care for infants and children. It contains cribs and beds for children, toys for their entertainment, a table for changing, and cabinets for supplies.",
            };
        case "sitting room":
            return {
                name: "Sitting Room",
                    cost: 48000,
                    earnings: 8,
                    size: 6,
                    description: "This is a room used for meeting and entertaining in a relaxed, comfortable setting, such as a den, dining room, or smoking room. It has furnishings appropriate to its function (chairs for a sitting room, table and chairs for a dining room, and so on). By spending an hour conversing with guests in a social manner, the host of the room gains a +1 bonus on Deception, Intimidation checks, Persuasion, and Performance checks to influence or learn about those guests for the next 24 hours.",
            };
        case "altar":
            return {
                name: "Altar",
                    cost: 21000,
                    earnings: 6,
                    size: 2,
                    description: "This spiritual focal point has the iconography and materials required for a ceremony. a typical Altar takes the form of a stone altar, but it could also be a sacred pool, a sacrificial pyre, a collection of statuettes, or a similar sacred convergence.",
            };
        case "auditorium":
            return {
                name: "Auditorium",
                    cost: 91000,
                    earnings: 30,
                    size: 40,
                    description: "This large room is used for various artistic performances. It contains a stage, costumes, instruments, and seating for an audience. The superior acoustics and décor grant a +2 bonus on all Performance checks made in this room.",
            };
        case "ballroom":
            return {
                name: "Ballroom",
                    cost: 76000,
                    earnings: 20,
                    size: 40,
                    description: "This large open room is intended for dances, receptions, and other elaborate events. The superior acoustics and decor grant a +2 bonus on all Perform checks made in this room.",
            };
        case "bar":
            return {
                name: "Bar",
                    cost: 25000,
                    earnings: 20,
                    size: 10,
                    description: "A Bar stores a selection of drinks and includes a counter for preparing them. After spending an hour with local people in this room, for the next 24 hours you gain a +1 bonus on Persuasion checks you make to gather information in the settlement.",
            };
        case "battle ring":
            return {
                name: "Battle Ring",
                    cost: 80000,
                    earnings: 30,
                    size: 40,
                    description: "This enclosed field is used for some form of dangerous contest, from nonlethal sports like wrestling or boxing to lethal blood sports such as gladiatorial combat. It includes seating for spectators, appropriate flooring (padded or sandy), and often some manner of barrier between the audience and combatants. Each day, the person in charge of the Battle Ring can grant one combatant a +2 bonus on Intimidate and performance combat checks. This benefit applies only within the settlement.",
            };
        case "burial ground":
            return {
                name: "Burial Ground",
                    cost: 35000,
                    earnings: 8,
                    size: 20,
                    description: "This somber plot of land is dedicated to the internment of the dead. Up to 20 Medium or smaller corpses can be buried here, their plots clearly marked by gravestones, statues, or other markers.",
            };
        case "ceremonial room":
            return {
                name: "Ceremonial Room",
                    cost: 118000,
                    earnings: 20,
                    size: 40,
                    description: "This is a large, open room for important events such as religious services, town meetings, and weddings. It often features an elevated area for the focus or leader of the event, and might have seats for others in attendance. A person leading or officially speaking at the event gains a +1 bonus on Deception, Intimidation, and Diplomacy checks to influence others at the event. This bonus ends when the event ends.",
            };
        case "classroom":
            return {
                name: "Classroom",
                    cost: 25000,
                    earnings: 16,
                    size: 5,
                    description: "This small meeting place gives numerous attendees an unobstructed view of a single lecturer. Many classrooms contain seating for those in attendance, a lectern, and a display table or chalkboard.",
            };
        case "common room":
            return {
                name: "Common Room",
                    cost: 30000,
                    earnings: 14,
                    size: 10,
                    description: "This versatile open area has enough space for many people to use at once. a Common Room is typically furnished with benches, chairs, cushions, mats, pews, or stools, and might have tables.",
            };
        case "execution yard":
            return {
                name: "Execution Yard",
                    cost: 42000,
                    earnings: 0,
                    size: 20,
                    description: "This open area is used to host public executions. The execution device, such as a headsman's block or gallows, occupies a dais in the yard's center. Surrounding it are viewing galleries for guests of assorted status and plenty of standing room for lower-class rabble. Gibbets or pikes around the yard display the condemned, granting a +3 bonus on Intimidation checks within the settlement to whoever publicly ordered the execution.",
            };
        case "game room":
            return {
                name: "Game Room",
                    cost: 30000,
                    earnings: 10,
                    size: 10,
                    description: "A Game Room has tables for gambling or other forms of gaming, and is often used to make wagers on blood sports or other illicit activities. The listed Earnings includes illegal gaming. If your building allows only legal gaming (whether recreational or using money), the Earnings are Funds +10 (not +20) and the Benefit is Crime +0, Danger +0.",
            };
        case "infirmary":
            return {
                name: "Infirmary",
                    cost: 37000,
                    earnings: 16,
                    size: 4,
                    description: "An Infirmary is used for treating injured and sick people. It contains beds or cots, a wash basin, and medical supplies. This counts as having a healer's kit for up to two healers at a time. As long as the building doesn't have the broken condition, you don't need to track individual uses of these healer's kits.",
            };
        case "reliquary":
            return {
                name: "Reliquary",
                    cost: 26000,
                    earnings: 10,
                    size: 1,
                    description: "A Reliquary is built to securely store religious artifacts, and dedicated to a specific deity or philosophy. It contains shelves to house the items, special display cases to protect them, and sometimes chairs and tables to allow study. It's secured by a strong wooden door or grating with a good lock. Unlike a Vault, a Reliquary is intended to allow people to observe its contents. When stocked with relics appropriate to the chosen deity or philosophy, the room grants a +1 bonus on Religion checks relating to the history, powers, and purpose of those relics.",
            };
        case "sanctum":
            return {
                name: "Sanctum",
                    cost: 19000,
                    earnings: 0,
                    size: 1,
                    description: "This is a basic room with simple and pleasing decorations, clean lines, and a calming environment perfect for meditation, prayer, and solitude. a person who spends at least 4 hours in a Sanctum doing nothing other than praying or meditating gains a +1 bonus on Wisdom saves. This bonus ends once the person leaves the settlement or after the first time she attempts a Will save.",
            };
        case "sauna":
            return {
                name: "Sauna",
                    cost: 12000,
                    earnings: 6,
                    size: 3,
                    description: "This simple room contains benches, a central source of heat, stones, and a container of water with a ladle to help produce steam. Using a Sauna for an hour grants a person a +2 bonus on saving throws to overcome ongoing diseases and protection against diseases. This bonus goes away after 24 hours. Up to 10 people can use a Sauna at once.",
            };
        case "sports field":
            return {
                name: "Sports Field",
                    cost: 79000,
                    earnings: 20,
                    size: 40,
                    description: "This outdoor area is used for jousting, athletics, war games, and other sports. a Sports Field contains a playing area, seats for spectators and equipment for one type of game.",
            };
        case "statue":
            return {
                name: "Statue",
                    cost: 6000,
                    earnings: 2,
                    size: 1,
                    description: "This area contains a statue, fountain, or other large decoration. If it has religious significance, it might serve as a shrine. The listed cost and time are only to install a completed wood, bronze, or stone feature — they don't include the cost and time to create the feature in the first place, but it must be installed to produce Earnings.",
            };
        case "trophy room":
            return {
                name: "Trophy Room",
                    cost: 25000,
                    earnings: 10,
                    size: 4,
                    description: "This is a place to hang trophies from your adventures, such as stuffed monster heads, rare paintings, strange statues, and old magic items you don't need any more. Because of the display cases and clutter, this room isn't much good for anything else, though it might include chairs or benches to allow people to sit while they admire your treasures. If you want to use your trophies to decorate another room instead of placing them in their own room, construct the Furnishings augmentation instead. A Museum makes money by charging visitors or sponsors to view items like these.",
            };
        case "war room":
            return {
                name: "War Room",
                    cost: 30000,
                    earnings: 0,
                    size: 4,
                    description: "This is a room for planning military maneuvers, plotting grand heists, or providing briefings. It contains a large central table with plenty of chairs, maps, and figures to simulate troops and structures. When it's used for planning a battle, your army gains a +2 bonus on attack rolls and morale checks for their next battle within 24 hours. To grant the army this bonus, the army's commander must be present at the planning meeting for the battle or you must have some way of communicating these instructions to the commander.",
            };
        case "armory":
            return {
                name: "Armory",
                    cost: 39000,
                    earnings: 0,
                    size: 5,
                    description: "An Armory stores a variety of armor and weapons, providing enough equipment to supply one Bunks or Guard Post with common equipment (the guards or soldiers leave their armor and weapons here, and you don't have to pay for individual equipment for them as long as this room is not broken). The room is typically supplied with medium armor and appropriate martial weapons for the guards or soldiers in the building. The Armory contains an array of helpful tools to allow you to don armor in the time it normally takes to don hastily.",
            };
        case "cell":
            return {
                name: "Cell",
                    cost: 18000,
                    earnings: 0,
                    size: 1,
                    description: "This uncomfortable room can imprison 1 to 4 captives. It is typically nothing more than a stone room with a straw-lined floor, though some might have the barest of comforts, like cots or chamber pots. One wall is typically constructed of sturdy bars and a door affixed with a simple lock. You can install manacles or masterwork manacles at the normal price of those items.",
            };
        case "false front":
            return {
                name: "False Front",
                    cost: 19000,
                    earnings: 0,
                    size: 10,
                    description: "This simple, nondescript business uses an innocuous front to hide criminal dealings. It might appear to be a low-quality pawnshop or ill-stocked market. It has the bare necessities for functioning as the kind of business it pretends to be, but its true purpose is to conceal the nature of the building—typically a criminal enterprise or secret meeting place, such as a cult's sanctuary or a den of thieves. The room includes a secret door leading to the rest of the building. The room increases Perception and Insight DCs by 5 for those trying to notice unusual activity or determine whether the building is what it seems. Since a False Front contains both a false Storefront and false display area, its space can be upgraded to both Storage and a Storefront simultaneously (or upgraded to just one, leaving the remaining area unused).",
            };
        case "office":
            return {
                name: "Office",
                    cost: 12000,
                    earnings: 0,
                    size: 2,
                    description: "This simple room includes a door with a simple lock, a chair, and a large desk that has two drawers with simple locks. An Office affords its user privacy and a refuge from other activity in the building.",
            };
        case "secret room":
            return {
                name: "Secret Room",
                    cost: 22000,
                    earnings: 0,
                    size: 6,
                    description: "This is either a room or a passage connecting two rooms in the building. The access to this space is controlled by a secret door (DC 20). A passage can have secret doors at both ends or a normal door at one end and a secret door at the other. If it's a room, it is typically used to hide someone or something you don't want discovered. If it's a passage, it's typically used for clandestine travel within the building, often for the purpose of smuggling or spying. For every 500 extra gp you spend, you can improve one secret door in the building to a well-hidden secret door (DC 30).",
            };
        case "shack":
            return {
                name: "Shack",
                    cost: 10000,
                    earnings: 0,
                    size: 2,
                    description: "This no-frills wooden shelter contains a simple table, pallet bed, and stool. One person can build a shack with simple tools and basic materials.",
            };
        case "storage":
            return {
                name: "Storage",
                    cost: 12000,
                    earnings: 4,
                    size: 4,
                    description: "Storage is any room used to store objects, keeping them out of the way for later use. Most Warehouses are just multiple Storage rooms built into a single building. A low-cost shop may allow its customers to browse items in the Storage area. A door to a Storage room includes an average lock.",
            };
        case "storefront":
            return {
                name: "Storefront",
                    cost: 19000,
                    earnings: 10,
                    size: 2,
                    description: "This is a simple storefront, holding a wooden counter, a ledger, shelves, and other necessities to run a business.",
            };
        case "vault":
            return {
                name: "Vault",
                    cost: 30000,
                    earnings: 0,
                    size: 4,
                    description: "This is a secure room designed to keep out intruders. The access to this space is controlled by an iron door with a good lock. If you upgrade this room to a Secret Room, the door retains its material and lock and also becomes a secret door.",
            };
        case "alchemy lab":
            return {
                name: "Alchemy Lab",
                    cost: 39000,
                    earnings: 10,
                    size: 8,
                    description: "This room grants you a +5 bonus when you’re attempting Alchemy checks, researching new alchemy formulae, and performing similar alchemy tasks and can be used for Alchemist vocation skills. Up to three people can use the room at a time.",
            };
        case "brewery":
            return {
                name: "Brewery",
                    cost: 38000,
                    earnings: 20,
                    size: 12,
                    description: "A Brewery allows you to ferment or distill ingredients such as fruits and grain to create potent beverages. This room grants you a +5 bonus when you’re attempting Brewing checks.",
            };
        case "canvasing room":
            return {
                name: "Canvasing Room",
                    cost: 26000,
                    earnings: 10,
                    size: 10,
                    description: "This room is large to fit many easels and desks to illustrate and paint. There is also plenty of wall space to display finished artwork. This room grants you a +5 bonus when you’re attempting illustrating checks and can be used for Painter vocation skills. Up to three people can use the room at a time.",
            };
        case "cook house":
            return {
                name: "Cook House",
                    cost: 34000,
                    earnings: 10,
                    size: 8,
                    description: "This large kitchen has bigger stoves, more icebox space, and all the kitchen utensils you will ever need. This room grants you a +5 bonus when you’re attempting cooking checks and can be used for Chef vocation skills. Up to three people can use the room at a time.",
            };
        case "forge":
            return {
                name: "Forge",
                    cost: 37000,
                    earnings: 10,
                    size: 8,
                    description: "A Forge includes a hearth, an anvil, a slack tub, metalworking tools, and other appropriate materials for shaping iron and other metals. This room grants you a +5 bonus when you’re attempting smithing checks and can be used for Smith vocation skills. Up to three people can use the room at a time.",
            };
        case "leather workshop":
            return {
                name: "Leather Workshop",
                    cost: 39000,
                    earnings: 20,
                    size: 4,
                    description: "This workshop includes a sturdy table, stool, vats, drying racks, and tools designed for turning raw hides into leather. The Leather Workshop grants you a +5 bonus when you’re attempting leatherworking checks",
            };
        case "printer":
            return {
                name: "Printer",
                    cost: 39000,
                    earnings: 10,
                    size: 5,
                    description: "This specialized workshop contains a printing press, storage for paper, and drying racks for finished books and pamphlets. This room grants you a +5 bonus when you’re attempting penmanship checks and can be used for Archivist vocation skills. Up to three people can use the room at a time.",
            };
        case "sculpting room":
            return {
                name: "Sculpting Room",
                    cost: 26000,
                    earnings: 10,
                    size: 10,
                    description: "This room is a large open space with pedestals to create statues upon. This room grants you a +5 bonus when you’re attempting molding checks and can be used for Sculptor vocation skills. Up to three people can use the room at a time.",
            };
        case "sewing room":
            return {
                name: "Sewing Room",
                    cost: 30000,
                    earnings: 10,
                    size: 6,
                    description: "A Sewing Room is used for designing heraldry and making cloth garments, tapestries, blankets, carpets, linens, and other textiles. It contains a loom; a spinning wheel; tapestry frames; shelves for fabric; worktables; and tools for spinning, weaving, and sewing. This room grants you a +5 bonus when you’re attempting weaving checks and can be used for Tailor vocation skills. Up to three people can use the room at a time.",
            };
        case "tinker workshop":
            return {
                name: "Tinker Workshop",
                    cost: 40000,
                    earnings: 10,
                    size: 6,
                    description: "This workshop contains gears, crystals, and fine craftsmanship tools for tinkering with mechanical devices. This room grants you a +5 bonus when you’re attempting tinkering checks and can be used for Technician vocation skills. Up to three people can use the room at a time.",
            };
        case "woodworking shop":
            return {
                name: "Woodworking Shop",
                    cost: 30000,
                    earnings: 20,
                    size: 4,
                    description: "This workshop contains tables and tools to cut and shape wood. The room grants you a +5 bonus when you’re attempting carving checks",
            };
    }
    return {
        name: "-",
        cost: 0,
        earnings: 0,
        size: 0,
        description: "-"
    };
}




// ======= Conditions DB Section
function GetInjury(injury) {
    switch (injury.toLowerCase()) {
    case "":
    return {
    name: ""
    };
    case "bruising": 
    return {
    name: "Bruising",
    category: "Basic",
    type: "Wound",
    subtype: "Bruise",
    removal: "Recovery",
    condition: "",
    description: `You are left bruised from a strong impact. The injury doesn't have any adverse effects.`,
    recoveryDescription: ``,
    mitigationDescription: ``
    };
    case "bleeding": 
    return {
    name: "Bleeding",
    category: "Basic",
    type: "Wound",
    subtype: "Bleed",
    removal: "Recovery",
    condition: "",
    description: `You are left bleeding due to a cut or puncture in your flesh. The injury doesn't have any adverse effects.`,
    recoveryDescription: ``,
    mitigationDescription: ``
    };
    case "burned": 
    return {
    name: "Burned",
    category: "Basic",
    type: "Wound",
    subtype: "Burn",
    removal: "Recovery",
    condition: "",
    description: `You have burns left on your body. The injury doesn't have any adverse effects.`,
    recoveryDescription: ``,
    mitigationDescription: ``
    };
    case "numbness": 
    return {
    name: "Numbness",
    category: "Basic",
    type: "Trauma",
    subtype: "Stun",
    removal: "Recovery",
    condition: "",
    description: `Your skin is tingling due a recent shock to your flesh. The injury doesn't have any adverse effects.`,
    recoveryDescription: ``,
    mitigationDescription: ``
    };
    case "ringing ears": 
    return {
    name: "Ringing Ears",
    category: "Basic",
    type: "Trauma",
    subtype: "Sensory",
    removal: "Recovery",
    condition: "",
    description: `Your ears are still ringing from a sonic attack. The injury doesn't have any adverse effects.`,
    recoveryDescription: ``,
    mitigationDescription: ``
    };
    case "nausea": 
    return {
    name: "Nausea",
    category: "Basic",
    type: "Trauma",
    subtype: "Sickness",
    removal: "Recovery",
    condition: "",
    description: `You feel ready to vomit due to an effect on your body. The injury doesn't have any adverse effects.`,
    recoveryDescription: ``,
    mitigationDescription: ``
    };
    case "tension": 
    return {
    name: "Tension",
    category: "Basic",
    type: "Trauma",
    subtype: "Internal",
    removal: "Recovery",
    condition: "",
    description: `You have small wounds left internally. The injury doesn't have any adverse effects.`,
    recoveryDescription: ``,
    mitigationDescription: ``
    };
    
    }
    return {
    name: "",
    };
    }
    
function GetBasicInjury(damageType) {
switch (damageType.toLowerCase()) {
case "bludgeoning":
case "force":
case "impact":
return GetInjury("Bruising");
case "piercing":
case "ballistic":
case "stab":
case "slashing":
case "rending":
return GetInjury("Bleeding");
case "acid":
case "burn":
return GetInjury("Burned");
case "lightning":
case "cold":
return GetInjury("Numbness");
case "sonic":
return GetInjury("Ringing Ears");
case "poison":
case "radiation":
return GetInjury("Nausea");
case "tension":
return GetInjury("Tension");

default:
return GetInjury("");
}
}

function GetMajorInjury(damageType) {
return GetBasicInjury(damageType);
}

function GetCondition(condition) {
switch (condition.toLowerCase()) {
case "":
return {
name: ""
};
case "blinded": 
return {
name: "Blinded",
short: `Auto fail sight checks. Attacks have disadv. Attacks against creature have adv.`,
long: `A blinded creature can’t see and automatically fails any ability check that requires sight.
Attack rolls against the creature have advantage, and the creature’s attack rolls have disadvantage.`
};
case "charmed": 
return {
name: "Charmed",
short: `Disadvantage on Skill checks. Can't use actions with concentrate trait.`,
long: `You are compelled to focus your attention on something, distracting you from whatever else is going on around you. 
You have disadvantage on Skill checks as long as your charmer is within line of sight.
You can't use actions with the Concentrate trait.`
};
case "deafened": 
return {
name: "Deafened",
short: `Auto fail hear checks.`,
long: `A deafened creature can’t hear and automatically fails any ability check that requires hearing.`
};
case "downed": 
return {
name: "Downed",
short: `No actions or reactions. No move. Drop everything and prone. Auto fail Str and Dex saves. Attacks against creature have adv and auto-crit if within 5 feet.`,
long: `A downed creature is incapacitated (see the condition) and cannot move.
The creature drops whatever it’s holding and falls prone.
The creature automatically fails Strength and Dexterity saving throws.
Attack rolls against the creature have advantage.
Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.`
};
case "flat-footed": 
return {
name: "Flat-Footed",
short: ``,
long: `You’re distracted or otherwise unable to focus your full attention on defense. You take a –2 circumstance penalty to AC. Some effects give you the flat-footed condition only to certain creatures or against certain attacks. Others—especially conditions—can make you universally flat-footed against everything. If a rule doesn’t specify that the condition applies only to certain circumstances, it applies to all of them; for example, many effects simply say “The target is flat-footed.”`
};
case "frightened": 
return {
name: "Frightened",
short: `If fear source in line of sight, attacks and abilities have disadv. Can't move closer to fear source.`,
long: `A frightened creature has disadvantage on ability checks and attack rolls against the source of its fear.
The creature can’t willingly move closer to the source of its fear.`
};
case "grappled": 
return {
name: "Grappled",
short: `Speed is 0.`,
long: `A grappled creature’s speed becomes 0, and it can’t benefit from any bonus to its speed.
The condition ends if the grappler is incapacitated (see the condition).
The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the thunderwave spell.`
};
case "incapacitated": 
return {
name: "Incapacitated",
short: `No actions or reactions.`,
long: `An incapacitated creature can’t take actions or reactions.`
};
case "invisible": 
return {
name: "Invisible",
short: `Attacks have adv. Attacks against creature have disadv.`,
long: `An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured. The creature’s location can be detected by any noise it makes or any tracks it leaves.
Attack rolls against the creature have disadvantage, and the creature’s attack rolls have advantage.`
};
case "paralyzed": 
return {
name: "Paralyzed",
short: `No actions or reactions. No move or speak. Auto fail Str and Dex saves. Attacks against creature have adv and auto-crit if within 5 feet.`,
long: `A paralyzed creature is incapacitated (see the condition) and can’t move or speak.
The creature automatically fails Strength and Dexterity saving throws.
Attack rolls against the creature have advantage.
Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.`
};
case "petrified": 
return {
name: "Petrified",
short: `No actions or reactions. No move or speak. Auto fail Str and Dex saves. Attacks against creature have adv. Resistance to all damage. Immune to disease and poison.`,
long: `A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging.
The creature is incapacitated (see the condition), can’t move or speak, and is unaware of its surroundings.
Attack rolls against the creature have advantage.
The creature automatically fails Strength and Dexterity saving throws.
The creature has resistance to all damage.
The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized.`
};
case "poisoned": 
return {
name: "Poisoned",
short: `Attacks and abilities have disadv.`,
long: `A poisoned creature has disadvantage on attack rolls and ability checks.`
};
case "prone": 
return {
name: "Prone",
short: `You are flat-footed and have -2 on attacks.`,
long: `You’re lying on the ground. The only move actions you can use while you’re prone are Crawl and Stand. Standing up ends the prone condition.
You are flat-footed and take a –2 circumstance penalty to attack rolls.
You can Take Cover while prone to hunker down and gain greater cover against ranged attacks, even if you don’t have an object to get behind, gaining a +4 circumstance bonus to AC against ranged attacks (but you remain flat-footed).`
};
case "quickened": 
return {
name: "Quickened",
short: `Gain an additional action that has limited use.`,
long: `A quickened creature gains 1 additional action at the start of their turn each round. 
Many effects that make you quickened specify the types of actions you can use with this additional action. If you become quickened from multiple sources, you can use the extra action you’ve been granted for any single action allowed by any of the effects that made you quickened. Because quickened has its effect at the start of your turn, you don’t immediately gain actions if you become quickened during your turn.`
};
case "restrained": 
return {
name: "Restrained",
short: `Speed is 0. Attacks have disadv. Attacks against creature have adv. Dex saves have disadv.`,
long: `A restrained creature’s speed becomes 0, and it can’t benefit from any bonus to its speed.
Attack rolls against the creature have advantage, and the creature’s attack rolls have disadvantage.
The creature has disadvantage on Dexterity saving throws.`
};
case "slowed": 
return {
name: "Slowed",
short: ``,
long: `A slowed creature's speed is halved.`
};
case "staggered": 
return {
name: "Staggered",
short: `Lose a number of actions based on your stagger value. `,
long: `You have fewer actions. Staggered always includes a value. When you regain your actions at the start of your turn, reduce the number of actions you regain by your staggered value. Because staggered has its effect at the start of your turn, you don't immediately lose actions if you become staggered during your turn.`
};
case "stunned": 
return {
name: "Stunned",
short: `No actions or reactions. No move, limited speak. Auto fail Str and Dex saves. Attacks against creature have adv.`,
long: `A stunned creature is incapacitated (see the condition), can’t move, and can speak only falteringly.
The creature automatically fails Strength and Dexterity saving throws.
Attack rolls against the creature have advantage.`
};
case "unconscious": 
return {
name: "Unconscious",
short: `No actions or reactions. No move or speak. Drop everything and prone. Auto fail Str and Dex saves. Attacks against creature have adv and auto-crit if within 5 feet.`,
long: `An unconscious creature is incapacitated (see the condition), can’t move or speak, and is unaware of its surroundings.
The creature drops whatever it’s holding and falls prone.
The creature automatically fails Strength and Dexterity saving throws.
Attack rolls against the creature have advantage.
Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.`
};
}
return {
name: "",
};
}
    





// ======= Items Data

function GetItemDataObject() {
    return {
        name: "",
        type: "",
        quantity: "1",
        weight: "0",
        desc: "",

        // shared properties
        mainMaterial: "",
        category: "",
        enhancement: "0",
        properties: "",

        // weapon qualities
        group: "",
        damage: "",
        damageType: "",
        element: "",

        // armor qualities
        armor: "0",
        skillPenalty: "0",

        toString: function () {
            return `${this.name}@@${this.type}@@${this.quantity}@@${this.weight}@@${this.desc}@@${this.mainMaterial}@@${this.category}@@${this.enhancement}@@${this.properties}@@${this.group}@@${this.damage}@@${this.damageType}@@${this.element}@@${this.armor}@@${this.skillPenalty}`;
        },
        setData: function (content) {
            let contentSplit = content.split("@@");
            let contentIncrement = 0;
            this.name = contentSplit[contentIncrement];
            contentIncrement++;
            this.type = contentSplit[contentIncrement];
            contentIncrement++;
            this.quantity = contentSplit[contentIncrement];
            contentIncrement++;
            this.weight = contentSplit[contentIncrement];
            contentIncrement++;
            this.desc = contentSplit[contentIncrement];
            contentIncrement++;
            this.mainMaterial = contentSplit[contentIncrement];
            contentIncrement++;
            this.category = contentSplit[contentIncrement];
            contentIncrement++;
            this.enhancement = contentSplit[contentIncrement];
            contentIncrement++;
            this.properties = contentSplit[contentIncrement];
            contentIncrement++;
            this.group = contentSplit[contentIncrement];
            contentIncrement++;
            this.damage = contentSplit[contentIncrement];
            contentIncrement++;
            this.damageType = contentSplit[contentIncrement];
            contentIncrement++;
            this.element = contentSplit[contentIncrement];
            contentIncrement++;
            this.armor = contentSplit[contentIncrement];
            contentIncrement++;
            this.skillPenalty = contentSplit[contentIncrement];
            contentIncrement++;
        }

    };
}

// ======= Items DB Section

function CalculateBlueprintEffort(size, aspects, sizeData, aspectData) {

    size = isNaN(parseInt(size)) ? 1 : parseInt(size);
    let effort = 0;
    let sizeEffort = size;

    // first determine the size effort
    for (let i = 0; i < sizeData.length; i++) {
        if (size >= sizeData[i].motes) {
            if (i == sizeData.length - 1 || size < sizeData[i + 1].motes) {
                sizeEffort = Math.ceil(size * sizeData[i].calc);
                break;
            }
        }
    }
    effort += sizeEffort;

    // iterate over the aspect data and see which components apply
    for (let i = 0; i < aspectData.length; i++) {
        if (aspects.toLowerCase().indexOf(aspectData[i].name.toLowerCase()) > -1) {
            switch (aspectData[i].calc) {
                case "x":
                    effort += 0;
                    break;
                case "s":
                    effort += sizeEffort;
                    break;
                default:
                    effort += isNaN(parseInt(aspectData[i].calc)) ? 0 : parseInt(aspectData[i].calc);
            }
        }
    }

    return effort;
}

function UpdateBlueprintCraftingData(blueprintComponents) {

    let craftMat = {};
    for (let i = 0; i < blueprintComponents.length; i++) {
        // calculate effort
        blueprintComponents[i].effort = CalculateBlueprintEffort(blueprintComponents[i].quantity, blueprintComponents[i].aspects, GetCraftingSizes(), GetCraftingAspects());

        switch (blueprintComponents[i].type) {
            case "M":
                craftMat = GetItemMaterialInfo(blueprintComponents[i].material);
                if (craftMat.name != "") {
                    blueprintComponents[i] = UpdateBlueprintWithCraftingData(blueprintComponents[i], craftMat.rarity, craftMat.cost, craftMat.effort, craftMat.weight, craftMat.element)
                }
                break;
            case "I":
                craftMat = GetItemGoodsInfo(blueprintComponents[i].material);
                if (craftMat.name != "") {
                    blueprintComponents[i] = UpdateBlueprintWithCraftingData(blueprintComponents[i], 1, craftMat.cost, 0, craftMat.weight, "")
                }
                break;
            case "E":
                blueprintComponents[i] = UpdateBlueprintWithCraftingData(blueprintComponents[i], 1, 10, 1, 0, "");
                break;
        };
    }

    return blueprintComponents;
}

function UpdateBlueprintWithCraftingData(blueprintComponent, rarity, cost, effort, weight, element) {
    blueprintComponent.rarity = rarity;
    blueprintComponent.cost = cost;
    blueprintComponent.matEffort = effort;
    blueprintComponent.weight = weight;
    blueprintComponent.element = element;
    return blueprintComponent;
}

function GetCraftingSummary(blueprintComponents) {
    var craftingSummary = {
        baseCost: 0,
        effortCost: 0,
        totalCost: 0,
        costString: "0",
        weight: 0,
        skills: [],
        skillNames: [],
        effort: {},
        blueprint: {}
    }

    var cost = 0;
    var totalEffort = 0;
    var effortCost = 0;

    let cycle = 0;
    let effortMod = 0;
    let effortCostMod = 0;
    let rarityBonus = 0;
    for (var i = 0; i < blueprintComponents.length; i++) {

        // calculate effort
        totalEffort = Math.ceil((isNaN(parseInt(blueprintComponents[i].effort)) ? 0 : parseInt(blueprintComponents[i].effort)) * parseInt(blueprintComponents[i].matEffort));
        blueprintComponents[i].totalEffort = totalEffort;

        // calculate base cost
        cost = parseInt(blueprintComponents[i].quantity) * parseInt(blueprintComponents[i].cost);
        craftingSummary.baseCost += cost;

        // calculate modifiers cost
        effortMod = totalEffort;
        effortCost = 0;
        cycle = 3;
        maxEffortPerCycle = 30;
        maxEffortBonusPerCycle = 15;
        rarityBonus = parseInt(blueprintComponents[i].rarity);
        rarityBonus *= rarityBonus;
        while (effortMod > 0) {

            if (effortMod > maxEffortPerCycle) {
                effortCostMod = maxEffortBonusPerCycle;
            } else {
                effortCostMod = effortMod > maxEffortBonusPerCycle ? maxEffortBonusPerCycle : effortMod;
            }
            effortMod -= maxEffortPerCycle;

            switch (cycle) {
                case 3:
                    effortCost += Math.floor(effortCostMod * rarityBonus * 20);
                    break;
                case 2:
                    effortCost += Math.floor(effortCostMod * rarityBonus * 15);
                    break;
                case 1:
                    effortCost += Math.floor(effortCostMod * rarityBonus * 10);
                    break;
                default:
                    effortCost += Math.floor(effortCostMod * rarityBonus * 5);
                    break;
            }
            cycle--;
        }
        craftingSummary.effortCost += effortCost;
        craftingSummary.costString += " + (" + parseInt(blueprintComponents[i].quantity) + "*" + parseInt(blueprintComponents[i].matEffort) + " + " + effortCost + ")";

        // create the effort listing if it exists
        if (!craftingSummary.skills.includes(blueprintComponents[i].skill)) {
            craftingSummary.skills.push(blueprintComponents[i].skill);
            craftingSummary.skillNames.push(blueprintComponents[i].skillName);
            craftingSummary.effort[blueprintComponents[i].skill] = 0;
        }
        // add the effort
        craftingSummary.effort[blueprintComponents[i].skill] += totalEffort;

        // add the weight
        craftingSummary.weight += parseFloat(blueprintComponents[i].quantity) * parseFloat(blueprintComponents[i].weight);
    }

    // adjust for zeros
    if (craftingSummary.baseCost >= 100000) {
        craftingSummary.baseCost = Math.ceil(craftingSummary.baseCost / 1000) * 1000;
    } else if (craftingSummary.baseCost >= 1000) {
        craftingSummary.baseCost = Math.ceil(craftingSummary.baseCost / 100) * 100;
    } else if (craftingSummary.baseCost >= 100) {
        craftingSummary.baseCost = Math.ceil(craftingSummary.baseCost / 10) * 10;
    }
    if (craftingSummary.effortCost >= 100000) {
        craftingSummary.effortCost = Math.ceil(craftingSummary.effortCost / 1000) * 1000;
    } else if (craftingSummary.effortCost >= 1000) {
        craftingSummary.effortCost = Math.ceil(craftingSummary.effortCost / 100) * 100;
    } else if (craftingSummary.effortCost >= 100) {
        craftingSummary.effortCost = Math.ceil(craftingSummary.effortCost / 10) * 10;
    }
    craftingSummary.totalCost = craftingSummary.baseCost + craftingSummary.effortCost;

    craftingSummary.blueprint = blueprintComponents;

    return craftingSummary;
}

function GetItemMaterialInfo(item) {
    switch (item.toLowerCase()) {
    case "":
    return {
    name: ""
    };
    case "pine": 
    return {
    name: "Pine",
    type: "Common",
    element: "Wood",
    ac: 11,
    dt: 5,
    hb: 1,
    specProp: 0,
    desc: `A common type of soft wood. While Pine is the listed value, these statistics are shared amongst all sott wood.`,
    skills: "Shape Plants, Chiselling, Whittling",
    rarity: 1,
    effort: 1,
    cost: 10,
    weight: 0.2,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: "Flammable, Piercing"
    };
    case "maple": 
    return {
    name: "Maple",
    type: "Common",
    element: "Wood",
    ac: 11,
    dt: 5,
    hb: 1,
    specProp: 0,
    desc: `A common type of hard wood. While Maple is the listed value, these statistics are shared amongst all hard wood.`,
    skills: "Shape Plants, Chiselling, Whittling",
    rarity: 1,
    effort: 1,
    cost: 10,
    weight: 0.2,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: "Flammable, Piercing, Sturdy (1)"
    };
    case "cotton": 
    return {
    name: "Cotton",
    type: "Common",
    element: "Wood",
    ac: 10,
    dt: 5,
    hb: 1,
    specProp: 0,
    desc: `Cotton is a naturally occurring staple fiber. Its flexibility, warmth, and ease to grow makes it popular when used to make clothing and fabric.`,
    skills: "Shape Plants, Fabric Craft, Sewing",
    rarity: 1,
    effort: 1,
    cost: 4,
    weight: 0.1,
    wpnBonus: -2,
    defBonus: 0,
    flexibility: 0,
    properties: "Flammable, Flexible (1)"
    };
    case "hemp": 
    return {
    name: "Hemp",
    type: "Common",
    element: "Wood",
    ac: 10,
    dt: 5,
    hb: 1,
    specProp: 0,
    desc: `This plant is thick and fibrous. It is often used to create rope.`,
    skills: "Shape Plants, Fabric Craft, Sewing",
    rarity: 1,
    effort: 1,
    cost: 6,
    weight: 0.1,
    wpnBonus: -2,
    defBonus: 0,
    flexibility: 0,
    properties: "Flammable, Flexible (1)"
    };
    case "clearth": 
    return {
    name: "Clearth",
    type: "Common",
    element: "Fire",
    ac: 12,
    dt: 10,
    hb: 1,
    specProp: 0,
    desc: `This type of clay hardens into sturdy rock. It is commonly used when making bricks.`,
    skills: "Shape Earth, Brick Craft, Chiselling",
    rarity: 1,
    effort: 1.5,
    cost: 10,
    weight: 0.4,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: "Sturdy (1)"
    };
    case "kaolin": 
    return {
    name: "Kaolin",
    type: "Common",
    element: "Fire",
    ac: 10,
    dt: 0,
    hb: 1,
    specProp: 0,
    desc: `This clay is very malleable but hardens to a nice, firm, and light material when applied to heat. It is often used in pottery and sculpting.`,
    skills: "Shape Earth, Sculpting, ",
    rarity: 1,
    effort: 1.5,
    cost: 14,
    weight: 0.4,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: ""
    };
    case "glass": 
    return {
    name: "Glass",
    type: "Common",
    element: "Fire",
    ac: 10,
    dt: 5,
    hb: 1,
    specProp: 0,
    desc: `Glass is a non-crystalline, often transparent amorphous solid, that has widespread practical, technological, and decorative use.`,
    skills: "Shape Glass, Glassblowing, ",
    rarity: 1,
    effort: 2,
    cost: 30,
    weight: 0.3,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: "Piercing, Sharp, Transparent"
    };
    case "granite": 
    return {
    name: "Granite",
    type: "Common",
    element: "Earth",
    ac: 14,
    dt: 10,
    hb: 1,
    specProp: 0,
    desc: `Granite is a coarse-grained igneous rock.`,
    skills: "Shape Earth, Brick Craft, Chiselling",
    rarity: 1,
    effort: 2,
    cost: 12,
    weight: 0.3,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: "Sturdy (2)"
    };
    case "iron": 
    return {
    name: "Iron",
    type: "Common",
    element: "Metal",
    ac: 15,
    dt: 13,
    hb: 1,
    specProp: 0,
    desc: `Iron is one of the most common metals.`,
    skills: "Shape Metal, Cold Forging, ",
    rarity: 1,
    effort: 2.5,
    cost: 15,
    weight: 1,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: "Piercing, Sharp, Sturdy (2)"
    };
    case "steel": 
    return {
    name: "Steel",
    type: "Common",
    element: "Metal",
    ac: 16,
    dt: 16,
    hb: 2,
    specProp: 0,
    desc: `Steel is refined iron made stronger and sturdier.`,
    skills: "Shape Metal, Cold Forging, ",
    rarity: 1,
    effort: 4,
    cost: 60,
    weight: 1,
    wpnBonus: 1,
    defBonus: 0,
    flexibility: 0,
    properties: "Piercing, Sharp, Sturdy (3)"
    };
    case "nickel": 
    return {
    name: "Nickel",
    type: "Common",
    element: "Metal",
    ac: 12,
    dt: 10,
    hb: 1,
    specProp: 0,
    desc: `Nickel is a slightly golden, common metal.`,
    skills: "Shape Metal, Cold Forging, ",
    rarity: 1,
    effort: 2.5,
    cost: 20,
    weight: 1,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: "Piercing, Sharp, Sturdy (1)"
    };
    case "snow": 
    return {
    name: "Snow",
    type: "Common",
    element: "Water",
    ac: 10,
    dt: 1,
    hb: 1,
    specProp: 0,
    desc: `Snow is a powdery substance made from solidified water.`,
    skills: "Shape Ice, Sculpting, ",
    rarity: 1,
    effort: 1,
    cost: 1,
    weight: 0.1,
    wpnBonus: -2,
    defBonus: -1,
    flexibility: 0,
    properties: "Flexible (1), Frozen"
    };
    case "ice": 
    return {
    name: "Ice",
    type: "Common",
    element: "Water",
    ac: 12,
    dt: 10,
    hb: 1,
    specProp: 0,
    desc: `Ice is solid water.`,
    skills: "Shape Ice, Chiselling, ",
    rarity: 1,
    effort: 1.5,
    cost: 5,
    weight: 0.2,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: "Frozen, Piercing, Sharp, Sturdy (1), Transparent"
    };
    case "mapla": 
    return {
    name: "Mapla",
    type: "Uncommon",
    element: "Wood",
    ac: 13,
    dt: 12,
    hb: 1,
    specProp: 1,
    desc: `Mapla is a stronger and tougher version of maple wood. It does not exist naturally in the world made entirely from ether.`,
    skills: "Shape Plants, Chiselling, Whittling",
    rarity: 2,
    effort: 1,
    cost: 75,
    weight: 0.1,
    wpnBonus: 1,
    defBonus: 0,
    flexibility: 2,
    properties: "Flammable, Piercing, Sturdy (1)"
    };
    case "tempered glass": 
    return {
    name: "Tempered Glass",
    type: "Uncommon",
    element: "Fire",
    ac: 12,
    dt: 10,
    hb: 1,
    specProp: 0,
    desc: `Sometimes known as bulletproof glass, tempered glass is a sturdier glass made to resist blunt force.`,
    skills: "Shape Glass, Glassblowing, ",
    rarity: 2,
    effort: 2,
    cost: 60,
    weight: 0.3,
    wpnBonus: 1,
    defBonus: 0,
    flexibility: 0,
    properties: "Piercing, Sharp, Transparent"
    };
    case "crystal": 
    return {
    name: "Crystal",
    type: "Uncommon",
    element: "Earth",
    ac: 14,
    dt: 14,
    hb: 2,
    specProp: 0,
    desc: `This rock has a transparent sheen that hides a strong durability.`,
    skills: "Shape Earth, Chiselling, ",
    rarity: 2,
    effort: 3,
    cost: 70,
    weight: 0.3,
    wpnBonus: 1,
    defBonus: 0,
    flexibility: 0,
    properties: "Piercing, Sturdy (2), Transparent"
    };
    case "morillite": 
    return {
    name: "Morillite",
    type: "Uncommon",
    element: "Earth",
    ac: 12,
    dt: 12,
    hb: 1,
    specProp: 3,
    desc: `Morillite is a crystal that is brittle like glass. It can form in a variety of colors but is most often a soft vermillion. When magical energy flows through it, the crystal will shine. It seems to have properties that allow it to hold ki temporarily.`,
    skills: "Shape Earth, Goldsmithing, ",
    rarity: 2,
    effort: 3,
    cost: 60,
    weight: 0.2,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: "Sharp, Transparent"
    };
    case "sigilite": 
    return {
    name: "Sigilite",
    type: "Uncommon",
    element: "Earth",
    ac: 14,
    dt: 14,
    hb: 2,
    specProp: 3,
    desc: `Sigilite, or more well known as binding stone, is a black stone with a glass-like sheen. When placed in close proximity to a source of ki, it disrupts its creation preventing magical effects from occurring. Because of this property, binding stone is often used in restraints to inhibit the casting of magic while not restricting the wearer's movement.
    
    Sigilite's range to disrupt ki is dependant on the amount concentrated in an area. 1 lb. of Sigilite can disrupt ki up to 1 foot away maximizing out to 10 feet for 10 lbs. of Sigilite. Often when making restraints, Sigilite will be used in amounts as small as 0.1 lb as a cost saving alternative due to the closeness of the restraints to the ki source.`,
    skills: "Shape Earth, Goldsmithing, ",
    rarity: 2,
    effort: 3,
    cost: 150,
    weight: 0.2,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: "Sturdy (2)"
    };
    case "gold": 
    return {
    name: "Gold",
    type: "Uncommon",
    element: "Metal",
    ac: 10,
    dt: 5,
    hb: 1,
    specProp: 0,
    desc: `While valuable for its appearance and use as currency, gold has its uses in magical application too. Gold has the unique property of acting as a mana stabilizer, able to prevent mana from separating. This has made gold important in day to day life, used in building and item construction frequently.
    
    Once gold has been mixed with an object, it masks magical energy making it difficult to detect. The object becomes almost impossible to tell apart from an object made from natural forming substances.
    
    Gold formed into a magical item often has the gold deep within the object, stretched thin and weaving all over the interior of the object to ensure a stable material. Skilled artisans may use the gold to create more intricate designs on the surface. Gold has always been a beautiful accent to a piece and to use it creatively in an item is a sign of artistic talent of the craftsman.`,
    skills: "Shape Metal, Goldsmithing, ",
    rarity: 2,
    effort: 3,
    cost: 5000,
    weight: 2,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: ""
    };
    case "icea": 
    return {
    name: "Icea",
    type: "Uncommon",
    element: "Water",
    ac: 14,
    dt: 13,
    hb: 1,
    specProp: 1,
    desc: `This enhanced ice is made entirely from ether.`,
    skills: "Shape Ice, Chiselling, ",
    rarity: 2,
    effort: 1.5,
    cost: 37.5,
    weight: 0.1,
    wpnBonus: 1,
    defBonus: 1,
    flexibility: 0,
    properties: "Frozen, Piercing, Sharp, Sturdy (2), Transparent"
    };
    case "beast bone": 
    return {
    name: "Beast Bone",
    type: "Uncommon",
    element: "-",
    ac: 13,
    dt: 13,
    hb: 1,
    specProp: 2,
    desc: `The bones of a beast.`,
    skills: "Chiselling, , ",
    rarity: 2,
    effort: 2,
    cost: 30,
    weight: 1,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: "Piercing, Sharp, Sturdy (2)"
    };
    case "beast leather": 
    return {
    name: "Beast Leather",
    type: "Uncommon",
    element: "-",
    ac: 11,
    dt: 12,
    hb: 1,
    specProp: 2,
    desc: `The leather of a beast.`,
    skills: "Stitching, Tanning, ",
    rarity: 2,
    effort: 2,
    cost: 40,
    weight: 0.8,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: "Flexible (2)"
    };
    case "ironwood": 
    return {
    name: "Ironwood",
    type: "Rare",
    element: "Wood",
    ac: 15,
    dt: 16,
    hb: 2,
    specProp: 0,
    desc: `Ironwood is a sturdy and rare tree that is unnaturally hard as it has grown with iron.
    
    This material is aspected to Wood but is no longer weak to Metal and is also resistant to Earth.`,
    skills: "Shape Plants, Chiselling, Whittling",
    rarity: 3,
    effort: 2,
    cost: 300,
    weight: 1,
    wpnBonus: 2,
    defBonus: 1,
    flexibility: 2,
    properties: "Complex, Dual Natured, Flammable, Piercing, Sturdy (2)"
    };
    case "fireglass": 
    return {
    name: "Fireglass",
    type: "Rare",
    element: "Fire",
    ac: 13,
    dt: 12,
    hb: 1,
    specProp: 0,
    desc: `This glass found near volcanoes has a light red tint. It is stronger than most glass and leaves burns when swung.`,
    skills: "Shape Glass, Glassblowing, ",
    rarity: 3,
    effort: 2.5,
    cost: 200,
    weight: 0.5,
    wpnBonus: 2,
    defBonus: 0,
    flexibility: 2,
    properties: "Complex, Piercing, Sharp, Transparent"
    };
    case "altillite": 
    return {
    name: "Altillite",
    type: "Rare",
    element: "Earth",
    ac: 10,
    dt: 10,
    hb: 1,
    specProp: 3,
    desc: `This brittle, orange crystal can hold onto ki-infused magical energy incredibly well.`,
    skills: "Shape Earth, Chiselling, ",
    rarity: 3,
    effort: 3,
    cost: 200,
    weight: 0.3,
    wpnBonus: 2,
    defBonus: 1,
    flexibility: 0,
    properties: "Piercing, Sturdy (1)"
    };
    case "crystala": 
    return {
    name: "Crystala",
    type: "Rare",
    element: "Earth",
    ac: 15,
    dt: 16,
    hb: 2,
    specProp: 1,
    desc: `This magically-augmented crystal has been created entirely from ether. It does not appear naturally in the wild.`,
    skills: "Shape Earth, Chiselling, ",
    rarity: 3,
    effort: 3,
    cost: 210,
    weight: 0.3,
    wpnBonus: 2,
    defBonus: 1,
    flexibility: 0,
    properties: "Piercing, Sturdy (2), Transparent"
    };
    case "mana gem": 
    return {
    name: "Mana Gem",
    type: "Rare",
    element: "Earth",
    ac: 14,
    dt: 16,
    hb: 1,
    specProp: 3,
    desc: ` In its most pure form, this is a beautiful clear gemstone with an incredible durability. However most often it is most often found in a variety of different colors swirling with a hazy energy within. What is uniquely special about this gemstone is when it is formed it quickly takes on an elemental property of the environment it is placed within. Green mana gems are associated with wood, red with fire, yellow with earth, violet with metal, and blue with water.
    
    Mana gems that have a spirit manifest within them have especially interesting qualities. If both the spirit and the mana gem's elemental affinity match, then the gem can glow a soft light at the spirit's whim. More incredibly, an ethereal caster can cast spells through the mana gem if a spirit is within it. See <a href='character-casting.html#gemCasting'>Gem Casting</a> for more information.`,
    skills: "Shape Earth, Goldsmithing, ",
    rarity: 3,
    effort: 4,
    cost: 470,
    weight: 0.1,
    wpnBonus: 0,
    defBonus: 1,
    flexibility: 0,
    properties: "Piercing, Sturdy (2)"
    };
    case "ventu stone": 
    return {
    name: "Ventu Stone",
    type: "Rare",
    element: "Metal",
    ac: 11,
    dt: 12,
    hb: 2,
    specProp: 3,
    desc: `Ventu Stone is a type of green emerald with a swirling, wind-like, core. This wind is ether that creates a unique magical resonance. Those with communication spells can target the ventu stone itself instead of a location to deliver their messages, as long as they are aware of the magical resonance. The holder of the ventu stone can then put a little magical energy into the stone to hear the message. This message is communicated directly to the person that supplies the magic.`,
    skills: "Shape Earth, Goldsmithing, ",
    rarity: 3,
    effort: 4,
    cost: 500,
    weight: 0.2,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: ""
    };
    case "steela": 
    return {
    name: "Steela",
    type: "Rare",
    element: "Metal",
    ac: 17,
    dt: 17,
    hb: 2,
    specProp: 1,
    desc: `This enhanced steel is made from ether and does not occur naturally in the world.`,
    skills: "Shape Metal, Cold Forging, ",
    rarity: 3,
    effort: 4,
    cost: 375,
    weight: 0.8,
    wpnBonus: 2,
    defBonus: 1,
    flexibility: 0,
    properties: "Piercing, Sharp, Sturdy (3)"
    };
    case "glaceum": 
    return {
    name: "Glaceum",
    type: "Rare",
    element: "Water",
    ac: 15,
    dt: 16,
    hb: 2,
    specProp: 0,
    desc: `This type of ice is incredibly thick and sturdy as the ice has frozen in one large mass all at once. It has become completely opaque with a slight tint of blue.`,
    skills: "Shape Ice, Chiselling, ",
    rarity: 3,
    effort: 2.5,
    cost: 120,
    weight: 0.4,
    wpnBonus: 2,
    defBonus: 1,
    flexibility: 2,
    properties: "Complex, Frozen, Piercing, Sharp, Sturdy (2)"
    };
    case "sauran bone": 
    return {
    name: "Sauran Bone",
    type: "Rare",
    element: "-",
    ac: 14,
    dt: 14,
    hb: 2,
    specProp: 2,
    desc: `The bones of saurians.`,
    skills: "Chiselling, , ",
    rarity: 3,
    effort: 5,
    cost: 85,
    weight: 2,
    wpnBonus: 1,
    defBonus: 1,
    flexibility: 0,
    properties: "Piercing, Sharp, Sturdy (2)"
    };
    case "ironoak": 
    return {
    name: "Ironoak",
    type: "Epic",
    element: "Wood",
    ac: 16,
    dt: 20,
    hb: 2,
    specProp: 1,
    desc: `Ironoak is ironwood that has been enhanced magically and created from ether.
    
    This material is aspected to Wood but is no longer weak to Metal and is also resistant to Earth.`,
    skills: "Shape Plants, Chiselling, Whittling",
    rarity: 4,
    effort: 2,
    cost: 1170,
    weight: 0.8,
    wpnBonus: 3,
    defBonus: 2,
    flexibility: 0,
    properties: "Complex, Dual Natured, Flammable, Piercing, Sturdy (3)"
    };
    case "adamantine": 
    return {
    name: "Adamantine",
    type: "Epic",
    element: "Fire",
    ac: 17,
    dt: 22,
    hb: 2,
    specProp: 0,
    desc: `A magically created material that is an earthy red in color. It's well known for its incredible durability.
    
    This material is aspected to Fire but is also resistant to Metal.`,
    skills: "Shape Metal, Brick Craft, ",
    rarity: 4,
    effort: 4.5,
    cost: 980,
    weight: 2,
    wpnBonus: 3,
    defBonus: 2,
    flexibility: 0,
    properties: "Complex, Dual Natured, Piercing, Sturdy (3)"
    };
    case "pnevmarite": 
    return {
    name: "Pnevmarite",
    type: "Epic",
    element: "Earth",
    ac: 10,
    dt: 15,
    hb: 1,
    specProp: 3,
    desc: `Colloquially called Spirit Stone, Pnevmarite is a violet stone with an amber glow has the unique property of repelling spirits from passing through its aura. It effectively prevents manifestation by spirits.
    
    However, while Pnevmarite can prevent spirits from manifesting and possession, it cannot prevent a spirit from entering its aura if a spirit has already manifested in a creature or object that is entering the Pnevmarite protected area.
    
    Pnevmarite has a secondary property. It is capable of storing mana within it to release it at a later time. This property is still being explored and as such the limits of pnevarmite are currently unknown.`,
    skills: "Shape Earth, Goldsmithing, ",
    rarity: 4,
    effort: 8,
    cost: 2000,
    weight: 0.1,
    wpnBonus: 0,
    defBonus: 0,
    flexibility: 0,
    properties: "Transparent"
    };
    case "platinum": 
    return {
    name: "Platinum",
    type: "Epic",
    element: "Metal",
    ac: 18,
    dt: 30,
    hb: 2,
    specProp: 0,
    desc: `Platinum is one of the strongest metals in existance. It is sought for its incredible durability.`,
    skills: "Shape Metal, Cold Forging, ",
    rarity: 4,
    effort: 5,
    cost: 1000,
    weight: 2,
    wpnBonus: 3,
    defBonus: 2,
    flexibility: 0,
    properties: "Complex, Piercing, Sharp, Sturdy (4)"
    };
    case "glacerulum": 
    return {
    name: "Glacerulum",
    type: "Epic",
    element: "Water",
    ac: 16,
    dt: 22,
    hb: 2,
    specProp: 1,
    desc: `This magically enhanced glaceum only exists due to magic and cannot be found naturally in the world.`,
    skills: "Shape Ice, Chiselling, ",
    rarity: 4,
    effort: 2.5,
    cost: 975,
    weight: 0.4,
    wpnBonus: 3,
    defBonus: 2,
    flexibility: 0,
    properties: "Complex, Frozen, Piercing, Sharp, Sturdy (3)"
    };
    case "viridium": 
    return {
    name: "Viridium",
    type: "Legendary",
    element: "Wood",
    ac: 16,
    dt: 28,
    hb: 2,
    specProp: 1,
    desc: `Magically created glass that is tough and sturdy glass has a faint green tint. It burns with acid when it is used to strike.
    
    This material is aspected to Wood but is also resistant to Fire.`,
    skills: "Shape Glass, Glassblowing, ",
    rarity: 5,
    effort: 3,
    cost: 4350,
    weight: 0.5,
    wpnBonus: 4,
    defBonus: 1,
    flexibility: 2,
    properties: "Complex, Dual Natured, Piercing, Sharp, Transparent"
    };
    case "rubrumium": 
    return {
    name: "Rubrumium",
    type: "Legendary",
    element: "Fire",
    ac: 16,
    dt: 28,
    hb: 2,
    specProp: 1,
    desc: `This magically created glass has a light red tint like fireglass. It is stronger than its natural brother and likewise leaves burns when swung.`,
    skills: "Shape Glass, Glassblowing, ",
    rarity: 5,
    effort: 3,
    cost: 4350,
    weight: 0.5,
    wpnBonus: 4,
    defBonus: 1,
    flexibility: 2,
    properties: "Complex, Piercing, Sharp, Transparent"
    };
    case "obsidian": 
    return {
    name: "Obsidian",
    type: "Legendary",
    element: "Earth",
    ac: 21,
    dt: 45,
    hb: 3,
    specProp: 0,
    desc: `This black stone is the strongest, naturally occuring, material that is known to man. Incredibly rare, it is sought for its strength.
    
    This materials is aspected to Earth but is also resistant to Metal.`,
    skills: "Shape Earth, Brick Craft, Chiselling",
    rarity: 5,
    effort: 8,
    cost: 4250,
    weight: 3,
    wpnBonus: 4,
    defBonus: 3,
    flexibility: 0,
    properties: "Complex, Dual Natured, Piercing, Sharp, Sturdy (5)"
    };
    case "mithral": 
    return {
    name: "Mithral",
    type: "Legendary",
    element: "Metal",
    ac: 18,
    dt: 35,
    hb: 3,
    specProp: 1,
    desc: `A magically created metal made with water to create a remarkably light material with incredible strength.
    
    This material is aspected to Metal but is also resistant to Water.`,
    skills: "Shape Metal, Cold Forging, ",
    rarity: 5,
    effort: 4.5,
    cost: 3375,
    weight: 0.5,
    wpnBonus: 4,
    defBonus: 3,
    flexibility: 0,
    properties: "Complex, Dual Natured, Piercing, Sharp, Sturdy (4)"
    };
    case "white obsidian": 
    return {
    name: "White Obsidian",
    type: "Legendary",
    element: "Metal",
    ac: 21,
    dt: 45,
    hb: 4,
    specProp: 1,
    desc: `This obsidian has a white, metallic sheen. It has been created magically and only by the most powerful of mages.
    
    This materials is aspected to Metal but is also resistant to Earth. This material is impossible to revert to dust.`,
    skills: "Shape Earth, Brick Craft, Chiselling",
    rarity: 5,
    effort: 10,
    cost: 9975,
    weight: 3,
    wpnBonus: 4,
    defBonus: 3,
    flexibility: 0,
    properties: "Complex, Dual Natured, Piercing, Sharp, Sturdy (5)"
    };
    case "albryst": 
    return {
    name: "Albryst",
    type: "Legendary",
    element: "Water",
    ac: 19,
    dt: 38,
    hb: 3,
    specProp: 1,
    desc: `This magically created, pure white crystal-like substance is cold to the touch like ice but strangely doesn't melt.
    
    This material is aspected to Water but is no longer weak to Earth and is also resistant to Fire.`,
    skills: "Shape Ice, Chiselling, ",
    rarity: 5,
    effort: 4,
    cost: 4050,
    weight: 0.5,
    wpnBonus: 4,
    defBonus: 3,
    flexibility: 0,
    properties: "Complex, Dual Natured, Piercing, Sharp, Sturdy (4)"
    };
    }
    return {
    name: "",
    };
    }
    

function GetItemWeaponInfo(item) {
    switch (item.toLowerCase()) {
        case "":
            return {
                name: ""
            };
        case "club":
            return {
                name: "Club",
                    type: "Simple",
                    group: "Hammer",
                    damage: "1d4",
                    damageType: "Bludgeoning",
                    properties: "Light",
                    desc: `This weapon is usually just a shaped piece of wood, sometimes with a few nails or studs embedded in it.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Club",
                            rule: "Sturdy",
                            type: "M",
                            quantity: 3,
                            aspects: "",
                            material: "Maple"
                        }]
                    }
            };
        case "dagger":
            return {
                name: "Dagger",
                    type: "Simple",
                    group: "Blade",
                    damage: "1d4",
                    damageType: "Piercing",
                    properties: "Finesse, Light, Thrown (20/60)",
                    desc: `A dagger has a blade that is about 1 foot in length.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Blade",
                                rule: "Piercing",
                                type: "M",
                                quantity: 1,
                                aspects: "Pointed",
                                material: "Pine"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "greatclub":
            return {
                name: "Greatclub",
                    type: "Simple",
                    group: "Hammer",
                    damage: "1d8",
                    damageType: "Bludgeoning",
                    properties: "Collapsable, Thrown (20/60), Two-Handed",
                    desc: `This larger, bulkier version of the common club is heavy enough that you can’t wield it with one hand. It may be ornate and carved, reinforced with metal, or a simple branch from a tree. Like simple clubs, greatclubs have many names, such as cudgels, bludgeons, shillelaghs, and more.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Club",
                            rule: "Sturdy",
                            type: "M",
                            quantity: 4,
                            aspects: "",
                            material: "Maple"
                        }]
                    }
            };
        case "handaxe":
            return {
                name: "Handaxe",
                    type: "Simple",
                    group: "Axe",
                    damage: "1d6",
                    damageType: "Slashing",
                    properties: "Light, Thrown (30/120)",
                    desc: `This one-handed axe is short (roughly 1 foot long) and designed for use with one hand. Unlike throwing axes, it is not well balanced for a graceful tumbling motion, and is instead heavier at its head. Tomahawks, war hatchets, and other such names usually refer to hand axes.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Blade",
                                rule: "Sharp",
                                type: "M",
                                quantity: 2,
                                aspects: "Sharp",
                                material: "Glass"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "javelin":
            return {
                name: "Javelin",
                    type: "Simple",
                    group: "Polearm",
                    damage: "1d6",
                    damageType: "Piercing",
                    properties: "Collapsable, Thrown (20/60)",
                    desc: `A javelin is a thin throwing spear.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Head",
                                rule: "Piercing",
                                type: "M",
                                quantity: 1,
                                aspects: "Pointed",
                                material: "Pine"
                            },
                            {
                                component: "Pole",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 4,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "light hammer":
            return {
                name: "Light Hammer",
                    type: "Simple",
                    group: "Hammer",
                    damage: "1d4",
                    damageType: "Bludgeoning",
                    properties: "Light",
                    desc: `A lighter version of a warhammer, this weapon usually has a sleek head with one striking surface.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Head",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 3,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "mace":
            return {
                name: "Mace",
                    type: "Simple",
                    group: "Hammer",
                    damage: "1d6",
                    damageType: "Bludgeoning",
                    properties: "—",
                    desc: `A mace is made up of an ornate metal head attached to a simple wooden or metal shaft.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Head",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 3,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "quarterstaff":
            return {
                name: "Quarterstaff",
                    type: "Simple",
                    group: "Polearm",
                    damage: "1d6",
                    damageType: "Bludgeoning",
                    properties: "Collapsable, Doubled, Versatile (1d8)",
                    desc: `A quarterstaff is a simple piece of wood, about 5 feet in length.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Pole",
                            rule: "Sturdy",
                            type: "M",
                            quantity: 4,
                            aspects: "",
                            material: "Maple"
                        }]
                    }
            };
        case "spear":
            return {
                name: "Spear",
                    type: "Simple",
                    group: "Polearm",
                    damage: "1d6",
                    damageType: "Piercing",
                    properties: "Collapsable, Thrown (20/60), Versatile (1d8)",
                    desc: `A spear is 5 feet in length and can be thrown.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Head",
                                rule: "Piercing",
                                type: "M",
                                quantity: 1,
                                aspects: "Pointed",
                                material: "Maple"
                            },
                            {
                                component: "Pole",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 4,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "dart":
            return {
                name: "Dart",
                    type: "Simple",
                    group: "Dart",
                    damage: "1d4",
                    damageType: "Piercing",
                    properties: "Finesse, Thrown (20/60)",
                    desc: `Darts are missile weapons, designed to fly such that a sharp, often weighted point will strike first.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Dart",
                            rule: "Piercing",
                            type: "M",
                            quantity: 1,
                            aspects: "Pointed",
                            material: "Maple"
                        }]
                    }
            };
        case "shortbow":
            return {
                name: "Shortbow",
                    type: "Simple",
                    group: "Bow",
                    damage: "1d6",
                    damageType: "Arrow",
                    properties: "Ammo (80/320), Collapsable, Two-Handed",
                    desc: `A shortbow is made up of one piece of wood, about 3 feet in length.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Bow",
                            rule: "Sturdy",
                            type: "M",
                            quantity: 5,
                            aspects: "",
                            material: "Pine"
                        }]
                    }
            };
        case "battleaxe":
            return {
                name: "Battleaxe",
                    type: "Adept",
                    group: "Axe",
                    damage: "1d8",
                    damageType: "Slashing",
                    properties: "Doubled, Versatile (1d10)",
                    desc: `The handle of this axe is long enough that you can wield it one-handed or two-handed. The head may have one blade or two, with blade shapes ranging from half-moons to squared edges like narrower versions of woodcutting axes. The wooden haft may be protected and strengthened with metal bands called langets.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Blade",
                                rule: "Sharp",
                                type: "M",
                                quantity: 3,
                                aspects: "Expertise, Sharp",
                                material: "Iron"
                            },
                            {
                                component: "Shaft",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 2,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "broadsword":
            return {
                name: "Broadsword",
                    type: "Adept",
                    group: "Blade",
                    damage: "1d12",
                    damageType: "Slashing",
                    properties: "Doubled, Heavy, Two-Handed",
                    desc: `This immense two-handed sword is as heavy as it is huge. `,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Blade",
                                rule: "Sharp",
                                type: "M",
                                quantity: 8,
                                aspects: "Expertise, Sharp",
                                material: "Iron"
                            },
                            {
                                component: "Shaft",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 2,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "flail":
            return {
                name: "Flail",
                    type: "Adept",
                    group: "Flail",
                    damage: "1d8",
                    damageType: "Bludgeoning",
                    properties: "Reach (10 feet)",
                    desc: `A light flail consists of a weighted striking end connected to a handle by a sturdy chain. Though often imagined as a ball, sometimes spiked like the head of a morningstar, the head of a light flail can actually take many different shapes, such as short bars. Military flails are sturdier evolutions of agricultural flails, which are used for threshing – beating stacks of grains to separate the useful grains from their husks.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Head",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 2,
                                aspects: "Expertise, Tens",
                                material: "Maple"
                            },
                            {
                                component: "Chain",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 2,
                                aspects: "",
                                material: "Iron"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "glaive":
            return {
                name: "Glaive",
                    type: "Adept",
                    group: "Polearm",
                    damage: "1d10",
                    damageType: "Slashing",
                    properties: "Collapsable, Heavy, Reach, Two-Handed",
                    desc: `A glaive is composed of a simple blade mounted on the end of a pole about 7 feet in length.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Blade",
                                rule: "Sharp",
                                type: "M",
                                quantity: 2,
                                aspects: "Expertise, Pointed",
                                material: "Glass"
                            },
                            {
                                component: "Pole",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 4,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "greataxe":
            return {
                name: "Greataxe",
                    type: "Adept",
                    group: "Axe",
                    damage: "1d12",
                    damageType: "Slashing",
                    properties: "Collapsable, Doubled, Heavy, Two-Handed",
                    desc: `This two-handed battle axe is heavy enough that you can’t wield it with one hand. The head may have one blade or two, and may be “bearded” (meaning hooked or trailing at the bottom) to increase cleaving power and help pull down enemy shields. The haft is usually 3 to 4 feet long.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Blade",
                                rule: "Sharp",
                                type: "M",
                                quantity: 4,
                                aspects: "Expertise, Sharp",
                                material: "Iron"
                            },
                            {
                                component: "Shaft",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 2,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "greatsword":
            return {
                name: "Greatsword",
                    type: "Adept",
                    group: "Blade",
                    damage: "2d6",
                    damageType: "Slashing",
                    properties: "Collapsable, Doubled, Heavy, Two-Handed",
                    desc: `This immense two-handed sword is about 5 feet in length. A greatsword may have a dulled lower blade that can be gripped.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Blade",
                                rule: "Sharp",
                                type: "M",
                                quantity: 5,
                                aspects: "Expertise, Sharp",
                                material: "Iron"
                            },
                            {
                                component: "Shaft",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 2,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "lance":
            return {
                name: "Lance",
                    type: "Adept",
                    group: "Polearm",
                    damage: "1d12",
                    damageType: "Piercing",
                    properties: "Collapsable, Reach, Special",
                    desc: `A long weapon for thrusting, having a wooden shaft and a pointed head.
    
    You have disadvantage when you use a lance to attack a target within 5 feet of you. Also, a lance requires two hands to wield when you aren’t mounted.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Head",
                                rule: "Piercing",
                                type: "M",
                                quantity: 2,
                                aspects: "Expertise, Pointed",
                                material: "Maple"
                            },
                            {
                                component: "Pole",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 4,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "longsword":
            return {
                name: "Longsword",
                    type: "Adept",
                    group: "Blade",
                    damage: "1d8",
                    damageType: "Slashing",
                    properties: "Collapsable, Versatile (1d10)",
                    desc: `This sword is about 3½ feet in length.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Blade",
                                rule: "Sharp",
                                type: "M",
                                quantity: 3,
                                aspects: "Expertise, Sharp",
                                material: "Iron"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "maul":
            return {
                name: "Maul",
                    type: "Adept",
                    group: "Hammer",
                    damage: "1d12",
                    damageType: "Bludgeoning",
                    properties: "Collapsable, Heavy, Two-Handed",
                    desc: `This polearm has both a pronged hammer head for crushing blows and a spiked head for piercing and peeling armor. The long haft allows the wielder to put amazing force behind the head of this weapon.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Head",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 4,
                                aspects: "Expertise",
                                material: "Maple"
                            },
                            {
                                component: "Pole",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 4,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "morningstar":
            return {
                name: "Morningstar",
                    type: "Adept",
                    group: "Hammer",
                    damage: "1d8",
                    damageType: "Piercing",
                    properties: "—",
                    desc: `A morningstar is a spiked metal ball, affixed to the top of a long handle.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Head",
                                rule: "Piercing",
                                type: "M",
                                quantity: 3,
                                aspects: "Expertise, Few",
                                material: "Maple"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "rapier":
            return {
                name: "Rapier",
                    type: "Adept",
                    group: "Blade",
                    damage: "1d8",
                    damageType: "Piercing",
                    properties: "Finesse",
                    desc: `A thin, light sharp-pointed sword used for thrusting.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Blade",
                                rule: "Piercing",
                                type: "M",
                                quantity: 2,
                                aspects: "Expertise, Pointed, Sharp",
                                material: "Maple"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "scimitar":
            return {
                name: "Scimitar",
                    type: "Adept",
                    group: "Blade",
                    damage: "1d6",
                    damageType: "Slashing",
                    properties: "Finesse, Light",
                    desc: `This curved sword is shorter than a longsword and longer than a shortsword. Only the outer edge is sharp, and the back is flat, giving the blade a triangular cross-section.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Blade",
                                rule: "Sharp",
                                type: "M",
                                quantity: 2,
                                aspects: "Expertise, Sharp",
                                material: "Glass"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "shortsword":
            return {
                name: "Shortsword",
                    type: "Adept",
                    group: "Blade",
                    damage: "1d6",
                    damageType: "Piercing",
                    properties: "Finesse, Light",
                    desc: `Short swords are some of the most common weapons found in any martial society, and thus designs are extremely varied, depending on the region and creator. Most are around 2 feet in length. Their blades can be curved or straight, single- or double-edged, and wide or narrow. Hilts may be ornate or simple, with crossguards, basket hilts, or no guard at all. Such weapons are often used on their own, but can also be paired as a matched set, or used in conjunction with a dagger or longer sword.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Blade",
                                rule: "Piercing",
                                type: "M",
                                quantity: 2,
                                aspects: "Expertise, Pointed, Sharp",
                                material: "Maple"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "trident":
            return {
                name: "Trident",
                    type: "Adept",
                    group: "Polearm",
                    damage: "1d8",
                    damageType: "Piercing",
                    properties: "Collapsable, Thrown (20/60), Versatile (1d8)",
                    desc: `A trident has three prongs at the end of a 4-foot-long shaft.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Prongs",
                                rule: "Piercing",
                                type: "M",
                                quantity: 1,
                                aspects: "Expertise, Pointed",
                                material: "Maple"
                            },
                            {
                                component: "Pole",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 4,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "warhammer":
            return {
                name: "Warhammer",
                    type: "Adept",
                    group: "Hammer",
                    damage: "1d8",
                    damageType: "Bludgeoning",
                    properties: "Collapsable, Doubled, Versatile (1d10)",
                    desc: `This weapon consists of a wooden haft and a heavy, metal head. The head may be single (like a carpenter’s hammer) or double (like a sledgehammer). The haft is long enough that you may wield it one- or two-handed. Though heavy and relatively slow to wield, warhammers are capable of delivering immense blows, crushing armor and flesh alike.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Head",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 4,
                                aspects: "Expertise",
                                material: "Maple"
                            },
                            {
                                component: "Shaft",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 2,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "whip":
            return {
                name: "Whip",
                    type: "Adept",
                    group: "Flail",
                    damage: "1d4",
                    damageType: "Slashing",
                    properties: "Finesse, Reach (15 feet)",
                    desc: `A strip of leather or length of cord fastened to a handle with a hard tip, used for flogging or beating.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Tip",
                                rule: "Sharp",
                                type: "M",
                                quantity: 1,
                                aspects: "Expertise, Sharp",
                                material: "Glass"
                            },
                            {
                                component: "Whip",
                                rule: "Leather",
                                type: "M",
                                quantity: 3,
                                aspects: "",
                                material: "Beast Leather"
                            }
                        ]
                    }
            };
        case "blowgun":
            return {
                name: "Blowgun",
                    type: "Adept",
                    group: "Dart",
                    damage: "1d2",
                    damageType: "Arrow",
                    properties: "Ammo (25/100), Loading",
                    desc: `Blowguns are generally used to deliver debilitating (but rarely fatal) poisons from a distance. They are nearly silent when fired.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Shaft",
                            rule: "Sturdy",
                            type: "M",
                            quantity: 1,
                            aspects: "Expertise",
                            material: "Pine"
                        }]
                    }
            };
        case "longbow":
            return {
                name: "Longbow",
                    type: "Adept",
                    group: "Bow",
                    damage: "1d8",
                    damageType: "Arrow",
                    properties: "Ammo (150/600), Collapsable, Heavy, Two-Handed",
                    desc: `At almost 5 feet in height, a longbow is made up of one solid piece of carefully curved wood or metal.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Bow",
                            rule: "Sturdy",
                            type: "M",
                            quantity: 5,
                            aspects: "Expertise",
                            material: "Pine"
                        }]
                    }
            };
        case "net":
            return {
                name: "Net",
                    type: "Adept",
                    group: "-",
                    damage: "",
                    damageType: "—",
                    properties: "Special, Thrown (5/15)",
                    desc: `A device made of strands that weave in and out with open spaces between and used to hold or catch something.
    
    A Large or smaller creature hit by a net is restrained until it is freed. A net has no effect on creatures that are formless, or creatures that are Huge or larger. A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the net (AC 10) also frees the creature without harming it, ending the effect and destroying the net.
    
    When you use an action, bonus action, or reaction to attack with a net, you can make only one attack regardless of the number of attacks you can normally make.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Net",
                            rule: "Flexible",
                            type: "M",
                            quantity: 3,
                            aspects: "Expertise, Tens",
                            material: "Hemp"
                        }]
                    }
            };
        case "blast lance":
            return {
                name: "Blast Lance",
                    type: "Expert",
                    group: "Polearm",
                    damage: "1d12",
                    damageType: "Piercing",
                    properties: "Collapsable, Reach, Reload (5 shots), Shelling, Two-Handed",
                    desc: `A blast lance looks mostly like a normal lance, however it contains an explosive cartridge at its tip. A user can pull a trigger at its handle to release the cartridge and cause a small explosion where they point the lance.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Head",
                                rule: "Piercing",
                                type: "M",
                                quantity: 2,
                                aspects: "Expertise, Pointed",
                                material: "Steel"
                            },
                            {
                                component: "Pole",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 4,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Gears",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 1,
                                aspects: "Expertise, Tens",
                                material: "Steel"
                            },
                            {
                                component: "Trigger, ",
                                rule: "Engineering",
                                type: "E",
                                quantity: 500,
                                aspects: "",
                                material: "Engineering"
                            }
                        ]
                    }
            };
        case "blast maul":
            return {
                name: "Blast Maul",
                    type: "Expert",
                    group: "Hammer",
                    damage: "1d12",
                    damageType: "Bludgeoning",
                    properties: "Collapsable, Reload (5 shots), Shelling",
                    desc: `A blast maul is similar to a regular maul however one side of the bludgeoning implement contains an explosive release. The user can pull a trigger at its handle to release the cartridge and cause a small explosion where they point the maul.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Head",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 4,
                                aspects: "Expertise",
                                material: "Steel"
                            },
                            {
                                component: "Pole",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 4,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Gears",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 1,
                                aspects: "Expertise, Tens",
                                material: "Steel"
                            },
                            {
                                component: "Engineering",
                                rule: "Engineering",
                                type: "E",
                                quantity: 500,
                                aspects: "",
                                material: "Engineering"
                            }
                        ]
                    }
            };
        case "charge axe":
            return {
                name: "Charge Axe",
                    type: "Expert",
                    group: "Axe",
                    damage: "1d12",
                    damageType: "Slashing",
                    properties: "Charging (5), Collapsable, Explosive Burst, Two-Handed",
                    desc: `This revolutionary axe contains a small amount of pnevmarite. When its wielder swings the weapon they can release a small amount of their own ki into the weapon to charge it. Then once ready, its handle can be extended to release an explosive blast on an unwitting foe.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Blade",
                                rule: "Sharp",
                                type: "M",
                                quantity: 4,
                                aspects: "Expertise, Sharp",
                                material: "Steel"
                            },
                            {
                                component: "Shaft",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 2,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Gears",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 1,
                                aspects: "Expertise, Tens",
                                material: "Steel"
                            },
                            {
                                component: "Power Source",
                                rule: "Pnevmarite",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Pnevmarite"
                            }
                        ]
                    }
            };
        case "charge blade":
            return {
                name: "Charge Blade",
                    type: "Expert",
                    group: "Blade",
                    damage: "1d8",
                    damageType: "Slashing",
                    properties: "Charging (5), Collapsable, Explosive Burst",
                    desc: `This revolutionary longsword contains a small amount of pnevmarite. When its wielder swings the weapon they can release a small amount of their own ki into the weapon to charge it. Then once ready, its handle can be extended to a glaive and release an explosive blast on an unwitting foe.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Blade",
                                rule: "Sharp",
                                type: "M",
                                quantity: 3,
                                aspects: "Expertise, Sharp",
                                material: "Steel"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Gears",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 1,
                                aspects: "Expertise, Tens",
                                material: "Steel"
                            },
                            {
                                component: "Power Source",
                                rule: "Pnevmarite",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Pnevmarite"
                            }
                        ]
                    }
            };
        case "charge gauntlet":
            return {
                name: "Charge Gauntlet",
                    type: "Expert",
                    group: "Brawling",
                    damage: "1d6",
                    damageType: "Bludgeoning",
                    properties: "Charging (9), Explosive Burst, Two-Handed",
                    desc: `This revolutionary gauntlet contains a small amount of pnevmarite. When its wielder swings the weapon they can release a small amount of their own ki into the weapon to charge it. Then once ready, an explosive blast can be released on an unwitting foe.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Gauntlets",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 3,
                                aspects: "Expertise",
                                material: "Steel"
                            },
                            {
                                component: "Gears",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 1,
                                aspects: "Expertise, Tens",
                                material: "Steel"
                            },
                            {
                                component: "Power Source",
                                rule: "Pnevmarite",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Pnevmarite"
                            }
                        ]
                    }
            };
        case "charge spear":
            return {
                name: "Charge Spear",
                    type: "Expert",
                    group: "Polearm",
                    damage: "1d12",
                    damageType: "Piercing",
                    properties: "Charging (3), Collapsable, Explosive Burst, Reach, Two-Handed",
                    desc: `This revolutionary lance contains a small amount of pnevmarite. When its wielder swings the weapon they can release a small amount of their own ki into the weapon to charge it. Then once ready, they can release an explosive blast on an unwitting foe.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Head",
                                rule: "Piercing",
                                type: "M",
                                quantity: 2,
                                aspects: "Expertise, Pointed",
                                material: "Steel"
                            },
                            {
                                component: "Pole",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 4,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Gears",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 1,
                                aspects: "Expertise, Tens",
                                material: "Steel"
                            },
                            {
                                component: "Power Source",
                                rule: "Pnevmarite",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Pnevmarite"
                            }
                        ]
                    }
            };
        case "palm pistol":
            return {
                name: "Palm Pistol",
                    type: "Adept",
                    group: "Pistol",
                    damage: "1d8",
                    damageType: "Bullet",
                    properties: "Ammo (20/60), Light, Reload (1 shot)",
                    desc: `The single-shot pistol is one of the most common firearms.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Frame",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 2,
                                aspects: "Expertise",
                                material: "Steel"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Engineering",
                                rule: "Tumbler, Hammer, and Sear",
                                type: "E",
                                quantity: 300,
                                aspects: "",
                                material: "Engineering"
                            }
                        ]
                    }
            };
        case "revolver":
            return {
                name: "Revolver",
                    type: "Simple",
                    group: "Pistol",
                    damage: "1d10",
                    damageType: "Bullet",
                    properties: "Ammo (30/90), Reload (6 shots)",
                    desc: `A revolver is a pistol with a revolving cylinder containing six chambers. Each chamber can hold a bullet, and when one cartridge is shot, the cylinder automatically rotates (no extra hand or action required), readying the next chamber for firing.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Frame",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 2,
                                aspects: "Expertise",
                                material: "Steel"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Engineering",
                                rule: "Tumbler, Hammer, and Sear",
                                type: "E",
                                quantity: 300,
                                aspects: "",
                                material: "Engineering"
                            }
                        ]
                    }
            };
        case "magnum":
            return {
                name: "Magnum",
                    type: "Expert",
                    group: "Pistol",
                    damage: "1d12",
                    damageType: "Bullet",
                    properties: "Ammo (15/45), Reload (2 shots)",
                    desc: `A magnum is similar to a revolver but trades accuracy and capacity for more punch. `,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Frame",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 3,
                                aspects: "Expertise",
                                material: "Steel"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Engineering",
                                rule: "Tumbler, Hammer, and Sear",
                                type: "E",
                                quantity: 400,
                                aspects: "",
                                material: "Engineering"
                            }
                        ]
                    }
            };
        case "musket":
            return {
                name: "Musket",
                    type: "Adept",
                    group: "Rifle",
                    damage: "1d12",
                    damageType: "Bullet",
                    properties: "Ammo (120/360), Reload (2 shots), Two-Handed",
                    desc: `This long-barreled firearm has a much greater range than a pistol.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Frame",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 4,
                                aspects: "Expertise",
                                material: "Steel"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Engineering",
                                rule: "Tumbler, Hammer, 2x Sear",
                                type: "E",
                                quantity: 400,
                                aspects: "",
                                material: "Engineering"
                            }
                        ]
                    }
            };
        case "rifle":
            return {
                name: "Rifle",
                    type: "Simple",
                    group: "Rifle",
                    damage: "2d8",
                    damageType: "Bullet",
                    properties: "Ammo (200/600), Reload (1 shot), Two-Handed",
                    desc: `This improvement on the musket, featuring grooved barrels, can fire farther and with more accuracy than early long-bore firearms.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Frame",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 4,
                                aspects: "Expertise",
                                material: "Steel"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Engineering",
                                rule: "2x Tumbler, Hammer, 2x Sear",
                                type: "E",
                                quantity: 500,
                                aspects: "",
                                material: "Engineering"
                            }
                        ]
                    }
            };
        case "blunderbuss":
            return {
                name: "Blunderbuss",
                    type: "Expert",
                    group: "Rifle",
                    damage: "",
                    damageType: "-",
                    properties: "Ammo (20/60), Reload (2 shots), Shelling, Two-Handed",
                    desc: `This weapon fires pellets or a bullet from its trumpet-shaped barrel, making it an effective fowling weapon or close-fighting personal defense weapon.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Frame",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 4,
                                aspects: "Expertise",
                                material: "Steel"
                            },
                            {
                                component: "Handle",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Engineering",
                                rule: "Tumbler, Hammer, and Sear",
                                type: "E",
                                quantity: 400,
                                aspects: "",
                                material: "Engineering"
                            }
                        ]
                    }
            };
        case "arrow":
            return {
                name: "Arrow",
                    type: "Ammunition",
                    group: "-",
                    damage: "",
                    damageType: "Piercing",
                    properties: "—",
                    desc: `A shaft sharpened at the front and with feathers or vanes at the back, shot from a bow.
    
    At the end of the battle, you can recover half your expended arrows by taking a minute to search the battlefield.`,
                    blueprints: {
                        count: 5,
                        components: [{
                                component: "Head",
                                rule: "Piercing",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Shaft",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "arrow, blunt":
            return {
                name: "Arrow, Blunt",
                    type: "Ammunition",
                    group: "-",
                    damage: "",
                    damageType: "Bludgeoning",
                    properties: "—",
                    desc: `A shaft with a blunt object at the front, usually shot from a bow.
    
    At the end of the battle, you can recover half your expended arrows by taking a minute to search the battlefield.`,
                    blueprints: {
                        count: 5,
                        components: [{
                                component: "Head",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            },
                            {
                                component: "Shaft",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "bullet":
            return {
                name: "Bullet",
                    type: "Ammunition",
                    group: "-",
                    damage: "",
                    damageType: "Ballistic",
                    properties: "—",
                    desc: `A projectile for firing from a rifle, revolver, or other small firearm, typically cylindrical and pointed, and sometimes containing an explosive.`,
                    blueprints: {
                        count: 20,
                        components: [{
                            component: "Bullet",
                            rule: "Piercing",
                            type: "M",
                            quantity: 1,
                            aspects: "",
                            material: "Granite"
                        }]
                    }
            };
        case "shelling":
            return {
                name: "Shelling",
                    type: "Ammunition",
                    group: "-",
                    damage: "",
                    damageType: "Special",
                    properties: "—",
                    desc: `This bullet can be released to immediately explode causing rocks, iron, or other sharpened material to spread out from the impact.`,
                    blueprints: {
                        count: 5,
                        components: [{
                            component: "Shell",
                            rule: "Sturdy (3)",
                            type: "M",
                            quantity: 1,
                            aspects: "",
                            material: "Granite"
                        }]
                    }
            };
        case "shelling, splash":
            return {
                name: "Shelling, Splash",
                    type: "Ammunition",
                    group: "-",
                    damage: "",
                    damageType: "Special",
                    properties: "—",
                    desc: `This vial contains a liquid is ready to be sprayed out when connected with some force.`,
                    blueprints: {
                        count: 5,
                        components: [{
                                component: "Alchemical Substance",
                                rule: "",
                                type: "I",
                                quantity: 1,
                                aspects: "",
                                material: "Acid"
                            },
                            {
                                component: "Shell",
                                rule: "Glass",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Glass"
                            }
                        ]
                    }
            };
    }
    return {
        name: "",
    };
}

function GetItemArmorInfo(item) {
    switch (item.toLowerCase()) {
        case "":
            return {
                name: ""
            };
        case "plated jacket":
            return {
                name: "Plated Jacket",
                    type: "Light",
                    ac: 1,
                    skill: -2,
                    desc: `This jacket has plates of sturdy material sewn into strategic areas to reduce loss of mobility.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Base Armor",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 10,
                                aspects: "4",
                                material: "Granite"
                            },
                            {
                                component: "Jacket",
                                rule: "Flexible",
                                type: "M",
                                quantity: 25,
                                aspects: "9",
                                material: "Cotton"
                            }
                        ]
                    }
            };
        case "chain shirt":
            return {
                name: "Chain Shirt",
                    type: "Light",
                    ac: 2,
                    skill: -2,
                    desc: `Covering the torso, this shirt is made up of thousands of interlocking rings, usually made of metal.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Base Armor",
                            rule: "Sturdy (3)",
                            type: "M",
                            quantity: 20,
                            aspects: "67",
                            material: "Steel"
                        }]
                    }
            };
        case "fragile armor":
            return {
                name: "Fragile Armor",
                    type: "Medium",
                    ac: 0,
                    skill: -2,
                    desc: `Fragile armor is made up of any material shaped to cover the body in a thin layer of material. It is not meant to be worn in battle and in fact reduces mobility due to its stiffness.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Base Armor",
                            rule: "",
                            type: "M",
                            quantity: 20,
                            aspects: "7",
                            material: "Kaolin"
                        }]
                    }
            };
        case "lamellar":
            return {
                name: "Lamellar",
                    type: "Medium",
                    ac: 2,
                    skill: -2,
                    desc: `Lamellar is a type of armor in which small plates of various types of materials are strung together in parallel rows using fine cord. Lamellar plates can be constructed from just about any strong material such as stone, though suits of iron and steel are the most common. Lamellar armor can be crafted into various shapes, including partial pieces such as breastplates, greaves, or even entire coats.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Base Armor",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 20,
                                aspects: "8",
                                material: "Maple"
                            },
                            {
                                component: "Cord",
                                rule: "Flexible",
                                type: "M",
                                quantity: 10,
                                aspects: "4",
                                material: "Hemp"
                            }
                        ]
                    }
            };
        case "scale mail":
            return {
                name: "Scale Mail",
                    type: "Medium",
                    ac: 3,
                    skill: -2,
                    desc: `Scale mail is made up of dozens of small, overlapping plates. Scalemail has a flexible arrangement of scales in an attempt to avoid hindering the wearer’s mobility, but at the expense of omitting additional protective layers of armor.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Base Armor",
                            rule: "Sturdy (2)",
                            type: "M",
                            quantity: 25,
                            aspects: "9",
                            material: "Granite"
                        }]
                    }
            };
        case "bulken armor":
            return {
                name: "Bulken Armor",
                    type: "Medium",
                    ac: 3,
                    skill: -5,
                    desc: `Bulken armor is an attempt to make strong armor at the cost of mobility. It is made up of strong sturdy material layered on top of each other to create a thick mass that would be difficult to penetrate. This armor only covers the chest and upper arms.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Base Armor",
                            rule: "Sturdy",
                            type: "M",
                            quantity: 30,
                            aspects: "11",
                            material: "Granite"
                        }]
                    }
            };
        case "breastplate":
            return {
                name: "Breastplate",
                    type: "Medium",
                    ac: 3,
                    skill: -3,
                    desc: `A breastplate protects a wearer’s torso with a single piece of sculpted material, usually steel, similar to the core piece of a suit of full plate. Despite its sturdiness, its inflexibility and open back make it inferior to complete suits of metal armor, but still an improvement over most armors.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Base Armor",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 20,
                                aspects: "7",
                                material: "Steel"
                            },
                            {
                                component: "Padding",
                                rule: "Flexible (2)",
                                type: "M",
                                quantity: 15,
                                aspects: "6",
                                material: "Beast Leather"
                            }
                        ]
                    }
            };
        case "chain mail":
            return {
                name: "Chain Mail",
                    type: "Medium",
                    ac: 4,
                    skill: -4,
                    desc: `Unlike a chain shirt, which covers only the chest, chainmail protects the wearer with a complete mesh of chain links that cover the torso and arms, and extends below the waist. Multiple interconnected pieces offer additional protection over vital areas. The suit includes gauntlets.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Base Armor",
                            rule: "Sturdy (3)",
                            type: "M",
                            quantity: 45,
                            aspects: "135",
                            material: "Steel"
                        }]
                    }
            };
        case "bone mail":
            return {
                name: "Bone Mail",
                    type: "Heavy",
                    ac: 5,
                    skill: -4,
                    desc: `Bone mail is made up of durable bone formed to shape nicely around the torso and arms. Due to the shape of the material it significantly reduces mobility but may offer some form of intimidation to any adversaries.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Base Armor",
                                rule: "Bone",
                                type: "M",
                                quantity: 40,
                                aspects: "14",
                                material: "Beast Bone"
                            },
                            {
                                component: "Padding",
                                rule: "Flexible (2)",
                                type: "M",
                                quantity: 30,
                                aspects: "11",
                                material: "Beast Leather"
                            }
                        ]
                    }
            };
        case "splint mail":
            return {
                name: "Splint Mail",
                    type: "Heavy",
                    ac: 5,
                    skill: -4,
                    desc: `Splint mail is made up of overlapping layers of strips attached to a backing of leather or sturdy fabric. These splints are of greater size and durability than those that compose a suit of scale mail, improving the protection they afford the wearer, but at the cost of flexibility. `,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Base Armor",
                                rule: "Sturdy (2)",
                                type: "M",
                                quantity: 40,
                                aspects: "14",
                                material: "Granite"
                            },
                            {
                                component: "Padding",
                                rule: "Flexible (2)",
                                type: "M",
                                quantity: 30,
                                aspects: "11",
                                material: "Beast Leather"
                            }
                        ]
                    }
            };
        case "bulken mail":
            return {
                name: "Bulken Mail",
                    type: "Heavy",
                    ac: 6,
                    skill: -6,
                    desc: `Similar to bulken armor, this armor is made from layering thick pieces of material in top of each other without any concern for mobility. This armor protects the whole body with a full suit including a helmet, boots, and gauntlets.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Base Armor",
                            rule: "Sturdy",
                            type: "M",
                            quantity: 50,
                            aspects: "17",
                            material: "Granite"
                        }]
                    }
            };
        case "full plate":
            return {
                name: "Full Plate",
                    type: "Heavy",
                    ac: 6,
                    skill: -4,
                    desc: `This formed suit comprises multiple pieces of interconnected and overlaying plates, incorporating the benefits of numerous types of lesser armor. A complete suit of full plate (or platemail, as it is often called) includes gauntlets, heavy boots, a visored helmet, and a thick layer of padding that is worn underneath the armor. Each suit of full plate must be individually fitted to its owner by an armorsmith.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Base Armor",
                                rule: "Sturdy (3)",
                                type: "M",
                                quantity: 50,
                                aspects: "17",
                                material: "Steel"
                            },
                            {
                                component: "Padding",
                                rule: "Flexible (2)",
                                type: "M",
                                quantity: 30,
                                aspects: "11",
                                material: "Beast Leather"
                            }
                        ]
                    }
            };
        case "fragile shield":
            return {
                name: "Fragile Shield",
                    type: "Shield",
                    ac: 1,
                    skill: 0,
                    desc: `This shield will surely break as soon as something hits it. But it will block something.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Base Shield",
                            rule: "",
                            type: "M",
                            quantity: 15,
                            aspects: "6",
                            material: "Kaolin"
                        }]
                    }
            };
        case "light shield":
            return {
                name: "Light Shield",
                    type: "Shield",
                    ac: 1,
                    skill: 0,
                    desc: `This shield is light and easy to maneuver if a bit small.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Base Shield",
                            rule: "Sturdy (2)",
                            type: "M",
                            quantity: 15,
                            aspects: "6",
                            material: "Granite"
                        }]
                    }
            };
        case "heavy shield":
            return {
                name: "Heavy Shield",
                    type: "Shield",
                    ac: 2,
                    skill: -2,
                    desc: `This heavy shield is large, offering a lot of protection for some reduced maneuverability.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Base Shield",
                            rule: "Sturdy (3)",
                            type: "M",
                            quantity: 25,
                            aspects: "9",
                            material: "Steel"
                        }]
                    }
            };
    }
    return {
        name: "",
    };
}

function GetItemConsumableInfo(item) {
    switch (item.toLowerCase()) {
        case "":
            return {
                name: ""
            };
        case "steroid":
            return {
                name: "Steroid",
                    cost: 25,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: " ",
                    addiction: " ",
                    desc: `This stimulant helps to quickly allieviate pain and promote healing. When consumed, in one hour this stimulant heals [[1d6+4]] Hit Points to all injuries.`,
                    recipe: {
                        technique: "Tablet",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Schizandra",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Brahmi",
                                sub: "",
                                qty: 4
                            }
                        ]
                    }
            };
        case "steroid hq":
            return {
                name: "Steroid HQ",
                    cost: 75,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: "1 ",
                    addiction: " ",
                    desc: `This high quality stimulant helps to quickly allieviate pain and promote healing. When consumed, in one hour this stimulant heals [[2d10+10]] Hit Points to all injuries.`,
                    recipe: {
                        technique: "",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Schizandra",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Brahmi",
                                sub: "",
                                qty: 4
                            }
                        ]
                    }
            };
        case "disinfectant":
            return {
                name: "Disinfectant",
                    cost: 25,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: " ",
                    addiction: " ",
                    desc: `An ointment used to disinfect flesh wounds. When used with the First Aid action, this will shift any single wound injury to the Healed state.`,
                    recipe: {
                        technique: "Balm",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Shepherd's Purse",
                                sub: "",
                                qty: 4
                            },
                            {
                                component: "Schizandra",
                                sub: "",
                                qty: 2
                            }
                        ]
                    }
            };
        case "disinfectant hq":
            return {
                name: "Disinfectant HQ",
                    cost: 75,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: "1 ",
                    addiction: " ",
                    desc: `A high quality ointment used to disinfect flesh wounds. When used with the First Aid action, this will heal any single wound injury by 10 HP and shift it to the Healed state.`,
                    recipe: {
                        technique: "",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Shepherd's Purse",
                                sub: "",
                                qty: 4
                            },
                            {
                                component: "Schizandra",
                                sub: "",
                                qty: 2
                            }
                        ]
                    }
            };
        case "pain killer":
            return {
                name: "Pain Killer",
                    cost: 20,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: " ",
                    addiction: " ",
                    desc: `This oil is burned then breathed in to help relieve pain from headaches. When used with the First Aid action, this drug will shift all headache and severe headache injuries to the Healed state.`,
                    recipe: {
                        technique: "Inhalent",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Lycium",
                                sub: "",
                                qty: 4
                            },
                            {
                                component: "Shepherd's Purse",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Ginger",
                                sub: "Any",
                                qty: 1
                            }
                        ]
                    }
            };
        case "pain killer hq":
            return {
                name: "Pain Killer HQ",
                    cost: 60,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: "1 ",
                    addiction: " ",
                    desc: `This high quality oil is burned then breathed in to help relieve pain from headaches. When used with the First Aid action, this drug will heal all headache and severe headache injuries by 10 HP, shift them to the Healed state, and may help other head related pains.`,
                    recipe: {
                        technique: "",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Lycium",
                                sub: "",
                                qty: 4
                            },
                            {
                                component: "Shepherd's Purse",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Ginger",
                                sub: "Any",
                                qty: 1
                            }
                        ]
                    }
            };
        case "antacid":
            return {
                name: "Antacid",
                    cost: 15,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: " ",
                    addiction: " ",
                    desc: `This drug is injected to ease stomach trauma. When used with the First Aid action, this drug will shift all nausea injuries to the Healed state.`,
                    recipe: {
                        technique: "Injection",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Astragalus",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Schizandra",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "antacid hq":
            return {
                name: "Antacid HQ",
                    cost: 45,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: "1 ",
                    addiction: " ",
                    desc: `This high quality drug is injected to ease stomach trauma. When used with the First Aid action, this drug will heal all nausea injuries by 10 HP, shift them to the Healed state, and may help other stomach related pains.`,
                    recipe: {
                        technique: "",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Astragalus",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Schizandra",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "stability":
            return {
                name: "Stability",
                    cost: 15,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: " ",
                    addiction: " ",
                    desc: `An oil that is ignited whose fumes help remove dizziness. When used with the First Aid action, this drug will shift all vertigo and ringing ears injuries to the Healed state.`,
                    recipe: {
                        technique: "Inhalent",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Maidenhair",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Ginger",
                                sub: "Any",
                                qty: 2
                            }
                        ]
                    }
            };
        case "stability hq":
            return {
                name: "Stability HQ",
                    cost: 45,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: "1 ",
                    addiction: " ",
                    desc: `A high quality oil that is ignited whose fumes help remove dizziness. When used with the First Aid action, this drug will heal all vertigo and ringing ears injuries by 10 HP, shift them to the Healed state, and may help other dizziness and allergy related pains.`,
                    recipe: {
                        technique: "",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Maidenhair",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Ginger",
                                sub: "Any",
                                qty: 2
                            }
                        ]
                    }
            };
        case "eye drops":
            return {
                name: "Eye Drops",
                    cost: 15,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: " ",
                    addiction: " ",
                    desc: `An oil applied directly to the eyes to restore vision. When used with the First Aid action, this drug will shift all blurred vision injuries to the Healed state.`,
                    recipe: {
                        technique: "Balm",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Lycium",
                                sub: "",
                                qty: 4
                            },
                            {
                                component: "Aloe",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "eye drops hq":
            return {
                name: "Eye Drops HQ",
                    cost: 45,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: "1 ",
                    addiction: " ",
                    desc: `An oil applied directly to the eyes to restore vision. When used with the First Aid action, this drug will heal all blurred vision injuries by 10 HP, shift them to the Healed state, and may help other vision related pains.`,
                    recipe: {
                        technique: "",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Lycium",
                                sub: "",
                                qty: 4
                            },
                            {
                                component: "Aloe",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "muscle relief":
            return {
                name: "Muscle Relief",
                    cost: 200,
                    weight: 1,
                    type: "Medicine",
                    overdose: " ",
                    addiction: " ",
                    desc: `An ointment that quickens recovery of sore muscles. When used with the First Aid action, this drug will cause any limp or sprained wrist injury in the Recovery state to be removed after a short rest.`,
                    recipe: {
                        technique: "Balm",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Brahmi",
                                sub: "",
                                qty: 12
                            },
                            {
                                component: "Astragalus",
                                sub: "",
                                qty: 8
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 3
                            }
                        ]
                    }
            };
        case "muscle relief hq":
            return {
                name: "Muscle Relief HQ",
                    cost: 600,
                    weight: 1,
                    type: "Medicine",
                    overdose: "1 ",
                    addiction: " ",
                    desc: `An ointment that quickens recovery of sore muscles. When used with the First Aid action, this drug will heal any single limp or sprained wrist injury by 10 HP, shift them to the Healed state, and will have them removed after a short rest once it reaches the Recovery state.`,
                    recipe: {
                        technique: "",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Brahmi",
                                sub: "",
                                qty: 12
                            },
                            {
                                component: "Astragalus",
                                sub: "",
                                qty: 8
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 3
                            }
                        ]
                    }
            };
        case "breath healer":
            return {
                name: "Breath Healer",
                    cost: 190,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: " ",
                    addiction: " ",
                    desc: `An inhalant that quickly aids in the healing of lung damage. When used with the First Aid action, this drug will cause any single limp or sprained wrist injury in the Recovery state to be removed after a short rest.`,
                    recipe: {
                        technique: "Inhalent",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Astragalus",
                                sub: "",
                                qty: 15
                            },
                            {
                                component: "Ginseng",
                                sub: "",
                                qty: 10
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 3
                            }
                        ]
                    }
            };
        case "breath healer hq":
            return {
                name: "Breath Healer HQ",
                    cost: 570,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: "1 ",
                    addiction: " ",
                    desc: `An inhalant that quickly aids in the healing of lung damage. When used with the First Aid action, this drug will heal any single limp or sprained wrist injury by 10 HP, shift them to the Healed state, will have it removed after a short rest once it reaches the Recovery state, and may help with other breathing related pains.`,
                    recipe: {
                        technique: "",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Astragalus",
                                sub: "",
                                qty: 15
                            },
                            {
                                component: "Ginseng",
                                sub: "",
                                qty: 10
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 3
                            }
                        ]
                    }
            };
        case "head cleanser":
            return {
                name: "Head Cleanser",
                    cost: 220,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: " ",
                    addiction: " ",
                    desc: `An ingested pill used to quickly heal from the effects of a concussion. When consumed, this drug will cause any single Concussion injury in the Recovery state to be removed after a short rest and may help with other cognitive related pains.`,
                    recipe: {
                        technique: "Tablet",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Shepherd's Purse",
                                sub: "",
                                qty: 10
                            },
                            {
                                component: "Maidenhair",
                                sub: "",
                                qty: 10
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 3
                            }
                        ]
                    }
            };
        case "head cleanser hq":
            return {
                name: "Head Cleanser HQ",
                    cost: 660,
                    weight: 0.1,
                    type: "Medicine",
                    overdose: "1 ",
                    addiction: " ",
                    desc: `An ingested pill used to quickly heal from the effects of a concussion. When consumed, this drug will heal any single Concussion injury by 10 HP, shift them to the Healed state, will have it removed after a short rest once it reaches the Recovery state, and may help with other cognitive related pains.`,
                    recipe: {
                        technique: "",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Shepherd's Purse",
                                sub: "",
                                qty: 10
                            },
                            {
                                component: "Maidenhair",
                                sub: "",
                                qty: 10
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 3
                            }
                        ]
                    }
            };
        case "dash extract":
            return {
                name: "Dash Extract",
                    cost: 500,
                    weight: 0.1,
                    type: "Extract",
                    overdose: " 3",
                    addiction: "Day ",
                    desc: `This extract allows super-human feats of stamina. When used with the First Aid action, the target's movement speed doubles until the end of their next round. This extract often causes its users to become hyperactive and exciteable while its effects are active.`,
                    recipe: {
                        technique: "Injection",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Yidash",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Astragalus",
                                sub: "",
                                qty: 5
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 3
                            }
                        ]
                    }
            };
        case "dash extract hq":
            return {
                name: "Dash Extract HQ",
                    cost: 1500,
                    weight: 0.1,
                    type: "Extract",
                    overdose: "1 3",
                    addiction: "Day ",
                    desc: `This high quality extract allows super-human feats of stamina. When used with the First Aid action, the target's movement speed doubles until the end of their next round and they can use the Dash action as a bonus action for one minute. This extract often causes its users to become hyperactive and exciteable while its effects are active.`,
                    recipe: {
                        technique: "Injection",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Yidash",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Astragalus",
                                sub: "",
                                qty: 5
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 3
                            }
                        ]
                    }
            };
        case "guard extract":
            return {
                name: "Guard Extract",
                    cost: 700,
                    weight: 0.1,
                    type: "Extract",
                    overdose: " 3",
                    addiction: "Day ",
                    desc: `This extract grants incredible resistance to pain. When used with the First Aid action, the target reduces HP damage by 50% until the end of their next round. This extract often causes its users to dull their emotions while its effects are active.`,
                    recipe: {
                        technique: "Injection",
                        dc: 20,
                        complexity: 5,
                        components: [{
                                component: "Endura",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Maidenhair",
                                sub: "",
                                qty: 5
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 4
                            }
                        ]
                    }
            };
        case "guard extract hq":
            return {
                name: "Guard Extract HQ",
                    cost: 3000,
                    weight: 0.1,
                    type: "Extract",
                    overdose: "1 3",
                    addiction: "Day ",
                    desc: `This high quality extract grants incredible resistance to pain. When used with the First Aid action, the target reduces HP damage by 50% for one minute. This extract often causes its users to dull their emotions while its effects are active.`,
                    recipe: {
                        technique: "Injection",
                        dc: 20,
                        complexity: 5,
                        components: [{
                                component: "Endura",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Maidenhair",
                                sub: "",
                                qty: 5
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 4
                            }
                        ]
                    }
            };
        case "power extract":
            return {
                name: "Power Extract",
                    cost: 800,
                    weight: 0.1,
                    type: "Extract",
                    overdose: " 3",
                    addiction: "Day ",
                    desc: `This extract causes sudden swelling of muscles. When used with the First Aid action, the target's strength score is 21 until the end of their next round. This extract often causes its users to become irrationally angry while its effects are active.`,
                    recipe: {
                        technique: "Injection",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Rage Fruit",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Brahmi",
                                sub: "",
                                qty: 5
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 3
                            }
                        ]
                    }
            };
        case "power extract hq":
            return {
                name: "Power Extract HQ",
                    cost: 2400,
                    weight: 0.1,
                    type: "Extract",
                    overdose: "1 3",
                    addiction: "Day ",
                    desc: `This high quality extract causes sudden swelling of muscles. When used with the First Aid action, the target's strength score is 21 for one minute. This extract often causes its users to become irrationally angry while its effects are active.`,
                    recipe: {
                        technique: "Injection",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Rage Fruit",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Brahmi",
                                sub: "",
                                qty: 5
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 3
                            }
                        ]
                    }
            };
        case "regen extract":
            return {
                name: "Regen Extract",
                    cost: 600,
                    weight: 0.1,
                    type: "Extract",
                    overdose: " 3",
                    addiction: "Day ",
                    desc: `This extract causes the body to quickly heal painful injuries.When used with the First Aid action, all of the target's injuries heal 3 HP at the start of each of their turns until the end of their next round. This extract often causes its users to become paranoid while its effects are active.`,
                    recipe: {
                        technique: "Injection",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Paraherb",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Schizandra",
                                sub: "",
                                qty: 5
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 4
                            }
                        ]
                    }
            };
        case "regen extract hq":
            return {
                name: "Regen Extract HQ",
                    cost: 1800,
                    weight: 0.1,
                    type: "Extract",
                    overdose: "1 3",
                    addiction: "Day ",
                    desc: `This high quality extract causes the body to quickly heal painful injuries.When used with the First Aid action, all of the target's injuries heal 3 HP at the start of each of their turns for one minute. This extract often causes its users to become paranoid while its effects are active.`,
                    recipe: {
                        technique: "Injection",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Paraherb",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Schizandra",
                                sub: "",
                                qty: 5
                            },
                            {
                                component: "Steroid",
                                sub: "",
                                qty: 4
                            }
                        ]
                    }
            };
        case "jazz":
            return {
                name: "Jazz",
                    cost: 500,
                    weight: 0.02,
                    type: "Stimulant",
                    overdose: " 6",
                    addiction: "Day 4",
                    desc: `A white powdery stimulant taken recreationally to stimulate excitement. Usually consumed through inhalation, after 1 minute the user's focus is increased as are their reactions. For 2 hours the user has advantage on Dexterity checks and disadvantage on Wisdom checks. When the effects end the user goes into a crash state and gains one level of exhaustion for the rest of the day.`,
                    recipe: {
                        technique: "Inhalent",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Joza Leaf",
                                sub: "",
                                qty: 11
                            },
                            {
                                component: "Astragalus",
                                sub: "",
                                qty: 4
                            },
                            {
                                component: "Stimulant",
                                sub: "",
                                qty: 3
                            }
                        ]
                    }
            };
        case "jazz hq":
            return {
                name: "Jazz HQ",
                    cost: 1000,
                    weight: 0.02,
                    type: "Stimulant",
                    overdose: "1 6",
                    addiction: "Day 4",
                    desc: `A white powdery stimulant taken recreationally to stimulate excitement. Usually consumed through inhalation, after 1 minute the user's focus is increased as are their reactions. For 2 hours the user has advantage on Dexterity checks and disadvantage on Wisdom checks. When the effects end the user goes into a crash state and gains one level of exhaustion for the rest of the day.`,
                    recipe: {
                        technique: "Inhalent",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Joza Leaf",
                                sub: "",
                                qty: 11
                            },
                            {
                                component: "Astragalus",
                                sub: "",
                                qty: 4
                            },
                            {
                                component: "Stimulant",
                                sub: "",
                                qty: 3
                            }
                        ]
                    }
            };
        case "swing":
            return {
                name: "Swing",
                    cost: 96,
                    weight: 0.5,
                    type: "Stimulant",
                    overdose: " 15",
                    addiction: "Day ",
                    desc: `A psychoactive that is usually rolled into a thin paper and smoked. It is well known as a substance that calms nerves. After 10 minutes of smoking, the user's senses dull. For 2 hours the user's concentration checks gain a +2 bonus and feel a sense of calm but has disadvantage on dexterity saving throws and has a -2 penalty on AC.`,
                    recipe: {
                        technique: "Inhalent",
                        dc: 10,
                        complexity: 3,
                        components: [{
                            component: "Caswinnis",
                            sub: "",
                            qty: 4
                        }]
                    }
            };
        case "gypsy swing":
            return {
                name: "Gypsy Swing",
                    cost: 144,
                    weight: 0.5,
                    type: "Stimulant",
                    overdose: " 12",
                    addiction: "Day 5",
                    desc: ` A more powerful and addictive variant of Swing that is completely indistinguishable from the regular variant. After 10 minutes of smoking, the user's senses dull. For 2 hours the user's concentration checks gain a +2 bonus and feel a strong sense of relaxation.`,
                    recipe: {
                        technique: "Inhalent",
                        dc: 10,
                        complexity: 3,
                        components: [{
                                component: "Caswinnis",
                                sub: "Gypsy",
                                qty: 2
                            },
                            {
                                component: "Caswinnis",
                                sub: "",
                                qty: 2
                            }
                        ]
                    }
            };
        case "rhythm":
            return {
                name: "Rhythm",
                    cost: 300,
                    weight: 0.1,
                    type: "Stimulant",
                    overdose: " 2",
                    addiction: "Day 3",
                    desc: `A psychoactive injected via needle by the First Aid action. Immediately upon successful injection the drug's psychoactive effects begin to take hold. For 1 minute, Weapon and Spell attack rolls against the subject are done at disadvantage and the user immediately restores 10d6 barrier. While the effect is active, all weapon and spell attack rolls made by the user are done at disadvantage and a DC 20 concentration check must be passed to cast a spell.`,
                    recipe: {
                        technique: "Injection",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Rhynoseed",
                                sub: "",
                                qty: 3
                            },
                            {
                                component: "Shepherd's Purse",
                                sub: "",
                                qty: 2
                            }
                        ]
                    }
            };
        case "rhythm hq":
            return {
                name: "Rhythm HQ",
                    cost: 600,
                    weight: 0.1,
                    type: "Stimulant",
                    overdose: "1 2",
                    addiction: "Day 3",
                    desc: `A psychoactive injected via needle by the First Aid action. Immediately upon successful injection the drug's psychoactive effects begin to take hold. For 1 minute, Weapon and Spell attack rolls against the subject are done at disadvantage and the user immediately restores 10d6 barrier. While the effect is active, all weapon and spell attack rolls made by the user are done at disadvantage and a DC 20 concentration check must be passed to cast a spell.`,
                    recipe: {
                        technique: "Injection",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Rhynoseed",
                                sub: "",
                                qty: 3
                            },
                            {
                                component: "Shepherd's Purse",
                                sub: "",
                                qty: 2
                            }
                        ]
                    }
            };
        case "dixie":
            return {
                name: "Dixie",
                    cost: 160,
                    weight: 0.1,
                    type: "Stimulant",
                    overdose: " 1",
                    addiction: "Day ",
                    desc: `A depressant taken in pill form to suppress negative feelings. After consumption this drug takes 10 minutes for its effects to take hold. Then for 10 minutes the user no longer needs to make concentration checks to maintain spells when attacked. In addition, any effects that temporarily cause disadvantage to attack rolls, saving throws, and/or skill checks no longer work.`,
                    recipe: {
                        technique: "Tablet",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Doxyl Leaf",
                                sub: "",
                                qty: 4
                            },
                            {
                                component: "Astragalus",
                                sub: "",
                                qty: 3
                            },
                            {
                                component: "Stimulant",
                                sub: "",
                                qty: 3
                            }
                        ]
                    }
            };
        case "baguette":
            return {
                name: "Baguette",
                    cost: 4,
                    weight: 0.5,
                    type: "Minervan Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A long crisp bread common in Minerva.`,
                    recipe: {
                        technique: "Baking",
                        dc: 10,
                        complexity: 2,
                        components: [{
                                component: "Wheat",
                                sub: "Coastal",
                                qty: 2
                            },
                            {
                                component: "Yeast",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "bouillabaisse":
            return {
                name: "Bouillabaisse",
                    cost: 12,
                    weight: 0.5,
                    type: "Minervan Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A flavorful seafood stew that's popular amongst `,
                    recipe: {
                        technique: "Stewing",
                        dc: 15,
                        complexity: 5,
                        components: [{
                                component: "Onion",
                                sub: "Crisp",
                                qty: 2
                            },
                            {
                                component: "Rock Clam",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Tomato",
                                sub: "Ruby",
                                qty: 1
                            }
                        ]
                    }
            };
        case "coconut cheese":
            return {
                name: "Coconut Cheese",
                    cost: 8,
                    weight: 0.5,
                    type: "Minervan Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `This creamy and thick white cheese is a favorite in Minerva.`,
                    recipe: {
                        technique: "Simmering",
                        dc: 15,
                        complexity: 3,
                        components: [{
                                component: "Coconut",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Gelatin",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Yeast",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "crepes":
            return {
                name: "Crepes",
                    cost: 3,
                    weight: 0.5,
                    type: "Minervan Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `These thin pancakes are rolled into tubes. They are often served with jams or for more expensive meals, meats.`,
                    recipe: {
                        technique: "Grilling",
                        dc: 15,
                        complexity: 3,
                        components: [{
                                component: "Wheat",
                                sub: "Coastal",
                                qty: 2
                            },
                            {
                                component: "Yeast",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "macarons":
            return {
                name: "Macarons",
                    cost: 5,
                    weight: 0.5,
                    type: "Minervan Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `These popular soft and crisp cookies come in a variety of colors and flavors.`,
                    recipe: {
                        technique: "Baking",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Wheat",
                                sub: "Coastal",
                                qty: 1
                            },
                            {
                                component: "Fruit",
                                sub: "Any",
                                qty: 1
                            }
                        ]
                    }
            };
        case "onion soup":
            return {
                name: "Onion Soup",
                    cost: 12,
                    weight: 0.5,
                    type: "Minervan Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A classic Minervan soup served as an appetizer in many Minervan cuisine restaurants.`,
                    recipe: {
                        technique: "Stewing",
                        dc: 15,
                        complexity: 3,
                        components: [{
                                component: "Onion",
                                sub: "Crisp",
                                qty: 2
                            },
                            {
                                component: "Coconut Cheese",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "quiche":
            return {
                name: "Quiche",
                    cost: 20,
                    weight: 0.5,
                    type: "Minervan Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `This savory egg dish is baked into a pastry base.`,
                    recipe: {
                        technique: "Baking",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Egg",
                                sub: "Any",
                                qty: 1
                            },
                            {
                                component: "Wheat",
                                sub: "Any",
                                qty: 1
                            },
                            {
                                component: "Onion",
                                sub: "Any",
                                qty: 1
                            }
                        ]
                    }
            };
        case "raclettes":
            return {
                name: "Raclettes",
                    cost: 10,
                    weight: 0.5,
                    type: "Minervan Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `Soft Popato with cheese melted over them.`,
                    recipe: {
                        technique: "Grilling",
                        dc: 10,
                        complexity: 3,
                        components: [{
                                component: "Popato",
                                sub: "Any",
                                qty: 1
                            },
                            {
                                component: "Coconut Cheese",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "thuressian salad":
            return {
                name: "Thuressian Salad",
                    cost: 10,
                    weight: 0.5,
                    type: "Minervan Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A savory salad originally from the islands of the East Sea but appropriated by Minerva.`,
                    recipe: {
                        technique: "Mixing",
                        dc: 10,
                        complexity: 3,
                        components: [{
                                component: "Cabbage",
                                sub: "Sea",
                                qty: 2
                            },
                            {
                                component: "Midnight Sardine",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Olives",
                                sub: "Black",
                                qty: 1
                            }
                        ]
                    }
            };
        case "vodka pâté":
            return {
                name: "Vodka Pâté",
                    cost: 10,
                    weight: 0.5,
                    type: "Minervan Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A fish pâté cooked in vodka. Often spread over breads or crepes.`,
                    recipe: {
                        technique: "Mixing",
                        dc: 15,
                        complexity: 3,
                        components: [{
                                component: "Any Fish",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Seaman's Vodka",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "apricot vinegar":
            return {
                name: "Apricot Vinegar",
                    cost: 2,
                    weight: 0.5,
                    type: "Apollosian Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A sour vinnegar created by fermenting apricots.`,
                    recipe: {
                        technique: "Mixing",
                        dc: 10,
                        complexity: 2,
                        components: [{
                            component: "Apricots",
                            sub: "Fine",
                            qty: 1
                        }]
                    }
            };
        case "barley noodles":
            return {
                name: "Barley Noodles",
                    cost: 2,
                    weight: 0.5,
                    type: "Apollosian Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `Thin noodles often used in soups or eaten as a base in a dish.`,
                    recipe: {
                        technique: "Mixing",
                        dc: 10,
                        complexity: 2,
                        components: [{
                            component: "Barley",
                            sub: "",
                            qty: 1
                        }]
                    }
            };
        case "cabbage rolls":
            return {
                name: "Cabbage Rolls",
                    cost: 3,
                    weight: 0.5,
                    type: "Apollosian Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A crispy roll filled with sour cabbage`,
                    recipe: {
                        technique: "Mixing",
                        dc: 10,
                        complexity: 3,
                        components: [{
                                component: "Barley",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Apricot Vinegar",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Cabbage",
                                sub: "White",
                                qty: 1
                            }
                        ]
                    }
            };
        case "hot and sour soup":
            return {
                name: "Hot and Sour Soup",
                    cost: 6,
                    weight: 0.5,
                    type: "Apollosian Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A classic Apollosian soup that is equal parts spicy and sour.`,
                    recipe: {
                        technique: "Stewing",
                        dc: 10,
                        complexity: 4,
                        components: [{
                                component: "Apricot Vinegar",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Peppers",
                                sub: "Any",
                                qty: 2
                            },
                            {
                                component: "Mushrooms",
                                sub: "Black",
                                qty: 1
                            }
                        ]
                    }
            };
        case "mushroom fried rice":
            return {
                name: "Mushroom Fried Rice",
                    cost: 5,
                    weight: 0.5,
                    type: "Apollosian Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A simple dish that fries rice with mushrooms and mushroom oil.`,
                    recipe: {
                        technique: "Grilling",
                        dc: 10,
                        complexity: 3,
                        components: [{
                                component: "Rice",
                                sub: "Short Grain",
                                qty: 2
                            },
                            {
                                component: "Mushrooms",
                                sub: "Black",
                                qty: 2
                            }
                        ]
                    }
            };
        case "orange rackshur noodles":
            return {
                name: "Orange Rackshur Noodles",
                    cost: 20,
                    weight: 0.5,
                    type: "Apollosian Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A delicacy that coats rackshur meat with the juices of oranges and served with noodles`,
                    recipe: {
                        technique: "Grilling",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Barley Noodles",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Rackshur Meat",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Orange",
                                sub: "Mountain",
                                qty: 1
                            }
                        ]
                    }
            };
        case "sweet brocoli stir fry":
            return {
                name: "Sweet Brocoli Stir Fry",
                    cost: 8,
                    weight: 0.5,
                    type: "Apollosian Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `Brocoli in a sweet sauce served over barley noodles`,
                    recipe: {
                        technique: "Grilling",
                        dc: 10,
                        complexity: 3,
                        components: [{
                                component: "Barley Noodles",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Broccoli",
                                sub: "White",
                                qty: 2
                            },
                            {
                                component: "Sugarcane",
                                sub: "Syrup",
                                qty: 1
                            }
                        ]
                    }
            };
        case "sweet buns":
            return {
                name: "Sweet Buns",
                    cost: 4,
                    weight: 0.5,
                    type: "Apollosian Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A fluffy dumpling stuffed with sweet radish and turnip mashed to a paste.`,
                    recipe: {
                        technique: "Steaming",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Rice",
                                sub: "Short Grain",
                                qty: 1
                            },
                            {
                                component: "Radish",
                                sub: "White",
                                qty: 1
                            },
                            {
                                component: "Turnip",
                                sub: "Purple",
                                qty: 1
                            }
                        ]
                    }
            };
        case "stif fry tofu and rice":
            return {
                name: "Stif Fry Tofu and Rice",
                    cost: 5,
                    weight: 0.5,
                    type: "Apollosian Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `Spiced tofu is cooked with vegetables and soy sauce then served over rice.`,
                    recipe: {
                        technique: "Grilling",
                        dc: 10,
                        complexity: 3,
                        components: [{
                                component: "Rice",
                                sub: "Short Grain",
                                qty: 1
                            },
                            {
                                component: "Tofu",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Vegetables",
                                sub: "Any",
                                qty: 1
                            }
                        ]
                    }
            };
        case "tofu":
            return {
                name: "Tofu",
                    cost: 2,
                    weight: 0.5,
                    type: "Apollosian Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A white squishy staple of Apollosian cuisine.`,
                    recipe: {
                        technique: "Steaming",
                        dc: 10,
                        complexity: 2,
                        components: [{
                            component: "Soybeans",
                            sub: "",
                            qty: 1
                        }]
                    }
            };
        case "baklava":
            return {
                name: "Baklava",
                    cost: 4,
                    weight: 0.5,
                    type: "Junean Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A sweet baked good mixed with sugary syrup`,
                    recipe: {
                        technique: "Baking",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Wheat",
                                sub: "Sunset",
                                qty: 1
                            },
                            {
                                component: "Sugarcane",
                                sub: "Crystal",
                                qty: 2
                            }
                        ]
                    }
            };
        case "chole":
            return {
                name: "Chole",
                    cost: 8,
                    weight: 0.5,
                    type: "Junean Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A filling and savory curry filled with chickpeas.`,
                    recipe: {
                        technique: "Stewing",
                        dc: 10,
                        complexity: 3,
                        components: [{
                                component: "Curry",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Chickpeas",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Onion",
                                sub: "Sand",
                                qty: 1
                            }
                        ]
                    }
            };
        case "curry":
            return {
                name: "Curry",
                    cost: 3,
                    weight: 0.5,
                    type: "Junean Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A savory sauce often used as a dip or sauce with grains, chickpeas, and vegetables.`,
                    recipe: {
                        technique: "Simmering",
                        dc: 10,
                        complexity: 2,
                        components: [{
                                component: "Turmeric",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Pepper",
                                sub: "Any",
                                qty: 1
                            },
                            {
                                component: "Garlic",
                                sub: "Any",
                                qty: 1
                            }
                        ]
                    }
            };
        case "falafel":
            return {
                name: "Falafel",
                    cost: 5,
                    weight: 0.5,
                    type: "Junean Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A densely packed ball of chickpeas and spices common in Junean cuisine.`,
                    recipe: {
                        technique: "Mixing",
                        dc: 10,
                        complexity: 4,
                        components: [{
                                component: "Chickpeas",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Stimulant",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "fattoush":
            return {
                name: "Fattoush",
                    cost: 5,
                    weight: 0.5,
                    type: "Junean Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A refreshing salad with a tart flavor.`,
                    recipe: {
                        technique: "Mixing",
                        dc: 10,
                        complexity: 3,
                        components: [{
                                component: "Pita",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Cucumber",
                                sub: "Any",
                                qty: 1
                            },
                            {
                                component: "Melon",
                                sub: "Any",
                                qty: 1
                            }
                        ]
                    }
            };
        case "hummus":
            return {
                name: "Hummus",
                    cost: 2,
                    weight: 0.5,
                    type: "Junean Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A popular, thick, savory sauce that is often used for dips or spreads.`,
                    recipe: {
                        technique: "Mixing",
                        dc: 10,
                        complexity: 2,
                        components: [{
                                component: "Chickpeas",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Garlic",
                                sub: "Any",
                                qty: 1
                            }
                        ]
                    }
            };
        case "kofta":
            return {
                name: "Kofta",
                    cost: 4,
                    weight: 0.5,
                    type: "Junean Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `These savory balls of vegetables were invented in Juno and have become a popular dish around the world`,
                    recipe: {
                        technique: "Mixing",
                        dc: 15,
                        complexity: 3,
                        components: [{
                                component: "Beans",
                                sub: "Sweet",
                                qty: 1
                            },
                            {
                                component: "Salt",
                                sub: "Flaked",
                                qty: 1
                            },
                            {
                                component: "Carrot",
                                sub: "Spicy",
                                qty: 1
                            }
                        ]
                    }
            };
        case "paneer":
            return {
                name: "Paneer",
                    cost: 6,
                    weight: 0.5,
                    type: "Junean Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A recently made popular dish due to trade with Apollo. This mildly flavorful dish combines tofu with Junean spices.`,
                    recipe: {
                        technique: "Simmering",
                        dc: 15,
                        complexity: 5,
                        components: [{
                                component: "Turmeric",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Tofu",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Cabbage",
                                sub: "White",
                                qty: 1
                            }
                        ]
                    }
            };
        case "papdi":
            return {
                name: "Papdi",
                    cost: 2,
                    weight: 0.5,
                    type: "Junean Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `Small discs of crispy dough. These are often eaten as a snack or a side dish to a meal.`,
                    recipe: {
                        technique: "Baking",
                        dc: 10,
                        complexity: 2,
                        components: [{
                                component: "Wheat",
                                sub: "Sunset",
                                qty: 1
                            },
                            {
                                component: "Salt",
                                sub: "Flaked",
                                qty: 1
                            }
                        ]
                    }
            };
        case "pita":
            return {
                name: "Pita",
                    cost: 2,
                    weight: 0.5,
                    type: "Junean Cuisine",
                    overdose: " ",
                    addiction: " ",
                    desc: `A flavorful flatbread originating from the Aridsha desert. It's often eaten as part of a wrap.`,
                    recipe: {
                        technique: "Baking",
                        dc: 10,
                        complexity: 2,
                        components: [{
                                component: "Wheat",
                                sub: "Sunset",
                                qty: 1
                            },
                            {
                                component: "Sugarcane",
                                sub: "Crystal",
                                qty: 1
                            }
                        ]
                    }
            };
        case "cacao drink":
            return {
                name: "Cacao Drink",
                    cost: 20,
                    weight: 0.5,
                    type: "Brew",
                    overdose: " ",
                    addiction: " ",
                    desc: `A hot, sometimes sweet or bitter drink common in Liber. By consuming this drink you can stave off your highest stage of exhaustion's effects for 1 hour and those that drink it tend to become more excitable.`,
                    recipe: {
                        technique: "Roasting",
                        dc: 10,
                        complexity: 3,
                        components: [{
                            component: "Cacaold Beans",
                            sub: "",
                            qty: 1
                        }]
                    }
            };
        case "coffee":
            return {
                name: "Coffee",
                    cost: 2,
                    weight: 0.5,
                    type: "Brew",
                    overdose: " ",
                    addiction: " ",
                    desc: `A caffeinated drink whose modern variation was popularized in Apollo. The tribes around Juno have another variation that leaves the bean grinds in the drink and create a stronger drink. By consuming this drink you can stave off the effects of the first stage of exhaustion's effects for 1 hour.`,
                    recipe: {
                        technique: "Roasting",
                        dc: 10,
                        complexity: 2,
                        components: [{
                            component: "Coffee Beans",
                            sub: "",
                            qty: 1
                        }]
                    }
            };
        case "energy drink":
            return {
                name: "Energy Drink",
                    cost: 30,
                    weight: 0.5,
                    type: "Brew",
                    overdose: " ",
                    addiction: " ",
                    desc: `This sugary drink full of energy boosting chemicals was first made popular in Minerva. By consuming this drink you can stave off your highest stage of exhaustion's effects for 1 hour.`,
                    recipe: {
                        technique: "Blending",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Astragalus",
                                sub: "",
                                qty: 2
                            },
                            {
                                component: "Ginseng",
                                sub: "",
                                qty: 4
                            },
                            {
                                component: "Stimulant",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "fruit juice":
            return {
                name: "Fruit Juice",
                    cost: 2,
                    weight: 0.5,
                    type: "Brew",
                    overdose: " ",
                    addiction: " ",
                    desc: `Juice made from a fruit. This sugary drink tends to excite emotions when consumed.`,
                    recipe: {
                        technique: "Blending",
                        dc: 10,
                        complexity: 2,
                        components: [{
                            component: "Fruit",
                            sub: "Any",
                            qty: 1
                        }]
                    }
            };
        case "jade tea":
            return {
                name: "Jade Tea",
                    cost: 3,
                    weight: 0.3,
                    type: "Brew",
                    overdose: " ",
                    addiction: " ",
                    desc: `A traditional Ceresian green tea well loved for its aroma. By consuming this drink you can stave off the effects of the first stage of exhaustion's effects for 1 hour.`,
                    recipe: {
                        technique: "Steeping",
                        dc: 10,
                        complexity: 2,
                        components: [{
                            component: "Camellia Leaves",
                            sub: "",
                            qty: 1
                        }]
                    }
            };
        case "monday tea":
            return {
                name: "Monday Tea",
                    cost: 5,
                    weight: 0.3,
                    type: "Brew",
                    overdose: " ",
                    addiction: " ",
                    desc: `A black tea created in Minerva and often consumed in the morning to start a daily routine. By consuming this drink you can stave off the effects of the first stage of exhaustion's effects for 1 hour.`,
                    recipe: {
                        technique: "Steeping",
                        dc: 10,
                        complexity: 2,
                        components: [{
                            component: "Camellia Leaves",
                            sub: "",
                            qty: 1
                        }]
                    }
            };
        case "victoria tea":
            return {
                name: "Victoria Tea",
                    cost: 4,
                    weight: 0.3,
                    type: "Brew",
                    overdose: " ",
                    addiction: " ",
                    desc: `A calming tea popular in Juno and spread by the Guidance as a tool for meditation. This drink tends to calm emotions when consumed.`,
                    recipe: {
                        technique: "Steeping",
                        dc: 10,
                        complexity: 3,
                        components: [{
                                component: "Victoria Lily",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Ginger",
                                sub: "Any",
                                qty: 1
                            }
                        ]
                    }
            };
        case "common beer":
            return {
                name: "Common Beer",
                    cost: 3,
                    weight: 0.5,
                    type: "Alcohol",
                    overdose: " ",
                    addiction: " ",
                    desc: `A common beer found just about anywhere.`,
                    recipe: {
                        technique: "Fermenting",
                        dc: 10,
                        complexity: 3,
                        components: [{
                                component: "Wheat",
                                sub: "Any",
                                qty: 1
                            },
                            {
                                component: "Yeast",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "greenwood ale":
            return {
                name: "Greenwood Ale",
                    cost: 5,
                    weight: 0.5,
                    type: "Alcohol",
                    overdose: " ",
                    addiction: " ",
                    desc: `A flavorful ale from Arachos that is common in Minerva and the surrounding area. Named for the motes of bark the ale is brewed with.`,
                    recipe: {
                        technique: "Fermenting",
                        dc: 15,
                        complexity: 3,
                        components: [{
                                component: "Maidenhair",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Yeast",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "aelton honey ale":
            return {
                name: "Aelton Honey Ale",
                    cost: 8,
                    weight: 0.5,
                    type: "Alcohol",
                    overdose: " ",
                    addiction: " ",
                    desc: `A popular ale made and exported from Aelton that is common in Minerva and the surrounding area.. It's an abnormally sweetened beer.`,
                    recipe: {
                        technique: "Fermenting",
                        dc: 15,
                        complexity: 3,
                        components: [{
                                component: "Thousandcorn",
                                sub: "",
                                qty: 3
                            },
                            {
                                component: "Yeast",
                                sub: "",
                                qty: 1
                            },
                            {
                                component: "Honey",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "aelight bourbon":
            return {
                name: "Aelight Bourbon",
                    cost: 16,
                    weight: 0.1,
                    type: "Alcohol",
                    overdose: " ",
                    addiction: " ",
                    desc: `A whiskey exported from Aelton. Its light golden hue and strong flavor is often enjoyed by commoners looking to enjoy a stronger drink.`,
                    recipe: {
                        technique: "Fermenting",
                        dc: 15,
                        complexity: 4,
                        components: [{
                            component: "Thousandcorn",
                            sub: "",
                            qty: 3
                        }]
                    }
            };
        case "vulcan whiskey":
            return {
                name: "Vulcan Whiskey",
                    cost: 10,
                    weight: 0.1,
                    type: "Alcohol",
                    overdose: " ",
                    addiction: " ",
                    desc: `A common whiskey made in Minerva's Vulcan borough. It's dark malty flavor is sought after those that want some kick to their drink.`,
                    recipe: {
                        technique: "Fermenting",
                        dc: 15,
                        complexity: 3,
                        components: [{
                            component: "Barley",
                            sub: "",
                            qty: 3
                        }]
                    }
            };
        case "seaman's vodka":
            return {
                name: "Seaman's Vodka",
                    cost: 4,
                    weight: 0.1,
                    type: "Alcohol",
                    overdose: " ",
                    addiction: " ",
                    desc: `This vodka is commonly found in communities of the East Sea. Its cheaply made and popular amongst sailors on long voyages.`,
                    recipe: {
                        technique: "Fermenting",
                        dc: 10,
                        complexity: 3,
                        components: [{
                            component: "Popato",
                            sub: "Any",
                            qty: 2
                        }]
                    }
            };
        case "white water wine":
            return {
                name: "White Water Wine",
                    cost: 4,
                    weight: 0.5,
                    type: "Alcohol",
                    overdose: " ",
                    addiction: " ",
                    desc: `A common white wine exported from Ceres. It is a traditional drink of Ceresian tribes but has now gained mass market appeal.`,
                    recipe: {
                        technique: "Fermenting",
                        dc: 15,
                        complexity: 3,
                        components: [{
                            component: "Grapes",
                            sub: "Clear",
                            qty: 2
                        }]
                    }
            };
        case "scarlet wine":
            return {
                name: "Scarlet Wine",
                    cost: 10,
                    weight: 0.5,
                    type: "Alcohol",
                    overdose: " ",
                    addiction: " ",
                    desc: `This red wine is adored for its tart flavor and deep red. It is also known as blood wine, a drink consumed to initiate an intent to hunt.`,
                    recipe: {
                        technique: "Fermenting",
                        dc: 15,
                        complexity: 3,
                        components: [{
                            component: "Grapes",
                            sub: "Highland",
                            qty: 2
                        }]
                    }
            };
        case "rose water wine":
            return {
                name: "Rose Water Wine",
                    cost: 14,
                    weight: 0.2,
                    type: "Alcohol",
                    overdose: " ",
                    addiction: " ",
                    desc: `This sparkling wine is a soft pink in color and well loved during parties and celebrations. It is an export from Ceres' Capital City.`,
                    recipe: {
                        technique: "Fermenting",
                        dc: 15,
                        complexity: 4,
                        components: [{
                                component: "Grapes",
                                sub: "White",
                                qty: 1
                            },
                            {
                                component: "Grapes",
                                sub: "Highland",
                                qty: 1
                            },
                            {
                                component: "Stimulant",
                                sub: "",
                                qty: 1
                            }
                        ]
                    }
            };
        case "red rum":
            return {
                name: "Red Rum",
                    cost: 8,
                    weight: 0.1,
                    type: "Alcohol",
                    overdose: " ",
                    addiction: " ",
                    desc: `This pale red rum is commonly brewed in Apollo but exported all around the world. It's popular amongst its people as a common alcoholic beverage.`,
                    recipe: {
                        technique: "Fermenting",
                        dc: 15,
                        complexity: 3,
                        components: [{
                            component: "Sugarcane",
                            sub: "Syrup",
                            qty: 2
                        }]
                    }
            };
        case "apollen gold rum":
            return {
                name: "Apollen Gold Rum",
                    cost: 120,
                    weight: 0.1,
                    type: "Alcohol",
                    overdose: " ",
                    addiction: " ",
                    desc: `A golden red rum that is the pride of the Apollosian elite. Highly sought for its smooth and sweet flavor.`,
                    recipe: {
                        technique: "Fermenting",
                        dc: 20,
                        complexity: 4,
                        components: [{
                                component: "Sugarcane",
                                sub: "Any",
                                qty: 2
                            },
                            {
                                component: "Honey",
                                sub: "",
                                qty: 2
                            }
                        ]
                    }
            };
        case "libran ice wine":
            return {
                name: "Libran Ice Wine",
                    cost: 200,
                    weight: 0.5,
                    type: "Alcohol",
                    overdose: " ",
                    addiction: " ",
                    desc: `A beloved white wine that maintains a consistent chill. It is the prided export of Liber.`,
                    recipe: {
                        technique: "Fermenting",
                        dc: 20,
                        complexity: 5,
                        components: [{
                            component: "Grapes",
                            sub: "Ice",
                            qty: 2
                        }]
                    }
            };
    }
    return {
        name: "",
    };
}

function GetItemGearInfo(item) {
    switch (item.toLowerCase()) {
        case "":
            return {
                name: ""
            };
        case "bedroll":
            return {
                name: "Bedroll",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 7,
                    desc: `This consists of two woolen sheets sewn together along the bottom and one side to create a bag for sleeping in. Some have cloth straps along the open side so the bedroll can be tied closed while you are sleeping. It can be rolled and tied into a tight coil for storage or transport.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Bedroll",
                            rule: "Flexible",
                            type: "M",
                            quantity: 70,
                            aspects: "",
                            material: "Cotton"
                        }]
                    }
            };
        case "blanket":
            return {
                name: "Blanket",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 3,
                    desc: `This warm, woven blanket has straps so it can be rolled up and tied. Blankets are often used in conjunction with bedrolls to provide additional warmth or a ground cushion.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Blanket",
                            rule: "Flexible",
                            type: "M",
                            quantity: 35,
                            aspects: "",
                            material: "Cotton"
                        }]
                    }
            };
        case "cot":
            return {
                name: "Cot",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 30,
                    desc: `This elevated camp bed is made of wood and canvas, and is particularly useful when the ground is wet or rocky. It is large enough for a full-grown human, but folds down into a 4-foot-by-9-inch cylindrical bag.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Fabric",
                                rule: "Flexible",
                                type: "M",
                                quantity: 30,
                                aspects: "",
                                material: "Cotton"
                            },
                            {
                                component: "Frame",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 20,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "hammock":
            return {
                name: "Hammock",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 3,
                    desc: `This blanket or net is attached to strong ropes, allowing you to hang it from a heavy branch or two trees and sleep above the ground.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Fabric",
                            rule: "Flexible",
                            type: "M",
                            quantity: 25,
                            aspects: "",
                            material: "Cotton"
                        }]
                    }
            };
        case "small tent":
            return {
                name: "Small Tent",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 20,
                    desc: `A small tent holds one Medium creature and takes 20 minutes to assemble.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Fabric",
                                rule: "Flexible",
                                type: "M",
                                quantity: 40,
                                aspects: "",
                                material: "Cotton"
                            },
                            {
                                component: "Frame",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 10,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "medium tent":
            return {
                name: "Medium Tent",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 30,
                    desc: `A medium tent holds two creatures and takes 30 minutes to assemble.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Fabric",
                                rule: "Flexible",
                                type: "M",
                                quantity: 60,
                                aspects: "",
                                material: "Cotton"
                            },
                            {
                                component: "Frame",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 10,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "large tent":
            return {
                name: "Large Tent",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 40,
                    desc: `A large tent holds four creatures and takes 45 minutes to assemble.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Fabric",
                                rule: "Flexible",
                                type: "M",
                                quantity: 100,
                                aspects: "",
                                material: "Cotton"
                            },
                            {
                                component: "Frame",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 20,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "pavillion tent":
            return {
                name: "Pavillion Tent",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 50,
                    desc: `A huge open-air canopy, plus stakes, poles, and ropes. A pavilion holds 10 creatures and takes 90 minutes to assemble. Pavilion tents are large enough to accommodate a small fire in the center.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Fabric",
                                rule: "Flexible",
                                type: "M",
                                quantity: 200,
                                aspects: "",
                                material: "Cotton"
                            },
                            {
                                component: "Frame",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 40,
                                aspects: "",
                                material: "Maple"
                            }
                        ]
                    }
            };
        case "compass":
            return {
                name: "Compass",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 0.5,
                    desc: `An ordinary compass that points to the magnetic north pole grants you a +2 bonus on Navigate checks.`,
                    blueprints: {
                        count: 1,
                        components: [{
                                component: "Frame",
                                rule: "Sturdy",
                                type: "M",
                                quantity: 1,
                                aspects: "",
                                material: "Iron"
                            },
                            {
                                component: "Magnet",
                                rule: "",
                                type: "I",
                                quantity: 1,
                                aspects: "",
                                material: "Magnet"
                            },
                            {
                                component: "Engineering",
                                rule: "",
                                type: "E",
                                quantity: 100,
                                aspects: "",
                                material: ""
                            }
                        ]
                    }
            };
        case "horn, signal":
            return {
                name: "Horn, Signal",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 0.5,
                    desc: `Sounding a horn requires a DC 10 Perform (wind instruments) check and can convey concepts such as “Attack!”, “Help!”, “Advance!”, “Retreat!”, “Fire!”, and, “Alarm!” The report of a signal horn can be clearly heard up to a half-mile distant.`,
                    blueprints: {
                        count: 1,
                        components: [{
                            component: "Frame",
                            rule: "Sturdy",
                            type: "M",
                            quantity: 2,
                            aspects: "",
                            material: "Maple"
                        }]
                    }
            };
        case "mirror, steel":
            return {
                name: "Mirror, Steel",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 0.5,
                    desc: `A small steel mirror.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "rope, hempen (50 ft)":
            return {
                name: "Rope, Hempen (50 ft)",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 10,
                    desc: `See the Rope Tricks skill for different uses of rope`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "rope, silk (50 ft)":
            return {
                name: "Rope, Silk (50 ft)",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 5,
                    desc: `See the Rope Tricks skill for different uses of rope`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "string and twine":
            return {
                name: "String and Twine",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 0.5,
                    desc: `Sold in balls or spools of 50 feet, string and twine are useful for rigging traps and alarms and are a vital component of grappling bolts and arrows.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "whetstone":
            return {
                name: "Whetstone",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 1,
                    desc: `A whetstone allows you to sharpen a blade by sliding it against the stone at a precise angle. `,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "candle":
            return {
                name: "Candle",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 0.01,
                    desc: `A candle dimly illuminates a small area, increasing the light level in a 5-foot radius by one step. A candle burns for 1 hour.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "lanturn":
            return {
                name: "Lanturn",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 1,
                    desc: `A common lanturn illuminates a small area, providing normal light in a 30-foot radius and increasing the light level by one step for an additional 30 feet beyond that area. A lanturn burns for 6 hours on 1 pint of oil. You can carry a lanturn in one hand.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "oil, lanturn":
            return {
                name: "Oil, Lanturn",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 1,
                    desc: `Lanturn oil for lanturns.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "torch":
            return {
                name: "Torch",
                    type: "Adventuring Gear",
                    cost: 0,
                    weight: 1,
                    desc: `A torch burns for 1 hour, shedding normal light in a 20-foot radius and increasing the light level by one step for an additional 20 feet beyond that area`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, aristocrat’s":
            return {
                name: "Outfit, Aristocrat’s",
                    type: "Clothing",
                    cost: 7500,
                    weight: 10,
                    desc: `These clothes are designed0ecifically to be expensive and gaudy. Precious metals and gems are worked into the clothing.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, artisan’s":
            return {
                name: "Outfit, Artisan’s",
                    type: "Clothing",
                    cost: 100,
                    weight: 4,
                    desc: `This outfit includes a shirt with buttons, a skirt or pants with a drawstring, shoes, and perhaps a cap or hat. It may also include a belt or a leather or cloth apron for carrying tools.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, burglar’s":
            return {
                name: "Outfit, Burglar’s",
                    type: "Clothing",
                    cost: 500,
                    weight: 5,
                    desc: `This outfit consists of fitted pants, a shirt, a hooded reversible cloak, soft leather boots, and a face mask, all in dark or neutral colors. The outfit’s few buttons and rivets are wrapped in dull, dark cloth to avoid jingling or reflecting light. A number of loops and shallow pockets are also worked into the outfit, providing ample0aces for stashing small tools or weapons.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, cold-weather":
            return {
                name: "Outfit, Cold-Weather",
                    type: "Clothing",
                    cost: 800,
                    weight: 7,
                    desc: `This vestment works just like a cold-weather outfit, granting advantage on Constitution saving throws against exposure to cold weather.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, courtesan’s":
            return {
                name: "Outfit, Courtesan’s",
                    type: "Clothing",
                    cost: 800,
                    weight: 4,
                    desc: `This outfit includes fine silk or satin garments tailored to complement your figure. In addition, the outfit contains a loose shawl or robe with several discreet pockets for items such as perfume, massage oils, or even a small dagger.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, courtier’s":
            return {
                name: "Outfit, Courtier’s",
                    type: "Clothing",
                    cost: 3000,
                    weight: 6,
                    desc: `This outfit includes fancy, tailored clothes in whatever fashion happens to be the current style in the courts of the nobles. Anyone trying to influence nobles or courtiers while wearing street dress will have a hard time of it (–2 penalty on Charisma-based skill checks to influence such individuals).`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, entertainer’s":
            return {
                name: "Outfit, Entertainer’s",
                    type: "Clothing",
                    cost: 300,
                    weight: 4,
                    desc: `This set of flashy—perhaps even gaudy—clothes is for entertaining. While the outfit looks whimsical, its practical design lets you tumble, dance, walk a tightrope, or just run (if the audience turns ugly).`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, explorer’s":
            return {
                name: "Outfit, Explorer’s",
                    type: "Clothing",
                    cost: 1000,
                    weight: 8,
                    desc: `This set of clothes is for someone who never knows what to expect. It includes sturdy boots, leather breeches or a skirt, a belt, a shirt (perhaps with a vest or jacket), gloves, and a cloak. Rather than a leather skirt, a leather overtunic may be worn over a cloth skirt. The clothes have plenty of pockets (especially the cloak). The outfit also includes any extra accessories you might need, such as a scarf or a wide-brimmed hat.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, hot weather":
            return {
                name: "Outfit, Hot Weather",
                    type: "Clothing",
                    cost: 800,
                    weight: 4,
                    desc: `Covering your body from head to foot in light, airy cloth keeps you cooler than baring your skin to the sun. This outfit typically consists of a loose linen robe and either a turban or loose head covering and veil. The outfit provides advantage on Constitution saving throws to resist warm or hot weather.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, monk’s":
            return {
                name: "Outfit, Monk’s",
                    type: "Clothing",
                    cost: 500,
                    weight: 2,
                    desc: `This simple outfit includes sandals, loose breeches, and a loose shirt, and is bound together with sashes. The outfit is designed to give you maximum mobility, and it’s made of high-quality fabric. You can conceal small weapons in pockets hidden in the folds, and the sashes are strong enough to serve as short ropes.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, pauper’s":
            return {
                name: "Outfit, Pauper’s",
                    type: "Clothing",
                    cost: 10,
                    weight: 2,
                    desc: `This set of clothes consists of a loose shirt and baggy breeches, or a loose shirt and skirt or overdress.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, pickpocket’s":
            return {
                name: "Outfit, Pickpocket’s",
                    type: "Clothing",
                    cost: 500,
                    weight: 3,
                    desc: `Outfitted with concealed pockets, this clothing gives you a +2 bonus on Sleight of Hand (Conceal) checks.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, scholar’s":
            return {
                name: "Outfit, Scholar’s",
                    type: "Clothing",
                    cost: 500,
                    weight: 6,
                    desc: `Perfect for a scholar, this outfit includes a robe, a belt, a cap, soft shoes, and possibly a cloak.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "outfit, traveler’s":
            return {
                name: "Outfit, Traveler’s",
                    type: "Clothing",
                    cost: 100,
                    weight: 5,
                    desc: `This set of clothes consists of boots, a wool skirt or breeches, a sturdy belt, a shirt (perhaps with a vest or jacket), and an ample cloak with a hood.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "backpack, common":
            return {
                name: "Backpack, common",
                    type: "Container",
                    cost: 200,
                    weight: 2,
                    desc: `This cloth knapsack has one large pocket that closes with a buckled strap and holds about 2 cubic feet of material. Some may have one or more smaller pockets on the sides.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "bag, waterproof":
            return {
                name: "Bag, waterproof",
                    type: "Container",
                    cost: 50,
                    weight: 0.5,
                    desc: `This leather sack sealed with tar or pitch keeps delicate items from being ruined by water. Items kept inside remain relatively dry, making the bag ideal for carrying maps, scrolls, spellbooks, and the like, although the bag is not impervious and can only be completely immersed for 10 rounds before enough water seeps in to ruin such items.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "pouch, belt":
            return {
                name: "Pouch, belt",
                    type: "Container",
                    cost: 100,
                    weight: 0.5,
                    desc: `A belt pouch is crafted of soft cloth or leather.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "pouch, waist":
            return {
                name: "Pouch, waist",
                    type: "Container",
                    cost: 50,
                    weight: 0.5,
                    desc: `This leather pack is supported by two straps that can be loosened or tightened to fit most body types. It can be adjusted to any facing along its wearer’s waist. The pack can store up to 1/2 cubic foot of material.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "sack":
            return {
                name: "Sack",
                    type: "Container",
                    cost: 10,
                    weight: 0.5,
                    desc: `A sack is a cloth bag that weighs 1/2 lb. empty and holds 1 cubic ft. or 60 lbs. of contents full.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "barrel":
            return {
                name: "Barrel",
                    type: "Container",
                    cost: 200,
                    weight: 30,
                    desc: `A common barrel is constructed of wood with metal ring reinforcements and holds 10 cubic ft. or 650 lb. of materials. A barrel filled with liquid holds about 75 gallons.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "basket":
            return {
                name: "Basket",
                    type: "Container",
                    cost: 40,
                    weight: 1,
                    desc: `This large basket has a lid and holds about 2 cubic feet.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "box, scroll":
            return {
                name: "Box, scroll",
                    type: "Container",
                    cost: 500,
                    weight: 1,
                    desc: `This wooden box easily holds 10 scrolls and has small clips or bookmarks for easier indexing. Retrieving a scroll from a held scroll box is a move action.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "bucket":
            return {
                name: "Bucket",
                    type: "Container",
                    cost: 50,
                    weight: 2,
                    desc: `A simple bucket holds 1 cubic ft. or up to 65 lb. of liquid or material and when full. A bucket filled with liquid holds about 7 gallons.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "case, dust":
            return {
                name: "Case, dust",
                    type: "Container",
                    cost: 500,
                    weight: 1,
                    desc: `This wooden box is large enough to contain one mote of dust of any material. It is sealed with a cork.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "case, scroll":
            return {
                name: "Case, scroll",
                    type: "Container",
                    cost: 100,
                    weight: 0.5,
                    desc: `A leather or wooden scroll case easily holds four scrolls.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "chest, small":
            return {
                name: "Chest, Small",
                    type: "Container",
                    cost: 200,
                    weight: 25,
                    desc: `A common, wooden chest.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "chest, medium":
            return {
                name: "Chest, Medium",
                    type: "Container",
                    cost: 500,
                    weight: 50,
                    desc: `A common, wooden chest.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "chest, large":
            return {
                name: "Chest, Large",
                    type: "Container",
                    cost: 1000,
                    weight: 100,
                    desc: `A common, wooden chest.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "cooler":
            return {
                name: "Cooler",
                    type: "Container",
                    cost: 2500,
                    weight: 60,
                    desc: `This chest can contain up to 4 cubic feet of goods, and it has a lining of insulating material between two sheets of wood. As long as the chest is partially filled with a cold substance—such as cold water or ice—items stored within decompose at half their regular rate. Ice melts on a consistent basis (typically four to six times in a 24-hour period) and must be regularly replenished to maintain the effectiveness of this chest.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "coffin, common":
            return {
                name: "Coffin, common",
                    type: "Container",
                    cost: 1000,
                    weight: 30,
                    desc: `A plain coffin is made of simple wood and has a loose, flat lid that can be nailed onto it.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "coffin, ornate":
            return {
                name: "Coffin, ornate",
                    type: "Container",
                    cost: 10000,
                    weight: 50,
                    desc: `Ornate coffins are favored by aristocratic families for displaying their dead, and include upholstered cloth liners and a hinged lid.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "pot, iron":
            return {
                name: "Pot, iron",
                    type: "Container",
                    cost: 80,
                    weight: 4,
                    desc: `Pots come in a variety of materials, but the most common is formed of iron.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "bottle":
            return {
                name: "Bottle",
                    type: "Container",
                    cost: 200,
                    weight: 1,
                    desc: `This glass bottle holds about a pint and includes a cork.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "canteen":
            return {
                name: "Canteen",
                    type: "Container",
                    cost: 100,
                    weight: 4,
                    desc: `This hollow container is made of wood, a gourd, or metal, and carries liquid.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "cauldron":
            return {
                name: "Cauldron",
                    type: "Container",
                    cost: 100,
                    weight: 5,
                    desc: `This larger version of an iron pot holds approximately 1 gallon—enough to fill the bellies of four hungry humans for one meal.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "coffee pot":
            return {
                name: "Coffee pot",
                    type: "Container",
                    cost: 300,
                    weight: 4,
                    desc: `This tall, teapot-like device contains a small chamber for coffee grounds and a large chamber for water, connected by a small tube. Heating the pot forces boiling water through the tube and into the grounds. A glass knob at the top of the tube allows you to see the color of the brew and stop when it is sufficiently strong. It can brew up to 4 cups of coffee at a time. It can also be used to make tea, steep medicinal herbs, or just boil water.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "flask":
            return {
                name: "Flask",
                    type: "Container",
                    cost: 3,
                    weight: 0.5,
                    desc: `A flask holds 1 pint of liquid and weighs 1 lb. when full.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "jug":
            return {
                name: "Jug",
                    type: "Container",
                    cost: 3,
                    weight: 9,
                    desc: `This basic jug is fitted with a stopper and holds 1 gallon of liquid.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "pitcher":
            return {
                name: "Pitcher",
                    type: "Container",
                    cost: 2,
                    weight: 5,
                    desc: `A clay pitcher.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "vial":
            return {
                name: "Vial",
                    type: "Container",
                    cost: 100,
                    weight: 0.1,
                    desc: `A vial is made out of glass or steel and holds 1 ounce of liquid.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "canvas (1 sq. yd)":
            return {
                name: "Canvas (1 sq. yd)",
                    type: "Writing",
                    cost: 10,
                    weight: 1,
                    desc: `This square yard of heavy cloth is suitable for painting, for covering items in a rainstorm, for creating a sail, or as an improvised bag. It is not waterproof but can be treated with oil, wax, or resin to make it water-resistant.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "chalk (1 piece)":
            return {
                name: "Chalk (1 piece)",
                    type: "Writing",
                    cost: 1,
                    weight: 0.01,
                    desc: `This fat piece of white chalk easily marks wood, metal, or stone. You can write with it for about 24 hours before it is expended. Chalk also comes in other colors, but these are rarer and can be more expensive.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "charcoal (1 stick)":
            return {
                name: "Charcoal (1 stick)",
                    type: "Writing",
                    cost: 50,
                    weight: 0.01,
                    desc: `Sticks of charcoal are useful for marking floors and walls, writing on paper or parchment, and making rubbings of engravings or other markings. In a pinch, they can even be burned to stay warm. A good quality rubbing generally takes 1 minute per sheet of paper.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "ink":
            return {
                name: "Ink",
                    type: "Writing",
                    cost: 800,
                    weight: 0.01,
                    desc: `This vial contains 1 ounce of ink. Ink in colors other than black costs twice as much.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "ink, ghost":
            return {
                name: "Ink, ghost",
                    type: "Writing",
                    cost: 2500,
                    weight: 0.01,
                    desc: `Pale blue when wet, ghost ink quickly dries to near transparency 1 minute after application. Ghost ink is most often used to blaze trails and mark locations in a subtle manner. The pigment shines with a warm red glow under the light shed by the Dancing Lights0ell, but under optimal normal conditions (such as a pale surface like parchment or a plaster wall) can only be noticed with a successful DC 25 Perception check. One vial of ghost ink is the size of a potion vial and sufficient for writing a page’s worth of characters.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "ink, glowing (vial)":
            return {
                name: "Ink, glowing (vial)",
                    type: "Writing",
                    cost: 500,
                    weight: 0.01,
                    desc: `Glowing ink emits a faint but steady light (typically red or green) that allows you to read it even in normal darkness. You have a +2 bonus on Perception checks to locate objects with glowing ink. Mixing glowing ink with marker dye makes the dye glow in the dark until it fades.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "ink, invisible (simple)":
            return {
                name: "Ink, invisible (simple)",
                    type: "Writing",
                    cost: 200,
                    weight: 0.01,
                    desc: `This ink only becomes visible when applied with a single, fairly common trigger, such as heat or vinegar. A successful DC 20 Alchemy (Balm) check can reveal the message without the proper trigger.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "ink, invisible (average)":
            return {
                name: "Ink, invisible (average)",
                    type: "Writing",
                    cost: 1000,
                    weight: 0.01,
                    desc: `This ink only becomes visible when applied with either two common triggers or one uncommon trigger, such as blood or acid. A successful DC 25 Alchemy (Balm) check can reveal the message without the proper trigger.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "ink, invisible (good)":
            return {
                name: "Ink, invisible (good)",
                    type: "Writing",
                    cost: 2500,
                    weight: 0.01,
                    desc: `This ink only becomes visible when applied with either two uncommon triggers or one rare trigger, such as a0ecific vintage of wine or a0ecific kind of monster’s blood. A successful DC 30 Alchemy (Balm) check can reveal the message without the proper trigger.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "ink, invisible (superior)":
            return {
                name: "Ink, invisible (superior)",
                    type: "Writing",
                    cost: 7500,
                    weight: 0.01,
                    desc: `This ink only becomes visible when applied witheither two rare triggers or one unique trigger, such as the blood of a0ecific person. A successful DC 35 Alchemy (Balm) check can reveal the message without the proper trigger.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "inkpen":
            return {
                name: "Inkpen",
                    type: "Writing",
                    cost: 10,
                    weight: 0.01,
                    desc: `This is a wooden stylus with a metal tip that retains a small amount of ink after you dip it in a vial of ink.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "paper (1 sheet)":
            return {
                name: "Paper (1 sheet)",
                    type: "Writing",
                    cost: 1,
                    weight: 0.01,
                    desc: `A sheet of ordinary paper typically measures 9 inches by 6 inches and is unsuitable for making magical scrolls. It has hardness 0, 1 hit point, and a break DC of 5.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "chain (10 ft.)":
            return {
                name: "Chain (10 ft.)",
                    type: "Bindings",
                    cost: 3000,
                    weight: 2,
                    desc: `This is a 10 ft. length of standard iron chain.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "chains, breakaway":
            return {
                name: "Chains, breakaway",
                    type: "Bindings",
                    cost: 6500,
                    weight: 2,
                    desc: `These chains are easy to break, even though they look like normal chains (Perception (Look) DC 25 to notice the difference).`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "magic restraints":
            return {
                name: "Magic Restraints",
                    type: "Bindings",
                    cost: 1000,
                    weight: 5,
                    desc: `These steel chain bindings wrap around the chest, arms, and legs. These chains are linked to metal bindings meant to clamp around the arms and legs that contain sealing stone. When worn properly, the sealing stone prevents the usage of ki on the wearer, preventing them from casting spells while retaining full body movement. Most magic restraints have locks that seal the chain on the back; add the cost of the lock you want to the cost of the restraints.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "manacles, steel":
            return {
                name: "Manacles, steel",
                    type: "Bindings",
                    cost: 1500,
                    weight: 2,
                    desc: `Manacles can bind a Medium creature. A manacled creature can beat a DC 30 Acrobatics check to slip free. Most manacles have locks; add the cost of the lock you want to the cost of the manacles.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "manacles, false":
            return {
                name: "Manacles, false",
                    type: "Bindings",
                    cost: 6500,
                    weight: 2,
                    desc: `These manacles are nearly indistinguishable from standard manacles upon inspection (Perception DC 25). A wearer who knows the location of the secret catch can open them as an action; otherwise they act like standard manacles.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "locks":
            return {
                name: "Locks",
                    type: "Bindings",
                    cost: 0,
                    weight: 0,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "lock, simple":
            return {
                name: "Lock, simple",
                    type: "Bindings",
                    cost: 2000,
                    weight: 1,
                    desc: `This lock requires a DC 15 Disable Device (Open Lock) check.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "lock, average":
            return {
                name: "Lock, average",
                    type: "Bindings",
                    cost: 4000,
                    weight: 1,
                    desc: `This lock requires a DC 25 Disable Device (Open Lock) check.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "lock, good":
            return {
                name: "Lock, good",
                    type: "Bindings",
                    cost: 8000,
                    weight: 1,
                    desc: `This lock requires a DC 30 Disable Device (Open Lock) check.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "lock, superior":
            return {
                name: "Lock, superior",
                    type: "Bindings",
                    cost: 15000,
                    weight: 1,
                    desc: `This lock requires a DC 40 Disable Device (Open Lock) check.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "alchemist's supplies":
            return {
                name: "Alchemist's supplies",
                    type: "Tools",
                    cost: 500,
                    weight: 8,
                    desc: `This kit contains small vials, common reageants, tongs, and other tools used to perform an alchemist's duties.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "brewer's supplies":
            return {
                name: "Brewer's supplies",
                    type: "Tools",
                    cost: 750,
                    weight: 9,
                    desc: `Brewer's supplies include a large glass jug, a quantity of hops, a siphon, a grinder, and several feet of tubing.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "calligrapher's supplies":
            return {
                name: "Calligrapher's supplies",
                    type: "Tools",
                    cost: 300,
                    weight: 5,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "carpenter's tools":
            return {
                name: "Carpenter's tools",
                    type: "Tools",
                    cost: 250,
                    weight: 6,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "cook's utensils":
            return {
                name: "Cook's utensils",
                    type: "Tools",
                    cost: 100,
                    weight: 8,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "engineering's tools":
            return {
                name: "Engineering's tools",
                    type: "Tools",
                    cost: 1800,
                    weight: 2,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "forgery kit":
            return {
                name: "Forgery kit",
                    type: "Tools",
                    cost: 600,
                    weight: 5,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "glassblower's tools":
            return {
                name: "Glassblower's tools",
                    type: "Tools",
                    cost: 1000,
                    weight: 5,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "icecarver's tools":
            return {
                name: "Icecarver's tools",
                    type: "Tools",
                    cost: 500,
                    weight: 5,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "jeweler's tools":
            return {
                name: "Jeweler's tools",
                    type: "Tools",
                    cost: 1200,
                    weight: 2,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "leatherworker's tools":
            return {
                name: "Leatherworker's tools",
                    type: "Tools",
                    cost: 500,
                    weight: 5,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "mason's tools":
            return {
                name: "Mason's tools",
                    type: "Tools",
                    cost: 600,
                    weight: 8,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "painter's supplies":
            return {
                name: "Painter's supplies",
                    type: "Tools",
                    cost: 300,
                    weight: 5,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "potter's tools":
            return {
                name: "Potter's tools",
                    type: "Tools",
                    cost: 300,
                    weight: 3,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "sculptor's tools":
            return {
                name: "Sculptor's tools",
                    type: "Tools",
                    cost: 500,
                    weight: 3,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "skinning tools":
            return {
                name: "Skinning tools",
                    type: "Tools",
                    cost: 100,
                    weight: 2,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "smith's tools":
            return {
                name: "Smith's tools",
                    type: "Tools",
                    cost: 800,
                    weight: 8,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "tinker's tools":
            return {
                name: "Tinker's tools",
                    type: "Tools",
                    cost: 1500,
                    weight: 10,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "weaver's tools":
            return {
                name: "Weaver's tools",
                    type: "Tools",
                    cost: 100,
                    weight: 5,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "woodcarver's tools":
            return {
                name: "Woodcarver's tools",
                    type: "Tools",
                    cost: 100,
                    weight: 5,
                    desc: ``,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "abacus":
            return {
                name: "Abacus",
                    type: "Tools",
                    cost: 200,
                    weight: 2,
                    desc: `This device helps you perform mathematical calculations.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "arrow, grappling":
            return {
                name: "Arrow, grappling",
                    type: "Tools",
                    cost: 100,
                    weight: 0.5,
                    desc: `This small grappling hook is designed to be tied to a silk rope and fired from a bow. When fired, it has a range increment of 30 feet.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "block and tackle":
            return {
                name: "Block and tackle",
                    type: "Tools",
                    cost: 500,
                    weight: 5,
                    desc: `Whether it is used to hoist treasure from a pit or move supplies, a simple block-and-tackle pulley, when it is properly secured, grants advantage on Strength checks to lift heavy objects. Securing the pulley requires 1 minute.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "buoy":
            return {
                name: "Buoy",
                    type: "Tools",
                    cost: 50,
                    weight: 16,
                    desc: `A buoy is used to mark a specific spot in a lake, river, or similar body of water, making it possible for you to return to that location at a later date.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "crowbar":
            return {
                name: "Crowbar",
                    type: "Tools",
                    cost: 200,
                    weight: 5,
                    desc: `This versatile tool is designed to help pry open whatever the user desires. A crowbar grants a +2 bonus on Strength checks made to force open a hinge like on a door or chest.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "earplugs":
            return {
                name: "Earplugs",
                    type: "Tools",
                    cost: 3,
                    weight: 0.1,
                    desc: `Made of waxed cotton or cork, earplugs give you a +2 bonus on saves against effects that require hearing, but also cause disadvantage on Perception (Hear) checks.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "flint and steel":
            return {
                name: "Flint and steel",
                    type: "Tools",
                    cost: 100,
                    weight: 0.1,
                    desc: `Lighting a torch with a flint and steel is an action. Lighting any other fire with them takes at least that long.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "hook, grappling":
            return {
                name: "Hook, grappling",
                    type: "Tools",
                    cost: 100,
                    weight: 4,
                    desc: `Throwing a grappling hook requires a ranged attack roll, treating the hook as a thrown weapon with a range increment of 10 feet. Objects with ample places to catch the hook have an AC of 5.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "ladder":
            return {
                name: "Ladder",
                    type: "Tools",
                    cost: 20,
                    weight: 20,
                    desc: `Ladders can be climbed. Most ladders are 40 feet tall.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "ladder, folding":
            return {
                name: "Ladder, folding",
                    type: "Tools",
                    cost: 200,
                    weight: 16,
                    desc: `Ladders can be climbed. Folding ladders are 30 feet tall.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "parasol":
            return {
                name: "Parasol",
                    type: "Tools",
                    cost: 100,
                    weight: 2,
                    desc: `This folding umbrella is translucent and not waterproof. It cuts down on the heat from direct sunlight.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "pole":
            return {
                name: "Pole",
                    type: "Tools",
                    cost: 5,
                    weight: 8,
                    desc: `This flexible pole can be anywhere from 15 to 30 feet in length.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "scale, merchant’s":
            return {
                name: "Scale, merchant’s",
                    type: "Tools",
                    cost: 200,
                    weight: 1,
                    desc: `A merchant’s scale is a simple lever on a fulcrum, from which two trays hang. It grants a +2 bonus on Investigate (Appraise) checks involving items that are valued by weight, including anything made of precious metals.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "shovel":
            return {
                name: "Shovel",
                    type: "Tools",
                    cost: 200,
                    weight: 8,
                    desc: `Diggy Diggy Dig Dig`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "sledge":
            return {
                name: "Sledge",
                    type: "Tools",
                    cost: 100,
                    weight: 10,
                    desc: `A powerful hammer`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "spyglass":
            return {
                name: "Spyglass",
                    type: "Tools",
                    cost: 100000,
                    weight: 1,
                    desc: `Objects viewed through a spyglass are magnified to twice their size.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "stretcher":
            return {
                name: "Stretcher",
                    type: "Tools",
                    cost: 100,
                    weight: 10,
                    desc: `A stretcher allows two people to share the burden of carrying one heavy object. You can also use it to drag a load you couldn’t carry on your own. A stretcher holds up to 300 pounds.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
        case "umbrella":
            return {
                name: "Umbrella",
                    type: "Tools",
                    cost: 200,
                    weight: 3,
                    desc: `An umbrella is a heavier, waterproof parasol made of oiled or waxed cloth. It is intended to keep you dry in the rain or snow, but can still protect against sunlight just like a standard parasol.`,
                    blueprints: {
                        count: 1,
                        components: []
                    }
            };
    }
    return {
        name: "",
    };
}

function GetItemGoodsInfo(item) {
    switch (item.toLowerCase()) {
        case "":
            return {
                name: ""
            };
        case "stimulant":
            return {
                name: "Stimulant",
                    type: "Supplement",
                    subtype: "Stimulant",
                    environment: "Common",
                    cost: 5,
                    weight: 0.05,
                    desc: `A variety of common spices used to enhance the properties of ingredients.`
            };
        case "acid":
            return {
                name: "Acid",
                    type: "Common",
                    subtype: "Acid",
                    environment: "Common",
                    cost: 15,
                    weight: 0.1,
                    desc: `A common acid.`
            };
        case "soap":
            return {
                name: "Soap",
                    type: "Common",
                    subtype: "Common",
                    environment: "Common",
                    cost: 15,
                    weight: 0.05,
                    desc: `You can use this thick block of soap to scrub clothes, pots, linens, or anything else that might be dirty. `
            };
        case "earthen gelatin":
            return {
                name: "Earthen Gelatin",
                    type: "Common",
                    subtype: "Gelatin",
                    environment: "Any",
                    cost: 30,
                    weight: 0.05,
                    desc: `Created from saurian bones, this protein is squishy with an earthen and crumbly texture.`
            };
        case "gelatin":
            return {
                name: "Gelatin",
                    type: "Common",
                    subtype: "Gelatin",
                    environment: "Any",
                    cost: 5,
                    weight: 0.05,
                    desc: `Created from mammalian bones, this protein is squishy and has a neutral flavor.`
            };
        case "magnet":
            return {
                name: "Magnet",
                    type: "Common",
                    subtype: "Mineral",
                    environment: "Any",
                    cost: 8,
                    weight: 0.05,
                    desc: `This mineral is very attractive.`
            };
        case "honey apple":
            return {
                name: "Honey Apple",
                    type: "Fruit",
                    subtype: "Apple",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.1,
                    desc: `A tart and sour fruit found near coastal regions.`
            };
        case "astragalus":
            return {
                name: "Astragalus",
                    type: "Supplement",
                    subtype: "Astragalus",
                    environment: "Coastal",
                    cost: 3,
                    weight: 0.1,
                    desc: `A powerful coastal herb used to boost immuno-response and reduce fatigue.`
            };
        case "green beans":
            return {
                name: "Green Beans",
                    type: "Vegetable",
                    subtype: "Beans",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.1,
                    desc: `Green beans that have grown in areas of high water intake.`
            };
        case "sea cabbage":
            return {
                name: "Sea Cabbage",
                    type: "Vegetable",
                    subtype: "Cabbage",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.1,
                    desc: `A leafy green vegetable used often in seaside cuisine.`
            };
        case "short carrot":
            return {
                name: "Short Carrot",
                    type: "Vegetable",
                    subtype: "Carrot",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.1,
                    desc: `A short orange root vegetable sweet to the taste.`
            };
        case "thin cucumber":
            return {
                name: "Thin Cucumber",
                    type: "Vegetable",
                    subtype: "Cucumber",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.3,
                    desc: `A thin, green gourd filled with water.`
            };
        case "doxyl leaf":
            return {
                name: "Doxyl Leaf",
                    type: "Supplement",
                    subtype: "Doxyl Leaf",
                    environment: "Coastal",
                    cost: 14,
                    weight: 0.1,
                    desc: `The leaf of a green shrub on islands. It excretes a substance that has numbing qualities.`
            };
        case "highland lettuce":
            return {
                name: "Highland Lettuce",
                    type: "Vegetable",
                    subtype: "Lettuce",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.1,
                    desc: `A leafy green vegetable known for its crunch.`
            };
        case "maidenhair":
            return {
                name: "Maidenhair",
                    type: "Supplement",
                    subtype: "Maidenhair",
                    environment: "Coastal",
                    cost: 4,
                    weight: 0.1,
                    desc: `A plant leaf taken from the maiden tree commonly seen on the coastline. It is used to treat cognitive disorders, vertigo, and dizziness.`
            };
        case "truffle mushrooms":
            return {
                name: "Truffle Mushrooms",
                    type: "Vegetable",
                    subtype: "Mushrooms",
                    environment: "Coastal",
                    cost: 2,
                    weight: 0.05,
                    desc: `A mushroom that grows in the shade of the maiden tree. It's known for its unique savory flavor.`
            };
        case "black olives":
            return {
                name: "Black Olives",
                    type: "Vegetable",
                    subtype: "Olives",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.02,
                    desc: `A black and salty fruit used often for its oil.`
            };
        case "crisp onion":
            return {
                name: "Crisp Onion",
                    type: "Vegetable",
                    subtype: "Onion",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.1,
                    desc: `A tart layered vegetable often used in Minervan cooking.`
            };
        case "coastal orange":
            return {
                name: "Coastal Orange",
                    type: "Fruit",
                    subtype: "Orange",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.1,
                    desc: `A sour orange fruit found in groves.`
            };
        case "blue popato":
            return {
                name: "Blue Popato",
                    type: "Starch",
                    subtype: "Popato",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.2,
                    desc: `A starchy root plant that fluorishes in high water environments.`
            };
        case "sweet peas":
            return {
                name: "Sweet Peas",
                    type: "Vegetable",
                    subtype: "Peas",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.01,
                    desc: `A long, green leaf containing several small, sweet, green pods.`
            };
        case "tart radish":
            return {
                name: "Tart Radish",
                    type: "Vegetable",
                    subtype: "Radish",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.1,
                    desc: `A purple root vegetable with a slight sweetness.`
            };
        case "sea salt":
            return {
                name: "Sea Salt",
                    type: "Supplement",
                    subtype: "Salt",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.01,
                    desc: `Salt produced by sifting it from the ocean.`
            };
        case "ruby strawberries":
            return {
                name: "Ruby Strawberries",
                    type: "Fruit",
                    subtype: "Strawberries",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.1,
                    desc: `A bright red berry beloved for its light flavor of sour and sweet.`
            };
        case "ruby tomato":
            return {
                name: "Ruby Tomato",
                    type: "Vegetable",
                    subtype: "Tomato",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.1,
                    desc: `A juicy red vegetable grown on a vine.`
            };
        case "coastal wheat":
            return {
                name: "Coastal Wheat",
                    type: "Starch",
                    subtype: "Wheat",
                    environment: "Coastal",
                    cost: 1,
                    weight: 0.05,
                    desc: `A low-water grain common around the world.`
            };
        case "brahmi":
            return {
                name: "Brahmi",
                    type: "Supplement",
                    subtype: "Brahmi",
                    environment: "Cold",
                    cost: 3,
                    weight: 0.3,
                    desc: `A cold-growing plant with properties to reduce infection and enhance memory.`
            };
        case "winter broccoli":
            return {
                name: "Winter Broccoli",
                    type: "Vegetable",
                    subtype: "Broccoli",
                    environment: "Cold",
                    cost: 1,
                    weight: 0.1,
                    desc: `A green plant that has survived in the harshest of cold weather.`
            };
        case "cacaold beans":
            return {
                name: "Cacaold Beans",
                    type: "Supplement",
                    subtype: "Cacaold Beans",
                    environment: "Cold",
                    cost: 10,
                    weight: 0.02,
                    desc: `This cold bean found in colder climates is often grinded to a powder and ingested for its energizing and mood boosting properties.`
            };
        case "long carrot":
            return {
                name: "Long Carrot",
                    type: "Vegetable",
                    subtype: "Carrot",
                    environment: "Cold",
                    cost: 1,
                    weight: 0.1,
                    desc: `A long, light orange root vegetable somewhat sweet and bitter.`
            };
        case "ice grapes":
            return {
                name: "Ice Grapes",
                    type: "Fruit",
                    subtype: "Grapes",
                    environment: "Cold",
                    cost: 40,
                    weight: 0.01,
                    desc: `A slow growing fruit that fluorishes in cold temperatures. Is abnormally cold to the touch. The effect is neutralized when the plant is grown magically. This is priced as if the effect is not neutralized.`
            };
        case "paraherb":
            return {
                name: "Paraherb",
                    type: "Supplement",
                    subtype: "Paraherb",
                    environment: "Cold",
                    cost: 90,
                    weight: 0.01,
                    desc: `A plant that is known to have powerful healing properties. The effect is neutralized when the plant is grown magically. This is priced as if the effect is not neutralized. `
            };
        case "schizandra":
            return {
                name: "Schizandra",
                    type: "Supplement",
                    subtype: "Schizandra",
                    environment: "Cold",
                    cost: 4,
                    weight: 0.01,
                    desc: `A cold growing plant with vibrant red berries. This plant helps speed up recovery of wounds and improves poison recovery.`
            };
        case "blue spinach":
            return {
                name: "Blue Spinach",
                    type: "Vegetable",
                    subtype: "Spinach",
                    environment: "Cold",
                    cost: 1,
                    weight: 0.02,
                    desc: `A leafy blue-green vegetable common in Libran cuisine.`
            };
        case "white popato":
            return {
                name: "White Popato",
                    type: "Starch",
                    subtype: "Popato",
                    environment: "Cold",
                    cost: 1,
                    weight: 0.2,
                    desc: `A starchy root plant that fluorishes in cold environments.`
            };
        case "frost pumpkin":
            return {
                name: "Frost Pumpkin",
                    type: "Vegetable",
                    subtype: "Pumpkin",
                    environment: "Cold",
                    cost: 2,
                    weight: 2,
                    desc: `A large, light orange gourd popular amongst children for its sweetness.`
            };
        case "round turnip":
            return {
                name: "Round Turnip",
                    type: "Vegetable",
                    subtype: "Turnip",
                    environment: "Cold",
                    cost: 1,
                    weight: 0.1,
                    desc: `A small, round, root vegetable common in cold locales.`
            };
        case "blanche wheat":
            return {
                name: "Blanche Wheat",
                    type: "Starch",
                    subtype: "Wheat",
                    environment: "Cold",
                    cost: 1,
                    weight: 0.05,
                    desc: `A low-water grain common around the world.`
            };
        case "aloe":
            return {
                name: "Aloe",
                    type: "Supplement",
                    subtype: "Aloe",
                    environment: "Desert",
                    cost: 2,
                    weight: 0.1,
                    desc: `An oil from a desert plant used to sooth all sorts of pains.`
            };
        case "sweet beans":
            return {
                name: "Sweet Beans",
                    type: "Vegetable",
                    subtype: "Beans",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.1,
                    desc: `Red beans that have grown in arid landscapes.`
            };
        case "white cabbage":
            return {
                name: "White Cabbage",
                    type: "Vegetable",
                    subtype: "Cabbage",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.1,
                    desc: `A leafy light green vegetable used often in desert cuisine.`
            };
        case "spicy carrot":
            return {
                name: "Spicy Carrot",
                    type: "Vegetable",
                    subtype: "Carrot",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.1,
                    desc: `A long, deep orange root vegetable that is oddly spicy.`
            };
        case "chickpeas":
            return {
                name: "Chickpeas",
                    type: "Vegetable",
                    subtype: "Chickpeas",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.1,
                    desc: `A legume that grows best in arid locales.`
            };
        case "giant cucumber":
            return {
                name: "Giant Cucumber",
                    type: "Vegetable",
                    subtype: "Cucumber",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.3,
                    desc: `A huge, green gourd filled with water.`
            };
        case "white garlic":
            return {
                name: "White Garlic",
                    type: "Supplement",
                    subtype: "Garlic",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.01,
                    desc: `A tart cloved vegetable used like a spice in cooking.`
            };
        case "sand ginger":
            return {
                name: "Sand Ginger",
                    type: "Supplement",
                    subtype: "Ginger",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.01,
                    desc: `A root plant used as a natural pain killer and treatment for nausea.`
            };
        case "ginseng":
            return {
                name: "Ginseng",
                    type: "Supplement",
                    subtype: "Ginseng",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.01,
                    desc: `A common desert spice used to enhance cognition and alertness.`
            };
        case "lycium":
            return {
                name: "Lycium",
                    type: "Supplement",
                    subtype: "Lycium",
                    environment: "Desert",
                    cost: 2,
                    weight: 0.03,
                    desc: `This common desert herb is used to help treat vision problems and headaches.`
            };
        case "sand melon":
            return {
                name: "Sand Melon",
                    type: "Fruit",
                    subtype: "Melon",
                    environment: "Desert",
                    cost: 1,
                    weight: 1,
                    desc: `A large green spotted melon filled with water.`
            };
        case "sand onion":
            return {
                name: "Sand Onion",
                    type: "Vegetable",
                    subtype: "Onion",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.1,
                    desc: `A bitter layered vegetable grown in arid climates.`
            };
        case "arid peach":
            return {
                name: "Arid Peach",
                    type: "Fruit",
                    subtype: "Peach",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.1,
                    desc: `A succulent sweet fruit from the desert.`
            };
        case "bleached pear":
            return {
                name: "Bleached Pear",
                    type: "Fruit",
                    subtype: "Pear",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.1,
                    desc: `A white pear common to desert regions.`
            };
        case "scorcher pepper":
            return {
                name: "Scorcher Pepper",
                    type: "Supplement",
                    subtype: "Pepper",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.1,
                    desc: `A spicy red and black pepper known for its sting.`
            };
        case "rhynoseed":
            return {
                name: "Rhynoseed",
                    type: "Supplement",
                    subtype: "Rhynoseed",
                    environment: "Desert",
                    cost: 36,
                    weight: 0.1,
                    desc: `A seed whose extracts can cause psychoactive effects to induce erratic movement.`
            };
        case "flaked salt":
            return {
                name: "Flaked Salt",
                    type: "Supplement",
                    subtype: "Salt",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.01,
                    desc: `Flakey salt produced gathered from crystallized salt in the desert.`
            };
        case "crystal sugarcane":
            return {
                name: "Crystal Sugarcane",
                    type: "Supplement",
                    subtype: "Sugarcane",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.01,
                    desc: `A fragrant grass found in desert regions that is often used to sweeten beverages and meals.`
            };
        case "turmeric":
            return {
                name: "Turmeric",
                    type: "Supplement",
                    subtype: "Turmeric",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.01,
                    desc: `A yellow spice with a bitter flavor.`
            };
        case "sunset wheat":
            return {
                name: "Sunset Wheat",
                    type: "Starch",
                    subtype: "Wheat",
                    environment: "Desert",
                    cost: 1,
                    weight: 0.05,
                    desc: `A low-water grain common around the world.`
            };
        case "yidash":
            return {
                name: "Yidash",
                    type: "Supplement",
                    subtype: "Yidash",
                    environment: "Desert",
                    cost: 80,
                    weight: 0.1,
                    desc: `A plant that is known to incite sudden, involuntary muscle spasms. The effect is neutralized when the plant is grown magically. This is priced as if the effect is not neutralized.`
            };
        case "camellia leaves":
            return {
                name: "Camellia Leaves",
                    type: "Supplement",
                    subtype: "Camellia Leaves",
                    environment: "Grassland",
                    cost: 1,
                    weight: 0.01,
                    desc: `A fragrant plant grown in warmer and fertile climates. It is known to have energy boosting properties.`
            };
        case "caswinnis":
            return {
                name: "Caswinnis",
                    type: "Supplement",
                    subtype: "Caswinnis",
                    environment: "Grassland",
                    cost: 12,
                    weight: 0.05,
                    desc: `A plant with powerful calming traits.`
            };
        case "gypsy caswinnis":
            return {
                name: "Gypsy Caswinnis",
                    type: "Supplement",
                    subtype: "Caswinnis",
                    environment: "Grassland",
                    cost: 24,
                    weight: 0.05,
                    desc: `A plant with very strong calming traits.`
            };
        case "endura":
            return {
                name: "Endura",
                    type: "Supplement",
                    subtype: "Endura",
                    environment: "Grassland",
                    cost: 115,
                    weight: 1,
                    desc: `This plant is a poweerful anesthetic. The effect is neutralized when the plant is grown magically. This is priced as if the effect is not neutralized.`
            };
        case "pearl ginger":
            return {
                name: "Pearl Ginger",
                    type: "Supplement",
                    subtype: "Ginger",
                    environment: "Grassland",
                    cost: 1,
                    weight: 0.01,
                    desc: `A root plant used as a natural pain killer and treatment for nausea.`
            };
        case "highland grapes":
            return {
                name: "Highland Grapes",
                    type: "Fruit",
                    subtype: "Grapes",
                    environment: "Grassland",
                    cost: 1,
                    weight: 0.01,
                    desc: `A red vine growing fruit common in warm climates near Ceres.`
            };
        case "clear grapes":
            return {
                name: "Clear Grapes",
                    type: "Fruit",
                    subtype: "Grapes",
                    environment: "Grassland",
                    cost: 1,
                    weight: 0.01,
                    desc: `A green vine growing fruit common in warm climates near Ceres.`
            };
        case "honey":
            return {
                name: "Honey",
                    type: "Supplement",
                    subtype: "Honey",
                    environment: "Grassland",
                    cost: 3,
                    weight: 0.02,
                    desc: `A sticky sweet substance created by bees.`
            };
        case "lentils":
            return {
                name: "Lentils",
                    type: "Vegetable",
                    subtype: "Lentils",
                    environment: "Grassland",
                    cost: 1,
                    weight: 0.01,
                    desc: `A grain that is known for its filling nature.`
            };
        case "button mushrooms":
            return {
                name: "Button Mushrooms",
                    type: "Vegetable",
                    subtype: "Mushrooms",
                    environment: "Grassland",
                    cost: 1,
                    weight: 0.1,
                    desc: `A white capped fungus with a distinct savory flavor.`
            };
        case "sweet onion":
            return {
                name: "Sweet Onion",
                    type: "Vegetable",
                    subtype: "Onion",
                    environment: "Grassland",
                    cost: 1,
                    weight: 0.1,
                    desc: `A sweet layered vegetable grown in fields.`
            };
        case "tall grain rice":
            return {
                name: "Tall Grain Rice",
                    type: "Starch",
                    subtype: "Rice",
                    environment: "Grassland",
                    cost: 1,
                    weight: 0.01,
                    desc: `A grain grown in abundance that is common to temperate flat lands.`
            };
        case "tart strawberries":
            return {
                name: "Tart Strawberries",
                    type: "Fruit",
                    subtype: "Strawberries",
                    environment: "Grassland",
                    cost: 1,
                    weight: 0.1,
                    desc: `A red berry beloved for its tartness.`
            };
        case "thousandcorn":
            return {
                name: "Thousandcorn",
                    type: "Starch",
                    subtype: "Thousandcorn",
                    environment: "Grassland",
                    cost: 1,
                    weight: 0.1,
                    desc: `A grain common to hilled regions and grassland. A staple to Minervan cuisine.`
            };
        case "lowland wheat":
            return {
                name: "Lowland Wheat",
                    type: "Starch",
                    subtype: "Wheat",
                    environment: "Grassland",
                    cost: 1,
                    weight: 0.05,
                    desc: `A low-water grain common around the world.`
            };
        case "yeast":
            return {
                name: "Yeast",
                    type: "Supplement",
                    subtype: "Yeast",
                    environment: "Grassland",
                    cost: 2,
                    weight: 0.01,
                    desc: `A bacteria common to grasslands important in the creation of breads and beers.`
            };
        case "fine apricots":
            return {
                name: "Fine Apricots",
                    type: "Fruit",
                    subtype: "Apricots",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.1,
                    desc: `A sweet and tart orange fruit common in the mountains.`
            };
        case "barley":
            return {
                name: "Barley",
                    type: "Starch",
                    subtype: "Barley",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.05,
                    desc: `A type of grain common to mountainous regions and often used to make doughs.`
            };
        case "white broccoli":
            return {
                name: "White Broccoli",
                    type: "Vegetable",
                    subtype: "Broccoli",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.1,
                    desc: `A white plant that has survived in the mountains.`
            };
        case "white cabbage":
            return {
                name: "White Cabbage",
                    type: "Vegetable",
                    subtype: "Cabbage",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.1,
                    desc: `A leafy white vegetable often shredded in cuisine.`
            };
        case "coffee beans":
            return {
                name: "Coffee Beans",
                    type: "Supplement",
                    subtype: "Coffee Beans",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.02,
                    desc: `A flavorful bean grown in mountainous regions. It is infused with energy promotional effects.`
            };
        case "earthy ginger":
            return {
                name: "Earthy Ginger",
                    type: "Supplement",
                    subtype: "Ginger",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.01,
                    desc: `A root plant used as a natural pain killer and treatment for nausea.`
            };
        case "joza leaf":
            return {
                name: "Joza Leaf",
                    type: "Supplement",
                    subtype: "Joza Leaf",
                    environment: "Mountain",
                    cost: 20,
                    weight: 0.02,
                    desc: `A stimulating plant that increases focus in those that consume it.`
            };
        case "red lettuce":
            return {
                name: "Red Lettuce",
                    type: "Vegetable",
                    subtype: "Lettuce",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.1,
                    desc: `A leafy redish-green vegetable known for its crunch.`
            };
        case "black mushrooms":
            return {
                name: "Black Mushrooms",
                    type: "Vegetable",
                    subtype: "Mushrooms",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.1,
                    desc: `A black capped fungus with a distinct savory flavor.`
            };
        case "mountain orange":
            return {
                name: "Mountain Orange",
                    type: "Fruit",
                    subtype: "Orange",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.1,
                    desc: `A sour orange fruit found in groves of the mountains.`
            };
        case "vibrant peach":
            return {
                name: "Vibrant Peach",
                    type: "Fruit",
                    subtype: "Peach",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.1,
                    desc: `A sweet and vibrant pink peach common to the mountains near Apollo.`
            };
        case "long peas":
            return {
                name: "Long Peas",
                    type: "Vegetable",
                    subtype: "Peas",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.01,
                    desc: `A long, green leaf containing several small, tart, green pods.`
            };
        case "bleached pepper":
            return {
                name: "Bleached Pepper",
                    type: "Supplement",
                    subtype: "Pepper",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.1,
                    desc: `A spicy white pepper with a medium spice.`
            };
        case "white radish":
            return {
                name: "White Radish",
                    type: "Vegetable",
                    subtype: "Radish",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.1,
                    desc: `A white root vegetable with a slight sweetness.`
            };
        case "rage fruit":
            return {
                name: "Rage Fruit",
                    type: "Supplement",
                    subtype: "Rage Fruit",
                    environment: "Mountain",
                    cost: 155,
                    weight: 1,
                    desc: `A fruit that causes those who eat it to become enraged. The effect is neutralized when the plant is grown magically. This is priced as if the effect is not neutralized.`
            };
        case "short grain rice":
            return {
                name: "Short Grain Rice",
                    type: "Starch",
                    subtype: "Rice",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.01,
                    desc: `A grain grown in abundance that is common to mountainous regions.`
            };
        case "rock salt":
            return {
                name: "Rock Salt",
                    type: "Supplement",
                    subtype: "Salt",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.01,
                    desc: `Salt ground into tiny pieces produced from rocks made of salt.`
            };
        case "shepherd's purse":
            return {
                name: "Shepherd's Purse",
                    type: "Supplement",
                    subtype: "Shepherd's Purse",
                    environment: "Mountain",
                    cost: 3,
                    weight: 0.1,
                    desc: `Taken from mountainous plants, this herb is used to treat wounds and increase blood circulation.`
            };
        case "soybeans":
            return {
                name: "Soybeans",
                    type: "Vegetable",
                    subtype: "Soybeans",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.01,
                    desc: `A legume that excretes a white milk enjoyed around the world.`
            };
        case "green spinach":
            return {
                name: "Green Spinach",
                    type: "Vegetable",
                    subtype: "Spinach",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.02,
                    desc: `A leafy green vegetable common in the mountains.`
            };
        case "syrup sugarcane":
            return {
                name: "Syrup Sugarcane",
                    type: "Supplement",
                    subtype: "Sugarcane",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.01,
                    desc: `A fragrant grass found in mountainous regions that is often used to sweeten beverages and meals.`
            };
        case "sulfur":
            return {
                name: "Sulfur",
                    type: "Explosive",
                    subtype: "Sulfur",
                    environment: "Mountain",
                    cost: 5,
                    weight: 0.01,
                    desc: `A black powder used to create explosions.`
            };
        case "hardy tomato":
            return {
                name: "Hardy Tomato",
                    type: "Vegetable",
                    subtype: "Tomato",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.1,
                    desc: `A strong red vegetable grown on a vine.`
            };
        case "purple turnip":
            return {
                name: "Purple Turnip",
                    type: "Vegetable",
                    subtype: "Turnip",
                    environment: "Mountain",
                    cost: 1,
                    weight: 0.1,
                    desc: `A small, purple root vegetable common in the mountains.`
            };
        case "pineapple":
            return {
                name: "Pineapple",
                    type: "Fruit",
                    subtype: "Pineapple",
                    environment: "Tropical",
                    cost: 1,
                    weight: 1,
                    desc: `A large yellow fruit known for its citrus sour flavor and an island favorite`
            };
        case "victoria lily":
            return {
                name: "Victoria Lily",
                    type: "Supplement",
                    subtype: "Victoria Lily",
                    environment: "Tropical",
                    cost: 2,
                    weight: 0.1,
                    desc: `This water growing plant is common in tropical climates and Juno. It has soothing effects for individuals in emotional distress.`
            };
        case "coconut":
            return {
                name: "Coconut",
                    type: "Fruit",
                    subtype: "Coconut",
                    environment: "Tropical",
                    cost: 1,
                    weight: 1,
                    desc: `A large, round, hard fruit known for its sweet flavor`
            };
        case "caranu meat":
            return {
                name: "Caranu Meat",
                    type: "Caranu",
                    subtype: "Meat",
                    environment: "Any",
                    cost: 35,
                    weight: 1,
                    desc: `This meat is very fatty with a unique sweet flavor.`
            };
        case "caranu bone":
            return {
                name: "Caranu Bone",
                    type: "Caranu",
                    subtype: "Bone",
                    environment: "Any",
                    cost: 10,
                    weight: 2,
                    desc: `A large, fossorian creature bone.`
            };
        case "caranu hide":
            return {
                name: "Caranu Hide",
                    type: "Caranu",
                    subtype: "Hide",
                    environment: "Any",
                    cost: 30,
                    weight: 10,
                    desc: `This hide is thick and covered in fur. When laid flat, one unit will fill a 5 foot square.`
            };
        case "caranu claw":
            return {
                name: "Caranu Claw",
                    type: "Caranu",
                    subtype: "Claw",
                    environment: "Any",
                    cost: 15,
                    weight: 1,
                    desc: `A sharp claw.`
            };
        case "caranu tooth":
            return {
                name: "Caranu Tooth",
                    type: "Caranu",
                    subtype: "Tooth",
                    environment: "Any",
                    cost: 10,
                    weight: 0.1,
                    desc: `A large tooth.`
            };
        case "caranu carapice":
            return {
                name: "Caranu Carapice",
                    type: "Caranu",
                    subtype: "Carapice",
                    environment: "Any",
                    cost: 150,
                    weight: 30,
                    desc: `A perfectly intact hard shell. It's really tough.`
            };
        case "cashmechong meat":
            return {
                name: "Cashmechong Meat",
                    type: "Cashmechong",
                    subtype: "Meat",
                    environment: "Any",
                    cost: 10,
                    weight: 1,
                    desc: `When cooked it has a flaky texture with a mushroom-like flavor.`
            };
        case "cashmechong bone":
            return {
                name: "Cashmechong Bone",
                    type: "Cashmechong",
                    subtype: "Bone",
                    environment: "Any",
                    cost: 3,
                    weight: 1,
                    desc: `A large, fossorian creature bone.`
            };
        case "cashmechong hide":
            return {
                name: "Cashmechong Hide",
                    type: "Cashmechong",
                    subtype: "Hide",
                    environment: "Any",
                    cost: 3,
                    weight: 2,
                    desc: `This hide is light and chitinous. When laid flat, one unit will fill a 2 foot square.`
            };
        case "cesplang meat":
            return {
                name: "Cesplang Meat",
                    type: "Cesplang",
                    subtype: "Meat",
                    environment: "Any",
                    cost: 10,
                    weight: 1,
                    desc: `This meat is usually tough and sinewy with a pungent smell.`
            };
        case "cesplang bone":
            return {
                name: "Cesplang Bone",
                    type: "Cesplang",
                    subtype: "Bone",
                    environment: "Any",
                    cost: 10,
                    weight: 2,
                    desc: `A large, mammalian bone.`
            };
        case "cesplang hide":
            return {
                name: "Cesplang Hide",
                    type: "Cesplang",
                    subtype: "Hide",
                    environment: "Any",
                    cost: 10,
                    weight: 3,
                    desc: `This hide is covered in fur. When laid flat, one unit will fill a 5 foot square.`
            };
        case "cesplang claw":
            return {
                name: "Cesplang Claw",
                    type: "Cesplang",
                    subtype: "Claw",
                    environment: "Any",
                    cost: 15,
                    weight: 1,
                    desc: `A sharp claw.`
            };
        case "cesplang tooth":
            return {
                name: "Cesplang Tooth",
                    type: "Cesplang",
                    subtype: "Tooth",
                    environment: "Any",
                    cost: 10,
                    weight: 0.1,
                    desc: `A large tooth.`
            };
        case "cesplang plume":
            return {
                name: "Cesplang Plume",
                    type: "Cesplang",
                    subtype: "Plume",
                    environment: "Any",
                    cost: 120,
                    weight: 2,
                    desc: `The feathered plume of a Cesplang. It's got some weight to it`
            };
        case "colosshu meat":
            return {
                name: "Colosshu Meat",
                    type: "Colosshu",
                    subtype: "Meat",
                    environment: "Any",
                    cost: 15,
                    weight: 1,
                    desc: `It has a tough texture with a lot of fat. Slightly bitter.`
            };
        case "colosshu bone":
            return {
                name: "Colosshu Bone",
                    type: "Colosshu",
                    subtype: "Bone",
                    environment: "Any",
                    cost: 25,
                    weight: 4,
                    desc: `A large, mammalian bone.`
            };
        case "colosshu hide":
            return {
                name: "Colosshu Hide",
                    type: "Colosshu",
                    subtype: "Hide",
                    environment: "Any",
                    cost: 50,
                    weight: 10,
                    desc: `This hide is very thick with tiny hairs. When laid flat, one unit will fill a 5 foot square.`
            };
        case "dekying meat":
            return {
                name: "Dekying Meat",
                    type: "Dekying",
                    subtype: "Meat",
                    environment: "Any",
                    cost: 30,
                    weight: 1,
                    desc: `This meat is light and fibrous with a lightly sweet flavor.`
            };
        case "dekying bone":
            return {
                name: "Dekying Bone",
                    type: "Dekying",
                    subtype: "Bone",
                    environment: "Any",
                    cost: 3,
                    weight: 1,
                    desc: `A large, avian creature bone.`
            };
        case "dekying hide":
            return {
                name: "Dekying Hide",
                    type: "Dekying",
                    subtype: "Hide",
                    environment: "Any",
                    cost: 5,
                    weight: 2,
                    desc: `This hide is light and covered in feathers. When laid flat, one unit will fill a 2 foot square.`
            };
        case "dekying egg":
            return {
                name: "Dekying Egg",
                    type: "Dekying",
                    subtype: "Egg",
                    environment: "Any",
                    cost: 6,
                    weight: 0.1,
                    desc: `A large, hard-shelled egg. `
            };
        case "geltingwa meat":
            return {
                name: "Geltingwa Meat",
                    type: "Geltingwa",
                    subtype: "Meat",
                    environment: "Any",
                    cost: 30,
                    weight: 1,
                    desc: `It's so squishy.`
            };
        case "geltingwa fluid":
            return {
                name: "Geltingwa Fluid",
                    type: "Geltingwa",
                    subtype: "Fluid",
                    environment: "Any",
                    cost: 3,
                    weight: 1,
                    desc: `The ooze from a geltingwa. It's cool to the touch.`
            };
        case "holjo meat":
            return {
                name: "Holjo Meat",
                    type: "Holjo",
                    subtype: "Meat",
                    environment: "Any",
                    cost: 40,
                    weight: 1,
                    desc: `When prepared properly, this meat is tender and juicy with a bit of an earthy flavor.`
            };
        case "holjo bone":
            return {
                name: "Holjo Bone",
                    type: "Holjo",
                    subtype: "Bone",
                    environment: "Any",
                    cost: 10,
                    weight: 2,
                    desc: `A large, fossorian creature bone.`
            };
        case "holjo hide":
            return {
                name: "Holjo Hide",
                    type: "Holjo",
                    subtype: "Hide",
                    environment: "Any",
                    cost: 10,
                    weight: 3,
                    desc: `This hide is thick and smooth. When laid flat, one unit will fill a 5 foot square.`
            };
        case "hookma meat":
            return {
                name: "Hookma Meat",
                    type: "Hookma",
                    subtype: "Meat",
                    environment: "Any",
                    cost: 15,
                    weight: 1,
                    desc: `A mild-flavored stringy meat that gets really tough when cooked.`
            };
        case "hookma bone":
            return {
                name: "Hookma Bone",
                    type: "Hookma",
                    subtype: "Bone",
                    environment: "Any",
                    cost: 10,
                    weight: 2,
                    desc: `A large, mammalian bone.`
            };
        case "hookma hide":
            return {
                name: "Hookma Hide",
                    type: "Hookma",
                    subtype: "Hide",
                    environment: "Any",
                    cost: 40,
                    weight: 10,
                    desc: `This hide is incredibly tough almost like armor. When laid flat, one unit will fill a 5 foot square.`
            };
        case "plumhou meat":
            return {
                name: "Plumhou Meat",
                    type: "Plumhou",
                    subtype: "Meat",
                    environment: "Any",
                    cost: 20,
                    weight: 1,
                    desc: `This lean meat doesn't taste strongly of much.`
            };
        case "plumhou bone":
            return {
                name: "Plumhou Bone",
                    type: "Plumhou",
                    subtype: "Bone",
                    environment: "Any",
                    cost: 3,
                    weight: 1,
                    desc: `A large, avian creature bone.`
            };
        case "plumhou hide":
            return {
                name: "Plumhou Hide",
                    type: "Plumhou",
                    subtype: "Hide",
                    environment: "Any",
                    cost: 3,
                    weight: 2,
                    desc: `This hide is light and furry. When laid flat, one unit will fill a 2 foot square.`
            };
        case "rackshur meat":
            return {
                name: "Rackshur Meat",
                    type: "Rackshur",
                    subtype: "Meat",
                    environment: "Any",
                    cost: 25,
                    weight: 1,
                    desc: `It's tender and lean with a light-sour flavor.`
            };
        case "rackshur bone":
            return {
                name: "Rackshur Bone",
                    type: "Rackshur",
                    subtype: "Bone",
                    environment: "Any",
                    cost: 10,
                    weight: 2,
                    desc: `A large, mammalian bone.`
            };
        case "rackshur hide":
            return {
                name: "Rackshur Hide",
                    type: "Rackshur",
                    subtype: "Hide",
                    environment: "Any",
                    cost: 10,
                    weight: 3,
                    desc: `This hide is furry and warm. When laid flat, one unit will fill a 5 foot square.`
            };
        case "serpelu meat":
            return {
                name: "Serpelu Meat",
                    type: "Serpelu",
                    subtype: "Meat",
                    environment: "Any",
                    cost: 45,
                    weight: 1,
                    desc: `The meat is soft, white, and flaky with a fishy and sweet taste.`
            };
        case "serpelu bone":
            return {
                name: "Serpelu Bone",
                    type: "Serpelu",
                    subtype: "Bone",
                    environment: "Any",
                    cost: 10,
                    weight: 2,
                    desc: `A large, aquatic creature bone.`
            };
        case "serpelu hide":
            return {
                name: "Serpelu Hide",
                    type: "Serpelu",
                    subtype: "Hide",
                    environment: "Any",
                    cost: 35,
                    weight: 10,
                    desc: `Scaley with a smooth texture. When laid flat, one unit will fill a 5 foot square.`
            };
        case "serpelu egg":
            return {
                name: "Serpelu Egg",
                    type: "Serpelu",
                    subtype: "Egg",
                    environment: "Any",
                    cost: 8,
                    weight: 0.3,
                    desc: `A large, soft-shelled egg. `
            };
        case "stinbian meat":
            return {
                name: "Stinbian Meat",
                    type: "Stinbian",
                    subtype: "Meat",
                    environment: "Any",
                    cost: 1,
                    weight: 1,
                    desc: `Unless prepared very carefully, this meat is poisonous to humans. `
            };
        case "stinbian bone":
            return {
                name: "Stinbian Bone",
                    type: "Stinbian",
                    subtype: "Bone",
                    environment: "Any",
                    cost: 3,
                    weight: 1,
                    desc: `A large, avian creature bone.`
            };
        case "stinbian hide":
            return {
                name: "Stinbian Hide",
                    type: "Stinbian",
                    subtype: "Hide",
                    environment: "Any",
                    cost: 3,
                    weight: 1.5,
                    desc: `This small hide is lightly furred. When laid flat, one unit will fill a 1 foot square.`
            };
        case "char eel":
            return {
                name: "Char Eel",
                    type: "Fish",
                    subtype: "Eel",
                    environment: "Coastal",
                    cost: 5,
                    weight: 1,
                    desc: `A blackened eel commonly found in the ocean. It has a chewy texture when cooked.`
            };
        case "lakebed carp":
            return {
                name: "Lakebed Carp",
                    type: "Fish",
                    subtype: "Carp",
                    environment: "Coastal",
                    cost: 4,
                    weight: 2,
                    desc: `A common freshwater fish with an oily flavor.`
            };
        case "midnight sardine":
            return {
                name: "Midnight Sardine",
                    type: "Fish",
                    subtype: "Sardine",
                    environment: "Coastal",
                    cost: 4,
                    weight: 1,
                    desc: `This saltwater fish is a favorite for anyone that wants to add a bit of salt to their meal.`
            };
        case "minervan tuna":
            return {
                name: "Minervan Tuna",
                    type: "Fish",
                    subtype: "Tuna",
                    environment: "Coastal",
                    cost: 6,
                    weight: 1,
                    desc: `A small saltwater fish that has gained popularity for its neutral flavor.`
            };
        case "pebble shrimp":
            return {
                name: "Pebble Shrimp",
                    type: "Fish",
                    subtype: "Shrimp",
                    environment: "Coastal",
                    cost: 3,
                    weight: 0.1,
                    desc: `A tiny, sweet, and savory crestacean common in seafood disshes.`
            };
        case "pink trout":
            return {
                name: "Pink Trout",
                    type: "Fish",
                    subtype: "Trout",
                    environment: "Coastal",
                    cost: 6,
                    weight: 3,
                    desc: `A common freshwater fish used as a centerpiece of a meal in coastal cuisine.`
            };
        case "rock clam":
            return {
                name: "Rock Clam",
                    type: "Fish",
                    subtype: "Clam",
                    environment: "Coastal",
                    cost: 3,
                    weight: 0.4,
                    desc: `A creature that fits within two shells. It has a salty flavor.`
            };
        case "royal crab":
            return {
                name: "Royal Crab",
                    type: "Fish",
                    subtype: "Crab",
                    environment: "Coastal",
                    cost: 8,
                    weight: 3,
                    desc: `A large crustacean saught for its savory flavor.`
            };
        case "voyager salmon":
            return {
                name: "Voyager Salmon",
                    type: "Fish",
                    subtype: "Salmon",
                    environment: "Coastal",
                    cost: 6,
                    weight: 3,
                    desc: `A common fish that can be found in all sorts of water. Popular for its neutral flavor.`
            };
    }
    return {
        name: "",
    };
}

function GetItemGoodsFromEnvironment(environment) {
    switch (environment.toLowerCase()) {
        case "":
            return {
                name: ""
            };
        case "common":
            return "Stimulant,Acid,Soap";
        case "any":
            return "Earthen Gelatin,Gelatin,Magnet,Caranu Meat,Caranu Bone,Caranu Hide,Caranu Claw,Caranu Tooth,Caranu Carapice,Cashmechong Meat,Cashmechong Bone,Cashmechong Hide,Cesplang Meat,Cesplang Bone,Cesplang Hide,Cesplang Claw,Cesplang Tooth,Cesplang Plume,Colosshu Meat,Colosshu Bone,Colosshu Hide,Dekying Meat,Dekying Bone,Dekying Hide,Dekying Egg,Geltingwa Meat,Geltingwa Fluid,Holjo Meat,Holjo Bone,Holjo Hide,Hookma Meat,Hookma Bone,Hookma Hide,Plumhou Meat,Plumhou Bone,Plumhou Hide,Rackshur Meat,Rackshur Bone,Rackshur Hide,Serpelu Meat,Serpelu Bone,Serpelu Hide,Serpelu Egg,Stinbian Meat,Stinbian Bone,Stinbian Hide";
        case "coastal":
            return "Honey Apple,Astragalus,Green Beans,Sea Cabbage,Short Carrot,Thin Cucumber,Doxyl Leaf,Highland Lettuce,Maidenhair,Truffle Mushrooms,Black Olives,Crisp Onion,Coastal Orange,Blue Popato,Sweet Peas,Tart Radish,Sea Salt,Ruby Strawberries,Ruby Tomato,Coastal Wheat,Char Eel,Lakebed Carp,Midnight Sardine,Minervan Tuna,Pebble Shrimp,Pink Trout,Rock Clam,Royal Crab,Voyager Salmon";
        case "cold":
            return "Brahmi,Winter Broccoli,Cacaold Beans,Long Carrot,Ice Grapes,Paraherb,Schizandra,Blue Spinach,White Popato,Frost Pumpkin,Round Turnip,Blanche Wheat";
        case "desert":
            return "Aloe,Sweet Beans,White Cabbage,Spicy Carrot,Chickpeas,Giant Cucumber,White Garlic,Sand Ginger,Ginseng,Lycium,Sand Melon,Sand Onion,Arid Peach,Bleached Pear,Scorcher Pepper,Rhynoseed,Flaked Salt,Crystal Sugarcane,Turmeric,Sunset Wheat,Yidash";
        case "grassland":
            return "Camellia Leaves,Caswinnis,Gypsy Caswinnis,Endura,Pearl Ginger,Highland Grapes,Clear Grapes,Honey,Lentils,Button Mushrooms,Sweet Onion,Tall Grain Rice,Tart Strawberries,Thousandcorn,Lowland Wheat,Yeast";
        case "mountain":
            return "Fine Apricots,Barley,White Broccoli,White Cabbage,Coffee Beans,Earthy Ginger,Joza Leaf,Red Lettuce,Black Mushrooms,Mountain Orange,Vibrant Peach,Long Peas,Bleached Pepper,White Radish,Rage Fruit,Short Grain Rice,Rock Salt,Shepherd's Purse,Soybeans,Green Spinach,Syrup Sugarcane,Sulfur,Hardy Tomato,Purple Turnip";
        case "tropical":
            return "Pineapple,Victoria Lily,Coconut";
    }
    return {
        name: "",
    };
}

function SearchBlueprintNames(blueprint) {
    blueprint = blueprint.toLowerCase();
    let weaponList = ["", "Club", "Dagger", "Greatclub", "Handaxe", "Javelin", "Light Hammer", "Mace", "Quarterstaff", "Spear", "Dart", "Shortbow", "Battleaxe", "Broadsword", "Flail", "Glaive", "Greataxe", "Greatsword", "Lance", "Longsword", "Maul", "Morningstar", "Rapier", "Scimitar", "Shortsword", "Trident", "Warhammer", "Whip", "Blowgun", "Longbow", "Net", "Blast Lance", "Blast Maul", "Charge Axe", "Charge Blade", "Charge Gauntlet", "Charge Spear", "Palm Pistol", "Revolver", "Magnum", "Musket", "Rifle", "Blunderbuss", "Arrow", "Arrow, Blunt", "Bullet", "Shelling", "Shelling, Splash"].sort();
    let searchWeaponList = ["", "club", "dagger", "greatclub", "handaxe", "javelin", "light hammer", "mace", "quarterstaff", "spear", "dart", "shortbow", "battleaxe", "broadsword", "flail", "glaive", "greataxe", "greatsword", "lance", "longsword", "maul", "morningstar", "rapier", "scimitar", "shortsword", "trident", "warhammer", "whip", "blowgun", "longbow", "net", "blast lance", "blast maul", "charge axe", "charge blade", "charge gauntlet", "charge spear", "palm pistol", "revolver", "magnum", "musket", "rifle", "blunderbuss", "arrow", "arrow, blunt", "bullet", "shelling", "shelling, splash"].sort();
    let armorList = ["", "Plated Jacket", "Chain Shirt", "Fragile Armor", "Lamellar", "Scale Mail", "Bulken Armor", "Breastplate", "Chain Mail", "Bone Mail", "Splint Mail", "Bulken Mail", "Full Plate", "Fragile Shield", "Light Shield", "Heavy Shield"].sort();
    let searchArmorList = ["", "plated jacket", "chain shirt", "fragile armor", "lamellar", "scale mail", "bulken armor", "breastplate", "chain mail", "bone mail", "splint mail", "bulken mail", "full plate", "fragile shield", "light shield", "heavy shield"].sort();
    let consumableList = ["", "Steroid", "Steroid HQ", "Disinfectant", "Disinfectant HQ", "Pain Killer", "Pain Killer HQ", "Antacid", "Antacid HQ", "Stability", "Stability HQ", "Eye Drops", "Eye Drops HQ", "Muscle Relief", "Muscle Relief HQ", "Breath Healer", "Breath Healer HQ", "Head Cleanser", "Head Cleanser HQ", "Dash Extract", "Dash Extract HQ", "Guard Extract", "Guard Extract HQ", "Power Extract", "Power Extract HQ", "Regen Extract", "Regen Extract HQ", "Jazz", "Jazz HQ", "Swing", "Gypsy Swing", "Rhythm", "Rhythm HQ", "Dixie", "Baguette", "Bouillabaisse", "Coconut Cheese", "Crepes", "Macarons", "Onion Soup", "Quiche", "Raclettes", "Thuressian Salad", "Vodka Pâté", "Apricot Vinegar", "Barley Noodles", "Cabbage Rolls", "Hot and Sour Soup", "Mushroom Fried Rice", "Orange Rackshur Noodles", "Sweet Brocoli Stir Fry", "Sweet Buns", "Stif Fry Tofu and Rice", "Tofu", "Baklava", "Chole", "Curry", "Falafel", "Fattoush", "Hummus", "Kofta", "Paneer", "Papdi", "Pita", "Cacao Drink", "Coffee", "Energy Drink", "Fruit Juice", "Jade Tea", "Monday Tea", "Victoria Tea", "Common Beer", "Greenwood Ale", "Aelton Honey Ale", "Aelight Bourbon", "Vulcan Whiskey", "Seaman's Vodka", "White Water Wine", "Scarlet Wine", "Rose Water Wine", "Red Rum", "Apollen Gold Rum", "Libran Ice Wine"].sort();
    let searchConsumableList = ["", "steroid", "steroid hq", "disinfectant", "disinfectant hq", "pain killer", "pain killer hq", "antacid", "antacid hq", "stability", "stability hq", "eye drops", "eye drops hq", "muscle relief", "muscle relief hq", "breath healer", "breath healer hq", "head cleanser", "head cleanser hq", "dash extract", "dash extract hq", "guard extract", "guard extract hq", "power extract", "power extract hq", "regen extract", "regen extract hq", "jazz", "jazz hq", "swing", "gypsy swing", "rhythm", "rhythm hq", "dixie", "baguette", "bouillabaisse", "coconut cheese", "crepes", "macarons", "onion soup", "quiche", "raclettes", "thuressian salad", "vodka pâté", "apricot vinegar", "barley noodles", "cabbage rolls", "hot and sour soup", "mushroom fried rice", "orange rackshur noodles", "sweet brocoli stir fry", "sweet buns", "stif fry tofu and rice", "tofu", "baklava", "chole", "curry", "falafel", "fattoush", "hummus", "kofta", "paneer", "papdi", "pita", "cacao drink", "coffee", "energy drink", "fruit juice", "jade tea", "monday tea", "victoria tea", "common beer", "greenwood ale", "aelton honey ale", "aelight bourbon", "vulcan whiskey", "seaman's vodka", "white water wine", "scarlet wine", "rose water wine", "red rum", "apollen gold rum", "libran ice wine"].sort();
    let gearList = ["", "Stimulant", "Acid", "Soap", "Earthen Gelatin", "Gelatin", "Magnet", "Honey Apple", "Astragalus", "Green Beans", "Sea Cabbage", "Short Carrot", "Thin Cucumber", "Doxyl Leaf", "Highland Lettuce", "Maidenhair", "Truffle Mushrooms", "Black Olives", "Crisp Onion", "Coastal Orange", "Blue Popato", "Sweet Peas", "Tart Radish", "Sea Salt", "Ruby Strawberries", "Ruby Tomato", "Coastal Wheat", "Brahmi", "Winter Broccoli", "Cacaold Beans", "Long Carrot", "Ice Grapes", "Paraherb", "Schizandra", "Blue Spinach", "White Popato", "Frost Pumpkin", "Round Turnip", "Blanche Wheat", "Aloe", "Sweet Beans", "White Cabbage", "Spicy Carrot", "Chickpeas", "Giant Cucumber", "White Garlic", "Sand Ginger", "Ginseng", "Lycium", "Sand Melon", "Sand Onion", "Arid Peach", "Bleached Pear", "Scorcher Pepper", "Rhynoseed", "Flaked Salt", "Crystal Sugarcane", "Turmeric", "Sunset Wheat", "Yidash", "Camellia Leaves", "Caswinnis", "Gypsy Caswinnis", "Endura", "Pearl Ginger", "Highland Grapes", "Clear Grapes", "Honey", "Lentils", "Button Mushrooms", "Sweet Onion", "Tall Grain Rice", "Tart Strawberries", "Thousandcorn", "Lowland Wheat", "Yeast", "Fine Apricots", "Barley", "White Broccoli", "White Cabbage", "Coffee Beans", "Earthy Ginger", "Joza Leaf", "Red Lettuce", "Black Mushrooms", "Mountain Orange", "Vibrant Peach", "Long Peas", "Bleached Pepper", "White Radish", "Rage Fruit", "Short Grain Rice", "Rock Salt", "Shepherd's Purse", "Soybeans", "Green Spinach", "Syrup Sugarcane", "Sulfur", "Hardy Tomato", "Purple Turnip", "Pineapple", "Victoria Lily", "Coconut", "Caranu Meat", "Caranu Bone", "Caranu Hide", "Caranu Claw", "Caranu Tooth", "Caranu Carapice", "Cashmechong Meat", "Cashmechong Bone", "Cashmechong Hide", "Cesplang Meat", "Cesplang Bone", "Cesplang Hide", "Cesplang Claw", "Cesplang Tooth", "Cesplang Plume", "Colosshu Meat", "Colosshu Bone", "Colosshu Hide", "Dekying Meat", "Dekying Bone", "Dekying Hide", "Dekying Egg", "Geltingwa Meat", "Geltingwa Fluid", "Holjo Meat", "Holjo Bone", "Holjo Hide", "Hookma Meat", "Hookma Bone", "Hookma Hide", "Plumhou Meat", "Plumhou Bone", "Plumhou Hide", "Rackshur Meat", "Rackshur Bone", "Rackshur Hide", "Serpelu Meat", "Serpelu Bone", "Serpelu Hide", "Serpelu Egg", "Stinbian Meat", "Stinbian Bone", "Stinbian Hide", "Char Eel", "Lakebed Carp", "Midnight Sardine", "Minervan Tuna", "Pebble Shrimp", "Pink Trout", "Rock Clam", "Royal Crab", "Voyager Salmon"].sort();
    let searchGearList = ["", "stimulant", "acid", "soap", "earthen gelatin", "gelatin", "magnet", "honey apple", "astragalus", "green beans", "sea cabbage", "short carrot", "thin cucumber", "doxyl leaf", "highland lettuce", "maidenhair", "truffle mushrooms", "black olives", "crisp onion", "coastal orange", "blue popato", "sweet peas", "tart radish", "sea salt", "ruby strawberries", "ruby tomato", "coastal wheat", "brahmi", "winter broccoli", "cacaold beans", "long carrot", "ice grapes", "paraherb", "schizandra", "blue spinach", "white popato", "frost pumpkin", "round turnip", "blanche wheat", "aloe", "sweet beans", "white cabbage", "spicy carrot", "chickpeas", "giant cucumber", "white garlic", "sand ginger", "ginseng", "lycium", "sand melon", "sand onion", "arid peach", "bleached pear", "scorcher pepper", "rhynoseed", "flaked salt", "crystal sugarcane", "turmeric", "sunset wheat", "yidash", "camellia leaves", "caswinnis", "gypsy caswinnis", "endura", "pearl ginger", "highland grapes", "clear grapes", "honey", "lentils", "button mushrooms", "sweet onion", "tall grain rice", "tart strawberries", "thousandcorn", "lowland wheat", "yeast", "fine apricots", "barley", "white broccoli", "white cabbage", "coffee beans", "earthy ginger", "joza leaf", "red lettuce", "black mushrooms", "mountain orange", "vibrant peach", "long peas", "bleached pepper", "white radish", "rage fruit", "short grain rice", "rock salt", "shepherd's purse", "soybeans", "green spinach", "syrup sugarcane", "sulfur", "hardy tomato", "purple turnip", "pineapple", "victoria lily", "coconut", "caranu meat", "caranu bone", "caranu hide", "caranu claw", "caranu tooth", "caranu carapice", "cashmechong meat", "cashmechong bone", "cashmechong hide", "cesplang meat", "cesplang bone", "cesplang hide", "cesplang claw", "cesplang tooth", "cesplang plume", "colosshu meat", "colosshu bone", "colosshu hide", "dekying meat", "dekying bone", "dekying hide", "dekying egg", "geltingwa meat", "geltingwa fluid", "holjo meat", "holjo bone", "holjo hide", "hookma meat", "hookma bone", "hookma hide", "plumhou meat", "plumhou bone", "plumhou hide", "rackshur meat", "rackshur bone", "rackshur hide", "serpelu meat", "serpelu bone", "serpelu hide", "serpelu egg", "stinbian meat", "stinbian bone", "stinbian hide", "char eel", "lakebed carp", "midnight sardine", "minervan tuna", "pebble shrimp", "pink trout", "rock clam", "royal crab", "voyager salmon"].sort();
    let foundBlueprints = [];

    let arbitrarySearchLimit = 6;
    let searchIndex = -1;
    for (let i = 0; i < searchWeaponList.length; i++) {
        searchIndex = searchWeaponList[i].indexOf(blueprint);
        if (searchIndex > -1) {
            foundBlueprints.push({
                name: weaponList[i],
                source: "weapon"
            });
            if (foundBlueprints.length >= arbitrarySearchLimit) {
                break;
            }
        }
    };
    if (foundBlueprints.length < arbitrarySearchLimit) {
        for (let i = 0; i < searchArmorList.length; i++) {
            searchIndex = searchArmorList[i].indexOf(blueprint);
            if (searchIndex > -1) {
                foundBlueprints.push({
                    name: armorList[i],
                    source: "armor"
                });
                if (foundBlueprints.length >= arbitrarySearchLimit) {
                    break;
                }
            }
        };
    }
    if (foundBlueprints.length < arbitrarySearchLimit) {
        for (let i = 0; i < searchConsumableList.length; i++) {
            searchIndex = searchConsumableList[i].indexOf(blueprint);
            if (searchIndex > -1) {
                foundBlueprints.push({
                    name: consumableList[i],
                    source: "consumable"
                });
                if (foundBlueprints.length >= arbitrarySearchLimit) {
                    break;
                }
            }
        };
    }
    if (foundBlueprints.length < arbitrarySearchLimit) {
        for (let i = 0; i < searchGearList.length; i++) {
            searchIndex = searchGearList[i].indexOf(blueprint);
            if (searchIndex > -1) {
                foundBlueprints.push({
                    name: gearList[i],
                    source: "gear"
                });
                if (foundBlueprints.length >= arbitrarySearchLimit) {
                    break;
                }
            }
        };
    }

    return foundBlueprints;
}

function SearchCraftingMatsNames(mat) {
    mat = mat.toLowerCase();
    let materialList = ["", "Pine", "Maple", "Cotton", "Hemp", "Clearth", "Kaolin", "Glass", "Granite", "Iron", "Steel", "Snow", "Ice", "Mapla", "Tempered Glass", "Crystal", "Sigilite", "Gold", "Icea", "Beast Bone", "Beast Leather", "Ironwood", "Fireglass", "Crystala", "Mana Gem", "Ventu Stone", "Steela", "Glaceum", "Sauran Bone", "Ironoak", "Adamantine", "Pnevmarite", "Platinum", "Glacerulum", "Viridium", "Rubrumium", "Obsidian", "Mithral", "White Obsidian", "Albryst"].sort();
    let searchMaterialList = ["", "pine", "maple", "cotton", "hemp", "clearth", "kaolin", "glass", "granite", "iron", "steel", "snow", "ice", "mapla", "tempered glass", "crystal", "sigilite", "gold", "icea", "beast bone", "beast leather", "ironwood", "fireglass", "crystala", "mana gem", "ventu stone", "steela", "glaceum", "sauran bone", "ironoak", "adamantine", "pnevmarite", "platinum", "glacerulum", "viridium", "rubrumium", "obsidian", "mithral", "white obsidian", "albryst"].sort();
    let goodsList = ["", "Stimulant", "Acid", "Soap", "Earthen Gelatin", "Gelatin", "Magnet", "Honey Apple", "Astragalus", "Green Beans", "Sea Cabbage", "Short Carrot", "Thin Cucumber", "Doxyl Leaf", "Highland Lettuce", "Maidenhair", "Truffle Mushrooms", "Black Olives", "Crisp Onion", "Coastal Orange", "Blue Popato", "Sweet Peas", "Tart Radish", "Sea Salt", "Ruby Strawberries", "Ruby Tomato", "Coastal Wheat", "Brahmi", "Winter Broccoli", "Cacaold Beans", "Long Carrot", "Ice Grapes", "Paraherb", "Schizandra", "Blue Spinach", "White Popato", "Frost Pumpkin", "Round Turnip", "Blanche Wheat", "Aloe", "Sweet Beans", "White Cabbage", "Spicy Carrot", "Chickpeas", "Giant Cucumber", "White Garlic", "Sand Ginger", "Ginseng", "Lycium", "Sand Melon", "Sand Onion", "Arid Peach", "Bleached Pear", "Scorcher Pepper", "Rhynoseed", "Flaked Salt", "Crystal Sugarcane", "Turmeric", "Sunset Wheat", "Yidash", "Camellia Leaves", "Caswinnis", "Gypsy Caswinnis", "Endura", "Pearl Ginger", "Highland Grapes", "Clear Grapes", "Honey", "Lentils", "Button Mushrooms", "Sweet Onion", "Tall Grain Rice", "Tart Strawberries", "Thousandcorn", "Lowland Wheat", "Yeast", "Fine Apricots", "Barley", "White Broccoli", "White Cabbage", "Coffee Beans", "Earthy Ginger", "Joza Leaf", "Red Lettuce", "Black Mushrooms", "Mountain Orange", "Vibrant Peach", "Long Peas", "Bleached Pepper", "White Radish", "Rage Fruit", "Short Grain Rice", "Rock Salt", "Shepherd's Purse", "Soybeans", "Green Spinach", "Syrup Sugarcane", "Sulfur", "Hardy Tomato", "Purple Turnip", "Pineapple", "Victoria Lily", "Coconut", "Caranu Meat", "Caranu Bone", "Caranu Hide", "Caranu Claw", "Caranu Tooth", "Caranu Carapice", "Cashmechong Meat", "Cashmechong Bone", "Cashmechong Hide", "Cesplang Meat", "Cesplang Bone", "Cesplang Hide", "Cesplang Claw", "Cesplang Tooth", "Cesplang Plume", "Colosshu Meat", "Colosshu Bone", "Colosshu Hide", "Dekying Meat", "Dekying Bone", "Dekying Hide", "Dekying Egg", "Geltingwa Meat", "Geltingwa Fluid", "Holjo Meat", "Holjo Bone", "Holjo Hide", "Hookma Meat", "Hookma Bone", "Hookma Hide", "Plumhou Meat", "Plumhou Bone", "Plumhou Hide", "Rackshur Meat", "Rackshur Bone", "Rackshur Hide", "Serpelu Meat", "Serpelu Bone", "Serpelu Hide", "Serpelu Egg", "Stinbian Meat", "Stinbian Bone", "Stinbian Hide", "Char Eel", "Lakebed Carp", "Midnight Sardine", "Minervan Tuna", "Pebble Shrimp", "Pink Trout", "Rock Clam", "Royal Crab", "Voyager Salmon"].sort();
    let searchGoodsList = ["", "stimulant", "acid", "soap", "earthen gelatin", "gelatin", "magnet", "honey apple", "astragalus", "green beans", "sea cabbage", "short carrot", "thin cucumber", "doxyl leaf", "highland lettuce", "maidenhair", "truffle mushrooms", "black olives", "crisp onion", "coastal orange", "blue popato", "sweet peas", "tart radish", "sea salt", "ruby strawberries", "ruby tomato", "coastal wheat", "brahmi", "winter broccoli", "cacaold beans", "long carrot", "ice grapes", "paraherb", "schizandra", "blue spinach", "white popato", "frost pumpkin", "round turnip", "blanche wheat", "aloe", "sweet beans", "white cabbage", "spicy carrot", "chickpeas", "giant cucumber", "white garlic", "sand ginger", "ginseng", "lycium", "sand melon", "sand onion", "arid peach", "bleached pear", "scorcher pepper", "rhynoseed", "flaked salt", "crystal sugarcane", "turmeric", "sunset wheat", "yidash", "camellia leaves", "caswinnis", "gypsy caswinnis", "endura", "pearl ginger", "highland grapes", "clear grapes", "honey", "lentils", "button mushrooms", "sweet onion", "tall grain rice", "tart strawberries", "thousandcorn", "lowland wheat", "yeast", "fine apricots", "barley", "white broccoli", "white cabbage", "coffee beans", "earthy ginger", "joza leaf", "red lettuce", "black mushrooms", "mountain orange", "vibrant peach", "long peas", "bleached pepper", "white radish", "rage fruit", "short grain rice", "rock salt", "shepherd's purse", "soybeans", "green spinach", "syrup sugarcane", "sulfur", "hardy tomato", "purple turnip", "pineapple", "victoria lily", "coconut", "caranu meat", "caranu bone", "caranu hide", "caranu claw", "caranu tooth", "caranu carapice", "cashmechong meat", "cashmechong bone", "cashmechong hide", "cesplang meat", "cesplang bone", "cesplang hide", "cesplang claw", "cesplang tooth", "cesplang plume", "colosshu meat", "colosshu bone", "colosshu hide", "dekying meat", "dekying bone", "dekying hide", "dekying egg", "geltingwa meat", "geltingwa fluid", "holjo meat", "holjo bone", "holjo hide", "hookma meat", "hookma bone", "hookma hide", "plumhou meat", "plumhou bone", "plumhou hide", "rackshur meat", "rackshur bone", "rackshur hide", "serpelu meat", "serpelu bone", "serpelu hide", "serpelu egg", "stinbian meat", "stinbian bone", "stinbian hide", "char eel", "lakebed carp", "midnight sardine", "minervan tuna", "pebble shrimp", "pink trout", "rock clam", "royal crab", "voyager salmon"].sort();
    let foundMats = [];

    let arbitrarySearchLimit = 6;
    let searchIndex = -1;
    for (let i = 0; i < searchMaterialList.length; i++) {
        searchIndex = searchMaterialList[i].indexOf(mat);
        if (searchIndex > -1) {
            foundMats.push({
                name: materialList[i],
                source: "materials"
            });
            if (foundMats.length >= arbitrarySearchLimit) {
                break;
            }
        }
    };
    if (foundMats.length < arbitrarySearchLimit) {
        for (let i = 0; i < searchGoodsList.length; i++) {
            searchIndex = searchGoodsList[i].indexOf(mat);
            if (searchIndex > -1) {
                foundMats.push({
                    name: goodsList[i],
                    source: "goods"
                });
                if (foundMats.length >= arbitrarySearchLimit) {
                    break;
                }
            }
        };
    }

    return foundMats;
}

function GetCraftingSizes() {
    return [{
            name: "Fine",
            motes: 1,
            calc: 1
        },
        {
            name: "Tiny",
            motes: 3,
            calc: 0.6
        },
        {
            name: "Small",
            motes: 10,
            calc: 0.5
        },
        {
            name: "Medium",
            motes: 30,
            calc: 0.4
        },
        {
            name: "Large",
            motes: 90,
            calc: 0.33
        },
        {
            name: "Huge",
            motes: 200,
            calc: 0.3
        }
    ];
}

function GetCraftingSizeInfo(size) {
    switch (size.toLowerCase()) {
        case "":
            return {
                name: ""
            };
        case "fine":
            return {
                name: "Fine", desc: "3 in. or less", motes: 1
            };
        case "tiny":
            return {
                name: "Tiny", desc: "3 in. to 1 ft.", motes: 3
            };
        case "small":
            return {
                name: "Small", desc: "1 ft. to 2 ft.", motes: 10
            };
        case "medium":
            return {
                name: "Medium", desc: "2 ft. to 4 ft.", motes: 30
            };
        case "large":
            return {
                name: "Large", desc: "4 ft. to 8 ft.", motes: 90
            };
        case "huge":
            return {
                name: "Huge", desc: "8 ft. to 12 ft.", motes: 200
            };
    }
    return {
        name: ""
    };
}

function GetCraftingAspects() {
    return [{
            name: "Expertise",
            calc: "20"
        },
        {
            name: "Multiple",
            calc: "x"
        },
        {
            name: "Few",
            calc: "3"
        },
        {
            name: "Tens",
            calc: "20"
        },
        {
            name: "Hundreds",
            calc: "60"
        },
        {
            name: "Thousands",
            calc: "120"
        },
        {
            name: "Pointed",
            calc: "1"
        },
        {
            name: "Sharp",
            calc: "s"
        },
        {
            name: "Small Size",
            calc: "0"
        },
        {
            name: "Mini",
            calc: "5"
        },
        {
            name: "Micro",
            calc: "15"
        },
        {
            name: "Mite",
            calc: "30"
        },
        {
            name: "Smooth",
            calc: "s"
        }
    ];
}