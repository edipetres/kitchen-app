<template>
  <div class="wrapper">
    <div class="navbar">
      <b>Kitchen Weekers</b>
    </div>
    <div class="content">
      <div class="current-week section">
        <h1>This Week</h1>
        <label for="">{{ currentWeek.staff }}</label>
      </div>

      <div class="rating section">
        <h1>Daily Vote</h1>
        <label for="">Is the kitchen clean today?</label>
        <!-- <form class="slider">
          <div class="form-group">
            <input type="range" class="form-control-range" min="0" max="10"  v-model="vote">
            <h3 class="pull-right">{{ vote }}</h3>
          </div>
        </form> -->

        <div class="vote">
          <div class="buttons">
            <span id="like">
              <span>
                {{currentWeek.upVotes}}
              </span>
              <svg style="width:35px;height:35px" viewBox="0 0 24 24" @click="vote('up')" class="icon" :class="{faded: !votes.canVote}">
                <path fill="rgb(131,209,8)" d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />
              </svg>
            </span>

            <span id="dislike">
              <svg style="width:35px;height:35px;" viewBox="0 0 24 24" @click="vote('down')" class="icon" :class="{faded: !votes.canVote}">
                <path fill="rgb(192,33,13)" d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z" />
              </svg>
              {{currentWeek.downVotes}}
            </span>
          </div>


          <div class="progress">
            <div class="progress-bar" role="progressbar" :style="'width: ' + ratingPercentage + '%'"
              aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>

          <div class="results pull-right">
            <h3>{{ ratingPercentage }}% this week</h3>
            <!-- total votes {{ currentWeek.upVotes + currentWeek.downVotes }} -->
          </div>

        </div>
      </div>

      <div class="todo">
        <h1>Today</h1>
        <form>
          <div class="form-check checklist" v-for="(todo, key) in checklist" :key="key">
            <input type="checkbox" class="form-check-input" :id="'todo' + key" v-model="todo.done">
            <label class="form-check-label" :for="'todo' + key" :class="{ strikethrough: todo.done}">{{ todo.text }}</label>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
  components: {
    
  },
  created() {
    this.initData()
    this.loadVote()
  },
  computed: {
    ratingPercentage: function () {
      const percentage = this.currentWeek.upVotes * 100 / (this.currentWeek.upVotes + this.currentWeek.downVotes)
      return percentage.toFixed(1)
    }
  },
  data() {
    return {
      currentWeek: {
        staff: '',
        upVotes: 0,
        downVotes: 0,
        _id: '',
      },
      votes: {
        canVote: true
      },
      checklist: [{
          text: 'Wipe surfaces',
          done: false,
        },
        {
          text: 'Check shopping list',
          done: false,
        },
        {
          text: 'Clean sink',
          done: false,
        },
      ]
    }
  },
  methods: {
    initData: function () {
      const self = this
      this.$http.get('/weeks').then((response) => {
        self.currentWeek = response.data.currentWeek
      })
    },
    vote: function (voteType) {
      const self = this
      if (!this.votes.canVote) {
        return alert('You have already voted today, thanks! Come back again tomorrow and cast your vote. ')
      }
      this.saveVote(voteType)      

      this.$http.post(`/weeks/${this.currentWeek._id}/vote/${voteType}`).then((response) => {
        self.currentWeek = response.data.updatedWeek
      })
    },
    saveVote: function (voteType) {
      this.votes.canVote = false
      localStorage.setItem('VOTE_TYPE', voteType)
      localStorage.setItem('VOTE_DATE', new Date())
    },
    loadVote: function () {
      const today = new Date();
      const voteType = localStorage.getItem('VOTE_TYPE')
      const voteDate = new Date(localStorage.getItem('VOTE_DATE'))

      if (!voteType || !voteDate) {
        return
      }

      const isToday = (today.toDateString() == voteDate.toDateString());
      if (isToday) {
        console.log('Voted today.')
        this.votes.canVote = false
      } else {
        console.log('Voted but not today.')
        this.votes.canVote = true
      }
    }
  }
}
</script>
<style lang="scss">

.wrapper {
  .navbar {
    text-align: center;
    background-color: #263238;
    color: white;
    height: 50px;
    b {
      margin: auto;
    }
  }

  .content {
    padding: 30px;

    .slider {
      margin: 20px 0 30px 0;
    }
    .pull-right {
      text-align: right;
    }
    .vote {
      font-weight: 700;
      font-size: 22px;

      .buttons {
        text-align: center;
        margin-top: 25px;
        display: block;
      }

      #dislike {
        margin-left: 10px;
      }

      .faded {
        opacity: 0.6;
      }
    }
    .results {
      margin-top: 10px;
    }
    .progress {
      margin-top: 20px;
      background-color: #e8e8e8;
      height: 7px;
      .progress-bar {
        background-color: #546e7a;
      }
    }
    .form-checl-label {
      padding-left: 7px;
    }
    .checklist {
      font-size: 20px;
      margin-bottom: 6px;
    }
    .strikethrough {
      text-decoration: line-through;
    }
  }
}

.section {
  margin-bottom: 30px;
}

</style>
