/**
 * Component Chart
 */

const componentChart = function (wordsCount, wordsUniqCount, wordsImportantLength, wordsStopLength) {

  var elChart = document.getElementById('chart');
  if (elChart) {
    var ctx = elChart.getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Words", "Unique Words", "Important Words", "Stop Words"],
        datasets: [{
          label: '# words',
          data: [wordsCount, wordsUniqCount, wordsImportantLength, wordsStopLength],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}

export default componentChart;