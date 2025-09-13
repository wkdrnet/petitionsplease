<script lang="ts">

</script>

<div id="modal">
  <div class="modal-header">
    <h1>Incoming message</h1>
  </div>
  <div class="modal-content">
    <h2>Prince Andrew, Duke of York</h2>
    would like to speak with you.
  </div>
  <div class="modal-responses">
    <button class="button">Accept</button>
    <button class="button-disabled">Decline (unavailable)</button>
  </div>
</div>

<style>
  #modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 1001;
    min-width: 500px;
    min-height: 200px;
    max-width: 80%;
    border-color: #003600;
  }
  #modal h1 {
    margin: 0;
    font-size: 27px;
    color: white;
    margin-left: 15px;
  }
  #modal .modal-header {
    width: 100%;
    background-color: var(--accent_color);
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 20px;
  }
  #modal .modal-content {
    margin-left: 15px;
  }
  #modal .modal-responses {
    padding-top: 10px;
    margin-left: 15px;
  }
</style>  