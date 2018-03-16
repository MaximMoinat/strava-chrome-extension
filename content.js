var tableContainer = document.getElementById('run-efforts-table');
// var tableContainer = document.getElementsByTagName('table')[1];
var tableRows = tableContainer.getElementsByTagName('tr');
var restTime = 0;
var previousFastRowIndex = 0;
for (var i = 0; i < tableRows.length; i++) {
  var tableRow = tableRows[i];
  var cells = tableRow.getElementsByTagName('td');
  // Header
  if (cells.length === 0) {
      var restHeader = document.createElement('th');
      restHeader.innerText = 'Rest';
      tableRow.appendChild(restHeader);
      
      var headers = tableRow.getElementsByTagName('th');
      headers[4].hidden = true;
      continue;
  }
  
  // Parse distance, time and pace from columns
  // TODO: object that processes the cells to an object
  var distText = cells[1].innerText;
  var distance = parseInt(distText[0]) * 1000 + parseInt(distText[2]+distText[3]+'0');
  
  var timeText = cells[2].innerText;
  var time = parseInt(timeText[0]) * 60 + parseInt(timeText[2]+timeText[3]);
  
  var paceText = cells[3].innerText;
  var pace = parseInt(paceText[0]) * 60 + parseInt(paceText[2]+paceText[3]);
  
  /**
  Logic 
  */
  cells[4].hidden = true;
  
  // Hide row if pace is too slow
  if (pace > 4*60) {
      tableRow.hidden = true;
      restTime += time;
      continue;
  }
  
  // Distance as metres
  cells[1].innerText = distance + 'm';
  
  // Create a cell with the rest time
  // TODO: to hms
  if (previousFastRowIndex > 0) {
      var restCell = document.createElement('td');
      restCell.innerText = restTime + 's';
      tableRows[previousFastRowIndex].appendChild(restCell);
  }
  
  // Reset restTime
  restTime = 0;
  previousFastRowIndex = i;
}

