const displayNoneClass = 'd-none';

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
              let classToApplyForReps = 'same';
              let classToApplyForWeights = 'same';

              if (sameExercise) {
                const sameRepsExerciseAsNumber = Number(sameExercise.reps);
                const currentRepsExerciseAsNumber = Number(currentExercise.reps);

                if (sameRepsExerciseAsNumber !== currentRepsExerciseAsNumber) {
                  classToApplyForReps = sameRepsExerciseAsNumber > currentRepsExerciseAsNumber ? 'low' : 'high';
                }

                const sameWeightExerciseAsNumber = Number(sameExercise.weight);
                const currentWeightExerciseAsNumber = Number(currentExercise.weight);

                if (sameWeightExerciseAsNumber !== currentWeightExerciseAsNumber) {
                  classToApplyForWeights = sameWeightExerciseAsNumber > currentWeightExerciseAsNumber ? 'low' : 'high';
                }
              }

              const tableRowMarkup = `
              <tr style="${!sameExercise ? 'background-color: yellow;' : ''}">
                <td>${j + 1}</td>
                <td>${currentExercise.name}</td>
                <td class="comparison comparison-${classToApplyForWeights}">${currentExercise.weight}</td>
                <td class="comparison comparison-${classToApplyForReps}">${currentExercise.reps}</td>
              </tr>`;

              $('.js-workout-' + (i + 1))
                .find('tbody')
                .append(tableRowMarkup);
            }
          }

          $('.js-workout-1').removeClass(displayNoneClass);
          $('.js-workout-2').removeClass(displayNoneClass);
        }
      }
    });
  });

  // Refresh comparison tables
  $('.js-compare-workouts-select').on('change', function () {
    $('.js-workout-header-1').empty();
    $('.js-workout-header-2').empty();

    $('.js-workout-1').addClass(displayNoneClass).find('tbody').empty();
    $('.js-workout-2').addClass(displayNoneClass).find('tbody').empty();

    $('.js-compare-workouts').prop('disabled', false);
  });

  $('.js-exercise-select').on('change', function (e) {
    $('.js-exercise-header').text();
    $('.js-exercises-images img').addClass(displayNoneClass);

    const exerciseName = $(this).val();
    const $exerciseImage = $(`img[data-exercise-name='${exerciseName}']`);
    const $exerciseTitle = $('.js-exercise-header').text(exerciseName);

    $exerciseImage.removeClass(displayNoneClass);
    $exerciseTitle.removeClass(displayNoneClass);
  });

  $('.js-compare-exercises').on('click', function (event) {
    event.preventDefault();

    const selectedValue = $('.js-compare-exercises-select').find(':selected').text();

    $.ajax({
      url: '/workout/exercises',
      type: 'GET',
      data: { exercise: selectedValue },
      success: function (data) {
        console.log(data);
      }
    });
  });
});
