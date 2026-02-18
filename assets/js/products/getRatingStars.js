const stars = [
  '<span class="material-icons-outlined">star</span>',
  '<span class="material-icons-outlined">star_half</span>',
  '<span class="material-icons-outlined">star_border</span>'
]

const getRatingStars = (rating) => {
  var temp = rating;
  var result = '';
  for (let i = 0; i < 5; i++) {
    if (temp >= 1) {
      result += stars[ 0 ];
      temp--;
    }
    else if (temp >= 0.5) {
      result += stars[ 1 ];
      temp -= 0.5;
    }
    else result += stars[ 2 ];
  }
  return result;
};

export default getRatingStars;