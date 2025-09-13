  <script lang="ts">
    import Results from "./Results.svelte";
    import { onMount } from "svelte";

    export let mode: string;
    export let petitionId: string;

    let activePetitionId: string;
    let petition: any = null;
    let loading = true;
    let error: string | null = null;
    let showResults = false;
    let guess: number | null = null;
    let hasBeenSeen: boolean;
    let petitionType: string;
    let petitions = [
      "738526",
      "700143",
      "740223",
      "740185",
      "739783",
      "739602",
      "739309",
      "739267",
      "739171",
      "739127",
      "722903",
      "728715",
      "725928"
    ]

    onMount(async () => {
      if(mode == "daily") {
        activePetitionId = "738526";
        document.documentElement.style.setProperty("--accent_color", "#1d70b8");
      }
      else if (!petitionId) {
        activePetitionId = petitions[Math.floor(Math.random() * petitions.length)];
      }
      else {
        activePetitionId = petitionId;
      }

      try {
        const res = await fetch(`https://petition.parliament.uk/petitions/${activePetitionId}.json`);
        if(!res.ok) throw new Error("Failed to fetch petition!");
        const json = await res.json();
        petition = json.data.attributes;

        if(petition.state == "rejected") {
          petitionType = "Rejected petition";
        } else {
          petitionType = "Petition"
        }

        hasBeenSeen = getSeenPetitions().includes(activePetitionId);
      } catch(e) {
        error = e instanceof Error ? e.message : "Unknown error";
      } finally {
        loading = false;
      }
    });

    function submitGuess() {
      if(guess !== null) {
        addSeenPetition(activePetitionId)
        showResults = true;
      }
    }

    function getSeenPetitions(): string[] {
      const stored = localStorage.getItem("seenPetitions");
      return stored ? JSON.parse(stored) : [];
    }

    function addSeenPetition(id: string) {
      const seen = getSeenPetitions();
      if(!seen.includes(id)) {
        seen.push(id);
        localStorage.setItem("seenPetitions", JSON.stringify(seen));
      }
    }
  </script>

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
        {#if mode == "daily"}
          <div class="petition-info">
            <span class="current-daily-petition">Today's daily petition</span>
          </div>
        {/if}
        {#if hasBeenSeen}
          <div class="petition-info">
            <span class="current-daily-petition">You've already seen this petition.</span>
          </div>
        {/if}
        <span class="heading-secondary">{petitionType}</span>
        {petition.action}
      </h1>
      <div>
        <p>
          {petition.background}
        </p>
      </div>
      {#if !showResults}
        {#if petition.additional_detials}
          <details open>
            <summary>
              <span class="summary">More details</span>
            </summary>
            <div>
              <p>
                {petition.additional_detials}
              </p>
            </div>
          </details>
        {/if}
        <div class="guess-field">
          <p class="form-label">How many signatures do you think this got?</p>
          <div class="signature-guess-field">
            <input class="form-control" type="text" pattern="\d*" inputmode="numeric" bind:value={guess}/>
            <span class="text">signatures</span>
          </div>
          <button class="button" on:click={submitGuess}>Guess</button>
        </div>
      {:else}
        <Results {activePetitionId} {guess} {petition}/>
      {/if}
    {/if}
  </main>