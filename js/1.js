function pawn_arrangement(color){
    var color1, color2;
    
    if(color==0){
        color1="bia";
        color2="czerw";
    }
    if(color==1){
        color1="czerw";
        color2="bia";
    }
    
    $("#row_8 .black").html('<img class="user1_pawn pion" draggable="false" src="pictures/pion_'+color1+'.png"/>');
    $("#row_7 .black").html('<img class="user1_pawn pion" draggable="false" src="pictures/pion_'+color1+'.png"/>');
    $("#row_6 .black").html('<img class="user1_pawn dama" draggable="false" src="pictures/pion_'+color1+'_dama.png"/>');
    
    //$("#5_2").html('<img class="user2_pawn" draggable="false" src="pictures/pion_'+color2+'.png"/>');
    $("#4_3").html('<img class="user2_pawn" draggable="false" src="pictures/pion_'+color2+'.png"/>');
    /*
    $("#row_1 .black").html('<img class="user2_pawn" draggable="false" src="pictures/pion_'+color2+'.png"/>');
    $("#row_2 .black").html('<img class="user2_pawn" draggable="false" src="pictures/pion_'+color2+'.png"/>');
    $("#row_3 .black").html('<img class="user2_pawn" draggable="false" src="pictures/pion_'+color2+'.png"/>');
    */
}

$(document).ready(function(){

    //Ustawienie szachownicy tak, aby była zawsze na środku
    var Wh=$(window).height();
    var Ww=$(window).width();
    var Ch=$("#game_container1").height()+60;
    var Cw=$("#game_container1").width()+60;
    
    $('#game_container1').css("top",(Wh-Ch)/2);
    $('#game_container1').css("left",(Ww-Cw)/2);
    
    $('#game_container1').show();
    
    $(window).resize(function(){
        Wh=$(window).height();
        Ww=$(window).width();
        $('#game_container1').css("top",(Wh-Ch)/2);
        $('#game_container1').css("left",(Ww-Cw)/2);
    });
    
    var r=Math.ceil(Math.round(Math.random()*10)/Math.round(Math.random()*10));
    if(r%2==0) r=0;
    else r=1;
    pawn_arrangement(r);
    
    var i=1;
    $(".user1_pawn").each(function(){
        $(this).attr("id",i);
        i++;
    });
    $(".user2_pawn").each(function(){
        $(this).attr("id",i);
        i++;
    });
    /*
        pawn_id     - pionka znajdującego się na polu
        rob2        - pole kliknięte przed rob1
        S           - wartość piona (pion/dama)
    */
    var pawn_id, rob2="", S;

    $(document).on("click",".row div",function(){
        var rob1=this; // kliknięte pole
        /*
            Dx      - Tablica możliwych x pól dla damy
            Dy      - Tablica możliwych y pól dla damy
        */
        var rob1_id=$(rob1).attr("id");
        var rob2_id=$(rob2).attr("id");
        var Dx=new Array();
        var Dy=new Array();
        var Bx=new Array();
        var By=new Array();
        
        if(rob1_id==rob2_id){
            // Kliknięcie tego samego pola powoduje jego odznaczenie i usunięcie podp. ruchów
            
            $(rob2).removeClass("mark_0");
            rob2="";

            $(".mark_1").removeClass("mark_1");  
            $(".mark_2").removeClass("mark_2");
        }
        if(rob1_id!=rob2_id){
            if($(rob1).has(".user1_pawn").length==1){
                /*
                    Jeżeli pole kliknięte jest różne niż wcześniejsze oraz pole to posiada piona na sobie to:
                    - ma zostać usunięte oznaczenie poprzedniego piona (niebieskie)
                */
                $(rob2).removeClass("mark_0");
                //  - ma zostać dodane nieb. oznaczenie obecnie klik. polu
                $(rob1).addClass("mark_0");
                //  - zmienne otrzymują nowe atrybuty obecnie klikniętego pola
                rob2=$(rob1).find(".user1_pawn");
                pawn_id=$(rob2).attr("id");
                rob2=rob1;
                //  - znikają podpowiedzi dla poprz. piona na poprz. polu
                $(".mark_1").removeClass("mark_1");
                $(".mark_2").removeClass("mark_2");
            }
        }
        
        if(rob1!=""){ // Jeżeli na klikniętnym polu znajduje się pion
            /*
                To pobierane są jego parametry:
                S       - po tym czy pion zawiera klasę "pion" czy "dama"
                X1      - kolumnę w której znajduje się pion
                Y1      - wiersz w którym znajduje się pion
            */
            var rob5="#"+pawn_id;
            
            if($(rob5).hasClass("pion")) S="P";
            if($(rob5).hasClass("dama")) S="D";
            var id_1=$(rob2).attr("id");
            var Y1=parseInt(id_1[0]);
            var X1=parseInt(id_1[2]);
            
            
            if(S=="P"){ 
                var X2="N", X3="N", Y2="N";
                if(X1<8){
                    if(X1>1){
                        X2=X1-1;
                        X3=X1+1;
                    } else X2=X1+1;
                } else X2=X1-1;

                if(Y1>1){
                    Y2=Y1-1;
                }
                
                var rob3, rob4;

                rob3="#"+Y2+"_"+X2;
                if(!$(rob3).has(".user1_pawn").length){
                    if(!$(rob3).has(".user2_pawn").length) $(rob3).addClass("mark_1");
                }
                if(X3!="N"){
                    rob4="#"+Y2+"_"+X3;   if(!$(rob4).has(".user1_pawn").length){
                        if(!$(rob4).has(".user2_pawn").length) $(rob4).addClass("mark_1");
                    }
                }
            }
/* DAMA */
            else if(S=="D"&&$(rob1).has(".user1_pawn").length){
                
                var id_1=$(rob1).attr("id");
                var Y=parseInt(id_1[0]);
                var X=parseInt(id_1[2]);
                var Y1=Y, Y2=Y, H1_1=0, H1_2=0, H1_3=0;
                
                for(var X1=X+1; X1<=8; X1++){
                    //++
                    Y1+=1;
                    if(Y1<=8&&H1_1==0){
                        var rob7="#"+Y1+"_"+X1;
                        if(!$(rob7).has(".user1_pawn").length){
                           if(!$(rob7).has(".user2_pawn").length){
                               Dx.push(X1); Dy.push(Y1);
                           }
                           else{ // Jeżeli jest na jakimś polu pion prrzeciwnika
                               H1_1=1;
                               var X2=X1+1, Y2=Y1+1, rob7="#"+Y2+"_"+X2;
                               if(!$(rob7).has(".user2_pawn").length){ //Jeżeli na następnym go nie ma
                                  for(;X2<=8;X2++){
                                      rob7="#"+Y2+"_"+X2;
                                      if(Y2>8) break;
                                        if(!$(rob7).has(".user1_pawn").length&&!$(rob7).has(".user2_pawn").length){
                                          Bx.push(X2); By.push(Y2);
                                      }
                                      else break; //jeżeli na jakimś dalszym jest jakiś inny pion to koniec
                                      Y2++;
                                  }
                               }
                           }
                        }
                        else H1_1=1;
                    }
                    //+-
                    Y2-=1;
                    if(Y2>=1&&H1_2==0){
                        var rob7="#"+Y2+"_"+X1;
                        if(!$(rob7).has(".user1_pawn").length){
                            if(!$(rob7).has(".user2_pawn").length){
                               Dx.push(X1); Dy.push(Y2);
                           }
                           else{ // Jeżeli jest na jakimś polu pion przeciwnika
                               H1_2=1;
                               var X2=X1+1, Y3=Y2-1, rob7="#"+Y3+"_"+X2;
                               if(!$(rob7).has(".user2_pawn").length){ //Jeżeli na następnym go nie ma
                                  for(;X2<=8;X2++){
                                      rob7="#"+Y3+"_"+X2;
                                      if(Y3<1) break;
                                        if(!$(rob7).has(".user1_pawn").length&&!$(rob7).has(".user2_pawn").length){
                                          Bx.push(X2); By.push(Y3);
                                      }
                                      else break; //jeżeli na jakimś dalszym jest jakiś inny pion to koniec
                                      Y3--;
                                  }
                               }
                           }
                        }
                        else H1_2=1;
                    }
                    //+=
                    if(H1_3==0){
                       var rob7="#"+Y+"_"+X1;
                       if(!$(rob7).has(".user1_pawn").length){
                           if(!$(rob7).has(".user2_pawn").length){
                               Dx.push(X1); Dy.push(Y);
                           }
                           else{ // Jeżeli jest na jakimś polu pion przeciwnika
                               H1_3=1;
                               var X2=X1+1, rob7="#"+Y+"_"+X2;
                               if(!$(rob7).has(".user2_pawn").length){ //Jeżeli na następnym go nie ma
                                  for(;X2<=8;X2++){
                                      rob7="#"+Y+"_"+X2; if(!$(rob7).has(".user1_pawn").length&&!$(rob7).has(".user2_pawn").length){
                                          Bx.push(X2); By.push(Y);
                                      }
                                      else break; //jeżeli na jakimś dalszym jest jakiś inny pion to koniec
                                  }
                               }
                           }
                       }
                       else H1_3=1;
                    }
                }
                Y1=Y; Y2=Y; H1_1=0; H1_2=0; H1_3=0;
                
                for(var X1=X-1; X1>=1; X1--){
                    //-+
                    Y1+=1;
                    if(Y1<=8&&H1_1==0){
                        var rob7="#"+Y1+"_"+X1;
                        if(!$(rob7).has(".user1_pawn").length){
                           if(!$(rob7).has(".user2_pawn").length){
                               Dx.push(X1); Dy.push(Y1);
                           }
                           else{ // Jeżeli jest na jakimś polu pion prrzeciwnika
                               H1_1=1;
                               var X2=X1-1, Y2=Y1+1, rob7="#"+Y2+"_"+X2;
                               if(!$(rob7).has(".user2_pawn").length){ //Jeżeli na następnym go nie ma
                                  for(;X2>=1;X2--){
                                      rob7="#"+Y2+"_"+X2;
                                      if(Y2>8) break;
                                        if(!$(rob7).has(".user1_pawn").length&&!$(rob7).has(".user2_pawn").length){
                                          Bx.push(X2); By.push(Y2);
                                      }
                                      else break; //jeżeli na jakimś dalszym jest jakiś inny pion to koniec
                                      Y2++;
                                  }
                               }
                           }
                        }
                        else H1_1=1;
                    }
                    //--
                    Y2-=1;
                    if(Y2>=1&&H1_2==0){
                        var rob7="#"+Y2+"_"+X1;
                        if(!$(rob7).has(".user1_pawn").length){
                            if(!$(rob7).has(".user2_pawn").length){
                                Dx.push(X1); Dy.push(Y2);
                           }
                           else{ // Jeżeli jest na jakimś polu pion przeciwnika
                               H1_2=1;
                               var X2=X1-1, Y3=Y2-1, rob7="#"+Y3+"_"+X2;
                               if(!$(rob7).has(".user2_pawn").length){ //Jeżeli na następnym go nie ma
                                  for(;X2>=1;X2--){
                                      rob7="#"+Y3+"_"+X2;
                                      if(Y3<1) break;
                                        if(!$(rob7).has(".user1_pawn").length&&!$(rob7).has(".user2_pawn").length){
                                          Bx.push(X2); By.push(Y3);
                                      }
                                      else break; //jeżeli na jakimś dalszym jest jakiś inny pion to koniec
                                      Y3--;
                                  }
                               }
                           }
                        }
                        else H1_2=1;
                    }
                    //-=
                    if(H1_3==0){
                       var rob7="#"+Y+"_"+X1;
                       if(!$(rob7).has(".user1_pawn").length){
                           if(!$(rob7).has(".user2_pawn").length){
                               Dx.push(X1); Dy.push(Y);
                           }
                           else{ // Jeżeli jest na jakimś polu pion przeciwnika
                               H1_3=1;
                               var X2=X1-1, rob7="#"+Y+"_"+X2;
                               if(!$(rob7).has(".user2_pawn").length){ //Jeżeli na następnym go nie ma
                                  for(;X2>=1;X2--){
                                      rob7="#"+Y+"_"+X2; if(!$(rob7).has(".user1_pawn").length&&!$(rob7).has(".user2_pawn").length){
                                          Bx.push(X2); By.push(Y);
                                      }
                                      else break; //jeżeli na jakimś dalszym jest jakiś inny pion to koniec
                                  }
                               }
                           }
                       }
                       else H1_3=1;
                    }
                }
                //=+
                Y1=Y; H1_1=0;
                
                for(Y1+=1; Y1<=8; Y1++){
                    if(H1_1==0){
                        var rob7="#"+Y1+"_"+X;
                        if(!$(rob7).has(".user1_pawn").length){
                            if(!$(rob7).has(".user2_pawn").length){
                                Dx.push(X); Dy.push(Y1);
                            }
                            else{ // Jeżeli jest na jakimś polu pion przeciwnika
                                H1_1=1;
                                var Y2=Y1+1, rob7="#"+Y2+"_"+X;
                                if(!$(rob7).has(".user2_pawn").length){ //Jeżeli na następnym go nie ma
                                    for(;Y2<=8;Y2++){
                                        rob7="#"+Y2+"_"+X;
                                        if(!$(rob7).has(".user1_pawn").length&&!$(rob7).has(".user2_pawn").length){
                                            Bx.push(X); By.push(Y2);
                                          }
                                         else break; //jeżeli na jakimś dalszym jest jakiś inny pion to koniec
                                    }
                                }
                            }
                        }
                        else break;
                    }
                }
                //=-
                Y1=Y; H1_1=0;
                
                for(Y1-=1; Y1>=1; Y1--){
                    if(H1_1==0){
                        var rob7="#"+Y1+"_"+X;
                        if(!$(rob7).has(".user1_pawn").length){
                            if(!$(rob7).has(".user2_pawn").length){
                                Dx.push(X); Dy.push(Y1);
                            }
                            else{ // Jeżeli jest na jakimś polu pion przeciwnika
                                H1_1=1;
                                var Y2=Y1-1, rob7="#"+Y2+"_"+X;
                                if(!$(rob7).has(".user2_pawn").length){ //Jeżeli na następnym go nie ma
                                    for(;Y2>=1;Y2--){
                                        rob7="#"+Y2+"_"+X;
                                        if(!$(rob7).has(".user1_pawn").length&&!$(rob7).has(".user2_pawn").length){
                                            Bx.push(X); By.push(Y2);
                                          }
                                         else break; //jeżeli na jakimś dalszym jest jakiś inny pion to koniec
                                    }
                                }
                            }
                        }
                        else break;
                    }
                }
                for(var i=0; i<Dx.length; i++){
                        var rob3;
                        $("body").append(Dy[i]+"_"+Dx[i]+"</br>");
                        rob3="#"+Dy[i]+"_"+Dx[i];
                        $(rob3).addClass("mark_1");
                }
                for(var i=0; i<Bx.length; i++){
                        var rob3="#"+By[i]+"_"+Bx[i];
                        $(rob3).addClass("mark_2");
                }
            }
/* KONIEC DAMY */
        }
    });
    $(document).on("click",".mark_1",function(){
            $(".mark_0").removeClass("mark_0");
            $(".mark_1").removeClass("mark_1");  
            $(".mark_2").removeClass("mark_2");   
        
            var color1;
            if(r==0){
                color1="bia";
            }
            if(r==1){
                color1="czerw";
            }
            
            if($(this).attr("id")[0]==1||$(rob2).find(".user1_pawn").hasClass("dama")) $(this).html('<img id="'+pawn_id+'" class="user1_pawn dama" draggable="false" src="pictures/pion_'+color1+'_dama.png"/>');
            else{
                $(this).html('<img id="'+pawn_id+'" class="user1_pawn pion" draggable="false" src="pictures/pion_'+color1+'.png"/>');
            }
        
            $(rob2).html("");
            rob2="";
    });
});