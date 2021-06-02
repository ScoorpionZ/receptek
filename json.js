var receptekTomb =[];
var leptetoIndex=0;
$(function(){
    $.ajax({
        url: "receptek.json", 
            success: function(result){
                console.log(result);
                receptekTomb=result;
                tablazatletrehozas();
                divletrehozas();//2feladat
            }
    });
    $("#bal").click(barraleptet);
    $("#jobb").click(jobbraleptet);
    $("article").on("click","tr",kivalaszt);
    $("article").on("click","th",rendez);//3feladat
    $("nav>.dropdown>.dropdown-content").on("click","a",rendez2);//4feladat
    $("#OK").click(mentes);//5feladat
    // $("article").on("click","input",torol);//6feladat
    // $("body>div").on("click","input",torol);//6feladat
    //$("#modosit").click(modositasmentes);
    $("aside>form").on("click","#modosit",modositasmentes)//7feladat
    $("article").on("click",".rnev",osszido);//8feladat
    $("article").on("click","#osszegez", rendel);//9feladat
    $("#kerestius").click(tipuskeres);//10feladat
    $("#arkeres").click(arkeres);//11feladat
    $("#keres").click(kereses);//12feladat
    
    
});

function tablazatletrehozas(){
    $("article").append("<div>");
    $("article>div").eq(0).empty();//3feladat
    $("article>div").eq(0).append("<table>");
    $("article>div>table").append("<tr><th id='neve'>Recept név</th><th id='ido'> Elkészítési idő</th><th id='leiras'>Leírás</th><th id='kep'>Kép</th><th id='osszetevok'>Hozzávalók</th><th id='kategoria'>Kategoria</th><th id='ar'>Ár</th><th>Türlés</th></th><th>Módosít</th><th>Db</th></tr>");//1feladat Típus és ár   3feladat id elhelyezés td helyett th  6feladat törlés 7feladat módosít
    for(var i= 0; i < receptekTomb.length; i++){
        $("article>div>table").append("<tr id='"+i+"'>");
        for(var item in receptekTomb[i]){
            if(item=="neve"){//8feladat
                $("table>tr").eq(i+1).append("<td id='"+i+"' class='rnev' >"+receptekTomb[i][item]+"</td>");//8feladat
            }
            else{//8feladat
                $("table>tr").eq(i+1).append("<td>"+receptekTomb[i][item]+"</td>");
            }
            if(item=="ar"){//6feladat
                $("table>tr").eq(i+1).append("<td><input type='button' id='"+i+"' value='Töröl' class='torolgomb'><td><input type='button' id='"+i+"' value='Módosít' class='modositgomb'><td><select class='cars' id='db'>");//6feladat törlés 7feladat módosít 9feladat db
            }
        }
    }
    for (let i = 1; i < 11; i++) {//9feladat
        $(".cars").append("<option id='"+i+"' value='"+i+"'>"+i);//9feladat
    }//9feladat
    $(".torolgomb").click(torol);//6feladat
    $(".modositgomb").click(modosit);//7feladat
    
}
//2feladat
function divletrehozas(){
    $("article").append("<div id='receptekki'>");
    for(var i= 0; i < receptekTomb.length; i++){
        $("#receptekki").append("<div id='"+i+"'>");
        for(var item in receptekTomb[i]){
            if(item=="kep"){
                $("article>div>div").eq(i).append("<img src='"+receptekTomb[i][item]+"' alt='"+receptekTomb[i].neve+"'>");
            }
            if(item=="neve"){
                $("article>div>div").eq(i).append("<p>"+receptekTomb[i][item]+"</p>");
            }
            
        }
    }
    $("article").append("<input type='button' id='osszegez' name='osszegez' value='Összegez'>");//9feladat
    $("#receptekki>div").click(kiIrat);
}

//2feladat
function kiIrat(){
    var id=$(this).attr("id");
    $("body>div").empty();
    for(var item in receptekTomb[id]){
        $("body>div").append("<p>"+receptekTomb[id][item]+"</p>");
        $("body>div").attr("id", 0);//6feladat
        if(item=="ar"){//6feladat
            $("body>div").append("<p><input type='button' id='"+id+"' class='torolgomb' value='Töröl'><p><input type='button' id='"+id+"' value='Módosít' class='modositgomb'>");//6feladat
        } 
    }
    $(".torolgomb").click(torol);//6feladat
    $(".modositgomb").click(modosit);//7feladat
}

function kivalaszt(){
    console.log("ittvagyok")
    var id=$(this).attr("id");
    console.log(id);
    leptetoIndex=id;
    //3feladat if
    if (id>-1){
        megjelenit(id);  
    }
    
}

function megjelenit(index){
    $("#recept").empty();
    $("#recept").append("<img src='"+receptekTomb[index].kep+"' alt='"+receptekTomb[index].neve+"'>");
    $("#recept").append("<h2>");
    $("#recept>h2").append(receptekTomb[index].neve);
    $("#recept").append("<p>");
    $("#recept>p").append(receptekTomb[index].leiras);
    $("#recept").append("<p>");
    $("#recept>p").eq(1).append(receptekTomb[index].ido);
    $("#recept").append("<h3>");
    $("#recept>h2").append("Hozzávalók");
    $("#recept").append("<ul>");
    var hozzavalok=receptekTomb[index].osszetevok;
    for (let i = 0; i < hozzavalok.length ; i++) {
        for(var item in hozzavalok[i]){
        $("#recept>ul").append("<li>");
        $("#recept>ul>li").eq(i).append(item+": "+hozzavalok[i][item]);
        }
    }
    $("#recept").append("<p>");//1feladat
    $("#recept>p").eq(2).append("Típus: " + receptekTomb[index].kategoria);//1feladat
    $("#recept").append("<p>");//1feladat
    $("#recept>p").eq(3).append("Ár: " + receptekTomb[index].ar);//1feladat
    
}
function barraleptet(){
    leptetoIndex--;
    if(leptetoIndex < 0){
        leptetoIndex=receptekTomb.length-1;
    }
    megjelenit(leptetoIndex);
}

function jobbraleptet(){
    leptetoIndex++;
    if(leptetoIndex > receptekTomb.length-1){
        leptetoIndex=0;
    }
    megjelenit(leptetoIndex);
}

//3feladat
var irany = true;
function rendez(){
    var id=$(this).attr("id");
    if(id!=undefined){
        if(irany==true){
            if (id=="ido" ||  id=="ar"){
                receptekTomb.sort(
                    function(a,b){
                        return a[id] - b[id];
                    }
                );
            }
            else{
                receptekTomb.sort(
                    function(a,b){
                        return Number(a[id] > b[id])-0.5;
                    }
                );
            }
            irany=false;
        }
        else{
            if (id=="ido" ||  id=="ar"){
                receptekTomb.sort(
                    function(a,b){
                        return b[id] - a[id];
                    }
                );
            }
            else{
                receptekTomb.sort(
                    function(a,b){
                        return Number(a[id] < b[id])-0.5;
                    }
                );
            }
            irany=true;
        }
        
    }
    tablazatletrehozas();
}

//4feladat
function rendez2(){
    var id=$(this).attr("id");
    if(irany==true){
        if (id=="ido" ||  id=="ar"){
            receptekTomb.sort(
                function(a,b){
                    return a[id] - b[id];
                }
            );
        }
        else{
            receptekTomb.sort(
                function(a,b){
                    return Number(a[id] > b[id])-0.5;
                }
            );
        }
        irany=false;
    }
    else{
        if (id=="ido" ||  id=="ar"){
            receptekTomb.sort(
                function(a,b){
                    return b[id] - a[id];
                }
            );
        }
        else{
            receptekTomb.sort(
                function(a,b){
                    return Number(a[id] < b[id])-0.5;
                }
            );
        }
        irany=true;
    }  
    tablazatletrehozas();
}
//5feladat
function mentes(){
    var ujRecept={};
    ujRecept.neve=$("#nev").val();
    ujRecept.ido=$("#eido").val();
    ujRecept.leiras=$("#leir").val();
    ujRecept.kep=$("#kepeler").val();
    //ujRecept.osszetevok=$("#osszetevok").val();
    ujRecept.kategoria=$("#kategoriak").val();
    ujRecept.ar=$("#ara").val();
    receptekTomb.push(ujRecept);
    tablazatletrehozas();
    divletrehozas();
}

//6feladat
function torol(){
    var id = $(this).attr("id");
    delete receptekTomb[id];
    $("body>div").eq(0).empty();
    console.log(id);
    $("#recept").remove();
    $("article>table>tr").eq(id+1).empty();
    tablazatletrehozas();
    divletrehozas();
 }

 //7feladat
 var mid 
 function modosit(){
    mid = $(this).attr("id");
    $("#nev").attr("value",receptekTomb[mid].neve);
    $("#eido").attr("value",receptekTomb[mid].ido);
    $("#leir").attr("value",receptekTomb[mid].leiras);
    $("#kepeler").attr("value",receptekTomb[mid].kep);
    $("#kategoriak").attr("value",receptekTomb[mid].kategoria);
    $("#ara").attr("value",receptekTomb[mid].ar);
    $("#OK").remove();
    $("aside>form").append("<input type='button' id='modosit' name='modosit' value='Módosít'>");
 }

 //7feladat
 function modositasmentes(){
    receptekTomb[mid].neve= $("#nev").val();
    receptekTomb[mid].ido= $("#eido").val();
    receptekTomb[mid].leiras=$("#leir").val();
    receptekTomb[mid].kep= $("#kepeler").val();
    receptekTomb[mid].kategoria=$("#kategoriak").val();
    receptekTomb[mid].ar=$("#ara").val();
    $("#modosit").remove();
    $("aside>form").append("<input type='button' id='OK' name='OK' value='OK'>");
    tablazatletrehozas();
 }

//8feladat
 var idoossz =0;
 var edessegdb =0;
 var osszar =0;
 function osszido(){
    var id = $(this).attr("id");
    idoossz+=receptekTomb[id].ido;
    if(receptekTomb[id].kategoria=="édesség"){
        edessegdb++;
    }
    osszar+=receptekTomb[id].ar;
    
    console.log(idoossz);
    console.log(edessegdb);
    console.log(osszar);
 }

 //9feladat
 function rendel(){
    var osszead=0;
    $("article").append("<div id='osszeg'><p>");
    for(var i= 0; i < receptekTomb.length; i++){
        for(var item in receptekTomb[i]){
            if(item=="neve"){
                $("article>#osszeg>p").append(receptekTomb[i][item]);
            }
            
            if(item=="ar"){
                $("article>#osszeg>p").append(receptekTomb[i][item]);
                var reszosszeg=receptekTomb[i][item]*Number($("#db").val());
                osszead+=reszosszeg
                $("article>#osszeg>p").append(reszosszeg);

            }
        }
    }
    $("article>#osszeg>p").append(osszead);
    //console.log(osszead);
 }

//10feladat
 function tipuskeres(){
    var ertek = document.getElementById("tipuskeres").value;
    for (var i = receptekTomb.length-1; i > -1; i--) {
        var tipus=receptekTomb[i].kategoria;
        if(tipus!=ertek){
            receptekTomb.splice(i,1);
        }
    }
    tablazatletrehozas();
    divletrehozas();
}

//11feladat
function arkeres(){
    var slider = document.getElementById("arhatar");
    var ertek=slider.value;
    for (var i = receptekTomb.length-1; i > -1; i--) {
        var ar=receptekTomb[i].ar;
        if(ar>ertek){
            receptekTomb.splice(i,1);
        }
    }
    tablazatletrehozas();
    divletrehozas();
}

//12feladat
 function kereses(){
    var keres=$("#keresettSzoveg").val();
    
    for (var i = receptekTomb.length-1; i > -1; i--) {
        var nevT=receptekTomb[i].neve;
        var eldont = nevT.includes(keres);
        if(eldont!=true){
            receptekTomb.splice(i,1);
        }
    }
    tablazatletrehozas();
    divletrehozas();
}