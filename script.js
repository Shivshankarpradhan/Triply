async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === '' || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    try {
         const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);

        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        alert('Error fetching exchange rates. Please try again later.');
    }
}

         function startCountdown() {
            const tripDate = new Date(document.getElementById('tripDate').value);
            if (isNaN(tripDate)) {
                alert('Please select a valid date.');
                return;
            }
            const updateCountdown = () => {
                const now = new Date();
                const timeDiff = tripDate - now;
                if (timeDiff <= 0) {
                    document.getElementById('countdown').textContent = 'Your trip is here! 🎉';
                    clearInterval(interval);
                    return;
                }
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                document.getElementById('countdown').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            };
            updateCountdown();
            const interval = setInterval(updateCountdown, 1000);
        }

          function calculateBudget() {
            const totalBudget = parseFloat(document.getElementById('totalBudget').value) || 0;
            const accommodation = parseFloat(document.getElementById('accommodation').value) || 0;
            const transport = parseFloat(document.getElementById('transport').value) || 0;
            const food = parseFloat(document.getElementById('food').value) || 0;
            const activities = parseFloat(document.getElementById('activities').value) || 0;
            const totalSpent = accommodation + transport + food + activities;
            const remainingBudget = totalBudget - totalSpent;
            if (remainingBudget < 0) {
                document.getElementById('Result').textContent = `Over budget by ₹${Math.abs(remainingBudget).toFixed(2)}`;
                document.getElementById('Result').style.color = "#e63946";
            } else {
                document.getElementById('Result').textContent = `Remaining budget: ₹${remainingBudget.toFixed(2)}`;
                document.getElementById('Result').style.color = "#007bff";
            }
        }

        const phrases = {
            en: ['Hello!', 'Thank you!', 'Where is the bathroom?', 'Help!', 'How much does this cost?'],
            es: ['¡Hola!', '¡Gracias!', '¿Dónde está el baño?', '¡Ayuda!', '¿Cuánto cuesta esto?'],
            fr: ['Bonjour!', 'Merci!', 'Où sont les toilettes?', 'Au secours!', 'Combien ça coûte?'],
            de: ['Hallo!', 'Danke!', 'Wo ist die Toilette?', 'Hilfe!', 'Wie viel kostet das?'],
           
        };

        const languageSelect = document.getElementById('languageSelect');
        const phraseList = document.getElementById('phraseList');

        function updatePhrases() {
            const selectedLanguage = languageSelect.value;
            phraseList.innerHTML = '';
            phrases[selectedLanguage].forEach(phrase => {
                const li = document.createElement('li');
                li.textContent = phrase;
                li.onclick = () => navigator.clipboard.writeText(phrase);
                phraseList.appendChild(li);
            });
        }

        languageSelect.addEventListener('change', updatePhrases);
        updatePhrases();

/* AI RECOMMANDATion */
        function getRecommendation() {
  const input = document.getElementById('travelInput').value.toLowerCase().trim();
  const resultDiv = document.getElementById('recommendationResult');

  if (!input) {
    resultDiv.textContent = "Please enter a travel preference!";
    return;
  }

  const recommendations = {
    beach: "How about visiting Bali, Maldives, or Hawaii for a relaxing beach vacation?",
    adventure: "Try New Zealand, Costa Rica, or Nepal for thrilling adventures and outdoor activities!",
    culture: "Explore Rome, Kyoto, or Istanbul to dive deep into rich cultural experiences.",
    nature: "Consider visiting Banff, Patagonia, or the Amazon rainforest for breathtaking nature.",
    food: "Savor culinary delights in Italy, Thailand, or Mexico!",
    shopping: "Check out Dubai, Paris, or New York for an amazing shopping spree."
  };

  // Find matching recommendation or default message
  let found = false;
  for (const key in recommendations) {
    if (input.includes(key)) {
      resultDiv.textContent = recommendations[key];
      found = true;
      break;
    }
  }

  if (!found) {
    resultDiv.textContent = "Sorry, no specific recommendations found. Try keywords like 'beach', 'adventure', 'culture', 'nature', 'food', or 'shopping'.";
  }
}
