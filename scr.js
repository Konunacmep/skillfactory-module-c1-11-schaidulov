//эти две переменные нам понадобятся несколько раз, поэтому запомним ссылки в const. Инпуты минут и секунд
const inMinuteScoreboard = $('input[name=MinuteScoreboard]');
const inSecondScoreboard = $('input[name=SecondScoreboard]');
//время и id интервала
//хоть это и не красиво - менять в функциях глобальную переменную,
//но в данном случае так удобнее, так что будем работать с ней напрямую, не передавая
let time = 0;
let IntervalID = null;
// функция, меняющая значения табло
const ChangeHTMLScores = () => {
	// добавление нуля для чисел < 10
	const CheckAndAddZero = (number) => {
		if (number < 10) {
			return `0${number}`;
		} else {
			return `${number}`;
		}
	}
	// отлов границ
	if (time < 0) {time = 0}
	if (time > 3599) {time = 3599;}
	inMinuteScoreboard.value(CheckAndAddZero(time/60 | 0))
	inSecondScoreboard.value(CheckAndAddZero(time - (time/60 | 0)*60))
}
// привязываем действия кнопкам
$('.PlusSecond').click( () => {
	$('h2').text('');
	time += 1;
	ChangeHTMLScores();
});
$('.MinusSecond').click( () => {
	$('h2').text('');
	time -= 1;
	ChangeHTMLScores();
});
$('.PlusMinute').click( () => {
	$('h2').text('');
	time += 60;
	ChangeHTMLScores();
});
$('.MinusMinute').click( () => {
	$('h2').text('');
	time -= 60;
	ChangeHTMLScores();
});
$('.Set5Mins').click( () => {
	$('h2').text('');
	pauseTimer();
	time = 5 * 60;
	ChangeHTMLScores();
})
$('.Set10Mins').click( () => {
	$('h2').text('');
	pauseTimer();
	time = 10 * 60;
	ChangeHTMLScores();
})
// функция для допуска в input только чисел, если цифр введено много, берет первую пару
function validateInp(inp, mult=1) {
	pauseTimer();
	const temp = inp.match(/^\d{1,2}/);
	if (temp) {
		time = temp * mult;
	}
}
// проверка инпута
inMinuteScoreboard.change(function() {
	validateInp(this.value, 60);
	ChangeHTMLScores();
})
inSecondScoreboard.change(function () {
	validateInp(this.value);
	ChangeHTMLScores();
})
//функция обратного отсчета
const countDown = () => {
		ChangeHTMLScores();
		if (time <= 0) {
			$('h2').text('Время вышло');
			$('.Pause').disabled(false);
			time = 0;
			pauseTimer();
		} else {
			time -= 1;
			if (!IntervalID) {
				$('.Pause').disabled(false);
				IntervalID = setInterval(countDown, 1000);
			}
		}
}
//старт
$('.Start').click( () => {
	$('h2').text('');
	$('.Start').disabled(true);
	countDown();
})
//пауза отсчета с очисткой всех сопутствующих переменных
const pauseTimer = () => {
	if (IntervalID) {
		clearInterval(IntervalID);
		IntervalID = null;
	}
	$('.Start').disabled(false);
	$('.Pause').disabled(true);
}
// действия на остальные кнопки
$('.Pause').click( () => {
	pauseTimer();
})
$('.Stop').click( () => {
	pauseTimer();
	time = 0;
	$('.Start').disabled(false);
	$('h2').text('');
	ChangeHTMLScores();
})