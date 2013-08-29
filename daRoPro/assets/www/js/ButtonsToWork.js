
$(document).ready(function() {
   $('#PageOne').css({height:screen.height}); 
   $('#PageTwo').css({height:screen.height}); 

	//$(':input').autoNumeric('init', {aSign: "€ "});
	//$(":input").attr('maxlength','15');

	$(".money").attr('tabindex','-1');
	$(".money").bind('click change keydown keyup keypress keydown swipeleft input', function(){ return false;});
	$(".money").prop('disabled', true);
	$("#grossProfitMargin").prop('disabled', true);
	$("#grossMarginPercent").prop('disabled', true);
	$(".money").not($('#totalExpensesMoney')).css('background-color', 'lightgray' );
	
	//for marquee
	position = $("#grossMarginPercent").offset() ; // position = { left: 42, top: 567 }
	position.top = position.top + 13;
	position.left = position.left + 47;

	
	//$('marquee').show();
	
	//.append('<marquee direction="left" behavior="scroll" style="color: red; font-size: 22px; width: 183px; height: 46px; position:absolute ; top: 11; left: 11 ;">Rate Below Floor....</marquee>');	
  
	/**************INITAL STYLING******************************/
	$('marquee').hide();
   var warningPic='url(\"./images/warningMessage.png\")';
	
	var nothingPic='url(\"./images/nothing.png\")';
	var equalsPic= 'url(\"./images/equals.png\")';
	
	var billRatePic='url(\"./images/billRate.png\")';
	var payRatePic='url(\"./images/payRate.png\")';
	var markUpPic='url(\"./images/markUpPercent.png\")';
	var grossProfitMarginPic='url(\"./images/grossProfitMargin.png\")';
	var grossMarginPercentPic='url(\"./images/grossMarginPercent.png\")';	
	
	billRateFull           = 0;
	payRateFull            = 0;
	markUpFull             = 0;
  	grossProfitMarginFull  = 0;
	grossMarginPercentFull = 0;
   totalExpensesMoneyFull = 0;
   
	workersCompMoneyFull			   = 0;
   ficaAndFutaTaxMoneyFull      	= 0;
	suiMoneyFull                 	= 0;
	otherMoneyFull               	= 0;
	fundingAndProcessingMoneyFull	= 0;
	miscMoneyFull                	= 0;

   floor                         = 0;
   	
   $("[name='billRate']").css('background-image', billRatePic +','+ nothingPic );
	$("[name='payRate']").css('background-image', payRatePic +','+ nothingPic);
	$("[name='markUp']").css('background-image', markUpPic +','+ nothingPic);
	$("[name='grossProfitMargin']").css('background-image', grossProfitMarginPic +','+ nothingPic);
	$("[name='grossMarginPercent']").css('background-image', grossMarginPercentPic +','+ nothingPic);

	
	
	/***********************************FUNCTIONS***********************************************/
	/*******************************************************************************************/
	/*******************************************************************************************/

	/*********************Calculator Math Buttons*******************************/
	
	$('#keyAdd').bind('click', function(event){
		//highlight button, 
		$('#keyAdd.ui-btn-up-e').css({"background": "linear-gradient(#BA4444, red)"});
		//get onfocus value,
		var tempVal = $(".curFocus").val();	
		//allow user to type new value,
		$(".curFocus").val("");
		//if equals is pressed add getfocused value to new number-> recalculate etc
		//if focused is changed revert to old value
	
	});
	
	/****************************************************************************/
   
	function floorCompare()
	{
		floor            = Number($("#floor").val().replace(/[^0-9\.]+/g,"")) || 0;
		
     if (floor > 0) //check wheter comparison is even wanted
     {
    	 //var p = $("#grossMarginPercent");
    	 //var position = p.position();
         if (floor > grossMarginPercentFull) 
            {
        	  
               //alert("test");
               //flash warning
        	   $('marquee').remove();
               $('marquee').show();
                  //$('#toprows>div>form>p:nth-child(2)')
               	  $('#toprows')
               	  .prepend('<marquee direction="left" behavior="scroll" style="color: red; font-size: 22px; width: 183px; height: 46px; position:absolute ; top: '+ position.top +'px; left: '+ position.left +'px ;">Rate Below Floor....</marquee>');
               //$("[name='billRate']").css('background-image', billRatePic +','+ nothingPic +','+ warningPic);
            }
         else
            {
               //remove warning
               $('marquee').remove(); 
               //$("[name='billRate']").css('background-image', billRatePic +','+ nothingPic +','+ nothingPic);
            }	
     } 
	}

	function addDigit(myThis)
	{
		var newDigit = myThis.text();
		$(".curFocus").val($(".curFocus").val() + newDigit);
	}
      
	function backSpace()
	{
		$(".curFocus").val($(".curFocus").val().substr(0, $(".curFocus").val().length - 1));
	}
		
	function determineInOrOut()
	{
		/* DETERMINE WHAT TYPE OF INPUT/OUTPUT 1,2 or 3*/
		var dataCurrent = $(".curFocus").attr('data-x');
		if (dataCurrent === '3'){  
			$(".curFocus").attr('data-x','1');
			$('[type=tel][data-x="2"]').not($(".curFocus")).attr('data-x','3');
			$('[type=tel][data-x="1"]').not($(".curFocus")).attr('data-x','2');
		}else if (dataCurrent === '2'){
			$($(".curFocus")).attr('data-x','1');
			$('[type=tel][data-x="1"]').not($(".curFocus")).attr('data-x','2');
		}else{/*Add error checking for version 2, with a data-x counter.if != default then reset*/}	
	}	
 
	function styleInOrOut()
	{
		/***********************************OUTPUT STYLING********************************/
		/*COLOR OF TEXT DEPENDS ON IF GENERATED-OUTPUT OR USER-INPUT*/
		$('[type=tel][data-x="3"]').css({color:"red"});
		$('[type=tel]').not("[data-x='3']").css({color:"blue"});
		
		//$('[data-s="1"]').css('backgroundColor','skyblue');
		//$("[data-s='0']").css('backgroundColor','blue');
		
		/*ADDS EQUALS PICTURE WHERE CALCULATED*/
		$("[name='billRate'][data-x='3']").css('background-image', billRatePic + ',' + equalsPic);
		$("[name='payRate'][data-x='3']").css('background-image', payRatePic + ',' + equalsPic);
		$("[name='markUp'][data-x='3']").css('background-image', markUpPic + ',' + equalsPic);
		$("[name='grossProfitMargin'][data-x='3']").css('background-image', grossProfitMarginPic + ',' + equalsPic);
		$("[name='grossMarginPercent'][data-x='3']").css('background-image', grossMarginPercentPic + ',' + equalsPic);
		
		$("[name='billRate']").not("[data-x='3']").css('background-image', billRatePic+','+nothingPic);
		$("[name='payRate']").not("[data-x='3']").css('background-image', payRatePic+','+nothingPic);
		$("[name='markUp']").not("[data-x='3']").css('background-image', markUpPic+','+nothingPic);
		$("[name='grossProfitMargin']").not("[data-x='3']").css('background-image', grossProfitMarginPic +','+nothingPic);
		$("[name='grossMarginPercent']").not("[data-x='3']").css('background-image', grossMarginPercentPic +','+nothingPic);
	}
   
   function calculateSettings()
   {      		
      workersCompFull			   = Number($("[name='workersComp']").val().replace(/[^0-9\.]+/g,"")) || 0;
      ficaAndFutaTaxFull      	= Number($("[name='ficaAndFutaTax']").val().replace(/[^0-9\.]+/g,"")) || 0;
      suiFull                    = Number($("[name='sui']").val().replace(/[^0-9\.]+/g,"")) || 0;
      otherFull               	= Number($("[name='other']").val().replace(/[^0-9\.]+/g,"")) || 0;
      fundingAndProcessingFull	= Number($("[name='fundingAndProcessing']").val().replace(/[^0-9\.]+/g,""))|| 0;
      miscFull                	= Number($("[name='misc']").val().replace(/[^0-9\.]+/g,""))|| 0;
            
      workersCompMoneyFull          = ( workersCompFull * payRateFull)/100;
      ficaAndFutaTaxMoneyFull      	= ( ficaAndFutaTaxFull * payRateFull)/100;
      suiMoneyFull                 	= ( suiFull * payRateFull)/100;
      otherMoneyFull               	= ( otherFull * payRateFull)/100;
      fundingAndProcessingMoneyFull	= ( fundingAndProcessingFull * billRateFull)/100;
      miscMoneyFull                	= ( miscFull * billRateFull)/100;
      
      preTotalFull                = workersCompMoneyFull 
                                    + ficaAndFutaTaxMoneyFull 
                                    + suiMoneyFull 
                                    + otherMoneyFull 
                                    + fundingAndProcessingMoneyFull 
                                    + miscMoneyFull ;
                     
      totalExpensesMoneyFull      = payRateFull 
                                    + workersCompMoneyFull 
                                    + ficaAndFutaTaxMoneyFull 
                                    + suiMoneyFull 
                                    + otherMoneyFull 
                                    + fundingAndProcessingMoneyFull 
                                    + miscMoneyFull ;
   }
      
	function calculateMainPageValues()
	{
		/*****************************OUTPUT CALCULATIONS**********************************/
		/*GETS TYPE OF OUTPUT 1,2 OR 3*/
		dataBillRate = $("[name='billRate']").attr('data-x');
		dataPayRate = $("[name='payRate']").attr('data-x');
		dataMarkUp = $("[name='markUp']").attr('data-x');
		dataGrossProfitMargin = $("[name='grossProfitMargin']").attr('data-x');
		dataGrossMarginPercent = $("[name='grossMarginPercent']").attr('data-x');
	   		
		/*DETERMINES WHAT TWO INPUTS ARE MANUALLY ENTERED FROM USER */
		/*TEN SENERIOS*/
		if(dataBillRate !== '3' && dataPayRate !== '3') // if values are not the output (aka if values are input)
			{
				billRateFull          	= Number($("[name='billRate']").val().replace(/[^0-9\.]+/g,"")) || 0;
				payRateFull           	= Number($("[name='payRate']").val().replace(/[^0-9\.]+/g,"")) || 0;
				//done
				markUpFull              = ((billRateFull / payRateFull) - 1)*100;  
				grossProfitMarginFull   = billRateFull - totalExpensesMoneyFull;
				grossMarginPercentFull	= (grossProfitMarginFull / billRateFull)*100;
            
            $('[name="markUp"]').val( parseFloat(Math.round(markUpFull * 100) / 100).toFixed(2));
            $('[name="grossProfitMargin"]').val(parseFloat(Math.round(grossProfitMarginFull * 100) / 100).toFixed(2));
            $('[name="grossMarginPercent"]').val( parseFloat(Math.round(grossMarginPercentFull * 100) / 100).toFixed(2));
			}
		
		else if(dataBillRate !== '3' && dataMarkUp !== '3')
			{
				billRateFull          	= Number($("[name='billRate']").val().replace(/[^0-9\.]+/g,"")) || 0;
				markUpFull            	= Number($("[name='markUp']").val().replace(/[^0-9\.]+/g,"")) || 0;
        
				payRateFull           	= (100*billRateFull) /(markUpFull + 100);
            console.log("billRateFull =", billRateFull);
            console.log("markUpFull =", markUpFull);
            console.log("payRateFull =", payRateFull);
				grossProfitMarginFull   = billRateFull - totalExpensesMoneyFull;
				grossMarginPercentFull	= (grossProfitMarginFull / billRateFull)*100;

            $('[name="payRate"]').val(parseFloat(Math.round(payRateFull * 100) / 100).toFixed(2));
            $('[name="grossProfitMargin"]').val(parseFloat(Math.round(grossProfitMarginFull * 100) / 100).toFixed(2));
            $('[name="grossMarginPercent"]').val( parseFloat(Math.round(grossMarginPercentFull * 100) / 100).toFixed(2));
			}
		
		else if(dataBillRate !== '3' && dataGrossProfitMargin !== '3')
			{
				billRateFull          	= Number($("[name='billRate']").val().replace(/[^0-9\.]+/g,"")) || 0;
				grossProfitMarginFull 	= Number($("[name='grossProfitMargin']").val().replace(/[^0-9\.]+/g,"")) || 0;
				
				payRateFull             = billRateFull - grossProfitMarginFull - workersCompFull - ficaAndFutaTaxFull - suiFull - otherFull -fundingAndProcessingFull - miscFull;
				markUpFull              = ((billRateFull / payRateFull) - 1)*100;  //
				grossMarginPercentFull	= (grossProfitMarginFull / billRateFull)*100; //ok
                        
            $('[name="payRate"]').val( Math.round(payRateFull*100)/100);
            $('[name="markUp"]').val( Math.round(markUpFull*100)/100);
            $('[name="grossMarginPercent"]').val( Math.round(grossMarginPercentFull*100)/100);
			}
		
		else if(dataBillRate !== '3' && dataGrossMarginPercent !== '3')
			{
				billRateFull          	= Number($("[name='billRate']").val().replace(/[^0-9\.]+/g,"")) || 0;
				grossMarginPercentFull	= Number($("[name='grossMarginPercent']").val().replace(/[^0-9\.]+/g,"")) || 0;
				//done
				//payRate             = (billRate /(markUp + 1)); 
				payRateFull             = billRateFull - grossProfitMarginFull -workersCompFull - ficaAndFutaTaxFull - suiFull - otherFull - fundingAndProcessingFull - miscFull;
				markUpFull              = ((billRateFull / payRateFull) - 1)*100; 
				grossProfitMarginFull       = billRateFull - totalExpensesMoneyFull;
                        
            $('[name="payRate"]').val( payRateFull);
            $('[name="markUp"]').val( markUpFull);
            $('[name="grossProfitMargin"]').val( grossProfitMarginFull);
            
			}
		
		else if(dataPayRate !== '3' && dataMarkUp !== '3')
			{
				payRateFull          = Number($("[name='payRate']").val().replace(/[^0-9\.]+/g,"")) || 0;
				markUpFull           = Number($("[name='markUp']").val().replace(/[^0-9\.]+/g,"")) || 0;
				//done
				billRateFull        	= ((markUpFull * payRateFull)/100 ) + payRateFull; 
				grossProfitMarginFull   = billRateFull - totalExpensesMoneyFull;
				grossMarginPercentFull	= (grossProfitMarginFull / billRateFull)*100;
            
            $('[name="billRate"]').val(parseFloat(Math.round(billRateFull * 100) / 100).toFixed(2));
            
            $('[name="grossProfitMargin"]').val(parseFloat(Math.round(grossProfitMarginFull * 100) / 100).toFixed(2));
            
            $('[name="grossMarginPercent"]').val( parseFloat(Math.round(grossMarginPercentFull * 100) / 100).toFixed(2));
			}
		
		else if(dataPayRate !== '3' && dataGrossProfitMargin !== '3')
			{
				payRateFull           	= Number($("[name='payRate']").val().replace(/[^0-9\.]+/g,"")) || 0;
				grossProfitMarginFull 	= Number($("[name='grossProfitMargin']").val().replace(/[^0-9\.]+/g,"")) || 0;
				//done
				//billRate          = ((markUp * payRate)/100 ) + payRate; 
				billRateFull			= grossProfitMargin + totalExpensesMoneyFull;
				markUpFull              = ((billRateFull / payRateFull) - 1)*100; 
				grossMarginPercentFull	= (grossProfitMarginFull / billRateFull)*100;
            
            $('[name="billRate"]').val( billRateFull);
            $('[name="markUp"]').val( markUpFull);
            $('[name="grossMarginPercent"]').val( grossMarginPercentFull);
			}
		
		else if(dataPayRate !== '3' && dataGrossMarginPercent !== '3')
			{
				payRateFull           	= Number($("[name='payRate']").val().replace(/[^0-9\.]+/g,"")) || 0;
				grossMarginPercentFull	= Number($("[name='grossMarginPercent']").val().replace(/[^0-9\.]+/g,"")) || 0;
				//done
				//billRate          = ((markUp * payRate)/100 ) + payRate; 
				billRateFull            = profitMarginFull + totalExpensesMoneyFull;
				markUpFull              = ((billRateFull / payRateFull) - 1)*100;
				grossProfitMarginFull   = billRateFull-(payRateFull+(workersCompFull + ficaAndFutaTaxFull + suiFull + otherFull) + (fundingAndProcessingFull + miscFull));
            
            $('[name="billRate"]').val( billRateFull);
            $('[name="markUp"]').val( markUpFull);
            $('[name="grossProfitMargin"]').val( grossProfitMarginFull);
            
			}
		
		else if(dataMarkUp !== '3' && dataGrossProfitMargin !== '3')
			{
				markUpFull            =  Number($("[name='markUp']").val().replace(/[^0-9\.]+/g,"")) || 0;
				grossProfitMarginFull 	 =  Number($("[name='grossProfitMargin']").val().replace(/[^0-9\.]+/g,"")) || 0;
				//senerio has not enough info
				/*
				billRate            = ((markUp * payRate)/100 ) + payRate; 
				payRate           	= (billRate /(markUp + 1)); 
				grossMarginPercent	= (grossProfitMargin / billRate);*/
			}
		
		else if(dataMarkUp !== '3' && dataGrossMarginPercent !== '3')
			{
				markUpFull            	=  Number($("[name='markUp']").val().replace(/[^0-9\.]+/g,"")) || 0;
				grossMarginPercentFull	=  Number($("[name='grossMarginPercent']").val().replace(/[^0-9\.]+/g,"")) || 0;
				//senerio has not enough info
				/*billRate          = ((markUp * payRate)/100 ) + payRate; 
				payRate           	= (billRate /(markUp + 1));
				grossProfitMargin   = billRate-(payRate+(workersComp + ficaAndFutaTax + sui + other) + (fundingAndProcessing + misc));
				*/
			}
		
		else if(dataGrossProfitMargin !== '3' && dataGrossMarginPercent !== '3')
			{
				grossProfitMarginFull 	= Number($("[name='grossProfitMargin']").val().replace(/[^0-9\.]+/g,"")) || 0;
				grossMarginPercentFull	= Number($("[name='grossMarginPercent']").val().replace(/[^0-9\.]+/g,"")) || 0;
				//done if payRate formula is right
				billRateFull          	= (grossProfitMarginFull *100)/grossMarginPercentFull ; //line done
				payRateFull   = billRateFull - grossProfitMarginFull -preTotalFull;
				markUpFull              = ((billRateFull / payRateFull) - 1)*100;
            
            $('[name="billRate"]').val( billRateFull);
            $('[name="payRate"]').val( payRateFull);
            $('[name="markUp"]').val( markUpFull);
            
			}
		else {//this senerio should not happen
				billRateFull = 0;
				payRateFull = 0;
				markUpFull = 0;
				grossProfitMarginFull = 0;
				grossMarginPercentFull =  0;
			}
                  
	}
	
   function displaySettingValues(){
      $("[name='workersCompMoney']").val(parseFloat(Math.round(workersCompMoneyFull * 100) / 100).toFixed(2));
      $("[name='ficaAndFutaTaxMoney']").val(parseFloat(Math.round(ficaAndFutaTaxMoneyFull * 100) / 100).toFixed(2));
      $("[name='suiMoney']").val(parseFloat(Math.round(suiMoneyFull * 100) / 100).toFixed(2));
      $("[name='otherMoney']").val(parseFloat(Math.round(otherMoneyFull * 100) / 100).toFixed(2));
      $("[name='fundingAndProcessingMoney']").val(parseFloat(Math.round(fundingAndProcessingMoneyFull * 100) / 100).toFixed(2));
      $("[name='miscMoney']").val(parseFloat(Math.round(miscMoneyFull * 100) / 100).toFixed(2));         
      $('#totalExpensesMoney').val(parseFloat(Math.round(totalExpensesMoneyFull * 100) / 100).toFixed(2));
   }
   

	function update(){
		determineInOrOut();
		styleInOrOut();
   
      calculateMainPageValues();
      calculateSettings();
      calculateMainPageValues();
      
      displaySettingValues();
		      
      floorCompare();

	}
//Up

	
	
	/***********************************SWIPE DELETES*************************************/		
	/* Clear swiped Input plus all calculated Inputs */
	$('[type="tel"]').not('.BSET').bind('swipeleft',function(){
		$('[type=tel][data-x="3"]').stop().animate({'padding-right':250},'fast');
		//$('[type=tel][data-x="3"]').animate({color:'white'},250);
		$(this).stop().animate({'padding-right':250},'fast',function(){
			$(this).css({'padding-right':10});
			$('[type=tel][data-x="3"]').css({'padding-right':10});
			
			$(this).val('');
			$('[type=tel][data-x="3"]').val('');
		});
	});
	
	/*************************Settings Swipe Delete*********************************************/
	$('.BSET').bind('swipeleft',function(){
		var firstThree = $(this).attr("id").substr(0, 3); //gets first three chars of id
		//alert('firstThre='+firstThree);
		$(this).stop().animate({'padding-right':25},'fast');
		//$('[type=tel][data-x="3"]').animate({color:'white'},250);
		$(this).stop().animate({'padding-right':25},'fast',function(){
			$(this).css({'padding-right':10});
			//$(this).css({'padding-right':10});
			
			$(this).val('');
			$('.BSET[id^="'+firstThree+'"].money').val('0');//selector based off of matching id's  1st 3 chars
			//$('#totalExpensesMoney').val(getSettingsSum());
			//$('#workersComp').val('');
			update();
		});
	});
	$('#output2Form').bind('click',function(){
		$('#form-id > input,#form-id > textarea').each(function(index) {
	    console.log($(this).attr('name') + " = " + $(this).val());
		});	
	});	


	//CLEAR ALL BUTTON
	$('#clearAll').toggle(function(){
		//alert("hi");
		tempBillRate=           $("[name='billRate']").val();
		tempPayRate=            $("[name='payRate']").val();
		tempMarkUp=             $("[name='markUp']").val();
		tempGrossProfitMargin=  $("[name='grossProfitMargin']").val();
		tempGrossMArginPercent= $("[name='grossMarginPercent']").val();
		$('[data-x="3"],[data-x="2"],[data-x="1"]').stop().animate({'padding-right':250},'fast',function(){
		$(this).css({'padding-right':10});
		$(this).val('');
		$('#clearAll * .ui-btn-text').text("ReCalc");
		//$('#clearAll * .ui-btn-text').css({"background-color":"red"});
		var origColor = $('#clearAll .ui-btn-up-a').css("background");
		$('#clearAll .ui-btn-up-a').css({"background": "linear-gradient(#BA4444, #FF0000)"});
		});
		//UNDO ACTION
		},function(){
			$("[name='billRate']").val(tempBillRate);	        
			$("[name='payRate']").val(tempPayRate);	          
			$("[name='markUp']").val(tempMarkUp);	          
			$("[name='grossProfitMargin']").val(tempGrossProfitMargin);	
			$("[name='grossMarginPercent']").val(tempGrossMArginPercent);
			$('#clearAll .ui-btn-text').text("Clear All");
			$('#clearAll .ui-btn-up-a').css({"background": "linear-gradient(#444444, #2D2D2D)"});
	});
   
   function revertBackToClearAll()
	{
		if ( $('#clearAll .ui-btn-text').text() !== "Clear All")
		$('#clearAll .ui-btn-text').text("Clear All");
	}
	
   
	//CLEAR ALL BUTTON2
	$('#ClearAll2').bind('click', function(){

		$('.BSET').not('#totalExpensesMoney').stop().animate({'padding-right':250},'fast',function(){
		$(this).css({'padding-right':10});
		$(this).val('');
		});
	});
   
	//SETS UP FOR PROPER HIGHLIGHTING
	$(".BoxA,.BSET").focus(function() {
			$(".BoxA, .BSET").removeClass("curFocus");
			$(this).addClass("curFocus");
			
			focusedVal = $(this).val();
			
	});

	/*************************Selector Actions/Calback Functions******************************************/	
	$('[type="tel"]').bind('input', function(event){
			update();
	});
 
	$('#HomeButton ').bind('click', function(event){
				
		update();
		
	});
	/****************Calculator Number-Buttons (pageOne)********************/
	$('[data-Digit]').bind('click', function(event){
		
		addDigit($(this));	
		
		update();
		
	});	
 	 
	/**************LIMIT TO NUMBERS*********************/

	$('#BKSP').bind('click', function(event){
		
		backSpace();	
				
		update();		
		//sumOfMoney();
	});
	 
	
	$('.money').on('click',function(e) { 
	e.preventDefault(); 
	$(".curFocus").focus();
	$(this).blur();
	return; 
	});

	$('.money').on('focus',function(e) { $(this).blur(); });
	
	$('[data-DigitB]').bind('click',function(){

			newDigit = this.textContent;
			currentInput.value += newDigit;
	});

});

