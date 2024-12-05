document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('bitcoin-chart').getContext('2d');

    // Fetch Bitcoin price data
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
        .then(response => response.json())
        .then(data => {
            const labels = data.prices.map(price => new Date(price[0]).toLocaleDateString());
            const prices = data.prices.map(price => price[1]);

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Bitcoin Price (Last 7 Days)',
                        data: prices,
                        borderColor: '#1e88e5',
                        borderWidth: 1.5,
                        pointRadius: 0, // Simplifies the chart by removing points
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: { color: '#eaeaea' }
                        },
                        y: {
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            ticks: { color: '#eaeaea' }
                        }
                    },
                    plugins: {
                        legend: { display: false } // Hides the legend for simplicity
                    }
                }
            });
        })
        .catch(error => console.error("Error fetching Bitcoin data:", error));
});