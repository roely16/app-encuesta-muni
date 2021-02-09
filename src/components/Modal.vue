<template>
    <div>

        <v-dialog
            v-model="dialog"
            width="900"
            @click:outside="$emit('closeModal')"
        >

            <v-card>
                <v-card-title class="headline grey lighten-2">
                Resultados
                </v-card-title>

                <v-card-text>
                
                    <slot name="form"></slot>

                </v-card-text>

            
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
        
        show(){

            this.dialog = true

        },
        close(){

          this.dialog = false

        }

    }
  }
</script>