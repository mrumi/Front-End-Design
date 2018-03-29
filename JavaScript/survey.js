$(function() {
	$("#panel-div").tabs({ collapsible: true });
});

$(function() {
	$("#ck").click(checkCookie);
});

$(document).ready(function() {
	$('#logo,#logo1').hover(
		function () { $('#image-dialog,#image-dialog1').dialog(); }, 
		function () { $('#image-dialog,#image-dialog1').dialog('close'); } 
	); });

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {        
		var welcome = timeset() + user + ", welcome to Assignment#3";			
		document.getElementById('greet').innerHTML=welcome;
		document.getElementById('check').innerHTML="<a href='javascript:wrongPerson()'>Click here if you are not "+user+"</a>";	
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 30);
		   location.reload();
       }
    }	
}

function getCookie(uname) {
    var name = uname + "=";
    var all_cookie = document.cookie.split(';');
    for(var i=0; i<all_cookie.length; i++) {
        var c = all_cookie[i];
        while (c.charAt(0)==' ') 
			c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(uname,value,days) {
    var exp_date = new Date();
    exp_date.setTime(exp_date.getTime() + (days*24*60*60*1000));
    var expires = "expires=" + exp_date.toGMTString();
    document.cookie = uname+"="+value+"; "+expires;
}

function timeset(){
	var current = new Date(); 
	var hour = current.getHours(); 
	var greeting;
	if ( hour < 12 ) 
		greeting="Good Morning ";
	else{
		hour = hour - 12; 
		if ( hour < 6 )
			greeting="Good Afternoon ";
		else
			greeting="Good Evening ";
	}
	return greeting;
}

function wrongPerson(){	
	setCookie("username", "", 30);	
	location.reload();
}	

function calculate(){			
	var data=document.getElementById('num').value;			
	var all_nums=data.split(",");
	var avg_msg=null;
	var max_msg=null;
	if (all_nums.length<10){
		var message="Provide at least 10 numbers, you have written only "+all_nums.length+" numbers.";
		document.getElementById('msg').innerHTML=message;		
	}
	else{
		document.getElementById('msg').innerHTML=null;
		var sum=0;
		var skip=false;
		var maxval=parseInt(all_nums[0],10);			
		for (var i=0;i<all_nums.length;i++){
			var cur_num=parseInt(all_nums[i],10);
			if(cur_num<1 || cur_num>100){
				var error_msg="All number must be in the range of 1-100,"+
					" you have included "+cur_num+" which is out of range.";
				document.getElementById('msg').innerHTML=error_msg;				
				skip=true;
				break;
			}
			sum=sum+cur_num;
			maxval=Math.max(maxval,cur_num);
		}
		if (!skip){
			var avarege=(sum/all_nums.length).toFixed(2).toString();
			avg_msg="Average: "+avarege;
			max_msg="Maximum: "+maxval;
		}
	}
	document.getElementById('avg').innerHTML=avg_msg;
	document.getElementById('max').innerHTML=max_msg;
}

function handleSubmit(){
	var fname = document.getElementById('fname').value;
	var mname = document.getElementById('mname').value;
	var lname = document.getElementById('lname').value;	
	var address = document.getElementById('address').value;	
	var email = document.getElementById('email').value;	
	var isSelected = false;
	var count = 0;
	var radioCheck = document.getElementsByName('interested');
	var boxCheck = document.getElementsByName('thingsliked');
	document.getElementById("fname_error").innerHTML=null;
	document.getElementById("mname_error").innerHTML=null;
	document.getElementById("lname_error").innerHTML=null;	
	document.getElementById("address_error").innerHTML=null;
	document.getElementById("email_error").innerHTML=null;
	document.getElementById("like_error").innerHTML=null;
	document.getElementById("choice_error").innerHTML=null;
	
	if (!(/(^[a-zA-Z]+(\s*[a-zA-Z]+)*$)|(^$)/.test(fname))) {
		document.getElementById("fname_error").innerHTML="First name contains invalid character";
		document.getElementById("fname").value=null;
		document.getElementById("fname").focus();
		return false;
	}	
	if (!(/(^[a-zA-Z]+(\s*[a-zA-Z]+)*$)|(^$)/.test(mname))) {
		document.getElementById("mname_error").innerHTML="Middle name contains invalid character";
		document.getElementById("mname").value=null;
		document.getElementById("mname").focus();
		return false;		
	}
	if (!(/(^[a-zA-Z]+(\s*[a-zA-Z]+)*$)|(^$)/.test(lname))) {
		document.getElementById("lname_error").innerHTML="Last name contains invalid character";
		document.getElementById("lname").value=null;
		document.getElementById("lname").focus();
		return false;				
	}
	if (!(/(^[a-zA-Z0-9]+(\s*[a-zA-Z0-9]+)*$)|(^$)/.test(address))) {		  
		document.getElementById("address_error").innerHTML="Address contains invalid character";
		document.getElementById("address").value=null;
		document.getElementById("address").focus();
		return false;				
	}
	var mail_regex =/(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;	    
	
	if(!(mail_regex.test(email))){
		document.getElementById("email_error").innerHTML="invalid email address";
		document.getElementById("email").value=null;
		document.getElementById("email").focus();
		return false;						
	}
	for (var i = 0; i < boxCheck.length; i++) {
		if(boxCheck[i].checked) {
			count  = count + 1;			
		}
	}	
	if(count<2){ 		
		document.getElementById("like_error").innerHTML="Please select at least 2 things that you liked about campus";		
		document.getElementById("like_error").focus();
		return false;				
	}
	for (var i = 0; i < radioCheck.length; i++) {
		if(radioCheck[i].checked) {
			isSelected = true;
			break;
		}
	}
	if(!isSelected){ 		
		document.getElementById("choice_error").innerHTML="Please select what make you interested about GMU";
		document.getElementById("choice_error").focus();
		return false;		
	}
	return true;
}

function handleReset(){
	document.getElementById('msg').innerHTML = null;
	document.getElementById('avg').innerHTML = null;
	document.getElementById('max').innerHTML = null;
}

function validateZip(zip){
	var url = "zipcode.json";
	var xmlhttp = new XMLHttpRequest();			
	try{
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var json_data = JSON.parse(xmlhttp.responseText);					
				showCityState(json_data,zip);
			}
			else if (xmlhttp.status == 500){
				document.getElementById("zip_error").innerHTML = "Zip validation service not avaliable";
				document.getElementById("city").innerHTML=null;
				document.getElementById("state").innerHTML=null;
			}
			else{
				document.getElementById("zip_error").innerHTML = json_data.ErrorText;
				document.getElementById("city").innerHTML=null;
				document.getElementById("state").innerHTML=null;
			}
		};
		xmlhttp.open("GET", url, true);	
		xmlhttp.send(null);
	}catch (exception){
		document.getElementById("zip_error").innerHTML="Request Failed";
		document.getElementById("city").innerHTML=null;
		document.getElementById("state").innerHTML=null;
	}
}

function showCityState(data,zip) {
	var found=false;
    for(var i = 0; i < data.length; i++) {
		if (zip==data[i].zip){
			found=true;
			document.getElementById("city").innerHTML=data[i].city;
			document.getElementById("state").innerHTML=data[i].state;
			document.getElementById("zip_error").innerHTML = null; 
		}
    }
	if (found==false){
		document.getElementById("city").innerHTML=null;
		document.getElementById("state").innerHTML=null;
		document.getElementById("zip_error").innerHTML="An invalid zip";
	}
}
