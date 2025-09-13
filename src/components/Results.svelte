<script lang="ts">
  import {tweened} from "svelte/motion";
  import {cubicOut} from "svelte/easing";
  import {onMount} from "svelte";

  export let activePetitionId: string;
  export let guess: number | null;
  export let petition: any;

  const min_total_for_near_perfect_guess = 300; 
  const near_perfect_guess_threshold: number = 0.00001;
  const great_guess_threshold: number = 0.1;
  const good_guess_threshold: number = 0.25;
  const bad_guess_threshold: number = 0.35;

  const responses: Record<string, string[]> = {
    "perfect-guess": ["Perfect guess!"],
    "near-perfect-guess": ["So close."],
    "great-guess": ["Great guess!"],
    "good-guess": ["Good guess!"],
    "bad-guess": ["You were too far out."],
    "awful-guess": ["You were way too far out."],
    "invalid-input-guess": ["Wtf you on about"]
  }

  let guessRating: string | null = null;
  let response: string;

  const animatedCount = tweened(0, {
    duration: 2000,
    easing: cubicOut
  });

  $: formattedSignatures = new Intl.NumberFormat().format(Math.round($animatedCount));
  $: formattedGuess = Number.isFinite(Number(guess))
    ? new Intl.NumberFormat().format(Number(guess))
    : "???";

  onMount(() => {
    let signatureCount = petition.signature_count;

    const parsedGuess = Number(guess);

    if(!Number.isFinite(parsedGuess) || guess == null) {
      guessRating = "invalid-input-guess";
    }
    else {
      if(guess == signatureCount) {
        guessRating = "perfect-guess"
      } 
      else {
        let inaccuracy = Math.abs(signatureCount - guess);
        if(signatureCount > min_total_for_near_perfect_guess && inaccuracy < Math.max(signatureCount * near_perfect_guess_threshold, 1)) {
          guessRating = "near-perfect-guess"
        } else if(inaccuracy < signatureCount * great_guess_threshold) {
          guessRating = "great-guess"
        } else if(inaccuracy < signatureCount * good_guess_threshold) {
          guessRating = "good-guess"
        } else if(inaccuracy < signatureCount * bad_guess_threshold) {
          guessRating = "bad-guess"
        } else {
          guessRating = "awful-guess"
        }
      }
    }

    const responseOptions = responses[guessRating];
    response = responseOptions[Math.floor(Math.random() * responseOptions.length)];

    animatedCount.set(signatureCount);
  });
</script>

<div class="signature-count">
  <p class="signature-count-number">
    <span class="count">{formattedSignatures}</span>

    <span class="text">signatures</span>
  </p>
  <div class="signature-count-progress">
    <progress value={petition.signature_count} max="100000"></progress>
    <p class="view-petition">
      <a href="https://petition.parliament.uk/petitions/{activePetitionId}/" target="_blank" rel="noopener noreferrer">View this petition</a>
    </p>
    <p class="signature-count-goal">
      100,000
    </p>
  </div>
</div>
<section id="results-section" class="guess {guessRating}" aria-labelledby="results-heading">
  <h2 id="results-heading">You guessed {formattedGuess}</h2>
  <p class="response-text">
    {response}
  </p>
</section>
<a class="button" href="/">Next petition</a>

<style>
  .guess {
    border-left: 5px solid;
    padding-left: 15px;
    margin-left: -15px;
  }
  .perfect-guess, .near-perfect-guess {
    border-color: #2c85eb;
  }
  .great-guess, .good-guess {
    border-color: #080;
  }
  .bad-guess, .awful-guess {
    border-color: #b10e1e;
  }
  .invalid-input-guess {
    border-color: #000000;
  }

  .response-text {
    white-space: pre-line;
  }

  #results-section {
    margin-top: 80px;
    margin-bottom: 10px;
  }

  #results-section h2 {
    background-position: left center;
    background-image: url(../assets/icon_dark.png);
    background-repeat: no-repeat;
    background-size: 32px 32px;
    font-size: 24px;
    padding-left: 42px;
    margin: 0 0 0.4166666667em 0;
  }
</style>