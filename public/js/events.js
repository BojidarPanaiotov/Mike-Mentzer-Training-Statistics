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
        if (data.workouts.length === 2) {
          let workoutToCompare = [];

          for (let i = 0; i < data.workouts.length; i++) {
            if (i === 0) {
              workoutToCompare = data.workouts[1].exercises;
            } else {
              workoutToCompare = data.workouts[0].exercises;
            }

            $('.js-workout-header-' + (i + 1)).text(`${data.workouts[i].type} ${data.workouts[i].date}`);
            for (let j = 0; j < data.workouts[i].exercises.length; j++) {
              const currentExercise = data.workouts[i].exercises[j];
              const sameExercise = workoutToCompare.find((w) => w.name === currentExercise.name);
              let classToApply = 'same';

              if (sameExercise) {
                const sameExerciseAsNumber = Number(sameExercise.reps);
                const currentExerciseAsNumber = Number(currentExercise.reps);

                if (sameExerciseAsNumber && currentExerciseAsNumber) {
                  if (sameExerciseAsNumber > currentExerciseAsNumber) {
                    classToApply = 'low';
                  } else if (sameExerciseAsNumber < currentExerciseAsNumber) {
                    classToApply = 'high';
                  }
                }
              }

              const tableRowMarkup = `<tr>
                <td>${j + 1}</td>
                <td>${currentExercise.name}</td>
                <td>${currentExercise.weight}</td>
                <td class="comparison comparison-${classToApply}">${currentExercise.reps}</td>
              </tr>`;

              $('.js-workout-' + (i + 1))
                .find('tbody')
                .append(tableRowMarkup);
            }
          }

          $('.js-workout-1').removeClass('d-none');
          $('.js-workout-2').removeClass('d-none');
        }
      }
    });
  });
});
