let murderer = "шериф";
let gold = 30;
let count_bar = 0;
let count_vseg = 0;
let follow = 0;
let inventory = ["Револьвер"];
let shovel = 0;
let answer = document.querySelector("#ans");
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector('#button4');
const button5 = document.querySelector('#button5');
const text = document.querySelector("#text");
const goldText = document.querySelector('#goldText');

const locations = [
    {
        name: "Развилка",
        "button text": ["Идти в город","Идти в лес","Идти в деревню"],
        "button functions": [goTown,goForest,goVillage],
        text: "Вы пришли на развилку"
    },
    {
        name: "Город",
        "button text": ["Бар","Участок","Развилка"],
        "button functions": [goBar, goPolice, start],
        text: "Вы пришли в город. Сейчас можно пойти в бар, бордель и полицейский участок"
    },
    {
        name: "Участок",
        "button text": ["Шериф","Доска раследования","Выйти из участка"],
        "button functions":[Sherif,investigation,goTown],
        text: "Вы в участвке.Перед вами шериф можете спросить у него про убийства."
    },
    {
        name: "Шериф",
        text: "Шериф расказывает вам о убиствах людей в городе одна из жертва была помощником полиции у него есть пара подзоваемых - Завсегдатый бара и Дровосек, единственные зацепки это бутылка Виски на метсах престпулений и грубаы рана на жертвах.Вы заментили рядом с ним бутылки с алкоголем"
    },
    {
        name: "Доска раследования",
        text: "Вы смотрите на доску и видите что первое убийство было неделю назад у бара. Затем на городской площади, потом в переулке между баром. Около полицейского учатска. Вы заметили одну закономерность все жертвы - женщины"
    },
    {
        name: "Бар",
        "button text":["Бармен","Завсегдатый","Выйти"],
        "button functions": [bartender,vsegda,goTown],
        text: "Вы вошли в бар можете поговорить с барменом и завсегдатым этого бара",
    },
    {
        name: "Бармен",
        text: "Просто так бармен отказался говорить вам пришлось заплатить за информацию и купить выпивку. Вы спрашиваете у бармена про убийства в городе, про тех кто частво бывает в баре и про убийства у бара. Он расказывает что после первого убиства бар почти полностью опустел. Продолжают ходить - завсегдатый, шериф и деревнщина и Дровосек, ещё он заметил дро дровосек уже давно не приходил. (Вы заметили что бармен волновался). Вы спросили его кто по его мнению способен на убийства. Он сказал что деревенщина ведет себя странно."
    },
    {
        name: "Завсегдатый",
        text: 'Вам пришлось купить ему виски чтобы поговорить. Вы замечаете что завсегдатый уже изрядно выпил. Вы спрашивате его про убийства. Он вам говорит что в ночь первого убийства в бар приходили дровосек и шериф. Вы спрашивете у него про шерифа на что получается ответ - "Наш шериф ахуенный мужык его второе имя - спрведливость! Ты на него не гони давай. Всё иди нахуй кароче." Вы ударили его и он вырубился. Вы выпили бутылку которую купили виски.'
    },
    {
        name: "Деревня",
        "button text": ["Старейшина","Деревщина","Развилка"],
        "button functions": [glava,rednack,start],
        text: "Вы пришли в деревеню и видите вдалеке дом старейшины. Также видите как по близости пьет деревенщина"
    },
    {
        name: "Старейшина",
        text: "Вы пришли к деревнщине спрашиваете его про убийства в городе.На что получаете ответ - \"Да что нынче происходит в городе это ужасно, но уверяю вас этот маньяк не из деревни.\" Также вы спрашиваете у него про лес который слева от деревни. Он вам говорит что в этот лес из деревни ходит только он сам и мужык который пьет. "
    },
    {
        name: "Деревенщина",
        text: "Вы подходите к дереввенщине (видите у него бутылку виски и лежаший в дали топор) и спрашиваете у него про убийства в городе. Он говорит - \"Не знаю я ничего про убийства в городе, да в город я хожу только чтобы выпить, да шериф в городе выпить любить все только виски покупает. Говно у нас шериф блять! Столько народу уже померло, а убийца так и не найден.\"Вы ушли от деревнщины. Вам показлось что он вел себя раздраженно и агресивно."
    },
    {
        name: "Дорога в лес",
        "button text": ["Идти дальше","Идти за следом","Развилка"],
        "button functions": [goForest2,followBlood,start],
        text: "По дороге в лес вы заметили кровавый след"
    },
    {
        name: "Лес",
        "button text": ["Дом дровосека","Идти за дом","Развилка"],
        "button functions": [lumberjack,afterHouse,start],
        text: "Вы пришли в лес перед вами дом дровосека"
    },
    {
        name: "За домом дровосека",
        "button text": ["Осмотреться","","Идти назад"],
        "button functions": [lookAround,dead,goForest2],
        text: "Вы зашли за дом"
    },
    {
        name: "Победа",
        "button text": ["Заново","Заново","Заново"],
        "button functions": [restart,restart,restart],
        text: "Вы вычеслили убийцу поздравляем!"
    },
    {
        name: "Проигрыш",
        "button text": ["Заново","Заново","Заново"],
        "button functions": [restart,restart,restart],
        text: "Вы не смогли убийцу"
    }
]

button1.onclick = goTown;
button2.onclick = goForest;
button3.onclick = goVillage;
button4.onclick = checkInventory;

function checkInventory(){
    text.innerHTML = inventory;
    console.log(inventory);
}


function update(location){
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerHTML = location.text;
}

function update_text(location){
    text.innerHTML = location.text;
}

function goTown() {
    update(locations[1]);
}
function goPolice(){
    update(locations[2]);
}
function Sherif(){
    update_text(locations[3]);
}
function investigation(){
    update_text(locations[4]);
}

function goForest() {
    update(locations[11]);
}
function followBlood(){
    follow++;
    text.innerHTML = "Вы находите ключи. Странно да?",
    inventory.push("Ключи");
}
function goForest2(){
    update(locations[12]);
}
function lumberjack(){
    if (follow === 0){
        text.innerHTML = "Вы стучите в дом дровосека, но вам никто не открывает вы решаете сломать окно и войти внутрь. Осматривая дом вы находите значок помощника шерифа"
    } else if (follow === 1){
        text.innerHTML = "Вы открываете дверь ключами которые нашли. Войдя внутрь вы осматриваетесь и находите значок помощника шерифа";
        follow++;
    } else{
        text.innerHTML = "Вы входите в дом, тут вам делать уже нечего"
    }
}
function afterHouse(){
    update(locations[13]);
}
function lookAround(){
    text.innerHTML = "Вы видите пни и дервья больше ничего";
}
function dead(){
    if (shovel === 0){
        text.innerHTML = "Странно но вы заметили свежую землю как будто только вскопанную. Вы хотели бы раскопать но у вас нет лопаты.";
        shovel++;
    } else if(inventory.includes("Лопата")){
        text.innerHTML = "Вы выкапывете яму и находу там труп дровосека, еще одна жертва? Тщательно осмотрев его "
    }
}
function goVillage() {
    update(locations[8]);
}
function glava(){
    if (shovel === 1){
        text.innerHTML = "Вы просите у старейшины одолжить лопату, он просит за услугу 5$";
        gold -= 5;
        goldText.innerText = gold + "$";
        inventory.push("Лопата");
    } else{
        update_text(locations[9]);
    }
}
function rednack(){
    update_text(locations[10]);
}
function goBar() {
    update(locations[5]);
}
function bartender(){
    if (gold >= 15 & count_bar === 0){
        count_bar ++;
        gold -= 15;
        goldText.innerText = gold + "$";
        update_text(locations[6]);
    } else if(count_bar === 1){
        update_text(locations[6]);
    }else{
        text.innerHTML = "Бармен отказался говорить и потребовал 15 Долларов."
    }
}
function vsegda(){
    if (count_vseg === 0 & gold >= 10){
        update_text(locations[7]);
        gold -= 10;
        goldText.innerText = gold + "$";
        count_vseg++;
    } else if (gold < 10){
        text.innerHTML = "У вас нет 10 долларов на виски.";
    } else{
        text.innerHTML = "Он в отключке.";
    }
}

function start(){
    update(locations[0]);
}


function restart(){
    murderer = "шериф";
    gold = 30;
    count_bar = 0;
    сount_vseg = 0;
    follow = 0;
    inventory = ["Револьвер"];
    shovel = 0;
}

button5.addEventListener ('click', () => {
    if (answer.value.toLowerCase() === murderer) {
        update(locations[14]);
    } else {
       update(locations[15]);
    }    
});    