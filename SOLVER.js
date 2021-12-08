/*
Fichier             : sudoku.js
Auteur              : Ismael COULIBALY 
But                 : permet de resoudre, afficher la grille de sudoku avec des stats en respectant les regles du jeu

*/


var grille =  [
    [1,undefined,undefined,3,undefined,undefined,9,5,2], // line 1
    [undefined,4,undefined,6,undefined,undefined,1,undefined,undefined], // line 2
    [3,undefined,undefined,1,undefined,undefined,undefined,undefined,undefined], // line 3
    [undefined,6,4,7,2,undefined,undefined,1,undefined], // line 4
    [8,7,undefined,9,undefined,6,undefined,2,4], // line 5
    [undefined,2,undefined,undefined,8,5,7,6,undefined], // line 6
    [undefined,undefined,undefined,undefined,undefined,1,undefined,undefined,7], // line 7
    [undefined,undefined,7,undefined,undefined,9,undefined,4,undefined], // line 8
    [2,3,9,undefined,undefined,4,undefined,undefined,1]  // line 9   
];

var temp= grille;//on cree un tableau temp que l'on va utiliser dans solve
var grillePlay=temp;//pour play

load("sudoku-hard.js");
load("sudoku-hard-c.js");
print(grille);
print(commandes);


var display = function (){
     print(">> commande: display");
    var resultat= "";
    for (var i=0;i<9;i++){
        if(i%3==0){ resultat+="   ---------   ---------   ---------\n";}
        for ( var j=0;j<9;j++){
            if(grille[i][j]==undefined){
                grille[i][j]=" ";}//on remplace les undefined par un espace vide
            grille[i][j]+="+ ";//puis on rajoute un +
            
            if(j%3==0){resultat+=" | ";}  //a chaque 3 pas on rajoute un trait horizontal      
            
            resultat+=grille[i][j];
           
       		}
        resultat+="|";
        resultat+="\n";
        
        
 
        }resultat+="    ---------   ---------   ---------\n";
    print(resultat);    
            
};



function stat(){
     var nbCasesTotales=81;
     var nbCasesOuvertes=0;
     
    for(var i=0; i<grille.length;i++){
        for (var j=0;j<grille.length;j++){
        if(grille[i][j]==" + "){
           nbCasesOuvertes++;// on incremente le nombre de case ouvertes lorsque que la case est vide(sans chiffre)
        }
    
        }
				
    }
    var nbValPossibles=9*nbCasesOuvertes;//le nb de valeurs possible par case est 9
    var nbCaseFermees=nbCasesTotales-nbCasesOuvertes;//les cases sont soit ouvertes ou fermees 
    print(">> commande: stats");
    print(">> stats: #possibilites :", nbValPossibles, " #valeurs fermees: ",
          nbCaseFermees,"#nb de case ayant n possibilites (n in [1,9]): ",nbCaseFermees,",0,0,0,0,0,0,0,",nbCasesOuvertes);
     
};

function estDansLigne(ligne, chiffre){//voir READ ME
    var isInRow=false;//permet de verifier si le chiffre que l'on veut entrer est deja dans la ligne
    for(var i=0;i<9;i++)
        for(var j=0;j<9;j++)
           if( temp[ligne][i]==chiffre){
               isInRow=true;
            	return true;
           }
    isInRow=false;//quand c'est a false, l'element n'est donc pas dans la ligne
    return false;};
            

function estDansCol(col, chiffre){//voir READ ME
    var isInCol=false;//permet de verifier si le chiffre que l'on veut entrer est deja dans la colonne
    for(var i=0;i<9;i++)
        for(var j=0;j<9;j++)
             if(temp[i][col]==chiffre){
                 isIncol=true;
            	return true;}
    isInCol=false;
    return false;};


function estDansBox(ligne,col,chiffre){//voir READ ME
    var isInBox=false;//permet de verifier si le chiffre que l'on veut entrer est deja dans le bloc
    var l=ligne-ligne%3;//l et c vont nous permettre de se deplacer de 3 en 3 dans la grille
    var c=col-col%3;//bloc par bloc
    
    for(var i=l;i<l+3;i++)
        for(var j=c;j<c+3;j++)
            if(temp[i][j]==chiffre){
               isInBox=true;
               return true; }
    isInBox=false;
    return false;
}


function estOk(ligne,col,chiffre){//permet de voir si les 3 contraintes sont respectees
    var isOk=false;
  if(estDansLigne(ligne,chiffre)==false && estDansCol(col, chiffre)==false
  		 && estDansBox(ligne,col,chiffre)==false){//si le chiffre est ni dans la ligne, ni colonne, ni bloc alors les contraintres sont
      isOk=true;//respectees
      return true;}
    else
        return false;
};


//on peut maintenant proceder au solve



function solve(){
 
    var isSolved=false;// cette variable nous permet de verifier lorsque la grille temp est resolu,
    for(var i=0; i<temp.length;i++)
        for (var j=0;j<temp.length;j++)
            if(temp[i][j]==undefined)
                temp[i][j]=0;//on remplace les undefined par des 0(case ouverts)
    
    do{                      //tant que la grille n'est pas resolu, on continue ces instructions
   	for(var ligne=0; ligne<temp.length;ligne++){
        for (var col=0;col<temp.length;col++){
            if(temp[ligne][col]==0){//lorsqu'on est positionne sur une case ouverte
                for(var chiffre=1;chiffre<=temp.length;chiffre++){
                    if(estOk(ligne,col,chiffre)==true){
                        temp[ligne][col]=chiffre;//on remplace le 0 par le chiffre respectant les contraintes
                        if(solve()){
                            var isSolved=true;
                            return true;
                           
                        }else{
                            temp[ligne][col]=0;
                        }
                    }
                }
                var isSolved=false;
                return false;
            }
            
        }    var isSolved=true;
        
        
    }} while(isSolved=false);
        print(temp);
    return true;
    
};


function play(l,c,val){

    var contrainteOk=false;			// variable pour respect des contraintes
    while(contrainteOk==false){
    if(grillePlay[l][c]==undefined){//on se place sur une case ouverte
    	grillePlay[l][c]=val;
        solve();					//on rappelle la fonction solve pour propager les contraintes
        if(temp[l][c]==grillePlay[l][c]){
        	print("vous avez entre la bonne valeur, vous respectez les contraintes");
        	contrainteOk=true;
            return;}
         else{
          	print("la valeur de cette case est erronee, elle respecte pas les conditions, veuillez recommencer");
            
                           
            }
        }
        
        else { 
            print("la valeur de cette case est fermee, choisissez une autre");
            contrainteOk=false;
            l=prompt("reentrez une ligne");
            c=prompt("reentrez une colonne");
            val=prompt("reentrez une valeur");		//on redemande a l'utilisateur de rentrer de nouvlles
            										//valeurs lorsque les contraintes ne sont pas respectées
             }    
    }

};


                            
     
 
