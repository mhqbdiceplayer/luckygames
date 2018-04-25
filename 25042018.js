var _currentUser = user.name;
var _authenUser;
var _checkUser = false;
$.get('https://raw.githubusercontent.com/mhqbdiceplayer/luckygames/master/user.txt', function(data, status) {
	
}).done(function(data) {
	_authenUser = JSON.parse(data);
	for (i = 0; i < _authenUser.length; i++)
		if (_authenUser[i] == _currentUser) _checkUser = true;
	if (_checkUser == true) {
		$('#listContainer').css('display', 'none');
		$('#news').css('display', 'none');
		$('#main').css('min-width', '100%');
		$('#body').css('background', 'none');
		$('#content').css('height', '0px');
		$('#controlContainer').css('background', 'none');
		$('#controlContainer').css('visibility', 'hidden');
		$('#footer').css('display', 'none');
		$('#gameContainer').css('display', 'none');
		$('#frontText').css('display', 'none');
		$('div[class="tab tab-show"]:nth-child(4)').css('display','none');
		$('#header').html('<div id="left"><input id="baseBetAmount" type="text" value="" style="text-align: center;" placeholder="Base Bet"> <input id="overBalance" type="text" value="" style="text-align: center;" placeholder="Over Balance"> <input id="underBalance" type="text" value="" style="text-align: center;" placeholder="Under Balance"><br><br> <button id="minBet" onclick="minBet();">Min BET</button> <button id="startButton" onclick="startBot();">Start BOT</button> <button id="stopButton" onclick="stopBot();">Stop BOT</button> <button id="resetButton" onclick="resetBot();">Reset BOT</button> <button id="exitButton" onclick="exit();">Exit BOT</button><br><br> <button id="hideStatistics" onclick="hideStatistics();">Hide Statistics</button> <button id="viewStatistics" onclick="viewStatistics();">View Statistics</button> <p id="statistics"> Coin Play: ' + ($('#coin').val()).toUpperCase() + '<br> Time Play: <span id="playDay">0</span>:<span id="playHour">0</span>:<span id="playMinute">0</span>:<span id="playSecond">0</span><br> Speed Bet: <span id="speedBet">0.00</span><br> Total Balance: <span id="myBalance">0</span><br> Current Profit: <span id="currentProfit">0.00000000</span><br> Largest Bet: <span id="largestBet">0.00000000</span><br> Bet: <span id="bet">0</span> | Win: <span id="win">0</span> | Lose: <span id="lose">0</span><br> Win Streak: <span id="winStreak">0</span> | Max Win Streak: <span id="maxWinStreak">0</span><br> Lose Streak: <span id="loseStreak">0</span> | Max Lose Streak: <span id="maxLoseStreak">0</span></p> <p id="author"><h3 style="margin: 0px;">Dice BOT Luckygames v<span id="ver"></span></h3> Strategy by <span id="strategy"></span><br> Develop by <a href="https://www.facebook.com/mhqbdiceplayer" target="_blank" style="color: #fff;">Mai Hoang Quoc Bao</a><br> Donate to developer via <a href="https://luckygames.io/user/mhqbdicer" target="_blank"  style="color: #fff;">Send tips</a></p></div> <div id="right"> <button id="hideLog" onclick="hideLog();">Hide Log</button> <button id="viewLog" onclick="viewLog();">View Log</button> <div id="showLog"></div></div> <div id="end"><button id="hideLog" onclick="hideChart();">Hide Chart</button> <button id="viewChart" onclick="viewChart();">View Chart</button> <div id="chart"> </div></div>');
		$('#header').css('width', '80%');
		$('#header').css('background', 'none');
		$('#header').css('margin', 'auto');
		$('#header').css('padding-top', '20px');
		$('#header').css('border', 'none');
		$('#left').css('width', '50%');
		$('#left').css('float', 'left');
		$('#left').css('color', '#fff');
		$('#left').css('font-size', '14px');
		$('#right').css('width', '50%');
		$('#right').css('float', 'right');
		$('#showLog').css('overflow', 'auto');
		$('#showLog').css('width', '100%');
		$('#showLog').css('height', '365px');
		$('#showLog').css('margin-top', '20px');
		$('#showLog').css('padding', '5px');
		$('#showLog').css('color', '#fff');
		$('#showLog').css('font-size', '14px');
		$('#showLog').css('border', '1px solid #fff');
		$('#end').css('width', '100%');
		$('#end').css('padding-top', '10px');
		$('#end').css('clear', 'both');
		$('#chart').css('margin-top', '20px');
		$('#strategy').html('<a href="https://www.facebook.com/groups/hocviendicecoin/" target="_blank" style="color: #fff;">Hoc vien Dicecoin</a>');
		$('#ver').html('25.04.2018');
		$('#myBalance').html(_startBalance);
		$('#stopButton').prop('disabled', true);
		showLog('BOT has apliped!');
		randomizeSeed();
		return;
	} else {
		alert('you do not have permission to use, contact the developer!');
		window.location.replace('https://www.facebook.com/mhqbdiceplayer');
	}
});
var _startBalance = parseFloat($('#balance').val());
var _onBalance = 0;

var _profit = 0;
var _currentProfit = 0;
var _largestProfit = 0;

var _overBalance = 0;
var _underBalance = 0;

var _prediction = 50;
var _direction = 'over';
var _baseBetAmount = 0;
var _betAmount = 0;

var _basenBetAmount = 0;
var _largestBet = 0;

var _bet = 0;
var _win = 0;
var _winStreak = 0;
var _maxWinStreak = 0;

var _lose = 0;
var _loseStreak = 0;
var _maxLoseStreak = 0;

var _startTime = 0;
var _onTime = 0;
var _playTime = 0;
var _playDay = 0;
var _playHour = 0;
var _playMinute = 0;
var _playSecond = 0;

var _speedBet = 0;

var _stoped = true;

var _runLog = 0;

var _turn = 0;

var _skill = {
	skill_1: function(_gameResult, _resultNumber) {
		if (_gameResult == 'win') {
			_prediction = 50;
			_direction = 'over';
			_betAmount = _baseBetAmount;
		} else {
			if (_resultNumber > 50){
				_direction = 'over';
			} else if (_resultNumber > 80){
				_direction = 'under';
			} else if (_resultNumber < 20){
				_direction = 'over';
			} else if (_resultNumber > 20 &&_resultNumber < 40){
				_direction = 'over';
			} else if (_resultNumber > 50 && _resultNumber < 80 ){
				_direction = 'under';
			}
			_betAmount *= 2.2;
		}
	},
	skill_2: function(_gameResult) {
		_prediction = Math.floor((Math.random() * (10 - 5 + 1)) + 5);
		_direction = 'under';
		if (_gameResult == 'win') {
			_betAmount = _baseBetAmount;
		} else {
			if (_loseStreak > 18) {
				_loseStreak = 0;
				_turn = 0;
			}
			if (_loseStreak%6 == 0) {
				_betAmount *= 2;
			}
		}
	},
}

var _dps = [];
var _chart;

$.getScript('https://canvasjs.com/assets/script/canvasjs.min.js')
	.done(function( script, textStatus ) {
		_dps = [{x: 0, y: 0}];
		_chart = new CanvasJS.Chart('chart',{
			theme: 'light2',
			zoomEnabled: true,
			height: 340,
			title :{
				text: 'Live Profit',
				fontSize: 14
			},
			data: [{
				type: 'stepLine',
				dataPoints : _dps,
			}]
		});
		_chart.render();
	}
);

function updateChart(_gameResult, _bet, _currentProfit) {
	var _x = _bet;
	var _y = _currentProfit;
	var _type = _gameResult;
	if (_type == 'win') {
        var _color = '#2eab5b';
    } else {
        var _color = '#ab2e40';
    }
	_dps.push({x: _x, y: _y, color: _color});
	if (_dps[_dps.length - 2]) {
		_dps[_dps.length - 2].lineColor = _color;
	}
	if (_dps.length >  1000) {
		_dps.shift();				
	}
	_chart.render();
}

function minBet() {
	$('#baseBetAmount').val((0.00000001).toFixed(8));
}

function hideStatistics() {
	document.getElementById('statistics').hidden = true;
}

function viewStatistics() {
	document.getElementById('statistics').hidden = false;
}

function hideLog() {
	document.getElementById('showLog').hidden = true;
}

function viewLog() {
	document.getElementById('showLog').hidden = false;
}

function hideChart() {
	document.getElementById('chart').hidden = true;
}

function viewChart() {
	document.getElementById('chart').hidden = false;
}

function showLog(string) {
	$('<p style="margin: 0;">' +string + '</p>').appendTo('#showLog');
	$('#showLog').stop().animate({ scrollTop: $('#showLog')[0].scrollHeight }, 100);
}

function startBot() {
	_stoped = false;
	_startTime = new Date();
	if ($('#baseBetAmount').val() == '') {
		_baseBetAmount = _startBalance * 0.000001;
	} else {
		_baseBetAmount = parseFloat($('#baseBetAmount').val());
	}
	if ($('#overBalance').val() == '') {
		_overBalance = 0;
	} else {
		_overBalance = parseFloat($('#overBalance').val());
	}
	if ($('#underBalance').val() == '') {
		_underBalance = 0;
	} else {
		_underBalance = parseFloat($('#underBalance').val());
	}
	_betAmount = _baseBetAmount;
	$('#baseBetAmount').val(_baseBetAmount.toFixed(8));
	$('#baseBetAmount').prop('disabled', true);
	$('#overBalance').val(_overBalance.toFixed(8));
	$('#overBalance').prop('disabled', true);
	$('#underBalance').val(_underBalance.toFixed(8));
	$('#underBalance').prop('disabled', true);
	$('#minBet').prop('disabled', true);
	$('#startButton').prop('disabled', true);
	$('#stopButton').prop('disabled', false);
	$('#resetButton').prop('disabled', true);
	$('#exitButton').prop('disabled', true);
	doBet();
}

function stopBot(){
	_stoped = true;
	$('#baseBetAmount').prop('disabled', false);
	$('#overBalance').prop('disabled', false);
	$('#underBalance').prop('disabled', false);
	$('#minBet').prop('disabled', false);
	$('#startButton').prop('disabled', false);
	$('#stopButton').prop('disabled', true);
	$('#resetButton').prop('disabled', false);
	$('#exitButton').prop('disabled', false);
	showLog('BOT has stopped!');
}

function resetBot() {
	$.getScript('https://canvasjs.com/assets/script/canvasjs.min.js')
		.done(function( script, textStatus ) {
			_dps = [{x: 0, y: 0}];
			_chart = new CanvasJS.Chart('chart',{
				theme: 'light2',
				zoomEnabled: true,
				height: 350,
				title :{
					text: 'Live Profit',
					fontSize: 14
				},
				data: [{
					type: 'stepLine',
					dataPoints : _dps,
				}]
			});
			_chart.render();
		}
	);
	randomizeSeed();
	
	_startBalance = parseFloat($('#balance').val());
	_onBalance = 0;
	
	_profit = 0;
	_currentProfit = 0;
	_largestProfit = 0;
	
	_overBalance = 0;
	_underBalance = 0;
	
	_prediction = 50;
	_direction = 'over';
	_baseBetAmount = 0;
	_betAmount = 0;
	
	_basenBetAmount = 0;
	_largestBet = 0;
	
	_bet = 0;
	_win = 0;
	_winStreak = 0;
	_maxWinStreak = 0;
	
	_lose = 0;
	_loseStreak = 0;
	_maxLoseStreak = 0;
	
	_startTime = 0;
	_onTime = 0;
	_playTime = 0;
	_playDay = 0;
	_playHour = 0;
	_playMinute = 0;
	_playSecond = 0;
	
	_speedBet = 0;
	
	_stoped = true;
	
	_runLog = 0;
	
	_turn = 0;
	
	$('#speedBet').html(_speedBet.toFixed(2));
	$('#playDay').html(_playDay);
	$('#playHour').html(_playHour);
	$('#playMinute').html(_playMinute);
	$('#playSecond').html(_playSecond);
	$('#currentProfit').html(_currentProfit.toFixed(8));
	$('#largestBet').html(_largestBet.toFixed(8));
	$('#bet').html(_bet);
	$('#win').html(_win);
	$('#lose').html(_lose);
	$('#winStreak').html(_winStreak);
	$('#maxWinStreak').html(_maxWinStreak);
	$('#loseStreak').html(_loseStreak);
	$('#maxLoseStreak').html(_maxLoseStreak);
	$('#showLog p').remove();
	showLog('BOT has reset!');
}

function exit() {
	var _donate = confirm('Please donate to author!');
	if (_donate == true) {
		window.open('https://luckygames.io/user/mhqbdicer', '_blank');
		location.reload();
	} else {
		return;
	}
}

function doBet() {
	if (_stoped === false) {
		jQuery.ajax({
			url: '/ajx/',
			type: 'POST',
			dataType: 'html',
			timeout: 2e4,
			data: {
				game: 'dice',
				coin: $('#coin').val(),
				betAmount: _betAmount,
				prediction: _prediction,
				direction: _direction,
				clientSeed: $('#clientSeed').val(),
				serverSeedHash: $('#serverSeedHash').html(),
				action: 'playBet',
				hash: user.hash
			},
			success: function(data) {
				var _a = JSON.parse(data);
				var _result = _a.result;
				if (_result === true) {
					var _gameResult = _a.gameResult;
					var _resultNumber = _a.resultNumber;
					var _balance = _a.balance;
					$('#serverSeedHash').html(_a.serverSeedHash);
					$('#prevServerSeed').html(_a.prevServerSeed);
					$('#prevServerSeedHash').html(_a.prevServerSeedHash);
					$('#prevClientSeed').html(_a.prevClientSeed);
					$('#balance').val(_a.balance);
					_onBalance = _a.balance;
					_profit = _a.profit;
					_fixProfit = parseFloat(_profit);
					_currentProfit = _onBalance - _startBalance;
					_onTime = new Date().getTime();
					_playTime = _onTime - _startTime;
					_playDay = Math.floor(_playTime / (1000 * 60 * 60 * 24));
					_playHour = Math.floor((_playTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					_playMinute = Math.floor((_playTime % (1000 * 60 * 60)) / (1000 * 60));
					_playSecond = Math.floor((_playTime % (1000 * 60)) / 1000);
					_speedBet = parseFloat((_bet / _playTime) * 1000);
					_bet++;
					_runLog++;
					showLog('Betting ' + _betAmount.toFixed(8) + ' at ' + _prediction + '% ' + _direction + ' - roll ' + _resultNumber + ' to ' + _gameResult + ' ' + _fixProfit.toFixed(8));
					if (_gameResult == 'win') {
						_win++;
						_winStreak++;
						_loseStreak = 0;
					} else {
						_lose++;
						_winStreak = 0;
						_loseStreak++;
					}
					if (_runLog > 1000) {
						_runLog = 0;
						$('#showLog p').remove();
					}
					if (_currentProfit >= _largestProfit) {
						_largestProfit = _currentProfit;
					}
					if (_betAmount > _onBalance) {
						stopBot();
						showLog('You lose!');
					} else {
						if (_overBalance > 0 && _onBalance > _overBalance) {
							stopBot();
							showLog('Over balance!');
						} else {
							if (_underBalance > 0 && _onBalance <= _underBalance) {
								stopBot();
								showLog('Under balance!');
							} else {
								if (_currentProfit > 0 && _currentProfit >= _largestProfit) {
									_turn = Math.floor((Math.random() * (1 - 0 + 1)) + 0);
									_baseBetAmount = _onBalance * 0.000001;
									$('#baseBetAmount').val(_baseBetAmount.toFixed(8));
								}
								if (_turn == 0) {
									_skill.skill_1(_gameResult, _resultNumber);
								} else if (_turn == 1) {
									_skill.skill_2(_gameResult);
								}
							}
						}
					}
					if (_betAmount > _largestBet) {
						_largestBet = _betAmount;
					}
					if (_winStreak > _maxWinStreak) {
						_maxWinStreak = _winStreak;
					}
					if (_loseStreak > _maxLoseStreak) {
						_maxLoseStreak = _loseStreak;
					}
					$('#myBalance').html(_onBalance);
					$('#speedBet').html(_speedBet.toFixed(2));
					$('#playDay').html(_playDay);
					$('#playHour').html(_playHour);
					$('#playMinute').html(_playMinute);
					$('#playSecond').html(_playSecond);
					$('#currentProfit').html(_currentProfit.toFixed(8));
					$('#largestBet').html(_largestBet.toFixed(8));
					$('#bet').html(_bet);
					$('#win').html(_win);
					$('#lose').html(_lose);
					$('#winStreak').html(_winStreak);
					$('#maxWinStreak').html(_maxWinStreak);
					$('#loseStreak').html(_loseStreak);
					$('#maxLoseStreak').html(_maxLoseStreak);
					updateChart(_gameResult, _bet, _currentProfit);
					doBet();
				} else {
					doBet();
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				doBet();
			},
			timeout: function(xhr, ajaxOptions, thrownError) {
				check = true;
			},
			abort: function(xhr, ajaxOptions, thrownError) {
				check = true;
			}
		});
	} else {
		
	}
}
