async function fetchStockData() {
  const stockSymbol = document.getElementById('stockSymbol').value.toUpperCase();
  const apiKey = 'cp4af09r01qnnlpar3e0cp4af09r01qnnlpar3eg';
  const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data || !data.c) {
      alert('Invalid stock symbol or API limit reached. Please try again later.');
      return;
    }

    const stockTable = document.getElementById('stockTable').getElementsByTagName('tbody')[0];
    stockTable.innerHTML = '';

    const row = stockTable.insertRow();
    const timeCell = row.insertCell(0);
    const openCell = row.insertCell(1);
    const highCell = row.insertCell(2);
    const lowCell = row.insertCell(3);
    const closeCell = row.insertCell(4);
    const volumeCell = row.insertCell(5);

    const currentTime = new Date().toLocaleString();

    timeCell.innerHTML = currentTime;
    openCell.innerHTML = data.o;
    highCell.innerHTML = data.h;
    lowCell.innerHTML = data.l;
    closeCell.innerHTML = data.c;
    volumeCell.innerHTML = 'N/A'; // Finnhub does not provide volume in the quote endpoint
  } catch (error) {
    console.error('Error fetching stock data:', error);
    alert('Failed to fetch stock data. Please try again later.');
  }
}
