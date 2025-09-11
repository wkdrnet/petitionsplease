<script lang="ts">
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
</script>

<Header/>

<main id="content">
  <h1>
    <span class="heading-secondary">Petition</span>
    Repeal the Online Safety Act
  </h1>
  <div>
    <p>
      We want the Government to repeal the Online Safety act. 
    </p>
  </div>
  <details open>
    <summary>
      <span class="summary">More details</span>
    </summary>
    <div>
      <p>
        We believe that the scope of the Online Safety act is far broader and restrictive than is necessary in a free society.
        <br>
        For instance, the definitions in Part 2 covers online hobby forums, which we think do not have the resource to comply with the act and so are shutting down instead.
        <br>
        We think that Parliament should repeal the act and work towards producing proportionate legislation rather than risking clamping down on civil society talking about trains, football, video games or even hamsters because it can't deal with individual bad faith actors.
      </p>
    </div>
  </details>
  <div class="guess-field">
    <p class="form-label">I think this petition got</p>
    <div class="signature-count">
      <input class="form-control" type="text" pattern="\d*" inputmode="numeric" />
      <span class="text">signatures</span>
    </div>
    <a class="button" href="/">Guess</a>
  </div>
</main>

<Footer/>

<style></style>
