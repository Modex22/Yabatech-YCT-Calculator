'use strict';

(function () {
  // focus on input when window loads
  var utmeInput = document.querySelector('#utme-input');
  utmeInput.focus();

  // get utme aggregate
  var getUtmeAgg = function getUtmeAgg() {
    // get utme score
    var utmeScore = parseInt(utmeInput.value, 10);
    // calculate utme aggregate
    return parseFloat((utmeScore / 8).toFixed(2));
  };

  // get post utme score
  var pUtmeScore = function pUtmeScore() {
    return parseInt(document.querySelector('#p-utme-input').value, 10);
  };


 // get bonus score
 var bonusScore = function bonusScore() {
  return parseInt(document.querySelector('#bonus-input').value, 10);
};


  // get waec aggregate
  var getWaecAgg = function getWaecAgg() {
    var grades = Array.from(document.querySelectorAll('.waec-grades'));
    return grades.map(function (grade) {
      return parseFloat(grade.value);
    }).reduce(function (grade, sum) {
      grade += sum;
      return grade;
    }, 0);
  };

  // get total aggregate
  var totalAgg = function totalAgg(utme, pUtme, waec, bonus) {
    return parseFloat(utme + pUtme + waec + bonus).toFixed(2);
  };

  // display counting score
  var showScore = function showScore() {
    var innerCircle = document.querySelector('#inner-circle');

    const utme = getUtmeAgg();
    const pUtme = pUtmeScore();
    const waec = getWaecAgg();
    const bonus = bonusScore();

    var score = totalAgg(utme, pUtme, waec, bonus);
    var i = 0.00;

    var increment = setInterval(function () {
      i += 1.23;
      innerCircle.innerHTML = i.toFixed(2);
      if (i >= score) {
        innerCircle.innerHTML = score;
        clearInterval(increment);
      }
    }, 25);
  };

  (function () {
    // get flipping cards
    var front = document.querySelector('#front');
    var back = document.querySelector('#back');

    // get forms
    var details = document.querySelector('#details');
    var result = document.querySelector('#result');

    // listen for submit events on details form
    details.addEventListener('submit', function (e) {
      e.preventDefault();

      // show result
      front.classList.add('at-back');
      back.classList.remove('at-back');
      result.firstElementChild.focus();
      showScore();
    });

    // listen for submit event on result form
    result.addEventListener('submit', function (e) {
      e.preventDefault();

      details.reset();
      utmeInput.focus();
      back.classList.add('at-back');
      front.classList.remove('at-back');
    });
  })();
})();