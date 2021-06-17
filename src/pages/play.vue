<template>
  <div v-if="gameState === 'END'" class="h-screen w-screen flex flex-col items-center justify-center space-y-5">
    <p>
      Vous avez gagné en <span class="font-bold widder">{{ finalTimer }} secondes</span> ! 🎉
    </p>
    <p>
      Souhaitez-vous recommencer ?
    </p>
     <div class="flex space-x-5">
       <button @click.prevent="restart" class="btn primary">
         Oui
       </button>
       <router-link to="/" class="btn primary">
         Non
       </router-link>
     </div>
  </div>
  <div v-else class="h-screen w-screen flex flex-col items-center justify-center space-y-5">
    <Timer @stop="stopTimer" />
    <Info :count="tryCount" :remaining-pairs="remainingPairs" />
    <CaseContainer>
      <div
        v-for="(picture, key) in cases"
        class="case"
        :key="key">
        <Case
          :picture="picture"
          :selected-cases="selectedCases"
          :valid-cases="validCases"
          :item="key"
          @toggleCase="toggle"
          :key="key" />
      </div>
    </CaseContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PictureManager from "../services/PictureManager";
import { CasePicture, GameState } from "../types/Memory";
import Wait from "../mixins/Wait";
import Case from '../components/Case.vue'
import CaseContainer from '../components/CaseContainer.vue'
import Timer from '../components/Timer.vue'
import Info from '../components/Info.vue'
import axios from "axios";
import { api } from "../../Environment";

export default defineComponent({
  mixins: [Wait],
  components: { Case, Timer, CaseContainer, Info },
  data() {
    return {
      tryCount: 0,
      cases: [],
      selectedCases: [] as number[],
      validCases: [] as number[],
      remainingPairs: 18,
      gameState: 'STARTING' as GameState,
      finalTimer: null
    }
  },
  methods: {
    /**
     * Initializes the board
     * by randomizing the squares
     */
    initialisePlate () {
      return PictureManager.getInstance().initialize()
    },

    /**
     * @param picture
     * @param key
     */
    async toggle (picture: CasePicture, key: number) {
      /**
       * Checks that the returned square
       * is not already returned
       */
      if (!this.selectedCases.includes(key)) {
        this.selectedCases.push(key)
      }

      /**
       * Check if 2 boxes are selected,
       * if so, we check if these two boxes have the same fruit.
       * In case of a match, we check if all pairs have been returned.
       */
      if (this.selectedCases.length === 2) {
        if (this.selectedSameCase()) {
          this.validCases.push(...this.selectedCases)
          this.wait(0.5, async () => {
            this.remainingPairs--
            this.selectedCases = []
            this.gameWasEnded()
          })
        } else {
          this.wait(0.5, () => {
            this.tryCount++
            this.selectedCases = []
          })
        }
      }
    },

    /**
     * Checks whether the two pairs
     * returned are valid
     */
    selectedSameCase () {
      const firstFruit = this.cases[this.selectedCases[0]].fruit
      const secondFruit = this.cases[this.selectedCases[1]].fruit
      return firstFruit === secondFruit
    },

    /**
     * Checks if all pairs have been found
     * and stops the game
     */
    gameWasEnded () {
      if (this.remainingPairs === 0) {
        this.gameState = 'END'
      }
    },

    /**
     * Stop the timer and retrieve its final value
     * by unloading the <Timer /> component.
     * @param value
     */
    stopTimer (value) {
      this.finalTimer = value
      this.storeGame()
    },

    /**
     * Persists the game statistics in the database
     * through an API using the AdonisJS framework.
     */
    async storeGame () {
      await axios.post(`${api}/games`, {
        score: this.finalTimer,
        essais: this.tryCount
      })
    },

    /**
     * Once the game is over,
     * if the player wishes to start again, the board is reset.
     */
    restart () {
      this.tryCount = 0
      this.selectedCases = []
      this.validCases = []
      this.remainingPairs = 18
      this.gameState = 'STARTING'
      this.finalTimer = null
      this.cases = this.initialisePlate()
    },
  },
  mounted () {
    /**
     * Uses the PictureManager service to randomly
     * initialise the boxes on the plate.
     */
    this.cases = this.initialisePlate()
  }
})
</script>

<style lang="scss">
.case {
  width: 64px;
  @apply border border-gray-100;
}
</style>