<script lang="ts">
  import PetitionGuessGame from "../components/PetitionGuessGame.svelte";
  import { onMount } from "svelte";

  let petitionId: string | null;

  onMount(() => {
    petitionId = new URLSearchParams(window.location.search).get("id");
    if(!petitionId) {
        petitionId = "";
    }
  });
</script>

<PetitionGuessGame mode="normal" {petitionId} />