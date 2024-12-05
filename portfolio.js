// Load and display portfolio
document.addEventListener("DOMContentLoaded", () => {
    const portfolioTable = document.getElementById('portfolio-table');
    const totalValueElement = document.getElementById('total-value');

    // Retrieve portfolio from localStorage
    let portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];

    // Function to update the portfolio table and total value
    function updatePortfolio() {
        // Populate table
        portfolioTable.innerHTML = portfolio.map((item, index) => `
            <tr>
                <td>${item.name}</td>
                <td>${item.holdings}</td>
                <td>$${item.value.toFixed(2)}</td>
                <td><button onclick="removeFromPortfolio(${index})">Remove</button></td>
            </tr>
        `).join('');

        // Calculate and display total value
        const totalValue = portfolio.reduce((sum, item) => sum + (item.holdings * item.value), 0);
        totalValueElement.textContent = `Total Value: $${totalValue.toFixed(2)}`;
    }

    // Function to remove an item from the portfolio
    window.removeFromPortfolio = (index) => {
        portfolio.splice(index, 1); // Remove the item at the specified index
        localStorage.setItem('portfolio', JSON.stringify(portfolio)); // Update localStorage
        updatePortfolio(); // Refresh the table and total value
    };

    // Initial update to load data
    updatePortfolio();
});