$(document).ready(function(){
  $('.single_item').slick({
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/right.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          dots: true,
          arrows: false
        }
      }
    ]
  });
});
document.addEventListener('DOMContentLoaded', function() {
    const depositTypeSelect = document.getElementById('deposit-type');
    const depositTermSelect = document.getElementById('deposit-term');
    const calculateButton = document.getElementById('calculate-button');
    const resultDiv = document.getElementById('result');

    const depositData = {
        replenishable: [
            { term: '6 месяцев', rate: 0.20 },
            { term: '1 год', rate: 0.22 },
            { term: '1,5 года', rate: 0.15 },
            { term: '2 года', rate: 0.10 }
        ],
        emergency: [
            { term: '3 месяца', rate: 0.20 },
            { term: '6 месяцев', rate: 0.22 },
            { term: '9 месяцев', rate: 0.23 },
            { term: '1 год', rate: 0.24 },
            { term: '1,5 года', rate: 0.18 },
            { term: '2 года', rate: 0.15 }
        ]
    };

    function populateTerms() {
        const selectedType = depositTypeSelect.value;
        depositTermSelect.innerHTML = '';
        depositData[selectedType].forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.rate;
            optionElement.textContent = option.term;
            depositTermSelect.appendChild(optionElement);
        });
    }

    function calculateDeposit() {
        const depositAmount = parseFloat(document.getElementById('deposit-amount').value);
        const depositRate = parseFloat(depositTermSelect.value);
        const depositTerm = depositTermSelect.options[depositTermSelect.selectedIndex].textContent;
        const depositType = depositTypeSelect.options[depositTypeSelect.selectedIndex].textContent;

        if (isNaN(depositAmount) || isNaN(depositRate)) {
            resultDiv.textContent = 'Пожалуйста, заполните все поля.';
            return;
        }

        const finalAmount = depositAmount * (1 + depositRate * (depositTerm.includes('года') ? parseInt(depositTerm) : parseInt(depositTerm) / 12));
        resultDiv.innerHTML = `Вклад "${depositType}" на срок "${depositTerm}" на сумму ${depositAmount.toLocaleString()} руб.<br>В конце срока вы получите ${finalAmount.toLocaleString()} руб.`;
    }

    depositTypeSelect.addEventListener('change', populateTerms);
    calculateButton.addEventListener('click', calculateDeposit);

    // Initial population of terms
    populateTerms();
});
