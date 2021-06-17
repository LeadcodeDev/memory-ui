<template>
  <div class="flex min-h-screen justify-center items-center flex-col">
    <div class="w-1/2 mx-auto text-center">
      <h1 class="text-6xl">Memory</h1>
      <div class="flex justify-center space-x-5 py-10">
        <router-link
          to="/play"
          class="btn primary">
          Jouer
        </router-link>
        <button @click.prevent="toggleModal">Afficher les scores</button>
      </div>
      <div
        @click.prevent="toggleModal"
        v-if="modal"
        class="fixed inset-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 cursor-pointer">
        <div class="w-1/2 flex justify-center cursor-default">
          <div class="mt-10">
            <div class="flex flex-col w-full">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">
                            Temps
                          </th>
                          <th scope="col">
                            Essais
                          </th>
                          <th scope="col" class="flex justify-end">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="!games.length">
                          <td colspan="3">
                            Aucune partie n'a été effectuée
                          </td>
                        </tr>
                        <template v-else>
                          <tr v-for="game in games" :key="game.id">
                            <td class="text-left">
                              {{ game.score }} secondes
                            </td>
                            <td class="text-left">
                              {{ game.essais }}
                            </td>
                            <td  class="text-right">
                              {{ formattedDate(game.created_at) }}
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Game } from "../types/Memory";
import axios from "axios";
import { api } from "../../Environment";

export default defineComponent({
  data: () => ({
    games: [] as Game[],
    modal: false
  }),
  methods: {
    /**
     * Display or hide the modal containing the old scores.
     */
    toggleModal () {
        this.modal = !this.modal
    },
    formattedDate (date) {
      return date.split('T')[0].split('-').reverse().join('/')
    },
  },

  /**
   * Display or hide the modal containing the old scores
   */
  async mounted () {
    const { data } = await axios.get(`${api}/games`)
    this.games = data
  }
})
</script>

<style lang="scss">
.table {
  @apply min-w-full divide-y divide-gray-200;
  thead {
    @apply bg-gray-50;
    tr th {
      @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
    }
  }
  tbody {
    @apply bg-white divide-y divide-gray-200;
    tr td {
      @apply px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500;
    }
  }
}
</style>