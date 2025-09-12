<script lang="ts">
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import { onMount } from "svelte";

  let petitionId: string | null = null;
  let petition: any = null;
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    petitionId = params.get("petition");

    if (!petitionId) {
      petitionId = "700143";
    }

    try {
      const res = await fetch(`https://petition.parliament.uk/petitions/${petitionId}.json`);
      if(!res.ok) throw new Error("Failed to fetch petition!");
      const json = await res.json();
      petition = json.data.attributes;
    } catch(e) {
      error = e instanceof Error ? e.message : "Unknown error";
    } finally {
      loading = false;
    }
  });
</script>

<Header/>

<main id="content">
  {#if loading}
  <h1>
    <span class="heading-secondary">Please wait</span>
    Loading petition...
  </h1>
  {:else if error}
  <h1 class="error">
    <span class="heading-secondary">Something went wrong.</span>
    An error occured whilst trying to get the petition.
    <br><span class="error-message">{error}</span>
  </h1>
  <a class="button" href="/">Try another petition</a>
  {:else}
  <h1>
    <span class="heading-secondary">Petition</span>
    {petition.action}
  </h1>
  <div>
    <p>
      {petition.background}
    </p>
  </div>
  {#if petition.additional_detials}
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
  {/if}
  <div class="guess-field">
    <p class="form-label">I think this petition got</p>
    <div class="signature-count">
      <input class="form-control" type="text" pattern="\d*" inputmode="numeric" />
      <span class="text">signatures</span>
    </div>
    <a class="button" href="/">Guess</a>
  </div>
  {/if}
</main>

<Footer/>

<style></style>
