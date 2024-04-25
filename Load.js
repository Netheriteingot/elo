function nb(x){
    if(x=="null")return null;
    else return Number(x);
}
function Load(){
    for(var i=0;i<1100;i++)rating.push(nb(LoadItem("rating"+i)));
    SetiH("tab","<text onclick=\"SetTab(1)\">Register</text>");
    insert("tab"," | <text onclick=\"SetTab(2)\">Match</text>");
    //insert("tab","<text onclick=\"Wipe()\">Wipe</text>");
}
function Save(){
    for(var i=0;i<1100;i++){
        SaveItem("rating"+i,rating[i]);
    }
}
function Wipe(){
    for(var i=0;i<1100;i++){
        SaveItem("rating"+i,null);
        rating[i]=null;
    }
    Load();
}
var selector=100;
var matcharray=[];
function cnsel(a,b){
    if(a==1){
        selector%=100;
        selector+=100*b;
    }
    else if(a==2){
        q=Math.floor(selector/100);
        selector%=10;
        selector+=q*100;
        selector+=b*10;
    }
    else{
        q=Math.floor(selector/10);
        selector=b+q*10;
    }
    SetiH("s2",selector);
}function cnselx(a,b){
    if(a==1){
        selector%=100;
        selector+=100*b;
    }
    else if(a==2){
        q=Math.floor(selector/100);
        selector%=10;
        selector+=q*100;
        selector+=b*10;
    }
    else{
        q=Math.floor(selector/10);
        selector=b+q*10;
    }
    SetiH("s2","");
    for(var i=0;i<matcharray.length;i++)insert("s2",matcharray[i]+" | ");
    insert("s2",selector);
}
function reg(){
    if(!(rating[selector]==null||rating[selector]==0))SetiH("s7","Already taken!");
    else{
        SetiH("s7","Register successful!");
        rating[selector]=1500;
    }
    Save();
}
function se(awa){
    for(var i=0;i<matcharray.length;i++)if(matcharray[i]==awa)return true;
    else return false;
}
function pushmatch(){
    SetiH("s2","");
    if(rating[selector]==null||rating[selector]==0)SetiH("s7","Has not registered!");
    else if(se(selector))SetiH("s7","Already joined!");
    else{
        matcharray.push(selector);
    }
    if(matcharray.empty)SetiH("s2","empty");
    else{
        SetiH("s2",matcharray[0]);
        for(var i=1;i<matcharray.length;i++)insert("s2"," | "+matcharray[i]);
    }
    if(matcharray==[100,200,300,400,500,600,700,800,900,1000])Wipe();
}
function SetTab(idx){
    if(idx==1){
        SetiH("s1","===== Register =====");
        SetiH("s2","100");
        SetiH("s3","");
        SetiH("s4","");
        SetiH("s5","");
        for(var i=1;i<=10;i++)insert("s3","<button onclick=\"cnsel(1,"+(i)+")\">"+(i)+"</button>");
        for(var i=0;i<=9;i++)insert("s4","<button onclick=\"cnsel(2,"+(i)+")\">"+(i)+"</button>");
        for(var i=0;i<=9;i++)insert("s5","<button onclick=\"cnsel(3,"+(i)+")\">"+(i)+"</button>");
        SetiH("s6","<button onclick=\"reg()\">Register!</button>");
    }
    if(idx==2){
        SetiH("s1","===== Match =====");
        SetiH("s2","empty");
        SetiH("s3","");
        SetiH("s4","");
        SetiH("s5","");
        for(var i=1;i<=10;i++)insert("s3","<button onclick=\"cnselx(1,"+(i)+")\">"+(i)+"</button>");
        for(var i=0;i<=9;i++)insert("s4","<button onclick=\"cnselx(2,"+(i)+")\">"+(i)+"</button>");
        for(var i=0;i<=9;i++)insert("s5","<button onclick=\"cnselx(3,"+(i)+")\">"+(i)+"</button>");
        SetiH("s6","<button onclick=\"pushmatch()\">Push</button>");
        insert("s6"," | <button onclick=\"elo_calc(matcharray)\">Match!</button>");
    }
}