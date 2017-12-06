$(document).ready(function(){

function TOUR(title, matches) {
	this.title = title;
	this.matches = matches;
};
function MATCH(id, teamOwner, teamGuest) {
	this.id = id;
	this.teamOwner = teamOwner;
	this.teamGuest = teamGuest;
};
function isPower(n) {
	if  (n && (n & (n - 1)) === 0) {
		return n;
	} else {
		n++;
		return isPower(n);
	};
};
////////////////////////////////////////////
$('#getTable').click(function(event){
	event.preventDefault();
	let teams = isPower($('#teams').val());
	let name = $('#name').val();
	let tours = [];
	let allTeams = function(){
								let arr =[];
								for (let i=0; i<teams; i++){
									arr.push((i+1));
								};
								return arr;
							}()	;
	let TOURNAMENT = {
		title: name,
		teams: teams,
		tours: tours
	};
	function singleElimination(){
		let qOftours = getTours(teams, 0);
		console.log(TOURNAMENT);
		function getMatches(x) {
			let matches = [];
			for (let i = 0; i<x; i++){
				matches.push(new MATCH(Math.random().toString(36).substr(2, 9), allTeams[i], allTeams[i+1]));
				let rand = Math.floor(Math.random() * 2) + i;
				allTeams.splice(rand, 1);
			};
			return matches;
		};
		function getTours(teams, initialTours) {
			if (teams%2 == 0) {
				initialTours++;
				teams = teams/2;
				tours.push(new TOUR('Tour '+initialTours, getMatches(teams)));
				return getTours(teams, initialTours);
			} else {
				return initialTours;
			};
		};
		function render(o){
			let mNumber = 1;
			$('.container').remove();
			$('.tournament-title').append('<div class="t-title">'+o.title+'</div>');
			for (let i = 0; i<o.tours.length; i++) {
				$('.tournament-container').append('<div class="tour" id="tour'+(i+1)+'"><p>'+o.tours[i].title+'</p></div>');
				for (let j = 0; j<o.tours[i].matches.length; j++) {
					$('#tour'+(i+1)).append('<div class="match" id="match'+(i+1)+(j+1)+'"><div class="m-number">'+(mNumber)+'</div></div>');
					mNumber++;
					$('#match'+(i+1)+(j+1)).append('<div class="t-block"><div class="t-number">'+o.tours[i].matches[j].teamOwner+'</div><div class="t-name"></div><div class="t-number">'+o.tours[i].matches[j].teamGuest+'</div><div class="t-name"></div>');
				};
			};
		};
		render(TOURNAMENT);
	};
	if (!teams || !name || teams < 4 || teams > 128){
		alert('Please complete the form. Consider that number of teams must be between 4 and 128.');
	} else {
		singleElimination();
	};
});

});