$(document).ready(function () {
  // Get workouts for comparison
  $('.js-compare-workouts').on('click', function (event) {
    event.preventDefault();

    const $button = $(this);
    const selectedValue = $('.js-compare-workouts-select').find(':selected').text();

    const data = {
      workouts: [selectedValue]
    };

    $button.prop('disabled', true);

    $.ajax({
      url: '/workout/workouts',
      type: 'GET',
      data: data,
      success: function (data) {
        if (data.workouts) {
          let workoutCount = 0;
          for (let i = 0; i < data.workouts.length; i++) {
            const exercise = data.workouts[i].exercises;
            workoutCount++;
            for (let j = 0; j < exercise.length; j++) {
              const tableRowMarkup = `<tr>
              <td>${j + 1}</td>
              <td>${exercise[j].name}</td>
              <td>${exercise[j].reps}</td>
            </tr>`;

              $('.js-workout-' + workoutCount)
                .find('tbody')
                .append(tableRowMarkup);
            }
          }
        }
      },
      error: function (xhr) {}
    });
  });
});
