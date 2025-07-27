document.addEventListener('DOMContentLoaded', function() {
  const ageForm = document.getElementById('ageForm');
  const resultContainer = document.getElementById('result');
  
  ageForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get input values
      const day = parseInt(document.getElementById('day').value);
      const month = parseInt(document.getElementById('month').value);
      const year = parseInt(document.getElementById('year').value);
      
      // Validate inputs
      if (isNaN(day) || day < 1 || day > 31) {
          showError('Please enter a valid day (1-31)');
          return;
      }
      
      if (isNaN(month) || month < 1 || month > 12) {
          showError('Please select a valid month');
          return;
      }
      
      if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
          showError(`Please enter a valid year (1900-${new Date().getFullYear()})`);
          return;
      }
      
      // Validate date
      const inputDate = new Date(year, month - 1, day);
      if (inputDate.getDate() !== day || inputDate.getMonth() + 1 !== month || inputDate.getFullYear() !== year) {
          showError('Please enter a valid date');
          return;
      }
      
      // Calculate age
      const today = new Date();
      let ageYears = today.getFullYear() - year;
      let ageMonths = today.getMonth() + 1 - month;
      let ageDays = today.getDate() - day;
      
      // Adjust for negative months or days
      if (ageDays < 0) {
          ageMonths--;
          const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
          ageDays += lastDayOfMonth;
      }
      
      if (ageMonths < 0) {
          ageYears--;
          ageMonths += 12;
      }
      
      // Display result
      showResult(ageYears, ageMonths, ageDays);
  });
  
  function showError(message) {
      resultContainer.innerHTML = `<p class="error">${message}</p>`;
      resultContainer.classList.remove('hidden');
  }
  
  function showResult(years, months, days) {
      // Check if birthday
      if (months === 0 && days === 0) {
          resultContainer.innerHTML = `
              <h2>Happy Birthday! 🎉</h2>
              <p>You are exactly <strong>${years}</strong> years old today!</p>
          `;
      } else {
          resultContainer.innerHTML = `
              <h2>Your Age</h2>
              <p><strong>${years}</strong> years, <strong>${months}</strong> months, and <strong>${days}</strong> days</p>
          `;
      }
      resultContainer.classList.remove('hidden');
  }
});