$(document).ready(function () {
  $('.js-compare-workouts').on('click', function (event) {
    event.preventDefault();

    const selectedValue = $('.js-compare-workouts-select').find(':selected').text();

    const data = {
      selectedWorkout: selectedValue
    };

    $.ajax({
      url: '/workout/workouts',
      type: 'GET',
      data: data,
      success: function (data) {},
      error: function (xhr) {}
    });
  });
});
