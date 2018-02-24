Vue.component('star-rating', VueStarRating.default);

var app = new Vue({
  el: '#app',
  data: {
    number: '',
    max: '',
    current: {},
    loading: true,
    addedName: '',
    addedComment: '',
    date: '',
    comments: {},
    rating: 0,
    totalRating: 0,
    numberRatings: 0,
    testAverage: 0,
    averageRatings: {},
  },
  created: function() {
    this.xkcd();
  },
  computed: {
    theAverages: function() {
      //console.log(this.averageRatings[this.number].sum/this.averageRatings[this.number].number);
      if (this.averageRatings[this.number] === undefined)
        return 0;
      return (this.averageRatings[this.number].sum/this.averageRatings[this.number].number);
      //return -1;
    },
    month: function() {
      var month = new Array;
      if (this.current.month === undefined)
  return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    }
  },
  watch: {
    number: function(value,oldvalue) {
      if (oldvalue === '') {
  this.max = value;
      } else {
  this.xkcd();
      }
    },
  },
methods: {
    xkcd: function() {
      this.loading = true;
      fetch('https://xkcd.now.sh/' + this.number).then(response => {
	return response.json();
      }).then(json => {
	this.current = json;
  //console.log(this.current)
  this.loading = false;
  this.number = json.num;
  //console.log(this.number)
	return true;
      }).catch(err => {
        this.number = this.max;
      });
    },
    previousComic: function() {
      this.number = this.current.num - 1;
    },
    getMax: function(max) {
      max = Math.floor(max);
      //console.log(max);
      return max;
    },
    nextComic: function() {
      //max = Math.floor(max);
      max = this.getMax(this.max);
      //console.log(max);
      if (this.number === max)
      {
        this.number = 1;
      }
      else
        this.number = this.current.num + 1;
    },
    getRandom: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      //console.log(max)
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive 
    },
    randomComic: function() {
      this.number = this.getRandom(1, this.max);
    },
    firstComic: function() {
      /*min = Math.ceil(min);*/
      this.number = 1;
    },
    lastComic: function() {
      max = this.getMax(this.max);
      //console.log(max);
      this.number = max;
    },
    todayDate: function() {
      var today = new Date();
      var hour = today.getHours();
      var minute = today.getMinutes();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      if(dd<10) {
        dd = '0'+dd
      }
      if(mm<10) {
        mm = '0'+mm
      }
      if (minute<10) {
        minute = '0'+minute
      }
      today = hour + ":" + minute + " on " + mm + '-' + dd + '-' + yyyy;
      return today;
    },
    addComment: function() {
      if (!(this.number in this.comments))
  Vue.set(app.comments, this.number, new Array);
      this.comments[this.number].push({author:this.addedName,today:this.todayDate(),text:this.addedComment});
      this.addedName = '';
      this.addedComment = '';
    },
    addRating: function(rating) {
      console.log(this.rating);
      if (!(this.number in this.averageRatings))
        Vue.set(this.averageRatings,this.number,{sum:0,number:0});
      this.averageRatings[this.number].sum += rating;
      this.averageRatings[this.number].number += 1;
      
      console.log(this.averageRatings[this.number]);
      console.log(this.averageRatings[this.number].sum);
      console.log(this.averageRatings[this.number].number);
    },
  }
});

/*data: {
    number: '',
    max: '',
    current: {},
    loading: true,
    addedName: '',
    addedComment: '',
    date: '',
    comments: {},
    rating: 0,
    totalRating: 0,
    numberRatings: 0,
    testAverage: 0,
    averageRatings: {},
  },*/

/*if (!(this.number in this.averageRatings))
        Vue.set(app.averageRatings, this.number, new Array);
      this.totalRating = this.totalRating + this.rating;
      this.numberRatings = this.numberRatings + 1;
      this.testAverage = this.totalRating/this.numberRatings;
      console.log(this.testAverage);
      this.averageRatings[this.number].push({total:this.totalRating,numbers:this.numberRatings,averaged:this.testAverage});
      console.log(this.averageRatings[this.number])*/