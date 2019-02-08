<template>
  <div class="wrapper">
    <div class="navbar">
      <b>Kitchen Weekers</b>
    </div>
    <div class="content">
      <div class="current-week section">
        <h1>This Week</h1>
        <label for="">{{ kitchenStaff }}</label>
      </div>

      <div class="rating section">
        <h1>Vote</h1>
        <label for="">Tell us how clean the kitchen is today.</label>
        <form class="slider">
          <div class="form-group">
            <input type="range" class="form-control-range" min="0" max="10"  v-model="vote">
            <h3 class="pull-right">{{ vote }}</h3>
          </div>
        </form>

        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" :style="'width: ' + ratingPercentage + '%'"
            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>

        <div class="results pull-right">
          <h3>{{ ratingPercentage }}% this week</h3>
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
  data () {
    return {
      kitchenStaff: 'Eddie & Lenk', 
      vote: 0,
      ratingPercentage: 89,
      checklist: [
        {
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
    .results {
      margin-top: 10px;
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
