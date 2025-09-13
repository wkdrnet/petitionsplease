<script lang="ts">

</script>

<div id="profile">
  <div class="profile-header">
    <h1>Hello, Winkassador!.</h1>
  </div>
  <div class="profile-content">
    <div class="profile-rank">You are unemployed.</div>
    <span class="secondary">11,841 England Points</span>
    <div class="goal-progress">
      <progress value="11841" max=100000></progress>
        <p class="goal-text-left">
          Unlock Universal Credit
        </p>
        <p class="goal-text-right">
          100,000
        </p>
    </div>
  </div>
</div>

<style>
  #profile {
    position: relative;
    margin-top: -15px;
    margin-left: 15px;
    max-width: 350px;
  }
  #profile h1 {
    font-size: 24px;
  }
  .profile-content {
    margin-top: -10px;
  }
  .goal-text-left {
    width: 60%;
    float: left;
    text-align: left;
    color: #6f777b;
    margin: 5px 0 -15px;
  }
  .goal-text-right {
    width: 40%;
    float: right;
    text-align: right;
    color: #6f777b;
    margin: 5px 0 -15px;
  }

  .goal-progress progress[value] {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    display: block;
    height: 12px;
    width: 100%;
    border: none;
  }

  .goal-progress progress[value]::-moz-progress-bar {
    background-color: var(--accent_color);
  }

  .secondary {
    color: #6f777b;
  }

  .profile-rank {
    margin-top: -14px;
    padding-bottom: 5px;
  }
</style>