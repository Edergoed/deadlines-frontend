function getCol(){
	var deadline = document.getElementsByClassName('deadline');
	for(i=0; i<deadline.length; i++){
		var data = deadline[i].getAttribute("data-distance");
		var changeData = deadline[i].setAttribute("data-distance", data-60);

		// var background = deadline[i].getAttribute("style");
		var newImage = colCalc(data, deadline, i);
		var changeData = deadline[i].setAttribute("style", "background-color:"+newImage);


		var day = 86400;
		if(data < day*28){
			if(data < day*7){
				deadline[i].parentNode.setAttribute("style", "background-color: #FE2746"); 
				if(data < 0){
					var deadline_class = deadline[i].className;
					if(aContainsB(deadline_class, 'hide_deadline')){
					
					}else{
					deadline[i].className = deadline[i].className + " hide_deadline";
					}
				}
			}else{
				deadline[i].parentNode.setAttribute("style", "background-color: #FFC300"); 
			}
		}
	}
}

function colCalc(difference, deadline, i){
	var day = 86400;
	var color = "";

	var progress = difference;
	var percentage;

	if(difference < day*28){
		percentage = ((difference-day*7) / ((day*28)-day*7));
		// percentage = (difference / (day*7));
		color = "rgba(0, 187, 211, "+ percentage +");"; //blue to yellow
			if(difference < day*7){
				percentage = (difference / (day*7));
				color = "rgba(255, 195, 0, "+ percentage +");"; //yellow to red
			}
	}else{
		color = "rgba(0, 187, 211, 1);"; //blue static
	}
	return color;
}

function aContainsB (a, b) {
    return a.indexOf(b) >= 0;
}

function getTime(difference){
	if($( ".count_down" ).length){
		var countdown = document.getElementsByClassName('count_down');
		var unit = document.getElementsByClassName('count_down_unit');
		var deadline = document.getElementsByClassName('deadline');
		for(i=0; i<deadline.length; i++){
			var data = deadline[i].getAttribute("data-distance");
			// var background = deadline[i].getAttribute("style");
			var time = remainingCalc(data);
			countdown[i].innerHTML = time[0];
			unit[i].innerHTML = time[1];
		}
	}

}

function remainingCalc(difference)
	{
		var weeks_remaining = Math.floor(difference / 604800);
		var days_remaining = Math.floor((difference % 604800)/ 86400);
		var hours_remaining = Math.floor((difference % 86400) / 3600);
		var minutes_remaining = Math.floor((difference % 3600) / 60);

		var remaining;
		var unit = '';

		if(weeks_remaining >= 1){
			remaining = weeks_remaining;
			unit = '<span>Weeks</span>';
			if(weeks_remaining == 1){
				remaining = weeks_remaining; 
				unit = '<span>Week</span>';
			}
		} else if (days_remaining >= 1){
			remaining = days_remaining;
			unit = '<span>Days</span>';
			if(days_remaining == 1){
				remaining = days_remaining;
				unit = '<span>Day</span>';
			}
		} else if (hours_remaining >= 1){
			remaining = hours_remaining;
			unit = '<span>Hours</span>';
			if(hours_remaining == 1){
				remaining = hours_remaining ;
				unit = '<span>Hour</span>';
			}
		} else if (minutes_remaining >= 1){
			remaining = minutes_remaining;
			unit = '<span>Minutes</span>';
			if(minutes_remaining == 1){
				remaining = minutes_remaining;
				unit = '<span>Minutes</span>';
			}
		} else {
			remaining = 0;
			unit = '<span></span>';
		}

		remaining = ("0" + remaining).slice(-2);

		return [remaining, unit];
	}